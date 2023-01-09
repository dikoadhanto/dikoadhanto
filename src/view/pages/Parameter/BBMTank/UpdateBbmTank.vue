<template>
  <b-modal
    id="update-bbm-tank"
    title="Update BBM Tank"
    size="lg"
    scrollable
    hide-footer
    centered
    @close="closeUpdate"
    @cancel="closeUpdate"
    @hidden="closeUpdate"
  >
    <form>
      <div class="card p-5">
        <b-row
          class="d-flex align-items-center mb-8"
          no-gutters
          align-v="center"
        >
          <b-col cols="4">
            <h6>Nama RTU&nbsp;<span class="required-icon">*</span>&nbsp;:</h6>
          </b-col>
          <b-col cols="8">
            <b-form-select class="form-control" v-model="selectDataRTU">
              <option disabled value="">Pilih NAME RTU</option>
              <option
                v-for="(item, i) in listRTU"
                :key="i"
                :value="item.rtu_name"
              >
                {{ item.rtu_name }}
              </option>
            </b-form-select>
          </b-col>
        </b-row>

        <b-row
          class="d-flex align-items-center mb-8"
          no-gutters
          align-v="center"
        >
          <b-col cols="4">
            <h6>RTU PORT&nbsp;<span class="required-icon">*</span>&nbsp;:</h6>
          </b-col>
          <b-col>
            <b-form-select class="form-control" v-model="selectDataPort">
              <option disabled value="">Pilih RTU PORT</option>
              <option
                v-for="(item, i) in listPort"
                :key="i"
                :value="item.id_rtu_port"
              >
                {{ item.no_port }}
              </option>
            </b-form-select>

            <!-- <treeselect
              noOptionsText="Harap pilih RTU terlebih dahulu"
              noResultsText="Port tidak ditemukan"
              :options="listPort"
              :multiple="false"
              :clear-on-select="true"
              placeholder="Pilih RTU PORT"
              :normalizer="listPort.no_port"
              :value="listPort"
              v-model="selectDataPort"
            > -->
            <!-- </treeselect> -->
          </b-col>
        </b-row>

        <b-row
          class="d-flex align-items-center mb-8"
          align-v="center"
          no-gutters
        >
          <b-col cols="4">
            <h6>
              BENTUK TANGKI&nbsp;<span class="required-icon">*</span>&nbsp;:
            </h6>
          </b-col>
          <b-col cols="8">
            <b-form-select class="form-control" v-model="selectBentuk">
              <option disabled value="">Pilih Bentuk Tangki</option>
              <option v-for="(data, i) in listTangki" :key="i" :value="data.id">
                {{ data.name }}
              </option>
            </b-form-select>
          </b-col>
        </b-row>

        <b-row
          class="d-flex align-items-center mb-8"
          align-v="center"
          no-gutters
        >
          <b-col cols="4">
            <h6>
              PANJANG TANGKI&nbsp;<span class="required-icon">*</span>&nbsp;:
            </h6>
          </b-col>
          <b-col cols="5">
            <input
              type="number"
              v-model="tank_length"
              class="form-control form-control-solid"
            />
          </b-col>
          <b-col class="ml-4">
            <h6>CM</h6>
          </b-col>
        </b-row>

        <!-- {{ this.$store.state.dataKonfig.tank_length }} -->

        <b-row
          class="d-flex align-items-center mb-8"
          align-v="center"
          no-gutters
        >
          <b-col cols="4">
            <h6>
              TINGGI TANGKI&nbsp;<span class="required-icon">*</span>&nbsp;:
            </h6>
          </b-col>
          <b-col cols="5">
            <input
              type="number"
              v-model="tank_height"
              class="form-control form-control-solid"
              value=""
            />
          </b-col>
          <b-col class="ml-4" cols="2">
            <h6>CM</h6>
          </b-col>
        </b-row>

        <b-row
          class="d-flex align-items-center mb-8"
          align-v="center"
          no-gutters
        >
          <b-col cols="4">
            <h6>
              LEBAR TANGKI&nbsp;<span class="required-icon">*</span>&nbsp;:
            </h6>
          </b-col>
          <b-col cols="5">
            <input
              type="number"
              v-model="tank_wide"
              class="form-control form-control-solid"
              value=""
            />
          </b-col>
          <b-col cols="2">
            <h6 class="ml-4">CM</h6>
          </b-col>
        </b-row>

        <b-row
          class="d-flex align-items-center mb-8"
          no-gutters
          align-v="center"
        >
          <b-col cols="4">
            <h6>
              TIPE TANGKI&nbsp;<span class="required-icon">*</span>&nbsp;:
            </h6>
          </b-col>
          <b-col>
            <label>
              <input type="radio" value="harian" v-model="type_tank" />
              <span
                class="font-weight-bold ml-2 mr-5"
                align-self="center"
                style="font-size: 14px"
                >HARIAN</span
              >
            </label>
            <label>
              <input type="radio" value="bulanan" v-model="type_tank" />
              <span
                class="font-weight-bold ml-2"
                align-self="center"
                style="font-size: 14px"
                >BULANAN</span
              >
            </label>
          </b-col>
        </b-row>

        <b-row
          class="d-flex align-items-center mb-8"
          align-v="center"
          no-gutters
        >
          <b-col cols="4">
            <h6>
              KAPASITAS TANGKI&nbsp;<span class="required-icon">*</span>&nbsp;:
            </h6>
          </b-col>
          <b-col cols="5">
            <input
              type="number"
              v-model="kapasitas"
              class="form-control form-control-solid"
              value=""
            />
          </b-col>
          <b-col cols="2">
            <h6 class="ml-4">LITER</h6>
          </b-col>
        </b-row>
      </div>

      <div class="card p-5 mt-5">
        <b-row
          class="d-flex align-items-center mb-8"
          no-gutters
          align-v="center"
        >
          <b-col cols="4">
            <h6>
              POWER GENSET&nbsp;<span class="required-icon">*</span>&nbsp;:
            </h6>
          </b-col>
          <b-col cols="5">
            <input
              type="number"
              v-model="power"
              class="form-control form-control-solid"
              value=""
            />
          </b-col>
          <b-col cols="2">
            <h6 class="ml-4">KVA</h6>
          </b-col>
        </b-row>
        <b-row
          class="d-flex align-items-center mb-8"
          no-gutters
          align-v="center"
        >
          <b-col cols="4">
            <h6>
              FUEL CONSUMPTION/HOUR&nbsp;<span class="required-icon">*</span
              >&nbsp;:
            </h6>
          </b-col>
          <b-col cols="5">
            <input
              type="number"
              v-model="fuel_consumption"
              class="form-control form-control-solid"
              value=""
            />
          </b-col>
          <b-col cols="2">
            <h6 class="ml-4">LITER</h6>
          </b-col>
        </b-row>
      </div>

      <b-row>
        <b-col cols="auto" class="ml-auto">
          <button
            type="submit"
            class="btn btn-sm btn-success mt-5"
            @click.prevent="updateBbmTank()"
          >
            <!-- @click.prevent="submitFrom" -->

            Simpan &nbsp;
            <span><i class="fas fa-chevron-right icon-sm"></i></span>
          </button>
        </b-col>
      </b-row>
    </form>
  </b-modal>
