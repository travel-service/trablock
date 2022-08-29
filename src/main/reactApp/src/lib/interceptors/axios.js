import axios from 'axios';
import * as authAPI from 'lib/api/auth';

let refresh = false; // 무한 루프 방지

// axios response error시 인터셉터 발생, refresh 토큰 으로 access 발급
axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (!refresh) {
      console.log(error);
      if (
        error.response.data.message.includes('AccessToken') ||
        error.response.status === 500
      ) {
        refresh = true;
        const response = await authAPI.refresh(); // new AccessToken
        if (response.status === 201) {
          axios.defaults.headers.common['authorization'] =
            response.headers.authorization;
          return axios(error.config);
        }
      }
    }
    refresh = false;
    return error;
  },
);

// https://www.youtube.com/watch?v=VJLSaq1Ll0U
