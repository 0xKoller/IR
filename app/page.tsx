"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreditCard, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
      <div className=' bg-white rounded-2xl p-4 md:p-8 shadow-lg'>
        <motion.div
          className='flex justify-center md:justify-start mb-6'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className='h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center'>
            <CreditCard className='h-8 w-8 text-gray-800' />
          </div>
        </motion.div>

        <motion.h1
          className='text-3xl font-light text-center md:text-left text-gray-800 mb-3'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Digital Wallet
        </motion.h1>
        <motion.p
          className='text-center md:text-left text-gray-500 mb-8'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Secure, simple, seamless
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className='mt-8'
        >
          <Link href='/signup'>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className='inline-block'
            >
              <Button className='bg-gray-800 hover:bg-gray-700 text-white px-8 h-12 font-normal rounded-xl shadow-md hover:shadow-lg transition-all duration-200'>
                Get Started
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        <div className='grid grid-cols-1 gap-4 mt-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className='bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm transition-all duration-200'
          >
            <div className='flex items-center'>
              <div className='h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-4'>
                <CreditCard className='h-5 w-5 text-gray-800' />
              </div>
              <div>
                <h3 className='text-gray-800 text-lg font-light'>
                  Secure Storage
                </h3>
                <p className='text-gray-500 text-sm'>
                  Keep your digital assets safe
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className='bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm transition-all duration-200'
          >
            <div className='flex items-center'>
              <div className='h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-4'>
                <Zap className='h-5 w-5 text-gray-800' />
              </div>
              <div>
                <h3 className='text-gray-800 text-lg font-light'>
                  Instant Transfers
                </h3>
                <p className='text-gray-500 text-sm'>
                  Send and receive funds instantly
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className='bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm transition-all duration-200'
          >
            <div className='flex items-center'>
              <div className='h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-4'>
                <Shield className='h-5 w-5 text-gray-800' />
              </div>
              <div>
                <h3 className='text-gray-800 text-lg font-light'>
                  Full Protection
                </h3>
                <p className='text-gray-500 text-sm'>
                  Advanced security features
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
