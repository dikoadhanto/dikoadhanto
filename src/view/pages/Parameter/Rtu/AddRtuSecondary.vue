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
              <div class="col-xl-12">
                <form @submit.prevent="">
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
                          <treeselect
                            noResultsText="Lokasi tidak ditemukan"
                            :normalizer="normalizerLocation"
                            :clear-on-select="true"
                            :options="listLocation"
                            placeholder="Pilih Lokasi..."
                            v-model="filterLocation"
                            @input="setDataLocation"
                            @search-change="searchLocation"
                            openDirection="bottom"
                          >
                          </treeselect>
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
                        <b-col cols="9">
                          <Treeselect
                            style="background: f3f6f9"
                            v-model="selectedTags"
                            placeholder="Pilih tags"
                            :options="dataTags"
                            node-label-prop="name"
                            :multiple="true"
                            openDirection="bottom"
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
                          ></textarea>
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
                    <div>
                      <div class="table-responsive table-add-port">
                        <table
                          class="table table-striped table-bordered table-hover"
                          id="table-add-rtu"
                        >
                          <thead class="text-center">
                            <tr class="table-head-wrapped">
                              <th class="table-head">#</th>
                              <th class="table-head">PORT NUMBER</th>
                              <th class="table-head">MODE PORT</th>
                              <th class="table-head">IDENTIFIER NAME</th>
                              <th class="table-head">GROUP TOPOLOGY</th>
                              <th class="table-head">DESKRIPSI</th>
                              <th class="table-head">UNITS</th>
                              <th class="table-head">CALIBRATION VALUE</th>
                              <th class="table-head">TELEGRAM REMINDER</th>
                              <th class="table-head">STATUS MONITORING</th>
                              <th class="table-head" colspan="2">ACTION</th>
                            </tr>
                          </thead>
                          <tbody class="text-center">
                            <tr v-for="(data, index) in inputs" :key="index">
                              <td style="width: 4em" align-v="center">
                                {{ index + 1 }}
                              </td>
                              <td style="width: 11em">
                                {{ data.port_rtu }}
                              </td>
                              <td style="width: 7em">
                                {{ data.mode_port }}
                              </td>

                              <td style="width: 20em">
                                {{ data.name_identifier }}
                              </td>
                              <td style="width: 20em">
                                {{ data.device_name }}
                              </td>
                              <td style="width: 20em">
                                {{ data.description }}
                              </td>
                              <td style="width: 11em">
                                {{ data.units }}
                              </td>
                              <td style="width: 11em">
                                {{ data.calibration }}
                              </td>
                              <td style="width: 11em">
                                <span
                                  class="switch switch-sm switch-icon switch-reminder"
                                >
                                  <label class="m-0">
                                    <input
                                      type="checkbox"
                                      :value="data.reminder"
                                      v-model="data.reminder"
                                      disabled
                                    />
                                    <span></span>
                                  </label>
                                </span>
                              </td>
                              <td style="width: 11em">
                                <span
                                  class="switch switch-sm switch-icon switch-monitored"
                                >
                                  <label>
                                    <input
                                      type="checkbox"
                                      :value="data.monitored"
                                      v-model="data.monitored"
                                      disabled
                                    />
                                    <span></span>
                                  </label>
                                </span>
                              </td>
                              <td style="width: 5em">
                                <i
                                  class="fas fa-pen icon-detail icon-edit"
                                  @click="updateDataPort(index)"
                                ></i>
                              </td>
                              <td style="width: 5em">
                                <i
                                  class="fas fa-trash icon-detail icon-delete"
                                  @click="deletePort(index)"
                                ></i>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div class="d-flex justify-content-between border-top pt-10">
                    <div class="d-flex justify-content-start"></div>
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
                        Kirim
                      </button>
                      <button
                        class="btn btn-sm btn-success mr-5 next-button"
                        id="next-button"
                        @click="createdRtu()"
                      >
                        Simpan & Lanjut
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
    <AddPort
      :inputs="inputs"
      :dataRtu="dataRtu"
      @getDataPortFromRtu="getDataPortFromRtu"
    />
    <UpdatePort
      :dataRtu="dataRtu"
      :dataPortSelected="dataPortSelected"
      ref="update"
      :index="indexPortSelected"
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
import AddPort from "@/view/pages/Parameter/Rtu/addTablePort.vue";
import UpdatePort from "./updateTablePort.vue";
import Konfigurasi from "@/view/pages/Parameter/Rtu/Konfigurasi.vue";
import {
  SET_RTU_ID_MD,
  SET_RTU_NAME_RTU,
  SET_RTU_ID_M_LOCATION,
  SET_RTU_SNAME,
  SET_RTU_IP_ADDRESS,
  SET_RTU_ID_TAGS,
  SET_RTU_DESCRIPTION,
  // SET_DATA_PORTS,
  SET_INDEX_CHOOSE,
} from "@/core/services/store/rtuManagement.module.js";
import { mapGetters } from "vuex";

