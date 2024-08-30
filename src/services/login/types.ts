export interface LoginInfos {
  emailAddress?: string;
  password?: string;
}

export interface VerifyInfos {
  emailAddress?: string;
  emailVerificationCode?: string;
}

export interface SignupInfos {
  emailAddress: string;
  username: string;
  password: string;
  passwordConfirmation: string;
}

export interface ConnectionInfos {
  id: string;
  emailAddress: string;
  permissions: string[];
  username: string;
}

export interface User {
  createdAt: Date;
  emailAddress: string;
  emailAddressVerified: boolean;
  id: string;
  language: string;
  modifiedAt: Date;
  permissions: string[];
  phoneNumberVerified: boolean;
  username: string;
}

export interface Login {
}
