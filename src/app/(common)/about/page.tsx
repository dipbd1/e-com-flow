import Image from 'next/image';
import { CheckCircle2, Users, Heart, Award } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';

export default function AboutPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about/hero-bg.jpg"
            alt="About Us"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 dark:bg-blue-950" />
        </div>
        <div className="container relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Story</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Empowering customers with quality products and exceptional service since 2020
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12">
        <div className="container ">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="max-w-2xl mx-auto text-text-secondary dark:text-text-dark-secondary">
              To provide high-quality products and exceptional service while maintaining sustainable business practices and fostering community growth.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg bg-background-light dark:bg-background-dark">
              <CheckCircle2 className="w-12 h-12 text-primary dark:text-primary-dark mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality First</h3>
              <p className="text-text-secondary dark:text-text-dark-secondary">
                We carefully curate our products to ensure the highest standards of quality and reliability.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-background-light dark:bg-background-dark">
              <Users className="w-12 h-12 text-primary dark:text-primary-dark mb-4" />
              <h3 className="text-xl font-semibold mb-2">Customer Focus</h3>
              <p className="text-text-secondary dark:text-text-dark-secondary">
                Your satisfaction is our priority. We&apos;re committed to providing exceptional customer service.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-background-light dark:bg-background-dark">
              <Heart className="w-12 h-12 text-primary dark:text-primary-dark mb-4" />
              <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
              <p className="text-text-secondary dark:text-text-dark-secondary">
                We&apos;re dedicated to reducing our environmental impact and promoting sustainable practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12">
        <div className="container bg-gradient-to-r from-amber-200 via-amber-100 to-amber-50 dark:bg-blue-950 p-8 rounded-lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="max-w-2xl mx-auto text-text-secondary dark:text-text-dark-secondary">
              These core values guide everything we do and shape our company culture.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Integrity",
                description: "We conduct business with honesty and transparency, building trust with our customers and partners."
              },
              {
                title: "Innovation",
                description: "We continuously seek new ways to improve and enhance the customer experience."
              },
              {
                title: "Community",
                description: "We believe in giving back and supporting the communities we serve."
              },
              {
                title: "Excellence",
                description: "We strive for excellence in every aspect of our business, from product selection to customer service."
              }
            ].map((value, index) => (
              <div key={index} className="flex items-start space-x-4">
                <Award className="w-6 h-6 text-primary dark:text-primary-dark mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-text-secondary dark:text-text-dark-secondary">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-background dark:bg-background-dark">
        <div className="container text-center bg-gradient-to-r from-amber-200 via-amber-100 to-amber-50 dark:bg-blue-950 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-xl mb-8 text-text-secondary dark:text-text-dark-secondary">
            Be part of our growing community of satisfied customers.
          </p>
          <button className="bg-surface-light dark:bg-surface-dark text-primary dark:text-primary-dark px-8 py-3 rounded-lg font-semibold hover:bg-background-light dark:hover:bg-background-dark transition-colors">
            Shop Now
          </button>
        </div>
      </section>
    </div>
  );
} 