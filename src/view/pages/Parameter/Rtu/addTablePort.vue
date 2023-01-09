<template>
  <b-modal
    id="add-table-port"
    size="lg"
    title="Tambah Port"
    scrollable
    hide-footer
    centered
    @cancel="setDefaultValue"
    @hidden="setDefaultValue"
    @close="setDefaultValue"
  >
    <form>
      <div class="card p-5 mb-5">
        <b-row
          class="d-flex align-items-center mb-8"
          align-v="center"
          no-gutters
        >
          <b-col cols="4">
            <h6>TIPE PORT&nbsp;<span class="required-icon">*</span>&nbsp;:</h6>
          </b-col>
          <b-col cols="8">
            <treeselect
              noOptionsText="Data tidak ada"
              noResultsText="Data port tidak ditemukan"
              :options="listPort"
              placeholder="Pilih Data Port"
              :normalizer="normalizer"
              :clear-on-select="true"
              v-model="idSelectPort"
              openDirection="bottom"
              @input="checkIdPort()"
            >
            </treeselect>
          </b-col>
        </b-row>
        <b-row
          class="d-flex align-items-center"
          align-v="center"
          no-gutters
          v-if="portType != 'kwh'"
        >
          <b-col cols="4">
            <h6>PORT NUMBER <span class="required-icon">* </span>:</h6>
          </b-col>
          <b-col cols="1">
            <input
              type="text"
              v-model="showModePort"
              class="form-control form-control-sm"
              disabled
            />
          </b-col>
          <b-col cols="7">
            <input
              type="text"
              v-model="input.port_rtu"
              class="form-control form-control-sm"
            />
          </b-col>
        </b-row>
      </div>

      <!-- bbm configuration -->
      <div class="card p-5 mb-5" v-if="portType == 'bbm'">
        <b-row
          class="d-flex align-items-center mb-8"
          align-v="center"
          no-gutters
        >
          <b-col cols="4">
            <h6>
              BENTUK TANGKI&nbsp;<span class="required-icon">*</span>&nbsp;:
            </h6>
          </b-col>
          <b-col cols="8">
            <b-form-select class="form-control" v-model="input.selectBentuk">
              <option disabled value="">Pilih Bentuk Tangki</option>
              <option v-for="(data, i) in listTangki" :key="i" :value="data.id">
                {{ data.name }}
              </option>
            </b-form-select>
          </b-col>
        </b-row>

        <b-row
          class="d-flex align-items-center mb-8"
          align-v="center"
          no-gutters
        >
          <b-col cols="4">
            <h6>
              PANJANG TANGKI&nbsp;<span class="required-icon">*</span>&nbsp;:
            </h6>
          </b-col>
          <b-col cols="5">
            <input
              type="number"
              v-model="input.tank_length"
              class="form-control"
            />
          </b-col>
          <b-col class="ml-4">
            <h6>CM</h6>
          </b-col>
        </b-row>

        <b-row
          class="d-flex align-items-center mb-8"
          align-v="center"
          no-gutters
        >
          <b-col cols="4">
            <h6>
              TINGGI TANGKI&nbsp;<span class="required-icon">*</span>&nbsp;:
            </h6>
          </b-col>
          <b-col cols="5">
            <input
              type="number"
              v-model="input.tank_height"
              class="form-control"
              value=""
            />
          </b-col>
          <b-col class="ml-4" cols="2">
            <h6>CM</h6>
          </b-col>
        </b-row>

        <b-row
          class="d-flex align-items-center mb-8"
          align-v="center"
          no-gutters
        >
          <b-col cols="4">
            <h6>
              LEBAR TANGKI&nbsp;<span class="required-icon">*</span>&nbsp;:
            </h6>
          </b-col>
          <b-col cols="5">
            <input
              type="number"
              v-model="input.tank_wide"
              class="form-control"
              value=""
            />
          </b-col>
          <b-col cols="2">
            <h6 class="ml-4">CM</h6>
          </b-col>
        </b-row>

        <b-row
          class="d-flex align-items-center mb-8"
          no-gutters
          align-v="center"
        >
          <b-col cols="4">
            <h6>
              TIPE TANGKI&nbsp;<span class="required-icon">*</span>&nbsp;:
            </h6>
          </b-col>
          <b-col>
            <label>
              <input
                type="radio"
                value="harian"
                v-model="input.type_tank"
                checked
              />
              <span
                class="font-weight-bold ml-2 mr-5"
                align-self="center"
                style="font-size: 14px"
                >HARIAN</span
              >
            </label>
            <label>
              <input type="radio" value="bulanan" v-model="input.type_tank" />
              <span
                class="font-weight-bold ml-2"
                align-self="center"
                style="font-size: 14px"
                >BULANAN</span
              >
            </label>
          </b-col>
        </b-row>

        <b-row
          class="d-flex align-items-center mb-8"
          align-v="center"
          no-gutters
        >
          <b-col cols="4">
            <h6>
              KAPASITAS TANGKI&nbsp;<span class="required-icon">*</span>&nbsp;:
            </h6>
          </b-col>
          <b-col cols="5">
            <input
              type="number"
              v-model="input.kapasitas"
              class="form-control"
              value=""
            />
          </b-col>
          <b-col cols="2">
            <h6 class="ml-4">LITER</h6>
          </b-col>
        </b-row>

        <b-row
          class="d-flex align-items-center mb-8"
          no-gutters
          align-v="center"
        >
          <b-col cols="4">
            <h6>
              POWER GENSET&nbsp;<span class="required-icon">*</span>&nbsp;:
            </h6>
          </b-col>
          <b-col cols="5">
            <input
              type="number"
              v-model="input.power"
              class="form-control"
              value=""
            />
          </b-col>
          <b-col cols="2">
            <h6 class="ml-4">KVA</h6>
          </b-col>
        </b-row>
        <b-row
          class="d-flex align-items-center mb-8"
          no-gutters
          align-v="center"
        >
          <b-col cols="4">
            <h6>
              FUEL CONSUMPTION/HOUR&nbsp;<span class="required-icon">*</span
              >&nbsp;:
            </h6>
          </b-col>
          <b-col cols="5">
            <input
              type="number"
              v-model="input.fuel_consumption"
              class="form-control"
              value=""
            />
          </b-col>
          <b-col cols="2">
            <h6 class="ml-4">LITER</h6>
          </b-col>
        </b-row>

        <b-row class="d-flex align-items-center" no-gutters align-v="center">
          <b-col cols="4">
            <h6>
              HARGA BBM PER LITER&nbsp;<span class="required-icon">*</span
              >&nbsp;:
            </h6>
          </b-col>
          <b-col>
            <input
              type="number"
              v-model="input.harga"
              class="form-control"
              value=""
            />
          </b-col>
        </b-row>
      </div>

      <!-- kwh -->
      <div class="card p-5 mb-5" v-if="portType == 'kwh'">
        <div class="row">
          <div class="col-md">
            <b-row
              class="d-flex align-items-center mb-8"
              no-gutters
              align-v="center"
            >
              <b-col cols="4">
                <h6>PORT KWH 1 <span class="required-icon">* </span>:</h6>
              </b-col>
              <b-col cols="1">
                <input
                  type="text"
                  v-model="showModePort"
                  class="form-control form-control-sm"
                  disabled
                />
              </b-col>
              <b-col cols="7">
                <input
                  type="text"
                  v-model="input.port_kwh_1"
                  class="form-control form-control-sm"
                />
              </b-col>
            </b-row>

            <b-row
              class="d-flex align-items-center"
              no-gutters
              align-v="center"
            >
              <b-col cols="4">
                <h6>DESKRIPSI</h6>
              </b-col>
              <b-col>
                <textarea
                  type="text"
                  v-model="input.desc_kwh_1"
                  class="form-control"
                ></textarea>
              </b-col>
            </b-row>
          </div>
        </div>
      </div>

      <div class="card p-5 mb-5" v-if="portType == 'kwh'">
        <div class="row">
          <div class="col-md">
            <b-row
              class="d-flex align-items-center mb-8"
              no-gutters
              align-v="center"
            >
              <b-col cols="4">
                <h6>PORT KWH 2 <span class="required-icon">* </span>:</h6>
              </b-col>
              <b-col cols="1">
                <input
                  type="text"
                  v-model="showModePort"
                  class="form-control form-control-sm"
                  disabled
                />
              </b-col>
              <b-col cols="7">
                <input
                  type="text"
                  v-model="input.port_kwh_2"
                  class="form-control form-control-sm"
                />
              </b-col>
            </b-row>

            <b-row
              class="d-flex align-items-center"
              no-gutters
              align-v="center"
            >
              <b-col cols="4">
                <h6>DESKRIPSI</h6>
              </b-col>
              <b-col>
                <textarea
                  type="text"
                  v-model="input.desc_kwh_2"
                  class="form-control"
                ></textarea>
              </b-col>
            </b-row>
          </div>
        </div>
      </div>

      <!-- next general -->
      <div class="card p-5">
        <b-row
          class="d-flex align-items-center mb-8"
          align-v="center"
          no-gutters
        >
          <b-col cols="4">
            <h6>GROUP TOPOLOGY :</h6>
          </b-col>
          <b-col>
            <!-- <select
              class="form-control form-control-sm"
              v-model="input.selectDevice"
            >
              <option disabled value="">Pilih Nama Group Topology</option>
              <option v-for="(item, i) in listMdivece" :key="i" :value="item">
                {{ item.name.replace(/UNIQUE /g, "") }}
              </option>
            </select> -->
            <treeselect
              noOptionsText="Data tidak ada"
              noResultsText="Data topology tidak ditemukan"
              :options="listMdivece"
              placeholder="Pilih Data Topology"
              :normalizer="normalizerTopology"
              :clear-on-select="true"
              v-model="idDevice"
              openDirection="bottom"
              @input="setSelectDevice"
            >
            </treeselect>
          </b-col>
        </b-row>

        <b-row
          class="d-flex align-items-center mb-8"
          align-v="center"
          no-gutters
          v-if="portType != 'kwh'"
        >
          <b-col cols="4">
            <h6>DESKRIPSI&nbsp;<span class="required-icon">*</span>&nbsp;:</h6>
          </b-col>
          <b-col>
            <textarea
              class="form-control form-control-sm"
              v-model="input.description"
            ></textarea>
          </b-col>
        </b-row>

        <b-row
          class="d-flex align-items-center mb-8"
          align-v="center"
          no-gutters
        >
          <b-col cols="4">
            <h6>UNITS&nbsp;:</h6>
          </b-col>
          <b-col>
            <input
              type="text"
              disabled
              class="form-control form-control-sm"
              v-model="input.selectPort.units"
            />
          </b-col>
        </b-row>

        <b-row
          class="d-flex align-items-center mb-8"
          align-v="center"
          no-gutters
        >
          <b-col cols="4">
            <h6>CALIBRATION VALUE&nbsp;:</h6>
          </b-col>
          <b-col>
            <input
              type="text"
              disabled
              class="form-control form-control-solid form-control-sm"
              v-model="input.selectPort.calibration_value"
            />
          </b-col>
        </b-row>

        <b-row class="d-flex mb-8" no-gutters>
          <b-col cols="4">
            <h6>TELEGRAM REMINDER&nbsp;:</h6>
          </b-col>
          <b-col>
            <span class="switch switch-sm switch-icon">
              <label class="m-0">
                <input
                  type="checkbox"
                  :value="input.reminder"
                  v-model="input.reminder"
                />
                <span></span>
              </label>
            </span>
          </b-col>
        </b-row>

        <b-row class="d-flex mb-8" no-gutters>
          <b-col cols="4">
            <h6>STATUS MONITORING&nbsp;:</h6>
          </b-col>
          <b-col>
            <span class="switch switch-sm switch-icon">
              <label>
                <input
                  type="checkbox"
                  :value="input.monitored"
                  v-model="input.monitored"
                />
                <span></span>
              </label>
            </span>
          </b-col>
        </b-row>
      </div>
      <b-row>
        <b-col cols="auto" class="ml-auto">
          <button
            type="submit"
            class="btn btn-sm btn-success mt-5"
            @click.prevent="addPortData()"
          >
            Simpan &nbsp;
            <span><i class="fas fa-chevron-right icon-sm"></i></span>
          </button>
        </b-col>
      </b-row>
    </form>
  </b-modal>
