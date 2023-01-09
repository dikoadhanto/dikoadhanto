<template>
  <b-modal
    id="detail-bbm-tank"
    title="Details BBM Tank"
    size="lg"
    scrollable
    hide-footer
    centered
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
            <b-form-select
              class="form-control"
              v-model="selectDataRTU"
              disabled
            >
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
            <b-form-select class="form-control" v-model="selectBentuk" disabled>
              <option disabled value="">{{ bbmTankSelected.no_port }}</option>
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
              BENTUK TANGKI&nbsp;<span class="required-icon">*</span>&nbsp;:
            </h6>
          </b-col>
          <b-col cols="8">
            <b-form-select class="form-control" v-model="selectBentuk" disabled>
              <option disabled value="">{{ bbmTankSelected.name }}</option>
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
              v-model="bbmTankSelected.tank_length"
              class="form-control form-control-solid"
              disabled
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
              v-model="bbmTankSelected.tank_height"
              class="form-control form-control-solid"
              disabled
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
              v-model="bbmTankSelected.tank_wide"
              class="form-control form-control-solid"
              disabled
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
              <input
                type="radio"
                value="harian"
                v-model="bbmTankSelected.type"
                disabled
              />
              <span
                class="font-weight-bold ml-2 mr-5"
                align-self="center"
                style="font-size: 14px"
                >HARIAN</span
              >
            </label>
            <label>
              <input
                type="radio"
                value="bulanan"
                v-model="bbmTankSelected.type"
                disabled
              />
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
              v-model="bbmTankSelected.tank_capacity"
              class="form-control form-control-solid"
              disabled
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
              v-model="bbmTankSelected.power"
              class="form-control form-control-solid"
              disabled
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
              v-model="bbmTankSelected.fuel_consumption"
              class="form-control form-control-solid"
              disabled
            />
          </b-col>
          <b-col cols="2">
            <h6 class="ml-4">LITER</h6>
          </b-col>
        </b-row>
      </div>
    </form>
  </b-modal>
</template>

<script>
import ApiService from "@/core/services/api.service";

export default {
  name: "DetailBbmTank",
  props: ["bbmTankSelected"],

  components: {},
  data() {
    return {
      portName: "",
      nameRtu: "",
      selectDataRTU: "",

      tank_length: "",
      tank_height: "",
      type_tank: "harian",
      tank_wide: "",
      power: "",
      fuel_consumption: "",

      kapasitas: "",
      selectBentuk: "",

      listTangki: [],
      listRTU: [],
    };
  },

  mounted() {},

  watch: {
    bbmTankSelected: function () {
      if (this.bbmTankSelected !== null) {
        this.selectDataRTU = this.bbmTankSelected.rtu_name;
        this.getRTU();
      }
    },
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

    getRTU() {
      ApiService.query("http://10.60.185.116:8081/api/v1/other/rtuport", {
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
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.required-icon {
  color: red;
}
</style>
