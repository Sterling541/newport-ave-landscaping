CREATE TABLE `appointments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`submissionId` int,
	`repId` int NOT NULL,
	`appointmentDate` date NOT NULL,
	`startTime` varchar(8) NOT NULL,
	`endTime` varchar(8) NOT NULL,
	`appointmentType` enum('install_design','enhancement','follow_up','other') NOT NULL,
	`appointmentStatus` enum('scheduled','confirmed','completed','cancelled','no_show') NOT NULL DEFAULT 'scheduled',
	`googleEventId` varchar(256),
	`driveTimeMinutes` int,
	`customerName` varchar(256),
	`customerAddress` text,
	`customerPhone` varchar(32),
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `appointments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sales_reps` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(128) NOT NULL,
	`repRole` enum('install_design','enhancement') NOT NULL,
	`googleCalendarId` varchar(256),
	`email` varchar(320),
	`phone` varchar(32),
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `sales_reps_id` PRIMARY KEY(`id`)
);
