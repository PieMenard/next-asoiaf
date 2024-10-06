//ROUTE /CHARACTERS/[ID]

import { prisma } from '@/utils/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const character = await prisma.character.findUnique({
      where: { id },
      include: {
        houses: true,
      },
    });
    if (!character) {
      return NextResponse.json(
        { success: false, error: 'Not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: character });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();
    const id = parseInt(params.id);
    const existingCharacter = await prisma.character.findUnique({
      where: { id },
      include: {
        houses: true,
      },
    });
    if (!existingCharacter) {
      return NextResponse.json(
        { success: false, error: 'Character not found' },
        { status: 404 }
      );
    }

    const currentHousesIds = existingCharacter.houses.map((house) => house.id);

    const newHousesIds = data.houses.map(
      (houseData: any) => houseData.house.id
    );

    const housesToConnect = newHousesIds.filter(
      (id: number) => !currentHousesIds?.includes(id)
    );

    const housesToDisconnect = currentHousesIds.filter(
      (id: number) => !newHousesIds?.includes(id)
    );

    const character = await prisma.character.update({
      where: { id },
      data: {
        name: data.name,
        gender: data.gender,
        houses: {
          connect: housesToConnect.map((houseId: number) => ({
            id: houseId,
          })),
          disconnect: housesToDisconnect.map((houseId: number) => ({
            id: houseId,
          })),
        },
      },
      include: {
        houses: true,
      },
    });

    return NextResponse.json({ success: true, data: character });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const character = await prisma.character.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: `deleted ${character.name}`,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
