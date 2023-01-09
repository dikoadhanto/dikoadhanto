export const SET_REGIONAL_DETAIL_ALARM = "setRegionalDetailAlarm";
export const SET_WITEL_DETAIL_ALARM = "setWitelDetailAlarm";
export const SET_DATEL_DETAIL_ALARM = "setDatelDetailAlarm";
export const SET_LOCATION_DETAIL_ALARM = "setLocationDetailAlarm";
export const SET_TAGS_DETAIL_ALARM = "setTagsDetailAlarm";
export const SET_START_DATE_DETAIL_ALARM = "setStartDateDetailAlarm";
export const SET_END_DATE_DETAIL_ALARM = "setEndDateDetailAlarm";
export const SET_DEVICE_DETAIL_ALARM = "setDeviceDetailAlarm";

export default {
  state: {
    filter: {
      regional: null,
      witel: null,
      datel: null,
      location: null,
      tags: null,
      startDate: null,
      endDate: null,
      device_id: null,
    },
  },
  getters: {
    getIdRegionalDetailAlarm(state) {
      return state.filter.regional;
    },
    getIdWitelDetailAlarm(state) {
      return state.filter.witel;
    },
    getIdDatelDetailAlarm(state) {
      return state.filter.datel;
    },
    getIdLocationDetailAlarm(state) {
      return state.filter.location;
    },
    getIdTagsDetailAlarm(state) {
      return state.filter.tags;
    },
    getStartDateDetailAlarm(state) {
      return state.filter.startDate;
    },
    getEndDateDetailAlarm(state) {
      return state.filter.endDate;
    },
    getDeviceDetailAlarm(state) {
      return state.filter.device_id;
    },
  },
  mutations: {
    [SET_REGIONAL_DETAIL_ALARM](state, payload) {
      if (payload.length) {
        state.filter.regional = payload;
      } else {
        state.filter.regional = null;
      }
    },
    [SET_WITEL_DETAIL_ALARM](state, payload) {
      if (payload.length) {
        state.filter.witel = payload;
      } else {
        state.filter.witel = null;
      }
    },
    [SET_DATEL_DETAIL_ALARM](state, payload) {
      if (payload.length) {
        state.filter.datel = payload;
      } else {
        state.filter.datel = null;
      }
    },
    [SET_LOCATION_DETAIL_ALARM](state, payload) {
      if (payload.length) {
        state.filter.location = payload;
      } else {
        state.filter.location = null;
      }
    },
    [SET_TAGS_DETAIL_ALARM](state, payload) {
      if (payload.length) {
        state.filter.tags = payload;
      } else {
        state.filter.tags = null;
      }
    },
    [SET_START_DATE_DETAIL_ALARM](state, payload) {
      if (payload == "") {
        state.filter.startDate = null;
      } else {
        state.filter.startDate = payload;
      }
    },
    [SET_END_DATE_DETAIL_ALARM](state, payload) {
      if (payload == "") {
        state.filter.endDate = null;
      } else {
        state.filter.endDate = payload;
      }
    },
    [SET_DEVICE_DETAIL_ALARM](state, payload) {
      if (payload == "") {
        state.filter.device_id = null;
      } else {
        state.filter.device_id = payload;
      }
    },
  },
  actions: {
    [SET_REGIONAL_DETAIL_ALARM](state, payload) {
      state.commit(SET_REGIONAL_DETAIL_ALARM, payload);
    },
    [SET_WITEL_DETAIL_ALARM](state, payload) {
      state.commit(SET_WITEL_DETAIL_ALARM, payload);
    },
    [SET_DATEL_DETAIL_ALARM](state, payload) {
      state.commit(SET_DATEL_DETAIL_ALARM, payload);
    },
    [SET_LOCATION_DETAIL_ALARM](state, payload) {
      state.commit(SET_LOCATION_DETAIL_ALARM, payload);
    },
    [SET_TAGS_DETAIL_ALARM](state, payload) {
      state.commit(SET_TAGS_DETAIL_ALARM, payload);
    },
    [SET_START_DATE_DETAIL_ALARM](state, payload) {
      state.commit(SET_START_DATE_DETAIL_ALARM, payload);
    },
    [SET_END_DATE_DETAIL_ALARM](state, payload) {
      state.commit(SET_END_DATE_DETAIL_ALARM, payload);
    },
    [SET_DEVICE_DETAIL_ALARM](state, payload) {
      state.commit(SET_DEVICE_DETAIL_ALARM, payload);
    },
  },
};
