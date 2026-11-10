import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

interface User {
  id?: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loginUser: (user: User) => void;
  logoutUser: () => void;
}

const AuthContext =
  createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [
    user,
    setUser,
  ] = useState<User | null>(() => {

    const savedUser =
      localStorage.getItem("user");

    if (!savedUser) {
      return null;
    }

    try {

      return JSON.parse(
        savedUser
      );

    } catch {

      localStorage.removeItem(
        "user"
      );

      return null;
    }
  });

  const loginUser = (
    user: User
  ) => {

    setUser(user);

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );
  };

  const logoutUser = () => {

    setUser(null);

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );
  };

  return (

    <AuthContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
      }}
    >

      {children}

    </AuthContext.Provider>
  );
}

export function useAuthContext() {

  const context =
    useContext(AuthContext);

  if (!context) {

    throw new Error(
      "useAuthContext must be used inside AuthProvider"
    );
  }

  return context;
}