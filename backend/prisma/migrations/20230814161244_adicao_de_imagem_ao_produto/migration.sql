/*
  Warnings:

  - You are about to alter the column `foto` on the `produto` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `produto` MODIFY `foto` VARCHAR(191) NULL;
