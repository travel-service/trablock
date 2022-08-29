import React from 'react';
import styled, { css } from 'styled-components';

const buttonStyle = css`
  background-color: #ffffff;
  border: 1px solid #010101;
  border-radius: 5px;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  height: 45px;
  line-height: 16px;

  cursor: pointer;
  :hover {
    background: black;
    color: white;
    transition: 0.2s all linear;
  }
  :active {
    transform: translateY(5px);
  }
`;

const Input = styled.input`
  width: 100%;

  ${buttonStyle};

  ${(props) =>
    props.color &&
    css`
      background-color: black;
      color: white;
    `}
`;

const Button = styled.button`
  ${buttonStyle};
  padding: 0px 25px;

  ${(props) =>
    props.color &&
    css`
      background-color: black;
      color: white;
      :hover {
        background: white;
        color: black;
        transition: 0.2s all linear;
      }
    `}

  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;

  @media screen and (max-width: 1023px) {
    font-size: 11px;
    height: 30px;
    padding: 0px 10px;
  }

  @media screen and (max-width: 767px) {
  }
`;

const BlackCustomBtn = ({ onClick, value, color, type }) => {
  return type === 'button' ? (
    <Button onClick={onClick} color={color}>
      {value}
    </Button>
  ) : (
    <Input type="button" onClick={onClick} value={value} color={color} />
  );
};

export default BlackCustomBtn;
