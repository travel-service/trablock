import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { shadow } from 'lib/styles/styleUtils';

const buttonStyle = css`
  border: 1px solid #e5e7e8;
  border-radius: 5px;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  height: 45px;
  width: 93px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.2s all;
  background: white;

  &:hover {
    ${shadow(1)}
  }

  &:active {
    transform: translateY(3px);
  }

  ${(props) =>
    props.backColor === 'white' &&
    css`
      background-color: white;
      color: black;
    `}

  ${(props) =>
    props.backColor === 'black' &&
    css`
      background-color: black;
      color: white;
    `}

    ${(props) =>
    props.fullWidth &&
    css`
      background-color: #f16b6c;
      color: white;
      width: 100%;
      font-weight: 700;
      font-size: 18px;
      height: 55px;
      border-radius: 10px;
    `}
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

const Button = (props) => {
  return props.to ? <StyledLink {...props} /> : <StyledButton {...props} />;
};

export default Button;
