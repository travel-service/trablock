import create from 'zustand';
import * as locationAPI from 'lib/api/location';

export const infoStore = create((set) => ({
  getInfo: async (id, type) => {
    const response = await locationAPI.getLocationInfo(id, type);

    set({ totalInfo: response.data });
  },

  totalInfo: {},
}));
