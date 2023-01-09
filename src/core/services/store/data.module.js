export const SET_DATA = "setData";
export const SET_REGIONAL_ID = "setRegionalId";
export const SET_WITEL_ID = "setWitelId";
export const SET_LIMIT = "setLimit";
export const SET_PAGE = "setPage";
export const SET_IS_CATEGORY = "setIsCategory";
export const SET_IS_CATEGORY_GRAPH = "setIsCategoryGraph";
export const SET_IS_PERCENTAGE = "setIsPercentage";
export const SET_REGIONAL_FILTER = "setRegionalFilter";
export const SET_IS_RTU_PORT_ID = "setIsRtuPortId";
export const SET_DATA_GRAPH_LOCATION = "setDataGraphLocation";
export const SET_IS_LOCATION = "setIsLocation";
export const SET_ONE_REGIONAL = "setOneRegional";

export default {
  state: {
    isCategory: "percentage",
    isCategoryGraph: "daily",
    isLocation: true,
    onlyOneRegional: "",
    isPercentage: false,
    regionalFilter: [],
    isRtuPortId: null,
    data: [],
    dataGraphLocation: [],
    regionalId: null,
    witelId: null,
    limit: 10,
    page: 1,
  },
  getters: {
    /**
     * Get list of data for current page
     * @param state
     * @returns {*}
     */
    setData(state) {
      //   console.log(state);
      return state.data;
    },
    setRegionalId(state) {
      return state.regionalId;
    },
    setWitelId(state) {
      return state.witelId;
    },
    setLimit(state) {
      return state.limit;
    },
    setPage(state) {
      return state.page;
    },
    setIsCategory(state) {
      return state.isCategory;
    },
    setRegionalFilter(state) {
      return state.regionalFilter;
    },
    setIsRtuPortId(state) {
      return state.isRtuPortId;
    },
    setDataGraphLocation(state) {
      return state.dataGraphLocation;
    },
    setIsCategoryGraph(state) {
      return state.isCategoryGraph;
    },
    setIsPercentage(state) {
      return state.isPercentage;
    },
    setIsLocation(state) {
      return state.isLocation;
    },
    setOneRegional(state) {
      return state.onlyOneRegional;
    },
  },
  mutations: {
    [SET_DATA](state, payload) {
      if (!payload.regionals) payload.regionals = state.data.regionals;
      state.data = payload;
    },
    [SET_REGIONAL_ID](state, payload) {
      state.regionalId = payload;
    },
    [SET_WITEL_ID](state, payload) {
      state.witelId = payload;
    },
    [SET_LIMIT](state, payload) {
      state.limit = payload;
    },
    [SET_PAGE](state, payload) {
      state.page = payload;
    },
    [SET_IS_CATEGORY](state, payload) {
      state.isCategory = payload;
    },
    [SET_REGIONAL_FILTER](state, payload) {
      state.regionalFilter = payload;
    },
    [SET_IS_RTU_PORT_ID](state, payload) {
      state.isRtuPortId = payload;
    },
    [SET_DATA_GRAPH_LOCATION](state, payload) {
      state.dataGraphLocation = payload;
    },
    [SET_IS_CATEGORY_GRAPH](state, payload) {
      state.isCategoryGraph = payload;
    },
    [SET_IS_PERCENTAGE](state, payload) {
      state.isPercentage = payload;
    },
    [SET_IS_LOCATION](state, payload) {
      state.isLocation = payload;
    },
    [SET_ONE_REGIONAL](state, payload) {
      state.onlyOneRegional = payload;
    },
  },
  actions: {
    /**
     *
     * @param state
     * @param payload
     */
    [SET_DATA](state, payload) {
      state.commit(SET_DATA, payload);
    },
    [SET_REGIONAL_ID](state, payload) {
      if (payload == "" || payload == null) {
        state.commit(SET_REGIONAL_ID, null);
      } else {
        state.commit(SET_REGIONAL_ID, payload);
      }
    },
    [SET_WITEL_ID](state, payload) {
      if (payload == "" || payload == null) {
        state.commit(SET_WITEL_ID, null);
      } else {
        state.commit(SET_WITEL_ID, payload);
      }
    },
    [SET_LIMIT](state, payload) {
      state.commit(SET_LIMIT, payload);
    },
    [SET_PAGE](state, payload) {
      state.commit(SET_PAGE, payload);
    },
    [SET_IS_CATEGORY](state, payload) {
      state.commit(SET_IS_CATEGORY, payload);
    },
    [SET_REGIONAL_FILTER](state, payload) {
      state.commit(SET_REGIONAL_FILTER, payload);
    },
    [SET_IS_RTU_PORT_ID](state, payload) {
      state.commit(SET_IS_RTU_PORT_ID, payload);
    },
    [SET_DATA_GRAPH_LOCATION](state, payload) {
      state.commit(SET_DATA_GRAPH_LOCATION, payload);
    },
    [SET_IS_CATEGORY_GRAPH](state, payload) {
      state.commit(SET_IS_CATEGORY_GRAPH, payload);
    },
    [SET_IS_PERCENTAGE](state, payload) {
      state.commit(SET_IS_PERCENTAGE, payload);
    },
    [SET_IS_LOCATION](state, payload) {
      state.commit(SET_IS_LOCATION, payload);
    },
    [SET_ONE_REGIONAL](state, payload) {
      state.commit(SET_ONE_REGIONAL, payload);
    },
  },
};
