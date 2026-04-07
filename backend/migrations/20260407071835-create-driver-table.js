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
    CREATE TABLE driver (
      driver_id                   INT AUTO_INCREMENT PRIMARY KEY,
      admin_id                    INT NOT NULL,
      driver_name                 VARCHAR(200) NOT NULL,
      driver_phone_no1            VARCHAR(20) NOT NULL UNIQUE,
      driver_phone_no2            VARCHAR(20) UNIQUE,
      driver_license_no           VARCHAR(50) NOT NULL UNIQUE,
      driver_license_type         VARCHAR(50) NOT NULL,
      driver_license_expiry_date  DATE NOT NULL,
      driver_profile_picture_url  TEXT,
      is_active                   TINYINT(1) NOT NULL DEFAULT 1,
      created_at                  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at                  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

      CONSTRAINT driver_admin_fk FOREIGN KEY (admin_id)
        REFERENCES admin(admin_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    );
    `,
    callback,
  );
};

exports.down = function (db, callback) {
  db.runSql(`DROP TABLE IF EXISTS driver`, callback);
};

exports._meta = {
  version: 1,
};
