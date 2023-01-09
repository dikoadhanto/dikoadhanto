<template>
  <b-modal
    ref="add-iprectifier"
    id="add-iprectifier"
    title="Add IP Rectifier"
    size="lg"
    scrollable
    hide-footer
    centered
    @close="closeModal"
    @cancel="closeModal"
    @hidden="closeModal"
  >
    <form @submit.prevent="addIpRectifier">
      <b-row align-v="center" class="mb-5">
        <b-col cols="3">
          <h6>NAMA RTU&nbsp;<span class="required-icon">*</span>&nbsp;:</h6>
        </b-col>
        <b-col cols="9">
          <div class="form-group mb-0">
            <treeselect
              :async="true"
              :clear-on-select="true"
              :load-options="loadOptions"
              placeholder="Ketik untuk cari RTU"
              v-model="selectedRtuId"
            />
          </div>
        </b-col>
      </b-row>

      <b-row align-v="center" class="mb-5">
        <b-col cols="3">
          <h6>
            NAMA RECTIFIER&nbsp;<span class="required-icon">*</span>&nbsp;:
          </h6>
        </b-col>
        <b-col cols="9">
          <div class="form-group mb-0">
            <input
              type="text"
              class="form-control form-control-solid"
              v-model="namaRectifier"
            />
          </div>
        </b-col>
      </b-row>

      <b-row align-v="center" class="mb-5">
        <b-col cols="3">
          <h6>IP RECTIFIER:</h6>
        </b-col>
        <b-col cols="9">
          <div class="form-group mb-0">
            <input
              type="text"
              class="form-control form-control-solid"
              v-model="ipRectifier"
            />
          </div>
        </b-col>
      </b-row>

      <!-- Button Simpan -->
      <b-row align-v="center">
        <b-col cols="auto" class="ml-auto">
          <button type="submit" class="btn btn-sm btn-success mt-5">
            Simpan &nbsp;
            <span><i class="fas fa-chevron-right icon-sm"></i></span>
          </button>
        </b-col>
      </b-row>
    </form>
  </b-modal>
</template>

<script>
import Swal from "sweetalert2";
import Treeselect from "@riophae/vue-treeselect";
import ApiService from "@/core/services/api.service";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { ASYNC_SEARCH } from "@riophae/vue-treeselect";

const simulateAsyncOperation = (fn) => {
  setTimeout(fn, 1000);
};

export default {
  name: "AddIpRectifier",
  emits: ["getAllRectifier"],
  data() {
    return {
      dataRtu: [],
      selectedRtuId: null,
      namaRectifier: "",
      ipRectifier: "",
    };
  },
  components: {
    Treeselect,
  },

  mounted() {
    this.getRtu();
  },
  methods: {
    loadOptions({ action, searchQuery, callback }) {
      if (action === ASYNC_SEARCH) {
        simulateAsyncOperation(() => {
          const options = [];
          this.dataRtu.forEach((element) => {
            if (
              element.label.toLowerCase().includes(searchQuery.toLowerCase())
            ) {
              options.push(element);
            }
          });
          callback(null, options.slice(0, 100));
        });
      }
    },
    getRtu() {
      ApiService.get(`${process.env.VUE_APP_ROOT_API_4}/rtu?limit=all`)
        .then(({ data }) => {
          this.dataRtu = data.result.payload.map((rtu) => {
            return {
              id: rtu.rtu_id,
              label: rtu.rtu_name,
            };
          });
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    addIpRectifier() {
      if (this.selectedRtuId == "" || this.selectedRtuId == null) {
        Swal.fire({
          title: "Oops...",
          text: "RTU belum diisi",
          icon: "error",
          confirmButtonText: "Ok",
        });
      } else if (this.namaRectifier == "" || this.namaRectifier == null) {
        Swal.fire({
          title: "Oops...",
          text: "Nama Rectifier belum diisi",
          icon: "error",
          confirmButtonText: "Ok",
        });
      } else {
        let dataRectifier = {
          id_m_rtu: this.selectedRtuId,
          name: this.namaRectifier,
          ip_address: this.ipRectifier,
        };
        ApiService.post(
          `${process.env.VUE_APP_ROOT_API_4}/ip-rectifier`,
          dataRectifier
        ).then(() => {
          Swal.fire({
            title: "Success",
            text: "Data berhasil ditambahkan",
            icon: "success",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed || result.isDismissed) {
              this.$bvModal.hide("add-iprectifier");
              this.dataRtu = [];
              this.selectedRtuId = "";
              this.namaRectifier = "";
              this.ipRectifier = "";
              this.$emit("getAllRectifier");
            }
          });
        });
      }
    },
    closeModal() {
      this.selectedRtuId = null;
      this.namaRectifier = "";
      this.ipRectifier = "";
    },
  },
};
</script>

<style scoped>
.required-icon {
  color: red;
}
</style>
