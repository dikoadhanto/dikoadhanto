<template>
  <section id="rrd-management">
    <div class="card">
      <b-row class="head-wrapper">
        <b-col>
          <h2 class="mt-7 ml-10">List RRD</h2>
        </b-col>

        <!-- button add user -->
        <b-col>
          <div class="button-wrapper">
            <button class="btn btn-sm btn-success mr-5" @click="addRrd">
              <span><i class="fas fa-plus icon-sm"></i></span>
              Tambah
            </button>
          </div>
        </b-col>
      </b-row>
      <hr />

      <div class="card-body">
        <!-- if data ready -->
        <div class="table-responsive" v-if="isReady">
          <table class="table table-hover table-bordered table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>NAMA RRD</th>
                <th>RRD IP</th>
                <th>IS ACTIVE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search..."
                    v-model="searchName"
                    @keyup="getDataRrd"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search..."
                    v-model="searchIp"
                    @keyup="getDataRrd"
                  />
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr v-for="(rrd, i) in dataRrd" :key="i">
                <td v-if="currentPage == 1">
                  <!-- detail secondary -->
                  <i
                    class="fas fa-minus-circle text-success icon-detail"
                    @click="showDetail(rrd.id)"
                    v-if="showSecondaryDataId == rrd.id"
                  ></i>
                  <i
                    class="fas fa-plus-circle text-success icon-detail"
                    @click="showDetail(rrd.id)"
                    v-else
                  ></i>
                  <div class="card-detail" v-if="showSecondaryDataId == rrd.id">
                    <div class="card pt-4 pl-4 pr-10">
                      <ul class="list-detail text-left">
                        <li>
                          CREATED BY :
                          <span class="ml-4">{{
                            rrd.created_by ? rrd.created_by.toUpperCase() : "-"
                          }}</span>
                        </li>
                        <li>
                          CREATED AT :
                          <span class="ml-4">{{
                            rrd.created_at
                              ? changeDateTime(rrd.created_at)
                              : "-"
                          }}</span>
                        </li>
                        <li>
                          UPDATED BY :
                          <span class="ml-4">{{
                            rrd.updated_by ? rrd.updated_by.toUpperCase() : "-"
                          }}</span>
                        </li>
                        <li>
                          UPDATED AT :
                          <span class="ml-4">{{
                            rrd.updated_at
                              ? changeDateTime(rrd.updated_at)
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
                    @click="showDetail(rrd.id)"
                    v-if="showSecondaryDataId == rrd.id"
                  ></i>
                  <i
                    class="fas fa-plus-circle text-success icon-detail"
                    @click="showDetail(rrd.id)"
                    v-else
                  ></i>
                  <div class="card-detail" v-if="showSecondaryDataId == rrd.id">
                    <div class="card pt-4 pl-4 pr-10">
                      <ul class="list-detail text-left">
                        <li>
                          CREATED BY :
                          <span class="ml-4">{{
                            rrd.created_by ? rrd.created_by.toUpperCase() : "-"
                          }}</span>
                        </li>
                        <li>
                          CREATED AT :
                          <span class="ml-4">{{
                            rrd.created_at
                              ? changeDateTime(rrd.created_at)
                              : "-"
                          }}</span>
                        </li>
                        <li>
                          UPDATED BY :
                          <span class="ml-4">{{
                            rrd.updated_by ? rrd.updated_by.toUpperCase() : "-"
                          }}</span>
                        </li>
                        <li>
                          UPDATED AT :
                          <span class="ml-4">{{
                            rrd.updated_at
                              ? changeDateTime(rrd.updated_at)
                              : "-"
                          }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <!-- index -->
                  {{ i + 1 + (currentPage - 1) * perPage }}
                </td>
                <td>{{ rrd.name }}</td>
                <td>{{ rrd.ip_address }}</td>
                <td>
                  <b-form-checkbox
                    switch
                    size="lg"
                    checked="true"
                    disabled
                    v-if="rrd.is_active == 1"
                  ></b-form-checkbox>
                  <b-form-checkbox
                    switch
                    size="lg"
                    disabled
                    v-else
                  ></b-form-checkbox>
                </td>
                <td class="text-center">
                  <i
                    class="fas fa-eye icon-view mr-2 text-dark"
                    title="Detail"
                    @click="viewDetail(rrd)"
                  ></i>
                  <i
                    class="fas fa-pen icon-edit mr-2 text-dark"
                    title="Update"
                    @click="editRrd(rrd)"
                  ></i>
                  <i
                    class="fas fa-trash icon-delete text-dark"
                    title="Hapus"
                    @click="deleteRrd(rrd)"
                  ></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- data not ready -->
        <div v-else>
          <div class="alert alert-danger mt-15" role="alert" v-if="isNotFound">
            Data tidak ada...
          </div>
          <div class="alert alert-warning mt-15" role="alert" v-else>
            Tunggu sebentar, sedang pengambilan data...
          </div>
        </div>

        <div class="wrap-pagination">
          <!-- pagination -->
          <b-pagination
            class="mt-15"
            v-model="currentPage"
            :total-rows="totalData"
            :per-page="perPage"
            aria-controls="table-list-permission"
            @change="updatePage"
          ></b-pagination>

          <!-- show per page -->
          <div class="row align-items-center">
            <div class="col">
              <select
                class="form-control form-select"
                v-model="perPage"
                @change="getDataRrd"
              >
                <option v-for="(page, i) in listPage" :key="i" :value="page">
                  {{ page }}
                </option>
              </select>
            </div>
            <div class="col">
              <div class="info-page" v-if="currentPage == 1">
                Showing 1 - {{ lastPage == 1 ? totalData : perPage }} of
                {{ totalData }}
              </div>
              <div class="info-page" v-else>
                Showing {{ (currentPage - 1) * perPage + 1 }} -
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

    <!-- modal -->
    <AddRrd @getDataRrd="getDataRrd" />
    <DetailRrd :rrdSelected="rrdSelected" />
    <EditRrd
      :isEdit="isEdit"
      :rrdSelected="rrdSelected"
      @getDataRrd="getDataRrd"
      @hideEdit="hideEdit"
    />
  </section>
</template>

<script>
import Swal from "sweetalert2";
import ApiService from "@/core/services/api.service";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

// modal
import AddRrd from "./AddRrd.vue";
import EditRrd from "./UpdateRrd.vue";
import DetailRrd from "./DetailRrd.vue";

export default {
  name: "RRDList",
  data() {
    return {
      dataRrd: [],
      isReady: false,
      isNotFound: false,
      showSecondaryDataId: null,

      // search in td
      searchName: "",
      searchIp: "",

      // pagination
      lastPage: 0,
      perPage: 10,
      totalData: 0,
      currentPage: 1,
      listPage: [5, 10, 15, 20],

      // using for modal
      isEdit: false,
      rrdSelected: {},
    };
  },
  components: {
    AddRrd,
    EditRrd,
    DetailRrd,
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Parameter", subtitle: "RRD Management" },
    ]);
    this.writeNewTitle("RRD Management");
    this.getDataRrd();
  },
  methods: {
    getDataRrd() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_4,
        `rrd?limit=${this.perPage}&page=${this.currentPage}&searchName=${this.searchName}&searchIp=${this.searchIp}`
      )
        .then(({ data }) => {
          this.currentPage = parseInt(data.result.currentPage);
          this.lastPage = data.result.lastPage;
          this.perPage = parseInt(data.result.perPage);
          this.totalData = parseInt(data.result.totalData);
          this.dataRrd = data.result.payload;
          this.isNotFound = false;
          this.isReady = true;
        })
        .catch((error) => {
          if (error.response.data.code == 404) {
            this.dataRrd = "";
          }
          console.log("error rrd", error.response);
        });
    },
    // show secondary detail
    showDetail(id) {
      this.showSecondaryDataId = this.showSecondaryDataId == id ? null : id;
    },
    changeDateTime(time) {
      let miliseconds = time * 1000;
      let dateObject = new Date(miliseconds);
      return dateObject;
    },
    // pagination
    updatePage(page) {
      this.currentPage = page;
      this.getDataRrd();
    },

    // modal detail
    viewDetail(rrd) {
      this.rrdSelected = rrd;
      this.$bvModal.show("modal-detail-rrd");
    },

    // modal add
    addRrd() {
      this.$bvModal.show("modal-add-rrd");
    },

    // modal edit
    editRrd(rrd) {
      this.isEdit = true;
      this.rrdSelected = rrd;
      this.$bvModal.show("modal-edit-rrd");
    },
    hideEdit() {
      this.isReady = false;
      this.isEdit = false;
    },

    deleteRrd(rrd) {
      Swal.fire({
        title: "Oops!",
        text: `Anda yakin ingin menghapus data RRD ${rrd.name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#c70000",
        confirmButtonText: "Ya, hapus!",
      }).then((result) => {
        if (result.isConfirmed) {
          ApiService.delete(`${process.env.VUE_APP_ROOT_API_4}/rrd/${rrd.id}`)
            .then(({ data }) => {
              if (data.code == 200) {
                Swal.fire({
                  icon: "success",
                  title: "Success...",
                  text: `Anda berhasil menghapus data RRD ${rrd.name}.`,
                });
                this.isReady = false;
                this.getDataRrd();
              }
            })
            .catch((e) => {
              console.log(e);
            });
        }
      });
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
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.title-card {
  font-weight: bold;
}

/* table */
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

.card-detail {
  z-index: 999;
  position: absolute;
}
.list-detail {
  list-style-type: none;
}

/* pagination */
.wrap-pagination {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
.info-page {
  font-size: 10px;
}
</style>
