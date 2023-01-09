<template>
  <div>
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
        <div class="d-flex flex-column scroll-y me-n7 pe-7">
          <div class="fv-row mb-7">
            <label class="required fw-bold fs-6 mb-2">Nama</label>
            <input
              type="text"
              class="form-control form-control-solid mb-3 mb-lg-0"
              placeholder="Nama Formula"
              required
            />
          </div>
          <div class="fv-row mb-7">
            <label class="required fw-bold fs-6 mb-2">Identifier</label>
            <input
              type="text"
              class="form-control form-control-solid mb-3 mb-lg-0"
              placeholder="IDENTIFIER"
              required
            />
          </div>
          <div class="fv-row mb-7">
            <label class="fw-bold fs-6 mb-2">Deskripsi</label>
            <input
              type="text"
              class="form-control form-control-solid mb-3 mb-lg-0"
              placeholder="Deskripsi"
            />
          </div>
          <div class="fv-row mb-7">
            <label class="required fw-bold fs-6 mb-2">Delay</label>
            <input
              type="number"
              class="form-control form-control-solid mb-3 mb-lg-0"
              placeholder=" 1 2 3 ..."
              required
            />
          </div>
          <div class="fv-row mb-7">
            <label class="fw-bold fs-6 mb-2">Unit</label>
            <input
              type="text"
              class="form-control form-control-solid mb-3 mb-lg-0"
              placeholder="Satuan"
            />
          </div>
          <div class="fv-row mb-7">
            <label class="required fw-bold fs-6 mb-2">Formula</label>
            <prism-editor
              class="my-editor height-500 form-control"
              v-model="code"
              :highlight="highlighter"
              line-numbers
            ></prism-editor>
          </div>
        </div>
        <div></div>
      </div>
    </div>
    <b-modal id="code-preview">
      <code-view></code-view>
    </b-modal>
  </div>
</template>

<script>
import CodeView from "./components/CodeView";

// import Prism Editor
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css"; // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css"; // import syntax highlighting styles
// import CodePreview from '../../../content/CodePreview.vue';

export default {
  components: {
    PrismEditor,
    CodeView
  },
  data() {
    return {
      code: "// type your code here...",
    };
  },
  methods: {
    highlighter(code) {
      return highlight(code, languages.js); // languages.<insert language> to return html with markup
    },
    backPage() {
      this.$router.push({
          name: "FormulaV2List"
      });
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
