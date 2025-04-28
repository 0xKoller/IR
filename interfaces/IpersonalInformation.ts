import { UserData } from "@/types/signup.types";

export default interface PersonalInfoFormProps {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  onNext: () => void;
  onBack: () => void;
  isTransitioning?: boolean;
}
