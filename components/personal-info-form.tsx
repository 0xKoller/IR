"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import PersonalInfoFormProps from "@/interfaces/IpersonalInformation";

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "Uruguay",
  "Brazil",
  "Mexico",
  "India",
  "China",
];

export function PersonalInfoForm({
  userData,
  updateUserData,
  onNext,
  onBack,
  isTransitioning = false,
}: PersonalInfoFormProps) {
  const [errors, setErrors] = useState<{
    fullName?: string;
    dateOfBirth?: string;
    country?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});

    let hasErrors = false;
    const newErrors: any = {};

    if (!userData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      hasErrors = true;
    }

    if (!userData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
      hasErrors = true;
    }

    if (!userData.address.country) {
      newErrors.country = "Country is required";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (userData.address.country === "Uruguay") {
        setErrors({ country: "This country is not supported" });
        setIsLoading(false);
        return;
      }

      onNext();
    } catch (error) {
      setErrors({
        country: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateAddress = (field: string, value: string) => {
    updateUserData({
      address: {
        ...userData.address,
        [field]: value,
      },
    });
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        <Label htmlFor='fullName' className='text-sm font-medium text-gray-700'>
          Full Name
        </Label>
        <Input
          id='fullName'
          value={userData.fullName}
          onChange={(e) => updateUserData({ fullName: e.target.value })}
          className={`bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400 h-12 transition-all duration-200 focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 ${
            errors.fullName ? "border-red-400 focus:ring-red-400" : ""
          }`}
          placeholder='Enter your full name'
          disabled={isLoading || isTransitioning}
        />
        {errors.fullName && (
          <motion.p
            className='text-red-500 text-xs mt-1'
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {errors.fullName}
          </motion.p>
        )}
      </motion.div>

      <motion.div className='space-y-2' variants={itemVariants}>
        <Label
          htmlFor='dateOfBirth'
          className='text-sm font-medium text-gray-700'
        >
          Date of Birth
        </Label>
        <Input
          id='dateOfBirth'
          type='date'
          value={userData.dateOfBirth}
          onChange={(e) => updateUserData({ dateOfBirth: e.target.value })}
          className={`bg-gray-50 border-gray-200 text-gray-800 h-12 transition-all duration-200 focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 ${
            errors.dateOfBirth ? "border-red-400 focus:ring-red-400" : ""
          }`}
          disabled={isLoading || isTransitioning}
        />
        {errors.dateOfBirth && (
          <motion.p
            className='text-red-500 text-xs mt-1'
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {errors.dateOfBirth}
          </motion.p>
        )}
      </motion.div>

      <motion.div className='space-y-2' variants={itemVariants}>
        <Label htmlFor='country' className='text-sm font-medium text-gray-700'>
          Country
        </Label>
        <Select
          value={userData.address.country}
          onValueChange={(value) => updateAddress("country", value)}
          disabled={isLoading || isTransitioning}
        >
          <SelectTrigger
            className={`bg-gray-50 border-gray-200 text-gray-800 h-12 transition-all duration-200 focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 ${
              errors.country ? "border-red-400 focus:ring-red-400" : ""
            }`}
          >
            <SelectValue placeholder='Select country' />
          </SelectTrigger>
          <SelectContent className='bg-white border-gray-200'>
            {countries.map((country) => (
              <SelectItem
                key={country}
                value={country}
                className='text-gray-800 focus:bg-gray-100 focus:text-gray-900'
              >
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.country && (
          <motion.p
            className='text-red-500 text-xs mt-1'
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {errors.country}
          </motion.p>
        )}
      </motion.div>

      {Object.keys(errors).length > 0 && (
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

      <motion.div className='flex space-x-3 pt-4' variants={itemVariants}>
        <Button
          type='button'
          onClick={onBack}
          className='flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 h-12 font-normal rounded-xl transition-all duration-200'
          disabled={isLoading || isTransitioning}
        >
          Back
        </Button>
        <Button
          type='submit'
          className='flex-1 bg-gray-800 hover:bg-gray-700 text-white h-12 font-normal rounded-xl transition-all duration-200 hover:shadow-lg'
          disabled={isLoading || isTransitioning}
        >
          {isLoading ? (
            <div className='flex items-center justify-center'>
              <div className='h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2'></div>
              <span>Processing...</span>
            </div>
          ) : (
            "Continue"
          )}
        </Button>
      </motion.div>
    </motion.form>
  );
}
