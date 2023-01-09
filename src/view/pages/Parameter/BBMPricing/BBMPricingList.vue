<template>
  <div>
    <div class="card">
      <b-row class="head-wrapper">
        <b-col>
          <h2 class="mt-7 ml-10">List BBM Pricing</h2>
        </b-col>

        <b-col>
          <div class="button-wrapper">
            <button
              class="btn btn-sm btn-success mr-5"
              @click="showAdd('add-bbm-pricing')"
            >
              <span><i class="fas fa-plus icon-sm"></i></span>
              Tambah
            </button>
          </div>
        </b-col>
      </b-row>

      <hr />

      <div class="p-10">
        <div class="table-responsive">
          <table class="table table-bordered table-striped" v-if="isReady">
            <col style="width: 5%" />
            <col style="width: 40%" />
            <col style="width: 30%" />
            <col style="width: 12%" />
            <HeadTableBbmPricing :propsHeadConfig="headTable" />
            <tr>
              <th></th>
              <th>
                <b-form-input
                  size="sm"
                  v-model="filterOrganization"
                  placeholder="Search"
                ></b-form-input>
              </th>
              <th>
                <b-form-input
                  size="sm"
                  v-model="filterBbmPrice"
                  placeholder="Search"
                ></b-form-input>
              </th>
              <th></th>
            </tr>
            <tbody>
              <tr v-for="(item, i) in dataBbmPrice" :key="i">
                <td v-if="currentPage == 1">
                  <div class="text-center">
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
                    {{ i + 1 }}
                  </div>
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
                <td>{{ item.org_name }}</td>
                <td>Rp. {{ Number(item.price).toLocaleString("id-ID") }}</td>
                <td class="text-center">
                  <i
                    class="fas fa-eye text-dark mx-1 icon-detail icon-view"
                    @click="showDetailBBm(item)"
                  ></i>
                  <i
                    class="fas fa-pen text-dark mx-1 icon-detail icon-edit"
                    @click="showEdit(item)"
                  ></i>
                  <i
                    class="fas fa-trash text-dark mx-1 icon-detail icon-delete"
                    @click="deleteItem(item)"
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

      <DetailBbmPricing
        ref="detail"
        :isDetail="isDetail"
        :detailBbmPricing="detailBbmPricing"
        @hideDetail="hideDetail"
      />
      <AddBbmPricing
        @getAllDataBbmPrice="getBbmPrice"
        :isAdd="isAdd"
        @hideAdd="hideAdd"
      />
      <UpdateBbmPricing ref="detail" @getAllDataBbmPrice="getBbmPrice" />
    </div>
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import ApiService from "@/core/services/api.service";
import Swal from "sweetalert2";
import textHelper from "@/core/helpers/textHelper";

export default {
  name: "BBMPricingList",
  components: {
    HeadTableBbmPricing: () =>
      import("../../Components/Table/HeadTableBbmPricing.vue"),
    DetailBbmPricing: () => import("./DetailBbmPricing.vue"),
    AddBbmPricing: () => import("./AddBbmPricing.vue"),
    UpdateBbmPricing: () => import("./UpdateBbmPricing.vue"),
  },
  data() {
    return {
      headTable: "headBbmPricing",
      isReady: false,
      isDetail: false,
      detailBbmPricing: {},

      isAdd: false,

      dataBbmPrice: [],

      currentPage: 1,
      lastPage: 1,
      perPage: 10,
      totalData: 1,
      listPage: [5, 10, 15, 25],

      showSecondaryDataId: null,

      //for filter/searhing
      filterOrganization: "",
      filterBbmPrice: "",
    };
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Parameter", subtitle: "BBM Pricing" },
    ]);
    this.getBbmPrice();
    this.writeNewTitle("BBM Pricing");
  },

  watch: {
    filterOrganization() {
      this.currentPage = 1;
      this.getBbmPrice();
    },

    filterBbmPrice() {
      this.currentPage = 1;
      this.getBbmPrice();
    },
  },

  methods: {
    getBbmPrice() {
      ApiService.query(`${process.env.VUE_APP_ROOT_API_3}/bbm-prices`, {
        params: {
          page: this.currentPage,
          limit: this.perPage,
          searchOrg: this.filterOrganization,
          searchPrice: this.filterBbmPrice,
        },
      })
        .then(({ data }) => {
          this.dataBbmPrice = data.result.prices;
          this.currentPage = data.result.currentPage;
          this.lastPage = data.result.lastPage;
          this.perPage = data.result.perPage;
          this.totalData = data.result.totalData;
          this.isReady = true;
        })
        .catch((error) => {
          // if (error.response.status == 404) {
          this.dataBbmPrice = "";
          // }
          console.log(error);
        });
    },
    changePerPage() {
      this.dataBbmPrice = [];
      this.isReady = false;
      this.getBbmPrice();
    },
    updatePage(page) {
      this.currentPage = page;
      this.dataBbmPrice = [];
      this.isReady = false;
      this.getBbmPrice();
    },

    showHiddenColumn(id) {
      this.showSecondaryDataId = this.showSecondaryDataId == id ? null : id;
    },
    getDataReturn(data) {
      if (data == null || data == "") {
        return "-";
      } else {
        return textHelper.formatDate("YYYY-MM-DD HH:mm:ss", data);
      }
    },
    getDataCreatedBy(data) {
      if (data == null || data == "") {
        return "-";
      } else {
        return data;
      }
    },
    showDetail(id) {
      this.showSecondaryDataId = this.showSecondaryDataId == id ? null : id;
    },
    showAdd(id) {
      this.$bvModal.show(id);
      this.isAdd = true;
    },
    hideAdd() {
      this.isAdd = false;
    },
    showDetailBBm(item) {
      this.$bvModal.show("detail-bbm-pricing");
      this.isDetail = true;
      this.detailBbmPricing = item;

      // this.$refs.detail.setDataBbmPrice(item);
    },
    hideDetail() {
      this.isDetail = false;
    },
    showEdit(item) {
      this.$bvModal.show("update-bbm-pricing");
      this.$refs.detail.setDataBbmPrice(item);
      this.$refs.detail.updateDataBbmPrice(item.id);
    },
    deleteItem(item) {
      Swal.fire({
        icon: "warning",
        title: `Anda yakin ingin menghapus Harga BBM Organisasi ${item.org_name}?`,
        showCancelButton: true,
        // cancelButtonColor: "#3085d6",
        confirmButtonColor: "#c70000",
        confirmButtonText: "Hapus",
      }).then((result) => {
        if (result.isConfirmed) {
          ApiService.delete(
            `${process.env.VUE_APP_ROOT_API_3}/bbm-prices/${item.id}`
          )
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: `Harga BBM Organisasi ${item.org_name} berhasil dihapus`,
              });
              this.getBbmPrice();
            })
            .catch((error) => {
              console.log(error);
              Swal.fire({
                icon: "error",
                title: "Gagal!",
                text: `Harga BBM Organisasi ${item.org_name} gagal dihapus`,
              });
            });
        }
      });
    },
  },
};
</script>

<style scoped>
/* button add*/
.button-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-right: 20px;
}
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
