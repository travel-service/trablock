import React from 'react';
import styled from 'styled-components';
import HeaderContainer from 'containers/common/HeaderContainer';
import MyHeader from './MyHeader';

// 내정보 여행보관함 설정 메뉴바
const MyTemplateBlock = styled.div``;

const MyBox = styled.div`
  display: flex;
  justify-content: center;
  /* align-items: center; */
  background-color: #f6f6f8;
`;

const MyTemplate = ({ children }) => {
  return (
    <MyTemplateBlock>
      <HeaderContainer />
      <MyHeader />
      <MyBox>{children}</MyBox>
    </MyTemplateBlock>
  );
};

export default MyTemplate;
