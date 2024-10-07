'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from './ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FormEvent, useRef, useState } from 'react';
import { House } from 'lucide-react';
import { Character } from '@prisma/client';

export function CreateCharacter() {
  const formRef = useRef<HTMLFormElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    houses: '',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('api/characters', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        formRef.current?.reset();
        setFormData({
          name: '',
          gender: '',
          houses: '',
        });
      }
    } catch (error) {
      console.log(error);
    }
    setDialogOpen(false);
  };
  return (
    <div className="my-3">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="secondary"
            className="bg-slate-300"
            onClick={() => setDialogOpen(true)}
          >
            Add a Character
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create a new Character</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  name="name"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  //   defaultValue={currentCharacter.name}
                  value={formData.name}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="gender" className="text-right">
                  Gender
                </Label>
                <Input
                  name="gender"
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  //   defaultValue={currentCharacter.gender}
                  value={formData.gender}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Houses
                </Label>
                <Input
                  name="house"
                  onChange={(e) =>
                    setFormData({ ...formData, houses: e.target.value })
                  }
                  //   defaultValue={currentCharacter.gender}
                  placeholder="1,2"
                  value={formData.houses}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
