'use client';

import { Character } from '@/types/types';
import { use, useEffect, useState } from 'react';
import CharacterCard from '../components/CharacterCard';
import Pagination from '../components/Pagination';

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchCharacterList = async () => {
      try {
        const res = await fetch(
          `https://anapioficeandfire.com/api/characters?page=${page}`
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
        setCharacters(charactersInfo);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacterList();
  }, [page]);

  return (
    <main className="text-center">
      <h1 className="font-bold text-3xl text-white my-4">
        A Song of Ice and Fire Characters
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="my-5 mx-5 flex flex-wrap">
          {characters.map((char) => (
            <li key={char.id}>
              <CharacterCard char={char} />
            </li>
          ))}
        </ul>
      )}
      <Pagination page={page} setPage={setPage} />
    </main>
  );
}
