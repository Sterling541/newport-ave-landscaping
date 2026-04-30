CREATE TABLE `badge_scans` (
	`id` int AUTO_INCREMENT NOT NULL,
	`employeeId` int,
	`employeeCodeRaw` varchar(16),
	`email` varchar(320) NOT NULL,
	`firstName` varchar(128) NOT NULL,
	`lastName` varchar(128) NOT NULL,
	`phone` varchar(32) NOT NULL,
	`badgeScanServiceType` enum('maintenance','landscape_construction','irrigation_sprinkler','other') NOT NULL,
	`serviceTypeOther` text,
	`message` text,
	`badgeScanStatus` enum('new','contacted','scheduled','converted','lost_price','lost_other','no_response') NOT NULL DEFAULT 'new',
	`notes` text,
	`convertedAppointmentId` int,
	`convertedAt` timestamp,
	`convertedByUserId` int,
	`submittedAt` timestamp NOT NULL DEFAULT (now()),
	`submittedUserAgent` text,
	`submittedIpHash` varchar(64),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `badge_scans_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `employees` (
	`id` int AUTO_INCREMENT NOT NULL,
	`firstName` varchar(128) NOT NULL,
	`lastName` varchar(128) NOT NULL,
	`employeeCode` varchar(8) NOT NULL,
	`role` varchar(64) NOT NULL DEFAULT 'Field Crew',
	`isActive` boolean NOT NULL DEFAULT true,
	`email` varchar(320),
	`phone` varchar(32),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `employees_id` PRIMARY KEY(`id`),
	CONSTRAINT `employees_employeeCode_unique` UNIQUE(`employeeCode`)
);
--> statement-breakpoint
CREATE TABLE `payout_records` (
	`id` int AUTO_INCREMENT NOT NULL,
	`employeeId` int NOT NULL,
	`periodYear` int NOT NULL,
	`periodMonth` int NOT NULL,
	`conversionCount` int NOT NULL DEFAULT 0,
	`amountUsd` decimal(10,2) NOT NULL DEFAULT '0.00',
	`paidAt` timestamp,
	`paidByUserId` int,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `payout_records_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `idx_bs_employee_id` ON `badge_scans` (`employeeId`);--> statement-breakpoint
CREATE INDEX `idx_bs_status` ON `badge_scans` (`badgeScanStatus`);--> statement-breakpoint
CREATE INDEX `idx_bs_submitted_at` ON `badge_scans` (`submittedAt`);--> statement-breakpoint
CREATE INDEX `idx_bs_service_type` ON `badge_scans` (`badgeScanServiceType`);--> statement-breakpoint
CREATE INDEX `idx_emp_code` ON `employees` (`employeeCode`);--> statement-breakpoint
CREATE INDEX `idx_emp_active` ON `employees` (`isActive`);--> statement-breakpoint
CREATE INDEX `idx_pr_employee_period` ON `payout_records` (`employeeId`,`periodYear`,`periodMonth`);--> statement-breakpoint
CREATE INDEX `idx_pr_paid_at` ON `payout_records` (`paidAt`);