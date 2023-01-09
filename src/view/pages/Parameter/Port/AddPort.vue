<template>
  <div class="card">
    <b-row class="head-wrapper">
      <b-col>
        <h2 class="mt-7 ml-10">Tambah Port</h2>
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
                  <div class="wizard-title">PORT</div>
                  <div class="wizard-desc">Tambah PORT</div>
                </div>
              </div>
            </div>
            <div class="wizard-step" data-wizard-type="step">
              <div class="wizard-wrapper">
                <div class="wizard-number">2</div>
                <div class="wizard-label">
                  <div class="wizard-title">THRESHOLD</div>
                  <div class="wizard-desc">Tambah THRESHOLD</div>
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
                            NAMA PORT&nbsp;<span class="required"></span>&nbsp;:
                          </h6>
                        </b-col>
                        <b-col>
                          <input
                            type="text"
                            class="form-control form-control-solid"
                            v-model="name"
                          />
                        </b-col>
                      </b-row>

                      <b-row align-v="center" class="m-4" no-gutters>
                        <b-col cols="3">
                          <h6>
                            MODE PORT&nbsp;<span class="required"></span>&nbsp;:
                          </h6>
                        </b-col>
                        <b-col>
                          <label>
                            <input
                              type="radio"
                              value="analog"
                              v-model="mode"
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
                              v-model="mode"
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
                            IDENTIFIER&nbsp;<span class="required"></span
                            >&nbsp;:
                          </h6>
                        </b-col>
                        <b-col>
                          <input
                            type="text"
                            class="form-control form-control-solid"
                            v-model="identifier"
                          />
                        </b-col>
                      </b-row>

                      <b-row align-v="center" class="m-4" no-gutters>
                        <b-col cols="3">
                          <h6>
                            UNIT&nbsp;<span class="required"></span>&nbsp;:
                          </h6>
                        </b-col>
                        <b-col>
                          <input
                            type="text"
                            class="form-control form-control-solid"
                            v-model="units"
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
                            type="number"
                            class="form-control form-control-solid"
                            v-model="calibration_value"
                          />
                        </b-col>
                      </b-row>
                      <b-row align-v="center" class="m-4" no-gutters>
                        <b-col cols="3">
                          <h6>
                            DATA ROTATION &nbsp;<span class="required"></span
                            >&nbsp;:
                          </h6>
                        </b-col>
                        <b-col cols="4">
                          <input
                            type="number"
                            class="form-control form-control-solid"
                            v-model="data_rotation"
                          />
                        </b-col>
                        <b-col cols="3">
                          <h6>&nbsp; HARI<span></span></h6>
                        </b-col>
                      </b-row>
                    </div>
                  </div>

                  <div class="pb-5" data-wizard-type="step-content">
                    <div v-for="(data, index) in inputs" :key="index">
                      <div class="accordion accordion-toggle-arrow">
                        <div class="card">
                          <b-card-header header-tag="header" class="p-1">
                            <div
                              class="card-title collapsed"
                              data-toggle="collapse"
                              v-b-toggle="`collapse-${index}`"
                            >
                              <div v-if="inputs[index].label != ''">
                                {{ inputs[index].label }}
                              </div>

                              <div v-else>Form {{ index + 1 }}</div>

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
                                    LABEL &nbsp;<span class="required"></span
                                    >&nbsp;:
                                  </h6>
                                </b-col>
                                <b-col>
                                  <input
                                    type="text"
                                    class="form-control form-control-solid"
                                    v-model="inputs[index].label"
                                  />
                                </b-col>
                              </b-row>

                              <b-row align-v="center" class="m-4" no-gutters>
                                <b-col cols="3">
                                  <h6>
                                    SERVERITY&nbsp;<span class="required"></span
                                    >&nbsp;:
                                  </h6>
                                </b-col>
                                <b-col>
                                  <select
                                    class="form-control form-control-solid"
                                    v-model="inputs[index].id_m_severity"
                                  >
                                    <option>Pilih Serverity</option>
                                    <option
                                      v-for="(data, i) in listServerity"
                                      :key="i"
                                      :value="data.id"
                                    >
                                      <span
                                        class="badge badge-danger text-white"
                                        >{{ data.name }}</span
                                      >
                                    </option>
                                  </select>
                                </b-col>
                              </b-row>

                              <b-row align-v="center" class="m-4" no-gutters>
                                <b-col cols="3">
                                  <h6>
                                    DURATION&nbsp;<span class="required"></span
                                    >&nbsp;:
                                  </h6>
                                </b-col>
                                <b-col>
                                  <input
                                    type="text"
                                    class="form-control form-control-solid"
                                    placeholder="1s"
                                    v-model="inputs[index].duration"
                                  />
                                </b-col>
                                <b-col cols="3">
                                  <h6>&nbsp; Second<span></span></h6>
                                </b-col>
                              </b-row>
                            </div>

                            <div class="card p-5 mt-5">
                              <b-row align-v="center" class="m-4" no-gutters>
                                <b-col cols="3">
                                  <h6>THRESHOLD RULE&nbsp;:</h6>
                                </b-col>
                                <b-col cols="5" v-if="data.batasAtas != ''">
                                  <h6>({{ getDataVal(index) }})</h6>
                                </b-col>
                              </b-row>
                              <b-row align-v="center" class="m-4" no-gutters>
                                <b-col cols="3">
                                  <h6>
                                    Batas Atas&nbsp;<span
                                      class="required"
                                    ></span
                                    >&nbsp;:
                                  </h6>
                                </b-col>
                                <b-col cols="1">
                                  <b-form-select
                                    class="form-control"
                                    v-model="inputs[index].operatorAtas"
                                  >
                                    <option
                                      v-for="(data, i) in listOperator"
                                      :key="i"
                                      :value="data.name"
                                    >
                                      <span
                                        class="badge badge-danger text-white"
                                        >{{ data.name }}</span
                                      >
                                    </option>
                                  </b-form-select>
                                </b-col>
                                <b-col cols="3" class="ml-5">
                                  <input
                                    type="number"
                                    step="any"
                                    min="0"
                                    class="form-control form-control-solid"
                                    v-model="inputs[index].batasAtas"
                                  />
                                </b-col>
                              </b-row>

                              <b-row align-v="center" class="m-4" no-gutters>
                                <b-col cols="3">
                                  <h6>Gerbang Logika :</h6>
                                </b-col>
                                <b-col cols="3">
                                  <b-form-select
                                    class="form-control"
                                    v-model="inputs[index].selectPerbandingan"
                                  >
                                    <option
                                      v-for="(item, i) in listPerbandingan"
                                      :key="i"
                                      :value="item.id"
                                    >
                                      {{ item.name }}
                                    </option>
                                  </b-form-select>
                                </b-col>
                              </b-row>

                              <b-row align-v="center" class="m-4" no-gutters>
                                <b-col cols="3">
                                  <h6>Batas Bawah :</h6>
                                </b-col>
                                <b-col cols="1">
                                  <b-form-select
                                    class="form-control"
                                    v-model="inputs[index].operatorBawah"
                                  >
                                    <option
                                      v-for="(data, i) in listOperator"
                                      :key="i"
                                      :value="data.name"
                                    >
                                      <span
                                        class="badge badge-danger text-white"
                                        >{{ data.name }}</span
                                      >
                                    </option>
                                  </b-form-select>
                                </b-col>
                                <b-col cols="3" class="ml-2">
                                  <input
                                    type="number"
                                    step="any"
                                    min="0"
                                    class="form-control form-control-solid"
                                    v-model="inputs[index].batasBawah"
                                  />
                                </b-col>
                              </b-row>

                              <b-row align-v="center" class="m-4" no-gutters>
                                <b-col cols="3">
                                  <h6>
                                    Deskripsi &nbsp;<span
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
                          </b-collapse>
                        </div>
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
                        @click="addPort()"
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
  </div>
