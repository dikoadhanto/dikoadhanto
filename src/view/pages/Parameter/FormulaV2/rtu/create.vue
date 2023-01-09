<template>
  <div>
    <div class="card">
      <b-row class="head-wrapper">
        <b-col>
          <h2 class="mt-7 ml-10">Tambah Formula RTU</h2>
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
            <label class="required fw-bold fs-6 mb-2">RTU</label>
            <select
              class="form-control form-control-solid"
              v-model="form.rtuId"
              required
              @change="
                () => {
                  if (form.rtuId) {
                    getMasterRtuPorts();
                  }
                }
              "
            >
              <option disabled selected>Pilih Rtu</option>
              <option
                v-for="(data, i) in master.rtus"
                :key="i"
                :value="data.id"
              >
                <span class="badge badge-danger text-white">{{
                  data.sname
                }}</span>
              </option>
            </select>
          </div>
          <div class="fv-row mb-7">
            <!-- <label class="required fw-bold fs-6 mb-2">Formula</label> -->
            <pre v-html="formulaForm"></pre>
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
// import CodeView from "./components/CodeView";
// import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
// import Swal from "sweetalert2";
import ApiService from "@/core/services/api.service";
// import textHelper from "@/core/helpers/textHelper";

export default {
  components: {
    // CodeView
  },
  data() {
    return {
      code: "// type your code here...",
      form: {
        rtuId: null,
        formulaId: this.$route.params.formulaId,
        formula: "",
      },
      master: {
        ports: [],
        rtus: [],
        rtuPorts: [],
      },
      formulaForm: "",
    };
  },
  computed: {},
  //   watch: {

  //   },
  mounted() {
    this.getFormulaById(this.form.formulaId);
    this.getMasterPorts();
    this.getMasterRtus();
  },
  methods: {
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
        this.form.formula = data.result.formula;
        this.$bvModal.hide("modalLoading");
      } catch (error) {
        this.$bvModal.hide("modalLoading");
        console.error(error.response);
      }
    },
    async getMasterPorts() {
      try {
        const { data } = await ApiService.get(
          `${process.env.VUE_APP_ROOT_API_4}/formula-v2`,
          "ports"
        );
        this.master.ports = data.result;
      } catch (error) {
        console.error(error.response);
      }
    },
    async getMasterRtus() {
      try {
        const { data } = await ApiService.get(
          `${process.env.VUE_APP_ROOT_API_4}/formula-v2`,
          "rtus"
        );
        this.master.rtus = data.result;
      } catch (error) {
        console.error(error);
      }
    },
    async getMasterRtuPorts() {
      try {
        const { data } = await ApiService.query(
          `${process.env.VUE_APP_ROOT_API_4}/formula-v2/rtus/${this.form.rtuId}/ports`
        );
        this.master.rtuPorts = data.result;
        this.regexFormula();
      } catch (error) {
        console.error(error);
      }
    },
    regexFormula() {
      let formula = String(this.form.formula);
      if (
        this.master.rtuPorts.length > 0 &&
        this.master.rtus.length > 0 &&
        this.master.ports.length > 0
      ) {
        this.formulaMasters.forEach((master) => {
          master.columns.forEach((col) => {
            let selectOptions = '<select class="badge badge-primary">';
            const pattern = `{MASTER:${master.table}:${col}}`;
            const reg = new RegExp(pattern, "g");
            selectOptions += `<option disabled selected>Pilih Port</option>`;
            this.master.rtuPorts.forEach((port) => {
              if (port[master.table].id) {
                selectOptions += `<option value="${port.no_port}">${
                  port.no_port
                } - ${port.description} - ${
                  port[master.table][col]
                }cm</option>`;
              }
            });
            selectOptions += "</select>";
            formula = formula.replace(reg, selectOptions);
          });
        });
        for (let i = 0; i < this.master.ports.length; i++) {
          let selectOptions = '<select class="badge badge-warning">';
          const port = this.master.ports[i];
          const regexCode = `{PORT:${port.identifier}}`;
          selectOptions += `<option disabled selected>Pilih Port</option>`;
          this.master.rtuPorts.forEach((rPort) => {
            if (rPort.identifier == port.identifier) {
              selectOptions += `<option value="${rPort.no_port}">${rPort.no_port} - ${rPort.description}</option>`;
            }
          });
          selectOptions += "</select>";
          formula = formula.replace(new RegExp(regexCode, "g"), selectOptions);
        }
      }
      this.formulaForm = formula;
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
