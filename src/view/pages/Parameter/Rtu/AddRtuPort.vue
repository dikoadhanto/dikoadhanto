<template>
  <div>
    <b-modal
      id="add-rtu-port"
      size="xl"
      title="Tambah Port"
      scrollable
      hide-footer
      centered
      @close="closeAdd"
      @hidden="closeAdd"
    >
      <section>
        <div class="container">
          <div class="card p-5 mt-5">
            <b-row align-v="center" class="m-4" no-gutters>
              <b-col cols="3">
                <h6>PORT NUMBER &nbsp;<span class="required"></span>&nbsp;:</h6>
              </b-col>
              <b-col>
                <input
                  type="text"
                  class="form-control form-control-solid"
                  v-model="inputs.port_rtu"
                />
              </b-col>
            </b-row>

            <b-row align-v="center" class="m-4" no-gutters>
              <b-col cols="3">
                <h6>MODE PORT&nbsp;<span class="required"></span>&nbsp;:</h6>
              </b-col>
              <b-col>
                <label>
                  <input
                    type="radio"
                    value="analog"
                    v-model="inputs.mode_port"
                    checked
                  />
                  <span
                    class="font-weight-bold ml-2 mr-5"
                    align-self="center"
                    style="font-size: 14px"
                    >ANALOG</span
                  >
                </label>
                <label>
                  <input
                    type="radio"
                    value="digital"
                    v-model="inputs.mode_port"
                  />
                  <span
                    class="font-weight-bold ml-2"
                    align-self="center"
                    style="font-size: 14px"
                    >DIGITAL</span
                  >
                </label>
              </b-col>
            </b-row>

            <b-row align-v="center" class="m-4" no-gutters>
              <b-col cols="3">
                <h6>
                  IDENTIFIER NAME&nbsp;<span class="required"></span>&nbsp;:
                </h6>
              </b-col>
              <b-col>
                <select
                  class="form-control form-control-solid"
                  v-model="inputs.selectPort"
                  @change="dataPort(inputs.selectPort)"
                >
                  <option>Pilih IDENTIFIER</option>
                  <option v-for="(data, i) in listPort" :key="i" :value="data">
                    <span class="badge badge-danger text-white">{{
                      data.port_name
                    }}</span>
                  </option>
                </select>
              </b-col>
            </b-row>

            <b-row align-v="center" class="m-4" no-gutters>
              <b-col cols="3">
                <h6>
                  GROUP TOPOLOGY&nbsp;<span class="required"></span>&nbsp;:
                </h6>
              </b-col>
              <b-col>
                <b-form-select
                  class="form-control"
                  v-model="inputs.selectDevice"
                >
                  <option disabled value="">Pilih Nama Group Topology</option>
                  <option
                    v-for="(item, i) in listMdivece"
                    :key="i"
                    :value="item"
                  >
                    {{ item.name.replace(/UNIQUE /g, "") }}
                  </option>
                </b-form-select>
              </b-col>
            </b-row>
            <b-row align-v="center" class="m-4" no-gutters>
              <b-col cols="3">
                <h6>DESKRIPSI &nbsp;<span class="required"></span>&nbsp;:</h6>
              </b-col>
              <b-col>
                <textarea
                  class="form-control form-control-solid"
                  v-model="inputs.description"
                />
              </b-col>
            </b-row>
          </div>

          <div class="card p-5 mt-5">
            <b-row align-v="center" class="m-4" no-gutters>
              <b-col cols="3">
                <h6>TELEGRAM REMINDER&nbsp;<span></span>&nbsp;:</h6>
              </b-col>
              <b-col>
                <span
                  class="switch switch-sm switch-icon"
                  v-if="inputs.reminder"
                >
                  <label class="m-0">
                    <input
                      type="checkbox"
                      name=""
                      value="1"
                      v-model="inputs.reminder"
                    />
                    <span></span>
                  </label>
                </span>
                <span class="switch switch-sm switch-icon" v-else>
                  <label class="m-0">
                    <input
                      type="checkbox"
                      value="0"
                      v-model="inputs.reminder"
                    />
                    <span></span>
                  </label>
                </span>
              </b-col>
            </b-row>

            <b-row align-v="center" class="m-4" no-gutters>
              <b-col cols="3">
                <h6>STATUS MONITORING&nbsp;<span></span>&nbsp;:</h6>
              </b-col>
              <b-col>
                <span
                  class="switch switch-sm switch-icon"
                  v-if="inputs.monitored"
                >
                  <label>
                    <input
                      type="checkbox"
                      value="1"
                      v-model="inputs.monitored"
                    />
                    <span></span>
                  </label>
                </span>
                <span class="switch switch-sm switch-icon" v-else>
                  <label>
                    <input
                      type="checkbox"
                      value="0"
                      v-model="inputs.monitored"
                    />
                    <span></span>
                  </label>
                </span>
              </b-col>
            </b-row>
          </div>
        </div>
        <b-row align-v="center" class="m-5">
          <b-col cols="auto" class="ml-auto">
            <button type="submit" class="btn btn-sm btn-success mt-5">
              SIMPAN &nbsp;
              <span><i class="fas fa-chevron-right icon-sm"></i></span>
            </button>
          </b-col>
        </b-row>
      </section>
    </b-modal>
    <Konfigurasi />
  </div>
