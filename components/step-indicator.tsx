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
              className={`relative flex items-center justify-center rounded-full transition-all duration-300 ease-in-out
                ${
                  isCompleted
                    ? "bg-black text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    : isActive
                      ? "bg-white text-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      : "bg-white text-gray-400 border-4 border-gray-300"
                }
              `}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: isActive ? 1.1 : 1,
                opacity: 1,
                height: isActive ? 48 : 44,
                width: isActive ? 48 : 44,
              }}
              transition={{
                delay: index * 0.1,
                duration: 0.3,
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              <span className='text-xl font-extrabold'>{index + 1}</span>

              {index < totalSteps - 1 && (
                <motion.div
                  className={`absolute left-full top-1/2 -translate-y-1/2 h-1 w-10 transition-all duration-300
                    ${isCompleted ? "bg-black border-4 border-black" : "bg-gray-300 border-4 border-gray-300"}
                  `}
                  style={{ left: "calc(100% + 4px)" }}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
                />
              )}
            </motion.div>

            <motion.div
              className={`mt-2 text-xs font-bold transition-all duration-300 ${isActive ? "text-black" : "text-gray-400"}`}
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
