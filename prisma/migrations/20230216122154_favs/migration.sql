/*
  Warnings:

  - The primary key for the `Favs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `type` on the `Favs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "favsId" TEXT;

-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "favsId" TEXT;

-- AlterTable
ALTER TABLE "Favs" DROP CONSTRAINT "Favs_pkey",
DROP COLUMN "type",
ADD CONSTRAINT "Favs_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "favsId" TEXT;

-- DropEnum
DROP TYPE "Type";

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_favsId_fkey" FOREIGN KEY ("favsId") REFERENCES "Favs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_favsId_fkey" FOREIGN KEY ("favsId") REFERENCES "Favs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_favsId_fkey" FOREIGN KEY ("favsId") REFERENCES "Favs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
