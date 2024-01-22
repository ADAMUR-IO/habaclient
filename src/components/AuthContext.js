import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error retrieving user from AsyncStorage:', error);
      }
    })();
  }, []);

  const login = (userInfo) => {
    setUser(userInfo);
    AsyncStorage.setItem('user', JSON.stringify(userInfo))
      .then(() => console.log('User data stored in AsyncStorage'))
      .catch((error) => console.error('Error storing user data:', error));
  };

  const logout = () => {
    setUser(null);
    AsyncStorage.removeItem('user')
      .then(() => console.log('User data removed from AsyncStorage'))
      .catch((error) => console.error('Error removing user data:', error));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
