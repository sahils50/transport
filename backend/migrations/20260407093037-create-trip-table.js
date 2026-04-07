"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.runSql(
    `
    CREATE TABLE trip (
      trip_id                   INT AUTO_INCREMENT PRIMARY KEY,
      admin_id                  INT NOT NULL,
      trip_code                 VARCHAR(20) NOT NULL UNIQUE,
      trip_name                 VARCHAR(200) NOT NULL,
      vehicle_id                INT NOT NULL,
      driver_id                 INT NOT NULL,
      origin_name               VARCHAR(255) NOT NULL,
      destination_name          VARCHAR(255) NOT NULL,
      origin_coordinates        POINT NOT NULL,
      destination_coordinates   POINT NOT NULL,
      scheduled_start_at        DATETIME NOT NULL,
      scheduled_end_at          DATETIME NOT NULL,
      trip_type                 ENUM('single','return') NOT NULL,
      fuel_limit                INT NOT NULL DEFAULT 0,
      toll_limit                INT NOT NULL DEFAULT 0,
      other_cost_limit          INT NOT NULL DEFAULT 0,
      notes                     TEXT,
      is_active                 TINYINT(1) NOT NULL DEFAULT 1,
      created_at                TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at                TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

      CONSTRAINT trip_admin_fk FOREIGN KEY (admin_id)
        REFERENCES admin(admin_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

      CONSTRAINT trip_vehicle_fk FOREIGN KEY (vehicle_id)
        REFERENCES vehicle(vehicle_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

      CONSTRAINT trip_driver_fk FOREIGN KEY (driver_id)
        REFERENCES driver(driver_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
    );
    `,
    callback,
  );
};

exports.down = function (db, callback) {
  db.runSql(`DROP TABLE IF EXISTS trip`, callback);
};

exports._meta = {
  version: 1,
};
