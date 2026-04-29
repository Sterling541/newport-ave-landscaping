CREATE INDEX `idx_ss_created_at` ON `service_submissions` (`createdAt`);--> statement-breakpoint
CREATE INDEX `idx_ss_is_spam` ON `service_submissions` (`isSpam`);--> statement-breakpoint
CREATE INDEX `idx_ss_created_spam` ON `service_submissions` (`isSpam`,`createdAt`);--> statement-breakpoint
CREATE INDEX `idx_ss_service_type` ON `service_submissions` (`serviceType`);--> statement-breakpoint
CREATE INDEX `idx_ss_lead_status` ON `service_submissions` (`leadStatus`);