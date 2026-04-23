CREATE TABLE `lead_follow_ups` (
	`id` int AUTO_INCREMENT NOT NULL,
	`submissionId` int NOT NULL,
	`followUpStatus` enum('called_scheduled','left_voicemail','appointment_set','no_answer','not_interested','follow_up_needed','closed_won','closed_lost') NOT NULL,
	`notes` text,
	`remindAt` timestamp,
	`reminderAcked` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `lead_follow_ups_id` PRIMARY KEY(`id`)
);
