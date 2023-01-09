<template>
  <b-modal
    id="modal-link-formula"
    size="lg"
    title="Formula RTU Port Link"
    scrollable
    hide-footer
    centered
  >
    <section id="select-rtu-port">
      <div class="container">
        <form @submit.prevent="addMrpLinkFormula">
          <!-- name, desc, template -->
          <div class="card p-4 mb-3">
            <b-row align-v="center" class="mb-5">
              <b-col cols="3">
                <h6>Nama Formula:</h6>
              </b-col>
              <b-col cols="9">
                <div class="form-group mb-0">
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
                <h6>Deskripsi:</h6>
              </b-col>
              <b-col cols="9">
                <div class="form-group mb-0">
                  <input
                    type="text"
                    class="form-control form-control-solid"
                    v-model="deskripsiFormula"
                    disabled
                  />
                </div>
              </b-col>
            </b-row>
          </div>

          <!-- list permission uam -->
          <div class="card p-4">
            <label class="col-form-label mb-3">LIST RTU PORT :</label>
            <div class="row">
              <!-- list wrap -->
              <div class="col-md-6">
                <div class="card p-3 card-permission mb-4">
                  <div class="mb-3">
                    <!-- search -->
                    <div class="row">
                      <div class="col-md-12">
                        <input
                          v-model="searchKey"
                          type="text"
                          placeholder="Search..."
                          class="form-control form-search"
                        />
                      </div>
                    </div>
                  </div>
                  <!-- list -->
                  <div class="mb-3" v-for="(item, i) in listRtuPort" :key="i">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        :value="item"
                        :id="item.id"
                        v-model="newListRtuPort"
                      />
                      <label class="form-check-label ml-1" :for="item.id">
                        {{ item.rtu_name }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <!-- choose list -->
              <div class="col-md-6">
                <div class="card card-permission p-8">
                  <ol>
                    <li v-for="(item, i) in newListRtuPort" :key="i">
                      {{ item.rtu_name }}
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

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
      </div>
    </section>
  </b-modal>
</template>

<script>
import Swal from "sweetalert2";
import ApiService from "@/core/services/api.service.js";

export default {
  props: ["formulaSelected"],
  data() {
    return {
      namaFormula: "",
      deskripsiFormula: "",
      idFormula: "",

      searchKey: "",
      listRtuPort: [],
      newListRtuPort: [],
    };
  },
  watch: {
    searchKey: function () {
      this.getRtuPort();
    },
  },
  methods: {
    setDataFormula() {
      this.getRtuPort();
      this.namaFormula = this.formulaSelected.name;
      this.deskripsiFormula = this.formulaSelected.description;
      this.idFormula = this.formulaSelected.id;
      this.setRtuPort();
    },
    setRtuPort() {
      ApiService.query(
        `${process.env.VUE_APP_ROOT_API_4}/formula/rtu/${this.formulaSelected.id}`
      )
        .then(({ data }) => {
          this.newListRtuPort = [];
          this.newListRtuPort = data.result.map((rtu) => {
            return {
              id: rtu.id_m_rtu,
              rtu_name: rtu.name,
            };
          });
        })
        .catch((err) => {
          console.log(err.response, "err");
        });
    },
    getRtuPort() {
      ApiService.query(`${process.env.VUE_APP_ROOT_API_4}/other/rtuport`, {
        params: {
          page: 1,
          limit: 100,
          metrics: this.searchKey,
        },
      })
        .then(({ data }) => {
          this.listRtuPort = data.result.map((rtu) => {
            return {
              id: rtu.rtu_id,
              rtu_name: rtu.rtu_name,
            };
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addMrpLinkFormula() {
      let params = {
        id_formula: this.idFormula,
        description: this.deskripsiFormula,
        multi_rtu_port: this.newListRtuPort.map((rtu) => rtu.id),
      };
      ApiService.post(
        `${process.env.VUE_APP_ROOT_API_4}/formula/mrp_link/add`,
        params
      )
        .then(({ data }) => {
          if (data.code == 200) {
            Swal.fire({
              icon: "success",
              title: "Berhasil...",
              text: "Tersimpan",
            });
            this.newListRtuPort = [];
            this.searchKey = "";
          }
        })
        .catch((e) => {
          if (e.response.status == 500) {
            Swal.fire({
              icon: "error",
              title: "Maaf..",
              text: "Server sedang dalam perbaikan, silahkan coba beberapa saat lagi!",
            });
          }
        });
    },
  },
};
</script>

<style scoped>
.col-form-label {
  font-weight: bold;
}
.required-icon {
  color: #c70000;
}
.form-control {
  background-color: #f4f8fa;
}
.form-search {
  background-color: #ffffff;
}
.card-permission {
  height: 600px;
  overflow: scroll;
}
</style>
