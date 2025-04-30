export type UserData = {
  username: string;
  email: string;
  fullName: string;
  dateOfBirth: string;
  address: {
    country: string;
  };
  governmentId: {
    type: string;
    number: string;
    file?: File;
  };
};
