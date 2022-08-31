import create from 'zustand';
import * as myAPI from 'lib/api/my';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist((set, get) => ({
    profile: {
      nickname: '',
      bio: '',
      img: '',
    },
    info: {
      birthday: '',
      gender: '',
      email: '',
    },
    checknick: {
      message: '',
    },
    sendnick: {
      nickname: '',
    },
    getBasic: async () => {
      const res = await myAPI.getMyinfo();
      const imgs = await myAPI.getMyImg();
      if (res && imgs) {
        const { nickname, bio } = res;
        const { img } = imgs;
        set({
          profile: {
            nickname,
            bio,
            img,
          },
        });
      }
      // console.log(res);
    },
    getEditP: async () => {
      const res = await myAPI.getEditPage();
      const imgs = await myAPI.getMyImg();
      if (res && imgs) {
        const { nickname, bio, birthday, gender, email } = res;
        const { img } = imgs;
        set({
          profile: {
            nickname,
            bio,
            img,
          },
          info: {
            birthday,
            gender,
            email,
          },
        });
      }
    },
    setNick: (input) => {
      set((state) => ({ profile: { ...state.profile, nickname: input } }));
    },
    setBio: (input) => {
      set((state) => ({ profile: { ...state.profile, bio: input } }));
    },
    setBirthday: (input) => {
      set((state) => ({ info: { ...state.info, birthday: input } }));
    },
    setGender: (input) => {
      set((state) => ({ info: { ...state.info, gender: input } }));
    },
    postInfo: async () => {
      const nickName = get().profile.nickname;
      const bio = get().profile.bio;
      const birthday = get().info.birthday;
      const gender = get().info.gender;
      const email = get().info.email;
      const profile = {
        nickName,
        bio,
        birthday,
        gender,
        email,
      };
      await myAPI.postMyinfo(profile);
    },
    postNick: async () => {
      const nickName = get().profile.nickname;
      await myAPI.postMyNick(nickName);
    },
    postBio: async () => {
      const bio = get().profile.bio;
      await myAPI.postMyBio({ bio });
    },
    checkgetNick: async () => {
      const nick = get().sendnick.nickname;
      const prenick = get().profile.nickname;
      // console.log(nick, prenick);
      const res = await myAPI.getCheckNick(nick, prenick);
      set((state) => ({
        checknick: { ...state.checknick, message: res },
      }));
    },
    setSendNick: (input) => {
      set((state) => ({ sendnick: { ...state.sendnick, nickname: input } }));
    },
    postImg: async (frm) => {
      await myAPI.postMyImg(frm);
    },
    setImg: (input) => {
      set((state) => ({ profile: { ...state.profile, img: input } }));
    },
    postPasswd: async (pass) => {
      await myAPI.postPass(pass);
    },
  })),
);
