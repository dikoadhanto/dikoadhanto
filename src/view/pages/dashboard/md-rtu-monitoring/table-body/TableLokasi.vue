<template>
  <section>
    <div class="table-responsive">
      <table
        class="table table-bordered table-striped"
        v-if="isReady"
        id="table-summary"
        border="1"
      >
        <thead>
          <tr>
            <th>#</th>
            <th>SNAME</th>
            <th>NAMA RTU</th>
            <th>DESKRIPSI RTU</th>
            <th>PORT</th>
            <th>IDENTIFIER</th>
            <th>METRICS</th>
            <th>UNIT</th>
            <th>SEVERITY</th>
            <th>HISTORY</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>
              <b-form-input
                size="sm"
                v-model="filterSname"
                placeholder="Search"
                @keyup="getAllRtu"
              ></b-form-input>
            </td>
            <td>
              <b-form-input
                size="sm"
                v-model="filterName"
                placeholder="Search"
                @keyup="getAllRtu"
              ></b-form-input>
            </td>
            <td>
              <b-form-input
                size="sm"
                v-model="filterDeskripsi"
                placeholder="Search"
                @keyup="getAllRtu"
              ></b-form-input>
            </td>
            <td>
              <b-form-input
                size="sm"
                v-model="filterPort"
                placeholder="Search"
                @keyup="getAllRtu"
              ></b-form-input>
            </td>
            <td>
              <b-form-input
                size="sm"
                v-model="filterIdentifier"
                placeholder="Search"
                @keyup="getAllRtu"
              ></b-form-input>
            </td>
            <td></td>
            <td>
              <b-form-input
                size="sm"
                v-model="filterUnits"
                placeholder="Search"
                @keyup="getAllRtu"
              ></b-form-input>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr v-for="(item, i) in listPortSensor" :key="i">
            <td v-if="currentPage == 1">
              <i
                class="fas fa-minus-circle text-success icon-detail"
                @click="showDetail(item.id)"
                v-if="showSecondaryDataId == item.id"
              ></i>
              <i
                class="fas fa-plus-circle text-success icon-detail"
                @click="showDetail(item.id)"
                v-else
              ></i>
              <div class="card-detail" v-if="showSecondaryDataId == item.id">
                <div class="card pt-4 pl-4 pr-10">
                  <ul class="list-detail text-left">
                    <li>
                      CREATED AT :
                      <span class="ml-4">{{
                        getDataReturn(item.created_at)
                      }}</span>
                    </li>
                    <li>
                      CREATED BY :
                      <span class="ml-4">{{
                        item.created_by ? item.created_by : "-"
                      }}</span>
                    </li>
                    <li>
                      UPDATED AT :
                      <span class="ml-4">{{
                        getDataReturn(item.updated_at)
                      }}</span>
                    </li>
                    <li>
                      UPDATED BY :
                      <span class="ml-4">{{
                        item.updated_by ? item.updated_by : "-"
                      }}</span>
                    </li>
                  </ul>
                </div>
              </div>
              {{ i + 1 }}
            </td>

            <td v-else>
              <div class="card-detail" v-if="showSecondaryDataId == item.id">
                <div class="card pt-4 pl-4 pr-10">
                  <ul class="list-detail text-left">
                    <li>
                      CREATED AT :
                      <span class="ml-4">{{
                        getDataReturn(item.created_at)
                      }}</span>
                    </li>
                    <li>
                      CREATED BY :
                      <span class="ml-4">{{
                        item.created_by ? item.created_by : "-"
                      }}</span>
                    </li>
                    <li>
                      UPDATED AT :
                      <span class="ml-4">{{
                        getDataReturn(item.updated_at)
                      }}</span>
                    </li>
                    <li>
                      UPDATED BY :
                      <span class="ml-4">{{
                        item.updated_by ? item.updated_by : "-"
                      }}</span>
                    </li>
                  </ul>
                </div>
              </div>
              {{ i + 1 + (currentPage - 1) * perPage }}
            </td>

            <td>{{ item.rtu_sname }}</td>
            <td class="clickable" @click="goToDetailRtu(item.id)">
              {{ item.rtu_name }}
            </td>
            <td>{{ item.deskripsi }}</td>
            <td>{{ item.no_port }}</td>
            <td>
              {{ item.identifier }}
            </td>
            <td>{{ item.value }}</td>
            <td>{{ item.units }}</td>
            <td>
              <b-badge
                :style="{
                  'background-color':
                    item.treshold.length != 0
                      ? item.treshold[0].colors
                      : '#5DCD89',
                }"
                class="p-2 fw-bold text-white"
                >{{
                  item.treshold.length != 0
                    ? item.treshold[0].severity != null
                      ? item.treshold[0].severity
                      : "Normal"
                    : "Normal"
                }}</b-badge
              >
            </td>
            <td>
              <div
                class="badge badge-sm badge-success"
                style="cursor: pointer"
                @click="openModal(item.id, item.no_port)"
              >
                History
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="alert alert-warning mt-15" role="alert" v-else>
        Tunggu sebentar, sedang pengambilan data...
      </div>
      <Pagination @getData="getAllRtu" @changeStatusReady="changeReady" />
    </div>

    <!-- modal detail -->
    <ModalAnalog
      portMode="Analog"
      :idSelected="idSelected"
      :isOpen="isOpen"
      @hideModal="hideModal"
    />
    <ModalDigital
      portMode="Digital"
      :idSelected="idSelected"
      :isOpen="isOpen"
      @hideModal="hideModal"
    />
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import ApiService from "@/core/services/api.service";
import textHelper from "@/core/helpers/textHelper.js";
import Pagination from "@/view/pages/Components/Pagination.vue";
import ModalAnalog from "../../operational/content-detail/ModalPort.vue";
import ModalDigital from "../../operational/content-detail/ModalPortDigital.vue";

