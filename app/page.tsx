"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreditCard, Shield, Zap, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
        <div className='text-center'>
          <motion.div
            className='flex justify-center mb-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className='h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg'>
              <CreditCard className='h-10 w-10 text-white' />
            </div>
          </motion.div>

          <motion.h1
            className='text-5xl font-bold text-gray-900 mb-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Your Digital Wallet
          </motion.h1>
          <motion.p
            className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Secure, simple, and seamless digital asset management for the modern
            world
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className='flex flex-col sm:flex-row gap-4 justify-center items-center'
          >
            <Link href='/signup'>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 h-12 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200'>
                  Get Started
                  <ChevronRight className='ml-2 h-5 w-5' />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-20'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className='bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200'
          >
            <div className='flex items-start'>
              <div className='h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center mr-4'>
                <CreditCard className='h-6 w-6 text-blue-600' />
              </div>
              <div>
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                  Secure Storage
                </h3>
                <p className='text-gray-600'>
                  Bank-grade security to keep your digital assets safe and
                  protected
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className='bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200'
          >
            <div className='flex items-start'>
              <div className='h-12 w-12 rounded-xl bg-purple-50 flex items-center justify-center mr-4'>
                <Zap className='h-6 w-6 text-purple-600' />
              </div>
              <div>
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                  Instant Transfers
                </h3>
                <p className='text-gray-600'>
                  Send and receive funds instantly with zero waiting time
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className='bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200'
          >
            <div className='flex items-start'>
              <div className='h-12 w-12 rounded-xl bg-green-50 flex items-center justify-center mr-4'>
                <Shield className='h-6 w-6 text-green-600' />
              </div>
              <div>
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                  Full Protection
                </h3>
                <p className='text-gray-600'>
                  Advanced security features and 24/7 monitoring
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
