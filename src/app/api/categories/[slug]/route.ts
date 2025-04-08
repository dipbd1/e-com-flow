import { NextResponse } from 'next/server';
import data from '@/data/data.json';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const category = data.categories.find(
      (category) => category.slug === params.slug
    );

    if (!category) {
      return new NextResponse('Category not found', { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 