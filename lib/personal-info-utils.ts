import PersonalInfoFormProps from "@/interfaces/IpersonalInformation";

export interface PersonalInfoErrors {
  fullName?: string;
  dateOfBirth?: string;
  country?: string;
}

export function isValidDate(month: number, day: number, year: number) {
  if (!month || !day || !year) return false;
  if (year < 1900 || year > new Date().getFullYear()) return false;
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export const validateDateOfBirth = (dateStr: string) => {
  // Strict MM/DD/YYYY check
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) return -1;
  const [month, day, year] = dateStr.split("/").map(Number);
  if (!isValidDate(month, day, year)) return -1;
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const handleDateChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  updateUserData: PersonalInfoFormProps["updateUserData"]
) => {
  let value = e.target.value.replace(/\D/g, "");

  if (value.length > 2) {
    value = value.slice(0, 2) + "/" + value.slice(2);
  }
  if (value.length > 5) {
    value = value.slice(0, 5) + "/" + value.slice(5);
  }
  value = value.slice(0, 10);

  updateUserData({ dateOfBirth: value });
};

export const validatePersonalInfoForm = (
  userData: PersonalInfoFormProps["userData"]
): { errors: PersonalInfoErrors; hasErrors: boolean } => {
  const errors: PersonalInfoErrors = {};
  let hasErrors = false;

  if (!userData.fullName.trim()) {
    errors.fullName = "Full name is required";
    hasErrors = true;
  } else if (userData.fullName.trim().length < 3) {
    errors.fullName = "Full name must be at least 3 characters";
    hasErrors = true;
  }

  if (!userData.dateOfBirth) {
    errors.dateOfBirth = "Date of birth is required";
    hasErrors = true;
  } else {
    const age = validateDateOfBirth(userData.dateOfBirth);
    if (age === -1) {
      errors.dateOfBirth = "Please enter a valid date.";
      hasErrors = true;
    } else if (age < 18) {
      errors.dateOfBirth = "You must be at least 18 years old";
      hasErrors = true;
    }
  }

  if (!userData.address.country) {
    errors.country = "Country is required";
    hasErrors = true;
  }

  return { errors, hasErrors };
};

export const updateAddress = (
  userData: PersonalInfoFormProps["userData"],
  updateUserData: PersonalInfoFormProps["updateUserData"],
  field: string,
  value: string
) => {
  updateUserData({
    address: {
      ...userData.address,
      [field]: value,
    },
  });
};
