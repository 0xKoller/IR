"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";
import UserRegistrationFormProps from "@/interfaces/IuserRegistration";

export function UserRegistrationForm({
  userData,
  updateUserData,
  onNext,
  isTransitioning = false,
  inputRef,
}: UserRegistrationFormProps & {
  inputRef?: React.RefObject<HTMLInputElement | null>;
}) {
  const [errors, setErrors] = useState<{ username?: string; email?: string }>(
    {}
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});

    let hasErrors = false;
    const newErrors: { username?: string; email?: string } = {};

    if (!userData.username.trim()) {
      newErrors.username = "Username is required";
      hasErrors = true;
    }

    if (!userData.email.trim()) {
      newErrors.email = "Email is required";
      hasErrors = true;
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = "Please enter a valid email";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (userData.email.toLowerCase() === "alreadytaken@gmail.com") {
        setErrors({ email: "Email is already taken" });
        return;
      }

      onNext();
    } catch (error) {
      setErrors({ email: "An unexpected error occurred. Please try again." });
    }
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className='space-y-5'
      variants={formVariants}
      initial='hidden'
      animate='visible'
    >
      <motion.div className='space-y-2' variants={itemVariants}>
        <Label htmlFor='username' className='text-sm font-medium text-gray-700'>
          Username
        </Label>
        <Input
          id='username'
          value={userData.username}
          onChange={(e) => updateUserData({ username: e.target.value })}
          className={`bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400 h-12 transition-all duration-200 focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 ${
            errors.username ? "border-red-400 focus:ring-red-400" : ""
          }`}
          placeholder='Enter username'
          disabled={isTransitioning}
          ref={inputRef}
        />
        {errors.username && (
          <motion.p
            className='text-red-500 text-xs mt-1'
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {errors.username}
          </motion.p>
        )}
      </motion.div>

      <motion.div className='space-y-2' variants={itemVariants}>
        <Label htmlFor='email' className='text-sm font-medium text-gray-700'>
          Email
        </Label>
        <Input
          id='email'
          type='email'
          value={userData.email}
          onChange={(e) => updateUserData({ email: e.target.value })}
          className={`bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400 h-12 transition-all duration-200 focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 ${
            errors.email ? "border-red-400 focus:ring-red-400" : ""
          }`}
          placeholder='Enter email address'
          disabled={isTransitioning}
        />
        {errors.email && (
          <motion.p
            className='text-red-500 text-xs mt-1'
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {errors.email}
          </motion.p>
        )}
      </motion.div>

      {(errors.username || errors.email) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Alert
            variant='destructive'
            className='bg-red-50 text-red-500 border-red-200'
          >
            <AlertCircle className='h-4 w-4' />
            <AlertDescription>
              Please fix the errors above to continue.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      <motion.div variants={itemVariants} className='pt-4'>
        <Button
          type='submit'
          className='w-full bg-gray-800 hover:bg-gray-700 text-white h-12 font-normal rounded-xl transition-all duration-200 hover:shadow-lg'
          disabled={isTransitioning}
        >
          Continue
        </Button>
      </motion.div>
    </motion.form>
  );
}
