export const SET_REGIONAL_AVAI_RTU = "setRegionalAvaiRtu";
export const SET_WITEL_AVAI_RTU = "setWitelAvaiRtu";
export const SET_DATEL_AVAI_RTU = "setDatelAvaiRtu";
export const SET_LOCATION_AVAI_RTU = "setLocationAvaiRtu";
export const SET_TAGS_AVAI_RTU = "setTagsAvaiRtu";
export const SET_START_DATE_AVAI_RTU = "setStartDateAvaiRtu";
export const SET_END_DATE_AVAI_RTU = "setEndDateAvaiRtu";
export const SET_ID_RTU_DOWN = "setIdRtuDown";
export const SET_ID_RTU_NORMAL = "setIdRtuNormal";
export const SET_ID_RTU_ALERT = "setIdRtuAlert";
// flag = 'regional','witel','datel','total_alert
export const SET_FLAG_AVAI_RTU = "setFlagAvaiRtu";

export default {
  state: {
    filter: {
      regional: null,
      witel: null,
      datel: null,
      location: null,
      tags: null,
      startDate: Date.now() - 86400000,
      endDate: Date.now(),
      flag: "regional",
    },
    idRtuDown: [],
    idRtuNormal: [],
    idRtuAlert: [],
  },
  getters: {
    getIdRtuDown(state) {
      return state.idRtuDown;
    },
    getIdRtuNormal(state) {
      return state.idRtuNormal;
    },
    getIdRtuAlert(state) {
      return state.idRtuAlert;
    },
    getIdRegionalAvaiRtu(state) {
      return state.filter.regional;
    },
    getIdWitelAvaiRtu(state) {
      return state.filter.witel;
    },
    getIdDatelAvaiRtu(state) {
      return state.filter.datel;
    },
    getIdLocationAvaiRtu(state) {
      return state.filter.location;
    },
    getIdTagsAvaiRtu(state) {
      return state.filter.tags;
    },
    getStartDateAvaiRtu(state) {
      return state.filter.startDate;
    },
    getEndDateAvaiRtu(state) {
      return state.filter.endDate;
    },
    getFlagAvaiRtu(state) {
      return state.filter.flag;
    },
  },
  mutations: {
    [SET_ID_RTU_DOWN](state, payload) {
      if (payload == null || payload == undefined) {
        state.idRtuDown = [];
      } else {
        state.idRtuDown = payload;
      }
    },
    [SET_ID_RTU_NORMAL](state, payload) {
      if (payload == null || payload == undefined) {
        state.idRtuNormal = [];
      } else {
        state.idRtuNormal = payload;
      }
    },
    [SET_ID_RTU_ALERT](state, payload) {
      if (payload == null || payload == undefined) {
        state.idRtuAlert = [];
      } else {
        state.idRtuAlert = payload;
      }
    },
    [SET_REGIONAL_AVAI_RTU](state, payload) {
      if (payload.length === 0) {
        state.filter.regional = null;
      } else {
        state.filter.regional = payload;
      }
    },
    [SET_WITEL_AVAI_RTU](state, payload) {
      if (payload.length === 0) {
        state.filter.witel = null;
      } else {
        state.filter.witel = payload;
      }
    },
    [SET_DATEL_AVAI_RTU](state, payload) {
      if (payload.length === 0) {
        state.filter.datel = null;
      } else {
        state.filter.datel = payload;
      }
    },
    [SET_LOCATION_AVAI_RTU](state, payload) {
      if (payload.length === 0) {
        state.filter.location = null;
      } else {
        state.filter.location = payload;
      }
    },
    [SET_TAGS_AVAI_RTU](state, payload) {
      if (payload.length === 0) {
        state.filter.tags = null;
      } else {
        state.filter.tags = payload;
      }
    },
    [SET_START_DATE_AVAI_RTU](state, payload) {
      if (payload == "") {
        state.filter.startDate = Date.now() - 86400000;
      } else {
        state.filter.startDate = payload;
      }
    },
    [SET_END_DATE_AVAI_RTU](state, payload) {
      if (payload == "") {
        state.filter.endDate = Date.now();
      } else {
        state.filter.endDate = payload;
      }
    },
    [SET_FLAG_AVAI_RTU](state, payload) {
      state.filter.flag = payload;
    },
  },
  actions: {
    [SET_ID_RTU_DOWN](state, payload) {
      state.commit(SET_ID_RTU_DOWN, payload);
    },
    [SET_ID_RTU_NORMAL](state, payload) {
      state.commit(SET_ID_RTU_NORMAL, payload);
    },
    [SET_ID_RTU_ALERT](state, payload) {
      state.commit(SET_ID_RTU_ALERT, payload);
    },
    [SET_REGIONAL_AVAI_RTU](state, payload) {
      state.commit(SET_REGIONAL_AVAI_RTU, payload);
    },
    [SET_WITEL_AVAI_RTU](state, payload) {
      state.commit(SET_WITEL_AVAI_RTU, payload);
    },
    [SET_DATEL_AVAI_RTU](state, payload) {
      state.commit(SET_DATEL_AVAI_RTU, payload);
    },
    [SET_LOCATION_AVAI_RTU](state, payload) {
      state.commit(SET_LOCATION_AVAI_RTU, payload);
    },
    [SET_TAGS_AVAI_RTU](state, payload) {
      state.commit(SET_TAGS_AVAI_RTU, payload);
    },
    [SET_START_DATE_AVAI_RTU](state, payload) {
      state.commit(SET_START_DATE_AVAI_RTU, payload);
    },
    [SET_END_DATE_AVAI_RTU](state, payload) {
      state.commit(SET_END_DATE_AVAI_RTU, payload);
    },
    [SET_FLAG_AVAI_RTU](state, payload) {
      state.commit(SET_FLAG_AVAI_RTU, payload);
    },
  },
};
