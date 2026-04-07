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
    INSERT INTO driver (admin_id, driver_name, driver_phone_no1, driver_phone_no2, driver_license_no, driver_license_type, driver_license_expiry_date, is_active)
    VALUES 
      (1, 'John Doe', '9876543210', '9123456789', 'MH1234567890', 'HMV', '2027-12-31', 1),
      (1, 'Jane Smith', '9000000001', NULL, 'MH9876543210', 'LMV', '2026-06-30', 1);
    `,
    callback,
  );
};

exports.down = function (db, callback) {
  db.runSql(
    `DELETE FROM driver WHERE driver_license_no IN ('MH1234567890', 'MH9876543210')`,
    callback,
  );
};

exports._meta = {
  version: 1,
};
