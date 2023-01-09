export const SET_DATA_TEMPLATE_RTU_PORT = "setDataTemplateRtuPort";
export const SET_NAME_RTU_PORT = "setDataTemplateNameRtuPort";

export default {
    state: {
        filter: {
            listTemplate: null,
            templateName: null,

        },
    },
    getters: {
        getDataTemplateRtuPort(state) {
            return state.filter.listTemplate;
        },
        getNameTemplareRTUPORT(state) {
            return state.filter.templateName;
        },

    },
    mutations: {
        [SET_DATA_TEMPLATE_RTU_PORT](state, payload) {
            if (payload.length === 0) {
                state.filter.listTemplate = null;
            } else {
                state.filter.listTemplate = payload;

            }
        },
        [SET_NAME_RTU_PORT](state, payload) {
            if (payload.length === 0) {
                state.filter.templateName = null;
            } else {
                state.filter.templateName = payload;

            }
        },

    },
    actions: {
        [SET_DATA_TEMPLATE_RTU_PORT](state, payload) {
            state.commit(SET_DATA_TEMPLATE_RTU_PORT, payload);
        },
        [SET_NAME_RTU_PORT](state, payload) {
            state.commit(SET_NAME_RTU_PORT, payload);
        },

    },
};
