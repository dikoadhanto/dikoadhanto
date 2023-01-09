<template>
  <div>
    <div class="card">
      <!-- header card -->
      <b-row class="head-wrapper">
        <b-col>
          <h2 class="mt-7 ml-10">List Location</h2>
        </b-col>

        <!-- button add location -->
        <b-col>
          <div class="button-wrapper">
            <button
              class="btn btn-sm btn-success mr-5"
              @click="modalAddLocation('add-location')"
            >
              <span><i class="fas fa-plus icon-sm"></i></span>
              Tambah
            </button>
          </div>
        </b-col>
      </b-row>

      <hr />

      <!-- table user -->
      <div class="p-10">
        <b-row>
          <b-col>
            <table
              class="table table-hover table-bordered table-striped"
              id="table-location"
              small
              responsive
            >
              <head-table-list-location
                :propsHeadConfig="headTable"
                :getLocation="getListLocation"
              />
              <tr>
                <th></th>
                <th>
                  <b-form-input
                    size="sm"
                    v-model="filterLocation"
                    placeholder="Search"
                    @keyup="getListLocation"
                    filter-included-fields
                  ></b-form-input>
                </th>
                <th>
                  <b-form-input
                    size="sm"
                    v-model="filterOrganization"
                    placeholder="Search"
                    @keyup="getListLocation"
                    filter-included-fields
                  ></b-form-input>
                </th>
                <th style="width: 200px">
                  <b-form-input
                    size="sm"
                    v-model="filterPic"
                    placeholder="Search"
                    @keyup="getListLocation"
                    filter-included-fields
                  ></b-form-input>
                </th>
                <th style="width: 100px">
                  <b-form-input
                    size="sm"
                    v-model="filterSname"
                    placeholder="Search"
                    @keyup="getListLocation"
                    filter-included-fields
                  ></b-form-input>
                </th>
                <th></th>
              </tr>
              <tbody class="text-center">
                <tr v-for="(item, i) in listLocation" :key="i">
                  <td>
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
                      <div class="text-left card pt-4 pl-4 pr-10">
                        <ul class="list-detail">
                          <li>
                            LONGITUDE :
                            <span class="ml-4">{{
                              getDataLatLng(item.longitude)
                            }}</span>
                          </li>
                          <li>
                            LATITUDE :
                            <span class="ml-4">{{
                              getDataLatLng(item.latitude)
                            }}</span>
                          </li>
                          <li>
                            CREATED BY :
                            <span class="ml-4">{{
                              getDataCreatedBy(item.created_by)
                            }}</span>
                          </li>
                          <li>
                            CREATED AT :
                            <span class="ml-4">{{
                              getDataReturn(item.created_at)
                            }}</span>
                          </li>
                          <li>
                            UPDATED BY :
                            <span class="ml-4">{{
                              getDataCreatedBy(item.updated_by)
                            }}</span>
                          </li>
                          <li>
                            UPDATED AT :
                            <span class="ml-4">{{
                              getDataReturn(item.updated_at)
                            }}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {{ item.i }}
                  </td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.datel }}</td>
                  <td>{{ item.pic_name === null ? "-" : item.pic_name }}</td>
                  <td>{{ item.sname === "null" ? "-" : item.sname }}</td>
                  <td class="px-0">
                    <i
                      class="fas fa-eye text-dark mx-1 icon-view"
                      title="Lihat"
                      @click="detailDataLocation(item)"
                    ></i>
                    <i
                      class="fas fa-pen text-dark mx-1 icon-edit"
                      title="Update"
                      @click="updateDataLocation(item)"
                    ></i>
                    <i
                      class="fas fa-trash text-dark mx-1 icon-delete"
                      title="Hapus"
                      @click="deleteDataLocation(item)"
                    ></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </b-col>
        </b-row>
        <Pagination @getData="getListLocation" />
      </div>

      <!-- import modal component -->
      <AddLocation
        ref="add"
        :isAdd="isAdd"
        @closeAdd="closeAdd"
        @getAllDataLocation="getListLocation"
      />
      <DetailLocation ref="detail" />
      <UpdateLocation ref="update" @getAllDataLocation="getListLocation" />
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import ApiService from "@/core/services/api.service";
import Swal from "sweetalert2";
import textHelper from "@/core/helpers/textHelper.js";
import Pagination from "@/view/pages/Components/Pagination.vue";
import { mapGetters } from "vuex";

