"use client"
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingCart, User, Menu, X, LogIn, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { CartBadgeSkeleton } from '@/components/cart/CartBadgeSkeleton';
import { CartPreview } from '@/components/cart/CartPreview';

const Header = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const pathname = usePathname();
  const { items = [] } = useSelector((state: RootState) => state.cart);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleMouseEnter = (itemName: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(itemName);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      if (!isHovering) {
        setActiveDropdown(null);
      }
    }, 200); // Small delay before closing
  };

  const handleDropdownMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovering(true);
  };

  const handleDropdownMouseLeave = () => {
    setIsHovering(false);
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const navItems = [
    { 
      name: 'Home', 
      href: '/' 
    },
    { 
      name: 'Products', 
      href: '/products',
      dropdown: [
        { name: 'All Products', href: '/products' },
        { name: 'New Arrivals', href: '/products?filter=new' },
        { name: 'Best Sellers', href: '/products?filter=best' },
      ]
    },
    { 
      name: 'Categories', 
      href: '/categories',
      dropdown: [
        { name: 'Electronics', href: '/categories/electronics' },
        { name: 'Fashion', href: '/categories/fashion' },
        { name: 'Home & Living', href: '/categories/home' },
      ]
    },
    { 
      name: 'Deals', 
      href: '/deals',
      badge: 'Hot'
    },
    { 
      name: 'About', 
      href: '/about' 
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="hidden md:flex items-center justify-between h-8 text-xs text-muted-foreground border-b">
            <div className="flex items-center space-x-4">
              <span>Free shipping on orders over $50</span>
              <span>|</span>
              <span>30-day return policy</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
              <Link href="/help" className="hover:text-primary transition-colors">Help Center</Link>
            </div>
          </div>

          {/* Main Header */}
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-2xl sm:text-xl font-bold bg-gradient-to-r from-pink-800 to-violet-600 bg-clip-text text-transparent whitespace-nowrap tracking-tight">
                  E-Commerce X1
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-center space-x-1 lg:space-x-2 xl:space-x-4 mx-auto">
              {navItems.map((item) => (
                <div 
                  key={item.name} 
                  className="relative group px-1 lg:px-2"
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center text-sm font-medium transition-colors hover:text-primary whitespace-nowrap ${
                      pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    {item.name}
                    {item.badge && (
                      <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-red-600 text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                    {item.dropdown && (
                      <ChevronDown
                        color='white'
                        strokeWidth={4}
                        size={14} 
                        className="ml-1 pt-[1px] bg-blue-400 rounded-full group-hover:bg-blue-600" 
                      />
                    )}
                  </Link>
                  
                  {/* Dropdown Menu */}
                  {item.dropdown && activeDropdown === item.name && (
                    <div 
                      className="absolute top-full left-0 w-48 py-2 mt-1 bg-background border rounded-lg shadow-lg"
                      onMouseEnter={handleDropdownMouseEnter}
                      onMouseLeave={handleDropdownMouseLeave}
                    >
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              {/* Desktop Search */}
              {isSearchOpen ? (
                <div className="hidden md:flex items-center bg-muted rounded-full overflow-hidden transition-all duration-300 w-[300px]">
                  <Input 
                    type="search" 
                    placeholder="Search products..." 
                    className="border-none h-9 bg-transparent focus-visible:ring-0"
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
                className="hidden md:flex items-center space-x-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <LogIn size={18} />
                <span>Login</span>
              </Link>
              
              {/* Cart */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-9 w-9 relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart size={18} />
                {isLoading ? (
                  <CartBadgeSkeleton />
                ) : cartItemsCount > 0 ? (
                  <span className="absolute -top-1 -right-1 h-4 w-4 text-[10px] flex items-center justify-center rounded-full bg-primary text-primary-foreground">
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </span>
                ) : null}
              </Button>
              
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
          
          {/* Mobile Search */}
          <div className="pb-3 md:hidden">
            <div className="flex items-center bg-muted rounded-full overflow-hidden">
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
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center justify-between text-sm font-medium transition-colors hover:text-primary ${
                        pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                      }`}
                      onClick={() => !item.dropdown && setIsMenuOpen(false)}
                    >
                      <span className="flex items-center">
                        {item.name}
                        {item.badge && (
                          <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-accent text-white rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </span>
                      {item.dropdown && (
                        <ChevronDown 
                          size={16} 
                          className={`transform transition-transform ${
                            activeDropdown === item.name ? 'rotate-180' : ''
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveDropdown(activeDropdown === item.name ? null : item.name);
                          }}
                        />
                      )}
                    </Link>
                    {item.dropdown && activeDropdown === item.name && (
                      <div className="pl-4 mt-2 space-y-2">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block text-sm text-muted-foreground hover:text-primary"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Cart Preview */}
      <CartPreview 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </>
  );
};

export default Header;