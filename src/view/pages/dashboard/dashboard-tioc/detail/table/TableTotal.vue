<template>
  <div class="card">
    <div class="card-header">
      <div class="row">
        <!-- left comp -->
        <div class="col-md-5 d-flex align-items-center">
          <div class="btn btn-secondary mr-2" @click="backToHome">
            <b-icon icon="arrow-left" aria-hidden="true"></b-icon>
            Back
          </div>
          <div class="font-weight-bolder">
            Table View Summary {{ locName.toUpperCase() }}
          </div>
        </div>
        <!-- right comp -->
        <div class="col-md-7">
          <CountTimer @getData="getDataTable" />
        </div>
      </div>
    </div>

    <div class="card-body">
      <!-- table -->
      <div class="table-responsive">
        <table class="table table-bordered table-hover table-striped">
          <thead>
            <tr>
              <th colspan="11" class="py-5">{{ locName.toUpperCase() }}</th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th>No</th>
              <th>Regional</th>
              <th>Lokasi</th>
              <th>RTU ID</th>
              <th>Nama RTU</th>
              <th>Port</th>
              <th>Nama Port</th>
              <th>Value</th>
              <th>Satuan</th>
              <th>Status</th>
              <th>Durasi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td>
                <input type="text" class="form-control" />
              </td>
              <td>
                <input type="text" class="form-control" />
              </td>
              <td>
                <input type="text" class="form-control" />
              </td>
              <td>
                <input type="text" class="form-control" />
              </td>
              <td>
                <input type="text" class="form-control" />
              </td>
              <td>
                <input type="text" class="form-control" />
              </td>
              <td>
                <input type="text" class="form-control" />
              </td>
              <td>
                <b-form-select
                  v-model="filterRtu"
                  :options="dataStatusRtu"
                ></b-form-select>
              </td>
              <td>
                <input type="text" class="form-control" />
              </td>
            </tr>
            <tr v-if="dataTable.length == 0">
              <td colspan="11">
                <div class="row text-center">
                  <div class="col">
                    <b-alert variant="warning" show>Data masih kosong</b-alert>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-for="(data, i) in dataTable" :key="i">
              <td>{{ i + 1 + (currentPage - 1) * perPage }}</td>
              <td class="text-nowrap">{{ locName }}</td>
              <td>{{ data.location ? data.location : "-" }}</td>
              <td>{{ data.rtu_id }}</td>
              <td>
                <router-link
                  :to="`detail/table-view/${data.rtu_id}`"
                  class="text-success cursor-pointer"
                >
                  {{ data.rtu_name }}
                </router-link>
              </td>
              <td>
                <div
                  @click="
                    openModal(
                      data.id,
                      data.no_port,
                      data.rtu_name,
                      data.rtu_sname,
                      data.is_formula
                    )
                  "
                  class="text-success cursor-pointer"
                >
                  {{ data.no_port }}
                </div>
              </td>
              <td>{{ data.port_name ? data.port_name : "-" }}</td>
              <td>{{ data.value ? data.value.toFixed(2) : 0 }}</td>
              <td>{{ data.units }}</td>
              <td class="text-center">
                <div
                  class="badge"
                  :class="[
                    { 'badge-success': data.rtu_status == 'normal' },
                    { 'badge-danger': data.rtu_status == 'alert' },
                    { 'badge-dark': data.rtu_status == 'off' },
                  ]"
                >
                  {{ data.rtu_status }}
                </div>
              </td>
              <td>{{ data.duration ? data.duration : "-" }}</td>
            </tr>
          </tbody>
        </table>
        <Pagination @getData="getDataTable" />
      </div>
    </div>

    <!-- modal analog -->
    <ModalAnalog
      portMode="Analog"
      :detailRTU="dataDetailRtu"
      :idSelected="idSelected"
      :isOpen="isOpenAnalog"
      @hideModal="hideModal"
      :isFormula="isFormula"
    />

    <!-- modal digital -->
    <ModalDigital
      portMode="Digital"
      :detailRTU="dataDetailRtu"
      :idSelected="idSelected"
      :isOpen="isOpenDigital"
      @hideModal="hideModal"
      :isFormula="isFormula"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ApiService from "@/core/services/api.service";
import CountTimer from "@/view/pages/Components/CountTimer.vue";
import Pagination from "@/view/pages/Components/Pagination.vue";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

// component
import ModalAnalog from "@/view/pages/dashboard/operational/content-detail/ModalPort.vue";
import ModalDigital from "@/view/pages/dashboard/operational/content-detail/ModalPortDigital.vue";

export default {
  components: {
    CountTimer,
    Pagination,
    ModalAnalog,
    ModalDigital,
  },
  data() {
    return {
      locName: "",
      dataTable: [],
      idRegional: "",
      idWitel: "",

      // filter
      dataStatusRtu: [
        {
          value: "",
          text: "Semua",
        },
        {
          value: "ok",
          text: "OK",
        },
        {
          value: "nok",
          text: "Not OK",
        },
      ],

      filterRtu: "",

      // data for modal
      idSelected: "",
      dataDetailRtu: {},
      isOpenAnalog: false,
      isOpenDigital: false,
      isFormula: 0,
    };
  },
  mounted() {
    this.$store.dispatch("setDefaultPagination");
    this.checkDataProps();
  },
  computed: {
    ...mapGetters([
      "getIdWitelTioc",
      "getLocNameTioc",
      "getIdRegionalTioc",
      "currentPage",
      "lastPage",
      "perPage",
      "totalData",
      "getStatusRtuTioc",
    ]),
  },
  methods: {
    checkDataProps() {
      if (this.getIdRegionalTioc != null) {
        this.idWitel = this.getIdWitelTioc;
        this.locName = this.getLocNameTioc;
        this.idRegional = this.getIdRegionalTioc;
        this.getDataTable();
      } else {
        this.backToHome();
      }
    },
    backToHome() {
      this.$router.push({
        name: "DashboardTioc",
      });
    },
    async getDataTable() {
      try {
        const { data } = await ApiService.query(
          `${process.env.VUE_APP_ROOT_API_5}/dashboard/rtu/port-sensors`,
          {
            params: {
              regionalId: this.idRegional,
              witelId: this.idWitel,
              page: this.currentPage,
              limit: this.perPage,
            },
          }
        );
        this.$store.dispatch("setCurrentPage", data.result.currentPage);
        this.$store.dispatch("setLastPage", data.result.lastPage);
        this.$store.dispatch(
          "setPerPage",
          this.perPage == "all" ? data.result.totalData : data.result.perPage
        );
        this.$store.dispatch("setTotalData", parseInt(data.result.totalData));
        this.dataTable = data.result.payload;
      } catch (error) {
        console.log(error, "error .. ..");
      }
    },
    openModal(id, port, name, sname, isFormula) {
      this.idSelected = id;
      this.dataDetailRtu = {
        name,
        sname,
      };
      this.isFormula = isFormula ?? 0;
      if (port[0] == "A") {
        this.isOpenAnalog = true;
        this.$bvModal.show("modal-detail-port");
      } else {
        this.isOpenDigital = true;
        this.$bvModal.show("modal-detail-port-digital");
      }
    },
    hideModal() {
      this.idSelected = "";
      this.isOpenAnalog = false;
      this.isOpenDigital = false;
    },
  },
};
</script>
