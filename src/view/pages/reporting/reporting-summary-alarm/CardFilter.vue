<template>
  <div class="card mb-8">
    <div class="card-body">
      <div class="row">
        <div class="col-md-1">
          <div class="text-title">Filters</div>
        </div>
        <div class="col-md-10">
          <div class="row">
            <div class="col-md">
              <div class="mb-3 row">
                <label class="col-sm-3 col-form-label">Regional :</label>
                <div class="col-sm-9">
                  <treeselect
                    noOptionsText="Data Tidak Ada"
                    noResultText="Regional tidak ditemukan"
                    placeholder="Pilih Regional..."
                    v-model="filter.regional"
                    :clear-on-select="true"
                    :options="dataRegional"
                    :normalizer="normalizer"
                    @input="setDataRegional"
                  ></treeselect>
                </div>
              </div>

              <div class="mb-3 row">
                <label class="col-sm-3 col-form-label">Tags :</label>
                <div class="col-sm-9">
                  <treeselect
                    noOptionsText="Data tidak ada"
                    noResultText="Tags tidak ditemukan"
                    placeholder="Pilih tags..."
                    v-model="filter.tags"
                    :multiple="true"
                    :clear-on-select="true"
                    :options="dataTags"
                    :normalizer="normalizer"
                    @input="setDataTags"
                    @search-change="searchData"
                  ></treeselect>
                </div>
              </div>
            </div>
            <div class="col-md">
              <div class="mb-3 row">
                <label class="col-sm-2 col-form-label">Witel :</label>
                <div class="col-sm-10">
                  <treeselect
                    noOptionsText="Harap pilih regional terlebih dahulu"
                    noResultText="Witel tidak ditemukan"
                    placeholder="Pilih Witel..."
                    v-model="filter.witel"
                    :clear-on-select="true"
                    :options="dataWitel"
                    :normalizer="normalizer"
                    @input="setDataWitel"
                  ></treeselect>
                </div>
              </div>

              <div class="mb-3 row">
                <div class="col">
                  <div class="row d-flex align-items-center">
                    <label class="col-sm-4 col-form-label">Start Date :</label>
                    <div class="col-sm-8">
                      <input
                        type="date"
                        class="form-control"
                        v-model="filter.startDate"
                        @input="setStartDate"
                      />
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="row align-items-center">
                    <label class="col-sm-4 col-form-label"
                      >End <br />
                      Date :</label
                    >
                    <div class="col-sm-8">
                      <input
                        type="date"
                        class="form-control"
                        v-model="filter.endDate"
                        @input="setEndDate"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import ApiService from "@/core/services/api.service";

