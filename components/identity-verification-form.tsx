"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Upload } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { IdentityVerificationFormProps } from "@/interfaces/Iid";

export function IdentityVerificationForm({
  userData,
  updateUserData,
  onNext,
  onBack,
  isTransitioning = false,
  inputRef,
  onError,
}: IdentityVerificationFormProps & {
  inputRef?: React.RefObject<HTMLInputElement | null>;
  onError?: (msg: string) => void;
}) {
  const [errors, setErrors] = useState<{
    idType?: string;
    idNumber?: string;
    idFile?: string;
  }>({});
  const [fileName, setFileName] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});
    let hasErrors = false;
    const newErrors: any = {};

    if (!userData.governmentId.type) {
      newErrors.idType = "ID type is required";
      hasErrors = true;
    }

    if (!userData.governmentId.number.trim()) {
      newErrors.idNumber = "ID number is required";
      hasErrors = true;
    }

    if (!userData.governmentId.file && !fileName) {
      newErrors.idFile = "ID document is required";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      onNext();
    } catch (error) {
      setErrors({
        idNumber: "An unexpected error occurred. Please try again.",
      });
      if (onError) onError("An unexpected error occurred. Please try again.");
    }
  };

  const updateGovernmentId = (field: string, value: string) => {
    updateUserData({
      governmentId: {
        ...userData.governmentId,
        [field]: value,
      },
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      updateUserData({
        governmentId: {
          ...userData.governmentId,
          file,
        },
      });
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
        <Label htmlFor='idType' className='text-sm font-medium text-gray-700'>
          ID Type
        </Label>
        <Select
          value={userData.governmentId.type}
          onValueChange={(value) => updateGovernmentId("type", value)}
          disabled={isTransitioning}
        >
          <SelectTrigger
            className={`bg-gray-50 border-gray-200 text-gray-800 h-12 transition-all duration-200 focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 ${
              errors.idType ? "border-red-400 focus:ring-red-400" : ""
            }`}
          >
            <SelectValue placeholder='Select ID type' />
          </SelectTrigger>
          <SelectContent className='bg-white border-gray-200'>
            <SelectItem
              value='passport'
              className='text-gray-800 focus:bg-gray-100 focus:text-gray-900'
            >
              Passport
            </SelectItem>
            <SelectItem
              value='driverLicense'
              className='text-gray-800 focus:bg-gray-100 focus:text-gray-900'
            >
              Driver's License
            </SelectItem>
            <SelectItem
              value='nationalId'
              className='text-gray-800 focus:bg-gray-100 focus:text-gray-900'
            >
              National ID Card
            </SelectItem>
          </SelectContent>
        </Select>
        {errors.idType && (
          <motion.p
            className='text-red-500 text-xs mt-1'
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {errors.idType}
          </motion.p>
        )}
      </motion.div>

      <motion.div className='space-y-2' variants={itemVariants}>
        <Label htmlFor='idNumber' className='text-sm font-medium text-gray-700'>
          ID Number
        </Label>
        <Input
          id='idNumber'
          value={userData.governmentId.number}
          onChange={(e) => updateGovernmentId("number", e.target.value)}
          className={`bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400 h-12 transition-all duration-200 focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 ${
            errors.idNumber ? "border-red-400 focus:ring-red-400" : ""
          }`}
          placeholder='Enter ID number'
          disabled={isTransitioning}
          ref={inputRef}
        />
        {errors.idNumber && (
          <motion.p
            className='text-red-500 text-xs mt-1'
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {errors.idNumber}
          </motion.p>
        )}
      </motion.div>

      <motion.div className='space-y-2' variants={itemVariants}>
        <Label htmlFor='idFile' className='text-sm font-medium text-gray-700'>
          Upload ID Document
        </Label>
        <motion.div
          className={`bg-gray-50 border border-gray-200 rounded-md p-4 text-center cursor-pointer hover:bg-gray-100 transition-all duration-200 ${
            errors.idFile ? "border-red-400" : ""
          }`}
          onClick={() => document.getElementById("idFile")?.click()}
          whileHover={{ scale: 1.02, borderColor: "rgba(107, 114, 128, 0.5)" }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          <input
            id='idFile'
            type='file'
            accept='image/*,.pdf'
            onChange={handleFileChange}
            className='hidden'
            disabled={isTransitioning}
          />
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <Upload className='mx-auto h-6 w-6 text-gray-400 mb-2' />
          </motion.div>
          <p className='text-gray-700 text-sm'>
            {fileName ? fileName : "Click to upload document"}
          </p>
          <p className='text-gray-400 text-xs mt-1'>JPG, PNG, or PDF</p>
        </motion.div>
        {errors.idFile && (
          <motion.p
            className='text-red-500 text-xs mt-1'
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {errors.idFile}
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
          Complete
        </Button>
      </motion.div>
    </motion.form>
  );
}
