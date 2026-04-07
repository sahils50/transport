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
    CREATE TABLE vehicle (
      vehicle_id          INT AUTO_INCREMENT PRIMARY KEY,
      admin_id            INT NOT NULL,
      vehicle_number      VARCHAR(20) NOT NULL UNIQUE,
      vehicle_type        ENUM('truck','car','bike','rickshaw','van','bus','tempo') NOT NULL,
      fuel_type           ENUM('petrol','diesel','CNG','electric') NOT NULL,
      mileage             INT NOT NULL,
      fuel_tank_capacity  INT NOT NULL,
      is_active           TINYINT(1) NOT NULL DEFAULT 1,
      created_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

      CONSTRAINT vehicle_admin_fk FOREIGN KEY (admin_id)
        REFERENCES admin(admin_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    );
    `,
    callback,
  );
};

exports.down = function (db, callback) {
  db.runSql(`DROP TABLE IF EXISTS vehicle`, callback);
};

exports._meta = {
  version: 1,
};
