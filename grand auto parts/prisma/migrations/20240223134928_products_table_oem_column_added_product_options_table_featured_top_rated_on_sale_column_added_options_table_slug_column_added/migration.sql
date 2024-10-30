-- AlterTable
ALTER TABLE "Options" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "ProductOptions" ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "on_sale" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "top_rated" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "oem" TEXT;
