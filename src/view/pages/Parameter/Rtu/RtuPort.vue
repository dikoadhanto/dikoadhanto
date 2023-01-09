<template>
  <div>
    <div class="card">
      <!-- header card -->
      <b-row class="head-wrapper">
        <b-col>
          <div class="button-back-wrapper">
            <button class="btn btn-sm btn-secondary ml-5" @click="backPage()">
              Kembali
            </button>
            <h2 class="ml-10 mb-0">{{ dataRtu.rtu_name }} / PORTS</h2>
          </div>
        </b-col>
      </b-row>

      <hr />

      <!-- table port -->
      <div class="p-10">
        <div v-if="isReady">
          <b-table
            :items="items"
            :fields="fields"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            responsive="sm"
            bordered
            striped
            sort-icon-left
            hover
          >
            <template #top-row>
              <td></td>
              <td>
                <b-form-input v-model="filterIdentifier" />
              </td>
              <td>
                <b-form-input v-model="filterNumberPort" />
              </td>
              <td>
                <b-form-input v-model="filterDescription" />
              </td>
              <td>
                <b-form-input v-model="filterModePort" />
              </td>
              <td>
                <b-form-input v-model="filterUnits" />
              </td>
              <td>
                <b-form-select
                  v-model="filterIsMonitored"
                  :options="options"
                ></b-form-select>
              </td>
              <td>
                <b-form-select
                  v-model="filterTelegramReminder"
                  :options="options"
                ></b-form-select>
              </td>
            </template>
            <template #cell(is_monitored)="data">
              <div class="d-flex justify-content-center">
                <span
                  class="switch switch-sm switch-icon justify-content-start"
                >
                  <label>
                    <input
                      type="checkbox"
                      :checked="data.item.is_monitored == 1"
                      disabled
                    />
                    <span></span>
                  </label>
                </span>
              </div>
            </template>
            <template #cell(telegram_reminder)="data">
              <div class="d-flex justify-content-center">
                <span
                  class="switch switch-sm switch-icon justify-content-start"
                >
                  <label>
                    <input
                      type="checkbox"
                      :checked="data.item.telegram_reminder == 1"
                      disabled
                    />
                    <span></span>
                  </label>
                </span>
              </div>
            </template>
          </b-table>
        </div>

        <b-alert variant="warning" show v-else
          >Tunggu sebentar. Sedang pengambilan data...</b-alert
        >
        <Pagination @getData="getRtuPort" @changeStatusReady="changeReady" />
      </div>
    </div>
    <AddRtuPort :isAdd="isAdd" @closeAdd="closeAdd" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AddRtuPort from "./AddRtuPort.vue";
import ApiService from "@/core/services/api.service";
import Pagination from "@/view/pages/Components/Pagination.vue";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

export default {
  name: "RtuPort",
  components: {
    AddRtuPort,
    Pagination,
  },
  props: ["rtuName"],
  data() {
    return {
      isReady: false,
      isAdd: false,
      isSelectAll: false,
      detailRtu: null,
      dataRtuPort: "",
      dataRtu: "",
      dataChoose: [],

      // filter
      filterIdentifier: "",
      filterNumberPort: "",
      filterDescription: "",
      filterModePort: "",
      filterUnits: "",
      filterIsMonitored: "",
      filterTelegramReminder: "",

      options: [
        { value: "", text: "Semua" },
        { value: 1, text: "True" },
        { value: 0, text: "False" },
      ],

      // table bootstrap
      fields: [
        { key: "index", label: "#", sortable: true },
        { key: "identifier", label: "TIPE PORT", sortable: true },
        { key: "no_port", label: "KODE PORT", sortable: true },
        { key: "description", label: "DESKRIPSI", sortable: true },
        { key: "mode", label: "MODE PORT", sortable: true },
        { key: "units", label: "UNITS", sortable: true },
        {
          key: "is_monitored",
          label: "STATUS MONITORING",
          sortable: true,
        },
        {
          key: "telegram_reminder",
          label: "TELEGRAM REMINDER",
          sortable: true,
        },
      ],
      items: [],
      sortBy: "",
      sortDesc: false,
    };
  },
  computed: {
    ...mapGetters(["currentPage", "lastPage", "perPage", "totalData"]),
  },
  created() {
    this.idRtu = this.$route.params.id;
  },
  mounted() {
    this.$store.dispatch("setDefaultPagination");
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Parameter", subtitle: "RTU Management" },
    ]);
    this.getRtu();
    this.getRtuPort();
  },
  watch: {
    filterIdentifier() {
      this.$store.dispatch("setDefaultPagination");
      this.getRtuPort();
    },
    filterNumberPort() {
      this.$store.dispatch("setDefaultPagination");
      this.getRtuPort();
    },
    filterDescription() {
      this.$store.dispatch("setDefaultPagination");
      this.getRtuPort();
    },
    filterModePort() {
      this.$store.dispatch("setDefaultPagination");
      this.getRtuPort();
    },
    filterUnits() {
      this.$store.dispatch("setDefaultPagination");
      this.getRtuPort();
    },
    filterIsMonitored() {
      this.$store.dispatch("setDefaultPagination");
      this.getRtuPort();
    },
    filterTelegramReminder() {
      this.$store.dispatch("setDefaultPagination");
      this.getRtuPort();
    },
  },
  methods: {
    getRtu() {
      ApiService.query(
        `${process.env.VUE_APP_ROOT_API_4}/rtu/port/${this.idRtu}`
      ).then(({ data }) => {
        this.dataRtu = data.result;
      });
    },
    getRtuPort() {
      ApiService.query(
        `${process.env.VUE_APP_ROOT_API_4}/rtu/listPort/${this.idRtu}`,
        {
          params: {
            page: this.currentPage,
            limit: this.perPage,
            identifier: this.filterIdentifier,
            no_port: this.filterNumberPort,
            description: this.filterDescription,
            mode_port: this.filterModePort,
            units: this.filterUnits,
            is_monitored: this.filterIsMonitored,
            telegram_reminder: this.filterTelegramReminder,
          },
        }
      )
        .then(({ data }) => {
          this.items = data.result.payload.map((data, index) => ({
            index:
              this.currentPage == 1
                ? index + 1
                : index + 1 + (this.currentPage - 1) * this.perPage,
            ...data,
          }));
          this.detailRtu = data.result.payload;
          this.dataRtuPort = data.result.payload;
          this.$store.dispatch("setCurrentPage", data.result.currentPage);
          this.$store.dispatch("setLastPage", data.result.lastPage);
          this.$store.dispatch("setPerPage", data.result.perPage);
          this.$store.dispatch("setTotalData", data.result.totalData);
          this.isReady = true;
        })
        .catch((error) => {
          console.log(error, "error");
        });
    },
    changeReady() {
      this.isReady = false;
    },
    selectAllPort() {
      if (this.isSelectAll) {
        this.dataChoose = this.dataRtuPort.info_port.map(
          (item) => item.id_rtu_port
        );
      } else {
        this.dataChoose = [];
      }
    },
    showModalAdd(data) {
      this.$bvModal.show(data);
      this.isAdd = true;
    },
    closeAdd() {
      this.isAdd = false;
    },
    backPage() {
      this.$router.push({ name: "TableContainnerRtu2" });
    },
  },
};
</script>

<style scoped>
.button-back-wrapper {
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 0px;
}

.button-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-right: 20px;
}

.switch input:empty ~ span:before {
  background-color: #afb2c7;
}

.table-port {
  white-space: nowrap;
}
</style>
