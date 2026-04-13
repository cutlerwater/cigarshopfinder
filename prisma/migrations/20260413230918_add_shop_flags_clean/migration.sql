-- AlterTable
ALTER TABLE "Shop" ADD COLUMN     "canBringInLiquor" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasAcid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasBigTV" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasCoffeeMaker" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasDavidoffs" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasEvents" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasHooka" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasIceMaker" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasInternetAccess" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasLiquorLicense" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasMemberAccess" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasOpusX" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasPadrons" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasPipeTobacco" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "Review_shopId_idx" ON "Review"("shopId");
