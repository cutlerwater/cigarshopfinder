/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_shopId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "Shop" ADD COLUMN     "canbringinliquor" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasAcid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasBigTV" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasDavidoffs" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasEvents" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasHooka" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasMemberAccess" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasOpusX" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasPadrons" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasPipeTobacco" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hascoffeemaker" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasicemaker" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasinternetaccess" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasliquorlicense" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hours" TEXT,
ADD COLUMN     "rating" DOUBLE PRECISION,
ADD COLUMN     "reviewCount" INTEGER;

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Review";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "VerificationToken";
