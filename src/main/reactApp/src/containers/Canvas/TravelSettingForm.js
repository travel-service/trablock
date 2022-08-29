import { DateSetting } from 'components/Canvas/SettingTab/DateSetting';
import { ConceptSetting } from 'components/Canvas/SettingTab/ConceptSetting';
import { ImageSetting } from 'components/Canvas/SettingTab/ImageSetting';
import PlanName from 'components/Canvas/common/PlanName';
import React, { useEffect } from 'react';
import { useStore } from 'lib/zustand/planStore';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Question from 'lib/Icons/Question';

const StyledDiv = styled.div`
  @media only screen and (min-width: 800px) {
    display: flex;
  }
  font-family: 'Pretendard';
  font-style: normal;
`;
const TravelSettingForm = () => {
  const { id, userPlan, conceptForm, Concepts } = useStore();
  const {
    setId,
    setDepart,
    setPeriods,
    setConcept,
    setThumbnail,
    setName,
    getPlan,
    initializePlanForm,
    postPlan,
  } = useStore();

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setId(location.state.planId);
      id && getPlan(id);
    } else {
      if (id === null) {
        initializePlanForm();
        setDepart(new Date());
      } else {
        id && getPlan(id);
      }
    }
  }, [id]);

  useEffect(() => {
    return () => {
      userPlan.name !== '' && postPlan(0);
    };
  }, [userPlan.name]);

  return (
    <StyledDiv>
      <div>
        <PlanName
          userPlan={userPlan}
          id={id}
          setName={setName}
          postPlan={postPlan}
          Question={Question}
        />
        <DateSetting
          userPlan={userPlan}
          setDepart={setDepart}
          setPeriods={setPeriods}
          Question={Question}
        />
        <ConceptSetting
          conceptForm={conceptForm}
          Concepts={Concepts}
          setConcept={setConcept}
          Question={Question}
        />
        <ImageSetting
          userPlan={userPlan}
          setThumbnail={setThumbnail}
          Question={Question}
        />
      </div>
      <div>{/*추천 플랜*/}</div>
    </StyledDiv>
  );
};

export default TravelSettingForm;
