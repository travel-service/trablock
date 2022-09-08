import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PageTemplate from 'components/common/PageTemplate';
import palette from 'lib/styles/palette';

const Contents = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 100px;
`;

const Img = styled.img`
  width: 200px;
`;

const Text = styled.div`
  margin: 20px;
  font-size: 25px;
  font-weight: 600;
`;

const StyleLink = styled(Link)`
  font-size: 20px;
  font-weight: 600;
  text-decoration: none;
  color: white;
  padding: 12px;
  border-radius: 5px;
  background: ${palette.red2};
`;

const NotFoundPage = () => {
  return (
    <PageTemplate>
      <Contents>
        <Img
          src={process.env.PUBLIC_URL + '/images/face1.png'}
          alt="faceImage"
        />
        <Text>아직 준비되지 않은 서비스입니다. 조금만 기다려주세요 !</Text>
        <StyleLink to="/">홈으로 돌아가기</StyleLink>
      </Contents>
    </PageTemplate>
  );
};

export default NotFoundPage;
