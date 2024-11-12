/*
  Warnings:

  - Changed the type of `board` on the `DailyPuzzle` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "DailyPuzzle" DROP COLUMN "board",
ADD COLUMN     "board" JSONB NOT NULL;
