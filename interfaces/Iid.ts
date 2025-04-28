import { UserData } from "@/types/signup.types";

export interface IdentityVerificationFormProps {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  onNext: () => void;
  onBack: () => void;
  isTransitioning?: boolean;
}
