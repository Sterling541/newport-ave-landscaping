CREATE TABLE `game_plays` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sessionId` varchar(64) NOT NULL,
	`event` varchar(32) NOT NULL,
	`level` int,
	`score` int NOT NULL DEFAULT 0,
	`initials` varchar(3),
	`device` varchar(16) NOT NULL DEFAULT 'desktop',
	`userAgent` varchar(256),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `game_plays_id` PRIMARY KEY(`id`)
);
