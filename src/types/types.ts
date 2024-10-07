import { House } from '@prisma/client';

export type Character = {
  name: string;
  gender: string;
  houses: House[];
  id: number;
};
