"use client";

import { motion } from "framer-motion";
import StepIndicatorProps from "@/interfaces/Istep";

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className='flex justify-center items-center space-x-6 mb-10'>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isActive = currentStep === index + 1;
        const isCompleted = currentStep > index + 1;

        return (
          <div key={index} className='flex flex-col items-center'>
            <motion.div
              className={`relative flex items-center justify-center rounded-full 
                ${
                  isCompleted
                    ? "bg-gray-800 text-white"
                    : isActive
                    ? "border-2 border-gray-800 bg-white text-gray-800"
                    : "border-2 border-gray-300 bg-white text-gray-400"
                }
                transition-all duration-300 ease-in-out`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: isActive ? 1.1 : 1,
                opacity: 1,
                height: isActive ? 44 : 40,
                width: isActive ? 44 : 40,
              }}
              transition={{
                delay: index * 0.1,
                duration: 0.3,
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              {index + 1}

              {index < totalSteps - 1 && (
                <motion.div
                  className={`absolute left-full w-6 h-0.5 ${
                    isCompleted ? "bg-gray-800" : "bg-gray-300"
                  }`}
                  style={{ left: "calc(100% + 4px)" }}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
                />
              )}
            </motion.div>

            <motion.div
              className='mt-2 text-xs text-gray-500'
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0.7 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              {index === 0 ? "Account" : index === 1 ? "Personal" : "Identity"}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
