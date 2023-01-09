<template>
  <b-modal
    id="modal-sensor"
    size="xl"
    @cancel="closeModal"
    @close="closeModal"
    @hidden="closeModal"
    scrollable
    hide-footer
  >
    <template #modal-title> Detail {{ sensorType }} Sensor BBM </template>
    <div class="row align-items-center mb-6">
      <div class="col-md">
        <div class="d-flex">
          Tipe Tangki :
          <b-form-radio
            name="radio-time"
            value="harian"
            class="mx-3 cursor-pointer"
            v-model="tangkiType"
            @change="getDataTable"
            ><div class="cursor-pointer">Harian</div></b-form-radio
          >
          <b-form-radio
            name="radio-time"
            @change="getDataTable"
            v-model="tangkiType"
            value="bulanan"
            ><div class="cursor-pointer">Bulanan</div></b-form-radio
          >
        </div>
      </div>
      <div class="col-md-4 justify-content-end">
        <input
          type="text"
          class="form-control"
          placeholder="Search..."
          v-model="searchData"
          @keyup="getDataTable"
        />
      </div>
    </div>

    <!-- table -->
    <div class="table-responsive">
      <table
        class="table table-bordered table-hover text-center"
        v-if="isDataReady"
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Witel</th>
            <th>Lokasi</th>
            <th>Tipe Tangki</th>
            <th>Kapasitas Tangki</th>
            <th>Tipe Sensor</th>
            <th>Start Alarm</th>
            <th>Duration</th>
            <th>PIC</th>
            <th colspan="2">Graph</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, i) in dataTables" :key="i">
            <td>{{ i + 1 + (currentPage - 1) * perPage }}</td>
            <td>{{ data.witel }}</td>
            <td>{{ data.location }}</td>
            <td>{{ upperCaseFirstChart(data.type) }}</td>
            <td>{{ data.tank_capacity }} L</td>
            <td>{{ data.sensor_type }}</td>
            <td>{{ setStartAlarm(data.start_alarm) }}</td>
            <td>{{ setDuration(data.duration) }}</td>
            <td>{{ data.pic_location }}</td>
            <td>
              <div
                class="badge badge-sm badge-primary cursor-pointer"
                @click="showModalGraphic('liter', data)"
              >
                Liter
              </div>
            </td>
            <td>
              <div
                class="badge badge-sm badge-primary cursor-pointer"
                @click="showModalGraphic('persen', data)"
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
            @getData="getDataTable"
            @changeStatusReady="changeReady"
          />
        </div>
      </div>
    </div>

    <!-- modal -->
    <ModalGraphic ref="modal-graphic" />
  </b-modal>
</template>

<script>
import { mapGetters } from "vuex";
import ModalGraphic from "./ModalGraphic";
import TimeHelper from "@/core/helpers/timeHelper";
import TextHelper from "@/core/helpers/textHelper";
import ApiService from "@/core/services/api.service";
import Pagination from "@/view/pages/Components/Pagination.vue";

export default {
  data() {
    return {
      isDataReady: false,
      sensorType: "",
      idDataTable: "",
      dataTables: [],
      searchData: "",
      tangkiType: "harian",
    };
  },
  computed: {
    ...mapGetters({
      activePage: "getActivePageBbm",
      currentPage: "currentPage",
      lastPage: "lastPage",
      perPage: "perPage",
      totalData: "totalData",
    }),
  },
  components: {
    Pagination,
    ModalGraphic,
  },
  methods: {
    async openModal(type, id) {
      this.sensorType = this.upperCaseFirstChart(type);
      this.idDataTable = id;
      await this.$store.dispatch("setDefaultPagination");
      this.getDataTable();
      this.$bvModal.show("modal-sensor");
    },
    async getDataTable() {
      const params = await this.setDataParams();

      const endpoint = await this.setEndpoint();

      try {
        const { data } = await ApiService.query(
          `${process.env.VUE_APP_ROOT_API_5}/bbm-monitoring/${endpoint}`,
          {
            params,
          }
        );

        this.$store.dispatch("setCurrentPage", data.result.currentPage);
        this.$store.dispatch("setLastPage", data.result.lastPage);
        this.$store.dispatch("setPerPage", data.result.limit);
        this.$store.dispatch("setTotalData", Number(data.result.totalData));
        this.dataTables = data.result.datas;
      } catch (error) {
        console.log(error);
      } finally {
        this.isDataReady = true;
      }
    },
    setDataParams() {
      let params = {
        limit: this.perPage,
        page: this.currentPage,
        search: this.searchData,
        type: this.tangkiType,
      };

      if (this.activePage == "regional") {
        params.regionalId = this.idDataTable;
      }

      if (this.activePage == "witel") {
        params.witelId = this.idDataTable;
      }

      return params;
    },
    setEndpoint() {
      let endpoint = "";

      if (this.sensorType.toLowerCase() == "alarm") {
        endpoint = "alarm";
      } else {
        endpoint = "sensor-fail";
      }

      return endpoint;
    },
    setStartAlarm(epoch) {
      return TextHelper.formatDate("DD-MMM-YY HH:mm:ss", epoch);
    },
    setDuration(time) {
      return TimeHelper.changeDurationTime(time);
    },
    showModalGraphic(type, data) {
      let id = data.id_m_rtu_formula;
      if (this.type == "alarm") {
        id = data.id_m_rtu_formula_vol;
      }
      const name = data.rtu_sname;
      const capacity = data.tank_capacity;
      this.$refs["modal-graphic"].openModal(type, id, name, capacity);
    },
    changeReady() {
      this.isDataReady = false;
    },
    closeModal() {
      this.sensorType = "";
      this.isDataReady = false;
      this.tangkiType = "harian";
      this.$bvModal.hide("modal-sensor");
    },
  },
};
</script>
