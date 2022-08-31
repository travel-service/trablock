import React, { useState, useEffect, useRef } from 'react';
import lodgeMarker from '../../lib/images/marker 아이콘_25x25 숙소마크.png';
import attractionMarker from '../../lib/images/marker 아이콘_25x25 관광지마크.png';
import cultureMarker from '../../lib/images/marker 아이콘_25x25 문화시설 마크.png';
import leportsMarker from '../../lib/images/marker 아이콘_25x25 레포츠 마크.png';
import restaurantMarker from '../../lib/images/marker 아이콘_25x25 식당마크.png';
import festivalMarker from '../../lib/images/marker 아이콘_25x25 축제마크.png';
import ModalModule from 'components/common/modal/ModalModule';
import 'lib/styles/Modal.css';
import '../../lib/styles/test.css';
import styled from 'styled-components';
import BlockInfo from 'components/Canvas/BlockInfo/BlockInfo';
import { sysLocStore } from 'lib/zustand/planStore';
// import attractionPicker from '../../lib/images/25x25 관광지마크 사본.png';
// import lodgePicker from '../../lib/images/25x25 숙소마크 사본.png';
// import culturePicker from '../../lib/images/25x25 문화시설 마크 사본.png';
// import leportsPicker from '../../lib/images/25x25 레포츠 마크 사본.png';
// import restaurantPicker from '../../lib/images/25x25 식당마크 사본.png';
// import festivalPicker from '../../lib/images/25x25 축제마크 사본.png';

const Div = styled.div`
  z-index: 0;
`;

const { kakao } = window;

const MapContainer = ({ coords }) => {
  const [kakaoMap, setKakaoMap] = useState(null);
  const container = useRef(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [info, setInfo] = useState({ id: 0, type: 0 });

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const { lat, lng } = sysLocStore();

  useEffect(() => {
    const options = {
      center: new kakao.maps.LatLng(33.280701, 126.570667),
      level: 7,
    };

    let map = new kakao.maps.Map(container.current, options); // 카카오 맵
    let mapTypeControl = new kakao.maps.MapTypeControl(); // 지도 타입전환 컨드롤러
    let zoomControl = new kakao.maps.ZoomControl(); // 줌 제어 컨트롤러
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    setKakaoMap(map);
  }, [container]);

  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }

    var positions = [];
    // selectedMarker = null;

    if (coords) {
      for (let key in coords) {
        for (var i = 0; i < coords[key].length; i++) {
          positions[i] = {
            id: coords[key][i].locationId,
            title: coords[key][i].name,
            latlng: new kakao.maps.LatLng(
              coords[key][i].coords.latitude,
              coords[key][i].coords.longitude,
            ),
            type: key,
          };
        }
      }

      var markerSize = new kakao.maps.Size(25, 25);
      // pickerSize = new kakao.maps.Size(40, 40);

      for (let j = 0; j < positions.length; j++) {
        addMarker(positions[j]);
      }

      function addMarker(position) {
        var attMarker = createMarkerImg(attractionMarker, markerSize),
          // attPicker = createMarkerImg(attractionPicker, pickerSize),
          lodMarker = createMarkerImg(lodgeMarker, markerSize),
          // lodPicker = createMarkerImg(lodgePicker, pickerSize),
          culMarker = createMarkerImg(cultureMarker, markerSize),
          // culPicker = createMarkerImg(culturePicker, pickerSize),
          lepMarker = createMarkerImg(leportsMarker, markerSize),
          // lepPicker = createMarkerImg(leportsPicker, pickerSize),
          resMarker = createMarkerImg(restaurantMarker, markerSize),
          // resPicker = createMarkerImg(restaurantPicker, pickerSize),
          fesMarker = createMarkerImg(festivalMarker, markerSize);
        // fesPicker = createMarkerImg(festivalPicker, pickerSize);

        var marker = new kakao.maps.Marker({
          map: kakaoMap,
          position: position.latlng,
        });

        //마커 생성 함수
        function setMarker() {
          switch (position.type) {
            case 'Attraction':
              marker.setImage(attMarker);
              marker.normalImage = attMarker;
              break;
            case 'Culture':
              marker.setImage(culMarker);
              marker.normalImage = culMarker;
              break;
            case 'Leports':
              marker.setImage(lepMarker);
              marker.normalImage = lepMarker;
              break;
            case 'Restaurant':
              marker.setImage(resMarker);
              marker.normalImage = resMarker;
              break;
            case 'Festival':
              marker.setImage(fesMarker);
              marker.normalImage = fesMarker;
              break;
            case 'Lodge':
              marker.setImage(lodMarker);
              marker.normalImage = lodMarker;
              break;
            default:
              break;
          }
        }

        //피커 생성 함수 - 알수 없는 버그로 인한 일시 중단
        // function setPicker() {
        //   switch (position.type) {
        //     case 'Attraction' :
        //       marker.setImage(attPicker);
        //       break;
        //     case 'Culture' :
        //       marker.setImage(culPicker);
        //       break;
        //     case 'Leports' :
        //       marker.setImage(lepPicker);
        //       break;
        //     case 'Restaurant' :
        //       marker.setImage(resPicker);
        //       break;
        //     case 'Festival' :
        //       marker.setImage(fesPicker);
        //       break;
        //     case 'Lodge' :
        //       marker.setImage(lodPicker);
        //       break;
        //     default :
        //       break;
        //   }
        // }

        setMarker();

        const getOverlayContent = () => {
          const content = document.createElement('div');
          content.setAttribute('class', 'wrap');

          const titleArea = document.createElement('div');
          titleArea.setAttribute('class', 'title');

          const title = document.createElement('div');
          // eslint-disable-next-line no-sequences
          title.onclick = () => (setInfo(position), openModal());
          title.innerHTML = position.title;

          const close = document.createElement('div');
          close.setAttribute('class', 'close');
          close.onclick = () =>
            customOverlay.setMap(
              null,
            ) /**, setMarker(), (selectedMarker = null) 피커생성 함수에 사용*/;

          content.appendChild(titleArea);
          titleArea.append(title, close);
          return content;
        };

        var customOverlay = new kakao.maps.CustomOverlay({
          content: getOverlayContent(),
          clickable: true,
          position: marker.getPosition(),
        });

        kakao.maps.event.addListener(marker, 'click', function () {
          // 피커 생성 함수에 사용
          // if (!selectedMarker || selectedMarker !== marker) {
          //   !!selectedMarker &&
          //     selectedMarker.setImage(selectedMarker.normalImage);
          //   setPicker();
          // }
          customOverlay.setMap(kakaoMap);
          // 피커 생성 함수에 사용
          // selectedMarker = marker;
        });
      }

      function createMarkerImg(img, size) {
        var markerImg = new kakao.maps.MarkerImage(img, size);

        return markerImg;
      }
    } else {
      return;
    }

    let latlng = new kakao.maps.LatLng(lat, lng);
    kakaoMap.panTo(latlng);
  }, [kakaoMap, coords, lat, lng]);

  return (
    <>
      <Div
        id="myMap"
        ref={container}
        style={{
          height: '553px',
          borderRadius: '10px',
          border: '1px solid #E5E7E8',
        }}
      ></Div>
      <ModalModule
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        title={info.title}
      >
        <BlockInfo type={info.type} id={info.id} />
      </ModalModule>
    </>
  );
};

export default MapContainer;