</template>

<script>
import ApiService from "@/core/services/api.service";
import Swal from "sweetalert2";
// import "@riophae/vue-treeselect/dist/vue-treeselect.css";
// import Treeselect from "@riophae/vue-treeselect";

export default {
  name: "UpdateBbmTank",
  // components: {
  //   Treeselect,
  // },
  data() {
    return {
      tank_length: "",
      tank_height: "",
      type_tank: "",
      tank_wide: "",
      power: "",
      fuel_consumption: "",

      kapasitas: "",
      selectBentuk: "",

      listTangki: [],

      listRTU: [],
      listPort: [],

      selectDataRTU: "",
      selectDataPort: "",
    };
  },

  props: ["idSelected"],
  emits: ["getDataBBMTank", "hideUpdateBbm"],

  watch: {
    idSelected: function () {
      if (this.idSelected !== null) {
        this.getRTU();
        this.getDataBbmTank();
        this.getListTangki();
      }
    },
    selectDataRTU() {
      this.getPort();
    },
  },

  methods: {
    updateBbmTank() {
      if (this.selectDataPort == "" || this.selectDataPort == null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Anda harus mengisi RTU PORT!!",
        });
      } else if (this.selectBentuk == "" && this.selectBentuk == null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Anda harus pilih bentuk tangki terlebih dahulu!!",
        });
      } else if (this.tank_length == "" && this.tank_length == null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Anda harus mengisi panjang tangki terlebih dahulu!!",
        });
      } else if (this.tank_height == "" && this.tank_height == null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Anda harus mengisi tinggi tangki terlebih dahulu!!",
        });
      } else if (this.tank_wide == "" && this.tank_wide == null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Anda harus mengisi lebar tangki terlebih dahulu!!",
        });
      } else if (this.type_tank == "" && this.type_tank == null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Anda harus mengisi tipe tangki terlebih dahulu!!",
        });
      } else if (this.kapasitas == "" && this.kapasitas == null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Anda harus mengisi kapasitas tangki terlebih dahulu!!",
        });
      } else if (this.power == "" && this.power == null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Anda harus mengisi power genset terlebih dahulu!!",
        });
      } else if (this.fuel_consumption == "" && this.fuel_consumption == null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Anda harus mengisi fuel consumption terlebih dahulu!!",
        });
      } else {
        let data = {
          tank_length: this.tank_length,
          tank_height: this.tank_height,
          tank_wide: this.tank_wide,
          type_tank: this.type_tank,
          id_m_tank_form: this.selectBentuk,
          id_rtu_port: this.selectDataPort,
          tank_capacity: this.kapasitas,
          power: this.power,
          fuel_consumption: this.fuel_consumption,
        };
        ApiService.patch(
          `${process.env.VUE_APP_ROOT_API_4}/bbm-tank/edit/${this.idSelected}`,
          data
        )
          .then(({ data }) => {
            if (data.code == 200) {
              Swal.fire({
                icon: "success",
                title: "Berhasil...",
                text: "Anda berhasil mengupdate BBM Tank!",
              });
              this.tank_length = "";
              this.tank_height = "";
              this.type_tank = "";
              this.tank_wide = "";
              this.power = "";
              this.fuel_consumption = "";
              this.kapasitas = "";
              this.selectBentuk = "";
              this.listTangki = [];
              this.listRTU = [];
              this.listPort = [];
              this.selectDataPort = "";
              this.$emit("getDataBBMTank");
              this.closeUpdate();
            }
          })
          .catch((e) => {
            if (e.response.data.code == 500) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Server sedang dalam perbaikan. Mohon menunggu beberapa saat lagi",
              });
            }
          });
      }
    },
    getListTangki() {
      ApiService.query(`${process.env.VUE_APP_ROOT_API_4}/tank-form`)
        .then(({ data }) => {
          this.listTangki = data.result.payload;
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message,
          });
        });
    },

    getRTU() {
      ApiService.query(`${process.env.VUE_APP_ROOT_API_4}/other/rtuport`, {
        params: {
          page: 1,
          limit: "",
          device_name: "BBM",
        },
      })
        .then(({ data }) => {
          this.listRTU = data.result;
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message,
          });
        });
    },

    getPort() {
      ApiService.query(`${process.env.VUE_APP_ROOT_API_4}/other/rtuport`, {
        params: {
          page: 1,
          limit: 100,
          device_name: "BBM",
          name_rtu: this.selectDataRTU,
        },
      })
        .then(({ data }) => {
          this.listPort = data.result[0].port;
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message,
          });
        });
    },

    getDataBbmTank() {
      ApiService.query(
        `${process.env.VUE_APP_ROOT_API_4}/bbm-tank/${this.idSelected}`
      )
        .then(({ data }) => {
          this.tank_length = data.result.tank_length;
          this.tank_height = data.result.tank_height;
          this.type_tank = data.result.type;
          this.tank_wide = data.result.tank_wide;
          this.power = data.result.power;
          this.fuel_consumption = data.result.fuel_consumption;
          this.kapasitas = data.result.tank_capacity;
          this.selectBentuk = this.getIdBentuk(data.result.id_m_tank_form);
          this.selectDataPort = data.result.id_rtu_port;
          this.selectDataRTU = data.result.rtu_name;
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message,
          });
        });
    },

    getIdBentuk(id) {
      let output = this.listTangki.filter((data) => data.id == id);
      return output[0].id;
    },

    closeUpdate() {
      this.$emit("hideUpdateBbm");
    },
  },
};
</script>

<style scoped>
.required-icon {
  color: red;
}
</style>
