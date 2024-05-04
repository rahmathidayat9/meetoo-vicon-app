const mysql = require('mysql2/promise');
require('dotenv').config();
const database = require('./app/config/database.js')

const migrate = async () => {
  try {
    console.log("Migrating database...");

    await database.query("DROP TABLE IF EXISTS meetings");
    await database.query("DROP TABLE IF EXISTS users");

    await database.query(
      "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255),username VARCHAR(255),password VARCHAR(255),role VARCHAR(255))"
    );

    await database.query(
      "INSERT INTO users (name, username, password, role) VALUES ('Admin Meetoo', 'admin', 'admin', 'admin');"
    );

    await database.query(
        "CREATE TABLE meetings (id INT AUTO_INCREMENT PRIMARY KEY,meeting_title VARCHAR(255),meeting_token VARCHAR(255),meeting_url VARCHAR(255))"
    );

    console.log("Migration completed");

    process.exit();
  } catch (err) {
    console.log(err);

    process.exit();
  }
};

migrate();