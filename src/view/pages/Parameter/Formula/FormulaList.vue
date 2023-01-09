<template>
  <div>
    <div class="card">
      <b-row class="head-wrapper">
        <b-col>
          <h2 class="mt-7 ml-10">List Formula</h2>
        </b-col>

        <b-col>
          <div class="button-wrapper">
            <router-link
              to="/parameter/formula-management/add-formula"
              v-slot="{ navigate }"
            >
              <button class="btn btn-sm btn-success mr-5" @click="navigate">
                <span><i class="fas fa-plus icon-sm"></i></span>
                Tambah
              </button>
            </router-link>
          </div>
        </b-col>
      </b-row>

      <hr />

      <div class="p-10">
        <div class="table-responsive">
          <table class="table table-bordered table-striped" v-if="isReady">
            <thead class="text-center">
              <tr>
                <th style="width: 100px; min-width: 100px">#</th>
                <th style="width: 25%">NAMA FORMULA</th>
                <th style="width: 15%">IDENTIFIER</th>
                <th style="width: 20%">DESKRIPSI</th>
                <th style="width: 100px; min-width: 170px">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td class="p-2">
                  <input
                    type="text"
                    class="form-control no-submit"
                    placeholder="Search..."
                    style="height: 30px"
                    v-model="filterNama"
                  />
                </td>
                <td class="p-2">
                  <input
                    type="text"
                    class="form-control no-submit"
                    placeholder="Search..."
                    style="height: 30px"
                    v-model="filterIdentifier"
                  />
                </td>

                <td class="p-2">
                  <input
                    type="text"
                    class="form-control no-submit"
                    placeholder="Search..."
                    style="height: 30px"
                    v-model="filterDeskripsi"
                  />
                </td>

                <td></td>
              </tr>
              <tr v-for="(data, i) in dataFormula" :key="i">
                <td class="align-middle" v-if="currentPage == 1">
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
                <td class="align-middle" v-else>
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
                <td class="align-middle">{{ data.name }}</td>
                <td class="align-middle">
                  {{ data.identifier.length ? data.identifier : "-" }}
                </td>
                <td class="align-middle">
                  {{ data.description.length ? data.description : "-" }}
                </td>

                <td class="text-center align-middle">
                  <i
                    class="fas fa-eye text-dark icon-detail icon-view mx-2"
                    title="detail"
                    @click="detailFormula(data)"
                  ></i>
                  <i
                    class="fas fa-pen text-dark icon-detail icon-edit mr-2"
                    title="update"
                    @click="updateFormula(data)"
                  ></i>
                  <!-- <i
                    class="fas fa-link text-dark icon-add mx-2"
                    title="Link"
                    @click="linkFormula(data)"
                  ></i> -->
                  <!-- <i
                    class="fas fa-link text-dark icon-add mx-2"
                    title="link"
                    @click="goToLinkTable(data.id)"
                  ></i> -->
                  <i
                    @click="deleteFormula(data)"
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

          <Pagination @getData="getFormula" @changeStatusReady="changeReady" />
        </div>
      </div>
    </div>

    <DetailFormula :formulaSelected="formulaSelected" />
    <LinkFormula :formulaSelected="formulaSelected" ref="link-formula" />
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapGetters } from "vuex";
import DetailFormula from "./DetailFormula.vue";
import textHelper from "@/core/helpers/textHelper";
import ApiService from "@/core/services/api.service";
import Pagination from "@/view/pages/Components/Pagination.vue";
import LinkFormula from "@/view/pages/Parameter/Formula/LinkFormula.vue";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

export default {
  name: "FormulaList",
  components: {
    Pagination,
    LinkFormula,
    DetailFormula,
  },
  computed: {
    ...mapGetters(["currentPage", "lastPage", "perPage", "totalData"]),
  },
  data() {
    return {
      isReady: true,

      filterNama: "",
      filterIdentifier: "",
      filterDeskripsi: "",

      dataFormula: [],
      formulaSelected: {},
      showSecondaryDataId: null,
    };
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Parameter", subtitle: "Formula Management" },
    ]);
    this.writeNewTitle("Formula Management");
    this.$store.dispatch("setDefaultPagination");
    this.isReady = false;
    this.getFormula();
  },
  watch: {
    filterNama() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getFormula();
    },
    filterIdentifier() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getFormula();
    },
    filterDeskripsi() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getFormula();
    },
  },
  methods: {
    getFormula() {
      ApiService.query(`${process.env.VUE_APP_ROOT_API_4}/formula`, {
        params: {
          page: this.currentPage,
          limit: this.perPage,
          name: this.filterNama,
          identifier: this.filterIdentifier,
          description: this.filterDeskripsi,
          formula: this.filterFormula,
        },
      })
        .then(({ data }) => {
          this.dataFormula = data.result.payload;
          this.$store.dispatch("setCurrentPage", data.result.currentPage);
          this.$store.dispatch("setLastPage", data.result.lastPage);
          this.$store.dispatch("setPerPage", data.result.perPage);
          this.$store.dispatch("setTotalData", data.result.totalData);
          this.isReady = true;
        })
        .catch((error) => {
          if (error.response.data.code == 404) {
            this.dataFormula = "";
          }
          console.log(error.response);
        });
    },
    showDetail(id) {
      this.showSecondaryDataId = this.showSecondaryDataId == id ? null : id;
    },

    detailFormula(formula) {
      this.formulaSelected = formula;
      this.$bvModal.show("modal-detail-formula");
    },
    linkFormula(formula) {
      this.formulaSelected = formula;
      this.$bvModal.show("modal-link-formula");
      setTimeout(() => {
        this.$refs["link-formula"].setDataFormula();
      }, 500);
    },
    updateFormula(formula) {
      this.$router.push({
        name: "UpdateFormula",
        params: { idSelected: formula.id },
      });
    },
    getDataReturn(data) {
      if (data == null || data == "") {
        return "-";
      } else {
        return textHelper.formatDate("YYYY-MM-DD HH:mm:ss", data);
      }
    },
    goToLinkTable(id) {
      this.$router.push({
        name: "List Link Formula",
      });
      this.$store.dispatch("setIdFormulaRtu", id);
    },
    deleteFormula(formula) {
      Swal.fire({
        title: `Anda yakin ingin menghapus Formula ?`,
        showCancelButton: true,
        confirmButtonColor: "#c70000",
        confirmButtonText: "Hapus",
      }).then((result) => {
        if (result.isConfirmed) {
          ApiService.delete(
            `${process.env.VUE_APP_ROOT_API_4}/formula/del/${formula.id}`
          )
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: `Data formula ${formula.name} berhasil dihapus`,
              });
              this.getFormula();
            })
            .catch((error) => {
              console.log(error.response);
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
.ML__mathlive {
  overflow-x: auto !important;
}

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

.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background-color: #f3f6f9;
  min-height: 50px;
  max-height: 300px;
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px 10px;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}
</style>