</template>

<script>
import ApiService from "@/core/services/api.service.js";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { SET_DATA_PORTS } from "@/core/services/store/rtuManagement.module.js";
import Swal from "sweetalert2";
import { mapGetters } from "vuex";

export default {
  name: "AddPort",
  emits: ["getDataPortFromRtu", "checkAlert"],
  props: ["dataRtu"],
  data() {
    return {
      listDataFormula: [],
      listPort: [],
      listMdivece: [],
      listTangki: [],
      portType: "general",
      dataPortKwh: [],
      showModePort: "A/D",
      idSelectPort: null,
      normalizer(node) {
        return {
          id: node.id_port,
          label: node.port_name,
        };
      },
      normalizerTopology(node) {
        return {
          label: node.name,
        };
      },
      idDevice: null,
      input: {
        // general
        id_m_port: "",
        port_rtu: "",
        selectPort: "",
        mode_port: "analog",
        name_identifier: "",
        selectDevice: "",
        description: "",
        units: "",
        calibration: "",
        is_monitored: "1",
        telegram_reminder: "1",
        monitored: true,
        reminder: true,
        id_m_formula: "",
        formula: "",

        // adding bbm
        is_tanks: false,
        device_id: null,
        device_name: "",
        tank_length: "",
        tank_height: "",
        tank_wide: "",
        type_tank: "",
        power: "",
        fuel_consumption: "",
        harga: "",
        kapasitas: "",
        selectBentuk: "",

        // adding kwh
        port_kwh_1: "",
        desc_kwh_1: "",
        port_kwh_2: "",
        desc_kwh_2: "",
      },
    };
  },
  components: {
    Treeselect,
  },
  computed: {
    ...mapGetters(["getDataPorts"]),
  },
  mounted() {
    this.getPort();
    this.getDataFormula();
    this.getMDevice();
    this.getListTangki();
  },
  methods: {
    setSelectDevice() {
      if (this.idDevice != null) {
        const dataDevice = this.listMdivece.filter(
          (device) => device.id == this.idDevice
        );
        this.input.selectDevice = dataDevice[0];
        this.idDevice = null;
      } else {
        this.input.selectDevice = "";
      }
    },
    getDataFormula() {
      ApiService.query(`${process.env.VUE_APP_ROOT_API_4}/formula`, {
        params: {
          limit: "all",
        },
      })
        .then(({ data }) => {
          this.listDataFormula = data.result.payload;
        })
        .catch((error) => {
          if (error.response.data.code == 404) {
            this.listDataFormula = "";
          }
          console.log("Error Formula : ", error.response);
        });
    },
    getPort() {
      ApiService.query(`${process.env.VUE_APP_ROOT_API_4}/port`, {
        params: {
          page: "1",
          limit: "all",
        },
      })
        .then(({ data }) => {
          this.listPort = data.result.payload;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    getMDevice() {
      ApiService.get(`${process.env.VUE_APP_ROOT_API_4}/other/mdevice`)
        .then(({ data }) => {
          this.listMdivece = data.result.map((item) => ({
            id: item.id,
            name: item.name.replace(/UNIQUE /g, ""),
          }));
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    getListTangki() {
      ApiService.query(`${process.env.VUE_APP_ROOT_API_4}/tank-form`, {})
        .then(({ data }) => {
          this.listTangki = data.result.payload;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    checkIdPort() {
      if (
        this.idSelectPort == null ||
        this.idSelectPort == undefined ||
        this.idSelectPort == ""
      ) {
        this.setDefaultValue();
      } else {
        this.dataPort();
      }
    },
    dataPort() {
      let listOneDataPort = this.listPort.filter((port) => {
        return port.id_port == this.idSelectPort;
      });
      this.input.selectPort = listOneDataPort[0];
      const data = this.input.selectPort;
      this.setModePort(data);
      if (data.identifier == "BBM") {
        this.portType = "bbm";
      } else if (
        data.identifier == "PLN_KWH1" ||
        data.identifier == "PLN_KWH2"
      ) {
        this.portType = "kwh";
      } else {
        this.portType = "general";
      }
      this.setFormula(data.identifier);
      this.input.id_m_port = data.id_port;
      this.input.name_identifier = data.port_name;
      if (data.identifier == "BBM") {
        this.input.is_tanks = true;
      } else {
        this.input.is_tanks = false;
      }
    },
    setModePort(data) {
      if (data.port_mode == "analog") {
        this.showModePort = "A-";
        this.input.mode_port = "analog";
      } else if (data.port_mode == "digital") {
        this.showModePort = "D-";
        this.input.mode_port = "digital";
      }
    },
    setFormula(identifier) {
      const newIdentifier = `{PORT:${identifier}:NO_PORT}`;
      this.input.formula = undefined;
      this.input.id_m_formula = undefined;
      this.listDataFormula.forEach((data) => {
        if (data.formula.includes(newIdentifier)) {
          // save id formula to state input
          this.input.id_m_formula = data.id;
          // this.input.formula = data.formula;
        }
      });
    },
    justInputFormula(data) {
      if (data.id_m_formula) {
        let newFormula = this.listDataFormula.find(
          (f) => f.id == data.id_m_formula
        ).formula;
        let countFormula = 0;
        // count formula master and port
        let master = newFormula.split("{MASTER:");
        countFormula = master.length - 1;
        let port = newFormula.split("{PORT:");
        countFormula += port.length - 1;
        let formula = newFormula.split("{FORMULA:");
        countFormula += formula.length - 1;

        // foreach formula to regex data
        for (let i = 0; i < countFormula; i++) {
          newFormula = newFormula.replace(
            /:NO_PORT/,
            `:${this.showModePort.concat(data.port_rtu)}`
          );
        }

        // set formula
        data.formula = newFormula;
      } else {
        data.id_m_formula = undefined;
        data.formula = undefined;
      }
    },
    addPortData() {
      if (
        (this.input.port_rtu == "" && this.portType != "kwh") ||
        (this.input.port_rtu == null && this.portType != "kwh")
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Port Number tidak boleh kosong",
        });
      } else if (this.input.mode_port == "" || this.input.mode_port == null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Mode Port tidak boleh kosong",
        });
      } else if (this.input.id_m_port == "" || this.input.id_m_port == null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Identifier tidak boleh kosong",
        });
      } else if (
        (this.input.description == "" && this.portType != "kwh") ||
        (this.input.description == null && this.portType != "kwh")
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Description tidak boleh kosong",
        });
      } else if (this.portType == "bbm") {
        if (this.input.selectBentuk == "" || this.input.selectBentuk == null) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Bentuk tangki tidak boleh kosong",
          });
        } else if (
          this.input.tank_length == "" ||
          this.input.tank_length == null
        ) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Panjang tangki tidak boleh kosong",
          });
        } else if (
          this.input.tank_height == "" ||
          this.input.tank_height == null
        ) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Tinggi tangki tidak boleh kosong",
          });
        } else if (this.input.tank_wide == "" || this.input.tank_wide == null) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Lebar tangki tidak boleh kosong",
          });
        } else if (this.input.type_tank == "" || this.input.type_tank == null) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Tipe tangki tidak boleh kosong",
          });
        } else if (this.input.power == "" || this.input.power == null) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Power tidak boleh kosong",
          });
        } else if (this.input.kapasitas == "" || this.input.kapasitas == null) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Kapasitas tidak boleh kosong",
          });
        } else if (this.input.harga == "" || this.input.harga == null) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Harga tidak boleh kosong",
          });
        } else if (
          this.input.fuel_consumption == "" ||
          this.input.fuel_consumption == null
        ) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Fuel Consumption tidak boleh kosong",
          });
        } else {
          this.justInputFormula(this.input);
          this.justAddPort(this.input);
          this.infoSuccess();
        }
      } else if (this.portType == "kwh") {
        // data untuk kwh
        const dataFirstKwh = { id: 1, ...this.input };
        const dataSecondKwh = { id: 2, ...this.input };

        // kwh 1
        dataFirstKwh.port_rtu = dataFirstKwh.port_kwh_1;
        dataFirstKwh.description = dataFirstKwh.desc_kwh_1;
        delete dataFirstKwh.id;
        this.justInputFormula(dataFirstKwh);
        this.justAddPort(dataFirstKwh);

        // kwh 2
        dataSecondKwh.port_rtu = dataSecondKwh.port_kwh_2;
        dataSecondKwh.description = dataSecondKwh.desc_kwh_2;
        delete dataSecondKwh.id;
        this.justInputFormula(dataSecondKwh);
        this.justAddPort(dataSecondKwh);
        this.infoSuccess();
      } else {
        this.justInputFormula(this.input);
        this.justAddPort(this.input);
        this.infoSuccess();
      }
    },
    justAddPort(data) {
      data.port_rtu = this.showModePort.concat(data.port_rtu);
      data.is_monitored = data.monitored == true ? "1" : "0";
      data.telegram_reminder = data.reminder == true ? "1" : "0";
      data.device_id = data.selectDevice.id;
      data.device_name = data.selectDevice.name;
      data.name_identifier = data.selectPort.identifier;
      this.$store.dispatch(SET_DATA_PORTS, data);
      ApiService.post(
        `${process.env.VUE_APP_ROOT_API_4}/rtu/createPort/${this.dataRtu.rtu_id}`,
        data
      ).catch((error) => {
        console.log(error.response, "error");
      });
    },
    infoSuccess() {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Data berhasil disimpan",
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          this.$emit("getDataPortFromRtu");
          this.$emit("checkAlert");
          this.$bvModal.hide("add-table-port");
          this.setDefaultValue();
        }
      });
    },
    setDefaultValue() {
      this.dataPortKwh = [];
      this.showModePort = "A/D";
      this.idSelectPort = null;
      this.portType = "general";
      this.input = {
        // general
        id_m_port: "",
        port_rtu: "",
        selectPort: "",
        mode_port: "analog",
        name_identifier: "",
        selectDevice: "",
        description: "",
        units: "",
        calibration: "",
        is_monitored: "1",
        telegram_reminder: "1",
        monitored: true,
        reminder: true,
        id_m_formula: undefined,
        formula: undefined,

        // adding bbm
        is_tanks: false,
        device_id: "",
        device_name: "",
        tank_length: "",
        tank_height: "",
        tank_wide: "",
        type_tank: "",
        power: "",
        fuel_consumption: "",
        harga: "",
        kapasitas: "",
        selectBentuk: "",

        // adding kwh
        port_kwh_1: "",
        desc_kwh_1: "",
        port_kwh_2: "",
        desc_kwh_2: "",
      };
    },
  },
};
</script>

<style scoped>
.required-icon {
  color: red;
}

.switch {
  justify-content: flex-start !important;
}
</style>
