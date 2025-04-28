export type UserData = {
  username: string;
  email: string;
  fullName: string;
  dateOfBirth: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  governmentId: {
    type: string;
    number: string;
    expiryDate: string;
    file?: File;
  };
};
