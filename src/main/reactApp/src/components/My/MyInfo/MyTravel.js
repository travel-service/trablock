import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PlanLayout from 'components/Canvas/common/PlanLayout/PlanLayout.js';
import { useStore } from 'lib/zustand/myStore';

const Main = styled.div`
  margin: 25px 10px 25px 10px;
  padding: 25px;
  background: #ffffff;
  border-radius: 10px;
`;
const Displaybox = styled.div`
  display: flex;
  justify-content: space-between;
  .title {
    font-size: 21px;
    font-weight: bold;
    text-align: left;
    color: black;
  }
  a,
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: #f16b6c;
  }
  .travelLink {
    font-weight: 700;
    font-size: 13px;
    line-height: 16px;
    text-align: right;

    color: #f16b6c;
  }
`;
const Box = styled.div`
  margin: 25px 25px 15px 0px;
  .travelbox {
    display: grid;
    grid-template-rows: repeat(1, 180px);
    grid-template-columns: repeat(4, 180px);
    border-radius: 10px;
    justify-content: space-evenly;
  }
  .travelitem {
    border-radius: 10px;
    width: 170px;
    height: 170px;
    margin: 10px 0px 10px 0px;
    background: rgba(255, 241, 169, 0.5);
  }
`;
const EddPlan = styled.div`
  margin: 0px 0px 25px 0px;
  border: 1px solid #e5e7e8;
  border-radius: 10px;
  background-color: #fff;
  text-align: center;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  white-space: nowrap;
  a,
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: black;
  }
  .text {
    padding: 20px 0px;
  }
`;
const EddScrap = styled.div`
  margin: 25px 0px 35px 0px;
  border: 2px dashed #e8eaeb;
  border-radius: 10px;
  background-color: #fff;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  white-space: nowrap;
  a,
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: black;
  }
  .text {
    padding: 90px 0px;
  }
`;

const MyTravel = () => {
  const { getMainPlans, mainPlans, planCount } = useStore();
  const [plansList, setPlan] = useState([]);
  useEffect(() => {
    getMainPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPlan(mainPlans.mainDirectory);
    RecentPlan(plansList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainPlans.mainDirectory]);

  const RecentPlan = () => {
    if (plansList > 0 && parseInt(planCount) > 5) {
      setPlan(plansList.slice(0, 4));
    } else if (plansList > 0 && parseInt(planCount) < 4) {
      setPlan(plansList.slice(0, parseInt(planCount)));
    }
  };

  // console.log(plansList);

  const Plan = () => {
    return (
      <>
        {plansList > 0 &&
          plansList.map((item) => {
            return (
              <PlanLayout
                myP={true}
                planId={item.planId}
                name={item.name}
                periods={item.periods}
                createdDate={item.createdDate}
                thumbnail={item.thumbnail}
              />
            );
          })}
        {plansList === 0 && (
          <>
            <Box>
              <div className="travelbox">
                <div className="travelitem"></div>
                <div className="travelitem"></div>
                <div className="travelitem"></div>
                <div className="travelitem"></div>
              </div>
            </Box>
          </>
        )}
      </>
    );
  };

  return (
    <Main>
      <Displaybox>
        <div className="title">최근 플랜</div>
        <div className="travelLink">
          <Link to={process.env.PUBLIC_URL + '/canvas/directory'}>
            전체 보기
          </Link>
        </div>
      </Displaybox>
      <Plan />
      <EddPlan>
        <Link to={process.env.PUBLIC_URL + '/canvas/setting'}>
          <div className="text">+ 플랜 짜러 가기</div>
        </Link>
      </EddPlan>
      <Displaybox>
        <div className="title">스크랩한 플랜</div>
      </Displaybox>
      <EddScrap>
        <Link to={process.env.PUBLIC_URL + '/mypage/scrap'}>
          <div className="text">+ 첫번째 스크랩을 해보세요.</div>
        </Link>
      </EddScrap>
    </Main>
  );
};

export default MyTravel;
