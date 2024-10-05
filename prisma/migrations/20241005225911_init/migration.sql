-- CreateTable
CREATE TABLE "House" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "words" TEXT NOT NULL,

    CONSTRAINT "House_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CharactersOnHouses" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CharactersOnHouses_AB_unique" ON "_CharactersOnHouses"("A", "B");

-- CreateIndex
CREATE INDEX "_CharactersOnHouses_B_index" ON "_CharactersOnHouses"("B");

-- AddForeignKey
ALTER TABLE "_CharactersOnHouses" ADD CONSTRAINT "_CharactersOnHouses_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharactersOnHouses" ADD CONSTRAINT "_CharactersOnHouses_B_fkey" FOREIGN KEY ("B") REFERENCES "House"("id") ON DELETE CASCADE ON UPDATE CASCADE;
