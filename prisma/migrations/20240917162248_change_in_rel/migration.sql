/*
  Warnings:

  - Added the required column `crisiId` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "crisis" ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "donations" ALTER COLUMN "donorName" DROP NOT NULL,
ALTER COLUMN "donorEmail" DROP NOT NULL,
ALTER COLUMN "message" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "crisiId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_crisiId_fkey" FOREIGN KEY ("crisiId") REFERENCES "crisis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
