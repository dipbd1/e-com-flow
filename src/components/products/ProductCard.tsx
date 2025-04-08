'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Product } from '@/types/product';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div 
      className="group relative bg-surface-light dark:bg-surface-dark rounded-xl p-4 transition-all duration-300 hover:shadow-lg dark:hover:shadow-gray-800/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Wishlist Button */}
      <button
        onClick={() => setIsWishlisted(!isWishlisted)}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-all duration-300 hover:scale-110"
        aria-label="Add to wishlist"
      >
        <Heart
          size={20}
          className={`transition-colors duration-300 ${
            isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'
          }`}
        />
      </button>

      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-800">
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0] || '/images/placeholder.jpg'}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-center transition-all duration-500 group-hover:scale-110"
              priority={false}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-200 dark:bg-gray-700">
              <span className="text-sm text-gray-500 dark:text-gray-400">No image</span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {product.newArrival && (
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                New
              </span>
            )}
            {product.onSale && product.salePrice && (
              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                {Math.round(((product.price - product.salePrice) / product.price) * 100)}% Off
              </span>
            )}
          </div>

          {/* Quick Add to Cart */}
          {/* <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <button className="w-full flex items-center justify-center gap-2 bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white py-2 px-4 rounded-lg font-medium hover:bg-white dark:hover:bg-gray-700 transition-colors">
              <ShoppingCart size={16} />
              Add to Cart
            </button>
          </div> */}
        </div>

        <div className="mt-4 space-y-2">
          <h3 className="text-base font-semibold text-text-primary dark:text-text-dark-primary group-hover:text-text-hover dark:group-hover:text-text-dark-hover transition-colors line-clamp-2">
            {product.name}
          </h3>
          
          <div className="flex flex-row justify-between flex-wrap gap-2">
            {/* Price */}
            <div className="flex items-center gap-2">
              {product.salePrice ? (
                <>
                  <span className="text-lg font-bold text-primary">${product.salePrice.toFixed(2)}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 line-through">${product.price.toFixed(2)}</span>
                </>
              ) : (
                <span className="text-lg font-bold text-text-primary dark:text-text-dark-primary">${product.price.toFixed(2)}</span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">({product.reviewCount})</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}