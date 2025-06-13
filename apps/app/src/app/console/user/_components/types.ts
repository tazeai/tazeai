export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  avatar: string;
}

export interface UserFormData {
  name: string;
  email: string;
  role: string;
  status: string;
}
