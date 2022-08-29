import React, { useEffect } from 'react';
import LandingMainContents from 'components/Landing/LandingMainContents';
import { useStore } from 'lib/zustand/planStore';
import { memLocStore } from 'lib/zustand/memberLocStore';

const LandingForm = () => {
  const { initializePlanForm } = useStore();
  const { initializeMemberForm } = memLocStore();

  useEffect(() => {
    initializePlanForm();
    initializeMemberForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <LandingMainContents />;
};

export default LandingForm;
