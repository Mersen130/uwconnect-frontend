//Global css must defined at the top and let it get overwritten
import "bootstrap/dist/css/bootstrap.min.css";
import './styles/App.css';
import './styles/chatUI-override.css';

//Our stuffs
import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import GetLoginForm from './route/login/loginForm';
import GetSignupForm from './route/signup/signupForm';
import GetProfileHobbies from './route/profile/hobbies';
import GetIdentity from './route/profile/identity';
import GetMakePublic from './route/profile/makePublic';
import Layout from './components/Layout'
import Home from './route/home/Home';
import CreateProfile from "./route/profile/createProfile";
import ModifyProfile from "./route/profile/modifyProfile";
import { persistor } from './redux/store'


import {
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import { useSelector } from "react-redux";
  

function App() {

  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn )
  
  useEffect(() => {
    // This function will run before any route rendered
    if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/createprofile') {
      if (isLoggedIn){
        window.location.href = '/home';
      }
    } else{
      if (!isLoggedIn){
        window.location.href = '/';
      }
    }
  }, [location]);


  return (
    <Routes>
      <Route exact path='/' element={<div data-testid = "App-1" className='App-header'><GetLoginForm  /></div>}/>
      <Route exact path='/login' element={<div  className='App-header'><GetLoginForm /></div>}/>
      <Route exact path='/register' element={<div  className='App-header'><GetSignupForm /></div>}/>
      <Route element={<Layout/>}>
        <Route exact path='/createprofile' element={<div className='App-header'><CreateProfile /></div>}/>
        <Route exact path='/modifyprofile' element={<div className='App-header'><ModifyProfile /></div>}/>
        <Route exact path='/home' element={<div  className='App-header'><Home /></div>}/>
      </Route>
      {/* <Route exact path='/profile/identity' element={<div className='App-header'><GetIdentity /></div>}/>
      <Route exact path='/profile/makePublic' element={<div className='App-header'><GetMakePublic /></div>}/> */}
    </Routes>
    )
  // <div className='App-header'><GetSignupForm /></div>;
}

export default App;
