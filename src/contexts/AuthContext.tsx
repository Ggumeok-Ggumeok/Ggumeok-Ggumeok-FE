import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateNickname: (nickname: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // 로컬 스토리지에서 유저 정보 복원 (데모용)
    const savedUser = localStorage.getItem('ggumeok_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('ggumeok_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ggumeok_user');
  };

  const updateNickname = (nickname: string) => {
    if (user) {
      const updatedUser = { ...user, nickname };
      setUser(updatedUser);
      localStorage.setItem('ggumeok_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout, updateNickname }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
