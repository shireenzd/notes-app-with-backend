/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Note` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_ownerId_fkey";

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "ownerId";
