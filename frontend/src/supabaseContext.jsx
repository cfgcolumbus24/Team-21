import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

const SupabaseContext = createContext();

export const SupabaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabase.auth.getSession()
    setUser(session?.user ?? null);

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  return (
    <SupabaseContext.Provider value={{ user, supabase }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => useContext(SupabaseContext);
