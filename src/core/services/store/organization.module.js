const organization = {
  namespaced: true,
  state: {
    selectedOrganization: {},
  },
  mutations: {
    setSelectedOrganization(state, payload) {
      state.selectedOrganization = payload;
    },
  },
};

export default organization;
