import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PreventSignInROute = ({ children }) => {
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    if (users.auth) {
      navigate('/dashboard');
    }
  }, [users, navigate]);

  return (
    <>
      {!users.auth && children}
    </>
  );
};

export default PreventSignInROute;