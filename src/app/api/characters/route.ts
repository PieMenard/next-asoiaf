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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const offset = parseInt(searchParams.get('offset') || '0');
  const limit = parseInt(searchParams.get('limit') || '10');
  try {
    const characters = await prisma.character.findMany({
      select: {
        name: true,
        id: true,
      },
      skip: offset,
      take: limit,
    });

    const results = {
      offset: offset,
      limit: limit,
      results: characters,
    };

    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 400 });
  }
}
