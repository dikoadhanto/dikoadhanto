<template>
  <section id="list-notification">
    <div class="card">
      <!-- header card -->
      <b-row class="head-wrapper">
        <b-col>
          <h2 class="mt-7 ml-10">List Notification</h2>
        </b-col>

        <!-- button Tambah -->
        <b-col>
          <div class="button-wrapper">
            <button
              class="btn btn-sm btn-success mr-5"
              @click="addNotification()"
            >
              <span><i class="fas fa-plus icon-sm"></i></span>
              Tambah
            </button>
          </div>
        </b-col>
        <!-- end button Tambah -->
      </b-row>
      <!-- header card -->

      <hr />

      <div class="p-10">
        <b-row>
          <b-col>
            <table
              class="table table-striped table-bordered table-hover table-sm"
            >
              <col style="width: 5%" />
              <col style="width: 20%" />
              <col style="width: 16%" />
              <col style="width: 13%" />
              <col style="width: 17%" />
              <col style="width: 14%" />
              <col style="width: 16%" />
              <thead class="text-center">
                <tr>
                  <th>#</th>
                  <th>TELEGRAM NAME</th>
                  <th>TELEGRAM ID</th>
                  <th>TIPE AKUN</th>
                  <th>RTU</th>
                  <th>TAGS</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th></th>
                  <th>
                    <b-form-input
                      size="sm"
                      placeholder="Search"
                      style="height: 30px"
                      v-model="filterName"
                      @keyup="filterDataNotification"
                    ></b-form-input>
                  </th>
                  <th>
                    <b-form-input
                      size="sm"
                      placeholder="Search"
                      style="height: 30px"
                      v-model="filterId"
                      @keyup="filterDataNotification"
                    ></b-form-input>
                  </th>
                  <th>
                    <select
                      class="form-control form-control-sm"
                      v-model="filterAccount"
                      @change="filterDataNotification"
                    >
                      <option value="" selected disabled hidden>
                        Pilih Tipe Akun
                      </option>
                      <option
                        v-for="(data, i) in dataAccount"
                        :key="i"
                        :value="data.id"
                      >
                        <span class="badge badge-danger text-white">{{
                          data.name
                        }}</span>
                      </option>
                    </select>
                  </th>
                  <th>
                    <b-form-input
                      size="sm"
                      placeholder="Search"
                      style="height: 30px"
                      v-model="filterRtus"
                      @keyup="filterDataNotification"
                    ></b-form-input>
                  </th>
                  <th>
                    <b-form-input
                      size="sm"
                      placeholder="Search"
                      style="height: 30px"
                      v-model="filterTags"
                      @keyup="filterDataNotification"
                    ></b-form-input>
                  </th>
                  <th></th>
                </tr>
                <tr v-for="(data, i) in dataNotification" :key="i">
                  <td class="text-center align-middle" v-if="currentPage == 1">
                    {{ i + 1 }}
                  </td>
                  <td class="text-center align-middle" v-else>
                    {{ i + 1 + (currentPage - 1) * perPage }}
                  </td>
                  <td class="align-middle text-center">
                    {{ data.telegram_name }}
                  </td>
                  <td class="align-middle text-center">
                    {{ data.telegram_chat_id }}
                  </td>
                  <td class="align-middle text-center">
                    {{ data.type.toUpperCase() }}
                  </td>
                  <td class="align-middle text-center multi-line">
                    {{ data.rtus.toString() }}
                  </td>
                  <td class="align-middle text-center multi-line">
                    {{ data.tags.toString() }}
                  </td>
                  <td class="text-center">
                    <i
                      class="fas fa-eye text-dark icon-detail icon-view"
                      title="detail"
                      @click="detailNotification(data)"
                    ></i>
                    <i
                      class="fas fa-pen text-dark m-2 icon-detail icon-edit"
                      title="update"
                      @click="updateNotification(data)"
                    ></i>
                    <i
                      class="fas fa-trash text-dark icon-detail icon-delete"
                      title="hapus"
                      @click="deleteDataNotification(data)"
                    ></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </b-col>
        </b-row>

        <!-- pagination -->
        <Pagination @getData="filterDataNotification" />
        <!-- end pagination -->
      </div>
    </div>

    <AddNotification />
    <DetailNotification ref="detail" />
    <UpdateNotification ref="update" />
  </section>
