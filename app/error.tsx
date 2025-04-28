"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { motion } from "framer-motion";

export default function ErrorPage() {
  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
      <motion.div
        className='bg-white rounded-2xl p-6 md:p-10 shadow-lg flex flex-col items-center max-w-md w-full'
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className='flex items-center justify-center mb-6'
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className='h-16 w-16 rounded-full bg-red-50 flex items-center justify-center'>
            <TriangleAlert className='h-10 w-10 text-red-500' />
          </div>
        </motion.div>
        <motion.h1
          className='text-2xl font-semibold text-center text-gray-800 mb-2'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Oops! Something went wrong
        </motion.h1>
        <motion.p
          className='text-center text-gray-500 mb-8'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          An unexpected error has occurred. Please try again or return to the
          home page.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link href='/'>
            <Button className='bg-gray-800 hover:bg-gray-700 text-white px-8 h-12 font-normal rounded-xl shadow-md hover:shadow-lg transition-all duration-200'>
              Go to Home
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
