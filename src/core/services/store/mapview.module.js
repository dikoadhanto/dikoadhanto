export const SET_REGIONAL_MAP = "setRegionalMap";
export const SET_WITEL_MAP = "setWitelMap";
export const SET_DATEL_MAP = "setDatelMap";
export const SET_LOCATION_MAP = "setLocationMap";
export const SET_TAGS_MAP = "setTagsMap";
export const SET_REGIONAL_ID_MAP = "setRegionalIdMap";
export const SET_WITEL_ID_MAP = "setWitelIdMap";
export const SET_RTU_STATUS_SENSOR_MAP = "setRtuStatusSensorMap";

export default {
  state: {
    filterMap: {
      regional: null,
      witel: null,
      datel: null,
      location: null,
      tags: null,
    },
    regionalIdMap: null,
    witelIdMap: null,
    rtuStatusMap: "",
  },
  getters: {
    idRegionalMap(state) {
      return state.filterMap.regional;
    },
    idWitelMap(state) {
      return state.filterMap.witel;
    },
    idDatelMap(state) {
      return state.filterMap.datel;
    },
    idLocationMap(state) {
      return state.filterMap.location;
    },
    idTagsMap(state) {
      return state.filterMap.tags;
    },
    regionalIdMap(state) {
      return state.regionalIdMap;
    },
    witelIdMap(state) {
      return state.witelIdMap;
    },
    getRtuStatusSensorMap(state) {
      return state.rtuStatusMap;
    },
  },
  mutations: {
    [SET_REGIONAL_MAP](state, payload) {
      state.filterMap.regional = payload;
    },
    [SET_WITEL_MAP](state, payload) {
      state.filterMap.witel = payload;
    },
    [SET_DATEL_MAP](state, payload) {
      state.filterMap.datel = payload;
    },
    [SET_LOCATION_MAP](state, payload) {
      state.filterMap.location = payload;
    },
    [SET_TAGS_MAP](state, payload) {
      state.filterMap.tags = payload;
    },
    [SET_REGIONAL_ID_MAP](state, payload) {
      state.regionalIdMap = payload;
    },
    [SET_WITEL_ID_MAP](state, payload) {
      state.witelIdMap = payload;
    },
    [SET_RTU_STATUS_SENSOR_MAP](state, payload) {
      state.rtuStatusMap = payload;
    },
  },
  actions: {
    [SET_REGIONAL_MAP](state, payload) {
      state.commit(SET_REGIONAL_MAP, payload);
    },
    [SET_WITEL_MAP](state, payload) {
      state.commit(SET_WITEL_MAP, payload);
    },
    [SET_DATEL_MAP](state, payload) {
      state.commit(SET_DATEL_MAP, payload);
    },
    [SET_LOCATION_MAP](state, payload) {
      state.commit(SET_LOCATION_MAP, payload);
    },
    [SET_TAGS_MAP](state, payload) {
      state.commit(SET_TAGS_MAP, payload);
    },
    [SET_REGIONAL_ID_MAP](state, payload) {
      state.commit(SET_REGIONAL_ID_MAP, payload);
    },
    [SET_WITEL_ID_MAP](state, payload) {
      state.commit(SET_WITEL_ID_MAP, payload);
    },
    [SET_RTU_STATUS_SENSOR_MAP](state, payload) {
      state.commit(SET_RTU_STATUS_SENSOR_MAP, payload);
    },
  },
};
