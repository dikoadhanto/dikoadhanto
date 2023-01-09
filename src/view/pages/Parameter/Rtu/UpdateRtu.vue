<template>
  <div class="card">
    <b-row class="head-wrapper">
      <b-col>
        <h2 class="mt-7 ml-10">Update RTU</h2>
      </b-col>
      <b-col>
        <div class="mt-7 d-flex justify-content-end">
          <button
            @click="backPage()"
            data-wizard-type="action-submit"
            class="btn btn-sm btn-success mr-5"
          >
            Kembali
          </button>
        </div>
      </b-col>
    </b-row>
    <hr />

    <div class="card-body">
      <div
        class="wizard wizard-4"
        id="kt_wizard_v4"
        data-wizard-state="step-first"
        data-wizard-clickable="true"
      >
        <div class="wizard-nav head-wrapper">
          <div
            class="wizard-steps d-flex d-flex-wrap-nowrap justify-content-center align-item-flex-end"
          >
            <div
              class="wizard-step"
              data-wizard-type="step"
              data-wizard-state="current"
            >
              <div class="wizard-wrapper">
                <div class="wizard-number">1</div>
                <div class="wizard-label">
                  <div class="wizard-title">RTU</div>
                  <div class="wizard-desc">Tambah RTU</div>
                </div>
              </div>
            </div>
            <div class="wizard-step" data-wizard-type="step">
              <div class="wizard-wrapper">
                <div class="wizard-number">2</div>
                <div class="wizard-label">
                  <div class="wizard-title">PORT</div>
                  <div class="wizard-desc">Tambah Port</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card card-custom card-shadowless rounded-top-0">
          <div class="card-body p-0">
            <div class="row justify-content-center">
              <div class="col-xl-12 col-xxl-7">
                <form @submit.prevent="" class="ml-25 mr-25">
                  <div
                    class="pb-5"
                    data-wizard-type="step-content"
                    data-wizard-state="current"
                  >
                    <div class="card p-5">
                      <b-row align-v="center" class="m-4" no-gutters>
                        <b-col cols="3">
                          <h6 class="m-0">
                            NAMA MD&nbsp;<span class="required"></span>&nbsp;:
                          </h6>
                        </b-col>
                        <b-col>
                          <select
                            class="form-control form-control-solid"
                            v-model="selectMd"
                          >
                            <option>Pilih MD</option>
                            <option
                              v-for="(data, i) in dataListMd"
                              :key="i"
                              :value="data.md_id"
                            >
                              <span class="badge badge-danger text-white">{{
                                data.md_name
                              }}</span>
                            </option>
                          </select>
                        </b-col>
                      </b-row>

                      <b-row align-v="center" class="m-4" no-gutters>
                        <b-col cols="3">
                          <h6>
                            NAMA RTU&nbsp;<span class="required"></span>&nbsp;:
                          </h6>
                        </b-col>
                        <b-col>
                          <input
                            type="text"
                            class="form-control form-control-solid"
                            v-model="nameRtu"
                          />
                        </b-col>
                      </b-row>

                      <b-row align-v="center" class="m-4" no-gutters>
                        <b-col cols="3">
                          <h6>
                            LOKASI RTU&nbsp;<span class="required"></span
                            >&nbsp;:
                          </h6>
                        </b-col>
                        <b-col>
                          <select
                            class="form-control form-control-sm"
                            v-model="idLocation"
                            @change="getLocation(idLocation)"
                          >
                            <option value="" selected disabled hidden>
                              Pilih LOKASI RTU
                            </option>
                            <option
                              v-for="(data, i) in listLocation"
                              :key="i"
                              :value="data.id"
                            >
                              <span class="badge badge-danger text-white">{{
                                data.name
                              }}</span>
                            </option>
                          </select>
                        </b-col>
                      </b-row>

                      <b-row align-v="center" class="m-4" no-gutters>
                        <b-col cols="3">
                          <h6>SNAME&nbsp;<span></span>&nbsp;:</h6>
                        </b-col>
                        <b-col>
                          <input
                            type="text"
                            disabled
                            class="form-control form-control-solid"
                            v-model="sname"
                          />
                        </b-col>
                      </b-row>

                      <b-row align-v="center" class="m-4" no-gutters>
                        <b-col cols="3">
                          <h6>
                            IP ADDRESS RTU&nbsp;<span class="required"></span
                            >&nbsp;:
                          </h6>
                        </b-col>
                        <b-col>
                          <input
                            type="text"
                            v-model="ipAddressRTU"
                            class="form-control form-control-solid"
                          />
                        </b-col>
                      </b-row>
                    </div>

                    <div class="card p-5 mt-5">
                      <b-row align-v="center" class="m-4" no-gutters>
                        <b-col cols="3">
                          <h6 class="m-0">TAGS&nbsp;<span></span>&nbsp;:</h6>
                        </b-col>
                        <b-col cols="9">
                          <Treeselect
                            style="background: f3f6f9"
                            v-model="selectedTags"
                            placeholder="Pilih tags"
                            :options="dataTags"
                            node-label-prop="name"
                            :multiple="true"
                          />
                        </b-col>
                      </b-row>
                      <b-row align-v="center" class="m-4" no-gutters>
                        <b-col cols="3">
                          <h6>
                            DESKRIPSI &nbsp;<span class="required"></span
                            >&nbsp;:
                          </h6>
                        </b-col>
                        <b-col>
                          <textarea
                            class="form-control form-control-solid"
                            v-model="deskripsiRTU"
                          />
                        </b-col>
                      </b-row>
                    </div>
                  </div>

                  <div class="pb-5" data-wizard-type="step-content">
                    <h3 class="text-center mt-4 mb-8">{{ nameRtu }}</h3>
                    <div v-for="(data, index) in inputs" :key="index">
                      <div class="accordion accordion-toggle-arrow">
                        <div class="card">
                          <b-card-header header-tag="header" class="p-1">
                            <div
                              class="card-title collapsed"
                              data-toggle="collapse"
                              v-b-toggle="`collapse-${index}`"
                            >
                              Form {{ index + 1 }}

                              <i
                                class="fas fa-trash text-dark"
                                @click="deleteForm(index)"
                              ></i>
                            </div>
                          </b-card-header>
                          <b-collapse
                            visible
                            :id="'collapse-' + index"
                            accordion="my-group"
                          >
                            <div class="card p-5">
                              <b-row align-v="center" class="m-4" no-gutters>
                                <b-col cols="3">
                                  <h6>
                                    PORT NUMBER &nbsp;<span
                                      class="required"
                                    ></span
                                    >&nbsp;:
                                  </h6>
                                </b-col>
                                <b-col>
                                  <input
                                    type="number"
                                    class="form-control form-control-solid"
                                    v-model="inputs[index].port_rtu"
                                  />
                                </b-col>
                              </b-row>

                              <b-row align-v="center" class="m-4" no-gutters>
                                <b-col cols="3">
                                  <h6>
                                    MODE PORT&nbsp;<span class="required"></span
                                    >&nbsp;:
                                  </h6>
                                </b-col>
                                <b-col>
                                  <label>
                                    <input
                                      type="radio"
                                      value="analog"
                                      v-model="inputs[index].mode_port"
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
                                      v-model="inputs[index].mode_port"
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
                                    IDENTIFIER NAME&nbsp;<span
                                      class="required"
                                    ></span
                                    >&nbsp;:
                                  </h6>
                                </b-col>
                                <b-col>
                                  <select
                                    class="form-control form-control-solid"
                                    v-model="inputs[index].id_m_port"
                                    @change="
                                      dataPort(inputs[index].id_m_port, index)
                                    "
                                  >
                                    <option>Pilih IDENTIFIER</option>
                                    <option
                                      v-for="(data, i) in listPort"
                                      :key="i"
                                      :value="data.id_port"
                                    >
                                      <span
                                        class="badge badge-danger text-white"
                                        >{{ data.port_name }}</span
                                      >
                                    </option>
                                  </select>
                                </b-col>
                              </b-row>

                              <b-row align-v="center" class="m-4" no-gutters>
                                <b-col cols="3">
                                  <h6>
                                    GROUP TOPOLOGY&nbsp;<span
                                      class="required"
                                    ></span
                                    >&nbsp;:
                                  </h6>
                                </b-col>
                                <b-col>
                                  <b-form-select
                                    class="form-control"
                                    v-model="inputs[index].device_id"
                                    @change="
                                      isDeviceSame(
                                        inputs[index].device_id,
                                        index
                                      )
                                    "
                                  >
                                    <option disabled value="">
                                      Pilih Nama Group Topology
                                    </option>
                                    <option
                                      v-for="(item, i) in listMdivece"
                                      :key="i"
                                      :value="item.id"
                                    >
                                      {{ item.name.replace(/UNIQUE /g, "") }}
                                    </option>
                                  </b-form-select>
                                </b-col>
                              </b-row>
                              <b-row align-v="center" class="m-4" no-gutters>
                                <b-col cols="3">
                                  <h6>
                                    DESKRIPSI &nbsp;<span
                                      class="required"
                                    ></span
                                    >&nbsp;:
                                  </h6>
                                </b-col>
                                <b-col>
                                  <textarea
                                    class="form-control form-control-solid"
                                    v-model="inputs[index].description"
                                  />
                                </b-col>
                              </b-row>
                            </div>

                            <div class="card p-5 mt-5">
                              <b-row align-v="center" class="m-4" no-gutters>
                                <b-col cols="3">
                                  <h6>
                                    UNITS&nbsp;<span class="required"></span
                                    >&nbsp;:
                                  </h6>
                                </b-col>
                                <b-col>
                                  <input
                                    type="text"
                                    disabled
                                    class="form-control form-control-solid"
                                    v-model="inputs[index].units"
                                  />
                                </b-col>
                              </b-row>

                              <b-row align-v="center" class="m-4" no-gutters>
                                <b-col cols="3">
                                  <h6>
                                    CALIBRATION VALUE &nbsp;<span
                                      class="required"
                                    ></span
                                    >&nbsp;:
                                  </h6>
                                </b-col>
                                <b-col>
                                  <input
                                    type="text"
                                    disabled
                                    class="form-control form-control-solid"
                                    v-model="inputs[index].calibration_value"
                                  />
                                </b-col>
                              </b-row>
                              <b-row align-v="center" class="m-4" no-gutters>
                                <b-col cols="3">
                                  <h6>
                                    DATA ROTATION &nbsp;<span
                                      class="required"
                                    ></span
                                    >&nbsp;:
                                  </h6>
                                </b-col>
                                <b-col cols="4">
                                  <input
                                    type="text"
                                    disabled
                                    class="form-control form-control-solid"
                                    v-model="inputs[index].data_rotation"
                                  />
                                </b-col>
                                <b-col cols="3">
                                  <h6>&nbsp; HARI<span></span></h6>
                                </b-col>
                              </b-row>

                              <b-row align-v="center" class="m-4" no-gutters>
                                <b-col cols="3">
                                  <h6>
                                    THRESHOLD RULE&nbsp;<span
                                      class="required"
                                    ></span
                                    >&nbsp;:
                                  </h6>
                                </b-col>
                                <b-col cols="4">
                                  <input
                                    type="text"
                                    disabled
                                    class="form-control form-control-solid"
                                    v-model="inputs[index].rule"
                                  />
                                </b-col>
                                <b-col cols="3">
                                  <h6>&nbsp; NORMAL<span></span></h6>
                                </b-col>
                              </b-row>
                            </div>

                            <div class="card p-5 mt-5">
                              <b-row align-v="center" class="m-4" no-gutters>
                                <b-col cols="3">
                                  <h6>
                                    TELEGRAM REMINDER&nbsp;<span></span>&nbsp;:
                                  </h6>
                                </b-col>
                                <b-col>
                                  <span
                                    class="switch switch-sm switch-icon"
                                    v-if="inputs[index].reminder"
                                  >
                                    <label class="m-0">
                                      <input
                                        type="checkbox"
                                        name=""
                                        value="1"
                                        checked
                                        v-model="inputs[index].reminder"
                                        @change="
                                          addMotoringTelegram(
                                            index,
                                            inputs[index].monitored,
                                            inputs[index].reminder
                                          )
                                        "
                                      />
                                      <span></span>
                                    </label>
                                  </span>
                                  <span
                                    class="switch switch-sm switch-icon"
                                    v-else
                                  >
                                    <label class="m-0">
                                      <input
                                        type="checkbox"
                                        value="0"
                                        v-model="inputs[index].reminder"
                                        @change="
                                          addMotoringTelegram(
                                            index,
                                            inputs[index].monitored,
                                            inputs[index].reminder
                                          )
                                        "
                                      />
                                      <span></span>
                                    </label>
                                  </span>
                                </b-col>
                              </b-row>

                              <b-row align-v="center" class="m-4" no-gutters>
                                <b-col cols="3">
                                  <h6>
                                    STATUS MONITORING&nbsp;<span></span>&nbsp;:
                                  </h6>
                                </b-col>
                                <b-col>
                                  <span
                                    class="switch switch-sm switch-icon"
                                    v-if="inputs[index].monitored"
                                  >
                                    <label>
                                      <input
                                        type="checkbox"
                                        value="1"
                                        v-model="inputs[index].monitored"
                                        @change="
                                          addMotoringTelegram(
                                            index,
                                            inputs[index].monitored,
                                            inputs[index].reminder
                                          )
                                        "
                                      />
                                      <span></span>
                                    </label>
                                  </span>
                                  <span
                                    class="switch switch-sm switch-icon"
                                    v-else
                                  >
                                    <label>
                                      <input
                                        type="checkbox"
                                        value="0"
                                        v-model="inputs[index].monitored"
                                        @change="
                                          addMotoringTelegram(
                                            index,
                                            inputs[index].monitored,
                                            inputs[index].reminder
                                          )
                                        "
                                      />
                                      <span></span>
                                    </label>
                                  </span>
                                </b-col>
                              </b-row>
                            </div>
                          </b-collapse>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="d-flex justify-content-between border-top pt-10">
                    <div class="d-flex justify-content-start">
                      <!-- <button
                        @click="updateBackRTU()"
                        class="btn btn-sm btn-success mr-5"
                      >
                        SIMPAN & KEMBALI
                      </button> -->
                    </div>
                    <div class="d-flex justify-content-end">
                      <button
                        @click="addForm()"
                        data-wizard-type="action-submit"
                        class="btn btn-sm btn-success mr-5"
                      >
                        Tambah
                      </button>
                      <button
                        class="btn btn-sm btn-success mr-5"
                        data-wizard-type="action-submit"
                        @click="updateRTU()"
                      >
                        Simpan
                      </button>
                      <button
                        class="btn btn-sm btn-success mr-5"
                        data-wizard-type="action-next"
                      >
                        Lanjut
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Konfigurasi :indexKonfigurasi="indexKonfigurasi" />
  </div>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import ApiService from "@/core/services/api.service";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import KTUtil from "@/assets/js/components/util";
