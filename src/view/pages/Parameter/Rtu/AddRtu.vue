<template>
  <div class="card">
    <b-row class="head-wrapper">
      <b-col>
        <h2 class="mt-7 ml-10">Tambah RTU</h2>
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
                            v-model="selectLocation"
                          >
                            <option value="" selected disabled hidden>
                              Pilih LOKASI RTU
                            </option>
                            <option
                              v-for="(data, i) in listLocation"
                              :key="i"
                              :value="data"
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
                          <h6>
                            TAGS&nbsp;<span class="required"></span>&nbsp;:
                          </h6>
                        </b-col>
                        <!-- <b-col>
                          <select
                            class="form-control form-control-sm"
                            v-model="selectedTags"
                          >
                            <option value="" selected disabled hidden>
                              Pilih TAGS
                            </option>
                            <option
                              v-for="(data, i) in dataTags"
                              :key="i"
                              :value="data.id"
                            >
                              <span class="badge badge-danger text-white">{{
                                data.label
                              }}</span>
                            </option>
                          </select>
                        </b-col> -->
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

                      <b-row align-v="center" class="m-4" no-gutters>
                        <b-col cols="3">
                          <h6>TEMPLATE&nbsp;<span></span>&nbsp;:</h6>
                        </b-col>
                        <b-col>
                          <input
                            type="text"
                            class="form-control form-control-solid"
                            v-model="nameTempalte"
                            @click="showTempelate()"
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
                                    type="text"
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
                                    v-model="inputs[index].selectPort"
                                    @change="
                                      dataPort(inputs[index].selectPort, index)
                                    "
                                  >
                                    <option>Pilih IDENTIFIER</option>
                                    <option
                                      v-for="(data, i) in listPort"
                                      :key="i"
                                      :value="data"
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
                                    v-model="inputs[index].selectDevice"
                                    @change="
                                      isDeviceSame(
                                        inputs[index].selectDevice,
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
                                      :value="item"
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
                                    v-model="inputs[index].selectPort.units"
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
                                    v-model="
                                      inputs[index].selectPort.calibration_value
                                    "
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
                                    v-model="
                                      inputs[index].selectPort.data_rotation
                                    "
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
                                    v-model="inputs[index].selectPort.rule"
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
                      <!-- <div v-if="isTemplate">
                        <button
                          class="btn btn-sm btn-success mr-5"
                          @click="addBack()"
                        >
                          SIMPAN & KEMBALI
                        </button>
                      </div> -->
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
                        @click="addRTU()"
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
    <TemplatePort
      @closeModalTempelate="closeModalTempelate"
      :isOpen="isOpenTemplate"
    />
    <Konfigurasi :indexKonfigurasi="indexKonfigurasi" />
  </div>
</template>

<script>
import ApiService from "@/core/services/api.service";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import KTUtil from "@/assets/js/components/util";
import KTWizard from "@/assets/js/components/wizard";
import Swal from "sweetalert2";
import TemplatePort from "../Rtu/TempelatePort.vue";
import Konfigurasi from "@/view/pages/Parameter/Rtu/Konfigurasi.vue";
import { mapGetters } from "vuex";

export default {
  name: "AddRtu",
  components: {
    Treeselect,
    TemplatePort,
    Konfigurasi,
  },

  data() {
    return {
      dataListMd: [],
      selectMd: "",
      nameRtu: "",
      listLocation: [],
      selectLocation: "",
      idLocation: "",
      sname: "",
      dataTags: [],
      selectedTags: [],
      deskripsiRTU: "",
      ipAddressRTU: "",
      listPort: [],
      indexKonfigurasi: 0,
      is_validate: true,
      isTambah: false,
      isOpenTemplate: false,
      nameTempalte: "",

      isTemplate: true,
      isBack: true,
      listIdentifierByTempalte: [],

      listMdivece: [],

      inputs: [
        {
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
      ],
    };
  },
  computed: {
    ...mapGetters(["getDataTemplateRtuPort", "getNameTemplareRTUPORT"]),
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
  },

  watch: {
    getNameTemplareRTUPORT() {
      this.nameTempalte = this.getNameTemplareRTUPORT;
    },
    getDataTemplateRtuPort() {
      this.isTemplate = false;

      this.inputs = [];
      this.getDataTemplateRtuPort.map((item) => {
        const splitPort = item.port.split("-");
        const dataIdentifier = this.listPort.filter(
          (data) => data.identifier == item.identifier
        );
        this.inputs.push({
          id_m_port: item.id_port,
          port_rtu: splitPort[1],
          mode_port: item.mode,
          selectPort: dataIdentifier[0],
          name_identifier: item.identifier,
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
          telegram_reminder: item.is_notified,
          is_monitored: item.is_monitored,
          reminder: item.is_notified == "1" ? true : false,
          monitored: item.is_monitored == "1" ? true : false,
          //hanya untuk di tampilkan di FE
          units: "",
          calibraion: "",
          rotation: "",
          threshold: "",
        });
      });

      // }
    },
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
    selectLocation: function () {
      if (this.selectLocation != "") {
        this.templateSname();
      }
    },
  },

  methods: {
    async addRTU() {
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
      } else if (this.selectedTags === 0) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "TAG tidak boleh kosong",
        });
      } else if (this.deskripsiRTU == "" || this.deskripsiRTU == null) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Deskripsi RTU tidak boleh kosong",
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
            sname: this.sname,
            ip_address: this.ipAddressRTU,
            id_tags: this.selectedTags,
            description: this.deskripsiRTU,
            multiInsertPort: this.inputs,
          };
          this.$bvModal.show("modalLoading");

          ApiService.post(
            `${process.env.VUE_APP_ROOT_API_4}/rtu/add`,
            dataAddRtu
          )
            .then(() => {
              this.$bvModal.hide("modalLoading");

              Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Data berhasil ditambahkan",
              }).then((result) => {
                if (result.isConfirmed || result.isDismissed) {
                  this.selectMd = "";
                  this.selectLocation = "";
                  this.idLocation = "";
                  this.nameRtu = "";
                  this.sname = "";
                  this.ipAddressRTU = "";
                  this.indexKonfigurasi = 0;
                  this.is_validate = true;
                  this.inputs = [
                    {
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
                      id_m_port: "",
                      port_rtu: "",
                      mode_port: "",
                      units: "",
                      calibraion: "",
                      rotation: "",
                      threshold: "",
                      name_identifier: "",
                      telegram_reminder: "1",
                      is_monitored: "1",
                    },
                  ];
                  this.$bvModal.hide("modalLoading");
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

    async addBack() {
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
      } else if (this.selectedTags === 0) {
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
          sname: this.sname,
          ip_address: this.ipAddressRTU,
          id_tags: this.selectedTags,
          // multiInsertPort: this.inputs,
        };

        this.$bvModal.show("modalLoading");

        ApiService.post(`${process.env.VUE_APP_ROOT_API_4}/rtu/add`, dataAddRtu)
          .then(() => {
            this.$bvModal.hide("modalLoading");

            Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "Data berhasil ditambahkan",
            }).then((result) => {
              if (result.isConfirmed || result.isDismissed) {
                this.selectMd = "";
                this.selectLocation = "";
                this.idLocation = "";
                this.nameRtu = "";
                this.sname = "";
                this.ipAddressRTU = "";
                this.indexKonfigurasi = 0;
                this.is_validate = true;
                this.inputs = [
                  {
                    selectPort: "",
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
                    id_m_port: "",
                    port_rtu: "",
                    mode_port: "",
                    units: "",
                    calibraion: "",
                    rotation: "",
                    threshold: "",
                    description: "",

                    name_identifier: "",
                    telegram_reminder: "1",
                    is_monitored: "1",
                  },
                ];
                this.$bvModal.hide("modalLoading");
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

            console.log("error", error.response);
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
        selectDevice: "",
        device_id: "",
        device_name: "",
        tank_length: "",
        tank_height: "",
        tank_wide: "",
        type_tank: "",
        power: "",
        fuel_consumption: "",
        id_m_port: "",
        port_rtu: "",
        mode_port: "analog",
        units: "",
        calibraion: "",
        rotation: "",
        threshold: "",
        description: "",
        name_identifier: "",
        telegram_reminder: "1",
        is_monitored: "1",
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

    showTempelate() {
      this.isOpenTemplate = true;
      this.$bvModal.show("tempelate-port");
    },

    closeModalTempelate() {
      this.isOpenTemplate = false;
      this.$bvModal.hide("tempelate-port");
    },
    showKonfigurasi(index) {
      this.indexKonfigurasi = index;
      this.$bvModal.show("konfigurasi");
    },

    //format sname rtu
    templateSname() {
      let lengthData = this.selectLocation.rtus.length;
      let newSname;

      if (lengthData == 0) {
        newSname = `RTU00-${this.selectLocation.sname_regional}-${this.selectLocation.sname}`;
      } else {
        if (this.selectLocation.rtus[lengthData - 1].sname_number + 1 > 9) {
          newSname = `RTU${
            this.selectLocation.rtus[lengthData - 1].sname_number + 1
          }-${this.selectLocation.sname_regional}-${this.selectLocation.sname}`;
        } else {
          newSname = `RTU0${
            this.selectLocation.rtus[lengthData - 1].sname_number + 1
          }-${this.selectLocation.sname_regional}-${this.selectLocation.sname}`;
        }
      }
      this.sname = newSname;
      this.idLocation = this.selectLocation.id;
    },

    // set condition if data port/identifier == bbm
    dataPort(data, index) {
      this.inputs[index].id_m_port = data.id_port;
      this.inputs[index].name_identifier = data.port_name;
      if (data.identifier == "BBM") {
        this.inputs[index].is_tanks = true;
        this.showKonfigurasi(index);
      } else {
        this.inputs[index].is_tanks = false;
      }
    },

    isDeviceSame(data, index) {
      this.inputs[index].device_id = data.id;
      this.inputs[index].device_name = data.name;
      for (let i = 0; i < this.inputs.length; i++) {
        if (i != index && this.inputs[i].device_id == data.id) {
          this.inputs[index].device_id = "";
          this.inputs[index].device_name = "";
          this.inputs[index].selectDevice = "";
          Swal.fire({
            icon: "error",
            title: "Oops..",
            text: "Group Topology tidak boleh sama dengan Group Topology lain!",
          });
        }
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
