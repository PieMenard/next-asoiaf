import { FormEvent } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

type SearchCharacterProps = {
  query: string;
  setQuery: (term: string) => void;
  handleSearch: (e: FormEvent<HTMLFormElement>) => void;
};

const SearchCharacter = ({
  query,
  setQuery,
  handleSearch,
}: SearchCharacterProps) => {
  return (
    <div className="w-[30%] mx-auto">
      <form onSubmit={handleSearch} className="flex gap-3">
        <Input
          placeholder="Search..."
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-slate-300"
        />
        <Button variant="secondary" type="submit">
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchCharacter;
