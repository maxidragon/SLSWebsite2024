/*
  Warnings:

  - You are about to drop the column `avatar_url` on the `Competitor` table. All the data in the column will be lost.
  - You are about to drop the column `country_iso2` on the `Competitor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Competitor` DROP COLUMN `avatar_url`,
    DROP COLUMN `country_iso2`,
    ADD COLUMN `avatarUrl` VARCHAR(191) NULL,
    ADD COLUMN `countryIso2` VARCHAR(191) NULL;
