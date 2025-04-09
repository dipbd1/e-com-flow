"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SliderItem } from '@/types';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ClientSideSliderProps {
  slides: SliderItem[];
}

export function ClientSideSlider({ slides }: ClientSideSliderProps) {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for cursor tracking
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Smooth spring animation for cursor values
  const springConfig = { damping: 20, stiffness: 300 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  // Transform cursor position to parallax movement
  const rotateX = useTransform(springY, [-100, 100], [5, -5]);
  const rotateY = useTransform(springX, [-100, 100], [-5, 5]);

  // Initialize carousel with autoplay plugin
  const [emblaRef,] = useEmblaCarousel(
    { loop: true, startIndex: 0 },
    [Autoplay({ delay: 6000, stopOnInteraction: false })]
  );

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate cursor position relative to center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    cursorX.set(x - centerX);
    cursorY.set(y - centerY);
  };

  // Only show after first render to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);

    // Hide server-rendered slide when client slider is ready
    const serverSlide = document.querySelector('.server-rendered-slide') as HTMLElement;
    if (serverSlide) {
      serverSlide.style.display = 'none';
    }
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative aspect-[21/13] sm:aspect-[21/9] overflow-hidden rounded-lg w-full">
      <motion.div 
        className="absolute inset-0"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          // Reset cursor position
          cursorX.set(0);
          cursorY.set(0);
        }}
        style={{
          perspective: '1000px',
        }}
      >
        <motion.div 
          className="overflow-hidden h-full rounded-lg" 
          ref={emblaRef}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.1s ease-out',
          }}
        >
          <div className="flex h-full rounded-lg">
            {slides.map((slide, index) => (
              <motion.div 
                key={slide.id} 
                className="flex-[0_0_100%] min-w-0 relative h-full"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <Image
                  src={slide.image || '/images/placeholder-banner.jpg'}
                  alt={slide.title}
                  fill
                  sizes="100vw"
                  priority={index === 0}
                  className="object-cover "
                />
                <motion.div 
                  className="absolute inset-0 flex flex-col justify-center bg-gradient-to-r from-black/70 to-transparent p-8 text-white"
                  style={{
                    transform: 'translateZ(20px)',
                  }}
                >
                  <motion.h2 
                    className="max-w-md text-3xl font-bold sm:text-4xl"
                    style={{
                      transform: 'translateZ(30px)',
                    }}
                  >
                    {slide.title}
                  </motion.h2>
                  <motion.p 
                    className="mt-2 max-w-md text-lg"
                    style={{
                      transform: 'translateZ(25px)',
                    }}
                  >
                    {slide.subtitle}
                  </motion.p>
                  <motion.div
                    style={{
                      transform: 'translateZ(40px)',
                    }}
                  >
                    <Link
                      href={slide.ctaLink}
                      className="mt-4 inline-flex w-fit items-center justify-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-white/90"
                    >
                      {slide.ctaText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}