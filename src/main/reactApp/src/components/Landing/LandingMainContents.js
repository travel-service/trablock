import React from 'react';
import UseWays from 'components/Landing/UseWays';
import styled from 'styled-components';
import BackImg from 'lib/images/landingBackV2.png';
import BackImg_small from 'lib/images/landingBackV2_small.png';
import { MdSearch } from 'react-icons/md';
import { Link } from 'react-router-dom';
import palette from 'lib/styles/palette';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FlexBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${palette.landing};
  padding: 0% 0%;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  @media screen and (max-width: 1023px) {
    margin-top: 50px;
  }
  @media screen and (max-width: 767px) {
    margin-top: 40px;
  }
`;

const TextH3 = styled.div`
  font-size: 35px;
  font-weight: 350;
  line-height: 50px;
  @media screen and (max-width: 1023px) {
    font-size: 30px;
    line-height: 30px;
  }
  @media screen and (max-width: 767px) {
    font-size: 20px;
    line-height: 20px;
  }
`;

const TextH2 = styled.div`
  font-size: 50px;
  font-weight: 700;
  line-height: 80px;
  @media screen and (max-width: 1023px) {
    font-size: 40px;
    line-height: 60px;
  }
  @media screen and (max-width: 767px) {
    margin-top: 10px;
    font-size: 25px;
    line-height: 40px;
  }
`;

const MainContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vw * 0.39);
  background-size: 100vw calc(100vw * 0.39);
  background-image: url(${BackImg});
  background-repeat: no-repeat;
  background-position: center top;
  background-color: #ffd0c0;
  @media screen and (max-width: 767px) {
    background-image: url(${BackImg_small});
    /* height: calc(100vw * 0.49); */
    height: 350px;
    background-size: 100vw calc(100vw * 0.5);
    background-position: center bottom;
  }
`;

const InputContainer = styled.div`
  margin: 50px 0px;
  background-color: white;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  box-shadow: 4px 4px 4px grey;
  padding-right: 20px;
  @media screen and (max-width: 767px) {
    /* height: 130px; */
  }
`;

const Div = styled.div`
  display: flex;
  align-items: center;
`;

const SearchIcon = styled(MdSearch)`
  font-size: 25px;
  margin: 0px 20px;
  opacity: 0.5;
  @media screen and (max-width: 767px) {
    margin: 0px 10px;
  }
`;

const Input = styled.input`
  padding: 0;
  width: 500px;
  font-size: 14px;
  border: none;
  :focus {
    outline: none;
  }
  ::placeholder {
    font-size: 14px;
  }
  @media screen and (max-width: 767px) {
    width: 200px;
  }
`;

const GoDirBtn = styled(Link)`
  text-decoration: none;
  background-color: #f16b6c;
  width: 200px;
  height: 50px;
  color: white;
  /* border: none; */
  border-radius: 5px;
  box-shadow: 4px 4px 4px grey;
  font-size: 18px;
  font-weight: 520;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div`
  position: relative;
  display: flex;
  border-style: solid;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  width: 700px;
  max-width: 1200px;
  height: 300px;
  background-color: white;
  box-shadow: 4px 4px 4px grey;
  font-size: 40px;
  font-weight: 520;
  justify-content: center;
  align-items: center;
  top: -160px;
  @media screen and (max-width: 1023px) {
    width: 600px;
    height: 200px;
    top: -100px;
  }
  @media screen and (max-width: 767px) {
    width: 80%;
    height: 150px;
    top: -30px;
  }
`;

const SearchDes = styled(Link)`
  text-decoration: none;
  color: ${palette.red};
`;

const LandingMainContents = () => {
  return (
    <Container>
      <FlexBox>
        <Contents>
          <SubContents>
            <TextH3>복잡한 여행 계획은 그만!</TextH3>
            <TextH2>여행 계획의 끝판왕, 트래블럭!</TextH2>
          </SubContents>
          <MainContents>
            <InputContainer>
              <Div>
                <SearchIcon />
                <Input placeholder="현재는 제주도로만 서비스중!" />
              </Div>
              {/* <button>검색</button> */}
              <SearchDes to={process.env.PUBLIC_URL + '/search'}>
                검색
              </SearchDes>
            </InputContainer>
            <GoDirBtn to={process.env.PUBLIC_URL + '/canvas/directory'}>
              여행 보관함 가기
            </GoDirBtn>
            {/* 사용자 검증 필요 */}
          </MainContents>
        </Contents>
      </FlexBox>
      <Banner>배너</Banner>
      <UseWays />
    </Container>
  );
};

export default LandingMainContents;
// 랜딩 디자인(피그마)
// https://www.figma.com/file/hfE6NPBRZb4eWXvYbGDztU/%ED%8A%B8%EB%9E%98%EB%B8%94%EB%9F%AD-%EC%9B%B9%EB%94%94%EC%9E%90%EC%9D%B8-%3A-%EC%88%98%EC%A0%95-_-220512?node-id=0%3A1

// 0616
// 배너에서 사용할 수 있을 라이브러리
// https://velog.io/@cookncoding/React-slick%EC%97%90-styled-components-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0
