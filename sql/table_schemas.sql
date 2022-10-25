CREATE DATABASE `collections` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
CREATE TABLE `allcards` (
  `id` varchar(40) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `collectionnumber` int DEFAULT NULL,
  `rarity` varchar(20) DEFAULT NULL,
  `imageuri` varchar(200) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `isincollection` tinyint(1) NOT NULL DEFAULT '0',
  `setcode` varchar(50) DEFAULT NULL,
  `oracletext` varchar(1000) DEFAULT NULL,
  `flavortext` varchar(500) DEFAULT NULL,
  `imageuri_normal` varchar(200) DEFAULT NULL,
  `set_code` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `cards` (
  `id` int NOT NULL AUTO_INCREMENT,
  `card_id` varchar(40) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `card_name` varchar(30) DEFAULT NULL,
  `collection_number` int DEFAULT NULL,
  `rarity` varchar(20) DEFAULT NULL,
  `imageuri_small` varchar(200) DEFAULT NULL,
  `imageuri_normal` varchar(200) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `is_in_collection` tinyint(1) NOT NULL DEFAULT '0',
  `set_name` varchar(50) DEFAULT NULL,
  `oracle_text` varchar(1000) DEFAULT NULL,
  `flavor_text` varchar(500) DEFAULT NULL,
  `set_code` varchar(45) DEFAULT NULL,
  `is_owned` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1023 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `sets` (
  `set_id` varchar(50) NOT NULL,
  `code` varchar(10) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `release_date` varchar(20) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `card_count` int DEFAULT NULL,
  `icon_uri` varchar(400) DEFAULT NULL,
  `inserted` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`set_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `login_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password_salt` varchar(500) DEFAULT NULL,
  `password_hash` varchar(500) DEFAULT NULL,
  `password_date` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `password_salt_UNIQUE` (`password_salt`),
  UNIQUE KEY `login_name_UNIQUE` (`login_name`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