export default {
  name: "ListLocation",
  data() {
    return {
      headTable: "headListLocation",
      listLocation: [],
      showSecondaryDataId: null,
      filterLocation: "",
      filterOrganization: "",
      filterPic: "",
      filterSname: "",
      listPermission: this.getReturnRolePermissions(),
      isAdd: false,
    };
  },
  computed: {
    ...mapGetters(["currentPage", "lastPage", "perPage", "totalData"]),
  },
  components: {
    HeadTableListLocation: () =>
      import("../../Components/Table/HeadTableListLocation.vue"),
    AddLocation: () => import("./AddLocation.vue"),
    DetailLocation: () => import("./DetailLocation.vue"),
    UpdateLocation: () => import("./UpdateLocation.vue"),
    Pagination,
  },
  mounted() {
    this.checkPermission(
      "administration_locations",
      "Maaf, Anda tidak dapat mengakses halaman ini, karena Anda tidak memiliki hak akses"
    );
    this.getListLocation();
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Administration", subtitle: "Location Management" },
    ]);
    this.$store.dispatch("setDefaultPagination");
    this.writeNewTitle("Location Management");
  },
  watch: {
    filterLocation() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getListLocation();
    },
    filterOrganization() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getListLocation();
    },
    filterPic() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getListLocation();
    },
    filterSname() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getListLocation();
    },
  },
  methods: {
    // check permission
    checkPermission(name, textError) {
      if (!this.listPermission.includes(name)) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: textError,
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            this.$router.push({ name: "MapView" });
          }
        });
      }
    },
    // get location
    getListLocation() {
      ApiService.query(
        `${process.env.VUE_APP_ROOT_API_3}/locations?limit=${this.perPage}&page=${this.currentPage}&searchName=${this.filterLocation}&searchDatel=${this.filterOrganization}&searchPic=${this.filterPic}&searchSname=${this.filterSname}`
      )
        .then(({ data }) => {
          this.listLocation = data.result.locations;
          this.$store.dispatch("setCurrentPage", data.result.currentPage);
          this.$store.dispatch("setLastPage", data.result.lastPage);
          this.$store.dispatch("setPerPage", data.result.perPage);
          this.$store.dispatch("setTotalData", data.result.totalData);
        })
        .catch((e) => {
          this.listLocation = [];
          console.log(e.response);
        });
    },

    // show more data location on hidden column
    showDetail(id) {
      this.showSecondaryDataId = this.showSecondaryDataId == id ? null : id;
    },

    // get latitude and longitude for hidden column
    getDataLatLng(data) {
      if (data == "null" || data == "") {
        return "-";
      } else {
        return data;
      }
    },

    // get created by and updated by for hidden column
    getDataCreatedBy(data) {
      if (data == null || data == "") {
        return "-";
      } else {
        return data;
      }
    },

    // get created at and updated at for hidden column
    getDataReturn(data) {
      if (data == null || data == "") {
        return "-";
      } else {
        return textHelper.formatDate("YYYY-MM-DD H:mm:ss", data);
      }
    },

    // add location
    modalAddLocation(item) {
      this.checkPermission(
        "administration_locations_create",
        "Maaf, Anda tidak dapat melakukan aksi ini, karena Anda tidak memiliki hak akses"
      );
      this.$bvModal.show(item);
      this.isAdd = true;
    },

    closeAdd() {
      this.isAdd = false;
    },

    // detail location
    detailDataLocation(item) {
      this.checkPermission(
        "administration_locations_view",
        "Maaf, Anda tidak dapat melakukan aksi ini, karena Anda tidak memiliki hak akses"
      );
      this.$bvModal.show("detail-data-location");
      this.$refs.detail.setDataLocation(item);
      setTimeout(() => {
        this.$refs.detail.initMap();
      }, 1000);
    },

    // update location
    updateDataLocation(item) {
      this.checkPermission(
        "administration_locations_update",
        "Maaf, Anda tidak dapat melakukan aksi ini"
      );
      this.$bvModal.show("update-data-location");
      this.$refs.update.getDataOrganization();
      this.$refs.update.setDataLocation(item);
      setTimeout(() => {
        this.$refs.update.initMap();
      }, 500);
    },

    // delete location
    deleteDataLocation(item) {
      this.checkPermission(
        "administration_locations_delete",
        "Maaf, Anda tidak dapat melakukan aksi ini"
      );
      Swal.fire({
        title: `Anda yakin ingin menghapus data ${item.name}?`,
        showCancelButton: true,
        confirmButtonColor: "#c70000",
        confirmButtonText: "Hapus",
      }).then((result) => {
        if (result.isConfirmed) {
          ApiService.delete(
            `${process.env.VUE_APP_ROOT_API_3}locations?locationId=${item.id}`
          )
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: `Data lokasi ${item.name} berhasil dihapus`,
              });
              this.getListLocation();
            })
            .catch((error) => {
              console.log(error.response);
            });
        }
      });
    },
  },
};
</script>

<style scoped>
/* button add */
.button-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-right: 20px;
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

/* hover icon copy */
.fa-copy {
  color: #ffffff !important;
  background-color: #ffa200 !important;
}

/* hover icon copy */
.fa-copy:hover {
  color: #ffffff !important;
  background-color: #d38704 !important;
}

.fa-eye {
  color: #ffffff !important;
  background-color: #139ae9 !important;
}

/* hover icon add */
.fa-eye:hover {
  color: #ffffff !important;
  background-color: #177db8 !important;
}

.fa-pen {
  color: #ffffff !important;
  background-color: #01b652 !important;
}

/* hover icon edit */
.fa-pen:hover {
  color: #ffffff !important;
  background-color: #009c46 !important;
}

.fa-trash {
  color: #ffffff !important;
  background-color: #f10000 !important;
}

/* hover icon delete */
.fa-trash:hover {
  color: #ffffff !important;
  background-color: #bb0000 !important;
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

/* icon in actions column */
.fa-eye,
.fa-pen,
.fa-trash {
  cursor: pointer;
}
</style>
