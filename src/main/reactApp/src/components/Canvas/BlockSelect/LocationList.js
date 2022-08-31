import { sysLocStore, useStore } from 'lib/zustand/planStore';
import React, { lazy, Suspense, useCallback } from 'react';
import styled, { css } from 'styled-components';

const Location = lazy(() => import('./Location'));

const Blocks = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ReadyStyle = css`
  border-radius: 10px;
  background: #dee2e6;
`;

const ReadyLoc = styled.div`
  width: 252px;
  height: 134px;
  background: #ffffff;
  border: 1px solid #e5e7e8;
  border-radius: 10px;
  padding: 12px;
  margin: 13px;
  display: flex;
  justify-content: space-between;
`;

const ReadyImg = styled.div`
  width: 110px;
  height: 110px;
  ${ReadyStyle};
`;

const ReadyH3 = styled.div`
  width: 100px;
  height: 20px;
  ${ReadyStyle};
`;

const ReadyDescription = styled.div`
  width: 70px;
  height: 20px;
  margin-top: 20px;
  ${ReadyStyle};
`;

const Type = styled.div`
  text-align: center;
`;

function LocationList({ locations, search, type }) {
  const { remove, onAdd } = useStore();
  const { setLocIsSelect } = sysLocStore();

  if (locations) {
    var arr = locations.filter((val) => val.name.includes(search));
  }

  const onClick = useCallback((loc, idx) => {
    const { type } = loc.type;
    let { isSelect, locationId } = loc;
    if (!isSelect) {
      onAdd(loc, type);
      setLocIsSelect(type, idx, true);
    } else {
      remove(locationId, type);
      setLocIsSelect(type, idx, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {arr && !!arr.length && (
        <>
          <Type>{type}</Type>
          <Blocks>
            {arr.map((location, idx) => (
              <Suspense
                key={location.locationId}
                fallback={
                  <ReadyLoc>
                    <ReadyImg></ReadyImg>
                    <div>
                      <ReadyH3></ReadyH3>
                      <ReadyDescription></ReadyDescription>
                    </div>
                  </ReadyLoc>
                }
              >
                <Location
                  onClick={onClick}
                  location={location}
                  idx={idx}
                  isSelect={location.isSelect}
                />
              </Suspense>
            ))}
          </Blocks>
        </>
      )}
    </>
  );
}

export default LocationList;
