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
    INSERT INTO admin (email_address, password, business_name, business_code, phone_no, is_active)
    VALUES 
      ('admin@transport.com', '$2a$12$GwyWk8vZhWy998kvRH2hbO3EZzW5qZWkO5kvh7HmadM9VV6r8kjXG', 'Transport Co', 'A83T50', '9876543210', 1),
      ('admin2@transport.com', '$2a$12$GwyWk8vZhWy998kvRH2hbO3EZzW5qZWkO5kvh7HmadM9VV6r8kjXG', 'Logistics Ltd', 'B92K31', '9123456789', 1);
    `,
    //password: 1234567
    callback,
  );
};

exports.down = function (db, callback) {
  db.runSql(
    `DELETE FROM admin WHERE email_address IN ('admin@transport.com', 'admin2@transport.com')`,
    callback,
  );
};

exports._meta = {
  version: 1,
};