import KTWizard from "@/assets/js/components/wizard";
import Swal from "sweetalert2";
// import TemplatePort from "../Rtu/TempelatePort.vue";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import Konfigurasi from "@/view/pages/Parameter/Rtu/Konfigurasi.vue";

export default {
  name: "UpdateRtu",
  components: {
    Treeselect,
    // TemplatePort,
    Konfigurasi,
  },

  data() {
    return {
      dataListMd: [],
      selectMd: "",
      nameRtu: "",
      listLocation: [],
      idLocation: "",
      sname: "",
      ipAddressRTU: "",
      dataTags: [],
      selectedTags: [],
      deskripsiRTU: "",

      listPort: [],
      listMdivece: [],

      indexKonfigurasi: 0,
      idSelected: "",
      is_validate: true,
      isOpenTemplate: false,

      inputs: [],
    };
  },
  created() {
    this.idSelected = this.$route.params.idSelected;
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
  mounted() {
    this.getDataRtu();
    this.getDataTags();
    this.getMd();
    this.getListLocation();
    this.getPort();
    this.getMDevice();

    const wizard = new KTWizard("kt_wizard_v4", {
      startStep: 1, // initial active step number
      clickableSteps: true, // allow step clicking
    });

    // Validation before going to next page
    wizard.on("beforeNext", function (/*wizardObj*/) {
      // validate the form and use below function to stop the wizard's step
      // wizardObj.stop();
    });

    // Change event
    wizard.on("change", function (/*wizardObj*/) {
      setTimeout(() => {
        KTUtil.scrollTop();
      }, 500);
    });

    wizard.this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Parameter", subtitle: "Update RTU" },
    ]);
  },

  watch: {
    //for set data from modal configurasi tangki
    dataIndex: function () {
      this.indexKonfigurasi = this.dataIndex;
    },
    dataTankLength: function () {
      if (this.dataTankLength != "") {
        this.inputs[this.indexKonfigurasi].tank_length = this.dataTankLength;
      }
    },
    dataTankHeight: function () {
      if (this.dataTankHeight != "") {
        this.inputs[this.indexKonfigurasi].tank_height = this.dataTankHeight;
      }
    },
    dataTypeTank: function () {
      if (this.dataTypeTank != "") {
        this.inputs[this.indexKonfigurasi].type_tank = this.dataTypeTank;
      }
    },
    dataTankWide: function () {
      if (this.dataTankWide != "") {
        this.inputs[this.indexKonfigurasi].tank_wide = this.dataTankWide;
      }
    },
    dataDataPower: function () {
      if (this.dataDataPower != "") {
        this.inputs[this.indexKonfigurasi].power = this.dataDataPower;
      }
    },
    dataFuelConsumption: function () {
      if (this.dataFuelConsumption != "") {
        this.inputs[this.indexKonfigurasi].fuel_consumption =
          this.dataFuelConsumption;
      }
    },

    // for select location rtu
  },

  methods: {
    getDataRtu() {
      ApiService.get(
        `${process.env.VUE_APP_ROOT_API_4}/rtu`,
        `port/${this.idSelected}`
      )
        .then(({ data }) => {
          this.selectMd = data.result.md_id;

          this.nameRtu = data.result.rtu_name;
          this.idLocation = data.result.location_id;
          this.sname = data.result.rtu_sname;
          this.ipAddressRTU = data.result.ip_address;
          this.selectedTags = data.result.tags.map((item) => {
            return item.id;
          });
          this.deskripsiRTU = data.result.description;

          data.result.info_port.map((items) => {
            this.inputs.push({
              id_rtu_port: items.id_rtu_port,
              id_m_port: items.id_m_port,
              name_identifier: items.name_identifier,
              units: items.units,
              calibration_value: items.calibration,
              data_rotation: items.data_rotation,
              is_tanks: false,
              device_id: items.device_id,
              device_name: "",
              tank_length: "",
              tank_height: "",
              tank_wide: "",
              type_tank: "",
              power: "",
              fuel_consumption: "",
              port_rtu: items.port_rtu.match(/\d+/g)[0],
              mode_port: items.mode_port,
              threshold: items.rule,
              description: items.desc,
              telegram_reminder: items.telegram_reminder,
              is_monitored: items.is_monitored,
              reminder: items.telegram_reminder == "1" ? true : false,
              monitored: items.is_monitored == "1" ? true : false,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async updateRTU() {
      if (this.selectMd == "" || this.selectMd == null) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Nama MD tidak boleh kosong",
        });
      } else if (this.nameRtu == "" || this.nameRtu == null) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Nama RTU tidak boleh kosong",
        });
      } else if (this.idLocation == "" || this.idLocation == null) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Lokasi tidak boleh kosong",
        });
      } else if (this.ipAddressRTU == "" || this.ipAddressRTU == null) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Ip Address RTU tidak boleh kosong",
        });
      } else if (this.selectedTags.length === 0) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "TAG tidak boleh kosong",
        });
      } else {
        this.inputs.map((items) => {
          if (items.port_rtu == "" || items.port_rtu == null) {
            this.is_validate = false;

            Swal.fire({
              icon: "error",
              title: "Oops..",
              text: "Port Number tidak boleh kosong",
            });
          } else if (items.mode_port == "" || items.mode_port == null) {
            this.is_validate = false;

            Swal.fire({
              icon: "error",
              title: "Oops..",
              text: "Mode Port tidak boleh kosong",
            });
          } else if (items.id_m_port == "" || items.id_m_port == null) {
            this.is_validate = false;

            Swal.fire({
              icon: "error",
              title: "Oops..",
              text: "Identifier tidak boleh kosong",
            });
          } else if (items.device_id == "" || items.device_id == null) {
            this.is_validate = false;
            Swal.fire({
              icon: "error",
              title: "Oops..",
              text: " Group Topology tidak boleh kosong",
            });
          } else if (items.description == "" || items.description == null) {
            this.is_validate = false;
            Swal.fire({
              icon: "error",
              title: "Oops..",
              text: " Deskripsi tidak boleh kosong",
            });
          } else if (
            (items.tank_length == "" || items.tank_length == null) &&
            items.is_tanks
          ) {
            this.is_validate = false;

            Swal.fire({
              icon: "error",
              title: "Oops..",
              text: "Panjang Tangki tidak boleh kosong",
            });
          } else if (
            (items.tank_height == "" || items.tank_height == null) &&
            items.is_tanks
          ) {
            this.is_validate = false;

            Swal.fire({
              icon: "error",
              title: "Oops..",
              text: "Tinggi Tangki tidak boleh kosong",
            });
          } else if (
            (items.tank_wide == "" || items.tank_wide == null) &&
            items.is_tanks
          ) {
            this.is_validate = false;

            Swal.fire({
              icon: "error",
              title: "Oops..",
              text: "Lebar Tangki tidak boleh kosong",
            });
          } else if (
            (items.type_tank == "" || items.type_tank == null) &&
            items.is_tanks
          ) {
            this.is_validate = false;

            Swal.fire({
              icon: "error",
              title: "Oops..",
              text: "Tipe Tangki tidak boleh kosong",
            });
          } else if (
            (items.power == "" || items.power == null) &&
            items.is_tanks
          ) {
            this.is_validate = false;

            Swal.fire({
              icon: "error",
              title: "Oops..",
              text: "Power tidak boleh kosong",
            });
          } else if (
            (items.fuel_consumption == "" || items.fuel_consumption == null) &&
            items.is_tanks
          ) {
            this.is_validate = false;

            Swal.fire({
              icon: "error",
              title: "Oops..",
              text: "Fuel Consumption tidak boleh kosong",
            });
          }
        });
        if (this.is_validate) {
          let dataAddRtu = {
            id_md: this.selectMd,
            name_rtu: this.nameRtu,
            id_m_location: this.idLocation,
            ip_address: this.ipAddressRTU,
            id_tags: this.selectedTags,
            description: this.deskripsiRTU,
            sname: this.sname,
            multiUpdatePort: this.inputs,
          };
          this.$bvModal.show("modalLoading");

          ApiService.patch(
            `${process.env.VUE_APP_ROOT_API_4}/rtu/update/${this.idSelected}`,
            dataAddRtu
          )
            .then(() => {
              this.$bvModal.hide("modalLoading");

              Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Data berhasil diubah",
              }).then((result) => {
                if (result.isConfirmed || result.isDismissed) {
                  this.dataTags = [];
                  this.selectedTags = [];
                  this.dataListMd = [];
                  this.selectMd = "";
                  this.listLocation = [];
                  this.idLocation = "";
                  this.nameRtu = "";
                  this.sname = "";
                  this.ipAddressRTU = "";
                  this.listPort = [];
                  this.indexKonfigurasi = 0;
                  this.idSelected = "";
                  this.is_validate = true;

                  this.inputs = [
                    {
                      selectPort: [],
                      is_tanks: false,
                      device_id: "",
                      device_name: "",
                      tank_length: "",
                      tank_height: "",
                      tank_wide: "",
                      type_tank: "",
                      power: "",
                      fuel_consumption: "",
                      id_rtu_port: "",
                      id_m_port: "",
                      port_rtu: "",
                      mode_port: "",
                      unit: "",
                      calibraion: "",
                      rotation: "",
                      threshold: "",
                      name_identifier: "",
                      telegram_reminder: 1,
                      is_monitored: 1,
                      reminder: true,
                      monitored: true,
                    },
                  ];

                  this.$router.push({ name: "RtuList" });
                }
              });
            })
            .catch((error) => {
              let errorGeneral = [
                "DATABASE_ERROR",
                "UNKNOWN_SIGN",
                "INTERNAL_SERVER_ERROR",
              ];
              if (errorGeneral.includes(error.response.data.error_sign)) {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Maaf, server sedang dalam perbaikan. Mohon menunggu sebentar lagi!",
                });
              } else if (
                error.response.data.error_sign == "ALREADY_AVAILABLE" ||
                error.response.data.error_sign == "NOT_AVAILABLE"
              ) {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Maaf, lokasi RTU sudah digunakan. Mohon gunakan lokasi yang lain !",
                });
              }
              this.$bvModal.hide("modalLoading");

              console.log(error.response);
            });
        }
      }
    },

    async updateBackRTU() {
      if (this.selectMd == "" || this.selectMd == null) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Nama MD tidak boleh kosong",
        });
      } else if (this.nameRtu == "" || this.nameRtu == null) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Nama RTU tidak boleh kosong",
        });
      } else if (this.idLocation == "" || this.idLocation == null) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Lokasi tidak boleh kosong",
        });
      } else if (this.ipAddressRTU == "" || this.ipAddressRTU == null) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Ip Address RTU tidak boleh kosong",
        });
      } else if (this.selectedTags.length === 0) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "TAG tidak boleh kosong",
        });
      } else {
        this.inputs = [];
        let dataAddRtu = {
          id_md: this.selectMd,
          name_rtu: this.nameRtu,
          id_m_location: this.idLocation,
          ip_address: this.ipAddressRTU,
          id_tags: this.selectedTags,
          sname: this.sname,
          multiUpdatePort: this.inputs,
        };
        this.$bvModal.show("modalLoading");

        ApiService.patch(
          `${process.env.VUE_APP_ROOT_API_4}/update/${this.idSelected}`,
          dataAddRtu
        )
          .then(() => {
            this.$bvModal.hide("modalLoading");

            Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "Data berhasil diubah",
            }).then((result) => {
              if (result.isConfirmed || result.isDismissed) {
                this.dataTags = [];
                this.selectedTags = [];
                this.dataListMd = [];
                this.selectMd = "";
                this.listLocation = [];
                this.idLocation = "";
                this.nameRtu = "";
                this.sname = "";
                this.ipAddressRTU = "";
                this.listPort = [];
                this.indexKonfigurasi = 0;
                this.idSelected = "";
                this.is_validate = true;
                this.inputs = [
                  {
                    selectPort: [],
                    is_tanks: false,
                    device_id: "",
                    device_name: "",
                    tank_length: "",
                    tank_height: "",
                    tank_wide: "",
                    type_tank: "",
                    power: "",
                    fuel_consumption: "",
                    id_rtu_port: "",
                    id_m_port: "",
                    port_rtu: "",
                    mode_port: "",
                    unit: "",
                    calibraion: "",
                    rotation: "",
                    threshold: "",
                    name_identifier: "",
                    telegram_reminder: 1,
                    is_monitored: 1,
                    reminder: true,
                    monitored: true,
                  },
                ];

                this.$router.push({ name: "RtuList" });
              }
            });
          })
          .catch((error) => {
            let errorGeneral = [
              "DATABASE_ERROR",
              "UNKNOWN_SIGN",
              "INTERNAL_SERVER_ERROR",
            ];
            if (errorGeneral.includes(error.response.data.error_sign)) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Maaf, server sedang dalam perbaikan. Mohon menunggu sebentar lagi!",
              });
            } else if (
              error.response.data.error_sign == "ALREADY_AVAILABLE" ||
              error.response.data.error_sign == "NOT_AVAILABLE"
            ) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Maaf, lokasi RTU sudah digunakan. Mohon gunakan lokasi yang lain !",
              });
            }
            this.$bvModal.hide("modalLoading");

            console.log(error.response);
          });
      }
    },

    //for get data tags
    getDataTags() {
      ApiService.get(`${process.env.VUE_APP_ROOT_API_3}/tags`).then(
        ({ data }) => {
          this.dataTags = data.result.tags.map((item) => ({
            id: item.id,
            label: item.name,
          }));
        }
      );
    },

    // for get data location rtu
    getListLocation() {
      ApiService.query(`${process.env.VUE_APP_ROOT_API_3}/locations?`)
        .then(({ data }) => {
          this.listLocation = data.result.locations;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    //for get data MD
    async getMd() {
      ApiService.query(`${process.env.VUE_APP_ROOT_API_4}/md`, {
        params: {
          page: "1",
          limit: "all",
        },
      })
        .then(({ data }) => {
          this.dataListMd = data.result.payload.filter(
            (item) => item.md_id != "md-all-dummy" && item.status == "normal"
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // for get data port managemnet
    async getPort() {
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
          console.log(error);
        });
    },

    getMDevice() {
      ApiService.get(`${process.env.VUE_APP_ROOT_API_4}/other/mdevice`)
        .then(({ data }) => {
          this.listMdivece = data.result.map((item) => ({
            id: item.id,
            name: item.name,
          }));
        })
        .catch((e) => {
          console.log(e);
        });
    },

    //for form repeter add and delate
    addForm() {
      this.inputs.push({
        selectPort: "",
        is_tanks: false,
        device_id: "",
        device_name: "",
        tank_length: "",
        tank_height: "",
        tank_wide: "",
        type_tank: "",
        power: "",
        fuel_consumption: "",
        id_rtu_port: "",
        id_m_port: "",
        port_rtu: "",
        mode_port: "analog",
        unit: "",
        calibraion: "",
        rotation: "",
        threshold: "",
        description: "",
        name_identifier: "",
        telegram_reminder: 1,
        is_monitored: 1,
        reminder: true,
        monitored: true,
      });
    },

    deleteForm(index) {
      this.inputs.splice(index, 1);
    },

    submit: function (e) {
      e.preventDefault();
      Swal.fire({
        title: "",
        text: "The application has been successfully submitted!",
        icon: "success",
        confirmButtonClass: "btn btn-secondary",
      });
    },

    addMotoringTelegram(index, monitored, reminder) {
      if (monitored) {
        this.inputs[index].is_monitored = 1;
      } else {
        this.inputs[index].is_monitored = 0;
      }

      if (reminder) {
        this.inputs[index].telegram_reminder = 1;
      } else {
        this.inputs[index].telegram_reminder = 0;
      }
    },

    showKonfigurasi(index) {
      this.indexKonfigurasi = index;
      this.$bvModal.show("konfigurasi");
    },

    //format sname rtu
    templateSname(id) {
      var output = this.listLocation.filter((data) => data.id == id);
      let lengthData = output[0].rtus.length;
      let newSname;

      if (lengthData == 0) {
        newSname = `RTU00-${output[0].sname_regional}-${output[0].sname}`;
      } else {
        if (output[0].rtus[lengthData - 1].sname_number + 1 > 9) {
          newSname = `RTU${output[0].rtus[lengthData - 1].sname_number + 1}-${
            output[0].sname_regional
          }-${output[0].sname}`;
        } else {
          newSname = `RTU0${output[0].rtus[lengthData - 1].sname_number + 1}-${
            output[0].sname_regional
          }-${output[0].sname}`;
        }
      }
      this.sname = newSname;
    },

    // set condition if data port/identifier == bbm
    dataPort(id, index) {
      var output = this.listPort.filter((data) => data.id_port == id);
      this.inputs[index].name_identifier = output[0].port_name;
      this.inputs[index].units = output[0].units;
      this.inputs[index].calibration_value = output[0].calibration_value;
      this.inputs[index].data_rotation = output[0].data_rotation;
      if (output[0].identifier == "BBM") {
        this.inputs[index].is_tanks = true;
        this.showKonfigurasi(index);
      } else {
        this.inputs[index].is_tanks = false;
      }
    },

    isDeviceSame(id, index) {
      var output = this.listMdivece.filter((data) => data.id == id);
      this.inputs[index].device_name = output[0].name;
      for (let i = 0; i < this.inputs.length; i++) {
        if (i != index && this.inputs[i].device_id == id) {
          this.inputs[index].device_id = "";
          this.inputs[index].device_name = "";
          Swal.fire({
            icon: "error",
            title: "Oops..",
            text: "Group Topology tidak boleh sama dengan Group Topology lain!",
          });
        }
      }
    },

    showTempelate() {
      this.isOpenTemplate = true;
      this.$bvModal.show("tempelate-port");
    },

    closeModalTempelate() {
      this.isOpenTemplate = false;
      this.$bvModal.hide("tempelate-port");
    },

    getLocation(id) {
      if (this.id != "") {
        this.templateSname(id);
      }
    },
    backPage() {
      this.$router.push({ name: "RtuList" });
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/sass/pages/wizard/wizard-4.scss";

.accordion .card .card-header .card-title {
  display: flex;
  -ms-flex-pack: start;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  flex-wrap: nowrap;
}

.fa-trash,
.icon-detail,
.button-click {
  cursor: pointer;
}

.required:after {
  content: "*";
  color: red;
}

.flex-container-wizard {
  display: block !important;
  justify-content: center;
}

.wizard.wizard-4 .wizard-nav .wizard-steps .wizard-step {
  display: block;
  flex-basis: content;
  background-color: #ffffff;
}

.wizard.wizard-4
  .wizard-nav
  .wizard-steps
  .wizard-step
  .wizard-wrapper
  .wizard-number {
  flex: 0 0 60px;
  height: 60px;
  width: 60px;
}
</style>
