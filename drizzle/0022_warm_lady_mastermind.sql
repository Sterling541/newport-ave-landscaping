CREATE TABLE `login_attempts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`attempts` int NOT NULL DEFAULT 0,
	`lockedUntil` timestamp,
	`lastAttemptAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `login_attempts_id` PRIMARY KEY(`id`),
	CONSTRAINT `login_attempts_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE INDEX `idx_la_email` ON `login_attempts` (`email`);