export default {
  components: {
    Treeselect,
  },
  data() {
    return {
      dataRegional: [],
      dataWitel: [],
      dataDatel: [],
      dataLocation: [],
      dataTags: [],
      normalizer(node) {
        return {
          label: node.name,
        };
      },
      normalizerLocation(node) {
        return {
          id: node.loc_id,
          label: node.loc_name,
        };
      },
      filter: {
        regional: null,
        witel: null,
        datel: null,
        location: null,
        tags: null,
        startDate: null,
        endDate: null,
      },
      searchName: "",
    };
  },
  computed: {
    ...mapGetters([
      "getIdRegionalSummaryAlarm",
      "getIdWitelSummaryAlarm",
      "getIdDatelSummaryAlarm",
      "getIdLocationSummaryAlarm",
      "getIdTagsSummaryAlarm",
      "getStartDateSummaryAlarm",
      "getEndDateSummaryAlarm",
    ]),
  },
  mounted() {
    this.getDataRegional();
    this.getAllDataDatel();
    this.getAllDataLocation();
    this.getDataTags();
  },
  watch: {
    getIdRegionalSummaryAlarm: function () {
      if (this.getIdRegionalSummaryAlarm == null) {
        this.getAllDataDatel();
        this.getAllDataLocation();
      }
      this.filter.regional = this.getIdRegionalSummaryAlarm;
    },
    getIdWitelSummaryAlarm: function () {
      if (this.getIdWitelSummaryAlarm == null) {
        if (this.getIdRegionalSummaryAlarm == null) {
          this.getAllDataLocation();
          this.getAllDataLocation();
        }
      }
      this.filter.witel = this.getIdWitelSummaryAlarm;
    },
    getIdDatelSummaryAlarm: function () {
      if (this.getIdDatelSummaryAlarm == null) {
        if (this.getIdWitelSummaryAlarm == null) {
          if (this.getIdRegionalSummaryAlarm == null) {
            this.getAllDataLocation();
          }
        }
      }
    },
  },
  methods: {
    setData() {
      this.filter.regional = this.getIdRegionalDetailAlarm;
      this.filter.witel = this.getIdWitelDetailAlarm;
      this.filter.datel = this.getIdDatelDetailAlarm;
      this.filter.location = this.getIdLocationDetailAlarm;
      this.filter.tags = this.getIdTagsDetailAlarm;
    },
    getDataRegional() {
      ApiService.get(process.env.VUE_APP_ROOT_API_4, "other/org?level=1")
        .then(({ data }) => {
          this.dataRegional = data.result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllDataWitel() {
      ApiService.get(process.env.VUE_APP_ROOT_API_4, "other/org?level=2")
        .then(({ data }) => {
          this.dataWitel = data.result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllDataDatel() {
      ApiService.get(process.env.VUE_APP_ROOT_API_4, "other/org?level=3")
        .then(({ data }) => {
          this.dataDatel = data.result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllDataLocation() {
      ApiService.get(process.env.VUE_APP_ROOT_API_4, "other/org?level=4")
        .then(({ data }) => {
          this.dataLocation = data.result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDataTags() {
      ApiService.query(`${process.env.VUE_APP_ROOT_API_3}/tags/pure`, {
        params: {
          searchName: this.searchName,
        },
      })
        .then(({ data }) => {
          this.dataTags = data.result;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    searchData(e) {
      this.searchName = e.toLowerCase();
      this.getDataTags();
    },
    setDataRegional() {
      this.$store.dispatch("setRegionalSummaryAlarm", this.filter.regional);
      this.filter.witel = null;
      this.dataWitel = [];
      this.filter.datel = null;
      this.dataDatel = [];
      this.filter.location = null;
      this.dataLocation = [];
      if (this.filter.regional != null) {
        this.getDataWitel();
      } else {
        this.dataWitel = [];
      }
    },
    getDataWitel() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_4,
        `other/org?level=1&id=(${this.filter.regional})`
      )
        .then(({ data }) => {
          let temporaryData = [];
          data.result.forEach((el) => {
            el.witel.forEach((element) => {
              temporaryData.push(element);
            });
          });
          this.dataWitel = temporaryData;
        })
        .catch((err) => {
          console.log(err, "error get data... ..");
        });
    },
    setDataWitel() {
      this.$store.dispatch("setWitelSummaryAlarm", this.filter.witel);
      this.filter.datel = null;
      this.dataDatel = [];
      this.filter.location = null;
      this.dataLocation = [];
      if (this.filter.witel != null) {
        this.getDataDatel();
      } else {
        this.dataDatel = [];
      }
    },
    getDataDatel() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_4,
        `other/org?level=2&id=(${this.filter.witel})`
      )
        .then(({ data }) => {
          let temporaryData = [];
          data.result.forEach((el) => {
            el.datel.forEach((element) => {
              temporaryData.push(element);
            });
          });
          this.dataDatel = temporaryData;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    setDataDatel() {
      this.$store.dispatch("setDatelSummaryAlarm", this.filter.datel);
      this.filter.location = null;
      this.dataLocation = [];
      if (this.filter.datel != null) {
        this.getDataLocation();
      } else {
        this.dataLocation = [];
      }
    },
    getDataLocation() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_4,
        `other/org?level=3&id=(${this.filter.datel})`
      )
        .then(({ data }) => {
          let temporaryData = [];
          data.result.forEach((el) => {
            el.locs.forEach((element) => {
              temporaryData.push(element);
            });
          });
          this.dataLocation = temporaryData;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    setDataLocation() {
      this.$store.dispatch("setLocationSummaryAlarm", this.filter.location);
    },
    setDataTags() {
      this.$store.dispatch("setTagsSummaryAlarm", this.filter.tags);
    },
    setStartDate() {
      let oneDay = 24 * 60 * 60 * 1000;
      let date = Date.now();
      let newDate = date - oneDay;
      if (this.filter.startDate != "") {
        newDate = new Date(this.filter.startDate).getTime();
      }
      this.$store.dispatch("setStartDateSummaryAlarm", newDate);
    },
    setEndDate() {
      let newDate = Date.now();
      if (this.filter.endDate != "") {
        newDate = new Date(this.filter.endDate).getTime();
      }
      this.$store.dispatch("setEndDateSummaryAlarm", newDate);
    },
  },
};
</script>

<style scoped>
.text-title {
  font-weight: bold;
}
</style>
