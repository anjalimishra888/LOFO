import {
  createContext,
  useState,
  useEffect,
} from "react";

export const AuthContext =
  createContext();

export default function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    try {
      const storedUser =
        localStorage.getItem("user");

      if (storedUser) {
        setUser(
          JSON.parse(storedUser)
        );
      }
    } catch (error) {
      console.error(
        "Failed to load user",
        error
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData) => {
    if (!userData) return;

    const cleanedUser = {
      _id: userData._id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      token: userData.token,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(cleanedUser)
    );

    localStorage.setItem(
      "token",
      cleanedUser.token
    );

    setUser(cleanedUser);
  };

  const logout = () => {
    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "token"
    );

    setUser(null);
  };

  const isAuthenticated =
    !!user;

  const isAdmin =
    user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        loading,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}