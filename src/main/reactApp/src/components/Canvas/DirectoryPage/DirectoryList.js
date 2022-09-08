import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  HiOutlineFolderAdd,
  HiOutlineFolderOpen,
  HiOutlineFolder,
  HiOutlineTrash,
} from 'react-icons/hi';
import More from 'lib/Icons/More';
import Close from 'lib/Icons/Close';
import DirLayout from './DirLayout';

// 좌측 바, 디렉터리 목록
// (새여행 버튼, 디렉터리 생성/삭제, 디렉터리 이름, 플랜갯수)
//리스트 전체
const DirListContainer = styled.div`
  box-sizing: border-box;
  width: 20%;
  //width: 280px;
  padding: 1.5%;
  background: #f6f6f8;
  border: 1px solid #ddddde;
  border-radius: 10px;
`;
// 새여행가기 버튼
const NewPlanButton = styled(Link)`
  display: inline-block;
  border-radius: 30px;
  text-align: center;
  justify-content: center;
  background: #000000;
  cursor: pointer;
  width: 100%;
  height: 46px;
  padding-top: 15px;
  padding-bottom: 15px;

  text-decoration: none;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
`;
//버튼 정렬 용
const ButtonsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${(props) => (props.title ? 'margin-top: 20px;' : '')};
`;
// text
const DirTextDiv = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
`;
// 생성 버튼
const IconDiv = styled.div`
  display: flex;
  align-items: center;
  background: #eaeaea;
  border-radius: 20px;
  cursor: pointer;
  padding: 10px 20px 10px 20px;
`;
//디렉토리 생성 input
const CreateInput = styled.input`
  border-radius: 5px;
  width: ${(props) => (props.c ? '80%' : '70%')};
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  background: none;
  margin: 0px;
`;
// 더보기 버튼
const MoreDiv = styled.div`
  margin-top: 4px;
  padding-left: 6px;
  cursor: pointer;
`;
// 더보기 container
const DirPopUpContainer = styled.ul`
  position: absolute;
  width: 81px;
  background: #e5e7e8;
  border-radius: 10px;
  list-style: none;
  margin: 0px;
  padding: 10px;
  z-index: 1;
`;
// 더보기 내용
const DirPopUp = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) => (props.bottomBtn ? '' : 'margin-bottom: 5px;')};

  width: 61px;
  height: 34px;
  background: #ffffff;
  color: #000000;
  border-radius: 5px;
  /* decoration: none; */
  text-align: center;

  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  &:hover {
    background: #000000;
    color: #ffffff;
  }
