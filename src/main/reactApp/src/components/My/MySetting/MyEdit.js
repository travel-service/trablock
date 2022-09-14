import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useStore } from 'lib/zustand/myStore';

const UserForm = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  width: 800px;
  height: 700px;
  background: #ffffff;
  border-radius: 10px;
  margin: 25px 10px 25px 10px;
`;

const EditImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 35px;
  .profile-img {
    position: relative;
    width: 150px;
    height: 150px;
    border-radius: 100%;
    border: 1px solid rgba(0, 0, 0, 0.2);
    overflow: hidden;
  }
  .profile-user-img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.6) 100%
    );
  }
  .editStyle {
    position: absolute;
    display: block;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.6) 100%
    );
    width: 100%;
    height: 100%;
    .editB {
      position: absolute;
      text-align: center;
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      color: #ffffff;
      text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.3);
      width: 100%;
      top: 75%;
    }
    input[type='file'] {
      /* 파일 필드 숨기기 */
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }
  }
`;

const ChangeInput = styled.input`
  font-family: inherit;
  width: 50%;
  border: 1px solid #e5e7e8;
  border-radius: 10px;
  outline: 0;
  font-size: 1rem;
  font-weight: 500;
  color: rgba(0, 0, 0);
  padding: 10px;
  background: transparent;
  transition: border-color 0.2s;
  text-align: left;
`;

const DupCheck = styled.div`
  font-weight: 500;
  font-size: 11px;
  line-height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  .color {
    color: #0085ff;
  }
`;

const Field = styled.div`
  margin: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  .title {
    float: left;
    margin: 0px 10px 0px 0px;
    font-weight: bold;
    font-size: 15px;
    line-height: 18px;
    text-align: left;
    .plus {
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;

      color: #f16b6c;
    }
  }
`;

const ProfileEdit = styled.button`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  background: #f16b6c;
  border: #f16b6c;
  border-radius: 10px;
  margin: 10px;
  padding: 5px;
  font-weight: 600;
  color: #fff;
  width: 156.51px;
  height: 44px;
  &:hover {
    background: rgba(241, 107, 108, 0.5);
  }
  &:active {
    background: rgb(241, 107, 108);
  }
`;

