import axios from 'axios';

// 로그인
export const login = async ({ userName, password }) => {
  const response = await axios.post('/api/login', { userName, password });
  axios.defaults.headers.common['authorization'] =
    response.headers.authorization;
  return response;
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
  const response = await axios.get('/auth/status');
  return response;
};

// refreshToken으로 accessToken 업데이트
export const refresh = async () => {
  const response = await axios.get('/auth/refresh');
  return response;
};

// 로그아웃
export const logout = async () => {
  const response = await axios.post('/members/logout');
  // eslint-disable-next-line no-restricted-globals
  location.reload();
  return response;
};

export const checkUserName = async ({ userName }) => {
  const response = await axios.get(`/api/username/${userName}`);
  return response;
};

export const checkNickName = async ({ nickName }) => {
  const response = await axios.get(`/api/nickname/${nickName}`);
  return response;
};