"use client";

import { Button } from "@/components/ui/button";

import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import SuccessScreenProps from "@/interfaces/Isuccess";

export function SuccessScreen({ userData }: SuccessScreenProps) {
  return (
    <motion.div
      className='text-center py-4'
      initial='hidden'
      animate='visible'
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
    >
      <motion.div
        className='flex justify-center mb-8'
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.2,
            },
          },
        }}
      >
        <motion.div
          className='relative h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center'
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(107, 114, 128, 0.3)",
              "0 0 0 15px rgba(107, 114, 128, 0)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        >
          <motion.div
            initial={{ rotateX: -90, scale: 0.5 }}
            animate={{ rotateX: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.5,
            }}
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: "center center",
            }}
          >
            <CheckCircle className='h-14 w-14 text-green-500 drop-shadow-lg' />
          </motion.div>

          <motion.div
            className='absolute inset-0 rounded-full bg-green-500 opacity-0'
            animate={{
              opacity: [0, 0.2, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />
        </motion.div>
      </motion.div>

      <motion.h2
        className='text-2xl font-light text-gray-800 mb-2'
        variants={{
          hidden: { y: 10, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.4,
              delay: 0.4,
            },
          },
        }}
      >
        Verification Complete
      </motion.h2>

      <motion.p
        className='text-sm text-gray-500 mb-8'
        variants={{
          hidden: { y: 10, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.4,
              delay: 0.5,
            },
          },
        }}
      >
        Your wallet is now ready to use
      </motion.p>

      <motion.div
        className='bg-gray-50 rounded-lg p-5 mb-6 text-left border border-gray-100 shadow-sm'
        variants={{
          hidden: { y: 10, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.4,
              delay: 0.6,
            },
          },
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.3 }}
          className='flex justify-between items-center mb-3'
        >
          <span className='text-xs text-gray-500'>Username</span>
          <span className='text-sm text-gray-800 font-medium'>
            {userData.username}
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.3 }}
          className='flex justify-between items-center mb-3'
        >
          <span className='text-xs text-gray-500'>Email</span>
          <span className='text-sm text-gray-800 font-medium'>
            {userData.email}
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0, duration: 0.3 }}
          className='flex justify-between items-center'
        >
          <span className='text-xs text-gray-500'>Status</span>
          <span className='text-sm text-gray-800 font-medium flex items-center'>
            <span className='h-2 w-2 bg-green-500 rounded-full mr-2'></span>
            Verified
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        variants={{
          hidden: { y: 10, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.4,
              delay: 0.8,
            },
          },
        }}
      >
        <Link href='/'>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className='transition-all duration-200'
          >
            <Button className='w-full bg-gray-800 hover:bg-gray-700 text-white h-12 font-normal rounded-xl shadow-md hover:shadow-lg transition-all duration-200'>
              <span>Go to Dashboard</span>
              <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
          </motion.div>
        </Link>

        <motion.p
          className='text-gray-500 text-xs mt-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          A confirmation email has been sent to {userData.email}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
