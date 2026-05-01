ALTER TABLE `quote_leads` MODIFY COLUMN `source` varchar(64) NOT NULL DEFAULT 'quick_form';--> statement-breakpoint
ALTER TABLE `quote_leads` ADD `sourceLabel` varchar(128);