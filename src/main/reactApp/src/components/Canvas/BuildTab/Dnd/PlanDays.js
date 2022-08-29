import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Mobile } from 'lib/custom/responsive';
import { MdOutlineClose, MdOutlineFolderOpen } from 'react-icons/md';
import palette from 'lib/styles/palette';
import Days from 'components/Canvas/BuildTab/Dnd/Days';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 0;
  background: ${palette.back2};
  border-radius: 10px;
  padding: 20px;
  height: 100%;
  overflow: auto;

  @media screen and (max-width: 767px) {
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  ${(props) =>
    props.check &&
    css`
      /* max-height: 55vh; */
    `}
`;

const CarouselBtns = styled.div`
  display: flex;
  justify-content: center;
`;

const CarBtn = styled.button`
  height: 40px;
  margin: 5px 20px;
  background-color: white;
  border-radius: 5px;
  border: none;
  :hover {
    cursor: pointer;
    background-color: black;
    color: white;
    transform: scale(1.1);
    transition: all 0.1s linear;
  }
`;

const ToggleArea = styled.div`
  position: absolute;

  svg {
    color: white;
  }

  @media screen and (max-width: 767px) {
    display: flex;
  }

  :hover {
    cursor: pointer;
    div {
      opacity: 1;
      transition: 0.3s;
      background-color: white;
      svg {
        color: black;
      }
    }
  }
`;

const Toggle = styled.div`
  display: flex;
  position: relative;
  top: 20vh;
  left: -70px;
  justify-content: center;
  align-items: center;
  background-color: black;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.15);
  @media screen and (max-width: 767px) {
    top: -280px;
    width: 40px;
    height: 40px;
    left: 50%;
    transform: translate(-50%);
    transition: transform;
  }
`;

const ExitSvg = styled(MdOutlineClose)``;

const FolderSvg = styled(MdOutlineFolderOpen)``;

const PlanDays = ({ data }) => {
  const {
    dayLocDel,
    setViewTime,
    travelDay,
    setTimeData,
    splitTime,
    mobile,
    isOpen,
    onClickToggle,
    check,
  } = data;
  const [dayIdx, setDayIdx] = useState(0);

  const onClickBtn = (di) => {
    let last = travelDay.length - 1;
    if (di === 'p') {
      // 이전 day 보여주기
      if (dayIdx === 0) return;
      else setDayIdx(dayIdx - 1);
    } else if (di === 'n') {
      // 이후 day 보여주기
      if (dayIdx === last) return;
      else setDayIdx(dayIdx + 1);
    }
  };

  return (
    <Container check={check} mobile={mobile}>
      {!check && (
        <ToggleArea>
          <Toggle onClick={onClickToggle} isOpen={isOpen}>
            {isOpen && <ExitSvg size="30" />}
            {!isOpen && <FolderSvg size="30" />}
          </Toggle>
        </ToggleArea>
      )}
      <Days
        travelDay={travelDay}
        mobile={mobile}
        dayIdx={dayIdx}
        dayLocDel={dayLocDel}
        setViewTime={setViewTime}
        setTimeData={setTimeData}
        splitTime={splitTime}
        check={check}
      />
      <Mobile>
        <CarouselBtns>
          <CarBtn onClick={() => onClickBtn('p')}>이전</CarBtn>
          <CarBtn onClick={() => onClickBtn('n')}>이후</CarBtn>
        </CarouselBtns>
      </Mobile>
    </Container>
  );
};

export default PlanDays;
