import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
<<<<<<< Updated upstream
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LogIn from './pages/registration/LogIn';
import SignUp from './pages/registration/SignUp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="/logIn" element={<LogIn/>} />
      <Route path="/signUp" element={<SignUp/>} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  </BrowserRouter>
=======
import {Provider} from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App/>
    </Provider>

>>>>>>> Stashed changes
);

reportWebVitals();
