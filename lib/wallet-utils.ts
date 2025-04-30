import { gsap } from "gsap";
import { RefObject } from "react";

export interface CardAnimationProps {
  cardRef: RefObject<HTMLDivElement | null>;
  index: number;
  isInWallet: boolean;
  setIsAnimating: (isAnimating: boolean) => void;
}

export interface HoverAnimationProps {
  cardRef: RefObject<HTMLDivElement | null>;
  isHovered: boolean;
  isInWallet: boolean;
  isAnimating: boolean;
  index: number;
}

export const animateCardInsertion = ({
  cardRef,
  index,
  isInWallet,
  setIsAnimating,
}: CardAnimationProps) => {
  if (!cardRef.current) return;

  const timeline = gsap.timeline({
    onStart: () => setIsAnimating(true),
    onComplete: () => setIsAnimating(false),
  });

  if (isInWallet) {
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
      rotateY: 0,
      duration: 0.6,
      ease: "back.out(1.5)",
    });
  }
};

export const animateCardHover = ({
  cardRef,
  isHovered,
  isInWallet,
  isAnimating,
  index,
}: HoverAnimationProps) => {
  if (!cardRef.current || isInWallet || isAnimating) return;

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
      boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)",
      duration: 0.3,
      ease: "power2.out",
    });
  }
};

export const handleCardClick = (
  isAnimating: boolean,
  isInWallet: boolean,
  index: number,
  setIsInWallet: (arr: boolean[]) => void,
  isInWalletArray: boolean[]
) => {
  if (isAnimating) return;

  if (isInWallet) {
    const newIsInWallet = [...isInWalletArray];
    newIsInWallet[index] = false;
    setIsInWallet(newIsInWallet);
  }
};

export const handleCardDoubleClick = (
  isAnimating: boolean,
  isInWallet: boolean,
  index: number,
  setIsInWallet: (arr: boolean[]) => void,
  isInWalletArray: boolean[],
  cardStackOrder: number[],
  setCardStackOrder: (order: number[]) => void
) => {
  if (isAnimating || isInWallet) return;

  const newIsInWallet = [...isInWalletArray];
  newIsInWallet[index] = true;
  setIsInWallet(newIsInWallet);
  setCardStackOrder([...cardStackOrder.filter((i) => i !== index), index]);
};
