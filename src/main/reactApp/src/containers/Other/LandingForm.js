import React, { useEffect } from 'react';
import LandingMainContents from 'components/Landing/LandingMainContents';
import { sysLocStore, useStore } from 'lib/zustand/planStore';
import { memLocStore } from 'lib/zustand/memberLocStore';

const LandingForm = () => {
  const { initializePlanForm } = useStore();
  const { initializeMemberForm } = memLocStore();
  const { initializeSysCateLocForm } = sysLocStore();

  useEffect(() => {
    initializePlanForm();
    initializeMemberForm();
    initializeSysCateLocForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <LandingMainContents />;
};

export default LandingForm;
