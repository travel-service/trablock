import React from 'react';
import styled, { css } from 'styled-components';
import palette from 'lib/styles/palette';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${palette.back2};
  ${(props) =>
    props.flag &&
    css`
      height: 100%;
      width: 100%;
    `}
`;

const SpinnerStyle = styled.div`
  border: 10px solid white;
  border-top: 10px solid ${palette.red1};
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Spinner = ({ flag }) => {
  return (
    <Container flag={flag}>
      <SpinnerStyle></SpinnerStyle>
    </Container>
  );
};

export default Spinner;
