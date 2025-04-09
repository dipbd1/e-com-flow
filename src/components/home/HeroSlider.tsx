import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SliderItem } from '@/types';
import { ClientSideSlider } from './ClientSideSlider';


interface HeroSliderProps {
  slides: SliderItem[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  // This state is used to manage which component is shown

  if (!slides || slides.length === 0) {
    return (
      <div className="relative aspect-[21/9] bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No banner content available</p>
      </div>
    );
  }

  // Server-render the first slide for immediate display and SEO
  const featuredSlide = slides[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full">
      {/* Server-rendered slide (will be hidden when client-side loads) */}
      <div className="server-rendered-slide col-span-full md:col-span-8 md:col-start-1 md:row-start-1 relative aspect-[21/13] sm:aspect-[21/9] overflow-hidden rounded-lg z-10">
        <Image
          src={featuredSlide.image || '/images/placeholder-banner.jpg'}
          alt={featuredSlide.title}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center bg-gradient-to-r from-black/70 to-transparent p-8 text-white">
          <h2 className="max-w-md text-2xl sm:text-3xl md:text-4xl font-bold">{featuredSlide.title}</h2>
          <p className="mt-2 max-w-md text-sm sm:text-base md:text-lg">{featuredSlide.subtitle}</p>
          <Link
            href={featuredSlide.ctaLink}
            className="mt-4 inline-flex w-fit items-center justify-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-white/90"
          >
            {featuredSlide.ctaText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Client-side slider positioned in the same column as the server-rendered slide */}
      <div className="col-span-full md:col-span-8 md:col-start-1 md:row-start-1 z-20 rounded-lg">
        <ClientSideSlider slides={slides} />
      </div>

      {/* Countdown timer (always visible) */}
      <div className="col-span-full md:col-span-4 min-h-[150px] sm:min-h-[180px] md:min-h-0 flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center py-6 md:py-0">
          <h3 className="text-xl font-bold">Sale Ends In:</h3>
          <div className="mt-2 text-2xl font-semibold">
            00:00:00
          </div>
          <p className="mt-1 text-sm text-gray-600">Hrs : Min : Sec</p>
        </div>
      </div>
    </div>
  );
}