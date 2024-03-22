/*
  Warnings:

  - Added the required column `postalCode` to the `OrderAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderAddress" ADD COLUMN     "postalCode" TEXT NOT NULL;
