import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.div`
  a,
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: black;
    font-size: 20px;
    font-weight: bold;
  }
  .MainCategory {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin: 0px;
    padding: 10px;
    justify-content: space-between;
    li {
      display: inline-block;
      list-style: none;
      margin-left: 40px;
    }
    box-sizing: border-box;
    background: #f16b6c;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
  }
  .SubCategory {
    margin: 0px;
    padding: 10px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    li {
      display: inline-block;
      list-style: none;
      margin-left: 40px;
    }
    list-style: none;
    box-sizing: border-box;
    //border-bottom: 1.5px solid rgba(241, 107, 108, 0.2);
  }
`;

const MyHeader = () => {
  const location = useLocation();

  return (
    <>
      <Nav>
        <ul className="MainCategory">
          <li>
            <Link to={process.env.PUBLIC_URL + '/mypage/MyInfo'}>내정보</Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + '/canvas/directory'}>
              여행보관함
            </Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + '/mypage/MySetting'}>설정</Link>
          </li>
        </ul>
      </Nav>
      <Nav>
        {location.pathname === '/mypage/MyInfo' ? (
          <ul className="SubCategory">
            <li>
              <Link to={process.env.PUBLIC_URL + '/mypage/MyInfo'}>
                모두보기
              </Link>
            </li>
            <li>스크랩북</li>
            <li>좋아요</li>
            <li>질문과 답변</li>
          </ul>
        ) : location.pathname === '/mypage/MySetting' ||
          location.pathname === '/mypage/MySetting/MyPasswd' ? (
          <ul className="SubCategory">
            <li>
              <Link to={process.env.PUBLIC_URL + '/mypage/MySetting'}>
                회원정보 수정
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + '/mypage/MySetting/MyPasswd'}>
                비밀번호 변경
              </Link>
            </li>
          </ul>
        ) : null}
      </Nav>
    </>
  );
};

export default MyHeader;
