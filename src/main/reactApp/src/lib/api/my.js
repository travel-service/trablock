import axios from 'axios';

// 회원 개인페이지, 프로필 사진
export const getMyinfo = async () => {
  try {
    const nickbio = await axios.get('/members/my-page');
    // const res = await axios.get('/members/my-page/img', {
    //   responseType: 'blob',
    // });
    // console.log(nickbio, res);
    // let file = new Blob([res.data], { type: 'image/png' });
    // const img = window.URL.createObjectURL(file);
    // console.log(file);
    return {
      nickname: nickbio.data.result.nickname,
      bio: nickbio.data.result.bio,
    };
  } catch (e) {
    console.log(e.response);
  }
};

// 회원 개인정보 수정 "요청"
export const postMyinfo = async (profile) => {
  try {
    const response = await axios.post('/members/profile/edit', profile);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

// 회원 개인페이지 닉네임 수정 "요청"
export const postMyNick = async (nickName) => {
  try {
    const response = await axios.post(`/members/profile/${nickName}`);
    return response;
  } catch (e) {
    console.log(e);
  }
};

// 회원 개인페이지 닉네임 수정 "요청"
export const postMyBio = async (bio) => {
  try {
    const response = await axios.post('/members/profile/bio', bio);
    return response;
  } catch (e) {
    console.log(e);
  }
};

// 회원 프로필 사진 변경
export const postMyImg = async (formdata) => {
  try {
    const response = await axios.post('/members/profile/img', formdata);
    return response;
  } catch (e) {
    console.log(e);
  }
};

// 회원 프로필 사진 요청
export const getMyImg = async () => {
  try {
    const res = await axios.get('/members/my-page/img', {
      responseType: 'blob',
    });
    let file = new Blob([res.data], { type: 'image/png' });
    const img = window.URL.createObjectURL(file);
    return { img };
  } catch (e) {
    console.log(e);
  }
};

// 중복 닉네임 체크
export const getCheckNick = async (nick, prenick) => {
  try {
    const response = await axios.get(`/api/nickname/${nick}`, {
      validateStatus: (status) => status < 500,
    });
    // console.log(response.status);
    // console.log(response.data);
    if (nick === prenick && response.status === 409) {
      const setmessage = '현재 사용자가 설정한 닉네임 입니다.';
      return setmessage;
    }
    return response.data.message;
  } catch (error) {
    console.dir(error);
  }
};

// 회원 개인정보 수정 "페이지"
export const getEditPage = async () => {
  try {
    const response = await axios.get('/members/profile/edit');
    let infoBirthday = '';
    // birthday format
    if (
      response.data.result.info.birthday !== null &&
      response.data.result.info.birthday.length === 6
    ) {
      const birthdays = response.data.result.info.birthday;
      let yy = birthdays.slice(0, 2);
      if (yy < 22) {
        yy = '20' + yy;
      } else {
        yy = '19' + yy;
      }
      // console.log(yy);
      infoBirthday =
        yy + '-' + birthdays.slice(2, 4) + '-' + birthdays.slice(4, 6);
      // console.log(infoBirthday);
    } else {
      infoBirthday = response.data.result.info.birthday;
    }
    return {
      nickname: response.data.result.profile.nickName,
      bio: response.data.result.profile.bio,
      birthday: infoBirthday,
      email: response.data.result.info.email,
      gender: response.data.result.info.gender,
    };
  } catch (e) {
    console.log(e);
  }
};

// 비밀번호 수정
export const postPass = async (pass) => {
  try {
    const response = await axios.post('/members/profile/password', pass, {
      validateStatus: (status) => status < 401,
    });
    if (response.status === 400) {
      return alert('잘못된 비밀번호 입니다. 다시 변경해주세요.');
    } else if (response.status === 201) {
      return alert('성공적으로 변경되었습니다.');
    }
    return response;
  } catch (e) {
    console.log(e);
  }
};
