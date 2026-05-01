CREATE TABLE `contact_property_links` (
	`id` int AUTO_INCREMENT NOT NULL,
	`contactId` int NOT NULL,
	`propertyId` int NOT NULL,
	`relationshipType` enum('owner','tenant','primary_contact','billing_contact','property_manager','employee','other') NOT NULL DEFAULT 'primary_contact',
	`isPrimary` boolean NOT NULL DEFAULT false,
	`isBillingContact` boolean NOT NULL DEFAULT false,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contact_property_links_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contacts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`contactType` enum('prospect','customer','employee','vendor','other') NOT NULL DEFAULT 'prospect',
	`namePrefix` enum('mr','mrs','ms','dr','company','other'),
	`firstName` varchar(128),
	`lastName` varchar(128),
	`companyName` varchar(256),
	`email` varchar(320),
	`phone` varchar(32),
	`secondaryPhone` varchar(32),
	`mailingAddress` text,
	`mailingCity` varchar(128),
	`mailingState` varchar(64),
	`mailingZip` varchar(16),
	`billingAddress` text,
	`billingCity` varchar(128),
	`billingState` varchar(64),
	`billingZip` varchar(16),
	`billingAddressSameAsMailing` boolean NOT NULL DEFAULT true,
	`notes` text,
	`isSystemUser` boolean DEFAULT false,
	`linkedStaffUserId` int,
	`sourceLeadId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`createdByUserId` int,
	CONSTRAINT `contacts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `properties` (
	`id` int AUTO_INCREMENT NOT NULL,
	`propertyName` varchar(256),
	`address` text NOT NULL,
	`city` varchar(128),
	`state` varchar(64),
	`zip` varchar(16),
	`lat` decimal(10,7),
	`lng` decimal(10,7),
	`geocodedAt` timestamp,
	`propertyType` enum('residential','commercial','hoa','multi_family','builder','other') NOT NULL DEFAULT 'residential',
	`notes` text,
	`sourceLeadId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`createdByUserId` int,
	CONSTRAINT `properties_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `property_files` (
	`id` int AUTO_INCREMENT NOT NULL,
	`propertyId` int NOT NULL,
	`linkedContactId` int,
	`fileName` varchar(256) NOT NULL,
	`fileKey` varchar(512) NOT NULL,
	`fileUrl` text NOT NULL,
	`mimeType` varchar(128),
	`fileSizeBytes` int,
	`category` enum('photo','design','document','contract','plan','permit','note','other') NOT NULL DEFAULT 'other',
	`description` text,
	`uploadedByUserId` int,
	`uploadedByName` varchar(256),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `property_files_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `idx_cpl_contact_id` ON `contact_property_links` (`contactId`);--> statement-breakpoint
CREATE INDEX `idx_cpl_property_id` ON `contact_property_links` (`propertyId`);--> statement-breakpoint
CREATE INDEX `idx_cpl_contact_property` ON `contact_property_links` (`contactId`,`propertyId`);--> statement-breakpoint
CREATE INDEX `idx_c_contact_type` ON `contacts` (`contactType`);--> statement-breakpoint
CREATE INDEX `idx_c_email` ON `contacts` (`email`);--> statement-breakpoint
CREATE INDEX `idx_c_last_name` ON `contacts` (`lastName`);--> statement-breakpoint
CREATE INDEX `idx_c_created_at` ON `contacts` (`createdAt`);--> statement-breakpoint
CREATE INDEX `idx_p_property_type` ON `properties` (`propertyType`);--> statement-breakpoint
CREATE INDEX `idx_p_city` ON `properties` (`city`);--> statement-breakpoint
CREATE INDEX `idx_p_created_at` ON `properties` (`createdAt`);--> statement-breakpoint
CREATE INDEX `idx_p_zip` ON `properties` (`zip`);--> statement-breakpoint
CREATE INDEX `idx_pf_property_id` ON `property_files` (`propertyId`);--> statement-breakpoint
CREATE INDEX `idx_pf_category` ON `property_files` (`category`);--> statement-breakpoint
CREATE INDEX `idx_pf_created_at` ON `property_files` (`createdAt`);