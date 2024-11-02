import { supabase } from '../supabaseClient';
import React, { useState } from 'react';

function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);

    const handleAuth = async () => {
        const {error} = isSignUp
        ? await supabase.auth.signUp({email, password}) 
        : await supabase.auth.signInWithPassword({email, password});
        

        if (error) alert(error.message); 
        else { 
            alert(isSignUp ? 'Sign-up successful': 'Logged in successfully!')
            window.location.href = "/"
        };
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-50" >
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {isSignUp ? 'Create an Account' : 'Welcome Back!'}
                </h2>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 mb-4 border border-gray-300 rounded"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 mb-4 border border-gray-300 rounded"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    onClick={handleAuth}
                    className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                    {isSignUp ? 'Sign Up' : 'Log In'}
                </button>
                <p className="mt-4 text-center text-sm">
                    {isSignUp ? 'Already have an account?' : 'Need an account?'}{' '}
                    <span
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-blue-600 cursor-pointer hover:underline"
                    >
                    {isSignUp ? 'Log In' : 'Sign Up'}
                    </span>
                </p>
            </div>
      </div>
    )
}

export default Auth;