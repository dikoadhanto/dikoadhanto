<template>
  <div class="card mb-8">
    <div class="card-body">
      <div class="row">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md">
              <div class="mb-3 row">
                <label class="col-sm-2 col-form-label">Regional :</label>
                <div class="col-sm-10">
                  <treeselect
                    noOptionsText="Tunggu sebentar..."
                    :multiple="true"
                    :clear-on-select="true"
                    noResultsText="Regional tidak ditemukan"
                    :options="dataRegional"
                    placeholder="Pilih Regional..."
                    :normalizer="normalizer"
                    v-model="filter.regional"
                    @input="setDataRegional"
                  >
                  </treeselect>
                </div>
              </div>
              <div class="mb-3 row">
                <label class="col-sm-2 col-form-label">Witel :</label>
                <div class="col-sm-10">
                  <treeselect
                    noOptionsText="Harap pilih regional terlebih dahulu"
                    noResultsText="Witel tidak ditemukan"
                    :multiple="true"
                    :clear-on-select="true"
                    :options="dataWitel"
                    placeholder="Pilih Witel..."
                    :normalizer="normalizer"
                    v-model="filter.witel"
                    @input="setDataWitel"
                  >
                  </treeselect>
                </div>
              </div>
              <!-- <div class="mb-3 row">
                <label class="col-sm-2 col-form-label">Datel :</label>
                <div class="col-sm-10">
                  <treeselect
                    noOptionsText="Harap pilih witel terlebih dahulu"
                    noResultsText="Datel tidak ditemukan"
                    :options="dataDatel"
                    :multiple="true"
                    :clear-on-select="true"
                    placeholder="Pilih Datel..."
                    :normalizer="normalizer"
                    v-model="filter.datel"
                    @input="setDataDatel"
                  >
                  </treeselect>
                </div>
              </div> -->
            </div>
            <div class="col-md">
              <!-- <div class="mb-3 row">
                <label class="col-sm-2 col-form-label">Lokasi :</label>
                <div class="col-sm-10">
                  <treeselect
                    noOptionsText="Harap pilih datel terlebih dahulu"
                    noResultsText="Lokasi tidak ditemukan"
                    :options="dataLokasi"
                    :multiple="true"
                    :clear-on-select="true"
                    placeholder="Pilih Lokasi..."
                    :normalizer="normalizerLocation"
                    v-model="filter.location"
                    @input="setDataLocation"
                  >
                  </treeselect>
                </div>
              </div> -->
              <div class="mb-3 row">
                <label class="col-sm-2 col-form-label">Tags :</label>
                <div class="col-sm-10">
                  <treeselect
                    noOptionsText="Data tidak ada"
                    noResultsText="Tags tidak ditemukan"
                    :options="dataTags"
                    placeholder="Pilih Tags..."
                    :normalizer="normalizer"
                    :multiple="true"
                    :clear-on-select="true"
                    v-model="filter.tags"
                    @input="setDataTags"
                    @search-change="searchData"
                  >
                  </treeselect>
                </div>
              </div>
              <div class="mb-3 row">
                <div class="col my-auto">
                  <div class="row d-flex align-items-center">
                    <label class="col-sm-4 col-form-label">Start Date :</label>
                    <div class="col-sm-8">
                      <input
                        type="datetime-local"
                        class="form-control"
                        v-model="filter.startDate"
                        @input="setStartDate"
                      />
                    </div>
                  </div>
                </div>
                <div class="col my-auto">
                  <div class="row align-items-center">
                    <label class="col-sm-3 col-form-label">End Date :</label>
                    <div class="col-sm-9">
                      <input
                        type="datetime-local"
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
import ApiService from "@/core/services/api.service.js";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  components: {
    Treeselect,
  },
  mounted() {
    this.setData();
    this.getDataRegional();
    this.getDataTags();
  },
  data() {
    return {
      dataRegional: [],
      dataWitel: [],
      dataDatel: [],
      dataLokasi: [],
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
      "getIdRegionalAvaiRtu",
      "getIdWitelAvaiRtu",
      "getIdDatelAvaiRtu",
      "getIdLocationAvaiRtu",
      "getIdTagsAvaiRtu",
      "getStartDateAvaiRtu",
      "getEndDateAvaiRtu",
    ]),
  },
  watch: {
    getIdRegionalAvaiRtu: function () {
      this.filter.regional = this.getIdRegionalAvaiRtu;
    },
    getIdWitelAvaiRtu: function () {
      this.filter.witel = this.getIdWitelAvaiRtu;
    },
  },
  methods: {
    setTimer() {
      if (this.getStartDateAvaiRtu) {
        this.filter.startDate = this.changeEpochToHumanZone(
          this.getStartDateAvaiRtu
        );
        this.setStartDate();
      }
      if (this.getEndDateAvaiRtu) {
        this.filter.endDate = this.changeEpochToHumanZone(
          this.getEndDateAvaiRtu
        );
        this.setEndDate();
      }
    },
    changeEpochToHumanZone(epoch) {
      const date = this.setTwoDigitNumber(new Date(epoch).getDate());
      const month = this.setTwoDigitNumber(new Date(epoch).getMonth() + 1);
      const year = new Date(epoch).getFullYear();
      const hour = this.setTwoDigitNumber(new Date(epoch).getHours());
      const minute = this.setTwoDigitNumber(new Date(epoch).getMinutes());
      const resultTime = `${year}-${month}-${date}T${hour}:${minute}`;
      return resultTime;
    },
    setTwoDigitNumber(number) {
      return number > 9 ? number : `0${number}`;
    },
    setData() {
      this.filter.regional = this.getIdRegionalAvaiRtu;
      this.filter.witel = this.getIdWitelAvaiRtu;
      this.filter.datel = this.getIdDatelAvaiRtu;
      this.filter.location = this.getIdLocationAvaiRtu;
      this.filter.tags = this.getIdTagsAvaiRtu;
      this.setTimer();
    },
    getDataRegional() {
      ApiService.get(process.env.VUE_APP_ROOT_API_4, "other/org?level=1")
        .then(({ data }) => {
          this.dataRegional = data.result;
        })
        .catch((e) => {
          console.log(e.respone, "error");
        });
    },
    getAllDataWitel() {
      ApiService.get(process.env.VUE_APP_ROOT_API_4, "other/org?level=2")
        .then(({ data }) => {
          this.dataWitel = data.result;
        })
        .catch((e) => {
          console.log(e.respone, "error");
        });
    },
    getAllDataDatel() {
      ApiService.get(process.env.VUE_APP_ROOT_API_4, "other/org?level=3")
        .then(({ data }) => {
          this.dataDatel = data.result;
        })
        .catch((e) => {
          console.log(e.respone, "error");
        });
    },
    getAllDataLokasi() {
      ApiService.get(process.env.VUE_APP_ROOT_API_4, "other/org?level=4")
        .then(({ data }) => {
          this.dataLokasi = data.result;
        })
        .catch((e) => {
          console.log(e.respone, "error");
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
      this.$store.dispatch("setRegionalAvaiRtu", this.filter.regional);
      this.filter.witel = null;
      this.dataWitel = [];
      this.filter.datel = null;
      this.dataDatel = [];
      this.filter.location = null;
      this.dataLokasi = [];
      if (this.filter.regional.length) {
        this.getDataWitel();
      } else {
        this.dataWitel = [];
      }
    },
    getDataWitel() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_4,
        `other/org?level=1&id=(${this.filter.regional.join("|")})`
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
        .catch((e) => {
          console.log(e.respone, "error");
        });
    },
    setDataWitel() {
      this.$store.dispatch("setWitelAvaiRtu", this.filter.witel);
      this.filter.datel = null;
      this.dataDatel = [];
      this.filter.location = null;
      this.dataLokasi = [];
      if (this.filter.witel.length) {
        this.getDataDatel();
      } else {
        this.dataDatel = [];
      }
    },
    getDataDatel() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_4,
        `other/org?level=2&id=(${this.filter.witel.join("|")})`
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
          console.log(e.respone, "error");
        });
    },
    setDataDatel() {
      this.$store.dispatch("setDatelAvaiRtu", this.filter.datel);
      this.filter.location = null;
      this.dataLokasi = [];
      if (this.filter.datel.length) {
        this.getDataLocation();
      } else {
        this.dataLokasi = [];
      }
    },
    getDataLocation() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_4,
        `other/org?level=3&id=(${this.filter.datel.join("|")})`
      )
        .then(({ data }) => {
          let temporaryData = [];
          data.result.forEach((el) => {
            el.locs.forEach((element) => {
              temporaryData.push(element);
            });
          });
          this.dataLokasi = temporaryData;
        })
        .catch((e) => {
          console.log(e.respone, "error");
        });
    },

    setDataLocation() {
      this.$store.dispatch("setLocationAvaiRtu", this.filter.location);
    },
    setDataTags() {
      this.$store.dispatch("setTagsAvaiRtu", this.filter.tags);
    },
    setStartDate() {
      let oneDay = 24 * 60 * 60 * 1000;
      let date = Date.now();
      let newDate = date - oneDay;
      if (this.filter.startDate != "") {
        newDate = new Date(this.filter.startDate).getTime();
      }
      this.$store.dispatch("setStartDateAvaiRtu", newDate);
    },
    setEndDate() {
      let newDate = Date.now();
      if (this.filter.endDate != "") {
        newDate = new Date(this.filter.endDate).getTime();
      }
      this.$store.dispatch("setEndDateAvaiRtu", newDate);
    },
  },
};
</script>

<style scoped>
.text-title {
  font-weight: bold;
}
</style>
