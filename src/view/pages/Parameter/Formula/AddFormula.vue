<template>
  <div class="card">
    <b-row class="head-wrapper">
      <b-col>
        <h2 class="mt-7 ml-10">Tambah Formula</h2>
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
                  <div class="wizard-title">Formula</div>
                  <div class="wizard-desc">Tambah FORMULA</div>
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
              <div class="col-xl-12">
                <form @submit.prevent="" class="ml-25 mr-25">
                  <div
                    class="pb-5"
                    data-wizard-type="step-content"
                    data-wizard-state="current"
                  >
                    <div class="card p-5">
                      <b-row align-v="center" class="mb-5">
                        <b-col cols="3">
                          <h6>
                            NAMA FORMULA&nbsp;<span class="required"></span
                            >&nbsp;:
                          </h6>
                        </b-col>
                        <b-col cols="9">
                          <div class="form-group mb-0">
                            <input
                              type="text"
                              class="form-control form-control-solid"
                              v-model="namaFormula"
                            />
                          </div>
                        </b-col>
                      </b-row>

                      <b-row align-v="center" class="mb-5">
                        <b-col cols="3">
                          <h6>IDENTIFIER:</h6>
                        </b-col>
                        <b-col cols="9">
                          <div class="form-group mb-0">
                            <input
                              type="text"
                              class="form-control form-control-solid"
                              v-model="identifier"
                            />
                          </div>
                        </b-col>
                      </b-row>

                      <b-row align-v="center" class="mb-5">
                        <b-col cols="3">
                          <h6>DESKRIPSI:</h6>
                        </b-col>
                        <b-col cols="9">
                          <div class="form-group mb-0">
                            <input
                              type="text"
                              class="form-control form-control-solid"
                              v-model="deskripsiFormula"
                            />
                          </div>
                        </b-col>
                      </b-row>
                      <b-row align-v="center" class="mb-5">
                        <b-col cols="3">
                          <h6>FORMULA PORT:</h6>
                        </b-col>
                        <b-col cols="9">
                          <div class="form-group mb-0">
                            <span class="switch switch-sm switch-icon">
                              <label>
                                <input
                                  type="checkbox"
                                  v-model="isFormulaPort"
                                  @change="changeHelperFormula"
                                />
                                <span></span>
                              </label>
                            </span>
                          </div>
                        </b-col>
                      </b-row>

                      <b-row class="mb-5">
                        <b-col cols="3">
                          <h6>
                            FORMULA&nbsp;<span class="required"></span>&nbsp;:
                          </h6>
                        </b-col>
                        <b-col cols="9">
                          <div class="row mb-2">
                            <div class="col-md">
                              <div
                                class="btn btn-sm btn-primary mr-2"
                                @click="addHelperToFormula(0)"
                              >
                                MASTER
                              </div>
                              <div
                                class="btn btn-sm btn-success mr-2"
                                @click="addHelperToFormula(1)"
                              >
                                PORT
                              </div>
                              <div
                                class="btn btn-sm btn-warning"
                                @click="addHelperToFormula(2)"
                              >
                                FORMULA
                              </div>
                            </div>
                          </div>
                          <div class="form-group mb-0">
                            <prism-editor
                              class="my-editor form-control"
                              v-model="formula"
                              :highlight="highlighter"
                              line-numbers
                            ></prism-editor>
                          </div>
                        </b-col>
                      </b-row>

                      <b-row align-v="center" class="mb-5">
                        <b-col cols="3">
                          <h6>
                            DELAY&nbsp;<span class="required"></span>&nbsp;:
                          </h6>
                        </b-col>
                        <b-col cols="9">
                          <div class="form-group mb-0">
                            <input
                              type="text"
                              class="form-control form-control-solid"
                              v-model="delay"
                            />
                          </div>
                        </b-col>
                      </b-row>

                      <b-row align-v="center" class="mb-5">
                        <b-col cols="3">
                          <h6>UNITS:</h6>
                        </b-col>
                        <b-col cols="9">
                          <div class="form-group mb-0">
                            <input
                              type="text"
                              class="form-control form-control-solid"
                              v-model="units"
                            />
                          </div>
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
                              <div v-if="data.label != ''">
                                {{ data.label }}
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
                                    v-model="data.label"
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
                                  <treeselect
                                    noOptionsText="Data tidak ada"
                                    noResultsText="Data severity tidak ditemukan"
                                    :options="listServerity"
                                    placeholder="Pilih Data Severity"
                                    :clear-on-select="true"
                                    v-model="inputs[index].id_m_severity"
                                    openDirection="bottom"
                                  >
                                  </treeselect>
                                  <!-- <select
                                    class="form-control form-control-solid"
                                    v-model="inputs[index].id_m_severity"
                                  > -->
                                  <!-- <option>Pilih Serverity</option> -->
                                  <!-- <option
                                      v-for="(data, i) in listServerity"
                                      :key="i"
                                      :value="data.id"
                                    >
                                      <span
                                        class="badge badge-danger text-white"
                                        >{{ data.name }}</span
                                      >
                                    </option> -->

                                  <!-- </select> -->
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
                                    v-model="data.duration"
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
                                <b-col cols="2">
                                  <b-form-select
                                    class="form-control"
                                    v-model="data.operatorAtas"
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
                                    class="form-control form-control-solid"
                                    v-model="data.batasAtas"
                                  />
                                </b-col>
                              </b-row>

                              <b-row align-v="center" class="m-4" no-gutters>
                                <b-col cols="3">
                                  <h6>GERBANG LOGIKA :</h6>
                                </b-col>
                                <b-col cols="2">
                                  <b-form-select
                                    class="form-control"
                                    v-model="data.selectPerbandingan"
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
                                <b-col cols="2">
                                  <b-form-select
                                    class="form-control"
                                    v-model="data.operatorBawah"
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
                                    class="form-control form-control-solid"
                                    v-model="data.batasBawah"
                                  />
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
                                    v-model="data.description"
                                  ></textarea>
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
                        @click="addFormula()"
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
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import KTUtil from "@/assets/js/components/util";
import KTWizard from "@/assets/js/components/wizard";
import Swal from "sweetalert2";

