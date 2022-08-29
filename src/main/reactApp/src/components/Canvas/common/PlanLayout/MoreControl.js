import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { HiOutlineFolder } from 'react-icons/hi';
import More from 'lib/Icons/More';

const PlanTitleDiv = styled.div`
  display: flex;
  justify-content: right;
`;
// 설정(점세개) div
const MoreDiv = styled.div`
  text-align: right;
  position: absolute;
  z-index: 2;
`;
// 설정 버튼
const MoreButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;
const PlanControlUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  list-style: none;
  padding: 10px;
  background: #e5e7e8;
  border-radius: 10px;
  margin: 0;
`;
const PlanControlLi = styled.li`
  text-align: center;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #000000;
  decoration: none;
  padding: 10px 20px 10px 20px;
  background: #ffffff;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #000000;
    color: #ffffff;
  }
`;
const SubUl = styled.ul`
  display: flex;
  position: absolute;
  flex-direction: column;
  text-align: left;
  gap: 5px;
  list-style: none;
  padding: 10px;
  background: #e5e7e8;
  border-radius: 10px;
  margin: 0;
  width: 148px;
  margin-left: -150px;
  margin-top: -52px;
  z-index: 2;
`;
const MoveLi = styled.li`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #000000;
  text-align: left;

  decoration: none;
  padding: 10px 15px 10px 15px;
  background: #ffffff;
  border-radius: 5px;
  cursor: pointer;
`;

const MoreControl = ({
  planId,
  userDirs,
  checkedPlans,
  setCheckedPlans,
  onChangeCheck,
  postMovePlans,
  postTrash,
  postRevert,
  currentDirId,
  deletePlan,
  userTrash,
}) => {
  const [clickMore, setClickMore] = useState(false); // 담기클릭
  const [isShow, setIsShow] = useState(false); // 점세개 클릭
  const moreRef = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', onClickPlans);
    return () => {
      document.removeEventListener('mousedown', onClickPlans);
    };
  });
  const onClickPlans = (e) => {
    if (moreRef.current && !moreRef.current.contains(e.target)) {
      setCheckedPlans([]);
      setIsShow(false);
      setClickMore(false);
    }
  };
  const ConfirmDel = (m) => {
    if (window.confirm(m)) {
      currentDirId === 'm'
        ? postTrash()
        : currentDirId === 't'
        ? deletePlan()
        : userTrash();
      setIsShow(false);
      setClickMore(false);
    }
  };

  return (
    <>
      <PlanTitleDiv>
        <MoreDiv>
          <MoreButton
            onClick={() => {
              setIsShow(!isShow);
              !checkedPlans.includes(planId)
                ? onChangeCheck(!isShow, planId)
                : setCheckedPlans([planId]);
            }}
          >
            <More size="20" />
          </MoreButton>
          {currentDirId === 'm'
            ? isShow && (
                <PlanControlUl ref={moreRef}>
                  <PlanControlLi
                    onMouseOver={() => {
                      setClickMore(false);
                    }}
                    onClick={() => {
                      ConfirmDel(
                        '플랜을 삭제하시겠습니까? 복원은 휴지통에서 30일 이내로 가능합니다.',
                      );
                    }}
                  >
                    삭제
                  </PlanControlLi>
                  <PlanControlLi
                    onMouseOver={() => {
                      setClickMore(true);
                    }}
                  >
                    담기
                  </PlanControlLi>
                </PlanControlUl>
              )
            : currentDirId === 't'
            ? isShow && (
                <PlanControlUl ref={moreRef}>
                  <PlanControlLi
                    onClick={() => {
                      ConfirmDel(
                        '플랜을 영구 삭제하시겠습니까? 영구 삭제된 플랜은 복구할 수 없습니다.',
                      );
                    }}
                  >
                    삭제
                  </PlanControlLi>
                  <PlanControlLi
                    onClick={() => {
                      postRevert();
                      setIsShow(false);
                      setClickMore(false);
                      alert("플랜을 '모든 여행'으로 복원했습니다.");
                    }}
                  >
                    복원
                  </PlanControlLi>
                </PlanControlUl>
              )
            : isShow && (
                <PlanControlUl ref={moreRef}>
                  <PlanControlLi
                    onClick={() => {
                      ConfirmDel(
                        '플랜을 삭제하시겠습니까? 플랜은 모든 여행에서 확인할 수 있습니다.',
                      );
                    }}
                  >
                    삭제
                  </PlanControlLi>
                </PlanControlUl>
              )}
          {isShow && clickMore && userDirs.mainUserDirectory.length > 0 ? (
            <SubUl ref={moreRef}>
              {userDirs.mainUserDirectory.map((item) => {
                return (
                  <MoveLi
                    key={item.userDirectoryId}
                    onClick={() => {
                      postMovePlans(item.userDirectoryId);
                      setIsShow(false);
                      setClickMore(false);
                      alert(`플랜이 ${item.directoryName}에 담겼습니다.`);
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <HiOutlineFolder
                        size="20"
                        style={{ marginRight: '5px' }}
                      />
                      {item.directoryName.length > 5
                        ? item.directoryName.substr(0, 5) + '...'
                        : item.directoryName}
                    </div>
                  </MoveLi>
                );
              })}
            </SubUl>
          ) : (
            isShow &&
            clickMore &&
            userDirs.mainUserDirectory.length === 0 && (
              <SubUl>담을 보관함이 없습니다.</SubUl>
            )
          )}
        </MoreDiv>
      </PlanTitleDiv>
    </>
  );
};

export default MoreControl;
