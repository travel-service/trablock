import create from 'zustand';
import * as locationAPI from 'lib/api/location';

export const infoStore = create((set) => ({
  getInfo: async (id, type) => {
    const response = await locationAPI.getLocationInfo(id, type);
    // var info = await axios.get(`http://localhost:4000/locationInfo/${id}`);

    set({totalInfo: response.data})
  },

  totalInfo: {},
}));
