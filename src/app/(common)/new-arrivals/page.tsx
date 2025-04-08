'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Filter, ChevronDown } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { Product } from '@/types/product';
import { SearchBar } from '@/components/ui/SearchBar';


async function getNewArrivals() {
  const res = await fetch('/api/products?new=true', { 
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  if (!res.ok) throw new Error('Failed to fetch new arrivals');
  return res.json();
}

async function getFilteredProducts(
  category?: string,
  priceRange?: string,
  sortBy?: string,
  searchQuery?: string
) {
  const products = await getNewArrivals();
  let filteredProducts = [...products];

  // Apply filters
  if (category) {
    filteredProducts = filteredProducts.filter(
      product => product.categoryId.toLowerCase() === category.toLowerCase()
    );
  }

  if (priceRange) {
    const [min, max] = priceRange.split('-').map(Number);
    filteredProducts = filteredProducts.filter(
      product => {
        const price = product.salePrice || product.price;
        return price >= min && price <= max;
      }
    );
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(
      product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
  }

  // Apply sorting
  if (sortBy) {
    switch (sortBy) {
      case 'Price: Low to High':
        filteredProducts.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case 'Price: High to Low':
        filteredProducts.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case 'Most Popular':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'Newest First':
      default:
        filteredProducts.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }
  }

  return filteredProducts;
}

export default function NewArrivalsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, ] = useState<string | null>(null);
  const [selectedPriceRange, ] = useState<string | null>(null);
  const [sortBy, ] = useState('Newest First');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newArrivals = await getNewArrivals();
        setProducts(newArrivals);
      } catch (error) {
        console.error('Error fetching new arrivals:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const filteredProducts = await getFilteredProducts(
          selectedCategory || undefined,
          selectedPriceRange || undefined,
          sortBy,
          searchQuery
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching filtered products:', error);
      }
    };

    fetchFilteredProducts();
  }, [selectedCategory, selectedPriceRange, sortBy, searchQuery]);

  const handleSearch = async () => {
    try {
      const filteredProducts = await getFilteredProducts(
        selectedCategory || undefined,
        selectedPriceRange || undefined,
        sortBy,
        searchQuery
      );
      setProducts(filteredProducts);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'New Arrivals', href: '/new-arrivals' }
        ]}
      />

      {/* Header */}
      <div className="mt-8 mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">New Arrivals</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover our latest products and stay ahead of the trends with our newest arrivals.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 max-w-md">
          <SearchBar
            placeholder="Search new arrivals..."
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} />
            Filters
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            {sortBy}
            <ChevronDown size={16} />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      {isLoading ? (
        <div className="text-center py-12">
          <p>Loading products...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* No Results */}
          {products.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter to find what you&apos;re looking for.
              </p>
            </div>
          )}

          {/* Load More Button */}
          {products.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
} 