"use client";


import { motion } from 'framer-motion';
import Link from 'next/link';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import BinaryCube from '@/components/error/BinaryCube';
import { Button } from '@/components/ui/button';
import { Terminal, Code, ArrowLeft } from 'lucide-react';
import "./globals.css";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - 3D Scene */}
          <div className="h-[400px] lg:h-[600px] relative">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
              <BinaryCube />
              <OrbitControls enableZoom={false} />
            </Canvas>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center space-x-2 text-blue-400 mb-4">
                <Terminal className="h-6 w-6" />
                <span className="font-mono text-sm">ERROR 404</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Page Not Found
              </h1>
              
              <p className="text-slate-300 mb-8">
                The page yous&apos;re looking for doesn&apos;t exist or has been moved.
                <br />
                <span className="text-blue-400">Return to the mainframe.</span>
              </p>

              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Button asChild className="w-full md:w-auto">
                    <Link href="/" className="flex items-center space-x-2">
                      <ArrowLeft className="h-4 w-4" />
                      <span>Back to Home</span>
                    </Link>
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-slate-800/50 p-4 rounded-lg border border-slate-700"
                >
                  <div className="flex items-center space-x-2 text-blue-400 mb-2">
                    <Code className="h-4 w-4" />
                    <span className="font-mono text-sm">Debug Info</span>
                  </div>
                  <div className="font-mono text-sm text-slate-400">
                    <p>Status: <span className="text-red-400">404 Not Found</span></p>
                    <p>Path: <span className="text-blue-400">/unknown</span></p>
                    <p>Time: <span className="text-green-400">{new Date().toLocaleTimeString()}</span></p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage; 