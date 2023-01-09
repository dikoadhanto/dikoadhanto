<template>
  <section id="list-telegram">
    <div class="card">
      <div class="card-header wrap-header">
        <h4>List Telegram Group</h4>
        <b-button variant="success" class="mb-2" @click="refreshData">
          <b-icon icon="arrow-repeat" aria-hidden="true"></b-icon>
          Refresh Data
        </b-button>
      </div>
      <div class="card-body">
        <b-row>
          <b-col>
            <table
              class="table table-striped table-bordered table-hover table-sm"
              v-if="isReady"
            >
              <col style="width: 5%" />
              <col style="width: 26%" />
              <col style="width: 26%" />
              <col style="width: 26%" />
              <col style="width: 21%" />
              <thead class="text-center">
                <tr>
                  <th>#</th>
                  <th>GROUP NAME</th>
                  <th>GROUP ID</th>
                  <th>DESKRIPSI</th>
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
                    ></b-form-input>
                  </th>
                  <th>
                    <b-form-input
                      size="sm"
                      placeholder="Search"
                      style="height: 30px"
                    ></b-form-input>
                  </th>
                  <th>
                    <b-form-input
                      size="sm"
                      placeholder="Search"
                      style="height: 30px"
                    ></b-form-input>
                  </th>
                  <th></th>
                </tr>
                <tr v-for="(data, i) in dataTelegramGroup" :key="i">
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
                              changeDateTime(data.created_at)
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
                              changeDateTime(data.updated_at)
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
                              changeDateTime(data.created_at)
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
                              changeDateTime(data.updated_at)
                            }}</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <!-- index -->
                    {{ i + 1 + (currentPage - 1) * perPage }}
                  </td>
                  <td class="align-middle text-center">
                    {{ data.group_name }}
                  </td>
                  <td class="align-middle text-center">{{ data.chat_id }}</td>
                  <td class="align-middle text-center">
                    {{ data.description ? data.description : "-" }}
                  </td>
                  <td class="text-center">
                    <i
                      class="fas fa-eye text-dark icon-detail icon-view"
                      title="detail"
                      @click="detailTelegram(data)"
                    ></i>
                    <i
                      class="fas fa-pen text-dark m-2 icon-detail icon-edit"
                      title="update"
                      @click="updateTelegram(data)"
                    ></i>
                    <i
                      @click="deleteTelegram(data)"
                      class="fas fa-trash text-dark icon-detail icon-delete"
                      title="hapus"
                    ></i>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="alert alert-warning mt-15" role="alert" v-else>
              Tunggu sebentar, sedang pengambilan data...
            </div>
          </b-col>
        </b-row>
        <Pagination @getData="getData" @changeStatusReady="changeReady" />
      </div>
    </div>

    <!-- <AddTelegram /> -->
    <DetailTelegram :telegramSelected="telegramSelected" />
    <UpdateTelegram :telegramSelected="telegramSelected" ref="update" />
  </section>
</template>

<script>
// import AddTelegram from "./AddTelegramGroup.vue";
import Swal from "sweetalert2";
import { mapGetters } from "vuex";
import DetailTelegram from "./DetailTelegramGroup.vue";
import UpdateTelegram from "./UpdateTelegramGroup.vue";
import ApiService from "@/core/services/api.service.js";
import Pagination from "@/view/pages/Components/Pagination.vue";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

export default {
  name: "telegram",
  data() {
    return {
      isReady: false,
      dataTelegramGroup: [],
      showSecondaryDataId: null,
      telegramSelected: {},
    };
  },
  mounted() {
    this.$store.dispatch("setDefaultPagination");
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Administrative", subtitle: "Telegram Group Management" },
    ]);
    this.getData();
    this.writeNewTitle("Telegram Group Management");
  },
  computed: {
    ...mapGetters(["currentPage", "lastPage", "perPage", "totalData"]),
  },
  components: {
    // AddTelegram,
    Pagination,
    DetailTelegram,
    UpdateTelegram,
  },
  methods: {
    getData() {
      let params = "";
      if (this.perPage != "all") {
        params = {
          page: this.currentPage,
          limit: this.perPage,
        };
      }
      ApiService.query(`${process.env.VUE_APP_ROOT_API_3}/telegram-groups`, {
        params,
      })
        .then(({ data }) => {
          this.dataTelegramGroup = data.result.prices;
          this.$store.dispatch(
            "setCurrentPage",
            data.result.currentPage ? data.result.currentPage : 1
          );
          this.$store.dispatch("setLastPage", data.result.lastPage);
          this.$store.dispatch("setPerPage", data.result.perPage);
          this.$store.dispatch("setTotalData", this.dataTelegramGroup.length);
          this.isReady = true;
        })
        .catch((e) => {
          console.log(e, "response error ... ...");
        });
    },
    refreshData() {
      this.isReady = false;
      this.getData();
    },
    changeDateTime(time) {
      let dataReturn = "-";
      if (time) {
        let miliseconds = time * 1000;
        dataReturn = new Date(miliseconds);
      }
      return dataReturn;
    },
    // show secondary detail
    showDetail(id) {
      this.showSecondaryDataId = this.showSecondaryDataId == id ? null : id;
    },
    // show add
    addTelegramGroup() {
      this.$bvModal.show("modal-add-telegram");
    },

    // show detail
    detailTelegram(telegram) {
      this.telegramSelected = telegram;
      this.$bvModal.show("modal-detail-telegram");
    },

    // show edit
    updateTelegram(telegram) {
      this.telegramSelected = telegram;
      this.$refs.update.setDataTelegram();
      this.$bvModal.show("modal-update-telegram");
    },
    deleteTelegram(telegram) {
      Swal.fire({
        title: `Anda yakin ingin menghapus telegram group ${telegram.group_name}?`,
        showCancelButton: true,
        confirmButtonColor: "#c70000",
        confirmButtonText: "Hapus",
      }).then((result) => {
        if (result.isConfirmed) {
          ApiService.delete(
            `${process.env.VUE_APP_ROOT_API_3}/telegram-groups/${telegram.uuid}`
          )
            .then(() => {
              this.refreshData();
              Swal.fire("Berhasil!", "Data telah dihapus", "success");
            })
            .catch((e) => {
              console.log(e, "response error ... ...");
              Swal.fire(
                "Oops!",
                "Maaf, sepertinya sedang ada kesalahan di sistem kami. Mohon coba lagi nanti.",
                "error"
              );
            });
        }
      });
    },
    changeReady() {
      this.isReady = false;
    },
  },
};
</script>

<style scoped>
.wrap-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
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

/* table */
.card-detail {
  z-index: 999;
  position: absolute;
}
.list-detail {
  list-style-type: none;
}
</style>
