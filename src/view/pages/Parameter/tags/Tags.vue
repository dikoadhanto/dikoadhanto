<template>
  <div>
    <div class="card">
      <b-row class="head-wrapper">
        <b-col>
          <h2 class="mt-7 ml-10">List Tags</h2>
        </b-col>

        <!-- button add tags -->
        <b-col>
          <div class="button-wrapper">
            <button
              class="btn btn-sm btn-success mr-5"
              @click="showModalAdd('add-tags')"
            >
              <span><i class="fas fa-plus icon-sm"></i></span>
              Tambah
            </button>
          </div>
        </b-col>
        <!-- end button add tags -->
      </b-row>
      <!-- header card -->

      <hr />

      <!-- table tags -->
      <div class="p-10">
        <div class="table-responsive">
          <table class="table table-bordered table-striped" v-if="isReady">
            <col style="width: 5%" />
            <col style="width: 25%" />
            <col style="width: 25%" />
            <col style="width: 13%" />
            <head-table-tags :propsHeadConfig="headTable"></head-table-tags>
            <tr>
              <th></th>
              <th>
                <b-form-input
                  size="sm"
                  v-model="filterTags"
                  placeholder="Search"
                  style="height: 30px"
                ></b-form-input>
              </th>
              <th>
                <b-form-input
                  size="sm"
                  v-model="filterDesc"
                  placeholder="Search"
                  style="height: 30px"
                ></b-form-input>
              </th>
              <th></th>
            </tr>
            <tbody>
              <tr v-for="(item, i) in dataTags" :key="i">
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
                  <div
                    class="card-detail"
                    v-if="showSecondaryDataId == item.id"
                  >
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
                  <!-- secondary detail -->
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
                  <div
                    class="card-detail"
                    v-if="showSecondaryDataId == item.id"
                  >
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
                <td>{{ item.name }}</td>
                <td>{{ item.description }}</td>
                <td class="text-center">
                  <i
                    class="fas fa-eye text-dark icon-view mx-2"
                    title="Detail"
                    @click="getDataTags(item)"
                  ></i>
                  <i
                    class="fas fa-pen text-dark icon-edit mx-2"
                    title="Update"
                    @click="updateTags(item)"
                  ></i>
                  <i
                    class="fas fa-link text-dark icon-add mx-2"
                    title="Link"
                    @click="LinkTag(item)"
                  ></i>
                  <i
                    class="fas fa-trash text-dark icon-delete mx-2"
                    title="Delete"
                    @click="deleteTags(item)"
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
      <!-- end table tags -->

      <!-- pagination -->
      <!-- <div>
        
      </div> -->
      <!-- end pagination -->

      <add-tags @getAllDataTags="getTags" />
      <detail-tags ref="detail" />
      <update-tags ref="update" @getAllDataTags="getTags" />
      <link-tag-rtu
        @getAllDataTags="getTags"
        :isUpdate="isUpdateTagRtu"
        :itemTags="itemTags"
        @hideLink="hideLink"
      />
    </div>
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import ApiService from "@/core/services/api.service";
import Swal from "sweetalert2";
import textHelper from "@/core/helpers/textHelper";

export default {
  name: "Tags",

  data() {
    return {
      itemTags: {},

      headTable: "headTags",
      dataTags: [],
      selectName: "",
      selectDes: "",
      rtuId: [],
      setlectDataTags: {},
      isUpdateTagRtu: false,

      showSecondaryDataId: null,
      filterTags: "",
      filterDesc: "",

      isReady: false,
      currentPage: 1,
      lastPage: 1,
      perPage: 10,
      totalData: 1,
      listPage: [5, 10, 15, 25],
    };
  },
  components: {
    HeadTableTags: () => import("../../Components/Table/HeadTableTags.vue"),
    AddTags: () => import("./AddTags.vue"),
    DetailTags: () => import("./DetailsTags.vue"),
    UpdateTags: () => import("./UpdateTags.vue"),
    LinkTagRtu: () => import("./LinkTagRtu.vue"),
  },
  mounted() {
    this.isReady = false;
    this.getTags();
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Parameter", subtitle: "Tags Management" },
    ]);
    this.writeNewTitle("Tags Management");
  },
  watch: {
    updatePage(page) {
      this.currentPage = page;
      this.getUser();
    },
    filterTags() {
      this.currentPage = 1;
      this.getTags();
    },
    filterDesc() {
      this.currentPage = 1;
      this.getTags();
    },
  },
  methods: {
    getTags() {
      ApiService.query(
        `${process.env.VUE_APP_ROOT_API_3}/tags?limit=${this.perPage}&page=${this.currentPage}&searchName=${this.filterTags}&searchDescription=${this.filterDesc}`
      )
        .then(({ data }) => {
          this.dataTags = data.result.tags;
          this.currentPage = data.result.currentPage;
          this.lastPage = data.result.lastPage;
          this.perPage = data.result.perPage;
          this.totalData = data.result.totalData;
          this.isReady = true;
        })
        .catch((error) => {
          if (error.response.status == 404) {
            this.dataTags = "";
          } else if (error.response.status == 500) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `Server sedang dalam perbaikan. Mohon menunggu beberapa saat lagi.`,
            });
          }
        });
    },
    changePerPage() {
      this.dataTags = [];
      this.isReady = false;
      this.getTags();
    },
    updatePage(page) {
      this.currentPage = page;
      this.dataTags = [];
      this.isReady = false;
      this.getTags();
    },
    showDetail(id) {
      this.showSecondaryDataId = this.showSecondaryDataId == id ? null : id;
    },
    getDataTags(item) {
      this.$refs.detail.setTag(item);
      this.$bvModal.show("details-tags");
    },
    LinkTag(item) {
      this.itemTags = item;
      this.isUpdateTagRtu = true;

      // this.rtuId = item.rtu_ids;
      // this.selectDes = item.description;
      // this.selectName = item.name;

      this.$bvModal.show("link-tag-rtu");
    },
    hideLink() {
      this.isUpdateTagRtu = false;
    },
    updateTags(item) {
      this.$refs.update.setTag(item);
      this.$bvModal.show("update-tags");
    },
    showModalAdd(item) {
      this.$bvModal.show(item);
    },
    getDataReturn(data) {
      if (data == null || data == "") {
        return "-";
      } else {
        return textHelper.formatDate("YYYY-MM-DD HH:mm:ss", data);
      }
    },
    deleteTags(item) {
      Swal.fire({
        title: `Anda yakin ingin menghapus tag ${item.name}?`,
        showCancelButton: true,
        confirmButtonColor: "#c70000",
        confirmButtonText: "Hapus",
      }).then((result) => {
        if (result.isConfirmed) {
          ApiService.delete(
            `${process.env.VUE_APP_ROOT_API_3}/tags?tagId=${item.id}`
          )
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: "Tags berhasil dihapus",
              });
              this.getTags();
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
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

.card-detail {
  z-index: 999;
  position: absolute;
}

.list-detail {
  list-style-type: none;
}
</style>
