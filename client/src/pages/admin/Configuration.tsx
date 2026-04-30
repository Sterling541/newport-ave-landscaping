/* ============================================================
   CONFIGURATION PAGE
   Houses CSV Import and Users & Roles under one roof.
   Admin-only page.
   ============================================================ */
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Settings, UserCog } from "lucide-react";
import CsvImportContent from "./CsvImportContent";
import AdminUsersContent from "./AdminUsersContent";

export default function Configuration() {
  const [tab, setTab] = useState("csv-import");

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[oklch(0.55_0.15_145)] flex items-center justify-center">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Configuration</h1>
            <p className="text-sm text-gray-500">Manage data imports and staff accounts</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="bg-gray-100">
            <TabsTrigger value="csv-import" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              CSV Import
            </TabsTrigger>
            <TabsTrigger value="users-roles" className="flex items-center gap-2">
              <UserCog className="w-4 h-4" />
              Users &amp; Roles
            </TabsTrigger>
          </TabsList>

          <TabsContent value="csv-import" className="mt-4">
            <CsvImportContent />
          </TabsContent>

          <TabsContent value="users-roles" className="mt-4">
            <AdminUsersContent />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
