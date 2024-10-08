/*
  Warnings:

  - You are about to drop the column `crisiId` on the `tasks` table. All the data in the column will be lost.
  - Added the required column `crisisId` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_crisiId_fkey";

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "crisiId",
ADD COLUMN     "crisisId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_crisisId_fkey" FOREIGN KEY ("crisisId") REFERENCES "crisis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
