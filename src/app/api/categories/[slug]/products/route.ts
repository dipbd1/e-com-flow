import { NextResponse } from 'next/server';
import data from '@/data/data.json';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const resolvedParams = await params;
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';

    const category = data.categories.find(
      (category) => category.slug === resolvedParams.slug
    );

    if (!category) {
      return new NextResponse('Category not found', { status: 404 });
    }

    let products = data.products.filter(
      (product) => product.categoryId === category.id
    );

    // Apply search filter if search query exists
    if (searchQuery) {
      products = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery) ||
          product.description.toLowerCase().includes(searchQuery)
      );
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 