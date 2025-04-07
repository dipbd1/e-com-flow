"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { SliderItem } from '@/types';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface ClientSideSliderProps {
  slides: SliderItem[];
}

export function ClientSideSlider({ slides }: ClientSideSliderProps) {
  const [mounted, setMounted] = useState(false);

  // Initialize carousel with autoplay plugin
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, startIndex: 0 }, 
    [Autoplay({ delay: 6000, stopOnInteraction: false })]
  );
  
  // Only show after first render to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    
    // Hide server-rendered slide when client slider is ready
    const serverSlide = document.querySelector('.server-rendered-slide');
    if (serverSlide) {
      serverSlide.classList.add('hidden');
    }
  }, []);
  
  if (!mounted) {
    return null;
  }

  return (
    <div className="client-side-slider relative aspect-[21/9] overflow-hidden rounded-lg">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div key={slide.id} className="flex-[0_0_100%] min-w-0 relative h-full">
              <Image
                src={slide.image || '/images/placeholder-banner.jpg'}
                alt={slide.title}
                fill
                sizes="100vw"
                priority={index === 0}
                className="object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-center bg-gradient-to-r from-black/70 to-transparent p-8 text-white">
                <h2 className="max-w-md text-3xl font-bold sm:text-4xl">{slide.title}</h2>
                <p className="mt-2 max-w-md text-lg">{slide.subtitle}</p>
                <Link
                  href={slide.ctaLink}
                  className="mt-4 inline-flex w-fit items-center justify-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-white/90"
                >
                  {slide.ctaText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}