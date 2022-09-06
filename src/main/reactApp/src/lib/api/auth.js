import axios from 'axios';

// 로그인
export const login = async ({ userName, password }) => {
  try {
    const response = await axios.post('/api/login', { userName, password });
    axios.defaults.headers.common['authorization'] =
      response.headers.authorization;
    return response;
  } catch (e) {
    return e.response;
  }
};

// 회원가입
export const signup = async ({
  userName,
  email,
  password,
  nickName,
  birthday,
  gender,
}) => {
  try {
    const res = await axios.post('/api/signup', {
      userName,
      email,
      password,
      nickName,
      birthday,
      gender,
    });
    if (res.status === 201 || res.status === 200) {
      return res;
    }
    if (res.response.status === 400) {
      return res.response;
    }
    return res;
  } catch (e) {
    return e;
  }
};

// accessToken으로 user 정보 업데이트
export const userCheck = async () => {
  try {
    const response = await axios.get('/auth/status');
    return response;
  } catch (e) {
    return e.response;
  }
};

// refreshToken으로 accessToken 업데이트
export const refresh = async () => {
  const response = await axios.get('/auth/refresh', {
    validateStatus: function (status) {
      // 상태 코드가 500 이상일 경우 거부. 나머지(500보다 작은)는 허용.
      return status < 500;
    },
  });
  return response;
};

// 로그아웃
export const logout = async () => {
  const response = await axios.post('/members/logout');
  // eslint-disable-next-line no-restricted-globals
  location.reload();
  return response;
};

// 이메일 인증
export const emailCheck = async (email, uuid) => {
  const response = await axios.get(`/auth/email?email=${email}&uuid=${uuid}`, {
    validateStatus: function (status) {
      return status <= 500;
    },
  });
  return response;
};

// 아이디 중복 체크
export const checkUserName = async ({ userName }) => {
  const response = await axios.get(`/api/username/${userName}`);
  return response;
};

// 닉네임 중복 체크
export const checkNickName = async ({ nickName }) => {
  const response = await axios.get(`/api/nickname/${nickName}`);
  return response;
};

// 이메일 중복 체크(개발X)
export const checkEmail = async ({ email }) => {
  const response = await axios.get(`/api/email/${email}`);
  return response;
};
