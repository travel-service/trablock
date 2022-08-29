import React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import CustomCheckbox from 'lib/custom/CustomCheckbox';

const ConceptSettingDiv = styled.div`
  width: 600px;
  font-family: 'Pretendard';
  font-style: normal;
  @media only screen and (max-width: 800px) {
    width: 80%;
    height: 100px;
  }
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
const CheckboxDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 20px;
  align-items: center;
  margin-top: 15px;
`;
const ElementDiv = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 13px;
  color: #000000;
`;

export const ConceptSetting = ({
  conceptForm,
  Concepts,
  setConcept,
  Question,
}) => {
  const onClickConcept = (checked, word) => {
    if (checked) {
      setConcept([...conceptForm.concept, word]);
    } else {
      setConcept(conceptForm.concept.filter((el) => el !== word));
    }
  };

  return (
    <ConceptSettingDiv>
      <TitleSpan>2. 여행 컨셉 </TitleSpan>
      <TooltipButton data-tip data-for="conceptsetting">
        <Question size="14" />
      </TooltipButton>
      <ReactTooltip
        id="conceptsetting"
        place="right"
        type="info"
        effect="solid"
      >
        <div>블록 추천을 위해 누구와 함께 여행하는지 알려주세요.</div>
      </ReactTooltip>
      <CheckboxDiv>
        {Concepts.map((item, id) => {
          return (
            <ElementDiv key={id}>
              <CustomCheckbox
                onChange={(e) => {
                  onClickConcept(e.target.checked, `${item.eword}`);
                }}
                checked={
                  conceptForm.concept &&
                  conceptForm.concept.includes(item.eword)
                    ? true
                    : false
                }
              />
              {item.name}
            </ElementDiv>
          );
        })}
      </CheckboxDiv>
    </ConceptSettingDiv>
  );
};
