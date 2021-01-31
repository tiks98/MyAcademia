import React, { createContext, useState, useEffect } from "react";
import AuthService from "../Services/AuthService";

export const AuthContext = createContext();

export default ({ children }) => {
  const [user, setUser] = useState(null);
  const [googleLogin, setGoogleLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AuthService.isAuthenticated().then((data) => {
      setUser(data.user);
      setGoogleLogin(data.googleLogin);
      setIsAuthenticated(data.isAuthenticated);
      setIsLoaded(true);
    });
  }, []);

  return (
    <div>
      {!isLoaded ? (
        <h1>Loading</h1>
      ) : (
        <AuthContext.Provider
          value={{
            user,
            setUser,
            isAuthenticated,
            setIsAuthenticated,
            googleLogin,
            setGoogleLogin,
          }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </div>
  );
};
