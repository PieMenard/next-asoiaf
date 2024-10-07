import { Trash2Icon } from 'lucide-react';
import { Button } from './ui/button';

const DeleteCharacter = ({ id }: { id: number }) => {
  const handleDelete = async () => {
    const res = await fetch(`/api/characters/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.success) {
      console.log('deleted');
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
