import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Profile from '../img/profile2.jpg';
import { FaRegBookmark, FaRegHeart, FaPen } from 'react-icons/fa';
import { HiOutlineFolderOpen } from 'react-icons/hi';
import { useStore } from 'lib/zustand/myStore';

const MyInfoBox = styled.div`
  display: flex;
  // float: left;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 308px;
  height: 487px;
  // height: 100%;
  // width: 20%;
  margin: 25px 10px 25px 10px;
  // border: 1.5px solid rgba(241, 107, 108, 0.2);
  border-radius: 10px;
  background-color: #fff;
  hr {
    border: 1px solid #e5e7e8;
  }
`;

const MyInfoProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .profile-img {
    width: 150px;
    height: 150px;
    border-radius: 100%;
    border: 1px solid rgba(0, 0, 0, 0.2);
    overflow: hidden;
  }
  .profile-user-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MyInfoMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.4);
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  margin: 1px;
`;

const MyInfoName = styled.div`
  padding: 10px;
  font-size: 29px;
  font-weight: bold;
`;

const ProfileEdit = styled.button`
  border: 1px solid #e5e7e8;
  border-radius: 10px;
  margin: 10px 5px 5px 10px;
  padding: 5px;
  font-weight: 600;
  /* 색상 */
  background: #fff;
  &:hover {
    background: rgba(241, 107, 108, 0.2);
  }
  &:active {
    background: rgb(241, 107, 108);
  }
`;

const Buttons = styled.div`
  display: flex;
`;

const Menu = styled.div`
  margin-left: 10px;
  padding: 10px;
  column-count: 3;
  column-gap: 30px;
  column-width: 2px;
  text-align: center;
  a,
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: black;
  }
`;

const ChangeInput = styled.input`
  font-family: inherit;
  width: 50%;
  border: 0;
  border-bottom: 1px solid rgba(241, 107, 108, 0.2);
  outline: 0;
  font-size: 1rem;
  font-weight: 500;
  color: rgba(0, 0, 0);
  padding: 5px 0;
  background: transparent;
  transition: border-color 0.2s;
  text-align: center;
`;

const DupCheck = styled.div`
  font-weight: 500;
  font-size: 11px;
  line-height: 16px;
  .color {
    color: #0085ff;
  }
`;

const EditImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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

const UserInfoBox = () => {
  const [visible, setVisible] = useState(true);
  const {
    getBasic,
    profile,
    setNick,
    setBio,
    postNick,
    postBio,
    checkgetNick,
    checknick,
    sendnick,
    setImg,
    postImg,
  } = useStore();

  useEffect(() => {
    getBasic();
  }, []);

  useEffect(() => {
    console.log(profile);
  }, [profile]);

  // Test function
  const onEdit = () => {
    setVisible(!visible);
    if (visible) {
      console.log('edit click');
      setImage('');
    } else {
      console.log('처리중');
      PostEdit();
      setImage('');
    }
  };

  const cancel = () => {
    setVisible(true);
    setImage('');
    // setNick(profile.nickname);
    // setBio(profile.bio);
  };

  const PostEdit = () => {
    // 1-닉네임, 사진 변경, 2-한줄소개, 사진 변경 3-한줄소개 변경
    if (checknick.message === '사용 가능한 닉네임 입니다') {
      if (image !== '') {
        const formData = new FormData();
        formData.append('file', form.form_file);
        postImg(formData);
      }
      setNick(inputfield.nickname);
      setBio(inputfield.bio);
      postNick();
      postBio();
      alert('성공적으로 변경 됐습니다.');
    } else if (checknick.message === '현재 사용자가 설정한 닉네임 입니다.') {
      if (image !== '') {
        const formData = new FormData();
        formData.append('file', form.form_file);
        postImg(formData);
      }
      setBio(inputfield.bio);
      postBio();
      alert('성공적으로 변경 됐습니다.');
    } else {
      alert('이미 존재하는 닉네임 입니다.');
    }
  };

  // input 입력값 inputfield state값 변경되게
  const [inputfield, setInput] = useState({
    nickname: profile.nickname,
    bio: '',
  });
  const onChangeInput = (e) => {
    setInput({
      ...inputfield,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === 'nickname') {
      sendnick.nickname = inputfield.nickname;
      checkgetNick();
    }
  };

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
      console.log(file);
      preview(file);
      setForm({ form_file: e.target.files[0] });
    }
  };

  return (
    <>
      {visible && (
        <>
          <MyInfoProfile>
            <div className="profile-img">
              <img
                src={profile.img}
                alt="profileImg"
                className="profile-user-img"
              />
            </div>
          </MyInfoProfile>
          <MyInfoName>{profile.nickname}</MyInfoName>
          <MyInfoMessage>{profile.bio}</MyInfoMessage>
          {/** 프로필 수정 */}
          <ProfileEdit onClick={onEdit}>
            <div>
              프로필 수정 &nbsp;
              <FaPen />
            </div>
          </ProfileEdit>
        </>
      )}
      {!visible && (
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
          {/** 프로필 수정 */}
          <ChangeInput
            type="text"
            id="nickname"
            name="nickname"
            placeholder={profile.nickname}
            onChange={onChangeInput}
          ></ChangeInput>
          <DupCheck>*{checknick.message}</DupCheck>
          <ChangeInput
            type="text"
            id="bio"
            name="bio"
            onChange={onChangeInput}
          ></ChangeInput>
          <Buttons>
            <ProfileEdit onClick={cancel}>
              <div>취소</div>
            </ProfileEdit>
            <ProfileEdit onClick={onEdit}>
              <div>완료</div>
            </ProfileEdit>
          </Buttons>
        </>
      )}
    </>
  );
};

const MyInfo = () => {
  return (
    <MyInfoBox>
      <UserInfoBox />
      <hr style={{ border: '1px solid #E5E7E8' }} width="80%" />
      <Menu>
        {/** page별 url로 변경해야함 */}
        <div>
          <Link to={process.env.PUBLIC_URL + '/mypage/MyInfo'}>
            <FaRegBookmark size="24px" />
            <div>스크랩북</div>
            <div>0</div>
          </Link>
        </div>
        <div>
          <Link to={process.env.PUBLIC_URL + '/mypage/MyInfo'}>
            <FaRegHeart size="24px" />
            <div>좋아요</div>
            <div>0</div>
          </Link>
        </div>
        <div>
          <Link to={process.env.PUBLIC_URL + '/canvas/directory'}>
            <HiOutlineFolderOpen size="24px" />
            <div>내 플랜</div>
            <div>1</div>
          </Link>
        </div>
      </Menu>
    </MyInfoBox>
  );
};

export default MyInfo;
