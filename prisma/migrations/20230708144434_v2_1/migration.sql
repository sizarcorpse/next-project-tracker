/*
  Warnings:

  - The primary key for the `Technology` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[slug]` on the table `Technology` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdByUserId` to the `Technology` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Technology` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Technology` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ProjectTechnologies" DROP CONSTRAINT "_ProjectTechnologies_B_fkey";

-- AlterTable
ALTER TABLE "Technology" DROP CONSTRAINT "Technology_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdByUserId" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Technology_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Technology_id_seq";

-- AlterTable
ALTER TABLE "_ProjectTechnologies" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Technology_slug_key" ON "Technology"("slug");

-- AddForeignKey
ALTER TABLE "Technology" ADD CONSTRAINT "Technology_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectTechnologies" ADD CONSTRAINT "_ProjectTechnologies_B_fkey" FOREIGN KEY ("B") REFERENCES "Technology"("id") ON DELETE CASCADE ON UPDATE CASCADE;
