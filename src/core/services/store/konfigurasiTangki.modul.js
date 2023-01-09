const konfigurasiTangki = {
    namespaced: true,
    state: {
        indexKonfigurasi: 0,
        tankLength: "",
        tankHeight: "",
        typeTank: "",
        tankWide: "",
        dataPower: "",
        fuelConsumption: "",
    },
    mutations: {
        setIndex(state, payload) {
            state.indexKonfigurasi = payload;
        },
        setTankLength(state, payload) {
            state.tankLength = payload;
        },
        setTankHeight(state, payload) {
            state.tankHeight = payload;
        },
        setTypeTank(state, payload) {
            state.typeTank = payload;
        },
        setTankWide(state, payload) {
            state.tankWide = payload;
        },
        setDataPower(state, payload) {
            state.dataPower = payload;
        },
        setFuelConsumption(state, payload) {
            state.fuelConsumption = payload;
        }
    },
};

export default konfigurasiTangki;

