import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    const response = await fetch(
      'https://anapioficeandfire.com/api/characters?page=16'
    );
    const characters = await response.json();

    for (const character of characters) {
      // Fetch full house data based on allegiances
      const fetchHouses = character.allegiances.map(
        async (houseUrl: string) => {
          const resHouse = await fetch(houseUrl);
          const houseData = await resHouse.json();
          return {
            id: parseInt(houseData.url.split('/').pop()), // Extract house ID from URL
            name: houseData.name,
            words: houseData.words || 'No Words', // Fallback if words is missing
          };
        }
      );

      const houses = await Promise.all(fetchHouses);

      // Create character with connectOrCreate for houses
      await prisma.character.create({
        data: {
          name: character.name || 'Unknown',
          gender: character.gender || null,
          id: parseInt(character.url.split('/').pop()), // Ensure ID is numeric
          houses: {
            connectOrCreate: houses.map((house) => ({
              where: { id: house.id }, // Connect based on house ID
              create: {
                id: house.id,
                name: house.name,
                words: house.words, // Create with the required fields
              },
            })),
          },
        },
      });
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.log('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
