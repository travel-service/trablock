import React, { useEffect, useState } from 'react';
import Location from '../LocDetail/Location';
import styled, { css } from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import CustomRadio from 'lib/custom/CustomRadio';
import CreateLoc from '../MemLoc/CreateLoc';
import palette from 'lib/styles/palette';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 330px;
  max-height: 900px;
  background-color: white;
  border-radius: 10px;
  transition: 0.3s all linear;
  padding: 20px;
  margin-left: 30px;

  ${(props) =>
    !props.isOpen &&
    css`
      min-width: 0px;
      width: 0px;
      padding: 0px;
      border: none;
    `}

  @media screen and (max-width: 767px) {
    /* width: 100%; */
    display: block;
    /* transition: none; */
    border: 1px ${palette.back2} solid;
    border-radius: 10px 10px 10px 10px;
    margin-bottom: 8px;
    margin-left: 20px;
    margin-right: 20px;

    ${(props) =>
      !props.isOpen &&
      css`
        border: 0px;
        height: 0px;
      `}
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 15px;
`;

const Basket = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  margin-bottom: auto;
  background-color: ${palette.back2};
  border-radius: 10px;
  padding: 20px;

  @media screen and (max-width: 767px) {
    max-height: 150px;
    overflow: auto;
  }
  div[data-rbd-placeholder-context-id] {
    display: none !important;
  }
`;

const Div = styled.div`
  height: 45px;
  margin-bottom: 10px;
`;

const LocationContainer = styled.div`
  width: 100%;
`;

const Clone = styled(LocationContainer)`
  ~ div {
    transform: none !important;
  }
`;

const SelLocBasket = ({ data }) => {
  const { isOpen, category, selCateLoc, memberLocations, day } = data;
  const [type, setType] = useState('Attraction');
  const [selCateLocAddMember, setSelCateLocAddMember] = useState({
    ...selCateLoc,
    member: memberLocations,
  });

  useEffect(() => {
    setSelCateLocAddMember({
      // selCateLoc + memberLocation
      ...selCateLoc,
      member: memberLocations,
    });
  }, [selCateLoc, memberLocations]);

  const onClick = (type) => {
    setType(type);
  };

  return (
    <Container isOpen={isOpen}>
      {/* 카테고리 */}
      {isOpen && (
        <>
          <Title>담은 블록 보기</Title>
          <CustomRadio
            dataObj={category}
            onClick={onClick}
            check={type}
            flag="member"
          />
          <Div>
            <CreateLoc />
          </Div>
          {/* 현재 카테고리 담은 블록 */}
          <Droppable
            droppableId={type}
            isDropDisabled={true}
            // type="location"
          >
            {(provided, snapshot) => (
              <Basket
                ref={provided.innerRef}
                // {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {selCateLocAddMember[type].length === 0 && (
                  <>로케이션을 담아오세요</>
                )}
                {selCateLocAddMember[type].length > 0 &&
                  selCateLocAddMember[type].map((loc, idx) => {
                    return (
                      <Draggable
                        draggableId={String(loc.locationId)}
                        index={idx}
                        key={loc.locationId}
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
                                index={idx}
                              >
                                <Location
                                  key={loc.locationId}
                                  location={loc}
                                  index={idx}
                                  id={loc.locationId}
                                  max={selCateLocAddMember[type].length - 1}
                                  isDragging={snapshot.isDragging}
                                />
                              </LocationContainer>
                              {snapshot.isDragging && day === undefined && (
                                <Clone>
                                  <Location location={loc} index={idx} />
                                </Clone>
                              )}
                            </React.Fragment>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                {provided.placeholder}
              </Basket>
            )}
          </Droppable>
        </>
      )}
    </Container>
  );
};

export default SelLocBasket;
