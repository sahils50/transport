-- CreateTable
CREATE TABLE `admin` (
    `admin_id` INTEGER NOT NULL AUTO_INCREMENT,
    `email_address` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NULL,
    `business_name` VARCHAR(200) NULL,
    `business_code` VARCHAR(6) NULL,
    `phone_no` VARCHAR(20) NOT NULL,
    `profile_picture_url` TEXT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email_address`(`email_address`),
    UNIQUE INDEX `business_code`(`business_code`),
    UNIQUE INDEX `phone_no`(`phone_no`),
    PRIMARY KEY (`admin_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `driver` (
    `driver_id` INTEGER NOT NULL AUTO_INCREMENT,
    `admin_id` INTEGER NOT NULL,
    `driver_name` VARCHAR(200) NOT NULL,
    `driver_phone_no1` VARCHAR(20) NOT NULL,
    `driver_phone_no2` VARCHAR(20) NULL,
    `driver_license_no` VARCHAR(50) NOT NULL,
    `driver_license_type` VARCHAR(50) NOT NULL,
    `driver_license_expiry_date` DATE NOT NULL,
    `driver_profile_picture_url` TEXT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `driver_phone_no1`(`driver_phone_no1`),
    UNIQUE INDEX `driver_phone_no2`(`driver_phone_no2`),
    UNIQUE INDEX `driver_license_no`(`driver_license_no`),
    INDEX `driver_admin_fk`(`admin_id`),
    PRIMARY KEY (`driver_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `migrations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `run_on` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trip` (
    `trip_id` INTEGER NOT NULL AUTO_INCREMENT,
    `admin_id` INTEGER NOT NULL,
    `trip_code` VARCHAR(20) NOT NULL,
    `trip_name` VARCHAR(200) NOT NULL,
    `vehicle_id` INTEGER NOT NULL,
    `driver_id` INTEGER NOT NULL,
    `origin_name` VARCHAR(255) NOT NULL,
    `destination_name` VARCHAR(255) NOT NULL,
    `origin_coordinates` point NOT NULL,
    `destination_coordinates` point NOT NULL,
    `scheduled_start_at` DATETIME(0) NOT NULL,
    `scheduled_end_at` DATETIME(0) NOT NULL,
    `actual_start_at` DATETIME(0) NULL,
    `actual_end_at` DATETIME(0) NULL,
    `trip_type` ENUM('single', 'return') NOT NULL,
    `trip_status` ENUM('scheduled', 'in_transit', 'completed', 'cancelled', 'delayed') NOT NULL DEFAULT 'scheduled',
    `fuel_limit` INTEGER NOT NULL DEFAULT 0,
    `toll_limit` INTEGER NOT NULL DEFAULT 0,
    `other_cost_limit` INTEGER NOT NULL DEFAULT 0,
    `notes` TEXT NULL,
    `cancellation_reason` TEXT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `trip_code`(`trip_code`),
    INDEX `trip_admin_fk`(`admin_id`),
    INDEX `trip_driver_fk`(`driver_id`),
    INDEX `trip_vehicle_fk`(`vehicle_id`),
    PRIMARY KEY (`trip_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trip_expense` (
    `expense_id` INTEGER NOT NULL AUTO_INCREMENT,
    `admin_id` INTEGER NOT NULL,
    `driver_id` INTEGER NOT NULL,
    `trip_id` INTEGER NOT NULL,
    `expense_type` ENUM('fuel', 'toll', 'other') NOT NULL,
    `expense_amount` DECIMAL(10, 2) NOT NULL,
    `payment_mode` ENUM('cash', 'online', 'card', 'upi') NOT NULL,
    `bill_url` TEXT NULL,
    `notes` TEXT NULL,
    `status` ENUM('pending', 'paid', 'rejected') NOT NULL DEFAULT 'pending',
    `reviewed_by` INTEGER NULL,
    `reviewed_at` DATETIME(0) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `expense_admin_fk`(`admin_id`),
    INDEX `expense_driver_fk`(`driver_id`),
    INDEX `expense_reviewed_by_fk`(`reviewed_by`),
    INDEX `expense_trip_fk`(`trip_id`),
    PRIMARY KEY (`expense_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehicle` (
    `vehicle_id` INTEGER NOT NULL AUTO_INCREMENT,
    `admin_id` INTEGER NOT NULL,
    `vehicle_number` VARCHAR(20) NOT NULL,
    `vehicle_type` ENUM('truck', 'car', 'bike', 'rickshaw', 'van', 'bus', 'tempo') NOT NULL,
    `fuel_type` ENUM('petrol', 'diesel', 'CNG', 'electric') NOT NULL,
    `mileage` INTEGER NOT NULL,
    `fuel_tank_capacity` INTEGER NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `vehicle_number`(`vehicle_number`),
    INDEX `vehicle_admin_fk`(`admin_id`),
    PRIMARY KEY (`vehicle_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `driver` ADD CONSTRAINT `driver_admin_fk` FOREIGN KEY (`admin_id`) REFERENCES `admin`(`admin_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trip` ADD CONSTRAINT `trip_admin_fk` FOREIGN KEY (`admin_id`) REFERENCES `admin`(`admin_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trip` ADD CONSTRAINT `trip_driver_fk` FOREIGN KEY (`driver_id`) REFERENCES `driver`(`driver_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trip` ADD CONSTRAINT `trip_vehicle_fk` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicle`(`vehicle_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trip_expense` ADD CONSTRAINT `expense_admin_fk` FOREIGN KEY (`admin_id`) REFERENCES `admin`(`admin_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trip_expense` ADD CONSTRAINT `expense_driver_fk` FOREIGN KEY (`driver_id`) REFERENCES `driver`(`driver_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trip_expense` ADD CONSTRAINT `expense_reviewed_by_fk` FOREIGN KEY (`reviewed_by`) REFERENCES `admin`(`admin_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trip_expense` ADD CONSTRAINT `expense_trip_fk` FOREIGN KEY (`trip_id`) REFERENCES `trip`(`trip_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehicle` ADD CONSTRAINT `vehicle_admin_fk` FOREIGN KEY (`admin_id`) REFERENCES `admin`(`admin_id`) ON DELETE CASCADE ON UPDATE CASCADE;
