<template>
  <div class="row">
    <div class="col-md">
      <div class="table-responsive">
        <table
          class="table table-hover table-bordered"
          id="table-bbm-monitoring"
          v-if="isDataReady"
        >
          <thead class="text-center">
            <tr>
              <th rowspan="2">#</th>
              <th rowspan="2">{{ upperCaseFirstChart(getActivePageBbm) }}</th>
              <th rowspan="2">BBM Pricing</th>
              <th colspan="2">Status Tangki</th>
              <th colspan="2">Status Sensor</th>
              <th colspan="3">BBM Monitoring</th>
            </tr>
            <tr>
              <th>Total</th>
              <th>Kapasitas</th>
              <th>Total</th>
              <th>Failed</th>
              <th>Volume</th>
              <th>Percentage</th>
              <th>Alarm</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(data, i) in getDataBbm"
              :key="i"
              class="align-items-center text-center"
            >
              <td>{{ i + 1 + (currentPage - 1) * perPage }}</td>
              <td>
                <div
                  class="text-success cursor-pointer"
                  @click="changeDataId(data.id)"
                >
                  {{ data.name }}
                </div>
              </td>
              <td>
                {{
                  formulaBBMPrice(
                    data.percentage,
                    data.tank_capacity,
                    data.bbm_price
                  )
                }}
              </td>
              <td>{{ data.tank_total }}</td>
              <td>{{ data.tank_capacity }} L</td>
              <td>{{ data.sensor_total }}</td>
              <td>
                <div v-if="Number(data.sensor_fail) == 0">
                  {{ data.sensor_fail }}
                </div>
                <div
                  class="badge badge-sm badge-danger cursor-pointer"
                  @click="openModalSensor('failed', data.id)"
                  v-else
                >
                  {{ data.sensor_fail }}
                </div>
              </td>
              <td>{{ Number(data.volume).toFixed(0) }} L</td>
              <td>
                <b-progress
                  :value="getItemPercentage(data.percentage)"
                  :max="100"
                  show-progress
                ></b-progress>
              </td>
              <td>
                <div v-if="Number(data.alarm) == 0">{{ data.alarm }}</div>
                <div
                  class="badge badge-sm badge-warning text-white cursor-pointer"
                  @click="openModalSensor('alarm', data.id)"
                  v-else
                >
                  {{ data.alarm }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="alert alert-warning mt-15" role="alert" v-else>
          Tunggu sebentar, sedang pengambilan data...
        </div>
        <div class="row">
          <div class="col-md">
            <Pagination
              @getData="getDataTable"
              @changeStatusReady="changeReady"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- modal -->
    <ModalSensor ref="modal-sensor" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ModalSensor from "../modals/ModalSensor";
import ApiService from "@/core/services/api.service";
import Pagination from "@/view/pages/Components/Pagination.vue";

export default {
  data() {
    return {
      isDataReady: false,
    };
  },
  components: {
    Pagination,
    ModalSensor,
  },
  computed: {
    ...mapGetters([
      "currentPage",
      "lastPage",
      "perPage",
      "totalData",
      "getDataBbm",
      "getActivePageBbm",
      "getIdRegionalBbm",
    ]),
  },
  async mounted() {
    await this.$store.dispatch("setDefaultPagination");
    this.getDataTable();
  },
  watch: {
    getActivePageBbm: function (value) {
      this.getDataTable();
    },
  },
  methods: {
    openModalSensor(type, id) {
      this.$refs["modal-sensor"].openModal(type, id);
    },
    getDataTable() {
      if (this.getActivePageBbm == "regional") {
        this.getDataRegional();
      } else if (this.getActivePageBbm == "witel") {
        this.getDataWitel();
      }
    },
    async getDataRegional() {
      try {
        const { data } = await ApiService.query(
          `${process.env.VUE_APP_ROOT_API_5}/regionals/bbm/monitoring`,
          {
            params: {
              page: this.currentPage,
              limit: this.perPage,
            },
          }
        );

        this.$store.dispatch("setCurrentPage", data.result.currentPage);
        this.$store.dispatch("setLastPage", data.result.lastPage);
        this.$store.dispatch(
          "setPerPage",
          this.perPage == "all" ? data.result.regionals.length : this.perPage
        );
        this.$store.dispatch(
          "setTotalData",
          this.perPage == "all"
            ? data.result.regionals.length
            : Number(data.result.totalData)
        );
        const newData = data.result.regionals.map((reg) => {
          return {
            id: reg.id_regional,
            name: reg.regional,
            ...reg,
          };
        });
        this.$store.dispatch("setDataBbm", newData);
        this.isDataReady = true;
      } catch (error) {
        console.log(error);
      }
    },
    async getDataWitel() {
      try {
        const { data } = await ApiService.query(
          `${process.env.VUE_APP_ROOT_API_5}/witels/bbm/monitoring`,
          {
            params: {
              page: this.currentPage,
              limit: this.perPage,
              regionalId: this.getIdRegionalBbm,
            },
          }
        );

        this.$store.dispatch("setCurrentPage", data.result.currentPage);
        this.$store.dispatch("setLastPage", data.result.lastPage);
        this.$store.dispatch(
          "setPerPage",
          this.perPage == "all" ? data.result.witels.length : this.perPage
        );
        this.$store.dispatch(
          "setTotalData",
          this.perPage == "all"
            ? data.result.witels.length
            : Number(data.result.totalData)
        );
        const newData = data.result.witels.map((witel) => {
          return {
            id: witel.id_witel,
            name: witel.witel,
            ...witel,
          };
        });
        this.$store.dispatch("setDataBbm", newData);
        this.isDataReady = true;
      } catch (error) {
        console.log(error);
      }
    },
    formulaBBMPrice(persenTangki, literCapacity, bbmPrice) {
      let persen = 0;
      if (persenTangki >= 0) {
        persen = (100 - persenTangki) / 100;
      }
      const countPrice = literCapacity * bbmPrice ?? 0;
      const persenPrice = countPrice * persen;
      const finalPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(persenPrice);
      return finalPrice;
    },
    getItemPercentage(data) {
      let result = 0;
      if (data > 0) {
        result = Math.floor(data);
      }
      return result;
    },
    changeDataId(id) {
      if (this.getActivePageBbm == "regional") {
        this.$store.dispatch("setIdRegionalBbm", id);
        this.$store.dispatch("setActivePageBbm", "witel");
        this.isDataReady = false;
        return;
      }

      if (this.getActivePageBbm == "witel") {
        this.$store.dispatch("setIdWitelBbm", id);
        this.$store.dispatch("setActivePageBbm", "location");
        return;
      }
    },
    changeReady() {
      this.isDataReady = false;
    },
  },
};
</script>
