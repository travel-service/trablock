import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import palette from 'lib/styles/palette';
import Button from 'components/common/Button';
import { MdAccountCircle, MdLock } from 'react-icons/md';

const AuthFormBlock = styled.div`
  width: 100%;
`;

const H2 = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0;
`;

const Form = styled.form`
  margin: auto;
  width: 80%;
`;

const LoginInputContainer = styled.div`
  width: 100%;
  border: 2px solid ${palette.back2};
  border-radius: 10px;
  height: 120px;
  display: grid;
  div:last-child {
    border-top: 2px solid ${palette.back2};
  }
`;

const SpanRed = styled.span`
  display: flex;
  text-align: center;
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;
  color: blue;
  margin-top: 5px;
  ${(props) =>
    props.detail &&
    css`
      color: red;
    `}
`;

const StyledDiv = styled.div`
  position: relative;
  margin-bottom: 18px;
  width: 100%;
`;

const InputHeader = styled.div`
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  margin-bottom: 20px;
`;

const InputDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
`;

const CheckButton = styled.input`
  height: 35px;
  margin-left: 10px;
  width: 90px;
  border-radius: 10px;
  background: ${palette.red1};
  border: none;
  color: white;
  font-weight: 550;
  font-size: 15px;
  cursor: pointer;
`;

const StyledInput = styled.input`
  padding-left: 20px;
  font-size: 15px;
  border: 1px solid ${palette.gray[5]};
  border-radius: 8px;
  outline: none;
  flex: 1;
  height: 35px;
  float: right;

  ::placeholder {
    color: #c4c4c4;
  }

  &:focus {
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
  @media screen and (max-width: 767px) {
    padding-left: 10px;
    font-size: 0.9rem;
  }
`;

const Select = styled.select`
  width: 100%;
  padding-left: 30px;
  font-size: 1rem;
  border: 1px solid ${palette.gray[5]};
  border-radius: 8px;
  outline: none;
  height: 35px;
  &:focus {
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
  @media screen and (max-width: 767px) {
    height: 40px;
  }
`;

const Footer = styled.div`
  margin-top: 20px;
  a {
    color: black;
    text-decoration: none;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    &:hover {
      color: ${palette.gray[8]};
    }
  }
`;

const Links = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const ButtonWidthMarginTop = styled(Button)`
  margin-top: 20px;
`;

const Input = styled.input`
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  border-radius: 5px;
  padding: 0px 10px;
  font-size: 15px;
  font-weight: 550;
  background: white;
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-transition: background-color 9999s ease-out;
    -webkit-box-shadow: 0 0 0px 1000px white inset !important;
    -webkit-text-fill-color: #fff !important;
  }
`;

const IconStyle = css`
  margin: 0px 20px;
  color: ${palette.back2};
`;

const AccountIcon = styled(MdAccountCircle)`
  ${IconStyle}
`;

const LockIcon = styled(MdLock)`
  ${IconStyle}
`;

const FlexBox = styled.div`
  display: flex;
  gap: 40px;

  ${InputDiv} {
    height: auto;
  }

  ${StyledDiv} {
    flex-grow: 1;
  }

  @media screen and (max-width: 450px) {
    display: block;
  }
`;

const textMap = {
  login: '로그인',
  signup: '회원가입',
};

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  margin: 20px 0px;
`;

const AuthForm = ({
  type,
  form,
  onChange,
  onSubmit,
  error,
  onBlur,
  detailErr,
  checkValue,
}) => {
  const text = textMap[type];

  return (
    <>
      <AuthFormBlock>
        <H2>{text}</H2>
        {/* submit 에러 */}

        {/* 데이터 입력 폼(로그인, 회원가입) */}
        <Form onSubmit={onSubmit}>
          {/* 회원가입 폼 */}
          {type === 'signup' && (
            <>
              <StyledDiv>
                <InputHeader>아이디</InputHeader>
                <InputDiv>
                  <StyledInput
                    autoComplete="username"
                    name="userName"
                    placeholder="아이디 (20자 이내)"
                    onChange={onChange}
                    value={form.userName}
                    onBlur={onBlur}
                    maxLength="20"
                    minLength="4"
                  />
                  <CheckButton
                    type="button"
                    value="중복 확인"
                    name="userName"
                    onClick={(e) => checkValue(e)}
                  />
                </InputDiv>
                {detailErr.userName.message && (
                  <SpanRed detail={detailErr.userName.status === 1}>
                    *{detailErr.userName.message}
                  </SpanRed>
                )}
              </StyledDiv>
              <StyledDiv>
                <InputHeader>비밀번호</InputHeader>
                <InputDiv>
                  <StyledInput
                    autoComplete="new-password"
                    name="password"
                    placeholder="비밀번호 (8자 이상, 20자 이내)"
                    type="password"
                    onChange={onChange}
                    value={form.password}
                    onBlur={onBlur}
                    maxLength="20"
                    minLength="8"
                  />
                </InputDiv>
                <SpanRed>*영문자, 숫자, 특수문자 조합 8자리 이상</SpanRed>
                {detailErr.password && (
                  <SpanRed detail>*{detailErr.password}</SpanRed>
                )}
              </StyledDiv>
              <StyledDiv>
                <InputHeader>비밀번호 확인</InputHeader>
                <InputDiv>
                  <StyledInput
                    autoComplete="new-password"
                    name="passwordCheck"
                    placeholder="비밀번호 (8자 이상, 20자 이내)"
                    type="password"
                    onChange={onChange}
                    value={form.passwordCheck}
                    onBlur={onBlur}
                  />
                </InputDiv>
                {detailErr.passwordCheck && (
                  <SpanRed detail>*{detailErr.passwordCheck}</SpanRed>
                )}
              </StyledDiv>
              <StyledDiv>
                <InputHeader>닉네임</InputHeader>
                <InputDiv>
                  <StyledInput
                    name="nickName"
                    placeholder="닉네임 (8자 이내)"
                    type="text"
                    onChange={onChange}
                    value={form.nickName}
                    onBlur={onBlur}
                    maxLength="8"
                  />
                  <CheckButton
                    type="button"
                    value="중복 확인"
                    name="nickName"
                    onClick={(e) => checkValue(e)}
                  />
                </InputDiv>
                {detailErr.nickName.message && (
                  <SpanRed detail={detailErr.nickName.status === 1}>
                    *{detailErr.nickName.message}
                  </SpanRed>
                )}
              </StyledDiv>
              <FlexBox>
                <StyledDiv>
                  <InputHeader>생년월일 (선택)</InputHeader>
                  <InputDiv>
                    <StyledInput
                      name="birthday"
                      type="text"
                      placeholder="YYYYMMDD"
                      onChange={onChange}
                      value={form.birthday}
                      onBlur={onBlur}
                      maxLength="10"
                      minLength="8"
                    />
                  </InputDiv>
                </StyledDiv>
                <StyledDiv gender>
                  <InputHeader>성별</InputHeader>
                  <InputDiv>
                    <Select name="gender" onChange={onChange}>
                      <option value="">선택</option>
                      <option value="MALE">남자</option>
                      <option value="FEMALE">여자</option>
                    </Select>
                  </InputDiv>
                </StyledDiv>
              </FlexBox>
              <StyledDiv>
                <InputHeader>이메일</InputHeader>
                <InputDiv>
                  <StyledInput
                    name="email"
                    placeholder="ex. test@gmail.com"
                    type="email"
                    onChange={onChange}
                    value={form.email}
                  />
                  <CheckButton
                    type="button"
                    value="중복 확인"
                    name="email"
                    onClick={(e) => checkValue(e)}
                  />
                </InputDiv>
                {detailErr.email.message && (
                  <SpanRed detail={detailErr.email.status === 1}>
                    *{detailErr.email.message}
                  </SpanRed>
                )}
              </StyledDiv>
            </>
          )}

          {/* 로그인 폼 */}
          {type === 'login' && (
            <>
              <LoginInputContainer>
                <InputDiv>
                  <AccountIcon size="35" />
                  <Input
                    autoComplete="username"
                    name="userName"
                    placeholder="아이디를 입력하세요."
                    onChange={onChange}
                    value={form.userName}
                  />
                </InputDiv>
                <InputDiv>
                  <LockIcon size="35" />
                  <Input
                    autoComplete="new-password"
                    name="password"
                    placeholder="비밀번호를 입력하세요."
                    onChange={onChange}
                    value={form.password}
                    type="password"
                  />
                </InputDiv>
              </LoginInputContainer>
            </>
          )}

          {error && <ErrorMessage>{error}</ErrorMessage>}

          {/* 로그인, 회원가입 버튼 */}
          <ButtonWidthMarginTop fullWidth>
            {text === '로그인' ? `${text}` : '회원가입'}
          </ButtonWidthMarginTop>
        </Form>

        {/* 다른 페이지 이동 버튼 */}
        <Footer>
          {type === 'login' ? (
            <Links>
              <Link to={process.env.PUBLIC_URL + '/signup'}>회원가입</Link>
              <Link to={process.env.PUBLIC_URL + '/find'}>
                아이디/비밀번호 찾기
              </Link>
            </Links>
          ) : (
            <Links>
              <Link to={process.env.PUBLIC_URL + '/login'}>로그인</Link>
              <Link to={process.env.PUBLIC_URL + '/find'}>
                아이디/비밀번호 찾기
              </Link>
            </Links>
          )}
        </Footer>
      </AuthFormBlock>
    </>
  );
};

export default AuthForm;
