"use client";

import { useState, useRef, useEffect } from "react";
import { UserRegistrationForm } from "@/components/user-registration-form";
import { PersonalInfoForm } from "@/components/personal-info-form";
import { IdentityVerificationForm } from "@/components/identity-verification-form";
import { SuccessScreen } from "@/components/success-screen";
import { StepIndicator } from "@/components/step-indicator";
import { motion, AnimatePresence } from "framer-motion";
import { UserData } from "@/types/signup.types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

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
  const [globalError, setGlobalError] = useState<string | null>(null);

  // Refs for focus management
  const stepInputRefs: React.RefObject<HTMLInputElement | null>[] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Focus management: focus first input after step change
  useEffect(() => {
    if (!isTransitioning && currentStep <= 3) {
      stepInputRefs[currentStep - 1]?.current?.focus();
    }
  }, [currentStep, isTransitioning]);

  const updateUserData = (data: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...data }));
  };

  const goToNextStep = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
      setIsTransitioning(false);
    }, 900);
  };

  const goToPreviousStep = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep((prev) => Math.max(1, prev - 1));
      window.scrollTo(0, 0);
      setIsTransitioning(false);
    }, 900);
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

  // Steps of the SignUp Wizard are in an array,
  // this lets us scale the flow by adding or removing steps
  const steps = [
    {
      label: "Create your account",
      render: () => (
        <UserRegistrationForm
          userData={userData}
          updateUserData={updateUserData}
          onNext={goToNextStep}
          isTransitioning={isTransitioning}
          inputRef={stepInputRefs[0]}
          onError={setGlobalError}
        />
      ),
    },
    {
      label: "Personal information",
      render: () => (
        <PersonalInfoForm
          userData={userData}
          updateUserData={updateUserData}
          onNext={goToNextStep}
          onBack={goToPreviousStep}
          isTransitioning={isTransitioning}
          inputRef={stepInputRefs[1]}
          onError={setGlobalError}
        />
      ),
    },
    {
      label: "Identity verification",
      render: () => (
        <IdentityVerificationForm
          userData={userData}
          updateUserData={updateUserData}
          onNext={goToNextStep}
          onBack={goToPreviousStep}
          isTransitioning={isTransitioning}
          inputRef={stepInputRefs[2]}
          onError={setGlobalError}
        />
      ),
    },
    {
      label: "Success",
      render: () => <SuccessScreen userData={userData} />,
    },
  ];

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
      <div className='w-full max-w-6xl flex flex-col justify-center md:flex-row gap-8 md:gap-16 relative'>
        <div className='md:w-1/2 bg-white rounded-2xl p-6 md:p-8 shadow-lg relative overflow-hidden'>
          {isTransitioning && (
            <div className='absolute inset-0 z-20 flex items-center justify-center bg-white/60 backdrop-blur-sm rounded-2xl'>
              <div className='h-10 w-10 border-4 border-t-transparent border-gray-800 rounded-full animate-spin bg-white bg-opacity-80 shadow-lg'></div>
            </div>
          )}
          {currentStep < steps.length && (
            <motion.p
              className='text-center md:text-left text-gray-500 text-sm mb-8'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              aria-live='polite'
            >
              {steps[currentStep - 1].label}
            </motion.p>
          )}

          {globalError && (
            <div className='mb-4'>
              <Alert
                variant='destructive'
                className='bg-red-50 text-red-500 border-red-200'
              >
                <AlertCircle className='h-4 w-4' />
                <AlertDescription>{globalError}</AlertDescription>
              </Alert>
            </div>
          )}

          <StepIndicator currentStep={currentStep} totalSteps={3} />

          <AnimatePresence mode='wait'>
            <motion.div
              key={`step${currentStep}`}
              variants={pageVariants}
              initial='initial'
              animate='animate'
              exit='exit'
            >
              {steps[currentStep - 1].render()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
