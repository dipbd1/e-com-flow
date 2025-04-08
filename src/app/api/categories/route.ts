import { NextResponse } from 'next/server';
import data from '@/data/data.json';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
      const category = data.categories.find(cat => cat.slug === slug);
      if (!category) {
        return new NextResponse('Category not found', { status: 404 });
      }
      return NextResponse.json(category);
    }

    return NextResponse.json(data.categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}