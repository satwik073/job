import React from "react";
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import HeroSection from "./Pages/HeroSection";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Registration/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="mainpage" element={<HeroSection/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
