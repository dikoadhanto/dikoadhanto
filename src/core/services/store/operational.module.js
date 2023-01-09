export const SET_RTU_PORT = "setRtu";
export const SET_REGIONAL = "setRegional";
export const SET_WITEL = "setWitel";
export const SET_DATEL = "setDatel";
export const SET_LOCATION = "setLocation";
export const SET_TAGS = "setTags";
export const SET_ALARM_TYPE = "setAlarmType";
export const SET_RTU_ID = "setRtuId";

//for auto refresh
export const SET_IS_AUTO_REFRESH = "setIsAutoRefresh";

export default {
  state: {
    filterRtu: {
      regional: null,
      witel: null,
      datel: null,
      location: null,
      tags: null,
      alarmType: null,
    },
    rtuPort: [],
    rtuPortId: null,
    isAutoRefresh: false,
    rtuId: null,
  },
  getters: {
    setRtuPort(state) {
      return state.rtuPort;
    },
    idRegional(state) {
      return state.filterRtu.regional;
    },
    idWitel(state) {
      return state.filterRtu.witel;
    },
    idDatel(state) {
      return state.filterRtu.datel;
    },
    idLocation(state) {
      return state.filterRtu.location;
    },
    idTags(state) {
      return state.filterRtu.tags;
    },
    idAlarmType(state) {
      return state.filterRtu.alarmType;
    },
    getIsAutoRefresh(state) {
      return state.isAutoRefresh;
    },
    getRtuId(state) {
      return state.rtuId;
    },
  },
  mutations: {
    [SET_RTU_PORT](state, payload) {
      state.rtuPort = payload;
    },
    [SET_REGIONAL](state, payload) {
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
    [SET_WITEL](state, payload) {
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
    [SET_DATEL](state, payload) {
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
    [SET_LOCATION](state, payload) {
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
    [SET_TAGS](state, payload) {
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
    [SET_ALARM_TYPE](state, payload) {
      if (payload !== null) {
        if (payload.length === 0) {
          state.filterRtu.alarmType = null;
        } else {
          state.filterRtu.alarmType = payload;
        }
      } else {
        state.filterRtu.alarmType = payload;
      }
    },
    [SET_IS_AUTO_REFRESH](state, payload) {
      state.isAutoRefresh = payload;
    },
    [SET_RTU_ID](state, payload) {
      state.rtuId = payload;
    },
  },
  actions: {
    [SET_RTU_PORT](state, payload) {
      state.commit(SET_RTU_PORT, payload);
    },
    [SET_REGIONAL](state, payload) {
      state.commit(SET_REGIONAL, payload);
    },
    [SET_WITEL](state, payload) {
      state.commit(SET_WITEL, payload);
    },
    [SET_DATEL](state, payload) {
      state.commit(SET_DATEL, payload);
    },
    [SET_LOCATION](state, payload) {
      state.commit(SET_LOCATION, payload);
    },
    [SET_TAGS](state, payload) {
      state.commit(SET_TAGS, payload);
    },
    [SET_ALARM_TYPE](state, payload) {
      state.commit(SET_ALARM_TYPE, payload);
    },
    [SET_IS_AUTO_REFRESH](state, payload) {
      state.commit(SET_IS_AUTO_REFRESH, payload);
    },
    [SET_RTU_ID](state, payload) {
      state.commit(SET_RTU_ID, payload);
    },
  },
};
