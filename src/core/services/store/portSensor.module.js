export const SET_REGIONAL_SENSOR = "setRegionalSensor";
export const SET_WITEL_SENSOR = "setWitelSensor";
export const SET_DATEL_SENSOR = "setDatelSensor";
export const SET_LOCATION_SENSOR = "setLocationSensor";
export const SET_TAGS_SENSOR = "setTagsSensor";
export const SET_ALARM_TYPE_SENSOR = "setAlarmTypeSensor";
export const SET_RTU_IDS_SENSOR = "setRtuIdsSensor";
export const SET_RTU_STATUS_SENSOR = "setRtuStatusSensor";

export default {
  state: {
    filterRtu: {
      regional: null,
      witel: null,
      datel: null,
      location: null,
      tags: null,
      alarmType: "off",
    },
    rtuIds: null,
    rtuStatus: "",
  },
  getters: {
    getRtuPortSensor(state) {
      return state.rtuPort;
    },
    getIdRegionalSensor(state) {
      return state.filterRtu.regional;
    },
    getIdWitelSensor(state) {
      return state.filterRtu.witel;
    },
    getIdDatelSensor(state) {
      return state.filterRtu.datel;
    },
    getIdLocationSensor(state) {
      return state.filterRtu.location;
    },
    getIdTagsSensor(state) {
      return state.filterRtu.tags;
    },
    getIdAlarmTypeSensor(state) {
      return state.filterRtu.alarmType;
    },
    getRtuIdsSensor(state) {
      return state.rtuIds;
    },
    getRtuStatusSensor(state) {
      return state.rtuStatus;
    },
  },
  mutations: {
    [SET_REGIONAL_SENSOR](state, payload) {
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
    [SET_WITEL_SENSOR](state, payload) {
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
    [SET_DATEL_SENSOR](state, payload) {
      if (payload !== null) {
        if (payload.length === 0) {
          state.filterRtu.datel = null;
        } else {
          state.filterRtu.datel = payload;
        }
      } else {
        state.filterRtu.datel = payload;
      }
    },
    [SET_LOCATION_SENSOR](state, payload) {
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
    [SET_TAGS_SENSOR](state, payload) {
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
    [SET_ALARM_TYPE_SENSOR](state, payload) {
      if (payload == "") {
        state.filterRtu.alarmType = null;
      } else {
        state.filterRtu.alarmType = payload;
      }
    },
    [SET_RTU_IDS_SENSOR](state, payload) {
      state.rtuIds = payload;
    },
    [SET_RTU_STATUS_SENSOR](state, payload) {
      state.rtuStatus = payload;
    },
  },
  actions: {
    [SET_REGIONAL_SENSOR](state, payload) {
      state.commit(SET_REGIONAL_SENSOR, payload);
    },
    [SET_WITEL_SENSOR](state, payload) {
      state.commit(SET_WITEL_SENSOR, payload);
    },
    [SET_DATEL_SENSOR](state, payload) {
      state.commit(SET_DATEL_SENSOR, payload);
    },
    [SET_LOCATION_SENSOR](state, payload) {
      state.commit(SET_LOCATION_SENSOR, payload);
    },
    [SET_TAGS_SENSOR](state, payload) {
      state.commit(SET_TAGS_SENSOR, payload);
    },
    [SET_ALARM_TYPE_SENSOR](state, payload) {
      state.commit(SET_ALARM_TYPE_SENSOR, payload);
    },
    [SET_RTU_IDS_SENSOR](state, payload) {
      state.commit(SET_RTU_IDS_SENSOR, payload);
    },
    [SET_RTU_STATUS_SENSOR](state, payload) {
      state.commit(SET_RTU_STATUS_SENSOR, payload);
    },
  },
};
