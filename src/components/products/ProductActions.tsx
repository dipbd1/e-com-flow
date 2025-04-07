'use client';

import { useState } from 'react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import AddToCartButton from '@/components/cart/AddToCartButton';
import { cn } from '@/lib/utils';

interface ProductActionsProps {
  product: Product;
}

export default function ProductActions({ product }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(
    product.variants?.[0]?.id || null
  );

  return (
    <div className="space-y-4">
      {product.variants && product.variants.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium">Select Variant</h3>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant.id)}
                className={cn(
                  'px-3 py-2 border rounded-md text-sm',
                  selectedVariant === variant.id
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                {variant.size} - {variant.color}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        <div className="flex items-center border rounded-md">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            -
          </Button>
          <span className="px-4">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </Button>
        </div>

        <AddToCartButton
          product={product}
          quantity={quantity}
          selectedAttributes={selectedVariant ? {
            size: product.variants?.find(v => v.id === selectedVariant)?.size || '',
            color: product.variants?.find(v => v.id === selectedVariant)?.color || ''
          } : undefined}
        />
      </div>
    </div>
  );
} 