const UserEditForm = () => {
  const {
    getEditP,
    profile,
    info,
    checkgetNick,
    sendnick,
    checknick,
    setNick,
    setBio,
    setBirthday,
    setGender,
    postInfo,
    postImg,
  } = useStore();
  useEffect(() => {
    getEditP();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // console.log(profile, info);
  }, [profile, info]);

  useEffect(() => {
    setSelect(info.gender);
  }, [info.gender]);

  // 프로필 사진 미리보기
  const [image, setImage] = useState('');
  const preview = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImage(reader.result);
        resolve();
      };
    });
  };

  const [form, setForm] = useState({ form_file: '' });
  const onChangeImg = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const file = e.target.files[0];
      if (file !== undefined) {
        preview(file);
        setForm({ form_file: e.target.files[0] });
      }
    }
  };

  // input 입력값 inputfield state값 변경되게
  const [inputfield, setInput] = useState({
    nickname: profile.nickname,
    bio: profile.bio,
    birthday: info.birthday,
  });
  const [val, setVal] = useState('');
  const onChangeInput = (e) => {
    setInput({
      ...inputfield,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === 'nickname') {
      sendnick.nickname = e.target.value;
      if (e.target.value === '') {
        sendnick.nickname = profile.nickname;
      }
      checkgetNick();
    }
    if (e.target.name === 'birthday') {
      // const result = e.target.value.replace(/\d{4}-\d{2}-\d{2}/g, '');
      const result = e.target.value
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, '$1-$2-$3')
        // eslint-disable-next-line no-useless-escape
        .replace(/(\-{1,2})$/g, '');
      setVal(result);
    }
  };

  // radiobutton 값 변경
  const [select, setSelect] = useState(info.gender);
  const onSelectChange = (e) => {
    const value = e.target.value;
    setSelect(value);
  };

  // 정보 변경
  const onEdit = () => {
    // if (/\d{4}-\d{2}-\d{2}/g.test(inputfield.birthday)) {
    //   setBirthday(inputfield.birthday);
    //   // console.log('생일 확인');
    // } else if (inputfield.birthday === '') {
    //   // console.log('생일 입력 안한 사람들');
    // } else {
    //   alert('생일 입력 형식을 다시 확인하세요.');
    // }
    // if (select !== null) {
    //   setGender(select);
    //   // console.log('성별 확인');
    // }

    // 1-중복닉네임 확인 (2-생일 입력 포맷 확인 3-성별확인 4-이미지확인 5-한줄소개 확인) -> Post
    if (
      checknick.message === '현재 사용자가 설정한 닉네임 입니다.' ||
      checknick.message === '사용 가능한 닉네임 입니다' ||
      checknick.message === ''
    ) {
      if (
        /\d{4}-\d{2}-\d{2}/g.test(inputfield.birthday) ||
        inputfield.birthday === ''
      ) {
        setBirthday(inputfield.birthday);
        // console.log('생일 확인');
        if (select !== null) {
          setGender(select);
          // console.log('성별 확인');
        }
        if (inputfield.bio !== null) {
          setBio(inputfield.bio);
        }
        if (image !== '') {
          const formData = new FormData();
          formData.append('file', form.form_file);
          postImg(formData);
        }
      } else {
        alert('생일 입력 형식을 다시 확인하세요.');
      }
      postInfo();
      alert('회원정보가 변경되었습니다.');
      setNick(inputfield.nickname);
    } else if (checknick.message === '이미 존재하는 닉네임 입니다.') {
      alert('이미 존재하는 닉네임 입니다.');
    }
  };

  return (
    <>
      <EditImg>
        <div className="profile-img">
          {image && (
            <img src={image} alt="preview" className="profile-user-img" />
          )}
          {image === '' && (
            <img
              src={profile.img}
              alt="profileImg"
              className="profile-user-img"
            />
          )}
          <div className="editStyle">
            <div className="editB">
              <label>
                <input
                  type="file"
                  id="profile-upload"
                  accept="image/*"
                  placeholder="수정"
                  onChange={onChangeImg}
                />
                수정
              </label>
            </div>
          </div>
        </div>
      </EditImg>
      <Field>
        <div className="title">
          닉네임
          <div className="plus">* 필수항목</div>
        </div>
        <ChangeInput
          type="text"
          id="nickname"
          name="nickname"
          placeholder={profile.nickname}
          onChange={onChangeInput}
        ></ChangeInput>
      </Field>
      {checknick.message !== '' && <DupCheck>*{checknick.message}</DupCheck>}
      <Field>
        <div className="title">한줄소개</div>
        <ChangeInput
          type="text"
          id="bio"
          name="bio"
          placeholder={profile.bio}
          onChange={onChangeInput}
        ></ChangeInput>
      </Field>
      <Field>
        <div className="title">
          아이디
          <div className="plus">* 이메일</div>
        </div>
        <div style={{ width: '50%', padding: '10px' }}>{info.email}</div>
      </Field>
      <Field>
        <div className="title">생년월일</div>
        {info.birthday === null ||
          (info.birthday === '' && (
            <ChangeInput
              type="text"
              id="birthday"
              name="birthday"
              placeholder="YYYY-MM-DD"
              maxLength="10"
              value={val}
              onChange={onChangeInput}
            ></ChangeInput>
          ))}
        {info.birthday && (
          <ChangeInput
            type="text"
            id="birthday"
            name="birthday"
            placeholder={info.birthday}
            maxLength="10"
            value={val}
            onChange={onChangeInput}
          ></ChangeInput>
        )}
      </Field>
      <Field>
        <div className="title">성별</div>
        <label>
          <input
            type="radio"
            value="FEMALE"
            onChange={onSelectChange}
            checked={info.gender === 'FEMALE'}
          ></input>
          여성
        </label>
        <label>
          <input
            type="radio"
            value="MALE"
            checked={info.gender === 'MALE'}
            onChange={onSelectChange}
          ></input>
          남성
        </label>
      </Field>
      <EditImg>
        <ProfileEdit onClick={onEdit}>정보 변경</ProfileEdit>
      </EditImg>
    </>
  );
};

const MyEdit = () => {
  return (
    <>
      <UserForm>
        <UserEditForm />
      </UserForm>
    </>
  );
};

export default MyEdit;
