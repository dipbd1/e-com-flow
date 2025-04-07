import { LoginForm } from '@/components/auth/LoginForm';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-indigo-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="hidden md:block">
            <div className="relative aspect-square max-w-lg mx-auto">
              <Image
                src="/images/login-illustration.svg"
                alt="Login illustration"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="mt-8 text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Welcome to E-Commerce X1
              </h1>
              <p className="text-gray-600">
                Your one-stop destination for all your shopping needs
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
} 