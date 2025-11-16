export interface User {
  id: string;
  name: string;
  email: string;
  role: "buyer" | "seller";
}

export interface Product {
  id: string;
  name: string;
  model: string;
  color: string;
  price: number;
  km: number;
  image: string;
  description: string;
}

export interface AuthContextType {
  user: User | null;
  logout: () => void;
  login: (value: User) => void;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: "buyer" | "seller";
}
