<template>
  <b-modal id="konfigurasi-tangki" size="lg" title="Tambah Konfigurasi Tangki" scrollable hide-footer centered>
    <form>
      <div class="card p-5">
        <b-row class="d-flex align-items-center mb-8" align-v="center" no-gutters>
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

        <b-row class="d-flex align-items-center mb-8" align-v="center" no-gutters>
          <b-col cols="4">
            <h6>
              PANJANG TANGKI&nbsp;<span class="required-icon">*</span>&nbsp;:
            </h6>
          </b-col>
          <b-col cols="5">
            <input type="number" v-model="tank_length" class="form-control form-control-solid" />
          </b-col>
          <b-col class="ml-4">
            <h6>CM</h6>
          </b-col>
        </b-row>

        <!-- {{ this.$store.state.dataKonfig.tank_length }} -->

        <b-row class="d-flex align-items-center mb-8" align-v="center" no-gutters>
          <b-col cols="4">
            <h6>
              TINGGI TANGKI&nbsp;<span class="required-icon">*</span>&nbsp;:
            </h6>
          </b-col>
          <b-col cols="5">
            <input type="number" v-model="tank_height" class="form-control form-control-solid" value="" />
          </b-col>
          <b-col class="ml-4" cols="2">
            <h6>CM</h6>
          </b-col>
        </b-row>

        <b-row class="d-flex align-items-center mb-8" align-v="center" no-gutters>
          <b-col cols="4">
            <h6>
              LEBAR TANGKI&nbsp;<span class="required-icon">*</span>&nbsp;:
            </h6>
          </b-col>
          <b-col cols="5">
            <input type="number" v-model="tank_wide" class="form-control form-control-solid" value="" />
          </b-col>
          <b-col cols="2">
            <h6 class="ml-4">CM</h6>
          </b-col>
        </b-row>

        <b-row class="d-flex align-items-center mb-8" no-gutters align-v="center">
          <b-col cols="4">
            <h6>
              TIPE TANGKI&nbsp;<span class="required-icon">*</span>&nbsp;:
            </h6>
          </b-col>
          <b-col>
            <label>
              <input type="radio" value="harian" v-model="type_tank" checked />
              <span class="font-weight-bold ml-2 mr-5" align-self="center" style="font-size: 14px">HARIAN</span>
            </label>
            <label>
              <input type="radio" value="bulanan" v-model="type_tank" />
              <span class="font-weight-bold ml-2" align-self="center" style="font-size: 14px">BULANAN</span>
            </label>
          </b-col>
        </b-row>

        <b-row class="d-flex align-items-center mb-8" align-v="center" no-gutters>
          <b-col cols="4">
            <h6>
              KAPASITAS TANGKI&nbsp;<span class="required-icon">*</span>&nbsp;:
            </h6>
          </b-col>
          <b-col cols="5">
            <input type="number" v-model="kapasitas" class="form-control form-control-solid" value="" />
          </b-col>
          <b-col cols="2">
            <h6 class="ml-4">LITER</h6>
          </b-col>
        </b-row>
      </div>

      <div class="card p-5 mt-5">
        <b-row class="d-flex align-items-center mb-8" no-gutters align-v="center">
          <b-col cols="4">
            <h6>
              POWER GENSET&nbsp;<span class="required-icon">*</span>&nbsp;:
            </h6>
          </b-col>
          <b-col cols="5">
            <input type="number" v-model="power" class="form-control form-control-solid" value="" />
          </b-col>
          <b-col cols="2">
            <h6 class="ml-4">KVA</h6>
          </b-col>
        </b-row>
        <b-row class="d-flex align-items-center mb-8" no-gutters align-v="center">
          <b-col cols="4">
            <h6>
              FUEL CONSUMPTION/HOUR&nbsp;<span class="required-icon">*</span>&nbsp;:
            </h6>
          </b-col>
          <b-col cols="5">
            <input type="number" v-model="fuel_consumption" class="form-control form-control-solid" value="" />
          </b-col>
          <b-col cols="2">
            <h6 class="ml-4">LITER</h6>
          </b-col>
        </b-row>

        <b-row class="d-flex align-items-center mb-8" no-gutters align-v="center">
          <b-col cols="4">
            <h6>
              HARGA BBM PER LITER&nbsp;<span class="required-icon">*</span>&nbsp;:
            </h6>
          </b-col>
          <b-col>
            <input type="number" v-model="harga" class="form-control form-control-solid" value="" />
          </b-col>
        </b-row>
      </div>

      <b-row>
        <b-col cols="auto" class="ml-auto">
          <button type="submit" class="btn btn-sm btn-success mt-5" @click.prevent="simpanData()">
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

export default {
  name: "Konfigurasi",
  components: {},
  data() {
    return {
      tank_length: "",
      tank_height: "",
      type_tank: "harian",
      tank_wide: "",
      power: "",
      fuel_consumption: "",

      harga: "",
      kapasitas: "",
      selectBentuk: "",

      listTangki: [],
    };
  },
  // props: ["indexKonfigurasi"],

  mounted() {
    this.getListTangki();
  },

  methods: {
    async getListTangki() {
      ApiService.query(`${process.env.VUE_APP_ROOT_API_4}/tank-form`, {})
        .then(({ data }) => {
          this.listTangki = data.result.payload;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    simpanData() {
      // this.$store.commit("konfigurasiTangki/setIndex", this.indexKonfigurasi);
      this.$store.commit("konfigurasiTangki/setTankLength", this.tank_length);
      this.$store.commit("konfigurasiTangki/setTankHeight", this.tank_height);
      this.$store.commit("konfigurasiTangki/setTypeTank", this.type_tank);
      this.$store.commit("konfigurasiTangki/setTankWide", this.tank_wide);
      this.$store.commit("konfigurasiTangki/setDataPower", this.power);
      this.$store.commit(
        "konfigurasiTangki/setFuelConsumption",
        this.fuel_consumption
      );
      this.$bvModal.hide("konfigurasi");
    },
  },
};
</script>
<style scoped>
.required-icon {
  color: red;
}
</style>