</template>

<script>
import ApiService from "@/core/services/api.service";
import KTUtil from "@/assets/js/components/util";
import KTWizard from "@/assets/js/components/wizard";
import Swal from "sweetalert2";

export default {
  name: "AddPort",
  data() {
    return {
      listServerity: [],
      listFormula: [],
      identifier: "",
      name: "",
      mode: "analog",
      units: "",
      calibration_value: "",
      data_rotation: "",
      is_validate: true,

      listMdivece: [],
      selectMdiviceId: "",

      listOperator: [
        { name: "=" },
        { name: "!=" },
        { name: ">=" },
        { name: ">" },
        { name: "<=" },
        { name: "<" },
      ],

      listPerbandingan: [
        { id: "", name: "" },
        { id: "or", name: "OR" },
        { id: "and", name: "AND" },
      ],

      inputs: [
        {
          title: "",
          treshold_rule: "",
          operatorBawah: ">",
          operatorAtas: "<",
          selectPerbandingan: "",
          batasAtas: "",
          batasBawah: "",
          duration: "",
          id_m_severity: "",
          label: "",
          description: "",
        },
      ],
    };
  },
  watch: {},
  mounted() {
    this.getSeverity();
    // this.getMDevice();
    this.getFormula();

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
  methods: {
    getDataVal(index) {
      const data = this.inputs[index];
      let result = "";
      if (data.batasBawah == "" || data.selectPerbandingan == "") {
        result = `val ${data.operatorAtas} ${data.batasAtas}`;
      } else {
        result = `val ${data.operatorAtas} ${data.batasAtas} ${data.selectPerbandingan} val ${data.operatorBawah} ${data.batasBawah}`;
      }
      return result;
    },
    addPort() {
      this.is_validate = true;
      this.inputs.map((items) => {
        items.treshold_rule = this.formatThreshold(
          items.batasAtas,
          items.batasBawah,
          items.operatorAtas,
          items.operatorBawah,
          items.selectPerbandingan
        );
      });

      if (this.name == "" || this.name == null) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Nama PORT tidak boleh kosong",
        });
      } else if (this.mode == "" || this.mode == null) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "MODE tidak boleh kosong",
        });
      } else if (this.identifier == "" || this.identifier == null) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Identifier tidak boleh kosong",
        });
      } else if (this.units == "" || this.units == null) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Units tidak boleh kosong",
        });
      } else if (
        this.calibration_value == "" ||
        this.calibration_value == null
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Calibration Value tidak boleh kosong",
        });
      } else if (this.data_rotation == "" || this.data_rotation == null) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Data Totation tidak boleh kosong",
        });
      } else {
        this.inputs.map((items) => {
          if (items.label == "" || items.label == null) {
            this.is_validate = false;
            Swal.fire({
              icon: "error",
              title: "Oops..",
              text: "Label tidak boleh kosong",
            });
          } else if (items.id_m_severity == "" || items.id_m_severity == null) {
            this.is_validate = false;

            Swal.fire({
              icon: "error",
              title: "Oops..",
              text: "Severty tidak boleh kosong",
            });
          } else if (items.duration == "" || items.duration == null) {
            this.is_validate = false;

            Swal.fire({
              icon: "error",
              title: "Oops..",
              text: "Duration tidak boleh kosong",
            });
          } else if (items.batasAtas == "" || items.batasAtas == null) {
            this.is_validate = false;
            Swal.fire({
              icon: "error",
              title: "Oops..",
              text: "Batas Atas tidak boleh kosong",
            });
          } else if (items.description == "" || items.description == null) {
            this.is_validate = false;

            Swal.fire({
              icon: "error",
              title: "Oops..",
              text: "Description tidak boleh kosong",
            });
          }
        });

        if (this.is_validate) {
          let dataAddRtu = {
            identifier: this.identifier,
            // id_m_device_type: this.selectMdiviceId,
            name: this.name,
            mode: this.mode,
            units: this.units,
            calibration_value: this.calibration_value,
            data_rotation: this.data_rotation,
            multiTreshold: this.inputs,
          };

          ApiService.post(
            `${process.env.VUE_APP_ROOT_API_4}/port/add`,
            dataAddRtu
          )
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Data berhasil ditambahkan",
              }).then((result) => {
                if (result.isConfirmed || result.isDismissed) {
                  this.identifier = "";
                  this.name = "";
                  this.mode = "";
                  this.units = "";
                  this.calibration_value = "";
                  this.data_rotation = "";
                  this.inputs = [
                    {
                      treshold_rule: "",
                      operatorBawah: ">",
                      operatorAtas: "<",
                      selectPerbandingan: "or",
                      duration: "",
                      id_m_severity: "",
                      label: "",
                      description: "",
                    },
                  ];

                  this.$router.push({ name: "PortList" });
                }
              });
            })
            .catch((error) => {
              if (error.response.status == 500) {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Maaf, server sedang dalam perbaikan. Mohon menunggu sebentar lagi!",
                });
              }
              console.log(error.response);
            });
        }
      }
    },
    getMDevice() {
      ApiService.get(`${process.env.VUE_APP_ROOT_API_4}/other/mdevice`)
        .then(({ data }) => {
          this.listMdivece = data.result;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },

    getSeverity() {
      ApiService.query(`${process.env.VUE_APP_ROOT_API_4}/other/severity`)
        .then(({ data }) => {
          this.listServerity = data.result;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },

    getFormula() {
      ApiService.get(`${process.env.VUE_APP_ROOT_API_4}/formula`)
        .then(({ data }) => {
          this.listFormula = data.result.payload;
        })
        .catch((error) => {
          if (error.response.data.code == 404) {
            this.listFormula = "";
          }
          console.log(error.response);
        });
    },

    formatThreshold(
      valueAtas,
      valueBawah,
      operatorAtas,
      operatorBawah,
      operatorLogika
    ) {
      let resutlFormat = "";
      if (valueBawah === "" || valueBawah === null || operatorLogika == "") {
        resutlFormat = `val ${operatorAtas} ${valueAtas}`;
      } else {
        resutlFormat = `val ${operatorAtas} ${valueAtas} ${operatorLogika} val ${operatorBawah} ${valueBawah}`;
      }
      return resutlFormat;
    },

    addForm() {
      this.inputs.push({
        title: "",
        treshold_rule: "",
        operatorBawah: ">",
        operatorAtas: "<",
        selectPerbandingan: "or",
        batasAtas: "",
        batasBawah: "",
        duration: "",
        id_m_severity: "",
        label: "",
        description: "",
      });
    },

    deleteForm(index) {
      this.inputs.splice(index, 1);
    },
    backPage() {
      this.$router.push({ name: "PortList" });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/pages/wizard/wizard-4.scss";

.accordion .card .card-header .card-title {
  display: flex;
  -ms-flex-pack: start;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  flex-wrap: nowrap;
}

.required:after {
  content: "*";
  color: red;
}

.fa-trash,
.icon-detail,
.button-click {
  cursor: pointer;
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
