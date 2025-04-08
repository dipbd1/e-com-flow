import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, PhoneCall } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Footer Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div>
            <h3 className="font-bold text-lg mb-4">E-Commerce X1</h3>
            <p className="text-muted-foreground mb-4">
              Premium products with fast shipping and secure checkout.
            </p>
            <div className="flex space-x-4 mt-4">
              <Link href="https://facebook.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://twitter.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://instagram.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-primary transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-muted-foreground hover:text-primary transition-colors">
                  Special Offers
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="text-muted-foreground hover:text-primary transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-primary transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground hover:text-primary transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail size={20} className="text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">contact@ecommerce-x1.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <PhoneCall size={20} className="text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </li>
              <li className="text-muted-foreground mt-4">
                <p>123 Commerce Street</p>
                <p>New York, NY 10001</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter (Optional) */}
        <div className="border-t border-b py-8 my-8">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-bold text-lg mb-2">Subscribe to our newsletter</h3>
            <p className="text-muted-foreground mb-4">Get the latest updates on new products and special offers</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-6 mt-6 border-t text-center sm:flex sm:justify-between sm:text-left">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} E-Commerce X1. All rights reserved.
          </p>
          <div className="mt-4 sm:mt-0">
            <ul className="flex flex-wrap justify-center sm:justify-end gap-4 text-sm text-muted-foreground">
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;