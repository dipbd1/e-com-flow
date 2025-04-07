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
    <>
      {/* Show server-rendered slide only before client slider is ready */}

      <div className="server-rendered-slide relative aspect-[21/9] overflow-hidden rounded-lg">
        <Image
          src={featuredSlide.image || '/images/placeholder-banner.jpg'}
          alt={featuredSlide.title}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center bg-gradient-to-r from-black/70 to-transparent p-8 text-white">
          <h2 className="max-w-md text-3xl font-bold sm:text-4xl">{featuredSlide.title}</h2>
          <p className="mt-2 max-w-md text-lg">{featuredSlide.subtitle}</p>
          <Link
            href={featuredSlide.ctaLink}
            className="mt-4 inline-flex w-fit items-center justify-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-white/90"
          >
            {featuredSlide.ctaText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
      

      {/* Client-side carousel notifies parent when it's mounted */}
      <ClientSideSlider slides={slides} />
    </>
  );
}