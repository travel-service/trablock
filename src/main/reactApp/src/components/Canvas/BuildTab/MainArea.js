import React, { useState } from 'react'; // useEffect
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import CanvasForm from '../common/CanvasForm';

const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  /* height: 85vh; */
  /* overflow: auto; */
  @media screen and (max-width: 767px) {
    display: block;
    padding-right: 0;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
`;

const MainArea = ({
  category,
  pushLocToDay,
  dayLocChange,
  selCateLoc,
  dayLocDel,
  setViewTime,
  travelDay,
  setTimeData,
  splitTime,
  memberLocations,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    const startDropId = source.droppableId;
    const endDropId = destination.droppableId;
    let regex = /day/i; // endDropId에는 day가 들어감
    let start = regex.test(startDropId); // true or false, true면 day, false면 Basket
    let end = regex.test(endDropId);
    // 출발 selectedLocation, 도착 day
    if (!start && end)
      pushLocToDay(
        destination.droppableId,
        destination.index,
        source.droppableId,
        source.index,
      );
    // 출발 day, 도착 day
    else if (start && end) {
      dayLocChange(
        destination.droppableId,
        destination.index,
        source.droppableId,
        source.index,
      );
    }
  };

  const onClickToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <DragDropContext style={{ overflow: 'auto' }} onDragEnd={onDragEnd}>
        <Container>
          {/* 캔버스 폼 컴포넌트 재사용 */}
          <CanvasForm
            type="build"
            data={{
              dayLocDel,
              setViewTime,
              travelDay,
              setTimeData,
              splitTime,
              isOpen,
              category,
              selCateLoc,
              memberLocations,
              onClickToggle,
            }}
          />
        </Container>
      </DragDropContext>
    </>
  );
};

export default MainArea;

// 참고 레퍼런스
// https://codesandbox.io/s/react-beautiful-dnd-example-forked-9l3wz8?file=/src/index.js

// 0307
// https://react-icons.github.io/react-icons/
// https://technicolour.tistory.com/56

// 0404
// https://codesandbox.io/s/khno7?file=/src/App.js
