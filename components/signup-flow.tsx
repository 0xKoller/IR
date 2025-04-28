"use client";

import { useState } from "react";
import { UserRegistrationForm } from "@/components/user-registration-form";
import { PersonalInfoForm } from "@/components/personal-info-form";
import { IdentityVerificationForm } from "@/components/identity-verification-form";
import { SuccessScreen } from "@/components/success-screen";
import { StepIndicator } from "@/components/step-indicator";
import { motion, AnimatePresence } from "framer-motion";
import { UserData } from "@/types/signup.types";

export function SignupFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [userData, setUserData] = useState<UserData>({
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
      type: "passport",
      number: "",
      expiryDate: "",
    },
  });

  const updateUserData = (data: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...data }));
  };

  const goToNextStep = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
      setIsTransitioning(false);
    }, 300);
  };

  const goToPreviousStep = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep((prev) => Math.max(1, prev - 1));
      window.scrollTo(0, 0);
      setIsTransitioning(false);
    }, 300);
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
      <div className='w-full max-w-6xl flex flex-col justify-center md:flex-row gap-8 md:gap-16'>
        <div className='md:w-1/2 bg-white rounded-2xl p-6 md:p-8 shadow-lg'>
          {currentStep < 4 && (
            <motion.p
              className='text-center md:text-left text-gray-500 text-sm mb-8'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {currentStep === 1 && "Create your account"}
              {currentStep === 2 && "Personal information"}
              {currentStep === 3 && "Identity verification"}
            </motion.p>
          )}

          <StepIndicator currentStep={currentStep} totalSteps={3} />

          <AnimatePresence mode='wait'>
            {currentStep === 1 && (
              <motion.div
                key='step1'
                variants={pageVariants}
                initial='initial'
                animate='animate'
                exit='exit'
              >
                <UserRegistrationForm
                  userData={userData}
                  updateUserData={updateUserData}
                  onNext={goToNextStep}
                  isTransitioning={isTransitioning}
                />
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key='step2'
                variants={pageVariants}
                initial='initial'
                animate='animate'
                exit='exit'
              >
                <PersonalInfoForm
                  userData={userData}
                  updateUserData={updateUserData}
                  onNext={goToNextStep}
                  onBack={goToPreviousStep}
                  isTransitioning={isTransitioning}
                />
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key='step3'
                variants={pageVariants}
                initial='initial'
                animate='animate'
                exit='exit'
              >
                <IdentityVerificationForm
                  userData={userData}
                  updateUserData={updateUserData}
                  onNext={goToNextStep}
                  onBack={goToPreviousStep}
                  isTransitioning={isTransitioning}
                />
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key='step4'
                variants={pageVariants}
                initial='initial'
                animate='animate'
                exit='exit'
              >
                <SuccessScreen userData={userData} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
