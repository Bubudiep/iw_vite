import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Đặt loading thành false khi khởi động, vì việc kiểm tra người dùng sẽ được thực hiện bởi PrivateRoute
    setLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated: !!user, loading }}>
      {children}
    </UserContext.Provider>
  );
};
