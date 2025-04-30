"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import SuccessScreenProps from "@/interfaces/Isuccess";
import { useGlobalStore } from "@/lib/store";
import { useRouter } from "next/navigation";

const calculateAge = (dateOfBirth: string) => {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

export function SuccessScreen({ userData }: SuccessScreenProps) {
  const router = useRouter();
  const { setUserData } = useGlobalStore();
  const setIsInWallet = useGlobalStore((state) => state.setIsInWallet);
  const setCardStackOrder = useGlobalStore((state) => state.setCardStackOrder);

  const handleDashboardClick = () => {
    // Navigate to dashboard first
    router.push("/");

    // Reset states
    setTimeout(() => {
      setUserData({
        username: "",
        email: "",
        fullName: "",
        dateOfBirth: "",
        address: {
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
        },
        governmentId: {
          type: "",
          number: "",
          expiryDate: "",
        },
      });
      setIsInWallet([false, false, false]);
      setCardStackOrder([0, 1, 2]);
    }, 100);
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

      <motion.div
        className='bg-gray-50 rounded-lg p-5 mb-6 text-left border border-gray-100 shadow-sm'
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
      </motion.div>

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
