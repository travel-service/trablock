import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { refresh } from 'lib/api/auth';
import Spinner from 'lib/custom/Spinner';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userState } = useSelector(({ user }) => ({
    userState: user.userState,
  }));

  const alertToLogin = useCallback(
    (msg) => {
      alert(msg);
      navigate(process.env.PUBLIC_URL + '/login');
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    },
    [navigate],
  );

  useEffect(() => {
    (async () => {
      let res = await refresh();
      if (res) {
        setLoading(true);
        if (res.status === 201) return;
        else alertToLogin('로그인 후 사용가능합니다 !');
      } else {
        alertToLogin('서버의 문제가 발생했습니다 !');
      }
    })();
  }, [alertToLogin]);

  return (
    <>
      {loading && userState && children}
      {!loading && <Spinner />}
    </>
  );
};

export default ProtectedRoute;
