import React, { useEffect } from 'react';
import SelectArea from 'components/Canvas/BlockSelect/SelectArea';
import { sysLocStore, useStore } from '../../lib/zustand/planStore';

const Block = ({ idx }) => {
  const { sysCateLoc, sysCateLocCoords, getSysLoc, getSysLocCoords } =
    sysLocStore();
  const { selCateLoc, postPlan, getSelectedLocations } = useStore();

  useEffect(() => {
    getSysLoc();
    getSysLocCoords();
    getSelectedLocations();

    return () => {
      // 0816 selectedLocation Post
      postPlan(idx);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {sysCateLoc && (
        <SelectArea
          location={sysCateLoc}
          selLocs={selCateLoc}
          coords={sysCateLocCoords}
        />
      )}
    </>
  );
};

export default Block;
