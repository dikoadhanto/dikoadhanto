<template>
  <div>
    <div class="card">
      <b-row class="head-wrapper">
        <b-col>
          <h2 class="mt-7 ml-10">List BBM Tank</h2>
        </b-col>
      </b-row>

      <hr />

      <div class="p-10">
        <div class="table-responsive">
          <table class="table table-bordered table-striped" v-if="isReady">
            <col style="width: 8%" />
            <col style="width: 10%" />
            <col style="width: 12%" />
            <col style="width: 12%" />
            <col style="width: 10%" />
            <col style="width: 10%" />
            <col style="width: 8%" />
            <col style="width: 8%" />
            <col style="width: 8%" />
            <col style="width: 15%" />
            <thead class="text-center">
              <tr>
                <th>#</th>
                <th>SNAME</th>
                <th>NAMA RTU</th>
                <th>Deskripsi RTU</th>
                <th>NO PORT</th>
                <th>BENTUK TANGKI</th>
                <th>PANJANG</th>
                <th>TINGGI</th>
                <th>LEBAR</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>
                  <b-form-input
                    size="sm"
                    placeholder="Search"
                    v-model="filterSname"
                  ></b-form-input>
                </td>
                <td>
                  <b-form-input
                    size="sm"
                    placeholder="Search"
                    v-model="filterRtuName"
                  ></b-form-input>
                </td>
                <td>
                  <b-form-input
                    size="sm"
                    placeholder="Search"
                    v-model="filterDescriptionRTU"
                  ></b-form-input>
                </td>

                <td>
                  <b-form-input
                    size="sm"
                    placeholder="Search"
                    v-model="filterPort"
                  ></b-form-input>
                </td>

                <td class="p-2">
                  <select
                    class="form-control form-control-sm"
                    v-model="filterBentuk"
                    style="height: 30px"
                    placeholder="Search..."
                  >
                    <option value="" selected disabled hidden>
                      Pilih Bentuk
                    </option>
                    <option
                      v-for="(data, i) in listBentuk"
                      :key="i"
                      :value="data.id"
                    >
                      <span class="badge badge-danger text-white">{{
                        data.name
                      }}</span>
                    </option>
                  </select>
                </td>

                <td>
                  <b-form-input
                    size="sm"
                    placeholder="Search"
                    v-model="filterPanjang"
                  ></b-form-input>
                </td>

                <td>
                  <b-form-input
                    size="sm"
                    placeholder="Search"
                    v-model="filterTinggi"
                  ></b-form-input>
                </td>

                <td>
                  <b-form-input
                    size="sm"
                    placeholder="Search"
                    v-model="filterLebar"
                  ></b-form-input>
                </td>

                <td></td>
              </tr>
              <tr v-for="(data, i) in dataBbmTank" :key="i">
                <td v-if="currentPage == 1">
                  <i
                    class="fas fa-minus-circle text-success icon-detail"
                    @click="showDetail(data.id)"
                    v-if="showSecondaryDataId == data.id"
                  ></i>
                  <i
                    class="fas fa-plus-circle text-success icon-detail"
                    @click="showDetail(data.id)"
                    v-else
                  ></i>
                  <div
                    class="card-detail"
                    v-if="showSecondaryDataId == data.id"
                  >
                    <div class="card pt-4 pl-4 pr-10">
                      <ul class="list-detail text-left">
                        <li>
                          CREATED AT :
                          <span class="ml-4">{{
                            getDataReturn(data.created_at)
                          }}</span>
                        </li>
                        <li>
                          CREATED BY :
                          <span class="ml-4">{{
                            data.created_by ? data.created_by : "-"
                          }}</span>
                        </li>
                        <li>
                          UPDATED AT :
                          <span class="ml-4">{{
                            getDataReturn(data.updated_at)
                          }}</span>
                        </li>
                        <li>
                          UPDATED BY :
                          <span class="ml-4">{{
                            data.updated_by ? data.updated_by : "-"
                          }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {{ i + 1 }}
                </td>
                <td v-else>
                  <!-- secondary detail -->
                  <i
                    class="fas fa-minus-circle text-success icon-detail"
                    @click="showDetail(data.id)"
                    v-if="showSecondaryDataId == data.id"
                  ></i>
                  <i
                    class="fas fa-plus-circle text-success icon-detail"
                    @click="showDetail(data.id)"
                    v-else
                  ></i>
                  <div
                    class="card-detail"
                    v-if="showSecondaryDataId == data.id"
                  >
                    <div class="card pt-4 pl-4 pr-10">
                      <ul class="list-detail text-left">
                        <li>
                          CREATED AT :
                          <span class="ml-4">{{
                            getDataReturn(data.created_at)
                          }}</span>
                        </li>
                        <li>
                          CREATED BY :
                          <span class="ml-4">{{
                            data.created_by ? data.created_by : "-"
                          }}</span>
                        </li>
                        <li>
                          UPDATED AT :
                          <span class="ml-4">{{
                            getDataReturn(data.updated_at)
                          }}</span>
                        </li>
                        <li>
                          UPDATED BY :
                          <span class="ml-4">{{
                            data.updated_by ? data.updated_by : "-"
                          }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {{ i + 1 + (currentPage - 1) * perPage }}
                </td>

                <td class="align-middle">{{ data.rtu_sname }}</td>
                <td class="align-middle">{{ validateNull(data.rtu_name) }}</td>
                <td class="align-middle">{{ data.rtu_description }}</td>
                <td class="align-middle">{{ data.no_port }}</td>
                <td class="align-middle">{{ data.name }}</td>
                <td class="align-middle">{{ data.tank_length }}</td>
                <td class="align-middle">{{ data.tank_height }}</td>
                <td class="align-middle">{{ data.tank_wide }}</td>
                <td class="text-center">
                  <i
                    class="fas fa-eye text-dark icon-detail icon-view"
                    title="detail"
                    @click="detailBbmTank(data)"
                  ></i>
                  <i
                    class="fas fa-pen text-dark m-2 icon-detail icon-edit"
                    title="update"
                    @click="updateBmmTank(data.id)"
                  ></i>
                  <!-- <i
                    class="fas fa-trash text-dark icon-detail icon-delete"
                    title="hapus"
                    @click="deleteTangki(data)"
                  ></i> -->
                </td>
              </tr>
            </tbody>
          </table>
          <div class="alert alert-warning mt-15" role="alert" v-else>
            Tunggu sebentar, sedang pengambilan data...
          </div>
          <div class="wrap-pagination mt-10">
            <!-- pagination -->
            <b-pagination
              v-model="currentPage"
              :total-rows="totalData"
              :per-page="perPage"
              aria-controls="table-list-permission"
              @change="updatePage"
            ></b-pagination>

            <!-- show per page -->
            <div class="row align-items-center mr-0 ml-0 mb-2">
              <div class="col">
                <select
                  class="form-control form-select"
                  v-model="perPage"
                  @change="changePerPage"
                >
                  <option v-for="(page, i) in listPage" :key="i" :value="page">
                    {{ page }}
                  </option>
                </select>
              </div>
              <div class="col">
                <div class="info-page" v-if="currentPage == 1">
                  Showing 1 - {{ perPage }} of
                  {{ totalData }}
                </div>
                <div class="info-page" v-else>
                  Showing
                  {{ (currentPage - 1) * perPage + 1 }}
                  -
                  {{
                    perPage + (currentPage - 1) * perPage > totalData
                      ? totalData
                      : perPage + (currentPage - 1) * perPage
                  }}
                  of {{ totalData }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AddBbmTank @getDataBBMTank="getDataBBMTank" />
    <DetailBbmTank :bbmTankSelected="bbmTankSelected" />
    <UpdateBmmTank
      @hideUpdateBbm="hideUpdateBbm"
      @getDataBBMTank="getDataBBMTank"
      :idSelected="idSelected"
    />
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import ApiService from "@/core/services/api.service";
import AddBbmTank from "@/view/pages/Parameter/BBMTank/AddBbmTank.vue";
import DetailBbmTank from "@/view/pages/Parameter/BBMTank/DetailBbmTank.vue";
import UpdateBmmTank from "@/view/pages/Parameter/BBMTank/UpdateBbmTank.vue";
// import Swal from "sweetalert2";
import textHelper from "@/core/helpers/textHelper";

export default {
  name: "BBMTankList",
  components: {
    AddBbmTank,
    DetailBbmTank,
    UpdateBmmTank,
  },
  data() {
    return {
      //for paginaiton and show perpage
      isReady: true,
      currentPage: 1,
      lastPage: 1,
      perPage: 10,
      totalData: 1,
      listPage: [5, 10, 15, 25],
      showSecondaryDataId: null,

      dataBbmTank: [],

      bbmTankSelected: {},
      idSelected: "",
      listBentuk: [],
      namaRtu: "",
      namaPort: "",
      bentukTangki: "",
      panjang: "",
      tinggi: "",
      lebar: "",

      //for filter/searching
      filterRtuName: "",
      filterDescriptionRTU: "",
      filterPort: "",
      filterSname: "",
      filterBentuk: "",
      filterPanjang: "",
      filterTinggi: "",
      filterLebar: "",
    };
  },
  watch: {
    filterRtuName() {
      this.currentPage = 1;
      this.getDataBBMTank();
    },
    filterDescriptionRTU() {
      this.currentPage = 1;
      this.getDataBBMTank();
    },
    filterPort() {
      this.currentPage = 1;
      this.getDataBBMTank();
    },
    filterSname() {
      this.currentPage = 1;
      this.getDataBBMTank();
    },
    filterBentuk() {
      this.currentPage = 1;
      this.getDataBBMTank();
    },
    filterPanjang() {
      this.currentPage = 1;
      this.getDataBBMTank();
    },
    filterTinggi() {
      this.currentPage = 1;
      this.getDataBBMTank();
    },
    filterLebar() {
      this.currentPage = 1;
      this.getDataBBMTank();
    },
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Parameter", subtitle: "BBM Tank Management" },
    ]);
    this.isReady = false;
    this.getListTangki();
    this.getDataBBMTank();
    this.writeNewTitle("BBM Tank Management");
  },
  methods: {
    validateNull(name) {
      return name ?? "-";
    },
    getDataBBMTank() {
      ApiService.query(`${process.env.VUE_APP_ROOT_API_4}/bbm-tank`, {
        params: {
          page: this.currentPage,
          limit: this.perPage,
          rtu_name: this.filterRtuName,
          rtu_description: this.filterDescriptionRTU,
          rtu_sname: this.filterSname,
          tank_type: this.filterBentuk,
          tank_height: this.filterTinggi,
          tank_wide: this.filterLebar,
          tank_length: this.filterPanjang,
          no_port: this.filterPort,
          metrics: this.filterRtu,
        },
      })
        .then(({ data }) => {
          this.dataBbmTank = data.result.payload;
          this.currentPage = data.result.currentPage;
          this.lastPage = data.result.lastPage;
          this.perPage = data.result.perPage;
          this.totalData = data.result.totalData;

          this.isReady = true;
        })
        .catch((error) => {
          if (error.response.data.code == 404) {
            this.dataBbmTank = [];
          }
          this.isReady = true;
          console.log(error.response);
        });
    },

    getListTangki() {
      ApiService.query(`${process.env.VUE_APP_ROOT_API_4}/tank-form`)
        .then(({ data }) => {
          this.listBentuk.push({
            id: "",
            name: "Semua",
          });
          data.result.payload.forEach((data) => {
            if (data.name != null) {
              let newData = {
                id: data.name,
                name: data.name,
              };
              this.listBentuk.push(newData);
            }
          });
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    changePerPage() {
      this.dataBbmTank = [];
      this.isReady = false;
      this.getDataBBMTank();
    },
    updatePage(page) {
      this.currentPage = page;
      this.dataBbmTank = [];
      this.isReady = false;
      this.getDataBBMTank();
    },

    addBbmTank(data) {
      this.$bvModal.show(data);
    },
    detailBbmTank(data) {
      this.bbmTankSelected = data;
      this.$bvModal.show("detail-bbm-tank");
    },
    updateBmmTank(id) {
      this.idSelected = id;
      this.$bvModal.show("update-bbm-tank");
    },
    hideUpdateBbm() {
      this.idSelected = null;
      this.$bvModal.hide("update-bbm-tank");
    },

    showDetail(id) {
      this.showSecondaryDataId = this.showSecondaryDataId == id ? null : id;
    },
    getDataReturn(data) {
      if (data == null || data == "") {
        return "-";
      } else {
        return textHelper.formatDate("YYYY-MM-DD HH:mm:ss", data);
      }
    },
  },
};
</script>

<style scoped>
/* button add and delete */
.button-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-right: 20px;
}

.wrap-pagination {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.badge-success {
  background-color: rgb(36, 199, 36);
}

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

.fa-eye,
.fa-pen,
.fa-trash,
.icon-detail,
.button-click {
  cursor: pointer;
}

form.no-submit {
  border: none;
  padding: 0;
}

input.no-submit {
  display: block;
  padding: 9px 4px 9px 30px;
  background: white url("/media/svg/icon-search.svg") no-repeat 8px center;
  background-size: 16px;
}

/* table */
.icon-detail {
  cursor: pointer;
}

/* hidden column */
.card-detail {
  z-index: 999;
  position: absolute;
}

.list-detail {
  list-style-type: none;
}
</style>
