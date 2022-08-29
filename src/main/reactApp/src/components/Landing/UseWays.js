import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1400px;
  padding: 0px 30px;
  margin-bottom: 7%;
`;

const List = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0px 20px;
`;

const Way = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  height: 190px;
  border-radius: 15px;
  background-color: #f2f2f2;
  padding: 15px;
  justify-content: space-around;
  flex-basis: 22%;
  margin: 10px 10px;

  :hover {
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
    background-color: white;
    -webkit-transition: box-shadow ease-in-out 0.15s;
    transition: all ease-in-out 0.15;
  }

  @media screen and (max-width: 1023px) {
    flex-basis: 32%;
  }
  @media screen and (max-width: 767px) {
    flex-basis: 60%;
  }
`;

const Img = styled.img`
  height: 100px;
  width: 120px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const H3 = styled.h3`
  margin: 5px;
  font-size: 18px;

  @media screen and (max-width: 767px) {
    font-size: 14px;
  }
`;

const Detail = styled.div`
  text-align: center;
  @media screen and (max-width: 767px) {
    font-size: 12px;
  }
`;

const UseWays = () => {
  return (
    <Container>
      <List>
        <Way>
          <Img src={process.env.PUBLIC_URL + '/images/block1.png'} alt="" />
          <Div>
            <H3>서비스 이용방법1</H3>
            <Detail>상세내용</Detail>
          </Div>
        </Way>
        <Way>
          <Img src={process.env.PUBLIC_URL + '/images/block2.png'} alt="" />
          <Div>
            <H3>서비스 이용방법2</H3>
            <Detail>상세내용</Detail>
          </Div>
        </Way>
        <Way>
          <Img src={process.env.PUBLIC_URL + '/images/block3.png'} alt="" />
          <Div>
            <H3>서비스 이용방법3</H3>
            <Detail>상세내용</Detail>
          </Div>
        </Way>
        <Way>
          <Img src={process.env.PUBLIC_URL + '/images/block4.png'} alt="" />
          <Div>
            <H3>서비스 이용방법4</H3>
            <Detail>상세내용</Detail>
          </Div>
        </Way>
      </List>
    </Container>
  );
};

export default UseWays;