</template>

<script>
import ApiService from "@/core/services/api.service";
import Swal from "sweetalert2";
import Konfigurasi from "./Konfigurasi.vue";

export default {
  props: ["isAdd"],
  emits: ["closeAdd"],
  components: {
    Konfigurasi,
  },
  data() {
    return {
      listPort: [],
      listMdivece: [],

      indexKonfigurasi: 0,

      inputs: {
        id_m_port: "",
        port_rtu: "",
        selectPort: "",
        mode_port: "analog",
        name_identifier: "",
        is_tanks: false,
        selectDevice: "",
        device_id: "",
        device_name: "",
        tank_length: "",
        tank_height: "",
        tank_wide: "",
        type_tank: "",
        power: "",
        fuel_consumption: "",

        telegram_reminder: "1",
        is_monitored: "1",
        reminder: true,
        monitored: true,
        description: "",

        //hanya untuk di tampilkan di FE
        units: "",
        calibraion: "",
        rotation: "",
        threshold: "",
      },
    };
  },
  watch: {
    isAdd: function () {
      if (this.isAdd == true) {
        this.getPort();
        this.getMdDevice();
      }
    },
    // dataIndex: function () {
    //   this.indexKonfigurasi = this.dataIndex;
    // },
    dataTankLength: function () {
      if (this.dataTankLength != "") {
        this.inputs.tank_length = this.dataTankLength;
      }
    },
    dataTankHeight: function () {
      if (this.dataTankHeight != "") {
        this.inputs.tank_height = this.dataTankHeight;
      }
    },
    dataTypeTank: function () {
      if (this.dataTypeTank != "") {
        this.inputs.type_tank = this.dataTypeTank;
      }
    },
    dataTankWide: function () {
      if (this.dataTankWide != "") {
        this.inputs.tank_wide = this.dataTankWide;
      }
    },
    dataDataPower: function () {
      if (this.dataDataPower != "") {
        this.inputs.power = this.dataDataPower;
      }
    },
    dataFuelConsumption: function () {
      if (this.dataFuelConsumption != "") {
        this.inputs.fuel_consumption = this.dataFuelConsumption;
      }
    },
  },
  computed: {
    dataIndex() {
      return this.$store.state.konfigurasiTangki.indexKonfigurasi;
    },
    dataTankLength() {
      return this.$store.state.konfigurasiTangki.tankLength;
    },
    dataTankHeight() {
      return this.$store.state.konfigurasiTangki.tankHeight;
    },
    dataTypeTank() {
      return this.$store.state.konfigurasiTangki.typeTank;
    },
    dataTankWide() {
      return this.$store.state.konfigurasiTangki.tankWide;
    },
    dataDataPower() {
      return this.$store.state.konfigurasiTangki.dataPower;
    },
    dataFuelConsumption() {
      return this.$store.state.konfigurasiTangki.fuelConsumption;
    },
  },
  methods: {
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
    getMdDevice() {
      ApiService.get(`${process.env.VUE_APP_ROOT_API_4}/other/mdevice`)
        .then(({ data }) => {
          this.listMdivece = data.result.map((item) => ({
            id: item.id,
            name: item.name,
          }));
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    dataPort(data) {
      this.inputs.id_m_port = data.id_port;
      this.inputs.name_identifier = data.port_name;
      if (data.identifier == "BBM") {
        this.$bvModal.show("konfigurasi-tangki");
        this.inputs.is_tanks = true;
      } else {
        this.inputs.is_tanks = false;
      }
    },
    isDeviceSame(data, index) {
      this.inputs.device_id = data.id;
      this.inputs.device_name = data.name;
      for (let i = 0; i < this.inputs.length; i++) {
        if (i != index && this.inputs[i].device_id == data.id) {
          this.inputs.device_id = "";
          this.inputs.device_name = "";
          this.inputs.selectDevice = "";
          Swal.fire({
            icon: "error",
            title: "Oops..",
            text: "Group Topology tidak boleh sama dengan Group Topology lain!",
          });
        }
      }
    },
    closeAdd() {
      this.$emit("closeAdd");
    },
  },
};
</script>
