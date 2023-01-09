export const SET_REGIONAL_LOCATION_MONITORING = "setRegionalLocMonitoring";
export const SET_WITEL_LOCATION_MONITORING = "setWitelLocMonitoring";
export const SET_DATEL_LOCATION_MONITORING = "setDatelLocMonitoring";
export const SET_LOCATION_LOCATION_MONITORING = "setLocationLocMonitoring";
export const SET_TAGS_LOCATION_MONITORING = "setTagsLocMonitoring";
export const SET_RTU_STATUS_LOCATION_MONITORING = "setRtuStatusLocMonitoring";

export default {
  state: {
    filterRtu: {
      regional: null,
      witel: null,
      datel: null,
      location: null,
      tags: null,
      rtuStatus: null,
    },
  },
  getters: {
    getIdRegionalLocMonitoring(state) {
      return state.filterRtu.regional;
    },
    getIdWitelLocMonitoring(state) {
      return state.filterRtu.witel;
    },
    getIdDatelLocMonitoring(state) {
      return state.filterRtu.datel;
    },
    getIdLocationLocMonitoring(state) {
      return state.filterRtu.location;
    },
    getIdTagsLocMonitoring(state) {
      return state.filterRtu.tags;
    },
    getRtuStatusLocMonitoring(state) {
      return state.filterRtu.rtuStatus;
    },
  },
  mutations: {
    [SET_REGIONAL_LOCATION_MONITORING](state, payload) {
      state.filterRtu.regional = payload;
    },
    [SET_WITEL_LOCATION_MONITORING](state, payload) {
      state.filterRtu.witel = payload;
    },
    [SET_DATEL_LOCATION_MONITORING](state, payload) {
      state.filterRtu.datel = payload;
    },
    [SET_LOCATION_LOCATION_MONITORING](state, payload) {
      state.filterRtu.location = payload;
    },
    [SET_TAGS_LOCATION_MONITORING](state, payload) {
      state.filterRtu.tags = payload;
    },
    [SET_RTU_STATUS_LOCATION_MONITORING](state, payload) {
      state.filterRtu.rtuStatus = payload;
    },
  },
  actions: {
    [SET_REGIONAL_LOCATION_MONITORING](state, payload) {
      state.commit(SET_REGIONAL_LOCATION_MONITORING, payload);
    },
    [SET_WITEL_LOCATION_MONITORING](state, payload) {
      state.commit(SET_WITEL_LOCATION_MONITORING, payload);
    },
    [SET_DATEL_LOCATION_MONITORING](state, payload) {
      state.commit(SET_DATEL_LOCATION_MONITORING, payload);
    },
    [SET_LOCATION_LOCATION_MONITORING](state, payload) {
      state.commit(SET_LOCATION_LOCATION_MONITORING, payload);
    },
    [SET_TAGS_LOCATION_MONITORING](state, payload) {
      state.commit(SET_TAGS_LOCATION_MONITORING, payload);
    },
    [SET_RTU_STATUS_LOCATION_MONITORING](state, payload) {
      state.commit(SET_RTU_STATUS_LOCATION_MONITORING, payload);
    },
  },
};
