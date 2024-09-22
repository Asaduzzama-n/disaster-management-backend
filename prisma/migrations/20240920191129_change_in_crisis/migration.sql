-- DropForeignKey
ALTER TABLE "crisis" DROP CONSTRAINT "crisis_approvedBy_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_assignedTo_fkey";

-- AlterTable
ALTER TABLE "crisis" ALTER COLUMN "approvedBy" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "assignedTo" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_assignedTo_fkey" FOREIGN KEY ("assignedTo") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crisis" ADD CONSTRAINT "crisis_approvedBy_fkey" FOREIGN KEY ("approvedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
