import { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from './supabaseClient';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session, supabase }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };