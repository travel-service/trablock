import { green } from '@mui/material/colors';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useStore } from 'lib/zustand/myStore';

const PassForm = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  width: 600px;
  height: 500px;
  background: #ffffff;
  border-radius: 10px;
  margin: 25px 10px 25px 10px;
  padding: 50px;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  text-align: left;
  color: #000000;
  margin: 10px 0px;
  .big {
    font-weight: 700;
    font-size: 25px;
    line-height: 30px;
    text-align: left;
    margin: 30px 0px;
  }
  .buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
  }
`;

const ChangeInput = styled.input`
  font-family: inherit;
  width: 100%;
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

const PassEdit = styled.button`
  background: #f16b6c;
  border: #f16b6c;
  border-radius: 10px;
  margin: 10px 5px 5px 10px;
  padding: 5px;
  font-weight: 600;
  color: #fff;
  width: 212.1px;
  height: 50px;
  &:hover {
    background: rgba(241, 107, 108, 0.5);
  }
  &:active {
    background: rgb(241, 107, 108);
  }
`;

const UserPassForm = () => {
  const { postPasswd } = useStore();
  // input 입력값 inputfield state값 변경되게
  const [inputfield, setInput] = useState({
    prepass: '',
    newpass: '',
    newcheckpass: '',
  });
  const onChangeInput = (e) => {
    setInput({
      ...inputfield,
      [e.target.name]: e.target.value,
    });
  };

  const onEdit = () => {
    if (inputfield.newpass !== inputfield.newcheckpass) {
      alert('새 비밀번호 확인이 새 비밀번호와 다릅니다.');
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/g.test(
        inputfield.newpass,
      )
    ) {
      alert(
        '영문, 숫자, 특수문자를 포함한 8자 이상의 비밀번호를 입력해주세요.',
      );
    } else {
      const pass = {
        originPwd: inputfield.prepass,
        newPwd: inputfield.newpass,
      };
      console.log(pass);
      postPasswd(pass);
    }
  };

  return (
    <>
      <Title>
        <div className="big">비밀번호 변경</div>
      </Title>
      <Title>
        영문, 숫자, 특수문자를 포함한 8자 이상의 비밀번호를 입력해주세요.
      </Title>
      <Title>현재 비밀번호</Title>
      <ChangeInput
        type="password"
        id="prepass"
        name="prepass"
        onChange={onChangeInput}
      ></ChangeInput>
      <Title>새 비밀번호</Title>
      <ChangeInput
        type="password"
        id="newpass"
        name="newpass"
        onChange={onChangeInput}
      ></ChangeInput>
      <Title>새 비밀번호 확인</Title>
      <ChangeInput
        type="password"
        id="newcheckpass"
        name="newcheckpass"
        onChange={onChangeInput}
      ></ChangeInput>
      <Title>
        <div className="buttons">
          <PassEdit onClick={onEdit}>비밀번호 변경</PassEdit>
        </div>
      </Title>
    </>
  );
};

const MyPasswd = () => {
  return (
    <>
      <PassForm>
        <UserPassForm />
      </PassForm>
    </>
  );
};

export default MyPasswd;
