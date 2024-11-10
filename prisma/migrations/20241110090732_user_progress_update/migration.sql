/*
  Warnings:

  - You are about to drop the column `attemptsRemaining` on the `UserProgress` table. All the data in the column will be lost.
  - The `status` column on the `UserProgress` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('PLAYING', 'WON', 'LOST');

-- AlterTable
ALTER TABLE "UserProgress" DROP COLUMN "attemptsRemaining",
ADD COLUMN     "hintCount" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "hintCoordinates" SET DEFAULT '[]',
DROP COLUMN "status",
ADD COLUMN     "status" "GameStatus" NOT NULL DEFAULT 'PLAYING',
ALTER COLUMN "stars" DROP NOT NULL;
