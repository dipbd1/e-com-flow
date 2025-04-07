import { NextResponse } from 'next/server';
import { getProductBySlug } from '@/lib/data';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const product = getProductBySlug(params.slug);
  
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(product);
} 