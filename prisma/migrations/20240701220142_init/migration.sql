-- CreateTable
CREATE TABLE `User` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EquipmentTypes` (
    `type_id` INTEGER NOT NULL AUTO_INCREMENT,
    `type_name` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `EquipmentTypes_type_name_key`(`type_name`),
    PRIMARY KEY (`type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MusicEquipment` (
    `equipment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `equipment_name` VARCHAR(100) NOT NULL,
    `type_id` INTEGER NULL,
    `brand` VARCHAR(50) NULL,
    `model` VARCHAR(50) NULL,

    PRIMARY KEY (`equipment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MusicEquipment` ADD CONSTRAINT `MusicEquipment_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `EquipmentTypes`(`type_id`) ON DELETE SET NULL ON UPDATE CASCADE;
