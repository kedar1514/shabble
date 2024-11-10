/*
  Warnings:

  - The values [PLAYING,WON,LOST] on the enum `GameStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "GameStatus_new" AS ENUM ('playing', 'won', 'lost');
ALTER TABLE "UserProgress" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "UserProgress" ALTER COLUMN "status" TYPE "GameStatus_new" USING ("status"::text::"GameStatus_new");
ALTER TYPE "GameStatus" RENAME TO "GameStatus_old";
ALTER TYPE "GameStatus_new" RENAME TO "GameStatus";
DROP TYPE "GameStatus_old";
ALTER TABLE "UserProgress" ALTER COLUMN "status" SET DEFAULT 'playing';
COMMIT;

-- AlterTable
ALTER TABLE "UserProgress" ALTER COLUMN "status" SET DEFAULT 'playing';
