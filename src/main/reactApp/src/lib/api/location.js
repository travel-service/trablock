import axios from 'axios';

// 여행지 블록 형태 받아오기
export const getLocationInfo = async (id, type) => {
  try {
    // body에 type실어서 요청 필요 0814
    const response = await axios.get(`/locations/${id}?locationType=${type}`);
    return response;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

// 여행지 블록 형태 받아오기
export const getBlockLocations = async () => {
  try {
    const response = await axios.get('/locations/block');
    return response;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

// 여행지 마크 형태 받아오기
export const getMarkLocations = async () => {
  try {
    const response = await axios.get('/locations/mark');
    return response;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

// 0816 담은 블록 저장하기 selectedLocation
export const postSelectedLocations = async (planId, selectedLocation) => {
  try {
    const response = await axios.post(
      `/members/plan/${planId}/selected-location`,
      {
        selectedLocationForm: {
          selectedLocation,
        },
      },
    );
    if (response.status !== 200) {
      return 0;
    } else {
      return response;
    }
  } catch (err) {
    console.log(err);
    return 0;
  }
};

// 0816 담은 블록 가져오기 selectedLocation
export const getSelectedLocations = async (planId) => {
  try {
    const response = await axios.get(
      `/members/plan/${planId}/selected-location`,
    );
    if (response.status !== 200) {
      return 0;
    } else {
      return response;
    }
  } catch (err) {
    console.log(err);
    return 0;
  }
};

// 멤버 로케이션 생성
export const createMemberLocation = async (location) => {
  try {
    const response = await axios.post('/locations/member', {
      memberLocation: location.memberLocation,
      information: location.information,
      typeLocation: location.typeLocation,
      location: location.location,
    });
    if (response.status !== 201) {
      return 0;
    } else {
      return response;
    }
  } catch (err) {
    console.log(err);
    return 0;
  }
};

export const getMemberLocation = async () => {
  try {
    const response = await axios.get('/locations/member');
    if (response.status !== 200) {
      return 0;
    } else {
      return response;
    }
  } catch (err) {
    console.log(err);
    return 0;
  }
};
