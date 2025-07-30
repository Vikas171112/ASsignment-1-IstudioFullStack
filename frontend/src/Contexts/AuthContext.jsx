import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null); // Initially null

  // On mount: read from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    const storedUser = localStorage.getItem("user");

    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUser) {
      // storedUser is string — parse it!
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (newToken, userObj) => {
    localStorage.setItem("userToken", newToken);
    localStorage.setItem("user", JSON.stringify(userObj)); // ✅ CORRECT
    setToken(newToken);
    setUser(userObj);
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
