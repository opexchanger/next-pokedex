-- CreateTable
CREATE TABLE "Likes" (
    "id" SERIAL NOT NULL,
    "pokemonName" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "Likes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Likes_pokemonName_key" ON "Likes"("pokemonName");