// import Prism Editor
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css"; // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css"; // import syntax highlighting styles

export default {
  name: "addFormula",
  data() {
    return {
      namaFormula: "",
      identifier: "",
      deskripsiFormula: "",
      isFormulaPort: true,
      formula: "/* type your formula code here... */",
      delay: "",
      units: "",
      is_validate: true,
      helperFormula: [
        "{MASTER:TABLE_NAME:TABLE_FIELD:NO_PORT};",
        "{PORT:IDENTIFIER_PORT:NO_PORT};",
        "{FORMULA:IDENTIFIER_FORMULA:NO_PORT};",
      ],

      // normalizer(node) {
      //   return {
      //     id: node.id,
      //     label: node.name,
      //   };
      // },

      listServerity: [],
      listOperator: [
        { name: "=" },
        { name: "!=" },
        { name: ">=" },
        { name: ">" },
        { name: "<=" },
        { name: "<" },
      ],

      listPerbandingan: [
        { id: "or", name: "OR" },
        { id: "and", name: "AND" },
      ],

      inputs: [
        {
          title: "",
          label: "",
          duration: "",
          id_m_severity: null,
          operatorBawah: ">",
          operatorAtas: "<",
          selectPerbandingan: "or",
          treshold_rule: "",
          batasAtas: "",
          batasBawah: "",
          description: "",
        },
      ],
    };
  },
  components: {
    Treeselect,
    PrismEditor,
  },
  mounted() {
    this.getSeverity();
    const wizard = new KTWizard("kt_wizard_v4", {
      startStep: 1, // initial active step number
      clickableSteps: true, // allow step clicking
    });

    // Change event
    wizard.on("change", function (/*wizardObj*/) {
      setTimeout(() => {
        KTUtil.scrollTop();
      }, 500);
    });
  },
  methods: {
    changeHelperFormula() {
      if (this.isFormulaPort) {
        this.helperFormula = [
          "{MASTER:TABLE_NAME:TABLE_FIELD:NO_PORT};",
          "{PORT:IDENTIFIER_PORT:NO_PORT};",
          "{FORMULA:IDENTIFIER_FORMULA:NO_PORT};",
        ];
      } else {
        this.helperFormula = [
          "{MASTER:TABLE_NAME:TABLE_FIELD};",
          "{PORT:IDENTIFIER_PORT};",
          "{FORMULA:IDENTIFIER_FORMULA};",
        ];
      }
    },
    addHelperToFormula(index) {
      this.formula = this.formula.concat(this.helperFormula[index]);
    },
    highlighter(code) {
      return highlight(code, languages.js); // languages.<insert language> to return html with markup
    },
    addFormula() {
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

      if (this.namaFormula === "" || this.namaFormula == null) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Nama Formula tidak boleh kosong",
        });
      } else if (this.identifier === "" || this.identifier == null) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Identifier tidak boleh kosong",
        });
      } else if (this.deskripsiFormula == "" || this.deskripsiFormula == null) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Deskripsi tidak boleh kosong",
        });
      } else if (this.formula === "" || this.formula == null) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Formula tidak boleh kosong",
        });
      } else if (this.delay === "" || this.delay == null) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Delay tidak boleh kosong",
        });
      } else if (this.units === "" || this.units == null) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Units tidak boleh kosong",
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
          } else if (items.treshold_rule == "" || items.treshold_rule == null) {
            this.is_validate = false;

            Swal.fire({
              icon: "error",
              title: "Oops..",
              text: "Treshold Rule tidak boleh kosong",
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
          let dataAdd = {
            name: this.namaFormula,
            identifier: this.identifier,
            description: this.deskripsiFormula,
            is_specific_port: this.isFormulaPort == true ? 1 : 0,
            formula: this.formula,
            delay: this.delay,
            units: this.units,
            multiTreshold: this.inputs,
          };

          ApiService.post(
            `${process.env.VUE_APP_ROOT_API_4}/formula/add`,
            dataAdd
          )
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Data berhasil ditambahkan",
              }).then((result) => {
                if (result.isConfirmed || result.isDismissed) {
                  this.identifier = "";
                  this.isFormulaPort = true;
                  this.deskripsiFormula = "";
                  this.formula = "";
                  this.delay = "";
                  this.units = "";
                  this.inputs = [
                    {
                      title: "",
                      label: "",
                      duration: "",
                      id_m_severity: null,
                      operatorBawah: ">",
                      operatorAtas: "<",
                      selectPerbandingan: "or",
                      treshold_rule: "",
                      batasAtas: "",
                      batasBawah: "",
                      description: "",
                    },
                  ];

                  this.$router.push({ name: "FormulaList" });
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
    getSeverity() {
      ApiService.query(`${process.env.VUE_APP_ROOT_API_4}/other/severity`)
        .then(({ data }) => {
          this.listServerity = data.result.map((item) => ({
            id: item.id,
            label: item.name,
          }));
        })
        .catch((error) => {
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
      if (valueBawah === "" || valueBawah === null) {
        resutlFormat = `val ${operatorAtas} ${valueAtas}`;
      } else {
        resutlFormat = `val ${operatorAtas} ${valueAtas} ${operatorLogika} val ${operatorBawah} ${valueBawah}`;
      }
      return resutlFormat;
    },

    addForm() {
      this.inputs.push({
        title: "",
        label: "",
        duration: "",
        id_m_severity: null,
        operatorBawah: ">",
        operatorAtas: "<",
        selectPerbandingan: "or",
        treshold_rule: "",
        batasAtas: "",
        batasBawah: "",
        description: "",
      });
    },

    deleteForm(index) {
      this.inputs.splice(index, 1);
    },
    backPage() {
      this.$router.push({ name: "FormulaList" });
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

#modal-add-formula___BV_modal_outer_ {
  z-index: 100 !important;
}

#formula {
  border: 1px solid black;
  border-radius: 5px;
}

.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background-color: #f3f6f9;
  min-height: 50px;
  max-height: 300px;
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px 10px;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}
</style>
