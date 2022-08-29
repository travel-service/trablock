import React, { useEffect } from 'react';
import MainArea from 'components/Canvas/BuildTab/MainArea';
import { useStore } from 'lib/zustand/planStore';
import { buildStore } from 'lib/zustand/CanvasBuildStore';
import { memLocStore } from 'lib/zustand/memberLocStore';

const BuildBlockForm = ({ idx }) => {
  const { memberLocations, getMemberLocations } = memLocStore();
  const { category, selCateLoc, userTravelDay, getPlanDays, postPlan, id } =
    useStore();
  const {
    dayLocDel,
    pushLocToDay,
    dayLocChange,
    setViewTime,
    setTimeData,
    splitTime,
  } = buildStore();

  useEffect(() => {
    getPlanDays(id);
    getMemberLocations();
    return () => {
      postPlan(idx);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainArea
      category={category}
      pushLocToDay={pushLocToDay}
      dayLocChange={dayLocChange}
      selCateLoc={selCateLoc}
      dayLocDel={dayLocDel}
      setViewTime={setViewTime}
      travelDay={userTravelDay.travelDay}
      setTimeData={setTimeData}
      splitTime={splitTime}
      memberLocations={memberLocations}
    />
  );
};

export default BuildBlockForm;
