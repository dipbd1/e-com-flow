import { NextResponse } from 'next/server';
import { getAllCategories, getCategoryBySlug } from '@/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  try {
    if (slug) {
      const category = getCategoryBySlug(slug);
      return NextResponse.json(category);
    }

    const categories = getAllCategories();
    console.log(categories);
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}