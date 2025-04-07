'use client';

import { Product } from '@/types/product';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import ProductActions from './ProductActions';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <ProductGallery images={product.images} />
      <div className="flex flex-col gap-6">
        <ProductInfo product={product} />
        <ProductActions product={product} />
      </div>
    </div>
  );
} 