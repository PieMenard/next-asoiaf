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

  //search terms
  const idSearch = searchParams.get('id');
  const nameSearch = searchParams.get('name');
  const genderSearch = searchParams.get('gender');
  const houseSearch = searchParams.get('house');

  const filters: any = {};

  if (idSearch) {
    filters.id = parseInt(idSearch);
  }

  if (nameSearch) {
    filters.name = { contains: nameSearch, mode: 'insensitive' };
  }

  if (genderSearch) {
    filters.gender = genderSearch;
  }

  if (houseSearch) {
    filters.houses = {
      some: {
        name: {
          contains: houseSearch,
          mode: 'insensitive',
        },
      },
    };
  }

  try {
    const characters = await prisma.character.findMany({
      where: filters,
      skip: offset,
      take: limit,
      include: {
        houses: true,
      },
    });

    if (characters.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Not found' },
        { status: 404 }
      );
    }

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