`;

const DirectoryList = ({
  mainPlans,
  trashPlans,
  userDirs,
  currentDirId,
  createUserDir,
  changeDirName,
  setCurrentDir,
  setUserPlans,
  setCreateUserDir,
  setDirName,
  setCheckedPlans,
  postCreateDir,
  postChangeDirName,
  postDeleteDir,
}) => {
  const [createDir, setCreateDir] = useState(false); // 디렉터리 생성 show
  const [chName, setChName] = useState(false); // 이름 변경용
  const [moreBtn, setMoreBtn] = useState(false); // 더보기 버튼
  const outRef = useRef(null);

  useEffect(() => {
    typeof currentDirId === 'number' &&
      mainPlans.mainDirectory &&
      setUserPlans(
        mainPlans.mainDirectory.filter((plan) => {
          return plan.userDirectoryIds.includes(currentDirId);
        }),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDirId, mainPlans]);

  useEffect(() => {
    document.addEventListener('mousedown', onClickMore);
    return () => {
      document.removeEventListener('mousedown', onClickMore);
    };
  });
  const onClickMore = (e) => {
    if (outRef.current && !outRef.current.contains(e.target)) {
      setMoreBtn(!moreBtn);
    }
  };

  // 디렉터리 생성 완료 시
  const onBlurDir = () => {
    if (createUserDir !== '' && createDir) {
      postCreateDir();
    } else if (changeDirName !== '' && chName) {
      postChangeDirName();
    }
    setCreateDir(false);
    setChName(false);
  };

  // 디렉터리 이름 변경
  const onChangeDirName = (e, c) => {
    if (c) {
      setCreateUserDir(e);
    } else {
      setDirName(e);
    }
  };

  const onClickClose = () => {
    setCreateDir(false);
    setCreateUserDir('');
    setDirName('');
  };

  return (
    <DirListContainer>
      {mainPlans && userDirs && trashPlans && (
        <>
          <NewPlanButton to={process.env.PUBLIC_URL + `/search`}>
            새로운 여행 만들기 +
          </NewPlanButton>
          <ButtonsDiv title="true">
            <DirTextDiv>내 여행</DirTextDiv>
            <IconDiv
              onClick={() => {
                createDir ? onClickClose() : setCreateDir(!createDir);
              }}
            >
              {createDir ? (
                <Close size="20" />
              ) : (
                <HiOutlineFolderAdd size="20" />
              )}
            </IconDiv>
          </ButtonsDiv>
          <div>
            <DirLayout
              ck={currentDirId === 'm' ? true : false}
              onClick={() => {
                setCurrentDir('m');
                setCheckedPlans([]);
              }}
              ico={<HiOutlineFolderOpen size="20" />}
              title="모든 여행"
              pCount={mainPlans.planCount}
            />
            {userDirs.mainUserDirectory &&
              userDirs.mainUserDirectory.map((item, index) => {
                return (
                  <DirLayout
                    key={item.userDirectoryId}
                    userD={true}
                    ck={currentDirId === item.userDirectoryId ? true : false}
                    onClick={() => {
                      setCurrentDir(item.userDirectoryId);
                      setCheckedPlans([]);
                    }}
                    ico={<HiOutlineFolder size="20" />}
                    chName={
                      chName && currentDirId === item.userDirectoryId ? (
                        <CreateInput
                          value={changeDirName}
                          onChange={(e) => {
                            onChangeDirName(e.target.value, !chName);
                          }}
                          onBlur={() => {
                            onBlurDir();
                          }}
                        />
                      ) : item.directoryName.length > 10 ? (
                        item.directoryName.substr(0, 10) + '...'
                      ) : (
                        item.directoryName
                      )
                    }
                    pCount={userDirs.planCount[index]}
                    moreBtn={
                      <MoreDiv
                        onClick={() => {
                          chName && setChName(false);
                          setMoreBtn(!moreBtn);
                        }}
                      >
                        <More size="20" />
                        {moreBtn && currentDirId === item.userDirectoryId && (
                          <DirPopUpContainer ref={outRef}>
                            <DirPopUp
                              onClick={() => {
                                setChName(!chName);
                                currentDirId === item.userDirectoryId &&
                                  setDirName(
                                    userDirs.mainUserDirectory &&
                                      userDirs.mainUserDirectory.find(
                                        (i) =>
                                          i.userDirectoryId === currentDirId,
                                      ).directoryName,
                                  );
                              }}
                            >
                              수정
                            </DirPopUp>
                            <DirPopUp
                              bottomBtn="true"
                              onClick={() => {
                                window.confirm(
                                  "보관함을 삭제하시겠습니까? 플랜은 '모든 여행' 보관함에서 확인할 수 있습니다.",
                                )
                                  ? postDeleteDir()
                                  : setMoreBtn(false);
                              }}
                            >
                              삭제
                            </DirPopUp>
                          </DirPopUpContainer>
                        )}
                      </MoreDiv>
                    }
                  />
                );
              })}
            {createDir && !chName && (
              <DirLayout
                onBlur={() => {
                  onBlurDir();
                }}
                ico={<HiOutlineFolder size="20" />}
                createD={true}
                createIn={
                  <CreateInput
                    c
                    placeholder="새 여행 보관함"
                    onChange={(e) => {
                      onChangeDirName(e.target.value, true);
                    }}
                  />
                }
              />
            )}
            <DirLayout
              ck={currentDirId === 't' ? true : false}
              onClick={() => {
                setCurrentDir('t');
                setCheckedPlans([]);
              }}
              ico={<HiOutlineTrash size="20" />}
              title="휴지통"
              pCount={trashPlans.trashPlanCount}
            />
          </div>
        </>
      )}
    </DirListContainer>
  );
};

export default DirectoryList;
