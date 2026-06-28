// src/context/AuthContext.tsx
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {jwtDecode} from 'jwt-decode';
import { AuthApi } from '../api/endpoints';

interface JwtPayload {
  sub: string;
  role: string;
  exp: number;
}

interface AuthValue {
  isAuth: boolean;
  role: 'ROLE_USER' | 'ROLE_ADMIN' | null;
  username: string | null;
  login: (u: string, p: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthValue>({} as AuthValue);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setAuth] = useState(false);
  const [role, setRole] = useState<AuthValue['role']>(null);
  const [username, setUsername] = useState<string | null>(null);

  const clearAuth = () => {
    localStorage.removeItem('jwt');
    setAuth(false);
    setRole(null);
    setUsername(null);
  };

  const inspectToken = (token: string | null) => {
    if (!token) {
      clearAuth();
      return;
    }

    try {
      const decoded: JwtPayload & { roles?: Array<{ authority?: string }> } = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        clearAuth();
        return;
      }

      const role = decoded.role ?? decoded.roles?.[0]?.authority ?? null;
      setAuth(true);
      setRole(role as AuthValue['role']);
      setUsername(decoded.sub);
    } catch {
      clearAuth();
    }
  };

  useEffect(() => {
    inspectToken(localStorage.getItem('jwt'));
  }, []);

  const login = async (u: string, p: string) => {
    const res = await AuthApi.login({ username: u, password: p });
    localStorage.setItem('jwt', res.data.token);
    inspectToken(res.data.token);
  };

  const logout = () => {
    clearAuth();
    AuthApi.logout().catch(() => null);
  };

  return (
    <AuthContext.Provider value={{ isAuth, role, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
