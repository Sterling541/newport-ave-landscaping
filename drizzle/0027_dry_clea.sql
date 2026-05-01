ALTER TABLE `service_submissions` ADD `weeklyServiceCap` varchar(256);--> statement-breakpoint
ALTER TABLE `service_submissions` ADD `cleanupCap` varchar(512);--> statement-breakpoint
ALTER TABLE `service_submissions` ADD `wantsAeration` varchar(128);--> statement-breakpoint
ALTER TABLE `service_submissions` ADD `wantsDethatch` varchar(128);--> statement-breakpoint
ALTER TABLE `service_submissions` ADD `wantsSprinklerStartup` varchar(128);--> statement-breakpoint
ALTER TABLE `service_submissions` ADD `wantsBackflowTest` varchar(128);--> statement-breakpoint
ALTER TABLE `service_submissions` ADD `gateCode` varchar(512);--> statement-breakpoint
ALTER TABLE `service_submissions` ADD `wantsPropertyEnhancement` varchar(128);