import React, { useState } from 'react';
import styled from 'styled-components';
import LocationList from './LocationList';
import TypeFilter from './TypeFilter';
import { filterStore } from 'lib/filterStore';
import Map from 'containers/Canvas/MapContainer';

const ContentsArea = styled.div`
  /* overflow: auto; */
  display: flex;
  width: 100%;
`;

const FilterArea = styled.div``;

const Input = styled.input`
  margin: 0px 0px 16px 16px;
  border-radius: 4px;
  height: 30px;
`;

const WhiteBox = styled.div`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 3px;
  background: #e5e7e8;
  border: 1px solid #e5e7e8;
  border-radius: 10px;
  overflow-y: scroll;
  height: 450px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const BlockListArea = styled.div`
  width: 57.5%;
  float: left;
  padding-right: 25px;
  @media screen and (max-width: 767px) {
    width: 100%;
    padding-right: 0px;
  }
`;

const MapArea = styled.div`
  width: 42.5%;
  float: right;
  padding-left: 25px;
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const SelectArea = ({ location, selLocs, coords }) => {
  const { Attraction, Culture, Festival, Leports, Lodge, Restaurant } =
    location;
  const [search, setSearch] = useState('');

  const {
    attIsCheck,
    culIsCheck,
    fesIsCheck,
    lepIsCheck,
    lodIsCheck,
    resIsCheck,
    selectedOnly,
  } = filterStore();

  var noneCheck =
    !attIsCheck &&
    !culIsCheck &&
    !fesIsCheck &&
    !lepIsCheck &&
    !lodIsCheck &&
    !resIsCheck;

  return (
    <ContentsArea>
      <BlockListArea>
        <FilterArea>
          <TypeFilter />
          검색
          <Input
            type="text"
            placeholder="블록 검색"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </FilterArea>
        <WhiteBox>
          {(attIsCheck === true || noneCheck === true) &&
            selectedOnly === false && (
              <LocationList
                locations={Attraction}
                search={search}
                type="관광지"
              />
            )}
          {(culIsCheck === true || noneCheck === true) &&
            selectedOnly === false && (
              <LocationList
                locations={Culture}
                search={search}
                type="문화 시설"
              />
            )}
          {(fesIsCheck === true || noneCheck === true) &&
            selectedOnly === false && (
              <LocationList locations={Festival} search={search} type="축제" />
            )}
          {(lepIsCheck === true || noneCheck === true) &&
            selectedOnly === false && (
              <LocationList locations={Leports} search={search} type="레포츠" />
            )}
          {(lodIsCheck === true || noneCheck === true) &&
            selectedOnly === false && (
              <LocationList locations={Lodge} search={search} type="숙박시설" />
            )}
          {(resIsCheck === true || noneCheck === true) &&
            selectedOnly === false && (
              <LocationList
                locations={Restaurant}
                search={search}
                type="음식점"
              />
            )}
          {(attIsCheck === true || noneCheck === true) &&
            selectedOnly === true && (
              <LocationList
                locations={selLocs.Attraction}
                search={search}
                type="관광지"
              />
            )}
          {(culIsCheck === true || noneCheck === true) &&
            selectedOnly === true && (
              <LocationList
                locations={selLocs.Culture}
                search={search}
                type="문화 시설"
              />
            )}
          {(fesIsCheck === true || noneCheck === true) &&
            selectedOnly === true && (
              <LocationList
                locations={selLocs.Festival}
                search={search}
                type="축제"
              />
            )}
          {(lepIsCheck === true || noneCheck === true) &&
            selectedOnly === true && (
              <LocationList
                locations={selLocs.Leports}
                search={search}
                type="레포츠"
              />
            )}
          {(lodIsCheck === true || noneCheck === true) &&
            selectedOnly === true && (
              <LocationList
                locations={selLocs.Lodge}
                search={search}
                type="숙박시설"
              />
            )}
          {(resIsCheck === true || noneCheck === true) &&
            selectedOnly === true && (
              <LocationList
                locations={selLocs.Restaurant}
                search={search}
                type="음식점"
              />
            )}
        </WhiteBox>
      </BlockListArea>
      <MapArea>
        <Map coords={coords}></Map>
      </MapArea>
    </ContentsArea>
  );
};

export default SelectArea;
