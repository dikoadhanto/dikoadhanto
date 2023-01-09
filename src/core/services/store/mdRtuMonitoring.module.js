export const SET_REGIONAL_MD_RTU = "setRegionalMdRtu";
export const SET_WITEL_MD_RTU = "setWitelMdRtu";
export const SET_LOCATION_MD_RTU = "setLocationMdRtu";
export const SET_TAGS_MD_RTU = "setTagsMdRtu";
export const SET_PAGE_MD_RTU = "setPageMdRtu";
export const SET_LEVEL_MD_RTU = "setLevelMdRtu";

export default {
  state: {
    filterRtu: {
      regional: null,
      witel: null,
      location: null,
      tags: null,
    },
    page: "regional",
    level: 1,
  },
  getters: {
    getIdRegionalMdRtu(state) {
      return state.filterRtu.regional;
    },
    getIdWitelMdRtu(state) {
      return state.filterRtu.witel;
    },
    getIdLocationMdRtu(state) {
      return state.filterRtu.location;
    },
    getIdTagsMdRtu(state) {
      return state.filterRtu.tags;
    },
    getPageMdRtu(state) {
      return state.page;
    },
    getLevelMdRtu(state) {
      return state.level;
    },
  },
  mutations: {
    [SET_REGIONAL_MD_RTU](state, payload) {
      if (payload !== null) {
        if (payload.length === 0) {
          state.filterRtu.regional = null;
        } else {
          state.filterRtu.regional = payload;
        }
      } else {
        state.filterRtu.regional = payload;
      }
    },
    [SET_WITEL_MD_RTU](state, payload) {
      if (payload !== null) {
        if (payload.length === 0) {
          state.filterRtu.witel = null;
        } else {
          state.filterRtu.witel = payload;
        }
      } else {
        state.filterRtu.witel = payload;
      }
    },
    [SET_LOCATION_MD_RTU](state, payload) {
      if (payload !== null) {
        if (payload.length === 0) {
          state.filterRtu.location = null;
        } else {
          state.filterRtu.location = payload;
        }
      } else {
        state.filterRtu.location = payload;
      }
    },
    [SET_TAGS_MD_RTU](state, payload) {
      if (payload !== null) {
        if (payload.length === 0) {
          state.filterRtu.tags = null;
        } else {
          state.filterRtu.tags = payload;
        }
      } else {
        state.filterRtu.tags = payload;
      }
    },
    [SET_PAGE_MD_RTU](state, payload) {
      state.page = payload;
    },
    [SET_LEVEL_MD_RTU](state, payload) {
      state.level = payload;
    },
  },
  actions: {
    [SET_REGIONAL_MD_RTU](state, payload) {
      state.commit(SET_REGIONAL_MD_RTU, payload);
    },
    [SET_WITEL_MD_RTU](state, payload) {
      state.commit(SET_WITEL_MD_RTU, payload);
    },
    [SET_LOCATION_MD_RTU](state, payload) {
      state.commit(SET_LOCATION_MD_RTU, payload);
    },
    [SET_TAGS_MD_RTU](state, payload) {
      state.commit(SET_TAGS_MD_RTU, payload);
    },
    [SET_PAGE_MD_RTU](state, payload) {
      state.commit(SET_PAGE_MD_RTU, payload);
    },
    [SET_LEVEL_MD_RTU](state, payload) {
      state.commit(SET_LEVEL_MD_RTU, payload);
    },
  },
};
