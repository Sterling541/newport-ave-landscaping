CREATE TABLE `opt_out_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fullName` varchar(200) NOT NULL,
	`neighborhood` varchar(200) NOT NULL,
	`serviceAddress` varchar(500) NOT NULL,
	`email` varchar(320),
	`phone` varchar(30),
	`optOutTypes` varchar(50) NOT NULL,
	`acknowledged` boolean NOT NULL DEFAULT false,
	`optOutStatus` enum('pending','scheduled','installed','cancelled') NOT NULL DEFAULT 'pending',
	`adminNotes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `opt_out_requests_id` PRIMARY KEY(`id`)
);
