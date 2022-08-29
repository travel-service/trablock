import React from 'react';
import styled, { css } from 'styled-components';
import DayHeader from 'components/Canvas/BuildTab/LocDetail/DayHeader';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import palette from 'lib/styles/palette';
import Location from 'components/Canvas/BuildTab/LocDetail/Location';
import MoveDataDiv from '../LocDetail/MoveDataDiv';
import Spinner from 'lib/custom/Spinner';

const Day = styled.div`
  margin: 10px;
  border: 1px solid ${palette.back2};
  border-radius: 10px;
  background: white;
  min-height: 300px;
  max-height: 500px;
  min-width: 325px;
  max-width: 325px;
  padding: 20px;
  width: 100%;

  @media screen and (max-width: 767px) {
    min-width: 70vw;
    max-width: 70vw;
    flex-shrink: 0;
    display: none;
    ${(props) =>
      props.idx === props.dayIdx &&
      css`
        display: block;
      `};
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 325px);
  justify-content: space-around;
  grid-gap: 20px;
  ${(props) =>
    !props.len &&
    css`
      height: 100%;
      display: flex;
      align-items: center;
    `}

  @media screen and (max-width: 767px) {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
  }
`;

const ErrorImg = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FaceIcon = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 30px;
`;

const FontDiv = styled.div`
  font-size: 17px;
  font-weight: bold;
  color: #e64980;
`;

const LocationsList = styled.div`
  min-height: 180px;
  max-height: 420px;

  overflow: auto;
  transition: background-color ease 0.2s;
  ${(props) =>
    props.isDraggingOver &&
    css`
      background-color: #e5e7e8;
    `}
  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
  }
  ${(props) =>
    props.empty &&
    css`
      border: 1px dashed #e5e7e8;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    `}
`;

const InitForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 60px;
  height: 45px;
  width: 100%;
  padding: 8px;
`;

const EmptyBlock = styled.div`
  background-color: white;
  font-size: 10px;
  padding: 7px;
`;

const LocationContainer = styled.div`
  width: 100%;
`;

const Div = styled.div`
  width: 100%;

  ${(props) =>
    props.idx === 0 &&
    css`
      padding-bottom: 1px;
      > li {
        box-shadow: 0px 0px 0px 0px;
      }
    `}
`;

const Clone = styled(LocationContainer)`
  ~ li {
    transform: none !important;
  }
`;

const Days = ({
  travelDay,
  dayIdx,
  mobile,
  dayLocDel,
  setViewTime,
  setTimeData,
  splitTime,
  check,
}) => {
  return (
    <>
      <Container len={travelDay.length}>
        {travelDay === '' && (
          <ErrorImg>
            <h2>여행을 언제 가는거죠?</h2>
            <FaceIcon
              src={process.env.PUBLIC_URL + '/images/face1.png'}
              alt=""
            />
            <FontDiv>😥여행일자를 제대로 받아오지 못했어요.😥</FontDiv>
            <FontDiv>
              😛여행 설정 단계로 돌아가 여행일자를 다시 선택해주세요!!😛
            </FontDiv>
          </ErrorImg>
        )}
        {travelDay !== '' && travelDay.length === 0 && <Spinner flag={true} />}
        {travelDay !== '' &&
          travelDay.map((day, index) => (
            // 각 day
            <React.Fragment key={index}>
              <Day idx={index} dayIdx={dayIdx} mobile={mobile}>
                <DayHeader index={index} firLoc={day[0]} check={check} />
                {/* day 영역 */}
                <Droppable droppableId={`day${index}`}>
                  {(provided, snapshot) => (
                    <LocationsList
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      isDraggingOver={snapshot.isDraggingOver}
                      empty={day[0] === undefined}
                    >
                      {/* day에 location 존재하지 않을 때 */}
                      {day[0] === undefined && (
                        <InitForm>
                          <EmptyBlock>
                            {check
                              ? '여행 계획이 없습니다!'
                              : '블록 혹은 자체 생성한 블록을 넣어주세요.'}
                          </EmptyBlock>
                        </InitForm>
                      )}
                      {/* location map */}
                      {day.map((loc, idx) => {
                        return (
                          <Div key={idx} idx={idx}>
                            <Draggable
                              draggableId={String(loc.copyLocationId)}
                              index={idx}
                              key={loc.copyLocationId}
                              isDragDisabled={check}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <React.Fragment>
                                    <LocationContainer
                                      ref={provided.innerRef}
                                      {...provided.dragHandleProps}
                                      {...provided.draggableProps}
                                      isDragging={snapshot.isDragging}
                                      style={provided.draggableProps.style}
                                      index={index}
                                      day={day}
                                    >
                                      <Location
                                        location={loc}
                                        index={idx}
                                        day={index}
                                        dayLocDel={dayLocDel}
                                        isDragging={snapshot.isDragging}
                                        check={check}
                                      />
                                    </LocationContainer>
                                    {snapshot.isDragging && day === undefined && (
                                      <Clone>
                                        <Location
                                          key={idx}
                                          location={loc}
                                          id={loc.copyLocationId}
                                          index={idx}
                                        />
                                      </Clone>
                                    )}
                                  </React.Fragment>
                                );
                              }}
                            </Draggable>
                            {day[idx + 1] !== undefined && (
                              <MoveDataDiv
                                day={index}
                                index={idx}
                                travelDay={travelDay}
                                setTimeData={setTimeData}
                                setViewTime={setViewTime}
                                splitTime={splitTime}
                                check={check}
                              />
                            )}
                            {provided.placeholder}
                          </Div>
                        );
                      })}
                      {provided.placeholder}
                    </LocationsList>
                  )}
                </Droppable>
              </Day>
            </React.Fragment>
          ))}
      </Container>
    </>
  );
};

export default Days;
