import { UserData } from "@/types/signup.types";

export default interface UserRegistrationFormProps {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  onNext: () => void;
  isTransitioning?: boolean;
}
