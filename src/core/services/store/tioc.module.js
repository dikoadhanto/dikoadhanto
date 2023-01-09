export const SET_WITEL_TIOC = "setWitelTioc";
export const SET_LEVEL_TIOC = "setLevelTioc";
export const SET_LOCNAME_TIOC = "setLocnameTioc";
export const SET_REGIONAL_TIOC = "setRegionalTioc";
export const SET_STATUS_RTU_TIOC = "setStatusRtuTioc";
export const SET_DATA_OPTIONS_TIOC = "setDataOptionsTioc";
export const SET_REGIONAL_NAME_TIOC = "setRegionalNameTioc";

export default {
  state: {
    idRegional: null,
    idWitel: null,
    locName: "",
    level: "regional",
    dataOptions: [],
    regionalName: "nasional",
    statusRtu: "",
  },
  getters: {
    getIdRegionalTioc(state) {
      return state.idRegional;
    },
    getIdWitelTioc(state) {
      return state.idWitel;
    },
    getLocNameTioc(state) {
      return state.locName;
    },
    getRegionalNameTioc(state) {
      return state.regionalName;
    },
    getLevelTioc(state) {
      return state.level;
    },
    getDataOptionsTioc(state) {
      return state.dataOptions;
    },
    getStatusRtuTioc(state) {
      return state.statusRtu;
    },
  },
  mutations: {
    [SET_REGIONAL_TIOC](state, payload) {
      state.idRegional = payload;
    },
    [SET_WITEL_TIOC](state, payload) {
      state.idWitel = payload;
    },
    [SET_LEVEL_TIOC](state, payload) {
      state.level = payload;
    },
    [SET_DATA_OPTIONS_TIOC](state, payload) {
      state.dataOptions = payload;
    },
    [SET_LOCNAME_TIOC](state, payload) {
      state.locName = payload;
    },
    [SET_REGIONAL_NAME_TIOC](state, payload) {
      state.regionalName = payload;
    },
    [SET_STATUS_RTU_TIOC](state, payload) {
      state.statusRtu = payload;
    },
  },
  actions: {
    [SET_REGIONAL_TIOC](state, payload) {
      state.commit(SET_REGIONAL_TIOC, payload);
    },
    [SET_WITEL_TIOC](state, payload) {
      state.commit(SET_WITEL_TIOC, payload);
    },
    [SET_LEVEL_TIOC](state, payload) {
      state.commit(SET_LEVEL_TIOC, payload);
    },
    [SET_DATA_OPTIONS_TIOC](state, payload) {
      state.commit(SET_DATA_OPTIONS_TIOC, payload);
    },
    [SET_LOCNAME_TIOC](state, payload) {
      state.commit(SET_LOCNAME_TIOC, payload);
    },
    [SET_REGIONAL_NAME_TIOC](state, payload) {
      state.commit(SET_REGIONAL_NAME_TIOC, payload);
    },
    [SET_STATUS_RTU_TIOC](state, payload) {
      state.commit(SET_STATUS_RTU_TIOC, payload);
    },
  },
};
