export const SET_RTU_ID_MD = "setRtuIdMd";
export const SET_RTU_NAME_RTU = "setRtuNameRtu";
export const SET_RTU_ID_M_LOCATION = "setRtuIdMLocation";
export const SET_RTU_SNAME = "setRtuSName";
export const SET_RTU_IP_ADDRESS = "setRtuIpAddress";
export const SET_RTU_ID_TAGS = "setRtuIdTags";
export const SET_RTU_DESCRIPTION = "setRtuDescription";
export const SET_DATA_PORTS = "setDataPorts";
export const SET_INDEX_CHOOSE = "setIndexChoose";
export const SET_DEFAULT_PORT = "setDefaultPorts";

export default {
  state: {
    rtu: {
      id_md: "",
      name_rtu: "",
      id_m_location: "",
      sname: "",
      ip_address: "",
      id_tags: "",
      description: "",
    },
    ports: [],
    indexChoose: "",
  },
  getters: {
    getRtuIdMd(state) {
      return state.rtu.id_md;
    },
    getRtuNameRtu(state) {
      return state.rtu.name_rtu;
    },
    getRtuIdMLocation(state) {
      return state.rtu.id_m_location;
    },
    getRtuSName(state) {
      return state.rtu.sname;
    },
    getRtuIpAddress(state) {
      return state.rtu.ip_address;
    },
    getRtuIdTags(state) {
      return state.rtu.id_tags;
    },
    getRtuDescription(state) {
      return state.rtu.description;
    },
    getDataPorts(state) {
      return state.ports;
    },
    getIndexChoose(state) {
      return state.indexChoose;
    },
  },
  mutations: {
    [SET_RTU_ID_MD](state, payload) {
      state.rtu.id_md = payload;
    },
    [SET_RTU_NAME_RTU](state, payload) {
      state.rtu.name_rtu = payload;
    },
    [SET_RTU_ID_M_LOCATION](state, payload) {
      state.rtu.id_m_location = payload;
    },
    [SET_RTU_SNAME](state, payload) {
      state.rtu.sname = payload;
    },
    [SET_RTU_IP_ADDRESS](state, payload) {
      state.rtu.ip_address = payload;
    },
    [SET_RTU_ID_TAGS](state, payload) {
      state.rtu.id_tags = payload;
    },
    [SET_RTU_DESCRIPTION](state, payload) {
      state.rtu.description = payload;
    },
    [SET_DATA_PORTS](state, payload) {
      state.ports.push(payload);
    },
    [SET_INDEX_CHOOSE](state, payload) {
      state.indexChoose = payload;
    },
    [SET_DEFAULT_PORT](state) {
      state.ports = [];
    },
  },
  actions: {
    [SET_RTU_ID_MD](state, payload) {
      state.commit(SET_RTU_ID_MD, payload);
    },
    [SET_RTU_NAME_RTU](state, payload) {
      state.commit(SET_RTU_NAME_RTU, payload);
    },
    [SET_RTU_ID_M_LOCATION](state, payload) {
      state.commit(SET_RTU_ID_M_LOCATION, payload);
    },
    [SET_RTU_SNAME](state, payload) {
      state.commit(SET_RTU_SNAME, payload);
    },
    [SET_RTU_IP_ADDRESS](state, payload) {
      state.commit(SET_RTU_IP_ADDRESS, payload);
    },
    [SET_RTU_ID_TAGS](state, payload) {
      state.commit(SET_RTU_ID_TAGS, payload);
    },
    [SET_RTU_DESCRIPTION](state, payload) {
      state.commit(SET_RTU_DESCRIPTION, payload);
    },
    [SET_DATA_PORTS](state, payload) {
      state.commit(SET_DATA_PORTS, payload);
    },
    [SET_INDEX_CHOOSE](state, payload) {
      state.commit(SET_INDEX_CHOOSE, payload);
    },
    [SET_DEFAULT_PORT](state) {
      state.commit(SET_DEFAULT_PORT);
    },
  },
};