export default {
  name: "AddRtu2",
  components: {
    Treeselect,
    TemplatePort,
    AddPort,
    Konfigurasi,
    UpdatePort,
  },
  data() {
    return {
      idSelected: "",
      indexPortSelected: "",
      dataPortSelected: {},
      dataListMd: [],
      selectMd: "",
      nameRtu: "",

      listLocation: [],
      searchName: "",
      filterLocation: null,
      selectLocation: "",
      idLocation: "",

      normalizerLocation(node) {
        return {
          label: node.name,
        };
      },

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
      dataRtu: "",

      isTemplate: true,
      isBack: true,
      listIdentifierByTempalte: [],

      listMdivece: [],

      inputs: [],
    };
  },
  computed: {
    ...mapGetters([
      "getDataTemplateRtuPort",
      "getNameTemplareRTUPORT",
      "getDataPorts",
    ]),
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

    var wizardEl = document.querySelector("#kt_wizard_v4");

    var wizard = new KTWizard(wizardEl, {
      startStep: 1, // initial active step number
      clickableSteps: false, // allow step clicking
      // navigation: false, // enable/disable navigation
    });

    // Validation before going to next page
    wizard.on("beforeNext", function (/*wizardObj*/) {});

    // Change event
    wizard.on("change", function (/*wizardObj*/) {
      setTimeout(() => {
        KTUtil.scrollTop();
      }, 500);
    });
  },

  watch: {
    filterLocation: function (val) {
      if (val === null || val === "") {
        this.sname = "";
        this.selectLocation = "";
      }
    },
    getNameTemplareRTUPORT() {
      this.nameTempalte = this.getNameTemplareRTUPORT;
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
      if (this.selectLocation != "" || this.selectLocation != null) {
        this.templateSname();
      }
    },
  },

  methods: {
    searchLocation(value) {
      this.searchName = value.toLowerCase();
      this.getListLocation();
    },
    setDataLocation() {
      this.selectLocation = this.listLocation.find(
        (loc) => loc.id == this.filterLocation
      );
    },
    getDataPortFromRtu() {
      ApiService.get(
        `${process.env.VUE_APP_ROOT_API_4}/rtu`,
        `port/${this.dataRtu.rtu_id}`
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

          this.inputs = [];
          data.result.info_port.map((item) => {
            let dataInput = {
              // general
              id_rtu_port: item.id_rtu_port ?? "",
              id_m_port: item.id_m_port ?? "",
              port_rtu: item.port_rtu ?? "",
              selectPort: {
                calibration_value: item.calibration ?? "",
                created_at: "",
                data_rotation: item.data_rotation ?? "",
                device_name: "",
                id_port: item.id_m_port ?? null,
                identifier: item.name_identifier ?? "",
                port_mode: item.mode_port ?? "",
                port_name: "",
                units: item.units ?? "",
                updated_at: "",
              },
              mode_port: item.mode_port ?? "",
              name_identifier: item.name_identifier ?? "",
              selectDevice: {
                id: item.device_id,
                name: item.device_name,
              },
              device_id: item.device_id ?? null,
              device_name: item.device_name ?? "",
              description: item.desc ?? "",
              units: item.units ?? "",
              calibration: item.calibration ?? "",
              is_monitored: item.is_monitored
                ? item.is_monitored.toString()
                : "0",
              telegram_reminder: item.telegram_reminder
                ? item.telegram_reminder.toString()
                : "0",
              monitored: item.is_monitored == 1 ? true : false,
              reminder: item.telegram_reminder == 1 ? true : false,
              id_m_formula: item.id_m_formula ?? "",
              formula: item.formula ?? "",
              is_formula: "",
              formula_desc: "",

              // adding bbm
              is_tanks: false,
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
              port_kwh_2: "",
            };
            this.inputs.push(dataInput);
          });
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    createdRtu() {
      this.$store.dispatch(SET_RTU_ID_MD, this.selectMd);
      this.$store.dispatch(SET_RTU_NAME_RTU, this.nameRtu);
      this.$store.dispatch(SET_RTU_ID_M_LOCATION, this.selectLocation);
      this.$store.dispatch(SET_RTU_SNAME, this.sname);
      this.$store.dispatch(SET_RTU_IP_ADDRESS, this.ipAddressRTU);
      this.$store.dispatch(SET_RTU_ID_TAGS, this.selectedTags);
      this.$store.dispatch(SET_RTU_DESCRIPTION, this.deskripsiRTU);
      if (this.selectMd == "" || this.selectMd == null) {
        this.showModalError("Nama MD tidak boleh kosong");
      } else if (this.nameRtu == "" || this.nameRtu == null) {
        this.showModalError("Nama RTU tidak boleh kosong");
      } else if (this.idLocation == "" || this.idLocation == null) {
        this.showModalError("Lokasi tidak boleh kosong");
      } else if (this.ipAddressRTU == "" || this.ipAddressRTU == null) {
        this.showModalError("Ip Address RTU tidak boleh kosong");
      } else if (this.selectedTags.length === 0) {
        this.showModalError("Data TAG tidak boleh kosong");
      } else if (this.deskripsiRTU == "" || this.deskripsiRTU == null) {
        this.showModalError("Deskripsi RTU tidak boleh kosong");
      } else {
        let dataAddRtu = {
          id_md: this.selectMd,
          name_rtu: this.nameRtu,
          id_m_location: this.idLocation,
          sname: this.sname,
          ip_address: this.ipAddressRTU,
          id_tags: this.selectedTags,
          description: this.deskripsiRTU,
          multiInsertPort: this.getDataPorts,
        };
        this.$bvModal.show("modalLoading");
        ApiService.post(`${process.env.VUE_APP_ROOT_API_4}/rtu/add`, dataAddRtu)
          .then(({ data }) => {
            this.dataRtu = data.result;
            this.$bvModal.hide("modalLoading");
            this.getDataPortFromRtu();
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Data RTU berhasil disimpan",
            }).then((result) => {
              if (result.isConfirmed || result.isDismissed) {
                var wizardEl = document.querySelector("#kt_wizard_v4");

                var wizard = new KTWizard(wizardEl, {
                  startStep: 1, // initial active step number
                  clickableSteps: false, // allow step clicking
                });

                wizard.goTo(2);
                // Change event
                wizard.on("change", function (/*wizardObj*/) {
                  setTimeout(() => {
                    KTUtil.scrollTop();
                  }, 500);
                });
                if (wizard.getStep() == 2) {
                  const button = document.getElementById("next-button");
                  button.style.display = "none";
                }
              }
            });
          })
          .catch((error) => {
            if (
              error.response.data.error_sign == "ALREADY_AVAILABLE" ||
              error.response.data.error_sign == "NOT_AVAILABLE"
            ) {
              this.showModalError(
                "Maaf, lokasi RTU sudah digunakan. Mohon gunakan lokasi yang lain !"
              );
            } else if (
              error.response.data.error_sign == "IP_ALREADY_AVAILABLE"
            ) {
              this.showModalError(
                "Maaf, IP Address ini sudah digunakan. Mohon gunakan IP Address yang lain !"
              );
            } else {
              this.showModalError(error.response.data.message);
            }

            this.$bvModal.hide("modalLoading");
          });
      }
    },
    async addRTU() {
      Swal.fire({
        icon: "success",
        title: "Berhasil.",
        text: "Anda berhasil menambahkan data port RTU",
      });
      this.setDefaultData();
      this.$router.push({ name: "TableContainnerRtu2" });
    },

    async addBack() {
      if (this.selectMd == "" || this.selectMd == null) {
        this.showModalError("Nama MD tidak boleh kosong");
      } else if (this.nameRtu == "" || this.nameRtu == null) {
        this.showModalError("Nama RTU tidak boleh kosong");
      } else if (this.idLocation == "" || this.idLocation == null) {
        this.showModalError("Lokasi tidak boleh kosong");
      } else if (this.ipAddressRTU == "" || this.ipAddressRTU == null) {
        this.showModalError("Ip Address RTU tidak boleh kosong");
      } else if (this.selectedTags === 0) {
        this.showModalError("Data TAG tidak boleh kosong");
      } else {
        this.inputs = [];
        let dataAddRtu = {
          id_md: this.selectMd,
          name_rtu: this.nameRtu,
          id_m_location: this.idLocation,
          sname: this.sname,
          ip_address: this.ipAddressRTU,
          id_tags: this.selectedTags,
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
                this.setDefaultData();
                this.$router.push({ name: "TableContainnerRtu2" });
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
              this.showModalError(
                "Maaf, server sedang dalam perbaikan. Mohon menunggu sebentar lagi!"
              );
            } else if (
              error.response.data.error_sign == "ALREADY_AVAILABLE" ||
              error.response.data.error_sign == "NOT_AVAILABLE"
            ) {
              this.showModalError(
                "Maaf, lokasi RTU sudah digunakan. Mohon gunakan lokasi yang lain !"
              );
            } else {
              this.showModalError(error.response.data.message);
            }

            this.$bvModal.hide("modalLoading");
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
      ApiService.query(
        `${process.env.VUE_APP_ROOT_API_3}/locations/rtu?limit=100`,
        {
          params: {
            searchName: this.searchName,
          },
        }
      )
        .then(({ data }) => {
          let dataLocation = data.result.map((item, index) => ({
            index: index,
            ...item,
          }));
          this.listLocation = dataLocation;
        })
        .catch((e) => {
          console.log(e.response);
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
          this.dataListMd = data.result.payload;
        })
        .catch((error) => {
          console.log(error.response);
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
          console.log(error.response);
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
          console.log(e.response);
        });
    },

    //for form repeter add and delate
    addForm() {
      this.$bvModal.show("add-table-port");
    },
    updateDataPort(index) {
      this.dataPortSelected = this.inputs[index];
      this.indexPortSelected = index;
      this.$bvModal.show("update-table-port");
      setTimeout(() => {
        this.$refs.update.setDataPortSelected();
      }, 1000);
    },
    deletePort(index) {
      Swal.fire({
        title: "Apakah anda yakin?",
        text: "Data yang dihapus tidak dapat dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          this.getDataPortFromRtu();
          this.justDelete(
            this.dataRtu.rtu_id,
            this.inputs[index].id_rtu_port,
            index
          );
        }
      });
    },
    justDelete(idRtu, idPort, index) {
      ApiService.delete(
        `${process.env.VUE_APP_ROOT_API_4}/rtu/del/${idRtu}/${idPort}`
      )
        .then(() => {
          this.inputs.splice(index, 1);
          this.$store.dispatch("setDefaultPorts");
          this.inputs.forEach((data) => {
            this.$store.dispatch("setDataPorts", data);
          });
          Swal.fire({
            title: "Berhasil",
            text: "Anda berhasil menghapus data port.",
            icon: "success",
          });
        })
        .catch((e) => {
          console.log(e.response);
        });
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
      this.$bvModal.show("konfigurasi-tangki");
    },

    //format sname rtu
    templateSname() {
      let count = Number(this.selectLocation.count);
      let newSname;

      if (count == 0) {
        newSname = `RTU00-${this.changeSnameReg(
          this.selectLocation.sname_regional
        )}-${this.selectLocation.sname}`;
      } else {
        if (count > 9) {
          newSname = `RTU${count}-${this.changeSnameReg(
            this.selectLocation.sname_regional
          )}-${this.selectLocation.sname}`;
        } else {
          newSname = `RTU0${count}-${this.changeSnameReg(
            this.selectLocation.sname_regional
          )}-${this.selectLocation.sname}`;
        }
      }
      this.sname = newSname;
      this.idLocation = this.selectLocation.id;
    },

    changeSnameReg(sname) {
      return sname.replace(/R/g, "D");
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
          this.showModalError(
            "Group Topology tidak boleh sama dengan Group Topology lain!"
          );
        }
      }
    },
    goToFormula(index) {
      this.$store.dispatch(SET_INDEX_CHOOSE, index);
      this.$router.push({
        name: "Literal Template",
      });
    },
    backPage() {
      this.$router.push({ name: "TableContainnerRtu2" });
    },
    showModalError(message) {
      Swal.fire({
        icon: "error",
        title: "Oops..",
        text: message,
      });
    },
    setDefaultData() {
      this.selectMd = "";
      this.selectLocation = "";
      this.idLocation = "";
      this.nameRtu = "";
      this.sname = "";
      this.ipAddressRTU = "";
      this.indexKonfigurasi = 0;
      this.is_validate = true;
      this.selectedTags = "";
      this.deskripsiRTU = "";
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
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/sass/pages/wizard/wizard-4.scss";

.wizard-wrapper {
  cursor: default;
}

#table-add-rtu {
  table-layout: auto;
  width: 135%;
}

.table-head-wrapped {
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1;
}

.table-head {
  white-space: nowrap;
}

.table-add-port {
  max-height: 35em;
}

.button-formula {
  white-space: nowrap;
}

.switch-reminder,
.switch-monitored {
  justify-content: center;
}

/* switch icon */
.switch input:empty ~ span:before {
  background-color: #afb2c7;
}

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
