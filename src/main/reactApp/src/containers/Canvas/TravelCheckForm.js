import React, { useEffect } from 'react';
import { useStore } from 'lib/zustand/planStore';
import { buildStore } from 'lib/zustand/CanvasBuildStore';
import { DragDropContext } from 'react-beautiful-dnd';
import PlanDays from 'components/Canvas/BuildTab/Dnd/PlanDays';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TravelCheckForm = () => {
  const { userState } = useSelector(({ user }) => ({
    userState: user.userState,
  }));
  const { planId } = useParams();
  const { getPlanDays, userTravelDay } = useStore();
  const { splitTime, setViewTime } = buildStore();
  const { travelDay } = userTravelDay;

  useEffect(() => {
    getPlanDays(planId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState]);

  return (
    <DragDropContext style={{ overflow: 'auto' }}>
      <PlanDays
        data={{
          travelDay,
          splitTime,
          setViewTime,
          check: true,
        }}
      />
    </DragDropContext>
  );
};

export default TravelCheckForm;
