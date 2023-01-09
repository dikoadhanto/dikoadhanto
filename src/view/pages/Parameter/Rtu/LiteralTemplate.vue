<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h2>
          Template Literal {{ getRtuNameRtu }} PORT
          {{ getReturnModePort() }}
        </h2>
      </div>
      <div class="card-body">
        <!-- choose data formula -->
        <div class="row mb-5">
          <div class="col-md-2">
            <div class="form-group">
              <label>Pilih Formula :</label>
            </div>
          </div>
          <div class="col-md-6">
            <treeselect
              noOptionsText="Data tidak ada"
              noResultsText="Data formula tidak ditemukan"
              :options="allDataFormula"
              placeholder="Pilih data formula"
              :normalizer="normalizer"
              :clear-on-select="true"
              v-model="idFormula"
              @input="changeDataFormula"
            >
            </treeselect>
          </div>
        </div>

        <h4>Data formula adalah :</h4>
        <prism-editor
          class="my-editor mb-5 form-control"
          v-model="dataFormula"
          :highlight="highlighter"
          line-numbers
          :readonly="true"
        ></prism-editor>
        <div
          class="btn btn-sm btn-primary mb-5 mr-3"
          v-b-modal="'modal-master'"
          v-if="checkModalMaster()"
        >
          Klik data untuk Master Data
        </div>
        <!-- <div
          class="btn btn-sm btn-success mb-5"
          v-b-modal="'modal-port'"
          v-if="checkModalPort()"
        >
          Klik data untuk Port
        </div> -->
        <h4>Hasil mapping formula adalah :</h4>
        <prism-editor
          class="my-editor form-control"
          v-model="resultFormula"
          :highlight="highlighter"
          line-numbers
          :readonly="true"
        ></prism-editor>

        <!-- save button -->
        <div class="mt-5 save-button row">
          <div class="col-md">
            <div class="btn btn-success" @click="checkResponseFormula">
              Simpan Formula
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- modal masterData -->
    <b-modal id="modal-master" size="xl" @ok="saveFormulaToDatabase">
      <div class="card mb-3" v-for="i in countMasterFormula" :key="i">
        <div class="card-body">
          <h3 class="mb-3">Pilih data untuk mapping formula ke-{{ i }}</h3>
          <div class="row mb-2">
            <div class="col-md">Pilih Tabel:</div>
            <div class="col-md">
              <!-- <input
                type="text mb-2"
                class="form-control"
                placeholder="m_tanks"
                v-model="tableName[i - 1]"
              /> -->
              <treeselect
                noOptionsText="Data tidak ada"
                noResultsText="Nama tabel tidak ditemukan"
                :options="allTableName"
                placeholder="Pilih nama table"
                :normalizer="normalizerTable"
                :clear-on-select="true"
                v-model="tableName[i - 1]"
                @input="getColumnName(i - 1)"
              >
              </treeselect>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-md">Pilih Kolom:</div>
            <div class="col-md">
              <!-- <select name="test" id="test" v-model="columnName[i - 1]">
                <option
                  :value="data"
                  v-for="(data, i) in allColumnName[i]"
                  :key="i"
                >
                  data
                </option>
              </select> -->
              <!-- <input
                type="text"
                class="form-control"
                placeholder="RTU00-D4-KLX"
                v-model="columnName[i - 1]"
              /> -->
              <treeselect
                v-if="columnReady"
                noOptionsText="Data tidak ada"
                noResultsText="Nama tabel tidak ditemukan"
                :options="allColumnName[i - 1]"
                placeholder="Pilih nama table"
                :normalizer="normalizerTable"
                :clear-on-select="true"
                v-model="columnName[i - 1]"
              >
              </treeselect>
            </div>
          </div>
        </div>
      </div>
    </b-modal>

    <!-- modal port Data -->
    <!-- <b-modal id="modal-port" size="xl" @ok="saveFormulaToDatabase">
      <div class="card mb-3" v-for="i in countPortFormula" :key="i">
        <div class="card-body">
          <h3 class="mb-3">Pilih data untuk mapping formula ke-{{ i }}</h3>
          <div class="row mb-2">
            <div class="col-md">Pilih Identifier:</div>
            <div class="col-md">
              <input
                type="text mb-2"
                class="form-control"
                placeholder="RTU00_D4_KLX_BBM_A_59"
                v-model="identifier[i - 1]"
              />
            </div>
          </div>
        </div>
      </div>
    </b-modal> -->
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapGetters } from "vuex";
import ApiService from "@/core/services/api.service";

import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

// import Prism Editor
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css"; // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css"; // import syntax highlighting styles

