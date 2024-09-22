/*
  Warnings:

  - The `locations` column on the `crisis` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "crisis" DROP COLUMN "locations",
ADD COLUMN     "locations" TEXT[];
