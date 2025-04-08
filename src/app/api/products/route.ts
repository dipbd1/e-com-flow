import { NextResponse } from 'next/server';
import data from '@/data/data.json';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const isNew = searchParams.get('new') === 'true';

    let products = [...data.products];

    if (category) {
      products = products.filter(product => product.categoryId === category);
    }

    if (isNew) {
      products = products.filter(product => product.newArrival);
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}