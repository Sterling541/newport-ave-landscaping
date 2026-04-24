CREATE TABLE `quote_leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`firstName` varchar(128) NOT NULL,
	`lastName` varchar(128) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(32) NOT NULL,
	`address` text,
	`serviceInterest` varchar(128),
	`message` text,
	`source` varchar(64) NOT NULL DEFAULT 'other',
	`quoteLeadStatus` enum('new','contacted','quoted','converted','lost') NOT NULL DEFAULT 'new',
	`adminNotes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `quote_leads_id` PRIMARY KEY(`id`)
);
