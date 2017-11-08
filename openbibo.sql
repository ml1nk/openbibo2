-- phpMyAdmin SQL Dump
-- version 4.7.5
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Nov 08, 2017 at 10:06 PM
-- Server version: 10.2.10-MariaDB-10.2.10+maria~jessie
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
  `manager_id` int(11) NOT NULL,
  `name` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` char(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `permissions` int(11) NOT NULL,
  `lastactivity` int(11) NOT NULL,
  `salt` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cookie` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `login` int(11) NOT NULL,
  `lastip` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Stand-in structure for view `mediaOverview`
-- (See below for the actual view)
--
CREATE TABLE `mediaOverview` (
`id` int(11)
,`title` varchar(100)
,`part` varchar(100)
,`author` varchar(100)
,`type` varchar(40)
,`typeId` smallint(6)
,`category` varchar(40)
,`categoryId` smallint(6)
);

-- --------------------------------------------------------

--
-- Table structure for table `media_category`
--

CREATE TABLE `media_category` (
  `category_id` smallint(6) NOT NULL,
  `name` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `media_copy`
--

CREATE TABLE `media_copy` (
  `media_id` int(11) NOT NULL,
  `copy_id` int(11) NOT NULL,
  `barcode` varchar(6) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `media_list`
--

CREATE TABLE `media_list` (
  `media_id` int(11) NOT NULL,
  `type_id` smallint(6) NOT NULL,
  `category_id` smallint(6) NOT NULL,
  `series` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `author` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `media_type`
--

CREATE TABLE `media_type` (
  `type_id` smallint(6) NOT NULL,
  `name` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `picture` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `barcode` varchar(6) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Stand-in structure for view `userOverview`
-- (See below for the actual view)
--
CREATE TABLE `userOverview` (
`id` int(11)
,`barcode` varchar(6)
,`name` varchar(50)
,`email` varchar(50)
,`active` bigint(21)
);

-- --------------------------------------------------------

--
-- Structure for view `mediaOverview`
--
DROP TABLE IF EXISTS `mediaOverview`;

CREATE ALGORITHM=MERGE DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `mediaOverview`  AS  select `a`.`media_id` AS `id`,`a`.`title` AS `title`,`a`.`series` AS `part`,`a`.`author` AS `author`,`b`.`name` AS `type`,`b`.`type_id` AS `typeId`,`c`.`name` AS `category`,`c`.`category_id` AS `categoryId` from ((`media_list` `a` left join `media_type` `b` on(`a`.`type_id` = `b`.`type_id`)) left join `media_category` `c` on(`a`.`category_id` = `c`.`category_id`)) ;

-- --------------------------------------------------------

--
-- Structure for view `userOverview`
--
DROP TABLE IF EXISTS `userOverview`;

CREATE ALGORITHM=MERGE DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `userOverview`  AS  select `a`.`user_id` AS `id`,`a`.`barcode` AS `barcode`,`a`.`name` AS `name`,`a`.`email` AS `email`,(select count(`borrow`.`user_id`) from `borrow` where `borrow`.`user_id` = `a`.`user_id`) AS `active` from `user` `a` ;

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
  ADD PRIMARY KEY (`manager_id`);

--
-- Indexes for table `media_category`
--
ALTER TABLE `media_category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `media_copy`
--
ALTER TABLE `media_copy`
  ADD PRIMARY KEY (`media_id`,`copy_id`),
  ADD KEY `barcode_index` (`barcode`),
  ADD KEY `copy_id` (`copy_id`);

--
-- Indexes for table `media_list`
--
ALTER TABLE `media_list`
  ADD PRIMARY KEY (`media_id`);
ALTER TABLE `media_list` ADD FULLTEXT KEY `title` (`title`,`author`);

--
-- Indexes for table `media_type`
--
ALTER TABLE `media_type`
  ADD PRIMARY KEY (`type_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);
ALTER TABLE `user` ADD FULLTEXT KEY `search` (`barcode`,`name`,`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `days_off`
--
ALTER TABLE `days_off`
  MODIFY `days_off_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `manager`
--
ALTER TABLE `manager`
  MODIFY `manager_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `media_category`
--
ALTER TABLE `media_category`
  MODIFY `category_id` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `media_copy`
--
ALTER TABLE `media_copy`
  MODIFY `copy_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `media_list`
--
ALTER TABLE `media_list`
  MODIFY `media_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
