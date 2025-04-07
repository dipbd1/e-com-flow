"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingCart, User, Menu, X, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { CartBadgeSkeleton } from '@/components/cart/CartBadgeSkeleton';

const Header = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const { items = [] } = useSelector((state: RootState) => state.cart);
  
  useEffect(() => {
    setIsLoading(false);
  }, []);

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Categories', href: '/categories' },
    { name: 'Deals', href: '/deals' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">E-Commerce X1</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Desktop Search */}
            {isSearchOpen ? (
              <div className="hidden md:flex items-center bg-muted rounded-md overflow-hidden">
                <Input 
                  type="search" 
                  placeholder="Search products..." 
                  className="border-none h-9 w-[200px] lg:w-[300px] bg-transparent focus-visible:ring-0"
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-9 w-9"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X size={18} />
                </Button>
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                className="hidden md:flex h-9 w-9" 
                onClick={() => setIsSearchOpen(true)}
              >
                <Search size={18} />
              </Button>
            )}

            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Account */}
            <Link href="/account">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <User size={18} />
              </Button>
            </Link>
            
            {/* Login */}
            <Link
              href="/login"
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
            >
              <LogIn size={20} />
              <span>Login</span>
            </Link>
            
            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="h-9 w-9 relative">
                <ShoppingCart size={18} />
                {isLoading ? (
                  <CartBadgeSkeleton />
                ) : cartItemsCount > 0 ? (
                  <span className="absolute -top-1 -right-1 h-4 w-4 text-[10px] flex items-center justify-center rounded-full bg-primary text-primary-foreground">
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </span>
                ) : null}
              </Button>
            </Link>
            
            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden h-9 w-9" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Search - Always visible for mobile */}
        <div className="pb-3 md:hidden">
          <div className="flex items-center bg-muted rounded-md overflow-hidden">
            <Input 
              type="search" 
              placeholder="Search products..." 
              className="border-none h-9 bg-transparent focus-visible:ring-0"
            />
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Search size={18} />
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;