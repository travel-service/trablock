import { createAction, handleActions } from 'redux-actions';
import {
  takeLatest,
  // call
} from 'redux-saga/effects';
import produce from 'immer';
import createRequestSaga, {
  createRequestActionTypes,
} from 'lib/redux/createRequestSaga';
import * as authAPI from 'lib/api/auth';

// 액션 생성
const CHANGE_FIELD = 'auth/CHANGE_FIELD'; // input 값 변화 감지
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM'; // form 초기화
const TEMP_SET_AUTH = 'auth/TEMP_SET_AUTH'; //새로고침 이후 임시 로그인 처리
const [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE] =
  createRequestActionTypes('auth/SIGNUP'); // 회원가입
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes('auth/LOGIN'); // 로그인
const [USERNAME, USERNAME_SUCCESS, USERNAME_FAILURE] =
  createRequestActionTypes('auth/USERNAME'); // 아이디 중복 검증
const [NICKNAME, NICKNAME_SUCCESS, NICKNAME_FAILURE] =
  createRequestActionTypes('auth/NICKNAME'); // 닉네임 중복 검증
const [EMAIL, EMAIL_SUCCESS, EMAIL_FAILURE] =
  createRequestActionTypes('auth/EMAIL'); // 이메일 중복 검증

// createAction(타입, 현재 상태)
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, // login, signup
    key, // userName, password, name ..
    value,
  }),
);
export const initializeForm = createAction(INITIALIZE_FORM, (form) => form); // signup, login
export const signup = createAction(
  SIGNUP,
  ({ userName, email, password, nickName, birthday, gender }) => ({
    userName,
    email,
    password,
    nickName,
    birthday,
    gender,
  }),
);
export const login = createAction(LOGIN, ({ userName, password }) => ({
  userName,
  password,
}));
export const tempSetAuth = createAction(TEMP_SET_AUTH, (auth) => auth);
export const checkUserName = createAction(USERNAME, ({ userName }) => ({
  userName,
}));
export const checkNickName = createAction(NICKNAME, ({ nickName }) => ({
  nickName,
}));
export const checkEmail = createAction(EMAIL, ({ email }) => ({
  email,
}));

// 사가 생성
// yield 비동기 통신
const signupSaga = createRequestSaga(SIGNUP, authAPI.signup);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
const checkUserNameSaga = createRequestSaga(USERNAME, authAPI.checkUserName);
const checkNickNameSaga = createRequestSaga(NICKNAME, authAPI.checkNickName);
const checkEmailSaga = createRequestSaga(EMAIL, authAPI.checkEmail);
export function* authSaga() {
  yield takeLatest(SIGNUP, signupSaga);
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(USERNAME, checkUserNameSaga);
  yield takeLatest(NICKNAME, checkNickNameSaga);
  yield takeLatest(EMAIL, checkEmailSaga);
}

// 초기값
const initialState = {
  // 불변성 유지하면서 객체 수정
  signup: {
    userName: '',
    email: '',
    password: '',
    passwordCheck: '',
    nickName: '',
    birthday: '',
    gender: '',
  },
  login: {
    userName: '',
    password: '',
  },
  auth: null,
  authError: null,
  userNameValid: [-1, null], // [검증여부, 에러메시지]
  nickNameValid: [-1, null],
  emailValid: [-1, null],
};

const auth = handleActions(
  {
    [CHANGE_FIELD]: (
      state,
      { payload: { form, key, value } }, // action 대신 구조분해, action.payload.form, key.. 호출
    ) =>
      produce(state, (draft) => {
        draft[form][key] = value; // ex. state.signup.userName
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null, // 폼 전환 시 외원 인증 에러 초기화
    }),
    // 회원가입 성공
    [SIGNUP_SUCCESS]: (state, action) => {
      // 회원가입 status 별 다른 에러 출력을 위해 수정
      if (action.payload.status === 400) {
        return {
          ...state,
          auth: null,
          authError: action.payload.data.message,
        };
      } else if (action.payload.status === 201) {
        return {
          ...state,
          auth: action.payload.data,
          authError: null,
        };
      } else {
        return {
          ...state,
          authError: action.payload.response.data.me,
        };
      }
    },
    // 회원가입 실패
    [SIGNUP_FAILURE]: (state, { payload: error }) => {
      return {
        ...state,
        authError: error,
      };
    },
    // 로그인 성공
    [LOGIN_SUCCESS]: (state, { payload: auth }) => {
      return {
        ...state,
        auth: auth.data.result,
        authError: null,
      };
    },
    // 로그인 실패
    [LOGIN_FAILURE]: (state, { payload: error }) => {
      console.log(error);
      return {
        ...state,
        authError: error,
      };
    },
    // 회원가입후 auth 제거
    [TEMP_SET_AUTH]: (state) => {
      return {
        ...state,
        auth: null,
      };
    },
    [USERNAME_SUCCESS]: (state, { payload: data }) => {
      if (data.status === 200) {
        return {
          ...state,
          userNameValid: [0, null],
        };
      } else if (data.response.status === 409) {
        return {
          ...state,
          userNameValid: [1, data.response.data.message],
        };
      } else {
        console.log('시스템 오류');
        return;
      }
    },
    [USERNAME_FAILURE]: (state) => {
      return {
        ...state,
        userNameValid: [1, '시스템 오류'],
      };
    },
    [NICKNAME_SUCCESS]: (state, { payload: data }) => {
      if (data.status === 200) {
        return {
          ...state,
          nickNameValid: [0, null],
        };
      } else if (data.response.status === 409) {
        return {
          ...state,
          nickNameValid: [1, data.response.data.message],
        };
      } else {
        console.log('시스템 오류');
        return;
      }
    },
    [NICKNAME_FAILURE]: (state) => {
      return {
        ...state,
        nickNameValid: [1, '시스템 오류'],
      };
    },
    [EMAIL_SUCCESS]: (state, { payload: data }) => {
      if (data.status === 200) {
        return {
          ...state,
          emailValid: [0, null],
        };
      } else if (data.response.status === 409) {
        return {
          ...state,
          emailValid: [1, data.response.data.message],
        };
      } else {
        console.log('시스템 오류');
        return;
      }
    },
    [EMAIL_FAILURE]: (state) => {
      return {
        ...state,
        emailValid: [1, '시스템 오류'],
      };
    },
  },
  initialState,
);

export default auth;
