
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './Home'
import Login from './Login';
import Dashboard from './Dashboard';
import IncidentDetails from './IncidentDetails';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path='/' element={<Home/>} /> */}
        <Route path="/incident/:id" element={<IncidentDetails/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        {/* <Route path='/sign-up' element={<FormOne/>} /> */}
        <Route path='/' element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;
