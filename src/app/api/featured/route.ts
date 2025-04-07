import { NextResponse } from 'next/server';
import { getHeroSlides, getPromotions } from '@/lib/data';

export async function GET() {
  const [heroSlides, promotions] = await Promise.all([
    getHeroSlides(),
    getPromotions()
  ]);

  return NextResponse.json({
    heroSlider: heroSlides,
    promotions: promotions
  });
}