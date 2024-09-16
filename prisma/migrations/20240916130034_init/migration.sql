-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'VOLUNTEER');

-- CreateEnum
CREATE TYPE "CrisisStatus" AS ENUM ('PENDING', 'APPROVED', 'RESOLVED');

-- CreateEnum
CREATE TYPE "CrisisSeverity" AS ENUM ('Low', 'Medium', 'High', 'Critical');

-- CreateEnum
CREATE TYPE "InventoryType" AS ENUM ('RELIEF', 'EXPENSE');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "phone" TEXT,
    "role" "UserRole" NOT NULL,
    "age" INTEGER NOT NULL,
    "avatar" TEXT,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crisis" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrls" TEXT[],
    "locations" TEXT[],
    "severity" "CrisisSeverity" NOT NULL,
    "status" "CrisisStatus" NOT NULL,
    "requiredHelp" TEXT NOT NULL,
    "approvedBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "crisis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donations" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "donorName" TEXT NOT NULL,
    "donorEmail" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "donations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "InventoryType" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inventories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL,
    "location" TEXT NOT NULL,
    "assignedTo" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "crisis" ADD CONSTRAINT "crisis_approvedBy_fkey" FOREIGN KEY ("approvedBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventories" ADD CONSTRAINT "inventories_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_assignedTo_fkey" FOREIGN KEY ("assignedTo") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
