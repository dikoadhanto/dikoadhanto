export const SET_CURRENT_PAGE = "setCurrentPage";
export const SET_LAST_PAGE = "setLastPage";
export const SET_PER_PAGE = "setPerPage";
export const SET_TOTAL_DATA = "setTotalData";
export const SET_DEFAULT_PAGINATION = "setDefaultPagination";

export default {
  state: {
    currentPage: 1,
    lastPage: 1,
    perPage: 10,
    totalData: 0,
  },
  getters: {
    currentPage(state) {
      return state.currentPage;
    },
    lastPage(state) {
      return state.lastPage;
    },
    perPage(state) {
      return state.perPage;
    },
    totalData(state) {
      return state.totalData;
    },
  },
  mutations: {
    [SET_CURRENT_PAGE](state, payload) {
      state.currentPage = Number(payload);
    },
    [SET_LAST_PAGE](state, payload) {
      state.lastPage = Number(payload);
    },
    [SET_PER_PAGE](state, payload) {
      state.perPage = payload == "all" ? payload : Number(payload);
    },
    [SET_TOTAL_DATA](state, payload) {
      state.totalData = Number(payload);
    },
    [SET_DEFAULT_PAGINATION](state) {
      state.currentPage = 1;
      state.lastPage = 1;
      state.perPage = 10;
      state.totalData = 0;
    },
  },
  actions: {
    [SET_CURRENT_PAGE](state, payload) {
      state.commit(SET_CURRENT_PAGE, payload);
    },
    [SET_LAST_PAGE](state, payload) {
      state.commit(SET_LAST_PAGE, payload);
    },
    [SET_PER_PAGE](state, payload) {
      state.commit(SET_PER_PAGE, payload);
    },
    [SET_TOTAL_DATA](state, payload) {
      state.commit(SET_TOTAL_DATA, payload);
    },
    [SET_DEFAULT_PAGINATION](state) {
      state.commit(SET_DEFAULT_PAGINATION);
    },
  },
};
