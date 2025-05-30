"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import SuccessScreenProps from "@/interfaces/Isuccess";
import { useGlobalStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { calculateAge } from "@/lib/utils";

export function SuccessScreen({ userData }: SuccessScreenProps) {
  const router = useRouter();
  const { setUserData } = useGlobalStore();
  const setIsInWallet = useGlobalStore((state) => state.setIsInWallet);
  const setCardStackOrder = useGlobalStore((state) => state.setCardStackOrder);
  const [flipped, setFlipped] = useState(false);

  const handleDashboardClick = () => {
    // Navigate to dashboard first
    router.push("/dashboard");

    // Reset states
    setTimeout(() => {
      setUserData({
        username: "",
        email: "",
        fullName: "",
        dateOfBirth: "",
        address: {
          country: "",
        },
        governmentId: {
          type: "",
          number: "",
        },
      });
      setIsInWallet([false, false, false]);
      setCardStackOrder([0, 1, 2]);
    }, 200);
  };

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
      <motion.h2
        className='text-2xl font-light text-gray-800 mb-2'
        variants={{
          hidden: { y: 10, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.4,
              delay: 0.2,
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
              delay: 0.3,
            },
          },
        }}
      >
        Your wallet is now ready to use
      </motion.p>

      <div className='relative mb-6' style={{ perspective: "1000px" }}>
        <div
          className={`transition-transform duration-500 w-full h-full rounded-lg border border-gray-100 shadow-sm bg-transparent`}
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            minHeight: 220,
          }}
          onMouseEnter={() => setFlipped(true)}
          onMouseLeave={() => setFlipped(false)}
          onClick={() => setFlipped((f) => !f)}
        >
          {/* Front of the card */}
          <div
            className='absolute inset-0 bg-gray-50 rounded-lg p-5 text-left backface-hidden'
            style={{ backfaceVisibility: "hidden" }}
          >
            <motion.div
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.3 }}
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
              transition={{ delay: 0.7, duration: 0.3 }}
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
              transition={{ delay: 0.8, duration: 0.3 }}
              className='flex justify-between items-center mb-3'
            >
              <span className='text-xs text-gray-500'>Age</span>
              <span className='text-sm text-gray-800 font-medium'>
                {calculateAge(userData.dateOfBirth)} years old
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.3 }}
              className='flex justify-between items-center mb-3'
            >
              <span className='text-xs text-gray-500'>Birth Place</span>
              <span className='text-sm text-gray-800 font-medium'>
                {userData.address.country}
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
          </div>
          {/* Back of the card */}
          <div
            className='absolute inset-0 flex flex-col items-center justify-center bg-gray-50 rounded-lg p-5 backface-hidden'
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <h3 className='text-xl font-semibold mb-2'>Challenge made for</h3>
            <div className='flex items-center justify-center gap-4 mb-4'>
              <img
                src='https://www.gomry.com/black-logo.png'
                alt='Gomry Logo'
                className='h-8 w-auto rounded p-1'
                style={{ maxWidth: 150 }}
              />
              <span className='h-8 flex items-center' style={{ maxWidth: 150 }}>
                <svg
                  className='fill-foreground w-40 lg:w-48 hover:opacity-75 transition-all duration-300'
                  aria-label='Silver.dev'
                  role='img'
                  viewBox='100 105 796 150'
                >
                  <path d='m167.73 244.79-67.12-27.25v10.29l67.12 27.25z'></path>
                  <path d='m170.4 244.43v10.3l107.67-107.16v-10.41z'></path>
                  <path d='m236.44 173.68-47.78-47.59-2.83 2.82 48.45 48.27 43.79-43.63-68.76-28.03-18.3 18.23z'></path>
                  <path d='m209.58 201.78 13.11-13.05-48.45-48.27-13.11 13.05z'></path>
                  <path d='m139.53 180.92 45.5 45.33 5.22-5.21-48.45-48.27-41.19 41.04 68.76 28.04 13.43-13.38z'></path>
                  <path d='m369.34 145.1c-.42.71-.88 1.24-1.38 1.59-.49.35-1.1.53-1.8.53-.8 0-1.74-.4-2.83-1.2-1.08-.8-2.44-1.68-4.06-2.65-1.62-.96-3.58-1.85-5.87-2.65s-5.05-1.2-8.3-1.2c-3.06 0-5.76.41-8.09 1.24s-4.29 1.94-5.87 3.36c-1.58 1.41-2.77 3.07-3.57 4.98s-1.2 3.97-1.2 6.18c0 2.83.69 5.17 2.08 7.03s3.23 3.45 5.51 4.77 4.88 2.46 7.77 3.43c2.9.97 5.87 1.97 8.9 3 3.04 1.04 6.01 2.2 8.9 3.5 2.9 1.3 5.49 2.93 7.77 4.91s4.12 4.41 5.51 7.28 2.08 6.41 2.08 10.6c0 4.43-.75 8.59-2.26 12.47-1.51 3.89-3.71 7.27-6.61 10.14s-6.46 5.14-10.67 6.78c-4.22 1.65-9.01 2.47-14.38 2.47-6.6 0-12.58-1.19-17.95-3.57s-9.96-5.59-13.78-9.65l3.96-6.5c.38-.52.84-.95 1.38-1.31.54-.35 1.14-.53 1.8-.53.61 0 1.31.25 2.08.74.78.49 1.66 1.12 2.65 1.87s2.12 1.58 3.39 2.47c1.27.9 2.72 1.72 4.35 2.47 1.62.75 3.47 1.38 5.55 1.87 2.07.49 4.4.74 7 .74 3.25 0 6.15-.45 8.69-1.34s4.7-2.16 6.47-3.78 3.12-3.57 4.06-5.83 1.41-4.78 1.41-7.56c0-3.06-.7-5.57-2.08-7.53-1.39-1.95-3.22-3.59-5.48-4.91s-4.85-2.44-7.77-3.36-5.89-1.86-8.9-2.83c-3.02-.97-5.98-2.08-8.9-3.36-2.92-1.27-5.51-2.92-7.77-4.95-2.26-2.02-4.09-4.56-5.48-7.6s-2.08-6.79-2.08-11.27c0-3.58.69-7.04 2.08-10.39 1.39-3.34 3.42-6.31 6.08-8.9s5.94-4.66 9.82-6.22 8.35-2.33 13.39-2.33c5.65 0 10.8.9 15.44 2.69s8.73 4.38 12.26 7.77l-3.32 6.5z'></path>
                  <path d='m406.59 136.47c0 1.23-.25 2.37-.74 3.43s-1.15 2-1.98 2.83-1.79 1.47-2.9 1.94-2.27.71-3.5.71-2.37-.24-3.43-.71-1.99-1.12-2.79-1.94-1.44-1.77-1.91-2.83-.71-2.2-.71-3.43.24-2.39.71-3.5 1.11-2.07 1.91-2.9c.8-.82 1.73-1.47 2.79-1.94s2.2-.71 3.43-.71 2.39.24 3.5.71 2.07 1.12 2.9 1.94c.82.82 1.48 1.79 1.98 2.9.49 1.11.74 2.27.74 3.5zm-2.69 22.48v71.59h-12.58v-71.59z'></path>
                  <path d='m437.54 126.44v104.09h-12.58v-104.09z'></path>
                  <path d='m519.23 158.95-29.19 71.59h-11.31l-29.19-71.59h10.25c1.04 0 1.88.26 2.54.78s1.11 1.13 1.34 1.84l18.16 46.08c.57 1.74 1.06 3.44 1.48 5.09s.82 3.3 1.2 4.95c.38-1.65.78-3.3 1.2-4.95s.94-3.34 1.55-5.09l18.37-46.08c.28-.75.75-1.38 1.41-1.87s1.44-.74 2.33-.74h9.82z'></path>
                  <path d='m586.93 220.5c-1.55 1.88-3.42 3.52-5.58 4.91-2.17 1.39-4.49 2.53-6.96 3.43s-5.03 1.57-7.67 2.01c-2.64.45-5.25.67-7.84.67-4.95 0-9.5-.84-13.67-2.51s-7.77-4.12-10.81-7.35-5.41-7.22-7.1-11.98c-1.7-4.76-2.54-10.22-2.54-16.4 0-4.99.77-9.66 2.3-13.99s3.73-8.09 6.61-11.27c2.87-3.18 6.38-5.68 10.53-7.49s8.81-2.72 13.99-2.72c4.29 0 8.26.72 11.91 2.16s6.81 3.51 9.47 6.22 4.75 6.05 6.25 10.03c1.51 3.98 2.26 8.52 2.26 13.6 0 1.98-.21 3.3-.64 3.96-.42.66-1.23.99-2.4.99h-47.84c.14 4.52.77 8.46 1.87 11.8 1.11 3.35 2.65 6.14 4.63 8.37 1.98 2.24 4.33 3.91 7.07 5.02 2.73 1.11 5.79 1.66 9.19 1.66 3.16 0 5.88-.36 8.16-1.1 2.28-.73 4.25-1.52 5.9-2.37s3.03-1.64 4.13-2.37c1.11-.73 2.06-1.1 2.86-1.1 1.04 0 1.84.4 2.4 1.2l3.53 4.59zm-10.18-33.57c0-2.92-.41-5.59-1.24-8.02s-2.03-4.52-3.6-6.29c-1.58-1.77-3.5-3.13-5.76-4.1-2.26-.96-4.83-1.45-7.7-1.45-6.03 0-10.8 1.76-14.31 5.26s-5.69 8.37-6.54 14.59h39.15z'></path>
                  <path d='m615.41 173.29c2.26-4.9 5.04-8.73 8.34-11.48 3.3-2.76 7.33-4.13 12.08-4.13 1.51 0 2.96.17 4.35.5s2.63.85 3.71 1.55l-.92 9.4c-.28 1.18-.99 1.77-2.12 1.77-.66 0-1.63-.14-2.9-.42s-2.71-.42-4.31-.42c-2.26 0-4.28.33-6.04.99-1.77.66-3.35 1.64-4.73 2.93-1.39 1.3-2.64 2.9-3.75 4.81s-2.11 4.09-3 6.54v45.23h-12.65v-71.59h7.21c1.37 0 2.31.26 2.83.78s.87 1.41 1.06 2.69l.85 10.88z'></path>
                  <path d='m647.21 222.76c0-1.22.22-2.38.67-3.46s1.06-2.02 1.84-2.83c.78-.8 1.71-1.44 2.79-1.91s2.24-.71 3.46-.71 2.38.24 3.46.71 2.03 1.11 2.83 1.91 1.44 1.74 1.91 2.83c.47 1.08.71 2.24.71 3.46s-.24 2.44-.71 3.5-1.11 1.99-1.91 2.79-1.74 1.43-2.83 1.87c-1.08.45-2.24.67-3.46.67s-2.38-.22-3.46-.67-2.01-1.07-2.79-1.87-1.39-1.73-1.84-2.79-.67-2.23-.67-3.5z'></path>
                  <path d='m741.9 126.44v104.09h-7.49c-1.79 0-2.92-.87-3.39-2.61l-1.13-8.69c-3.06 3.67-6.55 6.64-10.46 8.9s-8.43 3.39-13.57 3.39c-4.1 0-7.82-.79-11.17-2.37s-6.2-3.9-8.55-6.96c-2.36-3.06-4.17-6.88-5.44-11.45s-1.91-9.82-1.91-15.76c0-5.28.71-10.19 2.12-14.73 1.41-4.55 3.44-8.49 6.08-11.84 2.64-3.34 5.88-5.97 9.72-7.88s8.16-2.86 12.97-2.86c4.38 0 8.14.74 11.27 2.23 3.13 1.48 5.92 3.55 8.37 6.18v-39.64zm-12.58 49.54c-2.36-3.16-4.9-5.36-7.63-6.61s-5.79-1.87-9.19-1.87c-6.64 0-11.75 2.38-15.33 7.14s-5.37 11.54-5.37 20.35c0 4.66.4 8.66 1.2 11.98s1.98 6.05 3.53 8.2c1.55 2.14 3.46 3.71 5.72 4.7s4.83 1.48 7.7 1.48c4.15 0 7.76-.94 10.85-2.83 3.08-1.88 5.92-4.55 8.52-7.99v-34.56z'></path>
                  <path d='m819.92 220.5c-1.55 1.88-3.42 3.52-5.58 4.91-2.17 1.39-4.49 2.53-6.96 3.43s-5.03 1.57-7.67 2.01c-2.64.45-5.25.67-7.84.67-4.95 0-9.5-.84-13.67-2.51s-7.77-4.12-10.81-7.35-5.41-7.22-7.1-11.98c-1.7-4.76-2.54-10.22-2.54-16.4 0-4.99.77-9.66 2.3-13.99s3.73-8.09 6.61-11.27c2.87-3.18 6.38-5.68 10.53-7.49s8.81-2.72 13.99-2.72c4.29 0 8.26.72 11.91 2.16s6.81 3.51 9.47 6.22 4.75 6.05 6.25 10.03c1.51 3.98 2.26 8.52 2.26 13.6 0 1.98-.21 3.3-.64 3.96-.42.66-1.23.99-2.4.99h-47.84c.14 4.52.77 8.46 1.87 11.8 1.11 3.35 2.65 6.14 4.63 8.37 1.98 2.24 4.33 3.91 7.07 5.02 2.73 1.11 5.79 1.66 9.19 1.66 3.16 0 5.88-.36 8.16-1.1 2.28-.73 4.25-1.52 5.9-2.37s3.03-1.64 4.13-2.37c1.11-.73 2.06-1.1 2.86-1.1 1.04 0 1.84.4 2.4 1.2l3.53 4.59zm-10.18-33.57c0-2.92-.41-5.59-1.24-8.02s-2.03-4.52-3.6-6.29c-1.58-1.77-3.5-3.13-5.76-4.1-2.26-.96-4.83-1.45-7.7-1.45-6.03 0-10.8 1.76-14.31 5.26s-5.69 8.37-6.54 14.59h39.15z'></path>
                  <path d='m896.24 158.95-29.19 71.59h-11.31l-29.19-71.59h10.25c1.04 0 1.88.26 2.54.78s1.11 1.13 1.34 1.84l18.16 46.08c.57 1.74 1.06 3.44 1.48 5.09s.82 3.3 1.2 4.95c.38-1.65.78-3.3 1.2-4.95s.94-3.34 1.55-5.09l18.37-46.08c.28-.75.75-1.38 1.41-1.87s1.44-.74 2.33-.74h9.82z'></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      <motion.div
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
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className='transition-all duration-200'
          onClick={handleDashboardClick}
        >
          <Button className='w-full bg-gray-800 hover:bg-gray-700 text-white h-12 font-normal rounded-xl shadow-md hover:shadow-lg transition-all duration-200'>
            <span>Go to Dashboard</span>
            <ArrowRight className='ml-2 h-4 w-4' />
          </Button>
        </motion.div>

        <motion.p
          className='text-gray-500 text-xs mt-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          An email has been sent to {userData.email}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
