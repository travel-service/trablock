import create from "zustand";

export const filterStore = create((set) => ({

  attIsCheck: false,
  culIsCheck: false,
  fesIsCheck: false,
  lepIsCheck: false,
  lodIsCheck: false,
  resIsCheck: false,
  selectedOnly: false,

  changeAttState: () => set((state) => ({ attIsCheck: !state.attIsCheck})),
  changeCulState: () => set((state) => ({ culIsCheck: !state.culIsCheck})),
  changeFesState: () => set((state) => ({ fesIsCheck: !state.fesIsCheck})),
  changeLepState: () => set((state) => ({ lepIsCheck: !state.lepIsCheck})),
  changeLodState: () => set((state) => ({ lodIsCheck: !state.lodIsCheck})),
  changeResState: () => set((state) => ({ resIsCheck: !state.resIsCheck})),
  changeSelState: () => set((state) => ({ selectedOnly: !state.selectedOnly}))

}))