import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeField,
  initializeForm,
  signup,
  tempSetAuth,
  checkUserName,
  checkNickName,
  checkEmail,
} from 'lib/redux/modules/auth';
import AuthForm from 'components/Auth/AuthForm';
import { useNavigate } from 'react-router-dom';

const authKor = {
  userName: '아이디',
  nickName: '닉네임',
  email: '이메일',
};

const SignupForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [detailErr, setDetailErr] = useState({
    password: null,
    passwordCheck: null,
    userName: {
      status: null,
      message: null,
    },
    nickName: {
      status: null,
      message: null,
    },
    email: {
      status: null,
      message: null,
    },
  });
  const dispatch = useDispatch();
  const {
    form,
    auth,
    authError,
    userState,
    userNameValid,
    nickNameValid,
    emailValid,
  } = useSelector(({ auth, user }) => ({
    // state.auth, state.user
    form: auth.signup, // store이름 auth, auth.signup에(회원 정보 목록 있음)
    auth: auth.auth,
    authError: auth.authError,
    userNameValid: auth.userNameValid,
    nickNameValid: auth.nickNameValid,
    emailValid: auth.emailValid,
    userState: user.userState,
  }));

  const checkSpace = (value) => {
    const reg = /\s/g;
    // eslint-disable-next-line no-useless-escape
    const regExp = /[\{\}\[\]\/?,;:|\)*~`!^\-_+<>\#$%&\\\=\(\'\"]/g;
    if (value.match(reg) || value.match(regExp)) return 1;
    else return 0;
  };

  // 인풋 변경 이벤트 핸들러
  const onChange = useCallback(
    (e) => {
      const { value, name } = e.target;
      if (name === 'userName' || name === 'nickName' || name === 'email') {
        setDetailErr({
          ...detailErr,
          [name]: {
            status: null,
            message: null,
          },
        });
      }
      dispatch(
        changeField({
          form: 'signup',
          key: name,
          value,
        }),
      );
    },
    [dispatch, detailErr],
  );

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    let {
      userName,
      email,
      password,
      passwordCheck,
      nickName,
      birthday,
      gender,
    } = form;

    if (detailErr.userName.status !== 2) {
      setError('아이디 중복 검사를 해주세요');
      return;
    }

    if (detailErr.nickName.status !== 2) {
      setError('닉네임 중복 검사를 해주세요');
      return;
    }

    if (detailErr.email.status !== 2) {
      setError('이메일 중복 검사를 해주세요');
      return;
    }

    // 필수항목 중 하나라도 비어 있다면
    if (
      [userName, password, passwordCheck, nickName, email, gender].includes('')
    ) {
      setError('필수항목을 모두 입력해 주세요.');
      return;
    }
    if (password !== passwordCheck) {
      // 패스워드 다르면 오류출력 후 초기화
      setError('비밀번호가 일치하지 않습니다.');
      dispatch(changeField({ form: 'signup', key: 'password', value: '' }));
      dispatch(
        changeField({ form: 'signup', key: 'passwordCheck', value: '' }),
      );
      return;
    }
    dispatch(
      signup({
        userName,
        email,
        password,
        nickName,
        birthday,
        gender,
      }),
    );
  };

  // 컴포넌트가 처음 렌더링될 때 form 초기화
  useEffect(() => {
    dispatch(initializeForm('signup'));
  }, [dispatch]);

  useEffect(() => {
    if (userNameValid[0] === 1) {
      setDetailErr({
        ...detailErr,
        userName: {
          status: 1,
          message: userNameValid[1],
        },
      });
    }
    if (userNameValid[0] === 0) {
      setDetailErr({
        ...detailErr,
        userName: {
          status: 2,
          message: '사용 가능한 아이디 입니다.',
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userNameValid]);

  useEffect(() => {
    if (nickNameValid[0] === 1) {
      setDetailErr({
        ...detailErr,
        nickName: {
          status: 1,
          message: nickNameValid[1],
        },
      });
    }
    if (nickNameValid[0] === 0) {
      setDetailErr({
        ...detailErr,
        nickName: {
          status: 2,
          message: '사용 가능한 닉네임 입니다.',
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nickNameValid]);

  useEffect(() => {
    if (emailValid[0] === 1) {
      setDetailErr({
        ...detailErr,
        email: {
          status: 1,
          message: emailValid[1],
        },
      });
    }
    if (emailValid[0] === 0) {
      setDetailErr({
        ...detailErr,
        email: {
          status: 2,
          message: '사용 가능한 이메일 입니다.',
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailValid]);

  // 회원가입 성공/실패 처리
  useEffect(() => {
    if (authError) {
      // 아이디가 이미 존재
      setError(authError);
      return;
    }
    if (auth) {
      dispatch(tempSetAuth()); // 회원가입후 auth 제거
      alert('회원가입이 완료되었습니다!');
      navigate(process.env.PUBLIC_URL + '/');
    }
  }, [auth, authError, dispatch, navigate]);

  // user 값이 잘 설정되었는지 확인
  useEffect(() => {
    if (userState) {
      navigate(process.env.PUBLIC_URL + '/');
    }
    return;
  }, [userState, navigate]);

  const onBlur = (e) => {
    let { name, value } = e.target;
    if (name === 'password') {
      const regex = new RegExp(
        '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$',
      ); // 문자, 숫자, 특수문자 조합 8자 이상
      if (!regex.test(value))
        setDetailErr({
          ...detailErr,
          password: '비밀번호 양식을 확인해주세요.',
        });
      else
        setDetailErr({
          ...detailErr,
          password: null,
        });
    } else if (name === 'passwordCheck') {
      const { password } = form;
      if (password !== value)
        setDetailErr({
          ...detailErr,
          passwordCheck: '비밀번호가 일치하지 않습니다.',
        });
      else
        setDetailErr({
          ...detailErr,
          passwordCheck: null,
        });
    } else if (name === 'birthday') {
      const { birthday } = form;
      if (birthday.length === 8) {
        let tmp = birthday.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
        dispatch(changeField({ form: 'signup', key: 'birthday', value: tmp }));
      }
    }
  };

  const checkValue = (e) => {
    const { name } = e.target;
    const { userName, nickName, email } = form;
    if (checkSpace(form[name]) || form[name] === '') {
      setDetailErr({
        ...detailErr,
        [name]: {
          status: 1,
          message: `올바르지 않은 ${authKor[name]} 형식 입니다.`,
        },
      });
      return;
    }
    if (name === 'userName') {
      dispatch(checkUserName({ userName }));
    } else if (name === 'nickName') {
      dispatch(checkNickName({ nickName }));
    } else if (name === 'email') {
      dispatch(checkEmail({ email }));
    } else return;
  };

  // 새로 렌더시 초기화
  useEffect(() => {
    setDetailErr({
      ...detailErr,
      userName: {
        status: null,
        message: null,
      },
      nickName: {
        status: null,
        message: null,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthForm
      type="signup"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
      detailErr={detailErr}
      onBlur={onBlur}
      checkValue={checkValue}
    />
  );
};

export default SignupForm;
