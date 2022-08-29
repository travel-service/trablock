import create from 'zustand';
import * as locationAPI from 'lib/api/location';
import { persist } from 'zustand/middleware';

export const memLocStore = create(
  persist(
    (set, get) => ({
      // memberLocation
      memberLocations: [],

      initializeMemberForm: () => {
        set(() => ({
          memberLocations: [],
        }));
      },

      // get MemberLocations
      getMemberLocations: async () => {
        const res = await locationAPI.getMemberLocation();
        if (!res) return;
        let memLoc = [];
        Object.keys(res.data.blockLocations).forEach((type, i) => {
          res.data.blockLocations[type].forEach((loc) => {
            memLoc.push(loc);
          });
        });
        set(() => ({
          memberLocations: memLoc,
        }));
        return memLoc;
      },

      // memLoc 생성 함수
      createMemberLoc: async (main, coords, sub, typeObj, type) => {
        const { name, share, address1, summary } = main;
        const { latitude, longitude } = coords;
        const { report, address2, image, image1, image2, tel } = sub;

        if (name === undefined) return '여행지 이름을 입력해주세요.';
        else if (address1 === undefined) return '여행지 주소를 선택해주세요.';
        else if (share === undefined) return '공유 가능 여부를 선택해주세요.';
        else if (summary === undefined)
          return '여행지에 대한 간단한 설명을 작성해주세요.';
        //   // 여기 인식을 못함
        let isShare = false;
        if (share === 'true') isShare = true;
        let loc = {
          memberLocation: {
            memberId: 1, // 프론트에서 멤버아이디를 알 수 있나..?
            isPublic: isShare,
          },
          location: {
            address1,
            address2,
            coords: {
              latitude,
              longitude,
            },
            image,
            name,
            isMember: true,
            areaCode: 39, // ?
            type: {
              type,
            },
          },
          typeLocation: typeObj,
          information: {
            image1,
            image2,
            report,
            summary,
            tel,
          },
        };
        const res = await locationAPI.createMemberLocation(loc);
        if (res.status === 201) {
          let smallLoc = loc.location;
          smallLoc.locationId = res.data;
          set((state) => ({
            memberLocations: [...state.memberLocations, smallLoc],
          }));
          return 'success';
        } else {
          return '원인 모를 에러!!';
        }
      },

      // 타입별 다른 정보 입력 기본 폼
      typeInfo: {
        Attraction: {
          parking: ['주차 가능여부', false],
          restDate: ['휴무일', 'ex. 월 화 휴무'], // null
          useTime: ['이용 시간', 'ex. 09:00 ~ 22:00'], // 09:00 ~ 22:00 (매표마감 21:20)
        },
        Culture: {
          parking: ['주차 가능여부', false],
          restDate: ['휴무일', 'ex. 월 화 휴무'],
          fee: ['가격', '10,000원'],
          useTime: ['이용 시간', 'ex. 09:00 ~ 22:00'],
          spendTime: ['소요시간', 'ex. 2시간'],
        },
        Festival: {
          startDate: ['개막날', '20220930'], // 20220318
          endDate: ['폐막날', '20221009'], // 20220320
          homepage: [
            '홈페이지 주소',
            'http://www.maskdance.com/2019/sub7/sub0.asp',
          ], // null
          place: ['장소', '경상북도 안동시 육사로 239 탈춤공원'], // 제주시 애월읍 봉성리 새별오름(평화로변)
          placeInfo: ['장소 정보?', '탈춤 공원 무대'],
          playTime: ['행사 시간', '30분'],
          program: ['프로그램', '하회별신굿탈놀이'],
          fee: ['이용 가격', '무료 or 10000원'],
        },
        Leports: {
          parking: ['주차 가능여부', false],
          openPeriod: ['개장 시기', ''],
          reservation: ['예약', '예약 링크?'],
          restDate: ['휴무일', 'ex. 월 화 휴무'],
          fee: ['이용 가격', '무료 or 10000원'],
          useTime: ['이용 시간', 'ex. 09:00 ~ 22:00'],
        },
        Lodge: {
          checkInTime: ['체크인', '18:00'],
          checkOutTime: ['체크아웃', '12:00'],
          cooking: ['취식 가능여부', false],
          parking: ['주차 가능여부', false],
          reservationUrl: ['예약 링크', 'www.example.com'],
          subfacility: ['부대 시설', '수영장'],
        },
        Restaurant: {
          popularMenu: ['인기메뉴', '김치찌개, 된장찌개...'],
          openTime: ['오픈 시간', 'ex. 09:00 ~ 22:00'],
          packing: ['포장 가능여부', false],
          parking: ['주차 가능여부', false],
          restDate: ['휴무일', 'ex. 월 화 휴무'],
          menu: ['메뉴', '김밥: 3000원, 우동: 4000원, ...'],
        },
      },
    }),
    {
      // 새로고침 후 상태 유지, sessionStorage 사용
      name: 'memberLoc-storage',
      getStorage: () => sessionStorage,
    },
  ),
);
