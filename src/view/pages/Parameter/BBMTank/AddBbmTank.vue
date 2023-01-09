<template>
  <b-modal
    id="add-bbm-tank"
    size="lg"
    title="Tambah Konfigurasi Tangki"
    scrollable
    hide-footer
    centered
  >
    <form @submit.prevent="addBbmTank">
      <div class="card p-5 mb-5">
        <b-row
          class="d-flex align-items-center mb-8"
          no-gutters
          align-v="center"
        >
          <b-col cols="4">
            <h6>RTU PORT&nbsp;<span class="required-icon">*</span>&nbsp;:</h6>
          </b-col>
          <b-col>
            <b-form-select class="form-control" v-model="portSelected">
              <option disabled value="">Pilih RTU PORT</option>
              <option
                v-for="(item, i) in listRTUPORT"
                :key="i"
                :value="item.id"
              >
                {{ item.no_port }}
              </option>
            </b-form-select>
          </b-col>
        </b-row>
      </div>
      <div class="card p-5">
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
            @click.prevent="addBbmTank()"
          >
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

export default {
  name: "AddBbmTank",
  emits: ["getDataBBMTank"],

  data() {
    return {
      portName: "",
      nameRtu: "",

      tank_length: "",
      tank_height: "",
      type_tank: "harian",
      tank_wide: "",
      power: "",
      fuel_consumption: "",

      kapasitas: "",
      selectBentuk: "",

      listTangki: [],
      listRTUPORT: [],
      portSelected: "",
    };
  },

  mounted() {
    this.getListTangki();
    this.getRTUPort();
  },

  methods: {
    getListTangki() {
      ApiService.query(`${process.env.VUE_APP_ROOT_API_4}/tank-form`, {})
        .then(({ data }) => {
          this.listTangki = data.result.payload;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getRTUPort() {
      ApiService.get(
        `${process.env.VUE_APP_ROOT_API_4}/other/rtuport?page=1&limit=100`,
        {}
      )
        .then(({ data }) => {
          this.listRTUPORT = data.result;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addBbmTank() {
      if (this.nameRtu === "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Nama Formula tidak boleh kosong!",
        });
      } else if (this.portName === "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Formula tidak boleh kosong!",
        });
      } else if (this.selectBentuk === "") {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Delay tidak boleh kosong!",
        });
      } else if (this.tank_length === "") {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Delay tidak boleh kosong!",
        });
      } else if (this.tank_height === "") {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Delay tidak boleh kosong!",
        });
      } else if (this.tank_wide === "") {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Delay tidak boleh kosong!",
        });
      } else if (this.kapasitas === "") {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Delay tidak boleh kosong!",
        });
      } else if (this.type_tank === "") {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Delay tidak boleh kosong!",
        });
      } else if (this.power === "") {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Delay tidak boleh kosong!",
        });
      } else if (this.fuel_consumption === "") {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Delay tidak boleh kosong!",
        });
      } else {
        let dataBbmTank = {
          portName: this.portName,
          nameRtu: this.nameRtu,
          tank_length: this.tank_length,
          tank_height: this.tank_height,
          type_tank: this.type_tank,
          tank_wide: this.tank_wide,
          power: this.power,
          fuel_consumption: this.fuel_consumption,
          kapasitas: this.kapasitas,
          bentuk: this.selectBentuk,
        };

        ApiService.post(
          `${process.env.VUE_APP_ROOT_API_4}/bbm-tank/add`,
          dataBbmTank
        )
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "Data berhasil ditambahkan",
            }).then((result) => {
              if (result.isConfirmed) {
                this.$bvModal.hide("add-bbm-tank");
                this.namaFormula = "";
                this.identifier = "";
                this.deskripsi = "";
                this.formula = "";
                this.delay = "";
                this.units = "";
                this.$emit("getDataBBMTank");
              }
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>
<style scoped>
.required-icon {
  color: red;
}
</style>
