import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import ReactTooltip from 'react-tooltip';
import Pencil from 'lib/Icons/Pencil';
import { MdOutlineSave } from 'react-icons/md';

const NamingDiv = styled.div`
  width: 500px;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;
const TitleSpan = styled.span`
  font-weight: 600;
  font-size: 15px;
  width: 100px;
  height: 20px;
  color: #000000;
`;
const TooltipButton = styled.button`
  margin-left: 10px;
  background: none;
  height: 12px;
  width: 12px;
  border: none;
  cursor: pointer;
`;
const StyledInput = styled.input`
  border: none;
  font-weight: 400;
  font-size: 15px;
  color: #000000;
  padding: 15px;
  width: 200px;
  background: none;
  :focus {
    outline: none;
  }
  ${(props) =>
    props.disabled ||
    css`
      border: none;
      background: #ededef;
      border-radius: 5px;
    `}
`;
const PencilButton = styled.button`
  border: none;
  margin-left: 10px;
  font-weight: 400;
  font-size: 15px;
  height: 45px;
  width: 45px;
  cursor: pointer;
  border-radius: 5px;
  background: none;
  :hover {
    background: #ededef;
  }
`;

const PlanName = ({ userPlan, id, setName, postPlan, Question }) => {
  const [isDisabled, setIsDisabled] = useState(true); // input 활성화
  const [isChecked, setIsChecked] = useState(true); // 펜, 저장 버튼 변경
  const [nameText, setNameText] = useState('');
  const [createPlan, setCP] = useState(false); // 플랜 생성 후 이름 수정용

  useEffect(() => {
    if (userPlan.name !== '' && id) {
      setCP(true);
      return setNameText(userPlan.name);
    }
  }, [userPlan.name, id]);

  const onClickPencil = () => {
    setIsDisabled(!isDisabled);
    setIsChecked(!isChecked);
  };

  const onClickSave = () => {
    if (nameText === '') {
      alert('여행 이름을 설정해주세요.');
    } else {
      setIsChecked(!isChecked);
      setIsDisabled(!isDisabled);
      setName(nameText);
      !createPlan && postPlan(0, 1);
      setCP(true);
    }
  };

  const Naming = (e) => {
    setNameText(e.target.value);
  };

  return (
    <NamingDiv>
      <TitleSpan>0. 여행 이름 설정 </TitleSpan>
      <TooltipButton data-tip data-for="planName">
        <Question size="14" />
      </TooltipButton>
      <ReactTooltip id="planName" place="right" type="info" effect="solid">
        <div>연필 버튼을 클릭하면 여행 이름을 설정할 수 있습니다.</div>
      </ReactTooltip>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
        <StyledInput
          type="text"
          placeholder={'새 여행 이름'}
          disabled={isDisabled}
          value={nameText}
          onChange={Naming}
        />
        <PencilButton
          type="button"
          onClick={() => {
            isChecked ? onClickPencil() : onClickSave();
          }}
        >
          {isChecked ? <Pencil size="20" /> : <MdOutlineSave size="20" />}
        </PencilButton>
      </div>
    </NamingDiv>
  );
};

export default PlanName;
