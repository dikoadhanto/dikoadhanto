// mutation types
export const SET_HEAD_TABLE = "setHeadTable";

export default {
  state: {
    headTable: "headRegional",
  },
  getters: {
    /**
     * Get list of headTable for current page
     * @param state
     * @returns {*}
     */
    headTable(state) {
      return state.headTable;
    },
  },
  mutations: {
    [SET_HEAD_TABLE](state, payload) {
      state.headTable = payload;
    },
  },
  actions: {
    /**
     *
     * @param state
     * @param payload
     */
    [SET_HEAD_TABLE](state, payload) {
      state.commit(SET_HEAD_TABLE, payload);
    },
  },
};
