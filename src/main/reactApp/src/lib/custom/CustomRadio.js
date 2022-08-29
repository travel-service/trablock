import palette from 'lib/styles/palette';
import React from 'react';
import styled, { css } from 'styled-components';

const TypeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  /* margin-top: 15px; */
`;

const TypeRadio = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  margin-right: 8px;
  label {
    font-size: 13px;
    font-weight: 400;
  }
`;

const Radio = styled.div`
  width: 25px;
  height: 25px;
  border: 1px solid ${palette.back2};
  border-radius: 5px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CheckDiv = styled.div`
  width: 9px;
  height: 9px;
  ${(props) =>
    props.checked &&
    css`
      background: ${palette.red1};
    `}

  border-radius: 100%;
`;

const CustomRadio = ({ dataObj, onClick, check, flag }) => {
  // dataObj: radio 로 보여줄 객체
  // onClick: radio 버튼 onClick 이벤트에 대한 함수
  // check: 현재 check 되어 있는 것, dataObj의 key 값이여야함
  // flag: "기타" 와 같은 특정 상태에서 렌더링의 여부

  return (
    <TypeGrid>
      {Object.keys(dataObj).map((type, index) => (
        <TypeRadio key={index}>
          <Radio onClick={() => onClick(type)}>
            <CheckDiv checked={type === check}></CheckDiv>
          </Radio>
          <label>{dataObj[type]}</label>
        </TypeRadio>
      ))}
      {/* 특정 페이지에서 추가, canvas 페이지 */}

      {/* 백엔드에 기타가 없기때문이 일단 주석 0721 */}
      {/* {flag === 'canvas' && (
        <TypeRadio>
          <Radio onClick={() => onClick('etc')}>
            <CheckDiv checked={'etc' === check}></CheckDiv>
          </Radio>
          <label>기타</label>
        </TypeRadio>
      )} */}

      {flag === 'member' && (
        <TypeRadio>
          <Radio onClick={() => onClick('member')}>
            <CheckDiv checked={'member' === check}></CheckDiv>
          </Radio>
          <label>자체블록</label>
        </TypeRadio>
      )}
    </TypeGrid>
  );
};

export default CustomRadio;
