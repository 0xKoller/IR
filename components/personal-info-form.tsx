"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Info } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  PersonalInfoErrors,
  validatePersonalInfoForm,
  handleDateChange,
  updateAddress,
} from "@/lib/personal-info-utils";
import { COUNTRIES } from "@/lib/constants";

export function PersonalInfoForm({
  userData,
  updateUserData,
  onNext,
  onBack,
  isTransitioning = false,
  inputRef,
  onError,
}: PersonalInfoFormProps & {
  inputRef?: React.RefObject<HTMLInputElement | null>;
  onError?: (msg: string) => void;
}) {
  const [isUnderage, setIsUnderage] = useState(false);
  const [errors, setErrors] = useState<PersonalInfoErrors>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});
    const { errors: validationErrors, hasErrors } =
      validatePersonalInfoForm(userData);

    if (hasErrors) {
      setErrors(validationErrors);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (userData.address.country === "Uruguay") {
        setErrors({ country: "This country is not supported" });
        return;
      }

      onNext();
    } catch (error) {
      setErrors({
        country: "An unexpected error occurred. Please try again.",
      });
      if (onError) onError("An unexpected error occurred. Please try again.");
    }
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
          disabled={isTransitioning}
          ref={inputRef}
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
          className='text-sm font-medium text-gray-700 flex items-center gap-1'
        >
          Date of Birth
        </Label>
        <Input
          id='dateOfBirth'
          type='text'
          value={userData.dateOfBirth}
          onChange={(e) => handleDateChange(e, updateUserData)}
          placeholder='MM/DD/YYYY'
          className={`bg-gray-50 border-gray-200 text-gray-800 h-12 transition-all duration-200 focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 ${
            errors.dateOfBirth && !isUnderage
              ? "border-red-400 focus:ring-red-400"
              : ""
          }`}
          disabled={isTransitioning}
        />
        {errors.dateOfBirth && !isUnderage && (
          <motion.p
            className='text-red-500 text-xs mt-1'
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {errors.dateOfBirth}
          </motion.p>
        )}
        {isUnderage && (
          <motion.div
            className='mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md'
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className='text-yellow-700 text-xs'>
              You must be at least 18 years old to create a wallet. Please come
              back when you meet the age requirement.
            </p>
          </motion.div>
        )}
      </motion.div>

      <motion.div className='space-y-2' variants={itemVariants}>
        <Label
          htmlFor='country'
          className='text-sm font-medium text-gray-700 flex items-center gap-1'
        >
          Country
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span tabIndex={0}>
                  <Info className='w-4 h-4 text-gray-400 cursor-pointer' />
                </span>
              </TooltipTrigger>
              <TooltipContent side='right'>
                Try selecting Uruguay to see the error.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Label>
        <Select
          value={userData.address.country}
          onValueChange={(value) =>
            updateAddress(userData, updateUserData, "country", value)
          }
          disabled={isTransitioning}
        >
          <SelectTrigger
            className={`bg-gray-50 border-gray-200 text-gray-800 h-12 transition-all duration-200 focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 ${
              errors.country ? "border-red-400 focus:ring-red-400" : ""
            }`}
          >
            <SelectValue placeholder='Select country' />
          </SelectTrigger>
          <SelectContent className='bg-white border-gray-200'>
            {COUNTRIES.map((country) => (
              <SelectItem
                key={country.value}
                value={country.value}
                className='text-gray-800 focus:bg-gray-100 focus:text-gray-900'
              >
                {country.label}
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
          disabled={isTransitioning}
        >
          Back
        </Button>
        <Button
          type='submit'
          className='flex-1 bg-gray-800 hover:bg-gray-700 text-white h-12 font-normal rounded-xl transition-all duration-200 hover:shadow-lg'
          disabled={isTransitioning}
        >
          Continue
        </Button>
      </motion.div>
    </motion.form>
  );
}
