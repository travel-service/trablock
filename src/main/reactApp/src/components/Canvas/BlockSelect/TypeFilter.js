import React from 'react';
import styled from 'styled-components';
import { filterStore } from 'lib/filterStore';

const TypeSelect = styled.div`
  padding-top: 0.5rem;
  > span {
    padding-right: 20px;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
  }
  .header {
    font-weight: 600;
    font-size: 18px;
    line-height: 18px;
  }
`;

function TypeFilter() {
  const {
    attIsCheck,
    culIsCheck,
    fesIsCheck,
    lepIsCheck,
    lodIsCheck,
    resIsCheck,
    selectedOnly,
    changeAttState,
    changeCulState,
    changeFesState,
    changeLepState,
    changeLodState,
    changeResState,
    changeSelState,
  } = filterStore();

  return (
    <TypeSelect>
      <span>
        <input type="checkbox" checked={attIsCheck} onChange={changeAttState} />
        <span>관광지</span>
      </span>
      <span>
        <input type="checkbox" checked={culIsCheck} onChange={changeCulState} />
        <span>문화시설</span>
      </span>
      <span>
        <input type="checkbox" checked={fesIsCheck} onChange={changeFesState} />
        <span>축제</span>
      </span>
      <span>
        <input type="checkbox" checked={lepIsCheck} onChange={changeLepState} />
        <span>레포츠</span>
      </span>
      <span>
        <input type="checkbox" checked={lodIsCheck} onChange={changeLodState} />
        <span>숙소</span>
      </span>
      <span>
        <input type="checkbox" checked={resIsCheck} onChange={changeResState} />
        <span>음식점</span>
      </span>
      <p>
        <input
          type="checkbox"
          checked={selectedOnly}
          onChange={changeSelState}
        />
        <span>선택한 블록만 보기</span>
      </p>
    </TypeSelect>
  );
}

export default TypeFilter;
