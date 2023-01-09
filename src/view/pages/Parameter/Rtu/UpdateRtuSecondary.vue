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
                  <div class="wizard-desc">Update RTU</div>
                </div>
              </div>
            </div>
            <div class="wizard-step" data-wizard-type="step">
              <div class="wizard-wrapper">
                <div class="wizard-number">2</div>
                <div class="wizard-label">
                  <div class="wizard-title">PORT</div>
                  <div class="wizard-desc">Update Port</div>
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
                    <h3 class="text-center mt-4 mb-8">
                      {{ nameRtu }}
                    </h3>
                    <div>
                      <div>
                        <b-alert
                          show
                          variant="warning"
                          class="alert-config-wrapper"
                          v-if="isQueue"
                        >
                          <span><i class="fas fa-exclamation-circle"></i></span>
                          <span class="alert-config-text"
                            >Sedang ada pembaharuan config yang sedang berjalan.
                            Mohon menunggu antrean.
                            <div id="countDown"></div>
                          </span>
                        </b-alert>
                        <b-alert
                          show
                          variant="warning"
                          class="alert-config-wrapper"
                          v-if="isAlert"
                        >
                          <span><i class="fas fa-exclamation-circle"></i></span>
                          <span class="alert-config-text">{{
                            statusAlert
                          }}</span>
                        </b-alert>
                      </div>
                      <div class="table-responsive table-add-port">
                        <table
                          class="table table-striped table-bordered table-hover"
                          id="table-add-rtu"
                        >
                          <col style="width: 4%" />
                          <col style="width: 4%" />
                          <col style="width: 4%" />
                          <col style="width: 16%" />
                          <col style="width: 12%" />
                          <col style="width: 15%" />
                          <col style="width: 7%" />
                          <col style="width: 6%" />
                          <col style="width: 5%" />
                          <col style="width: 4%" />
                          <col style="width: 4%" />
                          <col style="width: 4%" />
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
                          <tbody>
                            <tr v-for="(data, index) in inputs" :key="index">
                              <td style="width: 4em" class="text-center">
                                {{ index + 1 }}
                              </td>
                              <td style="width: 11em" class="text-center">
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
                                {{ data.selectPort.units }}
                              </td>
                              <td style="width: 11em" class="text-center">
                                {{ data.selectPort.calibration_value }}
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
                                      @click="
                                        changeReminder(data, data.reminder)
                                      "
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
                                      @click="
                                        changeMonitored(data, data.monitored)
                                      "
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
                        @click="updateRTU()"
                        v-if="isAlert"
                      >
                        Update Config
                      </button>
                      <button
                        class="btn btn-sm btn-success mr-5 next-button cursor-pointer"
                        id="next-button"
                        @click="checkDataRtuUpdate()"
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
    <AddPort
      :inputs="inputs"
      :dataRtu="dataRtu"
      @getDataPortFromRtu="getDataRtu"
      @checkAlert="checkAlertConfig"
    />
    <UpdatePort
      @checkAlert="checkAlertConfig"
      :dataRtu="dataRtu"
      :dataPortSelected="dataPortSelected"
      ref="update"
      :index="indexPortSelected"
    />
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
import AddPort from "@/view/pages/Parameter/Rtu/addTablePort.vue";
import UpdatePort from "./updateTablePort.vue";
// import TemplatePort from "../Rtu/TempelatePort.vue";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import {
  SET_DATA_PORTS,
  SET_INDEX_CHOOSE,
} from "@/core/services/store/rtuManagement.module.js";
import Konfigurasi from "@/view/pages/Parameter/Rtu/Konfigurasi.vue";
import { mapGetters } from "vuex";

