import React from 'react';
import styled from 'styled-components';
import HeaderContainer from 'containers/common/HeaderContainer';

const NoticeTemplateBlock = styled.div`
  height: 100%;
  flex-direction: row;
  background-color: #ffd0c0;
`;

const NoticeTemplate = ({ children }) => {
  return (
    <NoticeTemplateBlock>
      <HeaderContainer type="landing" />
      {children}
    </NoticeTemplateBlock>
  );
};

export default NoticeTemplate;
