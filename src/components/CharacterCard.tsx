import { Character } from '@/types/types';
import DeleteCharacter from './DeleteCharacter';

const CharacterCard = ({ char }: { char: Character }) => {
  return (
    <div className="relative border-2 w-[280px] h-[350px] mx-5 my-4 text-center bg-slate-400 rounded-md">
      <h1 className="font-semibold my-3">
        {char.id}. {char.name}
      </h1>
      <p className="italic"> {char.gender}</p>
      <div className="my-3">
        <h1 className="font-semibold">Houses</h1>
        <ul>
          {char.houses.map((house, index) => (
            <li key={index}>{house.name}</li>
          ))}
        </ul>
      </div>
      <div className="absolute bottom-0 right-0 m-4">
        <DeleteCharacter id={char.id} />
      </div>
    </div>
  );
};

export default CharacterCard;
