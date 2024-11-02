import React from 'react';
import Auth from './components/Auth';
import LandingPage from './pages/LandingPage';
import GraphPage from './pages/GraphPage';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


const App = () => {
  return (
    <Router>
      <Routes>
          <Route path = "/auth" element = {<Auth/>} />
          <Route path = "/" element = {<LandingPage/>} />
          <Route path = "/data" element = {<GraphPage/>} />
      </Routes>
    </Router>
   )
  };

export default App;


