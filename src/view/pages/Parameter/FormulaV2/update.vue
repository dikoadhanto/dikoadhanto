<template>
  <div>
    <div class="card">
      <b-row class="head-wrapper">
        <b-col>
          <h2 class="mt-7 ml-10">Update Formula</h2>
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
        <div class="d-flex flex-column scroll-y me-n7 pe-7">
          <div class="fv-row mb-7">
            <label class="required fw-bold fs-6 mb-2">Nama</label>
            <input
              v-model="formula.name"
              type="text"
              class="form-control form-control-solid mb-3 mb-lg-0"
              placeholder="Nama Formula"
              required
            />
          </div>
          <div class="fv-row mb-7">
            <label class="required fw-bold fs-6 mb-2">Identifier</label>
            <input
              v-model="formula.identifier"
              type="text"
              class="form-control form-control-solid mb-3 mb-lg-0"
              placeholder="IDENTIFIER"
              required
            />
          </div>
          <div class="fv-row mb-7">
            <label class="fw-bold fs-6 mb-2">Deskripsi</label>
            <input
              v-model="formula.description"
              type="text"
              class="form-control form-control-solid mb-3 mb-lg-0"
              placeholder="Deskripsi"
            />
          </div>
          <div class="fv-row mb-7">
            <label class="required fw-bold fs-6 mb-2">Delay</label>
            <input
              v-model="formula.delay"
              type="number"
              class="form-control form-control-solid mb-3 mb-lg-0"
              placeholder=" 1 2 3 ..."
              required
            />
          </div>
          <div class="fv-row mb-7">
            <label class="fw-bold fs-6 mb-2">Unit</label>
            <input
              v-model="formula.units"
              type="text"
              class="form-control form-control-solid mb-3 mb-lg-0"
              placeholder="Satuan"
            />
          </div>
          <div class="fv-row mb-7">
            <label class="required fw-bold fs-6 mb-2" style="margin-right: 5px"
              >Formula</label
            >
            <button
              class="btn btn-primary btn-sm"
              @click="
                () => {
                  $bvModal.show('code-preview');
                }
              "
            >
              <i class="fa fa-search fa-sm"></i>
            </button>
            <!-- <div class="row">
            </div> -->
            <prism-editor
              class="my-editor height-500 form-control"
              v-model="formula.formula"
              :highlight="highlighter"
              line-numbers
            ></prism-editor>
          </div>
          <div class="fv-row mb-7">
            <button
              class="btn btn-sm btn-success float-right"
              data-wizard-type="action-submit"
              @click="addFormula()"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
    <b-modal id="code-preview" title="PREVIEW" size="lg">
      <code-view :code="formula.formula" :ports="ports"></code-view>
    </b-modal>
  </div>
</template>

<script>
import ApiService from "@/core/services/api.service";
import CodeView from "./components/CodeView.vue";

// import Prism Editor
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css"; // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css"; // import syntax highlighting styles

export default {
  components: {
    PrismEditor,
    CodeView,
  },
  data() {
    return {
      formula: {
        name: "",
        identifier: "",
        formula: "",
        units: "",
        delay: 0,
        description: "",
      },
      ports: [],
    };
  },
  mounted() {
    this.getFormulaById(this.$route.params.formulaId);
    this.getMasterPorts();
  },
  methods: {
    highlighter(code) {
      return highlight(code, languages.js); // languages.<insert language> to return html with markup
    },
    backPage() {
      this.$router.push({
        name: "FormulaV2List",
      });
    },
    async getFormulaById(id) {
      this.$bvModal.show("modalLoading");
      try {
        const { data } = await ApiService.get(
          `${process.env.VUE_APP_ROOT_API_4}/formula-v2`,
          id
        );
        this.formula = data.result;
        this.$bvModal.hide("modalLoading");
      } catch (error) {
        console.error(error.response);
        this.$bvModal.hide("modalLoading");
      }
    },
    async getMasterPorts() {
      try {
        const { data } = await ApiService.get(
          `${process.env.VUE_APP_ROOT_API_4}/formula-v2`,
          "ports"
        );
        this.ports = data.result;
      } catch (error) {
        console.error(error.response);
      }
    },
  },
};
</script>

<style>
/* required class */
.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background-color: #f3f6f9;
  max-height: 400px;
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px 10px;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}
/* not required */
.height-500 {
  height: 500px;
}
</style>
