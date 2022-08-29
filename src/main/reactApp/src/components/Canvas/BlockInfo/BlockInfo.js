import React, { useEffect } from 'react';
import styled from 'styled-components';
import { infoStore } from '../../../lib/zustand/infoStore';

const ContentsArea = styled.div`
  width: 450px;
`

const AddrTel = styled.div`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
`

const InfoArea = styled.div`
  padding-top: 15px;
`

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
`

const Tag = styled.div`
  /* float: left; */
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
`

const Text = styled.div`
  /* float: right; */
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  text-align: right;
`

const Image = styled.img`
  width: 450px;
  height: auto;
  border-radius: 10px;
`

function AttractionInfo({info}) {
  return (
    <InfoArea>
      <Info>
        <Tag>설명</Tag>
        <Text>{info.summary}~~하는곳</Text>
      </Info>
      <Info>
        <Tag>주차여부</Tag>
        <Text>{info.parking}</Text>
      </Info>
      <Info>
        <Tag>휴일</Tag>
        <Text>{info.restDate}</Text>
      </Info>
      <Info>
        <Tag>이용시간</Tag>
        <Text>{info.useTime}</Text>
      </Info>
    </InfoArea>
  );
};

function CultureInfo({info}) {
  return (
    <InfoArea>
      <Info>
        <Tag>설명</Tag>
        <Text>{info.summary}~~하는곳</Text>
      </Info>
      <Info>
        <Tag>주차여부</Tag>
        <Text>{info.parking}</Text>
      </Info>
      <Info>
        <Tag>휴일</Tag>
        <Text>{info.restDate}</Text>
      </Info>
      <Info>
        <Tag>이용시간</Tag>
        <Text>{info.useTime}</Text>
      </Info>
      <Info>
        <Tag>이용요금</Tag>
        <Text>{info.fee}</Text>
      </Info>
      <Info>
        <Tag>소요시간</Tag>
        <Text>{info.spendTime}</Text>
      </Info>
    </InfoArea>
  );
};

function FestivalInfo({info}) {
  return (
    <InfoArea>
      <Info>
        <Tag>설명</Tag>
        <Text>{info.summary}~~하는곳</Text>
      </Info>
      <Info>
        <Tag>시작일</Tag>
        <Text>{info.startDate}</Text>
      </Info>
      <Info>
        <Tag>종료일</Tag>
        <Text>{info.endDate}</Text>
      </Info>
      <Info>
        <Tag>홈페이지</Tag>
        <Text>{info.homepage}</Text>
      </Info>
      <Info>
        <Tag>장소</Tag>
        <Text>{info.place}</Text>
      </Info>
      <Info>
        <Tag>위치안내</Tag>
        <Text>{info.placeInfo}</Text>
      </Info>
      <Info>
        <Tag>공연시간</Tag>
        <Text>{info.playTime}</Text>
      </Info>
      <Info>
        <Tag>프로그램</Tag>
        <Text>{info.program}</Text>
      </Info>
      <Info>
        <Tag>이용요금</Tag>
        <Text>{info.fee}</Text>
      </Info>
    </InfoArea>
  );
};

function LeportsInfo({info}) {
  return (
    <InfoArea>
      <Info>
        <Tag>설명</Tag>
        <Text>{info.summary}~~하는곳</Text>
      </Info>
      <Info>
        <Tag>개장기간</Tag>
        <Text>{info.openPeriod}</Text>
      </Info>
      <Info>
        <Tag>주차여부</Tag>
        <Text>{info.parking}</Text>
      </Info>
      <Info>
        <Tag>예약</Tag>
        <Text>{info.reservation}</Text>
      </Info>
      <Info>
        <Tag>휴일</Tag>
        <Text>{info.restDate}</Text>
      </Info>
      <Info>
        <Tag>이용시간</Tag>
        <Text>{info.useTime}</Text>
      </Info>
      <Info>
        <Tag>이용요금</Tag>
        <Text>{info.fee}</Text>
      </Info>
    </InfoArea>
  );
};

function LodgeInfo({info}) {
  return (
    <InfoArea>
      <Info>
        <Tag>설명</Tag>
        <Text>{info.summary}~~하는곳</Text>
      </Info>
      <Info>
        <Tag>체크인 시간</Tag>
        <Text>{info.checkInTime}</Text>
      </Info>
      <Info>
        <Tag>체크아웃 시간</Tag>
        <Text>{info.checkOutTime}</Text>
      </Info>
      <Info>
        <Tag>취사 여부</Tag>
        <Text>{info.chkCooking}</Text>
      </Info>
      <Info>
        <Tag>주차여부</Tag>
        <Text>{info.parking}</Text>
      </Info>
      <Info>
        <Tag>예약</Tag>
        <Text>{info.reservationUrl}</Text>
      </Info>
      <Info>
        <Tag>부대시설</Tag>
        <Text>{info.subfacility}</Text>
      </Info>
    </InfoArea>
  );
};

function RestaurantInfo({info}) {
  return (
    <InfoArea>
      <Info>
        <Tag>설명</Tag>
        <Text>{info.summary}~~하는곳</Text>
      </Info>
      <Info>
        <Tag>인기메뉴</Tag>
        <Text>{info.popularMenu}</Text>
      </Info>
      <Info>
        <Tag>영업시간</Tag>
        <Text>{info.openTime}</Text>
      </Info>
      <Info>
        <Tag>포장여부</Tag>
        <Text>{info.packing}</Text>
      </Info>
      <Info>
        <Tag>주차여부</Tag>
        <Text>{info.parking}</Text>
      </Info>
      <Info>
        <Tag>휴일</Tag>
        <Text>{info.restDate}</Text>
      </Info>
      <Info>
        <Tag>메뉴</Tag>
        <Text>{info.menu}</Text>
      </Info>
    </InfoArea>
  );
};

function BlockInfo(typeId) {
  const { type, id } = typeId;
  const { totalInfo, getInfo } = infoStore();

  useEffect(() => {
    getInfo(id, type);
  }, [getInfo, id]);

  if (totalInfo.parking === true) {
    totalInfo.parking = '가능';
  } else {
    totalInfo.parking = '불가능';
  }

  return (
    <ContentsArea>
      <AddrTel>
        {totalInfo.address1} / {totalInfo.tel}tel
      </AddrTel>
      <br />
      <Image src = {totalInfo.image}></Image>
      <div>
        { type === 'Attraction' && <AttractionInfo info={totalInfo}/>}
        { type === 'Culture' && <CultureInfo info={totalInfo}/>}
        { type === 'Festival' && <FestivalInfo info={totalInfo}/>}
        { type === 'Leports' && <LeportsInfo info={totalInfo}/>}
        { type === 'Lodge' && <LodgeInfo info={totalInfo}/>}
        { type === 'Restaurant' && <RestaurantInfo info={totalInfo}/>}
      </div>
    </ContentsArea>
  );
}

export default BlockInfo;
