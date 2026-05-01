/**
 * contactsRouter.ts — tRPC procedures for Contacts, Properties, Links, and Property Files.
 */
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { pinProcedure as protectedProcedure, router } from "./_core/trpc";
import { storagePut } from "./storage";
import {
  listContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  listProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getLinksForContact,
  getLinksForProperty,
  createLink,
  updateLink,
  deleteLink,
  getFilesForProperty,
  createPropertyFile,
  deletePropertyFile,
  updatePropertyFile,
  getAppointmentsByContact,
  getAppointmentsByProperty,
} from "./contacts";

// ─── Shared Zod schemas ───────────────────────────────────────────────────────

const contactTypeEnum = z.enum(["prospect", "customer", "employee", "vendor", "other"]);
const namePrefixEnum = z.enum(["mr", "mrs", "ms", "dr", "company", "other"]);
const propertyTypeEnum = z.enum(["residential", "commercial", "hoa", "multi_family", "builder", "other"]);
const relationshipTypeEnum = z.enum([
  "owner", "tenant", "primary_contact", "billing_contact",
  "property_manager", "employee", "other"
]);
const fileCategoryEnum = z.enum([
  "photo", "design", "document", "contract", "plan", "permit", "note", "other"
]);

// ─── Router ───────────────────────────────────────────────────────────────────

