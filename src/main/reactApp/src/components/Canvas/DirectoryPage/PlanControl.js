import React, { useState } from 'react';
import styled from 'styled-components';
import {
  HiOutlineFolderDownload,
  HiOutlineFolder,
  HiRefresh,
} from 'react-icons/hi';
import { BiXCircle } from 'react-icons/bi';

// 상단 플랜 삭제/복사/담기 버튼
const PlanBtn = styled.button`
  box-sizing: border-box;
  padding: 15px;
  min-width: 85px;
  height: 46px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: #ffffff;
  border: 1px solid #e5e7e8;
  border-radius: 5px;
  cursor: pointer;

  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  color: #000000;
  margin-left: 10px;
`;
// 담기 container
const PlanPopUpContainer = styled.ul`
  display: flex;
  position: absolute;
  flex-direction: column;
  text-align: left;
  gap: 5px;
  list-style: none;
  padding: 10px;
  background: #e5e7e8;
  border-radius: 10px;
  min-width: 148px;
  margin-top: 120px;
  margin-left: 60px;
  z-index: 3;
`;
// 담기 내용
const PlanPopUp = styled.li`
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

const PlanControl = ({
  currentDirId,
  userDirs,
  postMovePlans,
  checkedPlans,
  postRevert,
  deletePlan,
  postTrash,
  userTrash,
  ItemsDiv,
}) => {
  const [isShow, setIsShow] = useState(false);
  const noPlans = '선택된 플랜이 없습니다.';

  const onBlur = () => {
    setIsShow(false);
  };
  const ConfirmText = (m) => {
    if (window.confirm(m)) {
      currentDirId === 'm'
        ? postTrash()
        : currentDirId === 't'
        ? deletePlan()
        : userTrash();
      setIsShow(false);
    }
  };

  return (
    <>
      {currentDirId === 'm' ? (
        <ItemsDiv
          onBlur={() => {
            onBlur();
          }}
        >
          <PlanBtn
            onClick={() => {
              userDirs.mainUserDirectory.length > 0
                ? setIsShow(true)
                : alert('담을 보관함이 없습니다. 보관함을 먼저 생성해주세요.');
            }}
          >
            <HiOutlineFolderDownload size="20" />
            담기
            {isShow && (
              <PlanPopUpContainer>
                {userDirs &&
                  userDirs.mainUserDirectory.map((item) => {
                    return (
                      <PlanPopUp
                        key={item.userDirectoryId}
                        onClick={() => {
                          checkedPlans && checkedPlans.length > 0
                            ? postMovePlans(item.userDirectoryId) &&
                              setIsShow(false) &&
                              alert(
                                `플랜이 ${item.directoryName}에 담겼습니다.`,
                              )
                            : alert(noPlans);
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
                          {item.directoryName}
                        </div>
                      </PlanPopUp>
                    );
                  })}
              </PlanPopUpContainer>
            )}
          </PlanBtn>
          <PlanBtn
            onClick={() => {
              checkedPlans && checkedPlans.length > 0
                ? ConfirmText(
                    '플랜을 삭제하시겠습니까? 복원은 휴지통에서 30일 이내로 가능합니다.',
                  )
                : alert(noPlans);
            }}
          >
            <BiXCircle size="20" />
            삭제
          </PlanBtn>
        </ItemsDiv>
      ) : currentDirId === 't' ? (
        <ItemsDiv>
          <PlanBtn
            onClick={() => {
              checkedPlans && checkedPlans.length === 0
                ? alert(noPlans)
                : postRevert() &&
                  setIsShow(false) &&
                  alert("플랜을 '모든 여행'으로 복원했습니다.");
            }}
          >
            <HiRefresh size="20" />
            복원
          </PlanBtn>
          <PlanBtn
            onClick={() => {
              checkedPlans && checkedPlans.length > 0
                ? ConfirmText(
                    '플랜을 영구 삭제하시겠습니까? 영구 삭제된 플랜은 복구할 수 없습니다.',
                  )
                : alert(noPlans);
            }}
          >
            <BiXCircle size="20" />
            삭제
          </PlanBtn>
        </ItemsDiv>
      ) : (
        <ItemsDiv>
          <PlanBtn
            onClick={() => {
              checkedPlans && checkedPlans.length > 0
                ? ConfirmText(
                    '플랜을 삭제하시겠습니까? 플랜은 모든 여행에서 확인할 수 있습니다.',
                  )
                : alert(noPlans);
            }}
          >
            <BiXCircle size="20" />
            삭제
          </PlanBtn>
        </ItemsDiv>
      )}
    </>
  );
};

export default PlanControl;
