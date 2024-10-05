//ROUTE /HOUSES

import { prisma } from '@/utils/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const house = await prisma.house.create({
      data: {
        id: data.id,
        name: data.name,
        words: data.words,
      },
    });
    return NextResponse.json({ success: true, data: house });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
