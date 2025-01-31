export interface UserInfo {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  email: string;
  company: string;
  address: string;
  roles: string[];
  isFirstTimeLogin: boolean;
}

export interface UserRequestingApp {
  id: string;
  userId: string;
  username: string;
  firstname: string;
  lastname: string;
}
