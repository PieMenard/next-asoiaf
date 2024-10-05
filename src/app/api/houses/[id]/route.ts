//ROUTE /HOUSES/[ID]

import { prisma } from '@/utils/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const house = await prisma.house.findUnique({
      where: { id },
    });
    if (!house) {
      return NextResponse.json(
        { success: false, error: 'Not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: house });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const data = await req.json();
    const house = await prisma.house.update({
      where: { id },
      data: {
        name: data.name,
        words: data.words,
      },
    });
    if (!house) {
      return NextResponse.json(
        { success: false, error: 'Not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: house });
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
    const house = await prisma.house.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: `deleted ${house.name}`,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
