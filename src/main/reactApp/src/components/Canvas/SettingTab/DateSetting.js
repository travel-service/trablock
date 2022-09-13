import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { addDays } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

const DateSettingDiv = styled.div`
  margin-top: 25px;
  margin-bottom: 25px;
  width: 600px;
  font-family: 'Pretendard';
  font-style: normal;
`;
const TitleSpan = styled.span`
  font-weight: 600;
  font-size: 15px;
  width: 100px;
  height: 20px;
`;
const TooltipButton = styled.button`
  margin-left: 10px;
  background: none;
  height: 12px;
  width: 12px;
  border: none;
  cursor: pointer;
`;
const StyledDp = styled(DatePicker)`
  border: none;
  border-radius: 5px;
  padding: 15px;
  width: 200px;
  height: 46px;
  font-weight: 400;
  font-size: 13px;
  background: #ededef url('../images/calendar_ico.png') no-repeat 93% 50%/15px
    auto;
  :focus {
    outline: none;
  }
`;
const PeriodD = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 46px;
  background: #ffffff;
  border: 1px solid #fc6b6b;
  border-radius: 30px;
  padding: 15px;
  font-weight: 400;
  font-size: 13px;
  color: #f75d5d;
`;
const Datediv = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 10px;
  flex-flow: row wrap;
  align-items: center;
  width: 600px;
  font-weight: 400;
  font-size: 13px;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const DateSetting = ({ userPlan, setDepart, setPeriods, Question }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    //depart가 있으면
    if (!isNaN(Date.parse(userPlan.depart))) {
      setStartDate(new Date(userPlan.depart));
      if (userPlan.periods === 1) {
        setEndDate(new Date(userPlan.depart));
      } else {
        setEndDate(addDays(new Date(userPlan.depart), userPlan.periods - 1));
        setPeriods(userPlan.periods);
      }
    }
    // depart 변경시에만 작동 ? 0912 찬우
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPlan.depart]);

  const onChangeStartDate = (date) => {
    setStartDate(date);
    setDepart(date);
    let diff = 0;
    let pPeriods = 1;
    if (endDate.getTime() > date.getTime()) {
      diff = endDate.getTime() - date.getTime();
      pPeriods = Math.ceil(diff / 1000 / 60 / 60 / 24) + 1;
    }
    setPeriods(pPeriods);
  };

  const onChangeEndDate = (date) => {
    setEndDate(date);
    const diff = date.getTime() - startDate.getTime();
    const pPeriods = Math.ceil(diff / 1000 / 60 / 60 / 24) + 1;
    setPeriods(pPeriods);
  };

  return (
    <DateSettingDiv>
      <TitleSpan>1. 여행 일자 설정 </TitleSpan>
      <TooltipButton data-tip data-for="datesetting">
        <Question size="14" />
      </TooltipButton>
      <ReactTooltip id="datesetting" place="right" type="info" effect="solid">
        <div>
          출발 블록을 생성하기 위해 입력해주세요.
          <br />
          기간은 최대 30일 입니다.
        </div>
      </ReactTooltip>
      <Datediv>
        <span>
          <StyledDp
            dateFormat="yyyy/MM/dd"
            showPopperArrow={false}
            selected={startDate}
            onChange={(date) => onChangeStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={addDays(endDate, -30)}
            onKeyDown={(e) => {
              e.preventDefault();
            }}
          />
        </span>
        <span>~</span>
        <span>
          <StyledDp
            dateFormat="yyyy/MM/dd"
            showPopperArrow={false}
            selected={endDate}
            onChange={(date) => onChangeEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            maxDate={addDays(startDate, 30)}
            onKeyDown={(e) => {
              e.preventDefault();
            }}
          />
        </span>
        <PeriodD>
          {userPlan.periods - 1}박 {userPlan.periods}일
        </PeriodD>
      </Datediv>
    </DateSettingDiv>
  );
};
