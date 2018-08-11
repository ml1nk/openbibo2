-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Aug 11, 2018 at 05:49 PM
-- Server version: 10.2.12-MariaDB-10.2.12+maria~jessie
-- PHP Version: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `openbibo`
--

-- --------------------------------------------------------

--
-- Table structure for table `borrow`
--

CREATE TABLE `borrow` (
  `media_id` int(11) NOT NULL,
  `copy_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `renewal_count` int(11) NOT NULL,
  `timestamp` int(11) NOT NULL,
  `days` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `configuration`
--

CREATE TABLE `configuration` (
  `language` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `design` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logout_time` int(11) NOT NULL,
  `library_name` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `borrow_days` int(11) NOT NULL,
  `days_off` varchar(7) COLLATE utf8mb4_unicode_ci NOT NULL,
  `database_version` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `info_text` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cent_per_day` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `days_off`
--

CREATE TABLE `days_off` (
  `days_off_id` int(11) NOT NULL,
  `date_bigger` int(11) NOT NULL,
  `date_smaller` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `manager`
--

CREATE TABLE `manager` (
  `id` int(11) NOT NULL,
  `username` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` binary(96) NOT NULL,
  `forename` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `surname` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `id` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `category` int(11) NOT NULL,
  `series` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `author` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `media_category`
--

CREATE TABLE `media_category` (
  `id` int(6) NOT NULL,
  `name` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `media_copy`
--

CREATE TABLE `media_copy` (
  `media` int(11) NOT NULL,
  `copy` int(11) NOT NULL,
  `barcode` varchar(6) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Stand-in structure for view `media_overview`
-- (See below for the actual view)
--
CREATE TABLE `media_overview` (
`id` int(11)
,`title` varchar(100)
,`part` varchar(100)
,`author` varchar(100)
,`type_name` varchar(40)
,`type` int(11)
,`category_name` varchar(40)
,`category` int(11)
);

-- --------------------------------------------------------

--
-- Table structure for table `media_type`
--

CREATE TABLE `media_type` (
  `id` int(6) NOT NULL,
  `name` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Stand-in structure for view `media_type_overview`
-- (See below for the actual view)
--
CREATE TABLE `media_type_overview` (
`id` int(6)
,`name` varchar(40)
,`uses` bigint(21)
);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `barcode` varchar(6) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Stand-in structure for view `user_overview`
-- (See below for the actual view)
--
CREATE TABLE `user_overview` (
`id` int(11)
,`barcode` varchar(6)
,`name` varchar(50)
,`email` varchar(50)
,`active` bigint(21)
);

-- --------------------------------------------------------

--
-- Structure for view `media_overview`
--
DROP TABLE IF EXISTS `media_overview`;

CREATE ALGORITHM=MERGE DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `media_overview`  AS  select `a`.`id` AS `id`,`a`.`title` AS `title`,`a`.`series` AS `part`,`a`.`author` AS `author`,`b`.`name` AS `type_name`,`a`.`type` AS `type`,`c`.`name` AS `category_name`,`a`.`category` AS `category` from ((`media` `a` left join `media_type` `b` on(`a`.`type` = `b`.`id`)) left join `media_category` `c` on(`a`.`category` = `c`.`id`)) ;

-- --------------------------------------------------------

--
-- Structure for view `media_type_overview`
--
DROP TABLE IF EXISTS `media_type_overview`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `media_type_overview`  AS  select `a`.`id` AS `id`,`a`.`name` AS `name`,count(`b`.`type`) AS `uses` from (`media_type` `a` left join `media` `b` on(`a`.`id` = `b`.`type`)) group by `a`.`id` ;

-- --------------------------------------------------------

--
-- Structure for view `user_overview`
--
DROP TABLE IF EXISTS `user_overview`;

CREATE ALGORITHM=MERGE DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `user_overview`  AS  select `a`.`id` AS `id`,`a`.`barcode` AS `barcode`,`a`.`name` AS `name`,`a`.`email` AS `email`,(select count(`borrow`.`user_id`) from `borrow` where `borrow`.`user_id` = `a`.`id`) AS `active` from `user` `a` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `borrow`
--
ALTER TABLE `borrow`
  ADD KEY `mbr_index` (`user_id`),
  ADD KEY `copy_index` (`media_id`,`copy_id`);

--
-- Indexes for table `days_off`
--
ALTER TABLE `days_off`
  ADD PRIMARY KEY (`days_off_id`);

--
-- Indexes for table `manager`
--
ALTER TABLE `manager`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type` (`type`),
  ADD KEY `category` (`category`);
ALTER TABLE `media` ADD FULLTEXT KEY `title` (`title`,`author`);

--
-- Indexes for table `media_category`
--
ALTER TABLE `media_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `media_copy`
--
ALTER TABLE `media_copy`
  ADD PRIMARY KEY (`media`,`copy`),
  ADD KEY `barcode_index` (`barcode`),
  ADD KEY `copy_id` (`copy`);

--
-- Indexes for table `media_type`
--
ALTER TABLE `media_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `user` ADD FULLTEXT KEY `search` (`barcode`,`name`,`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `days_off`
--
ALTER TABLE `days_off`
  MODIFY `days_off_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `manager`
--
ALTER TABLE `manager`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `media_category`
--
ALTER TABLE `media_category`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `media_copy`
--
ALTER TABLE `media_copy`
  MODIFY `copy` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `media`
--
ALTER TABLE `media`
  ADD CONSTRAINT `category` FOREIGN KEY (`category`) REFERENCES `media_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `type` FOREIGN KEY (`type`) REFERENCES `media_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `media_copy`
--
ALTER TABLE `media_copy`
  ADD CONSTRAINT `media` FOREIGN KEY (`media`) REFERENCES `media` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
