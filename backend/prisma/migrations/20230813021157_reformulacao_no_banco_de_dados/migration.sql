/*
  Warnings:

  - You are about to drop the column `fotos` on the `produto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `produto` DROP COLUMN `fotos`,
    ADD COLUMN `foto` LONGBLOB NULL;
