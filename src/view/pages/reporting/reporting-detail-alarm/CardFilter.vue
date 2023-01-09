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
                <label class="col-sm-2 col-form-label">Regional :</label>
                <div class="col-sm-10">
                  <treeselect
                    noOptionsText="Data Tidak Ada"
                    noResultText="Regional tidak ditemukan"
                    placeholder="Pilih Regional..."
                    :multiple="true"
                    v-model="filter.regional"
                    :clear-on-select="true"
                    :options="dataRegional"
                    :normalizer="normalizer"
                    @input="setDataRegional"
                  ></treeselect>
                </div>
              </div>

              <div class="mb-3 row">
                <label class="col-sm-2 col-form-label">Datel :</label>
                <div class="col-sm-10">
                  <treeselect
                    noOptionsText="Harap pilih witel terlebih dahulu"
                    noResultText="Datel tidak ditemukan"
                    placeholder="Pilih Datel..."
                    v-model="filter.datel"
                    :multiple="true"
                    :clear-on-select="true"
                    :options="dataDatel"
                    :normalizer="normalizer"
                    @input="setDataDatel"
                  ></treeselect>
                </div>
              </div>

              <div class="mb-3 row">
                <label class="col-sm-2 col-form-label">Tags :</label>
                <div class="col-sm-10">
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

              <div class="mb-3 row">
                <label class="col-sm-2 col-form-label">Port Type :</label>
                <div class="col-sm-10">
                  <treeselect
                    noOptionsText="Data tidak ada"
                    noResultText="Port type tidak ditemukan"
                    placeholder="Pilih port type..."
                    v-model="filter.device"
                    :clear-on-select="true"
                    :options="dataDevice"
                    @input="setDataDevice"
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
                    :multiple="true"
                    :clear-on-select="true"
                    :options="dataWitel"
                    :normalizer="normalizer"
                    @input="setDataWitel"
                  ></treeselect>
                </div>
              </div>

              <div class="mb-3 row">
                <label class="col-sm-2 col-form-label">Lokasi :</label>
                <div class="col-sm-10" v-if="isCheckLocation">
                  <treeselect
                    noOptionsText="Harap pilih datel terlebih dahulu"
                    noResultsText="Lokasi tidak ditemukan"
                    :options="dataLocation"
                    :multiple="true"
                    :clear-on-select="true"
                    placeholder="Pilih Lokasi..."
                    :normalizer="normalizerLocation"
                    v-model="filter.location"
                    @input="setDataLocation"
                  >
                  </treeselect>
                </div>
                <div class="col-sm-10" v-else>
                  <treeselect
                    noOptionsText="Pilih datel dulu yaa"
                    noResultsText="Lokasi tidak ditemukan"
                    :async="true"
                    :load-options="loadOptions"
                    :multiple="true"
                    :clear-on-select="true"
                    placeholder="Pilih Lokasi..."
                    v-model="filter.location"
                    @input="setDataLocation"
                  >
                  </treeselect>
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
                    <label class="col-sm-3 col-form-label">End Date :</label>
                    <div class="col-sm-9">
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
import { ASYNC_SEARCH } from "@riophae/vue-treeselect";

const simulateAsyncOperation = (fn) => {
  setTimeout(fn, 1000);
};

