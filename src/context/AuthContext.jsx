import { createContext, useState, useEffect, useCallback } from 'react';
import { getMe, login as apiLogin, logout as apiLogout } from '../services/api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    try {
      const response = await getMe();
      setUser(response.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (credentials) => {
    const response = await apiLogin(credentials);
    await loadUser();
    return response.data;
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch {
      // ignore
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    loadUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
