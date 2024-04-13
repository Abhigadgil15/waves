
import React from 'react';
import { Routes,Route,BrowserRouter } from 'react-router-dom';
import Header from './components/navigation/header';
import Footer from './components/navigation/footer';
import Home from './components/home';
import MainLayout from './hoc/mainLayout';
import RegisterLogin from './components/auth';

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path ="/sign_in"  element={<RegisterLogin/>}/>
      <Route path ="/"  element={<Home/>}/>
    </Routes>
    <MainLayout/>
    <Footer/>
    </BrowserRouter>

  )
}

export default App;
