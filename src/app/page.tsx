'use client';

import { Character } from '@/types/types';
import { useEffect, useState } from 'react';
import CharacterCard from './components/CharacterCard';

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
      <h1 className="text-center font-bold text-3xl my-4 text-white">
        A Song of Ice and Fire Characters
      </h1>
      <ul className="my-5 mx-5 flex flex-wrap">
        {characters.map((char) => (
          <li key={char.id} className="my-5">
            <CharacterCard char={char} />
          </li>
        ))}
      </ul>
    </main>
  );
}
