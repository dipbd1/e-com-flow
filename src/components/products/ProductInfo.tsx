import { Product } from '@/types/product';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'h-4 w-4',
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                )}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">
            ({product.reviewCount} reviews)
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-2xl font-bold">
          ${product.salePrice ? product.salePrice.toFixed(2) : product.price.toFixed(2)}
        </div>
        {product.salePrice && (
          <div className="text-lg text-gray-500 line-through">
            ${product.price.toFixed(2)}
          </div>
        )}
      </div>

      <p className="text-gray-600">{product.description}</p>

      <div className="space-y-2">
        <h3 className="font-semibold">Features</h3>
        <ul className="list-disc pl-4 space-y-1">
          {product.features.map((feature, index) => (
            <li key={index} className="text-gray-600">
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Specifications</h3>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(product.specifications).map(([key, value]) => (
            <div key={key} className="text-sm">
              <span className="font-medium">{key}:</span>{' '}
              <span className="text-gray-600">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 