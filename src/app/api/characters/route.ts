//ROUTE /CHARACTERS

import { prisma } from '@/utils/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const character = await prisma.character.create({
      data: {
        id: data.id,
        name: data.name,
        gender: data.gender,
        houses: {
          connect: data.houses.map((houseData: any) => ({
            id: houseData.house.id,
          })),
        },
      },
      include: {
        houses: true,
      },
    });
    return NextResponse.json({ success: true, data: character });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 400 });
  }
}
