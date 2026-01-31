/*
  Warnings:

  - You are about to drop the column `sellerId` on the `medicine` table. All the data in the column will be lost.
  - Added the required column `Creater` to the `medicine` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "medicine" DROP CONSTRAINT "medicine_sellerId_fkey";

-- AlterTable
ALTER TABLE "medicine" DROP COLUMN "sellerId",
ADD COLUMN     "Creater" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "medicine" ADD CONSTRAINT "medicine_Creater_fkey" FOREIGN KEY ("Creater") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
