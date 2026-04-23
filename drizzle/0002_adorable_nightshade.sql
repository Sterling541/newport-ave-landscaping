CREATE TABLE `csv_import_jobs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`filename` varchar(256) NOT NULL,
	`status` enum('pending','processing','completed','failed') NOT NULL DEFAULT 'pending',
	`totalRows` int,
	`importedRows` int,
	`skippedRows` int,
	`errorLog` text,
	`importedBy` int,
	`startedAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	CONSTRAINT `csv_import_jobs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `insights` (
	`id` int AUTO_INCREMENT NOT NULL,
	`generatedAt` timestamp NOT NULL DEFAULT (now()),
	`category` varchar(64) NOT NULL,
	`priority` enum('critical','high','medium','low') NOT NULL DEFAULT 'medium',
	`title` varchar(256) NOT NULL,
	`observation` text NOT NULL,
	`dataPoints` text,
	`recommendedAction` text,
	`confidence` float,
	`status` enum('active','read','snoozed','valuable','dismissed') NOT NULL DEFAULT 'active',
	`userFeedback` varchar(16),
	`periodStart` date,
	`periodEnd` date,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `insights_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `weather_daily` (
	`id` int AUTO_INCREMENT NOT NULL,
	`date` date NOT NULL,
	`tempHighC` float,
	`tempLowC` float,
	`tempHighF` float,
	`tempLowF` float,
	`precipMm` float,
	`snowMm` float,
	`windAvgKph` float,
	`cloudCoverPct` float,
	`weatherCode` int,
	`dataType` varchar(16) NOT NULL DEFAULT 'historical',
	`fetchedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `weather_daily_id` PRIMARY KEY(`id`),
	CONSTRAINT `weather_daily_date_unique` UNIQUE(`date`)
);
--> statement-breakpoint
ALTER TABLE `service_submissions` ADD `ipHash` varchar(64);--> statement-breakpoint
ALTER TABLE `service_submissions` ADD `zipCode` varchar(16);--> statement-breakpoint
ALTER TABLE `service_submissions` ADD `formCompletionSeconds` int;--> statement-breakpoint
ALTER TABLE `service_submissions` ADD `dataSource` varchar(32) DEFAULT 'form' NOT NULL;--> statement-breakpoint
ALTER TABLE `service_submissions` ADD `schemaVersion` varchar(8) DEFAULT '1.0' NOT NULL;--> statement-breakpoint
ALTER TABLE `service_submissions` ADD `leadStatus` enum('new','contacted','scheduled','closed','lost') DEFAULT 'new' NOT NULL;--> statement-breakpoint
ALTER TABLE `service_submissions` ADD `adminNotes` text;