export default {
  name: "UpdateRtu2",
  components: {
    Treeselect,
    // TemplatePort,
    AddPort,
    UpdatePort,
    Konfigurasi,
  },

  data() {
    return {
      dataRtu: {},
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
      dataPortSelected: {},
      indexPortSelected: "",

      listPort: [],
      listMdivece: [],
      selectedPort: [],

      indexKonfigurasi: 0,
      idSelected: "",
      is_validate: true,
      isOpenTemplate: false,
      isAlert: false,
      isQueue: false,
      countInterval: "",

      inputs: [],
      updatedAtConfig: "",

      dataRtuCheckUpdate: {
        nameMd: "",
        nameRtu: "",
        locRtu: "",
        snameRtu: "",
        ipAddress: "",
        tags: "",
        desc: "",
      },

      statusAlert: "",
    };
  },
  computed: {
    ...mapGetters(["getDataPorts"]),
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
    this.idSelected = this.$route.params.idSelected;
    this.getDataTags();
    this.getMd();
    this.getListLocation();
    this.getPort();
    this.getMDevice();
    this.getDataRtu();

    var wizard = new KTWizard("kt_wizard_v4", {
      startStep: 1, // initial active step number
      clickableSteps: false, // allow step clicking
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

    this.$store.dispatch(SET_BREADCRUMB, [
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
    checkAlert() {
      this.isAlert = false;

      const dataUpdatedAtPort = [];

      // get data updatePort
      this.inputs.forEach((port) => {
        dataUpdatedAtPort.push(port.updated_at);
      });

      // check alert port
      dataUpdatedAtPort.forEach((updateNumber) => {
        if (this.updatedAtConfig != updateNumber) {
          this.isAlert = true;
        }
      });
    },
    changeReminder(data, isReminder) {
      data.telegram_reminder = isReminder == 1 ? 0 : 1;
      ApiService.patch(
        `${process.env.VUE_APP_ROOT_API_4}/rtu/updatePort/${this.selectedPort.rtu_id}`,
        data
      )
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Reminder port berhasil diupdate",
          });
          this.checkAlertConfig();
        })
        .catch((e) => {
          console.log(e.response, "error reminder .. ..");
        });
    },
    changeMonitored(data, isMonitored) {
      data.is_monitored = isMonitored == 1 ? 0 : 1;
      ApiService.patch(
        `${process.env.VUE_APP_ROOT_API_4}/rtu/updatePort/${this.selectedPort.rtu_id}`,
        data
      )
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "is monitored port berhasil diupdate",
          });
          this.checkAlertConfig();
        })
        .catch((e) => {
          console.log(e.response, "error monitored .. ..");
        });
    },
    checkDataRtuUpdate() {
      let count = 0;

      // check data
      if (this.dataRtuCheckUpdate.nameMd != this.selectMd) {
        count += 1;
      } else if (this.dataRtuCheckUpdate.nameRtu != this.nameRtu) {
        count += 1;
      } else if (this.dataRtuCheckUpdate.locRtu != this.idLocation) {
        count += 1;
      } else if (this.dataRtuCheckUpdate.snameRtu != this.sname) {
        count += 1;
      } else if (this.dataRtuCheckUpdate.ipAddress != this.ipAddressRTU) {
        count += 1;
      } else if (
        this.dataRtuCheckUpdate.tags.join() != this.selectedTags.join()
      ) {
        count += 1;
      } else if (this.dataRtuCheckUpdate.desc != this.deskripsiRTU) {
        count += 1;
      }

      // check count
      if (count > 0) {
        this.saveRtu();
      } else {
        this.goToSecondPage();
      }
    },
    saveRtu() {
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
      } else if (this.deskripsiRTU == "" || this.deskripsiRTU == null) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Deskripsi RTU tidak boleh kosong",
        });
      } else {
        let dataAddRtu = {
          id_md: this.selectMd,
          name_rtu: this.nameRtu,
          id_m_location: this.idLocation,
          ip_address: this.ipAddressRTU,
          id_tags: this.selectedTags,
          description: this.deskripsiRTU,
          sname: this.sname,
        };
        this.$bvModal.show("modalLoading");
        ApiService.patch(
          `${process.env.VUE_APP_ROOT_API_4}/rtu/update/${this.idSelected}`,
          dataAddRtu
        )
          .then(({ data }) => {
            this.dataRtu = data.result;
            this.idSelected = this.dataRtu.rtu_id;
            if (
              data.result.updated_at > this.selectedPort.last_updated_config
            ) {
              this.isAlert = true;
            } else {
              this.isAlert = false;
            }
            this.$bvModal.hide("modalLoading");
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Data RTU berhasil diubah",
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
                this.dataRtuCheckUpdate = {
                  nameMd: "",
                  nameRtu: "",
                  locRtu: "",
                  snameRtu: "",
                  ipAddress: "",
                  tags: "",
                  desc: "",
                };
                this.goToSecondPage();
              }
            });
          })
          .catch((error) => {
            if (
              error.response.data.error_sign == "ALREADY_AVAILABLE" ||
              error.response.data.error_sign == "NOT_AVAILABLE"
            ) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Maaf, lokasi RTU sudah digunakan. Mohon gunakan lokasi yang lain !",
              });
            } else if (
              error.response.data.error_sign == "IP_ALREADY_AVAILABLE"
            ) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Maaf, IP Address ini sudah digunakan. Mohon gunakan IP Address yang lain !",
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error.response.data.message}`,
              });
            }
            this.$bvModal.hide("modalLoading");
          });
      }
    },
    goToSecondPage() {
      ApiService.get(process.env.VUE_APP_ROOT_API_4, `rtu/${this.idSelected}`)
        .then(({ data }) => {
          this.dataRtu = data.result;
        })
        .catch((e) => {
          console.log(e.response);
        });

      var wizardEl = document.querySelector("#kt_wizard_v4");

      var wizard = new KTWizard(wizardEl, {
        startStep: 1, // initial active step number
        clickableSteps: false, // allow step clicking
        // navigation: false, // enable/disable navigation
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
      this.checkAlertConfig();
    },
    getDataRtu() {
      this.$bvModal.show("modalLoading");
      ApiService.get(
        `${process.env.VUE_APP_ROOT_API_4}/rtu`,
        `port/${this.idSelected}`
      )
        .then(({ data }) => {
          if (data.result.updated_at > data.result.last_updated_config) {
            this.isAlert = true;
          } else {
            this.isAlert = false;
          }
          this.selectedPort = data.result;
          this.selectMd = data.result.md_id;

          this.nameRtu = data.result.rtu_name;
          this.idLocation = data.result.location_id;
          this.sname = data.result.rtu_sname;
          this.ipAddressRTU = data.result.ip_address;
          this.selectedTags = data.result.tags.map((item) => {
            return item.id;
          });
          this.deskripsiRTU = data.result.description;

          // data for check update RTU
          this.dataRtuCheckUpdate = {
            nameMd: data.result.md_id,
            nameRtu: data.result.rtu_name,
            locRtu: data.result.location_id,
            snameRtu: data.result.rtu_sname,
            ipAddress: data.result.ip_address,
            tags: data.result.tags.map((item) => {
              return item.id;
            }),
            desc: data.result.description,
          };

          // input port
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
      setTimeout(() => {
        this.$bvModal.hide("modalLoading");
      }, 500);
    },
    checkAlertConfig() {
      ApiService.get(
        `${process.env.VUE_APP_ROOT_API_4}`,
        `rtu/rtuQueueInfo/${this.idSelected}`
      )
        .then(({ data }) => {
          let cleanData = this.cleanAllData;
          if (data.result.status.toLowerCase() == "not_yet_config") {
            this.isAlert = true;
            this.isQueue = false;
            this.statusAlert =
              "RTU belum memiliki config. Silahkan klik tombol update config.";
          } else if (data.result.status.toLowerCase() == "update_config") {
            this.isAlert = true;
            this.isQueue = false;
            this.statusAlert =
              "Config RTU belum diperbaharui. Silahkan klik tombol update config.";
          } else if (data.result.status.toLowerCase() == "not_in_queue") {
            this.isAlert = false;
            this.isQueue = false;
          } else if (data.result.status.toLowerCase() == "in_queue") {
            this.isAlert = false;
            this.isQueue = true;

            // init count time
            let count = 0;
            let dateNow = Date.now();
            let lastUpdatedConfig = data.result.last_updated_config;

            // set count time
            count = lastUpdatedConfig - dateNow;
            let countInterval = setInterval(function () {
              if (count < 1000) {
                cleanData();
                clearInterval(countInterval);
              } else {
                let time = count / 1000;
                let minute = Math.floor(time / 60);
                let hour = Math.floor(minute / 60);
                let second = Math.floor(time - minute * 60);

                let result = hour + ":" + minute + ":" + second;
                document.getElementById("countDown").innerHTML = result;
                count -= 1000;
              }
            }, 1000);

            this.countInterval = countInterval;
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    cleanAllData() {
      setTimeout(() => {
        this.isQueue = false;
        this.isQueue = false;
      }, 1000);
    },
    updateRTU() {
      ApiService.post(
        `${process.env.VUE_APP_ROOT_API_4}/rtu/config/${this.selectedPort.rtu_id}`
      )
        .then(({ data }) => {
          this.updatedAtConfig = data.result.last_updated_config;
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Config RTU berhasil diperbaharui",
          });
          this.checkAlertConfig();
        })
        .catch((error) => {
          console.log(error.response);
        });
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
      this.$bvModal.show("modalLoading");
      setTimeout(() => {
        this.$refs.update.setDataPortSelected();
        this.$bvModal.hide("modalLoading");
      }, 1000);
    },

    deletePort(index) {
      Swal.fire({
        title: "Apakah anda yakin?",
        text: "Data yang dihapus tidak dapat dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#c70000",
        confirmButtonText: "Hapus",
      }).then((result) => {
        if (result.isConfirmed) {
          this.getDataRtu();
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

    showKonfigurasi(index) {
      this.indexKonfigurasi = index;
      this.$bvModal.show("konfigurasi");
    },

    changeSnameReg(sname) {
      return sname.replace(/R/g, "D");
    },
    //format sname rtu
    templateSname(id) {
      var output = this.listLocation.filter((data) => data.id == id);
      let lengthData = output[0].rtus.length;
      let newSname;

      if (lengthData == 0) {
        newSname = `RTU00-${this.changeSnameReg(output[0].sname_regional)}-${
          output[0].sname
        }`;
      } else {
        if (output[0].rtus[lengthData - 1].sname_number + 1 > 9) {
          newSname = `RTU${
            output[0].rtus[lengthData - 1].sname_number + 1
          }-${this.changeSnameReg(output[0].sname_regional)}-${
            output[0].sname
          }`;
        } else {
          newSname = `RTU0${
            output[0].rtus[lengthData - 1].sname_number + 1
          }-${this.changeSnameReg(output[0].sname_regional)}-${
            output[0].sname
          }`;
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
    goToFormula(index) {
      this.$store.dispatch(SET_DATA_PORTS, this.inputs[index]);
      this.$store.dispatch(SET_INDEX_CHOOSE, index);
      this.$router.push({
        name: "Literal Template",
      });
    },
    backPage() {
      this.$router.push({ name: "TableContainnerRtu2" });
    },
  },
  beforeDestroy() {
    clearInterval(this.countInterval);
    this.isQueue = false;
    this.isQueue = false;
  },
};
</script>
<style lang="scss">
@import "@/assets/sass/pages/wizard/wizard-4.scss";

.wizard-wrapper {
  cursor: default;
}

.fa-exclamation-circle {
  font-size: 2em !important;
  color: #ff0000 !important;
}

.alert-config-text {
  font-size: 15px;
  font-weight: bold;
  margin-left: 10px;
}

.alert-config-wrapper {
  display: flex;
  align-items: center;
}

#table-add-rtu {
  table-layout: auto;
  width: 100%;
}

.table-head-wrapped {
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1;
}

// .table-head {
//   white-space: nowrap;
// }

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
