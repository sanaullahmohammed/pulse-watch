/*
  Warnings:

  - You are about to drop the column `role` on the `teams` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "OrganizationRole" AS ENUM ('OWNER', 'ADMIN', 'TEAM_ADMIN', 'SERVICE_MANAGER', 'STATUS_REPORTER', 'TEAM_MEMBER', 'BILLING_MANAGER');

-- AlterTable
ALTER TABLE "team_members" ADD COLUMN     "role" "OrganizationRole" NOT NULL DEFAULT 'TEAM_MEMBER';

-- AlterTable
ALTER TABLE "teams" DROP COLUMN "role";
