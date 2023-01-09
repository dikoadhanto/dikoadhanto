export const SET_REGIONAL_SUMMARY_ALARM = "setRegionalSummaryAlarm";
export const SET_WITEL_SUMMARY_ALARM = "setWitelSummaryAlarm";
export const SET_DATEL_SUMMARY_ALARM = "setDatelSummaryAlarm";
export const SET_LOCATION_SUMMARY_ALARM = "setLocationSummaryAlarm";
export const SET_TAGS_SUMMARY_ALARM = "setTagsSummaryAlarm";
export const SET_START_DATE_SUMMARY_ALARM = "setStartDateSummaryAlarm";
export const SET_END_DATE_SUMMARY_ALARM = "setEndDateSummaryAlarm";
export const SET_PAGE_SUMMARY_ALARM = "setPageSummaryAlarm";
export const SET_TABLE_SUMMARY_ALARM = "setTableSummaryAlarm";
export const SET_DETAIL_SUMMARY_ALARM = "setDetailSummaryAlarm";
export const SET_DEFAULT_SUMMARY_ALARM = "setDefaultSummaryAlarm";
export const SET_REGIONAL_ALERT_SUMMARY_ALARM = "setRegionalAlertSummaryAlarm";
export const SET_WITEL_ALERT_SUMMARY_ALARM = "setWitelAlertSummaryAlarm";
export const SET_SNAME_ALERT_SUMMARY_ALARM = "setSnameAlertSummaryAlarm";

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
    },
    filterAlert: {
      regional: null,
      witel: null,
      sname: "",
    },
    page: "National",
    table: "general",
    dataDetail: {},
  },
  getters: {
    getIdRegionalSummaryAlarm(state) {
      return state.filter.regional;
    },
    getIdWitelSummaryAlarm(state) {
      return state.filter.witel;
    },
    getIdDatelSummaryAlarm(state) {
      return state.filter.datel;
    },
    getIdLocationSummaryAlarm(state) {
      return state.filter.location;
    },
    getIdTagsSummaryAlarm(state) {
      return state.filter.tags;
    },
    getStartDateSummaryAlarm(state) {
      return state.filter.startDate;
    },
    getEndDateSummaryAlarm(state) {
      return state.filter.endDate;
    },
    getPageSummaryAlarm(state) {
      return state.page;
    },
    getTableSummaryAlarm(state) {
      return state.table;
    },
    getDetailSummaryAlarm(state) {
      return state.dataDetail;
    },
    getIdRegionalAlertSummaryAlarm(state) {
      return state.filterAlert.regional;
    },
    getIdWitelAlertSummaryAlarm(state) {
      return state.filterAlert.witel;
    },
    getSnameAlertSummaryAlarm(state) {
      return state.filterAlert.sname;
    },
  },
  mutations: {
    [SET_REGIONAL_SUMMARY_ALARM](state, payload) {
      if (payload == "") {
        state.filter.regional = null;
      } else {
        state.filter.regional = payload;
      }
    },
    [SET_WITEL_SUMMARY_ALARM](state, payload) {
      if (payload == "") {
        state.filter.witel = null;
      } else {
        state.filter.witel = payload;
      }
    },
    [SET_DATEL_SUMMARY_ALARM](state, payload) {
      if (payload == "") {
        state.filter.datel = null;
      } else {
        state.filter.datel = payload;
      }
    },
    [SET_LOCATION_SUMMARY_ALARM](state, payload) {
      if (payload == "") {
        state.filter.location = null;
      } else {
        state.filter.location = payload;
      }
    },
    [SET_TAGS_SUMMARY_ALARM](state, payload) {
      if (payload !== null) {
        if (payload.length == 0) {
          state.filter.tags = null;
        } else {
          state.filter.tags = payload;
        }
      } else {
        state.filter.tags = payload;
      }
    },
    [SET_START_DATE_SUMMARY_ALARM](state, payload) {
      state.filter.startDate = payload;
    },
    [SET_END_DATE_SUMMARY_ALARM](state, payload) {
      state.filter.endDate = payload;
    },
    [SET_PAGE_SUMMARY_ALARM](state, payload) {
      state.page = payload;
    },
    [SET_TABLE_SUMMARY_ALARM](state, payload) {
      state.table = payload;
    },
    [SET_DETAIL_SUMMARY_ALARM](state, payload) {
      state.dataDetail = payload;
    },
    [SET_DEFAULT_SUMMARY_ALARM](state) {
      state.filter = {
        regional: null,
        witel: null,
        datel: null,
        location: null,
        tags: null,
        startDate: null,
        endDate: null,
      };
      state.filterAlert = {
        regional: null,
        witel: null,
        sname: "",
      };
      state.page = "National";
      state.table = "general";
      state.dataDetail = {};
    },
    [SET_REGIONAL_ALERT_SUMMARY_ALARM](state, payload) {
      if (payload == "") {
        state.filterAlert.regional = null;
      } else {
        state.filterAlert.regional = payload;
      }
    },
    [SET_WITEL_ALERT_SUMMARY_ALARM](state, payload) {
      if (payload == "") {
        state.filterAlert.witel = null;
      } else {
        state.filterAlert.witel = payload;
      }
    },
    [SET_SNAME_ALERT_SUMMARY_ALARM](state, payload) {
      state.filterAlert.sname = payload;
    },
  },
  actions: {
    [SET_REGIONAL_SUMMARY_ALARM](state, payload) {
      state.commit(SET_REGIONAL_SUMMARY_ALARM, payload);
    },
    [SET_WITEL_SUMMARY_ALARM](state, payload) {
      state.commit(SET_WITEL_SUMMARY_ALARM, payload);
    },
    [SET_DATEL_SUMMARY_ALARM](state, payload) {
      state.commit(SET_DATEL_SUMMARY_ALARM, payload);
    },
    [SET_LOCATION_SUMMARY_ALARM](state, payload) {
      state.commit(SET_LOCATION_SUMMARY_ALARM, payload);
    },
    [SET_TAGS_SUMMARY_ALARM](state, payload) {
      state.commit(SET_TAGS_SUMMARY_ALARM, payload);
    },
    [SET_START_DATE_SUMMARY_ALARM](state, payload) {
      state.commit(SET_START_DATE_SUMMARY_ALARM, payload);
    },
    [SET_END_DATE_SUMMARY_ALARM](state, payload) {
      state.commit(SET_END_DATE_SUMMARY_ALARM, payload);
    },
    [SET_PAGE_SUMMARY_ALARM](state, payload) {
      state.commit(SET_PAGE_SUMMARY_ALARM, payload);
    },
    [SET_TABLE_SUMMARY_ALARM](state, payload) {
      state.commit(SET_TABLE_SUMMARY_ALARM, payload);
    },
    [SET_DETAIL_SUMMARY_ALARM](state, payload) {
      state.commit(SET_DETAIL_SUMMARY_ALARM, payload);
    },
    [SET_DEFAULT_SUMMARY_ALARM](state) {
      state.commit(SET_DEFAULT_SUMMARY_ALARM);
    },
    [SET_REGIONAL_ALERT_SUMMARY_ALARM](state, payload) {
      state.commit(SET_REGIONAL_ALERT_SUMMARY_ALARM, payload);
    },
    [SET_WITEL_ALERT_SUMMARY_ALARM](state, payload) {
      state.commit(SET_WITEL_ALERT_SUMMARY_ALARM, payload);
    },
    [SET_SNAME_ALERT_SUMMARY_ALARM](state, payload) {
      state.commit(SET_SNAME_ALERT_SUMMARY_ALARM, payload);
    },
  },
};
