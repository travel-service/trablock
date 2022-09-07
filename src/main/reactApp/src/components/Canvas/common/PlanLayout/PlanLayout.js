import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CustomCheckbox from 'lib/custom/CustomCheckbox';
import MoreControl from './MoreControl';

// 플랜 레이아웃(이름, 기간, 날짜, 썸네일(호버 시 정보), 이동/복사/담기 버튼)
const PlanContainer = styled.div`
  //width: 246px;
  height: 272px;
  background: #ffffff;
  border: 1px solid #e5e7e8;
  border-radius: 10px;
  padding: 15px;
`;
const PlanNameDiv = styled.div`
  display: flex;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  align-items: center;
  margin-top: 14px;
`;
const PeriodsContainer = styled.div`
  position: absolute;
  margin-top: 15px;
  margin-left: 145px;
  z-index: 2;
`;
const PeriodsDiv = styled.div`
  background: #000000;
  opacity: 0.69;
  font-weight: 800;
  font-size: 10px;
  line-height: 12px;
  color: #ffffff;
  padding: 10px 20px 10px 20px;
  border-radius: 20px;
`;
const ThumbnailContainer = styled.div`
  width: 216px;
  height: 162px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #efefef;
`;
const LinkContainer = styled.div`
  position: absolute;
  display: flex;
  gap: 11px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 216px;
  height: 162px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  z-index: 3;
`;
const LinkButton = styled(Link)`
  text-align: center;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #ffffff;
  font-size: 15px;
  text-decoration: none;
  border: 1px solid #ffffff;
  border-radius: 5px;
  padding: 10px;
  width: 70%;
  cursor: pointer;
`;
const DateDiv = styled.div`
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: #7e7e7e;
  margin-top: 10px;
`;

const PlanLayout = ({
  myP = false,
  planId,
  name,
  periods,
  createdDate,
  thumbnail,

  currentDirId = 'm',
  userDirs,
  checkedPlans,
  setCheckedPlans,
  postMovePlans,
  postTrash,
  postRevert,
  deletePlan,
  userTrash,
}) => {
  const [isOver, setIsOver] = useState(false); // 마우스오버 버튼

  const onChangeCheck = (checked, i) => {
    if (checked) {
      setCheckedPlans([...checkedPlans, i]);
    } else {
      setCheckedPlans(checkedPlans.filter((e) => e !== i));
    }
  };

  return (
    <PlanContainer>
      <PeriodsContainer>
        <PeriodsDiv>{periods}일</PeriodsDiv>
      </PeriodsContainer>
      <ThumbnailContainer // 마우스 올리면 컴포넌트 나오게
        onMouseEnter={() => {
          setIsOver(!isOver);
        }}
        onMouseLeave={() => {
          setIsOver(!isOver);
        }}
      >
        {/* 썸네일 수정*/}
        <img
          src={thumbnail}
          alt="썸네일"
          style={{
            position: 'absolute',
            zIndex: 1,
            maxWidth: '216px',
            maxHeight: '162px',
            borderRadius: '10px',
          }}
        />
        {isOver && currentDirId !== 't' && (
          <LinkContainer>
            <LinkButton to={process.env.PUBLIC_URL + `/canvas/check/${planId}`}>
              완성된 여행 보기
            </LinkButton>
            <LinkButton
              to={process.env.PUBLIC_URL + '/canvas/setting'}
              state={{ planId: planId }}
            >
              수정하기
            </LinkButton>
          </LinkContainer>
        )}
      </ThumbnailContainer>
      {myP ? (
        <>
          <PlanNameDiv>
            {name.length > 10 ? name.substr(0, 10) + '...' : name}
          </PlanNameDiv>
          <DateDiv>{createdDate.replace(/-/g, '.')}</DateDiv>
        </>
      ) : (
        <>
          <PlanNameDiv>
            <CustomCheckbox
              circle={true}
              id={planId}
              onChange={(e) => {
                onChangeCheck(e.target.checked, planId);
              }}
              checked={
                checkedPlans && checkedPlans.includes(planId) ? true : false
              }
            />
            {name.length > 10 ? name.substr(0, 10) + '...' : name}
          </PlanNameDiv>
          <DateDiv>{createdDate.replace(/-/g, '.')}</DateDiv>
          <MoreControl
            planId={planId}
            userDirs={userDirs}
            checkedPlans={checkedPlans}
            setCheckedPlans={setCheckedPlans}
            onChangeCheck={onChangeCheck}
            postMovePlans={postMovePlans}
            postTrash={postTrash}
            postRevert={postRevert}
            currentDirId={currentDirId}
            deletePlan={deletePlan}
            userTrash={userTrash}
          />
        </>
      )}
    </PlanContainer>
  );
};

export default PlanLayout;
