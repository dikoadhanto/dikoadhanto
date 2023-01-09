<template>
  <b-modal
    ref="update-iprectifier"
    id="update-iprectifier"
    title="Update IP Rectifier"
    size="lg"
    scrollable
    hide-footer
    centered
    @close="closeModal"
    @cancel="closeModal"
    @hidden="closeModal"
  >
    <form @submit.prevent="updateIpRectifier">
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
              v-model="idRtuSelected"
            />
          </div>
          <small>
            Biarkan kosong jika tidak ingin mengubah data RTU. <br />
            RTU saat ini adalah <b> {{ dataRectifier.rtu_name }} </b>
          </small>
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
              v-model="dataRectifier.name"
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
              v-model="dataRectifier.ip_address"
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
  name: "UpdateIpRectifier",
  emits: ["getAllRectifier"],
  data() {
    return {
      dataRtu: [],
      dataRectifier: {},
      idRtuSelected: null,
    };
  },
  components: {
    Treeselect,
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
          console.log(error);
        });
    },
    setIpRectifier(data) {
      this.dataRectifier = data;
    },
    updateIpRectifier() {
      if (this.idRtuSelected != null) {
        this.dataRectifier.id_m_rtu = this.idRtuSelected;
      }

      if (this.dataRectifier.name == "" || this.dataRectifier.name == null) {
        Swal.fire({
          title: "Oops...",
          text: "Nama Rectifier belum diisi",
          icon: "error",
          confirmButtonText: "Ok",
        });
      } else {
        let dataIpRectifier = {
          id_m_rtu: this.dataRectifier.id_m_rtu,
          name: this.dataRectifier.name,
          ip_address: this.dataRectifier.ip_address,
        };
        ApiService.put(
          `${process.env.VUE_APP_ROOT_API_4}/ip-rectifier/${this.dataRectifier.uuid}`,
          dataIpRectifier
        )
          .then(({ data }) => {
            if (data.code == 200) {
              Swal.fire({
                title: "Success",
                text: `Data ${this.dataRectifier.name} berhasil diupdate`,
                icon: "success",
                confirmButtonText: "Ok",
              }).then((result) => {
                if (result.isConfirmed || result.isDismissed) {
                  this.dataRectifier = {};
                  this.$bvModal.hide("update-iprectifier");
                  this.$emit("getAllRectifier");
                }
              });
            }
          })
          .catch((error) => {
            console.log(error.response, "ini err");
          });
      }
    },
    closeModal() {
      this.idRtuSelected = null;
    },
  },
};
</script>

<style scoped>
.required-icon {
  color: red;
}
</style>
