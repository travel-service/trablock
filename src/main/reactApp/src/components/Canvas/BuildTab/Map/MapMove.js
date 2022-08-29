import React from 'react';
import styled from 'styled-components';
import { PcTablet, TabletMobile } from 'lib/custom/responsive';

const Container = styled.div`
  position: relative;
  flex: 1;
  width: 100%;
`;

const Iframe = styled.iframe`
  /* position: absolute; */
  width: 100%;
  height: 75vh;
  @media screen and (max-width: 1023px) {
    height: 50vh;
  }
`;

// let from = '만장굴';
// let to = '그랜드하얏트호텔제주';

const MapMove = ({ fromLocName, toLocName }) => {
  return (
    <Container>
      <PcTablet>
        <Iframe
          title="kakaoMap"
          src={`https://map.kakao.com/?sName=${fromLocName}&eName=${toLocName}`}
        />
      </PcTablet>
      <TabletMobile>
        <Iframe
          title="kakaoMap"
          src={`https://m.map.kakao.com/actions/routeView?`}
        />
      </TabletMobile>
    </Container>
  );
};

export default MapMove;

// https://m.map.kakao.com/actions/routeView?startLoc=${fromLocName}&sxEnc=MRVPMP&syEnc=YPRQPM&endLoc=${toLocName}&exEnc=MRVSUO&eyEnc=YPSUUU&ids=P8512414%2CP11209821&service=

// https://m.map.kakao.com/actions/routeView?startLoc=${fromLocName}&sxEnc=LSPQOS&syEnc=YRPS&endLoc=${toLocName}&exEnc=SVMPLQ&eyEnc=ELLOLN&ids=P7863269%2CP21135119&service=
