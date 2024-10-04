'use client';

import { Character } from '@/types/types';
import { useEffect, useState } from 'react';

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const fetchCharacterList = async () => {
      try {
        const res = await fetch(
          `https://anapioficeandfire.com/api/characters?page=10`
        );
        const data = await res.json();

        const fetchDetails = data.map(async (char: any) => {
          const fetchHouses = char.allegiances.map(async (house: any) => {
            const resHouse = await fetch(house);
            const houseData = await resHouse.json();
            return houseData.name;
          });
          const houses = await Promise.all(fetchHouses);
          return {
            id: char.url.split('/').pop(),
            name: char.name,
            houses: houses,
            gender: char.gender,
          };
        });
        const charactersInfo = await Promise.all(fetchDetails);
        console.log(charactersInfo);
        setCharacters(charactersInfo);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCharacterList();
  }, []);

  return (
    <main>
      <ul className="my-5 mx-5">
        {characters.map((char) => (
          <li key={char.id} className="my-5">
            <h1 className="font-semibold">
              {char.id}. {char.name} - {char.gender}
            </h1>
            <ul>
              {char.houses.map((house, index) => (
                <li key={index}>{house}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </main>
  );
}
