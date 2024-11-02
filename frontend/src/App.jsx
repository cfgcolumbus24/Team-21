import React from 'react';
import Auth from './components/Auth';
import LandingPage from './pages/LandingPage';
import GraphPage from './pages/GraphPage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import GenerateReport from './pages/GenerateReport';
import NavBar from './components/NavBar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';



const App = () => {
  return (
  <Router>
    <div>
   <NavBar />
    <Routes>
        <Route path = "/auth" element = {<Auth/>} />
        <Route path = "/data" element = {<GraphPage/>} />
        <Route path = "/" element = {<SearchPage/>} />
        <Route path = "/profile" element = {<ProfilePage/>} />
        <Route path = "/report" element = {<GenerateReport/>} />
    </Routes>
    </div>
  </Router>
  
   )
  };

export default App;


