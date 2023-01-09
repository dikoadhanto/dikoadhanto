<template>
  <b-modal id="detail-rtu" size="lg" title="Detail RTU" hide-footer centered>
    <form>
      <div class="card p-5">
        <b-row class="d-flex align-items-center mb-8" align-v="center">
          <b-col cols="3">
            <h6>VIRTUAL&nbsp;<span class="required"></span>&nbsp;:</h6>
          </b-col>
          <b-col cols="9">
            <span
              class="switch switch-sm switch-icon justify-content-start"
              v-if="is_virtual"
            >
              <label>
                <input
                  type="checkbox"
                  value="true"
                  checked="checked"
                  disabled
                />
                <span></span>
              </label>
            </span>
            <span
              class="switch switch-sm switch-icon justify-content-start"
              v-else
            >
              <label>
                <input type="checkbox" disabled />
                <span></span>
              </label>
            </span>
          </b-col>
        </b-row>

        <b-row
          class="d-flex align-items-center mb-8"
          align-v="center"
          no-gutters
        >
          <b-col cols="3">
            <h6>NAMA MD&nbsp;<span class="required-icon">*</span>&nbsp;:</h6>
          </b-col>
          <b-col>
            <input
              type="text"
              v-model="md_name"
              class="form-control form-control-solid"
              disabled
            />
          </b-col>
        </b-row>

        <b-row
          class="d-flex align-items-center mb-8"
          align-v="center"
          no-gutters
        >
          <b-col cols="3">
            <h6>LOKASI MD&nbsp;<span class="required-icon">*</span>&nbsp;:</h6>
          </b-col>
          <b-col>
            <input
              type="text"
              v-model="md_location"
              class="form-control form-control-solid"
              disabled
            />
          </b-col>
        </b-row>

        <b-row
          class="d-flex align-items-center mb-8"
          align-v="center"
          no-gutters
        >
          <b-col cols="3">
            <h6>
              IP ADDRESS MD&nbsp;<span class="required-icon">*</span>&nbsp;:
            </h6>
          </b-col>
          <b-col>
            <input
              type="text"
              v-model="md_ip"
              class="form-control form-control-solid"
              value=""
              disabled
            />
          </b-col>
        </b-row>
      </div>
      <div class="card p-5 mt-5">
        <b-row
          class="d-flex align-items-center mb-8"
          no-gutters
          align-v="center"
        >
          <b-col cols="3">
            <h6>NAMA RTU&nbsp;<span class="required-icon">*</span>&nbsp;:</h6>
          </b-col>
          <b-col>
            <input
              type="text"
              v-model="rtu_name"
              class="form-control form-control-solid"
              value=""
              disabled
            />
          </b-col>
        </b-row>

        <b-row
          class="d-flex align-items-center mb-8"
          align-v="center"
          no-gutters
        >
          <b-col cols="3">
            <h6>DESKRIPSI &nbsp;<span class="required"></span>&nbsp;:</h6>
          </b-col>
          <b-col>
            <textarea
              class="form-control form-control-solid"
              v-model="deskripsiRTU"
              disabled
            />
          </b-col>
        </b-row>

        <b-row
          class="d-flex align-items-center mb-8"
          align-v="center"
          no-gutters
        >
          <b-col cols="3">
            <h6>LOKASI RTU&nbsp;<span class="required-icon">*</span>&nbsp;:</h6>
          </b-col>
          <b-col>
            <input
              type="text"
              v-model="rtu_location"
              class="form-control form-control-solid"
              value=""
              disabled
            />
          </b-col>
        </b-row>

        <b-row
          class="d-flex align-items-center mb-8"
          no-gutters
          align-v="center"
        >
          <b-col cols="3">
            <h6>
              IP ADDTESS RTU&nbsp;<span class="required-icon">*</span>&nbsp;:
            </h6>
          </b-col>
          <b-col>
            <input
              type="text"
              v-model="rtu_ip"
              class="form-control form-control-solid"
              value=""
              disabled
            />
          </b-col>
        </b-row>

        <b-row class="d-flex align-items-center" no-gutters align-v="center">
          <b-col cols="3">
            <h6>TAG&nbsp;<span class="required-icon">*</span>&nbsp;:</h6>
          </b-col>
          <b-col cols="9">
            <Treeselect
              disabled
              style="background: f3f6f9"
              v-model="selectedTags"
              :options="listTagas"
              placeholder="Pilih tags"
              node-label-prop="name"
              :multiple="true"
            />
          </b-col>
        </b-row>
      </div>
    </form>
  </b-modal>
</template>

<script>
import ApiService from "@/core/services/api.service";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import Treeselect from "@riophae/vue-treeselect";

export default {
  name: "DetailRtu",
  components: {
    Treeselect,
  },

  data() {
    return {
      rtu_ip: "",
      rtu_name: "",
      deskripsiRTU: "",
      rtu_description: "",
      listTagas: [],
      md_ip: "",
      md_name: "",
      is_virtual: true,
      rtu_location: "",
      rtu_port: "",
      md_location: "",
      selectedTags: [],

      normalizer(node) {
        return {
          id: node.name,
          label: node.name,
        };
      },
    };
  },

  props: ["idSelected"],
  watch: {
    idSelected: function () {
      if (this.idSelected !== null) {
        this.getDetailRtu();
        this.getDataTags();
      }
    },
  },

  methods: {
    async getDetailRtu() {
      await ApiService.get(
        process.env.VUE_APP_ROOT_API_4,
        `rtu/${this.idSelected}`
      )
        .then(({ data }) => {
          this.md_name = data.result.md_name ? data.result.md_name : "-";
          this.md_ip = data.result.md_ip ? data.result.md_ip : "-";
          this.md_location = data.result.md_location
            ? data.result.md_location
            : "-";
          this.rtu_name = data.result.rtu_name ? data.result.rtu_name : "-";
          this.deskripsiRTU = data.result.deskripsi_rtu
            ? data.result.deskripsi
            : "-";
          this.rtu_ip = data.result.rtu_ip ? data.result.rtu_ip : "-";
          this.rtu_location = data.result.rtu_location
            ? data.result.rtu_location
            : "-";
          this.rtu_port = data.result.rtu_port ? data.result.rtu_port : "-";
          this.is_virtual = data.result.is_virtual;
          this.selectedTags = data.result.tags.map((item) => {
            return item.id;
          });
        })
        .catch((error) => {
          console.log("error", error.response);
        });
    },
    //for get data tags
    getDataTags() {
      ApiService.get(`${process.env.VUE_APP_ROOT_API_3}/tags`).then(
        ({ data }) => {
          this.listTagas = data.result.tags.map((item) => ({
            id: item.id,
            label: item.name,
          }));
        }
      );
    },
  },
};
</script>
<style scoped>
.required-icon {
  color: red;
}

.fa-eye,
.fa-pen,
.fa-trash,
.icon-detail,
.button-click {
  cursor: pointer;
}
</style>
