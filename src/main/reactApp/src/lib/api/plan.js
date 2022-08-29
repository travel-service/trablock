import axios from 'axios';

// 여행 설정 페이지, 여행 생성
export const createPlan = async (userPlan) => {
  try {
    const response = await axios.post('/members/plan', {
      planForm: userPlan,
    });
    console.log('생성', response);
    return response.data;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

// 여행 수정(여행보관함에서)
export const getPlan = async (id) => {
  try {
    const response = await axios.get(`/members/plan/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

// 컨셉 받아오기
export const getConcpet = async (id) => {
  try {
    const response = await axios.get(`/members/plan/${id}/concept`);
    return response.data;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

// 여행 설정 수정
export const postPlan = async (id, userPlan) => {
  try {
    const response = await axios.post(`/members/plan/${id}`, userPlan);
    console.log(`${id} 플랜수정: `, response);
    return response.data;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

// 여행 설정 페이지 컨셉 수정
export const postConcept = async (id, conceptForm) => {
  try {
    const response = await axios.post(`/members/plan/${id}/concept`, {
      conceptForm: conceptForm,
    });
    console.log(`${id} 컨셉수정: `, response);
    return response.data;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

// day 생성(post)
export const postPlanDay = async (dayForm, id) => {
  try {
    const response = await axios.post(`/members/plan/${id}/day`, {
      dayForm: {
        travelDay: dayForm.travelDay,
      },
    });
    return response;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

// day 수정(put)
export const updatePlanDay = async (dayForm, id) => {
  try {
    const response = await axios.put(`/members/plan/${id}/day`, {
      dayForm,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

// day 조회
export const getPlanDay = async (id) => {
  try {
    const response = await axios.get(`/members/plan/${id}/day`);
    return response.data;
  } catch (err) {
    console.log(err);
    return 0;
  }
};