</template>

<script>
import Swal from "sweetalert2";
import { mapGetters } from "vuex";
import AddNotification from "./AddNotification.vue";
import ApiService from "@/core/services/api.service.js";
import DetailNotification from "./DetailNotification.vue";
import UpdateNotification from "./UpdateNotification.vue";
import Pagination from "@/view/pages/Components/Pagination.vue";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

export default {
  name: "notification",
  data() {
    return {
      isReady: false,
      dataNotification: [],
      allDataNotification: [],
      notificationSelected: {},

      // data filter Type
      dataAccount: [
        { id: "", name: "Semua" },
        { id: "user", name: "User" },
        { id: "group", name: "Group" },
      ],

      // filter data
      filterName: "",
      filterId: "",
      filterAccount: "",
      filterRtus: "",
      filterTags: "",
    };
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Administrative", subtitle: "Notification Management" },
    ]);
    this.$store.dispatch("setDefaultPagination");
    this.getDataNotification();
    this.writeNewTitle("Notification Management");
  },
  watch: {
    filterName: function () {
      this.$store.dispatch("setCurrentPage", 1);
    },
    filterId: function () {
      this.$store.dispatch("setCurrentPage", 1);
    },
    filterAccount: function () {
      this.$store.dispatch("setCurrentPage", 1);
    },
    filterRtus: function () {
      this.$store.dispatch("setCurrentPage", 1);
    },
    filterTags: function () {
      this.$store.dispatch("setCurrentPage", 1);
    },
  },
  computed: {
    ...mapGetters(["currentPage", "lastPage", "perPage", "totalData"]),
  },
  components: {
    Pagination,
    AddNotification,
    DetailNotification,
    UpdateNotification,
  },
  methods: {
    getDataNotification() {
      ApiService.get(process.env.VUE_APP_ROOT_API_3, `notifieds`)
        .then(({ data }) => {
          this.allDataNotification = data.result;
          this.allDataNotification.forEach((e) => {
            e.rtus = e.rtus.join(", ");
            e.tags = e.tags.join(", ");
          });
          this.filterDataNotification();
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    filterDataNotification() {
      const filterData = this.allDataNotification.filter(
        (data) =>
          data.telegram_name
            .toLowerCase()
            .includes(this.filterName.toLowerCase()) &&
          data.telegram_chat_id
            .toLowerCase()
            .includes(this.filterId.toLowerCase()) &&
          data.type.includes(this.filterAccount) &&
          data.rtus.toLowerCase().includes(this.filterRtus.toLowerCase()) &&
          data.tags.toLowerCase().includes(this.filterTags.toLowerCase())
      );
      this.dataNotification = filterData.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      );

      this.$store.dispatch("setTotalData", filterData.length);
      this.$store.dispatch(
        "setLastPage",
        Math.floor(this.totalData / this.perPage)
      );
    },
    // show add
    addNotification() {
      this.$bvModal.show("modal-add-notification");
    },
    // show detail
    detailNotification(notification) {
      this.$bvModal.show("modal-detail-notification");
      this.$refs.detail.setDataNotification(notification);
    },
    // show detail
    updateNotification(notification) {
      this.$bvModal.show("modal-update-notification");
      this.$refs.update.setDataNotification(notification);
    },
    deleteDataNotification(notification) {
      Swal.fire({
        title: `Anda yakin ingin menghapus ${notification.telegram_name}?`,
        showCancelButton: true,
        confirmButtonColor: "#c70000",
        confirmButtonText: "Hapus",
      }).then((result) => {
        if (result.isConfirmed) {
          ApiService.delete(
            `${process.env.VUE_APP_ROOT_API_3}/notifieds/${notification.telegram_chat_id}`
          )
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Berhasil.",
                text: `Anda berhasil menghapus data ${notification.telegram_name}.`,
              });
              this.getDataNotification();
            })
            .catch((e) => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${e.response.data.message}!`,
              });
              console.log(e.response);
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

.multi-line {
  white-space: pre-line;
}
</style>