export default {
  components: {
    ModalAnalog,
    ModalDigital,
    Pagination,
  },
  computed: {
    ...mapGetters([
      "getPageMdRtu",
      "getIdWitelMdRtu",
      "getIdRegionalMdRtu",
      "getIdLocationMdRtu",
      "getIdTagsMdRtu",
      "currentPage",
      "lastPage",
      "perPage",
      "totalData",
    ]),
  },
  data() {
    return {
      rtuName: "",
      showSecondaryDataId: null,

      isReady: false,
      isOpen: false,

      filterPort: "",
      filterName: "",
      filterSname: "",
      filterDeskripsi: "",
      filterIdentifier: "",
      filterUnits: "",

      idSelected: "",
      listSeverity: [],

      listPortSensor: [],
    };
  },
  mounted() {
    this.$store.dispatch("setDefaultPagination");
    this.getColorSeverity();
    this.getAllRtu();
  },
  watch: {
    filterName() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getAllRtu();
    },
    filterDeskripsi() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getAllRtu();
    },
    filterPort() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getAllRtu();
    },
    filterIdentifier() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getAllRtu();
    },
    filterUnits() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getAllRtu();
    },
    getPageMdRtu() {
      if (this.getPageMdRtu == "location") {
        this.getAllRtu();
      }
    },
  },
  methods: {
    goToDetailRtu(id) {
      this.$router.push({
        name: "Detail RTU",
        params: { idRtu: id },
      });
    },
    getAllRtu() {
      ApiService.query(
        `${process.env.VUE_APP_ROOT_API_5}/dashboard/rtu/port-sensors`,
        {
          params: {
            page: this.currentPage,
            limit: this.perPage,
            regionalId:
              this.getIdRegionalMdRtu == null || this.getIdRegionalMdRtu == ""
                ? ""
                : this.getIdRegionalMdRtu.join("&regionalId="),
            witelId:
              this.getIdWitelMdRtu == null || this.getIdWitelMdRtu == ""
                ? ""
                : this.getIdWitelMdRtu.join("&witelId="),
            searchRtuName: this.filterName,
            searchUnits: this.filterUnits,
            searchIdentifier: this.filterIdentifier,
            searchNoPort: this.filterPort,
          },
        }
      )
        .then(({ data }) => {
          this.listPortSensor = data.result.payload;
          this.$store.dispatch("setCurrentPage", data.result.currentPage);
          this.$store.dispatch("setLastPage", data.result.lastPage);
          this.$store.dispatch(
            "setPerPage",
            this.perPage == "all" ? data.result.totalData : data.result.perPage
          );
          this.$store.dispatch("setTotalData", parseInt(data.result.totalData));
          this.isReady = true;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    getColorSeverity() {
      ApiService.get(`${process.env.VUE_APP_ROOT_API_4}/other/severity`)
        .then(({ data }) => {
          this.listSeverity = [{ name: "All" }, ...data.result];
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    setColorAlert(name) {
      let output = this.listSeverity.filter((data) => data.name == name);
      return output[0].colors;
    },

    changeReady() {
      this.isReady = false;
      this.listPortSensor = [];
    },

    showDetail(id) {
      this.showSecondaryDataId = this.showSecondaryDataId == id ? null : id;
    },

    // get created at and updated at for hidden column
    getDataReturn(data) {
      if (data == null || data == "") {
        return "-";
      } else {
        return textHelper.formatDate("YYYY-MM-DD H:mm:ss", data);
      }
    },

    openModal(id, port) {
      this.isOpen = true;
      this.idSelected = id;
      if (port[0] == "A") {
        this.$bvModal.show("modal-detail-port");
      } else {
        this.$bvModal.show("modal-detail-port-digital");
      }
    },
    hideModal() {
      this.isOpen = false;
    },
  },
};
</script>

<style scoped>
/* icon plus for hidden column */
.icon-detail {
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid transparent;
}

.icon-detail:hover {
  border: 1px solid transparent;
}

.fa-plus-circle {
  color: #ffffff !important;
  background-color: #18cfc6 !important;
}

/* hover icon plus circle */
.fa-plus-circle:hover {
  color: #ffffff !important;
  background-color: #1ba8a1 !important;
}

.fa-minus-circle {
  color: #ffffff !important;
  background-color: #18cfc6 !important;
  border: 1px solid transparent !important;
}

/* hover icon minus circle */
.fa-minus-circle:hover {
  color: #ffffff !important;
  background-color: #1ba8a1 !important;
  border: 1px solid transparent !important;
}

/* card for hidden column */
.card-detail {
  z-index: 999;
  position: absolute;
}

/* list in hidden column */
.list-detail {
  list-style-type: none;
}
</style>
