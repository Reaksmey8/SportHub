export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface StoredAccount extends AuthUser {
  password: string;
}
