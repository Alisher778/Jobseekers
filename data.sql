PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE `SequelizeMeta` (`name` VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY, UNIQUE (name));
INSERT INTO "SequelizeMeta" VALUES('20170404230231-create-user.js');
INSERT INTO "SequelizeMeta" VALUES('20170406043938-create-job.js');
CREATE TABLE `Users` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `firstName` VARCHAR(255), `lastName` VARCHAR(255), `email` VARCHAR(255), `password` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
INSERT INTO "Users" VALUES(1,'Alisher','Musurmonov','alisher.musurmonov89@gmail.com','dfdg','2017-04-06 01:31:40.681 +00:00','2017-04-06 01:31:40.681 +00:00');
INSERT INTO "Users" VALUES(2,'Alisher','Musurmonov','alisher.musurmonov89@gmail.com','dfdg','2017-04-06 01:32:19.848 +00:00','2017-04-06 01:32:19.848 +00:00');
INSERT INTO "Users" VALUES(3,'Alisher','Musurmonov','alisher.musurmonov89@gmail.com','dfdg','2017-04-06 01:34:19.846 +00:00','2017-04-06 01:34:19.846 +00:00');
INSERT INTO "Users" VALUES(4,'Alisher','Musurmonov','alisher.musurmonov89@gmail.com','password','2017-04-06 01:36:57.094 +00:00','2017-04-06 01:36:57.094 +00:00');
INSERT INTO "Users" VALUES(5,NULL,NULL,NULL,NULL,'2017-04-06 04:50:32.167 +00:00','2017-04-06 04:50:32.167 +00:00');
CREATE TABLE `Jobs` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `title` TEXT, `description` TEXT, `budget` VARCHAR(255), `level` VARCHAR(255), `category` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
INSERT INTO "Jobs" VALUES(1,'wdefr','rbg ','fbg ','vb gb',' b','2017-04-06 04:52:01.919 +00:00','2017-04-06 04:52:01.919 +00:00');
DELETE FROM sqlite_sequence;
INSERT INTO "sqlite_sequence" VALUES('Users',5);
INSERT INTO "sqlite_sequence" VALUES('Jobs',1);
COMMIT;