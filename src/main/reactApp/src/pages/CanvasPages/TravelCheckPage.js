import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import CanvasForm from 'components/Canvas/common/CanvasForm';
import { useParams } from 'react-router-dom';
import TravelCheckForm from 'containers/Canvas/TravelCheckForm';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  height: 100%;
  width: 100%;
  max-height: 1300px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 35px;

  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    padding-bottom: 0px;
  }
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 10px;
  margin-left: 30px;
  margin-right: 30px;
  padding: 25px;
  max-height: 900px;

  @media screen and (max-width: 767px) {
    padding: 20px;
    margin-left: 20px;
    margin-right: 20px;
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 25px;
  line-height: 30px;
  margin-bottom: 25px;
  text-align: center;

  @media screen and (max-width: 767px) {
    margin-top: 0px;
    font-weight: 600;
    font-size: 15px;
  }
`;

const TravelCheckPage = () => {
  const { planId } = useParams();

  return (
    <PageTemplate>
      {/* canvas 단에서 보여지는 여행 확인 페이지 */}
      {!planId && <CanvasForm type="check" />}

      {/* 마이페이지, 여행보관함에서 오는 여행 확인 페이지 */}
      {planId && (
        <Container>
          <Main>
            <Title>여행 확인</Title>
            <TravelCheckForm />
          </Main>
        </Container>
      )}
    </PageTemplate>
  );
};

export default TravelCheckPage;
