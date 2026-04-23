ALTER TABLE `service_submissions` ADD `lat` decimal(10,7);--> statement-breakpoint
ALTER TABLE `service_submissions` ADD `lng` decimal(10,7);--> statement-breakpoint
ALTER TABLE `service_submissions` ADD `neighborhood` varchar(128);--> statement-breakpoint
ALTER TABLE `service_submissions` ADD `city` varchar(128);--> statement-breakpoint
ALTER TABLE `service_submissions` ADD `geocodedAt` timestamp;