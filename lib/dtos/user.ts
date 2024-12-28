export interface User {
  age: string;
  city: string;
  country: string;
  countryCode: number;
  email: string;
  fullName: string;
  gender: string;
  id: string;
  phoneNumber: string;
  profilePhoto: string | null;
  state: string | null;
}

export interface NewUser {
  fullName: string;
  gender: string;
  age: string;
  phoneNumber: string;
  email: string;
  password: string;
}

export interface EditUser {
  fullName: string;
  phoneNumber: string;
  password?: string;
}

export interface SessionUser {
  fullName: string;
  phoneNumber: string;
  userId: string;
  email: string;
}
