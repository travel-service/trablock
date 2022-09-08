import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthForm from 'components/Auth/AuthForm';
import { changeField, initializeForm, login } from 'lib/redux/modules/auth';
import { check } from 'lib/redux/modules/user';

const LoginForm = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { form, auth, authError, userState } = useSelector(
    ({ auth, user }) => ({
      form: auth.login, // store이름 auth, auth.signup에(회원 정보 목록 있음)
      auth: auth.auth,
      authError: auth.authError,
      userState: user.userState,
    }),
  );

  // 인풋 변경 이벤트 핸들러
  const onChange = useCallback(
    (e) => {
      const { value, name } = e.target;
      //  submit error 메시지 초기화
      setError(null);
      dispatch(
        changeField({
          form: 'login',
          key: name,
          value,
        }),
      );
    },
    [dispatch],
  );

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    const { userName, password } = form;
    dispatch(login({ userName, password }));
  };

  // 컴포넌트가 처음 렌더링될 때 form 초기화
  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      setError('아이디 또는 비밀번호를 잘못 입력했습니다.');
      return;
    }
    if (auth) {
      dispatch(check());
    }
  }, [auth, authError, dispatch, navigate]);

  useEffect(() => {
    if (userState) {
      navigate(process.env.PUBLIC_URL + '/');
    }
  }, [userState, navigate]);

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default LoginForm;
