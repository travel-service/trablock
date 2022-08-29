import React from 'react';
import styled from 'styled-components';

//각 디렉토리 네모박스
const DirContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: #ffffff;
  ${(props) => (props.ck ? 'border: 2px solid #f87676;' : '')};
  border-radius: 10px;
  margin-top: 15px;
`;
// 정렬용
const AlignDiv = styled.div`
  display: flex;
  align-items: center;
`;
// title
const DirTitleDiv = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
`;
// 아이콘
const BaseIconDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 33.5px;
  width: 33.5px;
  margin-right: 10px;
  border: 1.5px solid #000000;
  border-radius: 100%;
`;
//플랜 개수
const PlanCountContainer = styled.div`
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 20px;
  padding: 5px 10px 5px 10px;
  font-weight: 500;
  font-size: 8px;
  line-height: 10px;
  color: #000000;
`;

const DirLayout = ({
  ck,
  onClick,
  ico,
  title,
  pCount,
  userD = false,
  chName,
  moreBtn,
  createD = false,
  onBlur,
  createIn,
}) => {
  return (
    <DirContainer ck={ck} onClick={onClick} onBlur={onBlur}>
      <AlignDiv>
        <BaseIconDiv>{ico}</BaseIconDiv>
        {userD ? (
          <>{chName}</>
        ) : createD ? (
          <>{createIn}</>
        ) : (
          <DirTitleDiv>{title}</DirTitleDiv>
        )}
      </AlignDiv>
      <AlignDiv>
        {!createD && <PlanCountContainer>{pCount}</PlanCountContainer>}
        {userD && <>{moreBtn}</>}
      </AlignDiv>
    </DirContainer>
  );
};
export default DirLayout;
