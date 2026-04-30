CREATE TABLE `pin_reset_tokens` (
	`id` int AUTO_INCREMENT NOT NULL,
	`staffUserId` int NOT NULL,
	`token` varchar(128) NOT NULL,
	`expiresAt` timestamp NOT NULL,
	`usedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `pin_reset_tokens_id` PRIMARY KEY(`id`),
	CONSTRAINT `pin_reset_tokens_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE INDEX `idx_prt_token` ON `pin_reset_tokens` (`token`);--> statement-breakpoint
CREATE INDEX `idx_prt_staff_user` ON `pin_reset_tokens` (`staffUserId`);