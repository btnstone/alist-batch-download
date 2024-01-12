/*
  Warnings:

  - You are about to drop the column `status` on the `alist_download_list` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `alist_download_list` DROP COLUMN `status`,
    ADD COLUMN `handleStatus` VARCHAR(191) NOT NULL DEFAULT 'processing';
