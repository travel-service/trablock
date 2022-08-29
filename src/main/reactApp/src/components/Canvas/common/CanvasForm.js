import React, { useMemo } from 'react';
import styled from 'styled-components';
import ProcessBar from './ProcessBar';
import Block from 'containers/Canvas/Block';
import TravelSettingForm from 'containers/Canvas/TravelSettingForm';
import PlanDays from '../BuildTab/Dnd/PlanDays';
import CanvasButtons from './CanvasButtons';
import SelLocBasket from '../BuildTab/Dnd/SelLocBasket';
import TravelCheckForm from 'containers/Canvas/TravelCheckForm';

const Container = styled.div`
  flex: 1;
  height: 100%;
  width: 100%;
  min-height: 800px; // 이렇게 하면 될지?
  max-height: 1300px; // 이렇게 하면 될지?
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 35px;

  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    padding-bottom: 0px;
    height: 100%;
  }
`;

const Canvas = styled.div`
  display: flex;
  flex: 1;
  height: 100%;

  @media screen and (max-width: 767px) {
    display: block;
    padding-right: 0;
    flex-direction: column;
    height: 100%;
    width: 100%;
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
  max-height: 900px; // 이렇게 하면 될지?

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

  @media screen and (max-width: 767px) {
    margin-top: 0px;
    font-weight: 600;
    font-size: 15px;
  }
`;

const Contents = styled.div`
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CanvasForm = ({ type, data }) => {
  const siteMap = useMemo(() => {
    return {
      setting: '여행 설정',
      select: '블록 선택',
      build: '여행 캔버스',
      check: '여행 확인하기',
    };
  }, []);

  return (
    <Container>
      {/* 프로세스 바 */}
      <ProcessBar type={type} siteMap={siteMap} />

      {/* 캔버스 */}
      <Canvas>
        {/* 사이드 메뉴 */}
        {type === 'build' && <SelLocBasket idx={2} data={data} />}

        {/* 메인 컨텐츠 */}
        <Main>
          <Title>{siteMap[type]}</Title>
          <Contents>
            {type === 'setting' && <TravelSettingForm />}
            {type === 'select' && <Block idx={1} />}
            {type === 'build' && <PlanDays data={data} />}
            {type === 'check' && <TravelCheckForm />}
          </Contents>
          <CanvasButtons siteMap={siteMap} />
        </Main>
      </Canvas>
    </Container>
  );
};

export default CanvasForm;