export const contactsRouter = router({

  // ── Contacts ──────────────────────────────────────────────────────────────

  listContacts: protectedProcedure
    .input(z.object({
      search: z.string().max(200).optional(),
      contactType: contactTypeEnum.optional(),
      limit: z.number().min(1).max(200).default(50),
      offset: z.number().min(0).default(0),
    }))
    .query(async ({ input }) => {
      return listContacts(input);
    }),

  getContact: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const contact = await getContactById(input.id);
      if (!contact) throw new TRPCError({ code: "NOT_FOUND", message: "Contact not found" });
      return contact;
    }),

  createContact: protectedProcedure
    .input(z.object({
      contactType: contactTypeEnum.default("prospect"),
      namePrefix: namePrefixEnum.optional(),
      firstName: z.string().max(128).optional(),
      lastName: z.string().max(128).optional(),
      companyName: z.string().max(256).optional(),
      email: z.string().email().max(320).optional().or(z.literal("")),
      phone: z.string().max(32).optional(),
      secondaryPhone: z.string().max(32).optional(),
      mailingAddress: z.string().max(500).optional(),
      mailingCity: z.string().max(128).optional(),
      mailingState: z.string().max(64).optional(),
      mailingZip: z.string().max(16).optional(),
      billingAddress: z.string().max(500).optional(),
      billingCity: z.string().max(128).optional(),
      billingState: z.string().max(64).optional(),
      billingZip: z.string().max(16).optional(),
      billingAddressSameAsMailing: z.boolean().default(true),
      notes: z.string().max(5000).optional(),
      isSystemUser: z.boolean().default(false),
      linkedStaffUserId: z.number().optional(),
      sourceLeadId: z.number().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const id = await createContact({
        ...input,
        email: input.email || undefined,
        createdByUserId: (ctx as any).staffUser?.id,
      });
      return { id };
    }),

  updateContact: protectedProcedure
    .input(z.object({
      id: z.number(),
      contactType: contactTypeEnum.optional(),
      namePrefix: namePrefixEnum.optional(),
      firstName: z.string().max(128).optional(),
      lastName: z.string().max(128).optional(),
      companyName: z.string().max(256).optional(),
      email: z.string().email().max(320).optional().or(z.literal("")),
      phone: z.string().max(32).optional(),
      secondaryPhone: z.string().max(32).optional(),
      mailingAddress: z.string().max(500).optional(),
      mailingCity: z.string().max(128).optional(),
      mailingState: z.string().max(64).optional(),
      mailingZip: z.string().max(16).optional(),
      billingAddress: z.string().max(500).optional(),
      billingCity: z.string().max(128).optional(),
      billingState: z.string().max(64).optional(),
      billingZip: z.string().max(16).optional(),
      billingAddressSameAsMailing: z.boolean().optional(),
      notes: z.string().max(5000).optional(),
      isSystemUser: z.boolean().optional(),
      linkedStaffUserId: z.number().nullable().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateContact(id, { ...data, email: data.email || undefined });
      return { success: true };
    }),

  deleteContact: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await deleteContact(input.id);
      return { success: true };
    }),

  // ── Properties ────────────────────────────────────────────────────────────

  listProperties: protectedProcedure
    .input(z.object({
      search: z.string().max(200).optional(),
      propertyType: propertyTypeEnum.optional(),
      limit: z.number().min(1).max(200).default(50),
      offset: z.number().min(0).default(0),
    }))
    .query(async ({ input }) => {
      return listProperties(input);
    }),

  getProperty: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const property = await getPropertyById(input.id);
      if (!property) throw new TRPCError({ code: "NOT_FOUND", message: "Property not found" });
      return property;
    }),

  createProperty: protectedProcedure
    .input(z.object({
      propertyName: z.string().max(256).optional(),
      address: z.string().max(500),
      city: z.string().max(128).optional(),
      state: z.string().max(64).optional(),
      zip: z.string().max(16).optional(),
      propertyType: propertyTypeEnum.default("residential"),
      notes: z.string().max(5000).optional(),
      sourceLeadId: z.number().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const id = await createProperty({
        ...input,
        createdByUserId: (ctx as any).staffUser?.id,
      });
      return { id };
    }),

  updateProperty: protectedProcedure
    .input(z.object({
      id: z.number(),
      propertyName: z.string().max(256).optional(),
      address: z.string().max(500).optional(),
      city: z.string().max(128).optional(),
      state: z.string().max(64).optional(),
      zip: z.string().max(16).optional(),
      propertyType: propertyTypeEnum.optional(),
      notes: z.string().max(5000).optional(),
      lat: z.number().optional(),
      lng: z.number().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateProperty(id, data as any);
      return { success: true };
    }),

  deleteProperty: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await deleteProperty(input.id);
      return { success: true };
    }),

  // ── Contact ↔ Property Links ──────────────────────────────────────────────

  getLinksForContact: protectedProcedure
    .input(z.object({ contactId: z.number() }))
    .query(async ({ input }) => {
      return getLinksForContact(input.contactId);
    }),

  getLinksForProperty: protectedProcedure
    .input(z.object({ propertyId: z.number() }))
    .query(async ({ input }) => {
      return getLinksForProperty(input.propertyId);
    }),

  createLink: protectedProcedure
    .input(z.object({
      contactId: z.number(),
      propertyId: z.number(),
      relationshipType: relationshipTypeEnum.default("primary_contact"),
      isPrimary: z.boolean().default(false),
      isBillingContact: z.boolean().default(false),
      notes: z.string().max(1000).optional(),
    }))
    .mutation(async ({ input }) => {
      const id = await createLink(input);
      return { id };
    }),

  updateLink: protectedProcedure
    .input(z.object({
      id: z.number(),
      relationshipType: relationshipTypeEnum.optional(),
      isPrimary: z.boolean().optional(),
      isBillingContact: z.boolean().optional(),
      notes: z.string().max(1000).optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateLink(id, data);
      return { success: true };
    }),

  deleteLink: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await deleteLink(input.id);
      return { success: true };
    }),

  // ── Property Files ────────────────────────────────────────────────────────

  getFilesForProperty: protectedProcedure
    .input(z.object({ propertyId: z.number() }))
    .query(async ({ input }) => {
      return getFilesForProperty(input.propertyId);
    }),

  uploadPropertyFile: protectedProcedure
    .input(z.object({
      propertyId: z.number(),
      linkedContactId: z.number().optional(),
      fileName: z.string().max(256),
      fileBase64: z.string(), // base64 encoded file
      mimeType: z.string().max(128),
      fileSizeBytes: z.number().optional(),
      category: fileCategoryEnum.default("other"),
      description: z.string().max(1000).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { propertyId, linkedContactId, fileName, fileBase64, mimeType,
        fileSizeBytes, category, description } = input;

      // Decode base64 and upload to S3
      const buffer = Buffer.from(fileBase64, "base64");
      const suffix = Date.now().toString(36);
      const safeFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
      const fileKey = `property-files/${propertyId}/${suffix}-${safeFileName}`;
      const { url } = await storagePut(fileKey, buffer, mimeType);

      const staffUser = (ctx as any).staffUser;
      const id = await createPropertyFile({
        propertyId,
        linkedContactId,
        fileName,
        fileKey,
        fileUrl: url,
        mimeType,
        fileSizeBytes,
        category,
        description,
        uploadedByUserId: staffUser?.id,
        uploadedByName: staffUser ? `${staffUser.firstName} ${staffUser.lastName}` : undefined,
      });
      return { id, url };
    }),

  updatePropertyFile: protectedProcedure
    .input(z.object({
      id: z.number(),
      fileName: z.string().max(256).optional(),
      category: fileCategoryEnum.optional(),
      description: z.string().max(1000).optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updatePropertyFile(id, data);
      return { success: true };
    }),

  deletePropertyFile: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const file = await deletePropertyFile(input.id);
      return { success: true, fileKey: file?.fileKey };
    }),

  /** Quick search for contacts — used by Smart Scheduler contact picker */
  searchContacts: protectedProcedure
    .input(z.object({
      query: z.string().min(1).max(128),
      limit: z.number().min(1).max(20).default(8),
    }))
    .query(async ({ input }) => {
      return listContacts({ search: input.query, limit: input.limit });
    }),

  /** Quick search for properties — used by Smart Scheduler property picker */
  searchProperties: protectedProcedure
    .input(z.object({
      query: z.string().min(1).max(256),
      limit: z.number().min(1).max(20).default(8),
    }))
    .query(async ({ input }) => {
      return listProperties({ search: input.query, limit: input.limit });
    }),

  /** Appointment history for a contact */
  appointmentsByContact: protectedProcedure
    .input(z.object({ contactId: z.number() }))
    .query(async ({ input }) => {
      return getAppointmentsByContact(input.contactId);
    }),

  /** Appointment history for a property */
  appointmentsByProperty: protectedProcedure
    .input(z.object({ propertyId: z.number() }))
    .query(async ({ input }) => {
      return getAppointmentsByProperty(input.propertyId);
    }),
});
