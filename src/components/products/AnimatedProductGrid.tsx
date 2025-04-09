'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';

interface AnimatedProductGridProps {
  products: Product[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const item = {
  hidden: { 
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  show: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20
    }
  }
};

export function AnimatedProductGrid({ products }: AnimatedProductGridProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true,
    margin: "100px",
    amount: 0.1
  });

  return (
    <motion.div 
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6"
      variants={container}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={item}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
} 