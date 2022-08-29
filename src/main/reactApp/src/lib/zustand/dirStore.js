import create from 'zustand';
import * as dirAPI from 'lib/api/dir';

// 여행보관함용 store
export const dirStore = create((set, get) => ({
  currentDirId: 'm', // 현재 클릭한 디렉터리(보여줄 디렉터리)
  mainPlans: {}, // 메인 디렉터리 플랜들
  userDirs: {}, // 유저 디렉터리 이름들(목록)
  userPlans: {}, // 해당 유저 디렉터리 내 플랜
  trashPlans: {}, // 휴지통 내 플랜들
  checkedPlans: [], // 선택된 플랜 id
  createUserDir: '', // 생성할 디렉터리 이름
  changeDirName: '', // 변경할 디렉터리 이름

  setUserPlans: (input) => {
    // 사용자 보관함 플랜 설정
    set({ userPlans: input });
  },
  setCurrentDir: (input) => {
    //현재 디렉터리 설정
    set({ currentDirId: input });
  },
  setCheckedPlans: (input) => {
    // 선택된 플랜
    set({ checkedPlans: input });
  },
  setDirName: (input) => {
    // 디렉터리 이름 변경
    set({ changeDirName: input });
  },
  setCreateUserDir: (input) => {
    // 사용자 디렉터리 생성
    set({ createUserDir: input });
  },

  // main dir 플랜 불러오기
  getMainPlans: async () => {
    const res = await dirAPI.getAllPlans();
    if (res.httpStatus === 200) {
      set({ mainPlans: res });
    } else {
      console.log('에러 발생');
    }
  },
  // user dir 목록 불러오기
  getUserDirs: async () => {
    const res = await dirAPI.getUserDirs();
    if (res.httpStatus === 200) {
      set({ userDirs: res });
    } else {
      console.log('에러 발생');
    }
  },
  // trash dir 플랜 불러오기
  getTrashPlans: async () => {
    const res = await dirAPI.getTrashPlans();
    if (res.httpStatus === 200) {
      set({ trashPlans: res });
    } else {
      console.log('에러 발생');
    }
  },
  // 모든 보관함 플랜 삭제
  postTrash: async () => {
    const checkedPlans = get().checkedPlans;
    if (checkedPlans.length > 0) {
      const res = await dirAPI.postTrash(checkedPlans);
      if (res.httpStatus === 201) {
        set({ checkedPlans: [] });
        //n개 이상의 플랜 복원 시 데이터 새로 불러오는 것이 낫다고 생각,,
        const t = await dirAPI.getTrashPlans();
        const m = await dirAPI.getAllPlans();
        const d = await dirAPI.getUserDirs();
        if (
          t.httpStatus === 200 &&
          m.httpStatus === 200 &&
          d.httpStatus === 200
        ) {
          set({ currentDirId: 't' });
          set({ mainPlans: m });
          set({ trashPlans: t });
          set({ userDirs: d });
        }
      }
    } else {
      alert('선택된 플랜이 없습니다.');
    }
  },
  // 사용자 보관함 플랜 삭제
  userTrash: async () => {
    const checkedPlans = get().checkedPlans;
    const currentDirId = get().currentDirId;
    if (checkedPlans.length > 0) {
      const res = await dirAPI.userTrash(checkedPlans, currentDirId);
      console.log(res);
      if (res.httpStatus === 204) {
        set({ checkedPlans: [] });
        //n개 이상의 플랜 복원 시 데이터 새로 불러오는 것이 낫다고 생각,,
        const m = await dirAPI.getAllPlans();
        const d = await dirAPI.getUserDirs();
        if (m.httpStatus === 200 && d.httpStatus === 200) {
          set({ currentDirId: currentDirId });
          set({ mainPlans: m });
          set({ userDirs: d });
        }
      }
    } else {
      alert('선택된 플랜이 없습니다.');
    }
  },
  // 플랜 담기
  postMovePlans: async (dirId) => {
    const checkedPlans = get().checkedPlans;
    if (checkedPlans.length > 0) {
      const res = await dirAPI.movePlan(checkedPlans, dirId);
      if (res.httpStatus === 201) {
        set({ checkedPlans: [] });
        const m = await dirAPI.getAllPlans();
        const d = await dirAPI.getUserDirs();
        if (m.httpStatus === 200 && d.httpStatus === 200) {
          set({ currentDirId: 'm' });
          set({ mainPlans: m });
          set({ userDirs: d });
        }
      }
    } else {
      alert('선택된 플랜이 없습니다.');
    }
  },
  // 플랜 복원
  postRevert: async () => {
    const checkedPlans = get().checkedPlans;
    if (checkedPlans.length > 0) {
      const res = await dirAPI.postRevert(checkedPlans);
      if (res.httpStatus === 201) {
        set({ checkedPlans: [] });
        const t = await dirAPI.getTrashPlans();
        const m = await dirAPI.getAllPlans();
        const d = await dirAPI.getUserDirs();
        if (
          t.httpStatus === 200 &&
          m.httpStatus === 200 &&
          d.httpStatus === 200
        ) {
          set({ currentDirId: 'm' });
          set({ trashPlans: t });
          set({ mainPlans: m });
          set({ userDirs: d });
        }
      }
    } else {
      alert('선택된 플랜이 없습니다.');
    }
  },
  // 플랜 영구 삭제
  deletePlan: async () => {
    const checkedPlans = get().checkedPlans;
    if (checkedPlans.length > 0) {
      const res = await dirAPI.deletePlan(checkedPlans);
      if (res.httpStatus === 204) {
        set({ checkedPlans: [] });
        const t = await dirAPI.getTrashPlans();
        if (t.httpStatus === 200) {
          set({ currentDirId: 't' });
          set({ trashPlans: t });
        }
      }
    } else {
      alert('선택된 플랜이 없습니다.');
    }
  },
  // userdir 생성
  postCreateDir: async () => {
    const createUserDir = get().createUserDir;
    const res = await dirAPI.createDir(createUserDir);
    if (res.httpStatus === 201) {
      set((state) => ({
        userDirs: {
          ...state.userDirs,
          planCount: [...state.userDirs.planCount, 0],
          mainUserDirectory: [
            ...state.userDirs.mainUserDirectory,
            {
              userDirectoryId: res.userDirectoryId,
              directoryName: createUserDir,
            },
          ],
        },
      }));
      set({ createUserDir: '' });
    } else if (res.httpStatus === 400) {
      alert(res.message);
    }
  },
  // userdir 삭제
  postDeleteDir: async () => {
    const currentDirId = get().currentDirId;
    const res = await dirAPI.deleteDir([currentDirId]);
    const userDirs = get().userDirs;
    const dirInd = userDirs.mainUserDirectory.findIndex(
      (e) => e.userDirectoryId === currentDirId,
    );
    if (res.httpStatus === 204) {
      set({ currentDirId: 'm' });
      set((state) => ({
        userDirs: {
          ...state.userDirs,
          planCount: [
            ...state.userDirs.planCount.slice(0, dirInd),
            ...state.userDirs.planCount.slice(dirInd + 1),
          ],
          mainUserDirectory: [
            ...state.userDirs.mainUserDirectory.slice(0, dirInd),
            ...state.userDirs.mainUserDirectory.slice(dirInd + 1),
          ],
        },
      }));
    }
  },
  // userDir 이름 변경
  postChangeDirName: async () => {
    const currentDirId = get().currentDirId;
    const changeDirName = get().changeDirName;
    const userDirs = get().userDirs;
    const res = await dirAPI.postDirName(currentDirId, changeDirName);
    const dirInd = userDirs.mainUserDirectory.findIndex(
      (e) => e.userDirectoryId === currentDirId,
    );
    userDirs.mainUserDirectory[dirInd].directoryName = changeDirName;
    if (res.httpStatus === 201) {
      userDirs.mainUserDirectory[dirInd].directoryName = changeDirName;
      set({ currentDirId: currentDirId });
      set({ changeDirName: '' });
    } else if (res.httpStatus === 400) {
      alert(res.message);
    }
  },
}));
