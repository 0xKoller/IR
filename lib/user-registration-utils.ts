import UserRegistrationFormProps from "@/interfaces/IuserRegistration";

export interface UserRegistrationErrors {
  username?: string;
  email?: string;
}

export const validateUserRegistrationForm = (
  userData: UserRegistrationFormProps["userData"]
): { errors: UserRegistrationErrors; hasErrors: boolean } => {
  const errors: UserRegistrationErrors = {};
  let hasErrors = false;

  if (!userData.username.trim()) {
    errors.username = "Username is required";
    hasErrors = true;
  } else if (userData.username.trim().length < 2) {
    errors.username = "Username must be at least 2 characters";
    hasErrors = true;
  }

  if (!userData.email.trim()) {
    errors.email = "Email is required";
    hasErrors = true;
  } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
    errors.email = "Please enter a valid email";
    hasErrors = true;
  }

  return { errors, hasErrors };
};
