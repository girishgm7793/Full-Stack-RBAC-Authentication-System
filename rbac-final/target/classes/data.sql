-- This file runs automatically on startup after Hibernate creates the tables
-- INSERT IGNORE prevents duplicate key errors if rows already exist
INSERT IGNORE INTO roles (name) VALUES ('ROLE_USER');
INSERT IGNORE INTO roles (name) VALUES ('ROLE_ADMIN');
