"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { useGlobalStore } from "@/lib/store";
import { Building } from "lucide-react";
import { motion } from "framer-motion";

interface CardProps {
  color: string;
  index: number;
  isInWallet: boolean[];
  setIsInWallet: (arr: boolean[]) => void;
}

const Card = ({
  color,
  index,
  isInWallet,
  setIsInWallet,
  cardType = "credit",
}: CardProps & { cardType?: "credit" | "id" | "contact" }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const userData = useGlobalStore((state) => state.userData);
  const cardStackOrder = useGlobalStore((state) => state.cardStackOrder);
  const setCardStackOrder = useGlobalStore((state) => state.setCardStackOrder);

  const cardColors = {
    blue: {
      bg: "bg-gradient-to-br from-blue-500 to-blue-600",
      border: "border-blue-400",
      shadow: "shadow-blue-500/50",
    },
    green: {
      bg: "bg-gradient-to-br from-green-500 to-green-600",
      border: "border-green-400",
      shadow: "shadow-green-500/50",
    },
    red: {
      bg: "bg-gradient-to-br from-red-500 to-red-600",
      border: "border-red-400",
      shadow: "shadow-red-500/50",
    },
    gray: {
      bg: "bg-gradient-to-br from-gray-200 to-gray-300",
      border: "border-gray-300",
      shadow: "shadow-gray-400/30",
    },
  };

  let colorScheme =
    cardColors[color as keyof typeof cardColors] || cardColors.gray;
  if (cardType === "credit" && !userData.governmentId?.type) {
    colorScheme = cardColors.gray;
  }

  useEffect(() => {
    if (!cardRef.current) return;

    const timeline = gsap.timeline({
      onStart: () => setIsAnimating(true),
      onComplete: () => setIsAnimating(false),
    });

    if (isInWallet[index]) {
      timeline.to(cardRef.current, {
        y: 30 + index * 8,
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: "power2.inOut",
      });
    } else {
      timeline.to(cardRef.current, {
        y: -150 - index * 30,
        rotateX: 0,
        rotateY: isFlipped ? 180 : 0,
        duration: 0.6,
        ease: "back.out(1.5)",
      });
    }
  }, [isInWallet, index, isFlipped]);

  const handleFlip = () => {
    if (isAnimating || isInWallet[index]) return;

    gsap.to(cardRef.current, {
      rotateY: isFlipped ? 0 : 180,
      duration: 0.6,
      ease: "power3.inOut",
      onStart: () => setIsAnimating(true),
      onComplete: () => {
        setIsAnimating(false);
        setIsFlipped(!isFlipped);
      },
    });
  };
  const handleCardClick = () => {
    if (isAnimating) return;

    if (isInWallet[index]) {
      const newIsInWallet = [...isInWallet];
      newIsInWallet[index] = false;
      setIsInWallet(newIsInWallet);
    } else {
      handleFlip();
    }
  };

  const handleDoubleClick = () => {
    if (isAnimating || isInWallet[index]) return;
    const newIsInWallet = [...isInWallet];
    newIsInWallet[index] = true;
    setIsInWallet(newIsInWallet);
    setCardStackOrder([...cardStackOrder.filter((i) => i !== index), index]);
    // Reset flip state when inserting
    if (isFlipped) {
      gsap.to(cardRef.current, {
        rotateY: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => setIsFlipped(false),
      });
    }
  };

  useEffect(() => {
    if (!cardRef.current || isInWallet[index] || isAnimating) return;

    if (isHovered) {
      gsap.to(cardRef.current, {
        scale: 1.05,
        y: "-=10",
        boxShadow: "0 20px 25px rgba(0, 0, 0, 0.3)",
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(cardRef.current, {
        scale: 1,
        y: -150 - index * 30,
        boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [isHovered, isInWallet, isAnimating, index]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "absolute  left-0 right-0 mx-auto w-[280px] h-[170px] rounded-xl cursor-pointer shadow-lg",
        "transform-gpu transition-shadow",
        isInWallet[index] ? "" : "z-10"
      )}
      style={{
        top: "50%",
        transform: `translateY(-50%) ${isFlipped ? "rotateY(180deg)" : ""}`,
        transformStyle: "preserve-3d",
        zIndex: isInWallet[index]
          ? 10 + cardStackOrder.indexOf(index)
          : 10 - cardStackOrder.indexOf(index),
      }}
      onClick={handleCardClick}
      onDoubleClick={handleDoubleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-xl border p-4 flex flex-col justify-between",
          colorScheme.bg,
          colorScheme.border,
          colorScheme.shadow
        )}
        style={{ backfaceVisibility: "hidden" }}
      >
        {cardType === "credit" && (
          <div className='flex flex-row justify-evenly w-full h-full text-white items-center'>
            <div className='flex flex-col justify-center flex-1 h-full'>
              <div className='font-bold text-xl mb-2'>
                {userData.governmentId?.type?.toUpperCase() || "ID CARD"}
              </div>
              <div className='text-xs opacity-80 mb-1'>From</div>
              <div className='mb-4'>
                {userData.address?.country || "Country"}
              </div>
              <div className='text-xs opacity-80 mb-1'>ID Number</div>
              <div className='font-semibold text-2xl tracking-wider'>
                {userData.governmentId?.number || "123456"}
              </div>
            </div>
            <div className='flex items-center h-full'>
              <div className='w-24 h-28 mx-2 rounded-xl overflow-hidden shadow-md bg-white flex items-center justify-center'>
                {userData.governmentId?.file &&
                userData.governmentId.file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(userData.governmentId.file)}
                    alt='ID Photo'
                    className='object-cover w-full h-full'
                  />
                ) : (
                  <div className='text-indigo-800 text-xs'>PHOTO</div>
                )}
              </div>
            </div>
          </div>
        )}

        {cardType === "contact" && (
          <>
            <div className='flex justify-between items-start'>
              <div className='text-white'>
                <div className='font-bold text-lg'>CONTACT CARD</div>
              </div>
              <div className='w-12 h-12 rounded-md flex items-center justify-center'>
                <svg
                  className='w-8 h-8 text-white'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </div>
            </div>
            <div className='text-white text-sm'>
              <div className='space-y-2'>
                <div>
                  <div className='text-xs opacity-80'>Email</div>
                  <div className='font-medium'>
                    {userData.email || "user@example.com"}
                  </div>
                </div>
                <div>
                  <div className='text-xs opacity-80'>Username</div>
                  <div className='font-medium'>
                    {userData.username || "username"}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {cardType === "id" && (
          <>
            <div className='flex justify-between items-start'>
              <div className='text-white'>
                <div className='font-bold text-lg'>GOVERNMENT ID</div>
                <div className='text-xs mt-1'>
                  <div className='text-xs opacity-80'>Country</div>
                  {userData.address?.country || "Country"}
                </div>
              </div>
              <div className='w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center'>
                <Building className='w-6 h-6 text-blue-800' />
              </div>
            </div>
            <div className='text-white text-sm'>
              <div className='grid grid-cols-2 gap-2'>
                <div>
                  <div className='text-xs opacity-80'>Full Name</div>
                  <div className='font-medium'>
                    {userData.fullName || "JOHN DOE"}
                  </div>
                </div>
                <div>
                  <div className='text-xs opacity-80'>Date of Birth</div>
                  <div className='font-medium'>
                    {formatDateDMY(userData.dateOfBirth)}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div
        className='absolute inset-0 rounded-xl border bg-gradient-to-br from-gray-700 to-gray-800 border-gray-600 shadow-gray-700/50'
        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
      >
        <div className='w-full h-12 bg-black my-6'></div>
        <div className='px-4'>
          <div className='w-full bg-white h-10 flex items-center justify-end px-4'>
            <div className='font-mono text-black'>
              {index === 0 ? "123" : index === 1 ? "456" : "789"}
            </div>
          </div>
          <div className='mt-6 text-xs text-gray-300 text-center'>
            <p>This card is property of Apple Wallet</p>
            <p>If found, please return to nearest Apple Store</p>
          </div>
        </div>
      </div>

      {isHovered && !isInWallet[index] && !isAnimating && (
        <div className='absolute -bottom-12 left-0 right-0 mx-auto text-white text-xs bg-black/70 rounded-md py-1 px-2 text-center whitespace-nowrap'>
          {isFlipped ? "Click to flip back" : "Click to flip"} • Double-click to
          insert
        </div>
      )}
    </div>
  );
};

const SuccessCheckmark = ({ isVisible }: { isVisible: boolean }) => {
  const checkmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!checkmarkRef.current) return;

    if (isVisible) {
      gsap.fromTo(
        checkmarkRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
          delay: 0.2,
        }
      );
    } else {
      gsap.to(checkmarkRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={checkmarkRef}
      className='absolute top-[200px] left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-6 rounded-full shadow-lg z-20'
    >
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.3,
        }}
      >
        <svg
          className='w-12 h-12'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <motion.path
            d='M20 6L9 17L4 12'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </svg>
      </motion.div>
      <motion.div
        className='absolute inset-0 rounded-full bg-green-500'
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

function formatDateDMY(dateStr?: string): string {
  if (!dateStr) return "01/01/1990";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr; // fallback if invalid
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export default function AppleWallet2D() {
  const isInWallet = useGlobalStore((state) => state.isInWallet);
  const setIsInWallet = useGlobalStore((state) => state.setIsInWallet);
  const cardStackOrder = useGlobalStore((state) => state.cardStackOrder);
  const setCardStackOrder = useGlobalStore((state) => state.setCardStackOrder);
  const isAllCardsIn = isInWallet.every((status) => status);

  useEffect(() => {
    const handleInsertCard = (cardIdx: number) => {
      const newArr = [...isInWallet];
      newArr[cardIdx] = true;
      setIsInWallet(newArr);
      setCardStackOrder([
        ...cardStackOrder.filter((i) => i !== cardIdx),
        cardIdx,
      ]);
    };
    const handleInsertCard0 = () => handleInsertCard(0);
    const handleInsertCard1 = () => handleInsertCard(1);
    const handleInsertCard2 = () => handleInsertCard(2);
    window.addEventListener("wallet-insert-card-0", handleInsertCard0);
    window.addEventListener("wallet-insert-card-1", handleInsertCard1);
    window.addEventListener("wallet-insert-card-2", handleInsertCard2);
    return () => {
      window.removeEventListener("wallet-insert-card-0", handleInsertCard0);
      window.removeEventListener("wallet-insert-card-1", handleInsertCard1);
      window.removeEventListener("wallet-insert-card-2", handleInsertCard2);
    };
  }, [isInWallet, cardStackOrder, setIsInWallet, setCardStackOrder]);

  const cardProps = [
    { color: "blue", cardType: "contact" },
    { color: "green", cardType: "id" },
    { color: "red", cardType: "credit" },
  ];

  return (
    <div className='relative w-full h-full overflow-hidden flex justify-center'>
      {/* Background */}
      <div className='absolute inset-0 bg-gradient-to-b bg-gray-50'></div>

      {cardStackOrder
        .filter((idx) => idx < cardProps.length)
        .map((idx, stackIdx) => (
          <Card
            key={idx}
            color={cardProps[idx].color}
            index={idx}
            isInWallet={isInWallet}
            setIsInWallet={setIsInWallet}
            cardType={cardProps[idx].cardType as any}
          />
        ))}
      {/* Success */}
      <SuccessCheckmark isVisible={isAllCardsIn} />
    </div>
  );
}
