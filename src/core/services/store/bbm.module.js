export const SET_ID_REG_BBM = "setIdRegionalBbm";
export const SET_ID_WITEL_BBM = "setIdWitelBbm";
export const SET_ID_TYPE_BBM = "setIdTypeBbm";
export const SET_ID_TAGS_BBM = "setIdTagsBbm";
export const SET_ACTIVE_PAGE_BBM = "setActivePageBbm";
export const SET_DATA_BBM = "setDataBbm";

export default {
  state: {
    filter: {
      idRegional: null,
      idWitel: null,
      idType: null,
      idTags: null,
    },
    activePage: "",
    dataBbm: [],
  },
  getters: {
    getIdRegionalBbm(state) {
      return state.filter.idRegional;
    },
    getIdWitelBbm(state) {
      return state.filter.idWitel;
    },
    getIdTypeBbm(state) {
      return state.filter.idType;
    },
    getIdTagsBbm(state) {
      return state.filter.idTags;
    },
    getActivePageBbm(state) {
      return state.activePage;
    },
    getDataBbm(state) {
      return state.dataBbm;
    },
  },
  mutations: {
    [SET_ID_REG_BBM](state, payload) {
      state.filter.idRegional = payload;
    },
    [SET_ID_WITEL_BBM](state, payload) {
      state.filter.idWitel = payload;
    },
    [SET_ID_TYPE_BBM](state, payload) {
      state.filter.idType = payload;
    },
    [SET_ID_TAGS_BBM](state, payload) {
      if (payload.length > 0) {
        state.filter.idTags = payload;
      } else {
        state.filter.idTags = null;
      }
    },
    [SET_ACTIVE_PAGE_BBM](state, payload) {
      state.activePage = payload;
    },
    [SET_DATA_BBM](state, payload) {
      state.dataBbm = payload;
    },
  },
  actions: {
    [SET_ID_REG_BBM](state, payload) {
      state.commit(SET_ID_REG_BBM, payload);
    },
    [SET_ID_WITEL_BBM](state, payload) {
      state.commit(SET_ID_WITEL_BBM, payload);
    },
    [SET_ID_TYPE_BBM](state, payload) {
      state.commit(SET_ID_TYPE_BBM, payload);
    },
    [SET_ID_TAGS_BBM](state, payload) {
      state.commit(SET_ID_TAGS_BBM, payload);
    },
    [SET_ACTIVE_PAGE_BBM](state, payload) {
      state.commit(SET_ACTIVE_PAGE_BBM, payload);
    },
    [SET_DATA_BBM](state, payload) {
      state.commit(SET_DATA_BBM, payload);
    },
  },
};
