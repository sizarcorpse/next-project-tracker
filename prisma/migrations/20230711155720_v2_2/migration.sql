-- CreateEnum
CREATE TYPE "ProjectStage" AS ENUM ('CONCEPT', 'PLANNING', 'DESIGN', 'DEVELOPMENT', 'TESTING', 'DEPLOYMENT', 'MAINTENANCE');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ProjectPriority" ADD VALUE 'LOWEST';
ALTER TYPE "ProjectPriority" ADD VALUE 'HIGHEST';

-- AlterEnum
ALTER TYPE "ProjectStatus" ADD VALUE 'DRAFT';

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "stage" "ProjectStage" NOT NULL DEFAULT 'CONCEPT';
