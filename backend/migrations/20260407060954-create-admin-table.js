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
    CREATE TABLE admin (
      admin_id              INT AUTO_INCREMENT PRIMARY KEY,
      email_address         VARCHAR(255) NOT NULL UNIQUE,
      password              VARCHAR(255),
      business_name         VARCHAR(200),
      business_code         VARCHAR(6) UNIQUE,
      phone_no              VARCHAR(20) NOT NULL UNIQUE,
      profile_picture_url   TEXT,
      is_active             TINYINT(1) NOT NULL DEFAULT 1,
      created_at            TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at            TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
    `,
    callback,
  );
};

exports.down = function (db, callback) {
  db.runSql(`DROP TABLE IF EXISTS admin`, callback);
};

exports._meta = {
  version: 1,
};
