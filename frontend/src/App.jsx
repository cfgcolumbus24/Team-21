import React from 'react';
import Auth from './components/Auth';
import GraphPage from './pages/GraphPage';
import SearchPage from './pages/SearchPage';
import NavBar from './components/NavBar';
import ProfilePage from './pages/ProfilePage';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './supabaseContext';



const App = () => {
  return (
  <AuthProvider>
    <Router>
      <div>
    <NavBar />
      <Routes>
          <Route path = "/auth" element = {<Auth/>} />
          <Route path = "/data" element = {<GraphPage/>} />
          <Route path = "/" element = {<SearchPage/>} />
          <Route path = "/profile" element = {<ProfilePage/>} />
      </Routes>
      </div>
    </Router>
  </AuthProvider>
  
   )
  };

export default App;


