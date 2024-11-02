import React from 'react';
import Auth from './components/Auth';
import LandingPage from './pages/LandingPage';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


const App = () => {
  return (
    <Router>
      <Routes>
          <Route path = "/auth" element = {<Auth/>} />
          <Route path = "/" element = {<LandingPage/>} />
      </Routes>
    </Router>
   )
  };

export default App;


