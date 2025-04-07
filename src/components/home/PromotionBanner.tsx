import { Promotion } from '@/types';
import { Package, RefreshCw, Shield, Headphones } from 'lucide-react';

interface PromotionBannerProps {
  promotions: Promotion[];
}

export default function PromotionBanner({ promotions }: PromotionBannerProps) {
  // Map icon strings to Lucide icons
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'truck':
        return <Package className="h-6 w-6 text-primary" />;
      case 'refresh-ccw':
        return <RefreshCw className="h-6 w-6 text-primary" />;
      case 'shield':
        return <Shield className="h-6 w-6 text-primary" />;
      case 'headphones':
        return <Headphones className="h-6 w-6 text-primary" />;
      default:
        return <Package className="h-6 w-6 text-primary" />;
    }
  };
  
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {promotions.map((promo) => (
        <div key={promo.id} className="flex items-center gap-3 rounded-lg border p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            {getIcon(promo.icon)}
          </div>
          <div>
            <h3 className="font-medium">{promo.title}</h3>
            <p className="text-sm text-muted-foreground">{promo.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}