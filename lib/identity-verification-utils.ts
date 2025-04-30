import { IdentityVerificationFormProps } from "@/interfaces/Iid";

export interface ValidationErrors {
  idType?: string;
  idNumber?: string;
  idFile?: string;
}

export const validateIdentityForm = (
  userData: IdentityVerificationFormProps["userData"],
  fileName: string | null
): { errors: ValidationErrors; hasErrors: boolean } => {
  const errors: ValidationErrors = {};
  let hasErrors = false;

  if (!userData.governmentId.type) {
    errors.idType = "ID type is required";
    hasErrors = true;
  }

  if (!userData.governmentId.number.trim()) {
    errors.idNumber = "ID number is required";
    hasErrors = true;
  } else if (userData.governmentId.number.trim().length < 4) {
    errors.idNumber = "ID number must be at least 4 characters";
    hasErrors = true;
  }

  if (!userData.governmentId.file && !fileName) {
    errors.idFile = "ID document is required";
    hasErrors = true;
  } else {
    const file = userData.governmentId.file;
    if (file && file.size > 100 * 1024 * 1024) {
      errors.idFile = "File must be less than 100MB";
      hasErrors = true;
    }
  }

  return { errors, hasErrors };
};

export const updateGovernmentId = (
  userData: IdentityVerificationFormProps["userData"],
  updateUserData: IdentityVerificationFormProps["updateUserData"],
  field: string,
  value: string
) => {
  updateUserData({
    governmentId: {
      ...userData.governmentId,
      [field]: value,
    },
  });
};

export const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  userData: IdentityVerificationFormProps["userData"],
  updateUserData: IdentityVerificationFormProps["updateUserData"],
  setFileName: (name: string) => void
) => {
  const file = e.target.files?.[0];
  if (file) {
    setFileName(file.name);
    updateUserData({
      governmentId: {
        ...userData.governmentId,
        file,
      },
    });
  }
};
