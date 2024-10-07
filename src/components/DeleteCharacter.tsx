import { Trash2Icon } from 'lucide-react';
import { Button } from './ui/button';

const DeleteCharacter = ({
  id,
  refetchCharacters,
}: {
  id: number;
  refetchCharacters: () => void;
}) => {
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete this character?`)) {
      const res = await fetch(`/api/characters/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        refetchCharacters();
        console.log('deleted');
      }
    }
  };
  return (
    <div>
      <Button variant={'destructive'} onClick={handleDelete}>
        <Trash2Icon />
      </Button>
    </div>
  );
};

export default DeleteCharacter;
