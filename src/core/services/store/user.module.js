export const SET_USERNAME = "setDataUsername";

export default {
  state: {
    dataUsername: "",
  },
  getters: {
    setDataUsername(state) {
      return state.dataUsername;
    },
  },
  mutations: {
    [SET_USERNAME](state, payload) {
      state.dataUsername = payload;
    },
  },
  actions: {
    [SET_USERNAME](state, payload) {
      state.commit(SET_USERNAME, payload);
    },
  },
};