export default {
  mounted() {
    this.$store.dispatch("setBreadcrumb", [
      { title: "Parameter", subtitle: "RTU Management" },
    ]);
    this.checkStoreVuex();
    this.getDataFormula();
    this.getTableName();
  },
  components: {
    Treeselect,
    PrismEditor,
  },
  computed: {
    ...mapGetters(["getDataPorts", "getRtuNameRtu", "getRtuSName"]),
  },
  data() {
    return {
      allDataFormula: [],

      normalizer(node) {
        return {
          label: node.name,
        };
      },
      normalizerTable(node) {
        return {
          id: node,
          label: node,
        };
      },
      idFormula: null,
      dataFormula: "",
      countMasterFormula: 0,
      countPortFormula: 0,
      typeFormula: "",
      resultFormula: "",

      // data TableName
      allTableName: [],
      // data columnName
      allColumnName: [],
      columnReady: true,

      // masterData
      tableName: [],
      columnName: [],

      // portData
      identifier: [],
    };
  },
  methods: {
    checkStoreVuex() {
      const returnBack = () => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Data rtu dan port harus diisi secara lengkap!",
        });
        this.$router.push({ name: "TableContainnerRtu2" });
      };

      if (this.getRtuNameRtu == "") {
        returnBack();
      }
      if (!this.getDataPorts.mode_port) {
        returnBack();
      }
      if (this.getRtuSName == "") {
        returnBack();
      }
    },
    getReturnModePort() {
      let mode = this.getDataPorts.mode_port == "analog" ? "A" : "D";
      return `${mode}-${this.getDataPorts.port_rtu}`;
    },
    highlighter(code) {
      return highlight(code, languages.js); // languages.<insert language> to return html with markup
    },
    getDataFormula() {
      ApiService.query(`${process.env.VUE_APP_ROOT_API_4}/formula`, {
        params: {
          limit: "all",
        },
      })
        .then(({ data }) => {
          this.allDataFormula = data.result.payload;
        })
        .catch((error) => {
          this.allDataFormula = "";
          console.log(error.response);
        });
    },
    getTableName() {
      ApiService.get(`${process.env.VUE_APP_ROOT_API_4}/other/infoTable`)
        .then(({ data }) => {
          this.allTableName = data.result;
        })
        .catch((err) => {
          console.log(err.response, "response table");
        });
    },
    getColumnName(index) {
      ApiService.query(
        `${process.env.VUE_APP_ROOT_API_4}/other/infoColumnTable?tableName=${this.tableName[index]}`
      )
        .then(({ data }) => {
          this.allColumnName[index] = data.result.column;
          this.columnReady = false;
          setTimeout(() => {
            this.columnReady = true;
          }, 1000);
        })
        .catch((err) => {
          console.log(err.response, "err response table");
        });
    },
    changeDataFormula() {
      ApiService.get(
        `${process.env.VUE_APP_ROOT_API_4}/formula/${this.idFormula}`
      )
        .then(({ data }) => {
          this.dataFormula = data.result.formula;
          this.resultFormula = "";
          this.checkFormula();
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    checkFormula() {
      if (
        this.dataFormula.includes("{MASTER:") &&
        this.dataFormula.includes("{PORT:")
      ) {
        let data = this.dataFormula.split("{MASTER:");
        this.countMasterFormula = data.length - 1;
        for (let i = 0; i < this.countMasterFormula; i++) {
          this.allColumnName[i] = [];
        }

        let secondData = this.dataFormula.split("{PORT:");
        this.countPortFormula = secondData.length - 1;
        this.typeFormula = "allFormula";
      } else if (this.dataFormula.includes("{MASTER:")) {
        let data = this.dataFormula.split("{MASTER:");
        this.countMasterFormula = data.length - 1;
        for (let i = 0; i < this.countMasterFormula; i++) {
          this.allColumnName[i] = [];
        }
        this.typeFormula = "masterData";
      } else if (this.dataFormula.includes("{PORT:")) {
        let data = this.dataFormula.split("{PORT:");
        this.countPortFormula = data.length - 1;

        // change result formula if port is not empty
        const tempFormula = this.dataFormula;
        this.regexPortFormula();
        this.resultFormula = this.dataFormula;
        this.dataFormula = tempFormula;
        this.typeFormula = "portData";
      } else {
        this.countMasterFormula = 0;
        this.countPortFormula = 0;
        this.typeFormula = "";
        this.resultFormula = this.dataFormula;
      }
    },
    checkModalMaster() {
      if (this.countMasterFormula > 0) {
        if (
          this.typeFormula == "masterData" ||
          this.typeFormula == "allFormula"
        ) {
          return true;
        }
      }
      return false;
    },
    checkModalPort() {
      if (this.countPortFormula > 0) {
        if (
          this.typeFormula == "portData" ||
          this.typeFormula == "allFormula"
        ) {
          return true;
        }
      }
      return false;
    },
    regexPortFormula() {
      if (this.countPortFormula > 0) {
        for (let i = 0; i < this.countPortFormula; i++) {
          this.dataFormula = this.dataFormula.replace(
            /:SNAME/,
            `:"${this.getRtuSName}":"${this.getReturnModePort()}"`
          );
        }
      }
    },
    saveFormulaToDatabase() {
      // save formula to temporary
      const temporaryData = this.dataFormula;

      // master data
      if (this.countMasterFormula > 0) {
        for (let i = 0; i < this.countMasterFormula; i++) {
          this.dataFormula = this.dataFormula.replace(
            /:TABLE/,
            `:"${this.tableName[i]}"`
          );
          this.dataFormula = this.dataFormula.replace(
            /:FIELD/,
            `:"${this.columnName[i]}":"${this.getReturnModePort()}"`
          );
        }
      }

      this.regexPortFormula();

      this.resultFormula = this.dataFormula;
      // return to original
      this.dataFormula = temporaryData;
    },
    checkResponseFormula() {
      if (this.resultFormula == "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Formula harus dipilih terlebih dahulu",
        });
      } else {
        ApiService.post(`${process.env.VUE_APP_ROOT_API_4}/formula/valid`, {
          code: this.resultFormula,
        })
          .then(({ data }) => {
            Swal.fire({
              icon: "success",
              title: "Formula Valid",
              text: `Hasil perhitungan formula anda ${data.result.value}`,
            });
          })
          .catch((err) => {
            console.log(err.response, "error formula ..");
            Swal.fire({
              icon: "error",
              title: "Invalid Formula",
              text: `${err.response.data.message}`,
            });
          });
      }
    },
  },
};
</script>

<style scoped>
.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background-color: #f3f6f9;
  min-height: 50px;
  max-height: 500px;
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px 10px;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}
.save-button {
  float: right;
}
</style>
