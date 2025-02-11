import { createContext, ReactNode, useEffect, useState } from "react";
import {
  getTokenVerified,
  loginUser,
  logoutUser,
  signupUser,
} from "../services/authService";
import { useNavigate } from "react-router";

interface User {
  name: string;
  email: string;
}

export type UserDataResponse = {
  message: string;
  name: string;
  email: string;
} | null;

export interface AuthUser {
  user: User | null;
  isLoggedin: boolean;
  login: (email: string, password: string) => Promise<UserDataResponse>;
  logout: () => Promise<number>;
  signup: (email: string, password: string, name: string) => Promise<void>;
}

// B1: Create a context that will store all the passing props to children
const initialUser: AuthUser = {
  user: null,
  isLoggedin: false,
  login: async () => Promise.resolve(null),
  logout: async () => Promise.resolve(0),
  signup: async () => Promise.resolve(),
};

export const AuthContext = createContext<AuthUser>(initialUser);

// B2: Create a wrapper function that gonna return a Context Provider (with all the props you want to pass) for the children inside.
// This function gonna handle (treat) all the data before passing to all children
export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch if the user cookie is valid so skip login. Check if the user has the auth token and if that it's validated
    async function checkToken() {
      try {
        const data: User = await getTokenVerified();
        setUser({ name: data.name, email: data.email });
        setIsLoggedIn(true);
      } catch (error) {
        setUser(null);
        setIsLoggedIn(false);
      }
    }
    checkToken();
  }, []);

  async function login(
    email: string,
    password: string
  ): Promise<UserDataResponse> {
    const loginData: UserDataResponse = await loginUser(email, password);
    if (loginData) {
      setUser({ name: loginData.name, email: loginData.email });
      setIsLoggedIn(true);
      navigate("/chat")
    }
    return await loginUser(email, password);
  }

  async function logout(): Promise<number> {
    const res = await logoutUser();
    if (res) {
      setUser(null);
      setIsLoggedIn(false);
      navigate("/")
    }
    return res;
  }

  async function signup(
    name: string,
    email: string,
    password: string
  ): Promise<void> {
    const signupData: UserDataResponse = await signupUser(
      name,
      email,
      password
    );
    if (signupData) {
      setUser({ name: signupData.name, email: signupData.email });
      setIsLoggedIn(true);
      navigate("/chat")
    }
    return await signupUser(name, email, password);
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedin, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}
