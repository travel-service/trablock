// Canvas 단에 있는 이전으로 다음으로 버튼
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import StyledButton from 'components/common/Button';
import { useStore } from 'lib/zustand/planStore';
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';

const Buttons = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.div`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const CanvasButtons = ({ siteMap }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userPlan } = useStore();

  const urlName = location.pathname.replace(/\/canvas\//g, '');
  const idx = Object.keys(siteMap).indexOf(urlName);

  const onClickNext = () => {
    if (userPlan.name === '') {
      alert('여행 이름을 입력해주세요.');
      return;
    } else {
      navigate(
        process.env.PUBLIC_URL + `/canvas/${Object.keys(siteMap)[idx + 1]}`,
      );
    }
  };

  const onClickPrev = () => {
    navigate(
      process.env.PUBLIC_URL + `/canvas/${Object.keys(siteMap)[idx - 1]}`,
    );
  };

  return (
    <>
      <Buttons>
        <Button>
          {idx !== 0 && (
            <StyledButton backColor="white" onClick={onClickPrev}>
              <MdOutlineArrowBackIos /> 이전
            </StyledButton>
          )}
        </Button>
        <Button>
          {idx !== 3 && (
            <StyledButton backColor="black" onClick={onClickNext}>
              다음 <MdOutlineArrowForwardIos />
            </StyledButton>
          )}
        </Button>
      </Buttons>
    </>
  );
};

export default CanvasButtons;
