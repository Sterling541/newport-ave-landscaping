CREATE TABLE `consultant_rotation` (
	`id` int AUTO_INCREMENT NOT NULL,
	`rotationGroup` varchar(32) NOT NULL,
	`lastAssigned` varchar(128) NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `consultant_rotation_id` PRIMARY KEY(`id`),
	CONSTRAINT `consultant_rotation_rotationGroup_unique` UNIQUE(`rotationGroup`)
);
