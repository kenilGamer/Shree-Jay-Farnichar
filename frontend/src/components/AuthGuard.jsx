import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { children } from 'react';

function AuthGuard({ children }) {
  // document.title = "Shreej";
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  // console.log(token);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, []);

  return children;
}

export default AuthGuard;