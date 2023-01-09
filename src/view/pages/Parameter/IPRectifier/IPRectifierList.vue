<template>
  <div>
    <div class="card">
      <b-row class="head-wrapper">
        <b-col>
          <h2 class="mt-7 ml-10">List IP Rectifier</h2>
        </b-col>

        <b-col>
          <div class="button-wrapper">
            <button
              class="btn btn-sm btn-success mr-5"
              @click="addIpRectifier('add-iprectifier')"
            >
              <span><i class="fas fa-plus icon-sm"></i></span>
              Tambah
            </button>
          </div>
        </b-col>
      </b-row>

      <hr />

      <div class="p-10">
        <b-row>
          <b-col>
            <table
              class="table table-striped table-bordered table-hover table-sm"
              v-if="isReady"
            >
              <col style="width: 5%" />
              <col style="width: 20%" />
              <col style="width: 20%" />
              <col style="width: 20%" />
              <col style="width: 20%" />
              <col style="width: 15%" />

              <thead class="text-center">
                <tr>
                  <th>#</th>
                  <th>NAMA RTU</th>
                  <th>Deskripsi RTU</th>
                  <th>NAMA RECTIFIER</th>
                  <th>IP RECTIFIER</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td>
                    <b-form-input
                      size="sm"
                      v-model="filterRtu"
                      placeholder="Search"
                    ></b-form-input>
                  </td>
                  <td>
                    <b-form-input
                      size="sm"
                      v-model="filterDeskripsiRTU"
                      placeholder="Search"
                    ></b-form-input>
                  </td>
                  <td>
                    <b-form-input
                      size="sm"
                      v-model="filterRectifier"
                      placeholder="Search"
                    ></b-form-input>
                  </td>
                  <td>
                    <b-form-input
                      size="sm"
                      v-model="filterIp"
                      placeholder="Search"
                    ></b-form-input>
                  </td>

                  <td></td>
                </tr>
                <tr v-for="(data, i) in dataIpRectifier" :key="i">
                  <td v-if="currentPage == 1">
                    <!-- detail secondary -->
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
                            CREATED BY :
                            <span class="ml-4">{{
                              data.created_by
                                ? data.created_by.toUpperCase()
                                : "-"
                            }}</span>
                          </li>
                          <li>
                            CREATED AT :
                            <span class="ml-4">{{
                              data.created_at
                                ? changeDateTime(data.created_at)
                                : "-"
                            }}</span>
                          </li>
                          <li>
                            UPDATED BY :
                            <span class="ml-4">{{
                              data.updated_by
                                ? data.updated_by.toUpperCase()
                                : "-"
                            }}</span>
                          </li>
                          <li>
                            UPDATED AT :
                            <span class="ml-4">{{
                              data.updated_at
                                ? changeDateTime(data.updated_at)
                                : "-"
                            }}</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <!-- index -->
                    {{ i + 1 }}
                  </td>
                  <td v-else>
                    <!-- detail secondary -->
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
                            CREATED BY :
                            <span class="ml-4">{{
                              data.created_by
                                ? data.created_by.toUpperCase()
                                : "-"
                            }}</span>
                          </li>
                          <li>
                            CREATED AT :
                            <span class="ml-4">{{
                              data.created_at
                                ? changeDateTime(data.created_at)
                                : "-"
                            }}</span>
                          </li>
                          <li>
                            UPDATED BY :
                            <span class="ml-4">{{
                              data.updated_by
                                ? data.updated_by.toUpperCase()
                                : "-"
                            }}</span>
                          </li>
                          <li>
                            UPDATED AT :
                            <span class="ml-4">{{
                              data.updated_at
                                ? changeDateTime(data.updated_at)
                                : "-"
                            }}</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <!-- index -->
                    {{ i + 1 + (currentPage - 1) * perPage }}
                  </td>
                  <td class="align-middle">{{ data.rtu_name }}</td>
                  <td class="align-middle">{{ data.rtu_description }}</td>
                  <td class="align-middle">{{ data.name }}</td>
                  <td class="align-middle">
                    <a :href="'http://' + data.ip_address">{{
                      data.ip_address
                    }}</a>
                  </td>

                  <td class="text-center">
                    <i
                      class="fas fa-eye text-dark icon-detail icon-view"
                      title="detail"
                      @click="detailIpRectifier(data)"
                    ></i>
                    <i
                      class="fas fa-pen text-dark m-2 icon-detail icon-edit"
                      title="update"
                      @click="updateIpRectifier(data)"
                    ></i>
                    <i
                      class="fas fa-trash text-dark icon-detail icon-delete"
                      title="hapus"
                      @click="deleteIpRectifier(data)"
                    ></i>
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
                aria-controls="table-iprectifier"
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
                    <option
                      v-for="(page, i) in listPage"
                      :key="i"
                      :value="page"
                    >
                      {{ page }}
                    </option>
                  </select>
                </div>
                <div class="col">
                  <div class="info-page" v-if="currentPage == 1">
                    Showing 1 -
                    {{ perPage > totalData ? totalData : perPage }} of
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
          </b-col>
        </b-row>
      </div>

      <AddIpRectifier @getAllRectifier="listIpRectifier" />
      <DetailIpRectifier ref="detail" />
      <UpdateIpRectifier @getAllRectifier="listIpRectifier" ref="update" />
    </div>
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import Swal from "sweetalert2";
import AddIpRectifier from "@/view/pages/Parameter/IPRectifier/AddIpRectifier.vue";
import DetailIpRectifier from "@/view/pages/Parameter/IPRectifier/DetailIpRectifier.vue";
import UpdateIpRectifier from "@/view/pages/Parameter/IPRectifier/UpdateIpRectifier.vue";
import ApiService from "@/core/services/api.service.js";
import textHelper from "@/core/helpers/textHelper";

