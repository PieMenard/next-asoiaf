import { Character } from '@/types/types';

const CharacterCard = ({ char }: { char: Character }) => {
  return (
    <div className="border-2 w-[280px] h-[350px] mx-5 text-center bg-slate-400 rounded-md">
      <h1 className="font-semibold my-3">
        {char.id}. {char.name}
      </h1>
      <p className="italic"> {char.gender}</p>
      <div className="my-3">
        <h1 className="font-semibold">Houses</h1>
        <ul>
          {char.houses.map((house, index) => (
            <li key={index}>{house}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CharacterCard;
