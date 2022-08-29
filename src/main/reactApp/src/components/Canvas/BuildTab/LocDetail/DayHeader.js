import oc from 'open-color';
import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useStore } from 'lib/zustand/planStore';
import Time from 'lib/Icons/Time';

const Container = styled.div`
  /* position: fixed; */
  /* width: 270px; */
  width: 100%;
  display: flex;
  margin-bottom: 15px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  /* background-color: ${oc.teal[6]}; */
  /* color: white; */
  font-size: 20px;
  border-radius: 7px 7px 0px 0px;
`;

const DayNum = styled.div`
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
`;

const DateDiv = styled.div`
  margin-left: 9px;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #7e7e7e;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
`;

const StartT = styled.div`
  margin-left: 5px;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
`;

const Span = styled.span`
  font-weight: 600;
`;

const DayHeader = ({ index, firLoc, check }) => {
  const { userPlan } = useStore();
  const [dates, setDates] = useState('');

  const addDays = useCallback((date, days) => {
    // day 추가
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    const pD =
      result.getFullYear() +
      '.' +
      (result.getMonth() + 1).toString().padStart(2, '0') +
      '.' +
      result.getDate().toString().padStart(2, '0');
    setDates(pD);
  }, []);

  useEffect(() => {
    let dayCnt = index;
    if (userPlan.depart !== '') addDays(userPlan.depart, dayCnt);
  }, [addDays, index, userPlan.depart, firLoc]);

  return (
    <Container>
      <DayNum>{index + 1}일차</DayNum>
      <DateDiv>{dates}</DateDiv>
      <Div>
        <Time
          flag={firLoc === undefined || check}
          title="출발 시간 설정"
          index={0}
          day={index}
        />
        {!firLoc ||
          (!firLoc.movingData.startTime && (
            <StartT>출발시간을 입력해주세요</StartT>
          ))}
        {firLoc && firLoc.movingData.startTime && (
          <StartT>
            출발 시간 <Span>{firLoc.movingData.startTime}</Span>
          </StartT>
        )}
      </Div>
    </Container>
  );
};

export default DayHeader;
