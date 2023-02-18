-- CreateEnum
CREATE TYPE "Type" AS ENUM ('TRACK', 'ALBUM', 'ARTIST');

-- CreateTable
CREATE TABLE "Favs" (
    "type" "Type" NOT NULL,
    "id" TEXT NOT NULL,

    CONSTRAINT "Favs_pkey" PRIMARY KEY ("type","id")
);
