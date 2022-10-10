import './App.css';

import LogIn from "./pages/registration/LogIn";
import SignUp from "./pages/registration/SignUp";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Home from "./pages/Home";
function App() {
  
  return (
      <Router>
          <Routes>
              <Route path={'/*'} element={<Home/>}/>
              <Route path={'/login'} element={<LogIn/>}/>
              <Route path={'/signup'} element={<SignUp/>}/>
          </Routes>
      </Router>
  );
}

export default App;
