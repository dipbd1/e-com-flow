'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { AddToCartButton } from './AddToCartButton';
import { Product } from '@/lib/types';

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedVariant, setSelectedVariant] = useState<Record<string, string>>({});

  const handleVariantChange = (attribute: string, value: string) => {
    setSelectedVariant(prev => ({
      ...prev,
      [attribute]: value
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <div className="mt-2 flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-500">
              ({product.reviewCount} reviews)
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-gray-900">
              ${(product.salePrice || product.price).toFixed(2)}
            </p>
            {product.salePrice && (
              <p className="text-xl text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </p>
            )}
          </div>

          {product.attributes && Object.entries(product.attributes).map(([attribute, options]) => (
            <div key={attribute} className="space-y-2">
              <h3 className="text-sm font-medium text-gray-900 capitalize">
                {attribute}
              </h3>
              <div className="flex flex-wrap gap-2">
                {options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleVariantChange(attribute, option)}
                    className={`px-3 py-1 text-sm rounded-md border ${
                      selectedVariant[attribute] === option
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="pt-4">
            <AddToCartButton
              product={{
                id: product.id,
                name: product.name,
                price: product.salePrice || product.price,
                image: product.image,
                attributes: selectedVariant,
              }}
              size="lg"
              className="w-full"
            />
          </div>
        </div>

        <div className="prose max-w-none">
          <h2 className="text-lg font-medium text-gray-900">Description</h2>
          <p className="text-gray-600">{product.description}</p>
        </div>
      </div>
    </div>
  );
} 