export default {
  name: "IPRectifierList",
  components: {
    UpdateIpRectifier,
    AddIpRectifier,
    DetailIpRectifier,
  },
  data() {
    return {
      showSecondaryDataId: null,
      dataIpRectifier: [],
      currentPage: 1,
      perPage: 10,
      lastPage: 1,
      totalData: 0,
      listPage: [5, 10, 15, 25],
      filterRtu: "",
      filterDeskripsiRTU: "",
      filterRectifier: "",
      filterIp: "",
      isReady: false,
    };
  },
  watch: {
    filterRtu() {
      this.currentPage = 1;
      this.listIpRectifier();
    },
    filterDeskripsiRTU() {
      this.currentPage = 1;
      this.listIpRectifier();
    },
    filterRectifier() {
      this.currentPage = 1;
      this.listIpRectifier();
    },
    filterIp() {
      this.currentPage = 1;
      this.listIpRectifier();
    },
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Parameter", subtitle: "IP Rectifier" },
    ]);
    this.writeNewTitle("IP Rectifier");
    this.listIpRectifier();
  },
  methods: {
    listIpRectifier() {
      ApiService.query(`${process.env.VUE_APP_ROOT_API_4}/ip-rectifier`, {
        params: {
          page: this.currentPage,
          limit: this.perPage,
          searchRTU: this.filterRtu,
          searchName: this.filterRectifier,
          searchIp: this.filterIp,
          searchRTUDesc: this.filterDeskripsiRTU,
        },
      })
        .then(({ data }) => {
          this.dataIpRectifier = data.result.payload;
          this.currentPage = Number(data.result.currentPage);
          this.lastPage = Number(data.result.lastPage);
          this.perPage = Number(data.result.perPage);
          this.totalData = Number(data.result.totalData);
          this.isReady = true;
        })
        .catch((err) => {
          console.log(err.response);
          if (err.response.data.code == 404) {
            this.dataIpRectifier = [];
          }
        });
    },
    detailIpRectifier(data) {
      this.$bvModal.show("detail-iprectifier");
      this.$refs.detail.detailIpRectifier(data);
    },
    showDetail(id) {
      this.showSecondaryDataId = this.showSecondaryDataId == id ? null : id;
    },
    changeDateTime(time) {
      let miliseconds = time * 1000;
      let dateObject = new Date(miliseconds);
      return dateObject;
    },
    addIpRectifier(data) {
      this.$bvModal.show(data);
    },
    updateIpRectifier(data) {
      this.$bvModal.show("update-iprectifier");
      this.$refs.update.getRtu();
      this.$refs.update.setIpRectifier(data);
    },
    deleteIpRectifier(data) {
      Swal.fire({
        title: `Anda yakin ingin menghapus ${data.name} ?`,
        showCancelButton: true,
        confirmButtonColor: "#c70000",
        confirmButtonText: "Hapus",
      }).then((result) => {
        if (result.isConfirmed) {
          ApiService.delete(
            `${process.env.VUE_APP_ROOT_API_4}/ip-rectifier/${data.uuid}`
          ).then(() => {
            Swal.fire({
              icon: "success",
              title: "Berhasil!",
              text: `${data.name} berhasil dihapus`,
            }).then((result) => {
              if (result.isConfirmed || result.isDismissed) {
                this.listIpRectifier();
              }
            });
          });
        }
      });
    },
    changePerPage() {
      this.dataIpRectifier = [];
      this.isReady = false;
      this.listIpRectifier();
    },
    updatePage(page) {
      this.currentPage = page;
      this.dataIpRectifier = [];
      this.isReady = false;
      this.listIpRectifier();
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
.button-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-right: 20px;
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

.wrap-pagination {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
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
