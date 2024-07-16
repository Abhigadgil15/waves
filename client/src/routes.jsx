import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter, useNavigate } from 'react-router-dom';
import Header from './components/navigation/header';
import Footer from './components/navigation/footer';
import Home from './components/home';
import MainLayout from './hoc/mainLayout';
import RegisterLogin from './components/auth';
import Loaders from './utils/loader';
import { useDispatch, useSelector } from 'react-redux'
import { userisAuth, userSignOut } from './store/actions/users.actions';
import UserDashBoard from './components/dashboard';
import AuthGuard from './hoc/authGuard';
import UserInfo from './components/dashboard/user/info';
const ProtectedUserDashboard = AuthGuard(UserDashBoard);
const ProtectedUserInfo = AuthGuard(UserInfo);
const App = (props) => {
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  const signOutUser = () => {
    dispatch(userSignOut())
  }

  useEffect(() => {
    dispatch(userisAuth());
  }, [dispatch]);

  useEffect(() => {
    if (users.auth !== null) {
      setLoading(false);
    }
  }, [users]);

  return (
    <BrowserRouter>
      {loading ? (
        <Loaders full={true} />
      ) : (
        <>
          <Header 
            users={users}
            signOutUser={signOutUser}
          />
          <Routes>
            <Route path = "/dashboard/user/user_info" element={<ProtectedUserInfo/>}/>
            <Route path = "/dashboard" element={<ProtectedUserDashboard/>}/>
            <Route path="/sign_in" element={<RegisterLogin />} />
            <Route path="/" element={<Home />} />
          </Routes>
          <MainLayout />
          <Footer />
        </>
      )}
    </BrowserRouter>
  );
}

export default App;