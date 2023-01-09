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
              <th rowspan="2">Lokasi</th>
              <th rowspan="2">ID RTU</th>
              <th rowspan="2">RTU Name</th>
              <th colspan="2">Status Tangki</th>
              <th rowspan="2">BBM Pricing</th>
              <th rowspan="2">Status Sensor</th>
              <th colspan="6">BBM Monitoring</th>
            </tr>
            <tr>
              <th>Tipe</th>
              <th>Kapasitas</th>
              <th>Volume</th>
              <th>Percentage</th>
              <th>Support</th>
              <th>Status</th>
              <th colspan="2">Graph Sisa</th>
            </tr>
          </thead>
          <tbody v-for="(dataTable, i) in getDataBbm" :key="i">
            <tr v-for="(data, index) in dataTable.tanks" :key="index">
              <template v-if="index == 0">
                <td :rowspan="dataTable.tanks.length" class="td-rowspan">
                  {{ i + 1 + (currentPage - 1) * perPage }}
                </td>
                <td :rowspan="dataTable.tanks.length" class="td-rowspan">
                  {{ dataTable.name }}
                </td>
                <td :rowspan="dataTable.tanks.length" class="td-rowspan">
                  {{ dataTable.rtu_id }}
                </td>
                <td :rowspan="dataTable.tanks.length" class="td-rowspan">
                  {{ dataTable.rtu_name }}
                </td>
              </template>
              <td>{{ data.type.toUpperCase() }}</td>
              <td>
                {{
                  data.tank_capacity
                    ? `${Number(data.tank_capacity).toFixed(2)} L`
                    : "-"
                }}
              </td>
              <td>
                {{
                  formulaBBMPrice(
                    data.percentage,
                    data.tank_capacity,
                    dataTable.bbm_price
                  )
                }}
              </td>
              <td>
                <div
                  class="badge badge-sm"
                  :class="[
                    {
                      'badge-success':
                        getStatusSensor(data.volume, data.percentage) ==
                        'Normal',
                    },
                    {
                      'badge-danger':
                        getStatusSensor(data.volume, data.percentage) ==
                        'Sensor Broken',
                    },
                  ]"
                >
                  {{ getStatusSensor(data.volume, data.percentage) }}
                </div>
              </td>
              <td>
                {{ data.volume ? `${Number(data.volume).toFixed(2)} L` : "-" }}
              </td>
              <td>
                <b-progress
                  :value="setPercentage(Number(data.percentage))"
                  variant="success"
                  :max="100"
                  show-progress
                ></b-progress>
              </td>
              <td>
                {{ convertSupportHour(data.support_hour) }}
              </td>
              <td>
                <div
                  class="badge badge-sm text-white"
                  :class="[
                    {
                      'badge-primary':
                        getStatusBbm(data.support_hour) == 'Aman',
                    },
                    {
                      'badge-danger':
                        getStatusBbm(data.support_hour) == 'Bahaya',
                    },
                    {
                      'badge-warning':
                        getStatusBbm(data.support_hour) == 'Waspada',
                    },
                  ]"
                >
                  {{ getStatusBbm(data.support_hour) }}
                </div>
              </td>
              <td>
                <div
                  class="badge badge-sm badge-primary cursor-pointer"
                  @click="
                    showModalGraphic(
                      'liter',
                      dataTable.id_rtu,
                      dataTable.rtu_name
                    )
                  "
                >
                  Liter
                </div>
              </td>
              <td>
                <div
                  class="badge badge-sm badge-primary cursor-pointer"
                  @click="
                    showModalGraphic(
                      'persen',
                      dataTable.id_rtu,
                      dataTable.rtu_name
                    )
                  "
                >
                  Persen
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
              @getData="getDataLocation"
              @changeStatusReady="changeReady"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- modal -->
    <ModalGraphic ref="modal-graphic" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ModalGraphic from "../modals/ModalGraphic";
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
    ModalGraphic,
  },
  computed: {
    ...mapGetters([
      "currentPage",
      "lastPage",
      "perPage",
      "totalData",
      "getDataBbm",
      "getIdWitelBbm",
    ]),
  },
  mounted() {
    this.$store.dispatch("setDefaultPagination");
    this.getDataLocation();
  },
  methods: {
    showModalGraphic(type, id, name) {
      this.$refs["modal-graphic"].openModal(type, id, name);
    },
    async getDataLocation() {
      try {
        const { data } = await ApiService.query(
          `${process.env.VUE_APP_ROOT_API_5}/locations/bbm/monitoring`,
          {
            params: {
              page: 1,
              limit: 10,
              witelId: this.getIdWitelBbm,
            },
          }
        );

        this.$store.dispatch("setCurrentPage", data.result.currentPage);
        this.$store.dispatch("setLastPage", data.result.lastPage);
        this.$store.dispatch("setPerPage", data.result.limit);
        this.$store.dispatch("setTotalData", Number(data.result.totalData));

        const newData = data.result.locations.map((loc) => {
          return {
            id: loc.id_location,
            name: loc.location,
            ...loc,
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
    getStatusSensor(volume, percent) {
      if (volume == null || percent == null) {
        return "Sensor Broken";
      }

      if (volume > 0 && percent <= 100) {
        return "Normal";
      } else {
        return "Sensor Broken";
      }
    },
    setPercentage(percent) {
      return percent < 0 ? 0 : percent;
    },
    convertSupportHour(hour) {
      if (!hour || Number(hour) < 0) {
        return "-";
      }

      if (typeof hour == "string") {
        if (hour.toLowerCase().includes("infinity")) return 0;
      }

      if (hour < 24) {
        return Number(hour).toFixed(2) + " Jam";
      }

      const days = Math.floor(hour / 24);
      const hourLeft = hour - days * 24;
      return days + " Hari " + hourLeft.toFixed(1) + " Jam";
    },
    getStatusBbm(supportHour) {
      if (supportHour >= 12) {
        return "Aman";
      }

      if (supportHour < 5) {
        return "Bahaya";
      }

      return "Waspada";
    },
    changeReady() {
      this.isDataReady = false;
    },
  },
};
</script>

<style scoped>
.td-rowspan {
  vertical-align: middle;
}
</style>
