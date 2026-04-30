CREATE TABLE `role_definitions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(64) NOT NULL,
	`label` varchar(128) NOT NULL,
	`permissions` text NOT NULL DEFAULT ('{}'),
	`isSystem` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `role_definitions_id` PRIMARY KEY(`id`),
	CONSTRAINT `role_definitions_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `staff_users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`firstName` varchar(128) NOT NULL,
	`lastName` varchar(128) NOT NULL,
	`pinHash` varchar(256) NOT NULL,
	`role` varchar(64) NOT NULL DEFAULT 'sales_rep',
	`isActive` boolean NOT NULL DEFAULT true,
	`phone` varchar(32),
	`title` varchar(128),
	`lastLoginAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `staff_users_id` PRIMARY KEY(`id`),
	CONSTRAINT `staff_users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE INDEX `idx_rd_slug` ON `role_definitions` (`slug`);--> statement-breakpoint
CREATE INDEX `idx_su_email` ON `staff_users` (`email`);--> statement-breakpoint
CREATE INDEX `idx_su_role` ON `staff_users` (`role`);