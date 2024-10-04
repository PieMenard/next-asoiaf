'use client';

import { Character } from '@/types/types';
import { use, useEffect, useState } from 'react';

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
      {loading ? (
        <p>Loading...</p>
      ) : (
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
      )}

      <div>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
          className="rounded-md bg-slate-300 px-2 mx-2 hover:bg-slate-400 disabled:opacity-40 disabled:pointer-events-none"
        >
          Prev
        </button>
        {page}
        <button
          onClick={() => setPage(page + 1)}
          className="rounded-md bg-slate-300 px-2 mx-2 hover:bg-slate-400"
        >
          Next
        </button>
      </div>
    </main>
  );
}
