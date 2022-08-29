import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { refresh } from 'lib/api/auth';
import Spinner from 'lib/custom/Spinner';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { userState } = useSelector(({ user }) => ({
    userState: user.userState,
  }));

  const alertToLogin = useCallback(() => {
    alert('로그인 후 사용가능한 서비스입니다 !');
    navigate(process.env.PUBLIC_URL + '/login');
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  }, [navigate]);

  useEffect(() => {
    (async () => {
      let res = await refresh();
      if (!res.data) {
        alertToLogin();
        return;
      } else if (res.data.status === 201) {
        return;
      } else {
        alertToLogin();
        return;
      }
    })();
  }, [alertToLogin]);

  if (!userState) return <Spinner />;
  else return children;
};

export default ProtectedRoute;
