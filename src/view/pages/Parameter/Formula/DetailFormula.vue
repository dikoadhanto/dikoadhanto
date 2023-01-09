<template>
  <b-modal
    id="modal-detail-formula"
    title="Detail Formula"
    size="xl"
    scrollable
    hide-footer
    centered
  >
    <form @submit.prevent="">
      <b-row align-v="center" class="mb-5">
        <b-col cols="3">
          <h6>NAMA FORMULA:</h6>
        </b-col>
        <b-col cols="9">
          <div class="fo rm-group mb-0">
            <input
              type="text"
              class="form-control form-control-solid"
              v-model="namaFormula"
              disabled
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
              disabled
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
              v-model="deskripsi"
              disabled
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
                <input type="checkbox" v-model="isFormulaPort" />
                <span></span>
              </label>
            </span>
          </div>
        </b-col>
      </b-row>

      <b-row align-v="center" class="mb-5">
        <b-col cols="3">
          <h6>FORMULA:</h6>
        </b-col>
        <b-col cols="9">
          <div class="form-group mb-0">
            <prism-editor
              class="my-editor form-control"
              v-model="formula"
              :highlight="highlighter"
              line-numbers
              :readonly="true"
            ></prism-editor>
          </div>
        </b-col>
      </b-row>

      <b-row align-v="center" class="mb-5">
        <b-col cols="3">
          <h6>DELAY:</h6>
        </b-col>
        <b-col cols="9">
          <div class="form-group mb-0">
            <input
              type="text"
              class="form-control form-control-solid"
              v-model="delay"
              disabled
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
              disabled
            />
          </div>
        </b-col>
      </b-row>

      <b-row class="d-flex align-items-center mb-8" align-v="center">
        <b-col>
          <div class="table-responsive">
            <table
              class="table table-striped table-bordered table-hover"
              border="1"
            >
              <thead class="text-center">
                <tr>
                  <th>#</th>
                  <th>LABEL</th>
                  <th>SERVERITY</th>
                  <th>DURATION</th>
                  <th>THRESHOLD RULE</th>
                  <th>DESKRIPSI</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, i) in listThreshold" :key="i">
                  <td>{{ i + 1 }}</td>
                  <td>{{ data.label }}</td>
                  <td>{{ data.labels_severity }}</td>
                  <td>{{ data.duration }}</td>
                  <td>{{ data.rule }}</td>
                  <td>{{ data.desc }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-col>
      </b-row>
    </form>
  </b-modal>
</template>

<script>
import ApiService from "@/core/services/api.service";
// import Prism Editor
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css"; // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css"; // import syntax highlighting styles

export default {
  name: "DetailFormula",
  components: {
    PrismEditor,
  },
  props: ["formulaSelected"],
  data() {
    return {
      idSelected: "",
      namaFormula: "",
      identifier: "",
      isFormulaPort: true,
      deskripsi: "",
      formula: "",
      delay: "",
      units: "",
      listThreshold: [],
    };
  },

  watch: {
    formulaSelected: function () {
      this.setDataFormula();
      this.getDataThreshold();
    },
  },

  methods: {
    highlighter(code) {
      return highlight(code, languages.js); // languages.<insert language> to return html with markup
    },
    setDataFormula() {
      this.namaFormula = this.formulaSelected.name;
      this.identifier = this.formulaSelected.identifier;
      this.deskripsi = this.formulaSelected.description;
      this.isFormulaPort =
        this.formulaSelected.is_specific_port == 1 ? true : false;
      this.formula = this.formulaSelected.formula;
      this.delay = this.formulaSelected.delay;
      this.units = this.formulaSelected.units;
      this.idSelected = this.formulaSelected.id;
    },

    getDataThreshold() {
      ApiService.get(
        `${process.env.VUE_APP_ROOT_API_4}/formula`,
        `treshold/${this.idSelected}`
      )
        .then(({ data }) => {
          this.listThreshold = data.result.info_treshold;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.required-icon {
  color: red;
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