export default {
  components: {
    Treeselect,
  },
  data() {
    return {
      isCheckLocation: false,
      dataRegional: [],
      dataWitel: [],
      dataDatel: [],
      AllDataLocation: [],
      dataLocation: [],
      dataTags: [],
      dataDevice: [],
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
        device: null,
      },
      searchName: "",
    };
  },
  computed: {
    ...mapGetters([
      "getIdRegionalDetailAlarm",
      "getIdWitelDetailAlarm",
      "getIdDatelDetailAlarm",
      "getIdLocationDetailAlarm",
      "getIdTagsDetailAlarm",
      "getStartDateDetailAlarm",
      "getEndDateDetailAlarm",
    ]),
  },
  mounted() {
    this.getDataRegional();
    this.getAllDataWitel();
    this.getAllDataDatel();
    this.getAllDataLocation();
    this.getDataDevice();
    this.getDataTags();
  },
  watch: {
    getIdRegionalDetailAlarm: function () {
      if (
        this.getIdRegionalDetailAlarm == null ||
        this.getIdRegionalDetailAlarm.length == 0
      ) {
        this.getAllDataWitel();
        this.getAllDataDatel();
        this.getAllDataLocation();
      }
    },
    getIdWitelDetailAlarm: function () {
      if (
        this.getIdWitelDetailAlarm == null ||
        this.getIdWitelDetailAlarm.length == 0
      ) {
        if (
          this.getIdRegionalDetailAlarm == null ||
          this.getIdRegionalDetailAlarm.length == 0
        ) {
          this.getAllDataLocation();
          this.getAllDataLocation();
        }
      }
    },
    getIdDatelDetailAlarm: function () {
      if (
        this.getIdDatelDetailAlarm == null ||
        this.getIdDatelDetailAlarm.length == 0
      ) {
        if (
          this.getIdWitelDetailAlarm == null ||
          this.getIdWitelDetailAlarm.length == 0
        ) {
          if (
            this.getIdRegionalDetailAlarm == null ||
            this.getIdRegionalDetailAlarm.length == 0
          ) {
            this.getAllDataLocation();
          }
        }
      }
    },
  },
  methods: {
    loadOptions({ action, searchQuery, callback }) {
      if (action === ASYNC_SEARCH) {
        simulateAsyncOperation(() => {
          const options = [];
          this.AllDataLocation.forEach((element) => {
            if (
              element.label.toLowerCase().includes(searchQuery.toLowerCase())
            ) {
              options.push(element);
            }
          });
          callback(null, options);
        });
      }
    },
    changeCheckLocation() {
      if (
        this.getIdDatelDetailAlarm == null ||
        this.getIdDatelDetailAlarm.length == 0
      ) {
        if (
          this.getIdWitelDetailAlarm == null ||
          this.getIdWitelDetailAlarm.length == 0
        ) {
          if (
            this.getIdRegionalDetailAlarm == null ||
            this.getIdRegionalDetailAlarm.length == 0
          ) {
            this.isCheckLocation = false;
          } else {
            this.isCheckLocation = true;
          }
        } else {
          this.isCheckLocation = true;
        }
      } else {
        this.isCheckLocation = true;
      }
    },
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
      ApiService.get(
        process.env.VUE_APP_ROOT_API_4,
        "other/org?level=4&limit=all"
      )
        .then(({ data }) => {
          this.AllDataLocation = [];
          data.result.forEach((element) => {
            this.AllDataLocation.push({
              id: element.loc_id,
              label: element.loc_name,
            });
          });
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
    async getDataDevice() {
      this.dataDevice = [
        {
          id: "",
          label: "SEMUA",
        },
      ];

      try {
        const { data } = await ApiService.get(
          `${process.env.VUE_APP_ROOT_API_4}/port?limit=all`
        );
        const ports = data.result.payload;
        ports.forEach((port) => {
          this.dataDevice.push({
            id: port.id_port,
            label: port.port_name,
          });
        });
      } catch (error) {
        console.log(error, "error .. ..");
      }
    },
    setDataRegional() {
      this.$store.dispatch("setRegionalDetailAlarm", this.filter.regional);
      this.filter.witel = null;
      this.dataWitel = [];
      this.filter.datel = null;
      this.dataDatel = [];
      this.filter.location = null;
      this.dataLocation = [];
      this.changeCheckLocation();
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
        .catch((err) => {
          console.log(err.response);
        });
    },
    setDataWitel() {
      this.$store.dispatch("setWitelDetailAlarm", this.filter.witel);
      this.filter.datel = null;
      this.dataDatel = [];
      this.filter.location = null;
      this.dataLocation = [];
      this.changeCheckLocation();
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
          console.log(e.response);
        });
    },
    setDataDatel() {
      this.$store.dispatch("setDatelDetailAlarm", this.filter.datel);
      this.filter.location = null;
      this.dataLocation = [];
      this.changeCheckLocation();
      if (this.filter.datel.length) {
        this.getDataLocation();
      } else {
        this.dataLocation = [];
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
          this.dataLocation = temporaryData;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    setDataLocation() {
      this.$store.dispatch("setLocationDetailAlarm", this.filter.location);
    },
    setDataTags() {
      this.$store.dispatch("setTagsDetailAlarm", this.filter.tags);
    },
    setStartDate() {
      let oneDay = 24 * 60 * 60 * 1000;
      let date = Date.now();
      let newDate = date - oneDay;
      if (this.filter.startDate != "") {
        newDate = new Date(this.filter.startDate).getTime();
      }
      this.$store.dispatch("setStartDateDetailAlarm", newDate);
    },
    setEndDate() {
      let newDate = Date.now();
      if (this.filter.endDate != "") {
        newDate = new Date(this.filter.endDate).getTime();
      }
      this.$store.dispatch("setEndDateDetailAlarm", newDate);
    },
    setDataDevice() {
      this.$store.dispatch("setDeviceDetailAlarm", this.filter.device);
    },
  },
};
</script>

<style scoped>
.text-title {
  font-weight: bold;
}
</style>
