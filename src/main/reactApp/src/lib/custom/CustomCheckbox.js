import React from 'react';
import styled from 'styled-components';

const Circle = styled.div`
  position: absolute;
  width: 9px;
  height: 9px;
  ${(props) =>
    props.circle
      ? 'margin-top: 2px; margin-left: 2px;'
      : 'margin-top: 7px; margin-left: 7px;'}
  background: #f75d5d;
  border-radius: 100%;
`;

const Chinput = styled.input`
  height: 0;
  width: 0;
  opacity: 0;
  z-index: -1;
`;
const Chlabel = styled.label`
  position: relative;
  display: inline-block;
  margin-right: 5px;
  cursor: pointer;
  ${(props) =>
    props.circle ? 'width: 15px; height: 15px;' : 'width: 25px; height: 25px;'}
`;
const Container = styled.div`
  position: absolute;
  top: 0;
  background: #ffffff;
  border: 1px solid #e5e7e8;
  ${(props) =>
    props.circle
      ? 'width: 15px; height: 15px; border-radius:100%;'
      : 'width: 25px; height: 25px; border-radius:5px;'}

  ${Circle} {
    visibility: ${(props) => (props.checked ? 'visible' : 'hidden')};
  }
`;

/* 
id id 값
onChange checkbox의 onChange 함수
onClick checkbox의 onClick 함수
checked 체크 여부
circle 체크박스 모양
*/
const CustomCheckbox = ({ id, onChange, onClick, checked, circle }) => {
  return (
    <Chlabel htmlFor={id} circle={circle}>
      <Chinput
        id={id}
        type="checkbox"
        onClick={onClick}
        onChange={onChange}
        checked={checked}
      />
      <Container checked={checked} circle={circle}>
        <Circle circle={circle} />
      </Container>
    </Chlabel>
  );
};

export default CustomCheckbox;
