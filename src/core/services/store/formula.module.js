export const SET_ID_FORMULA_RTU = "setIdFormulaRtu";

export default {
  state: {
    idFormulaRtu: "",
  },
  getters: {
    getIdFormulaRtu(state) {
      return state.idFormulaRtu;
    },
  },
  mutations: {
    [SET_ID_FORMULA_RTU](state, payload) {
      state.idFormulaRtu = payload;
    },
  },
  actions: {
    [SET_ID_FORMULA_RTU](state, payload) {
      state.commit(SET_ID_FORMULA_RTU, payload);
    },
  },
};
