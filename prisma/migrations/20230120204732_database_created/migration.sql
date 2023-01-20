-- CreateTable
CREATE TABLE "News" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "content" TEXT,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);
