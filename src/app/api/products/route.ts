import { NextResponse } from 'next/server';
import { getAllProducts, getNewArrivals, getOnSaleProducts, getProductsByCategory } from '@/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get('featured') === 'true';
  const newArrivals = searchParams.get('new') === 'true';
  const onSale = searchParams.get('sale') === 'true';
  const category = searchParams.get('category');

  let products;

  if (featured) {
    products = (await getAllProducts()).filter(product => product.featured);
  } else if (newArrivals) {
    products = await getNewArrivals();
  } else if (onSale) {
    products = await getOnSaleProducts();
  } else if (category) {
    products = await getProductsByCategory(category);
  } else {
    products = await getAllProducts();
  }

  return NextResponse.json(products);
}