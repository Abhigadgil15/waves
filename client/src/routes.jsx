
import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Header from './components/navigation/header';
import Footer from './components/navigation/footer';
import Home from './components/home';
import MainLayout from './hoc/mainLayout';
import RegisterLogin from './components/auth';
import Loaders from './utils/loader';
import { useDispatch, useSelector } from 'react-redux'
import { userisAuth,userSignOut } from './store/actions/users.actions';

const App = (props) => {
  const [loading, setLoading] = useState(true);
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  const signOutUser = () => {
    dispatch(userSignOut())
  }
  useEffect(() => {
    dispatch(userisAuth())
  }, [dispatch])

  useEffect(()=>{
    if(users.auth!== null){
      setLoading(false);
    }
  }, [users])

  return (
    <BrowserRouter>
      {
        loading ?
          <Loaders full={true} />
          :
          <>
            <Header 
            users={users}
            signOutUser={signOutUser}/>
            <Routes>
              <Route path="/sign_in" element={<RegisterLogin />} />
              <Route path="/" element={<Home />} />
            </Routes>
            <MainLayout />
            <Footer />
          </>
      }
    </BrowserRouter>

  )
}

export default App;
