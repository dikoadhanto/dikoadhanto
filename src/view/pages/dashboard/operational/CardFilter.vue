<template>
  <div class="card mb-8">
    <div class="card-body">
      <div class="row">
        <div class="col-md-2">
          <div class="text-title">Filters</div>
        </div>
        <div class="col-md-10">
          <div class="row">
            <div class="col-md">
              <div class="mb-3 row">
                <label class="col-sm-3 col-form-label">Regional :</label>
                <div class="col-sm-9">
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
                <label class="col-sm-3 col-form-label">Witel :</label>
                <div class="col-sm-9">
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
              <div class="mb-3 row">
                <label class="col-sm-3 col-form-label">Datel :</label>
                <div class="col-sm-9">
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
              </div>
            </div>
            <div class="col-md">
              <div class="mb-3 row">
                <label class="col-sm-3 col-form-label">Lokasi :</label>
                <div class="col-sm-9" v-if="isCheckLocation">
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
                <div class="col-sm-9" v-else>
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
                <label class="col-sm-3 col-form-label">Tags :</label>
                <div class="col-sm-9">
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
                <label class="col-sm-3 col-form-label">Alarm Type :</label>
                <div class="col-sm-9">
                  <treeselect
                    noOptionsText="Data tidak ada"
                    noResultsText="Alarm Type tidak ditemukan"
                    :options="dataAlarmType"
                    placeholder="Pilih Alarm Type..."
                    v-model="filter.alarmType"
                    :multiple="true"
                    :clear-on-select="true"
                    @input="setDataAlarmType"
                  >
                  </treeselect>
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

// vuex / store
import { SET_TAGS } from "@/core/services/store/operational.module";
import { SET_WITEL } from "@/core/services/store/operational.module";
import { SET_DATEL } from "@/core/services/store/operational.module";
import { SET_LOCATION } from "@/core/services/store/operational.module";
import { SET_REGIONAL } from "@/core/services/store/operational.module";
import { SET_ALARM_TYPE } from "@/core/services/store/operational.module";
import { ASYNC_SEARCH } from "@riophae/vue-treeselect";

const simulateAsyncOperation = (fn) => {
  setTimeout(fn, 1000);
};

export default {
  components: {
    Treeselect,
  },
  mounted() {
    this.setDefaultLocation();
    this.setData();
    this.getDataRegional();
    this.getAllDataWitel();
    this.getAllDataDatel();
    this.getAllDataLokasi();
    this.getDataTags();
  },
  data() {
    return {
      isCheckLocation: false,
      dataRegional: [],
      dataWitel: [],
      dataDatel: [],
      AllDataLokasi: [],
      dataLokasi: [],
      dataTags: [],
      dataAlarmType: [
        {
          id: "",
          label: "SEMUA",
        },
        {
          id: "normal",
          label: "NORMAL",
        },
        {
          id: "off",
          label: "OFF",
        },
        {
          id: "alert",
          label: "ALERT",
        },
      ],
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
        alarmType: null,
        tags: null,
      },
      searchName: "",
    };
  },
  computed: {
    ...mapGetters([
      "idRegional",
      "idWitel",
      "idDatel",
      "idLocation",
      "idAlarmType",
      "idTags",
    ]),
  },
  watch: {
    idRegional: function () {
      if (this.idRegional == null || this.idRegional.length == 0) {
        this.getAllDataWitel();
        this.getAllDataDatel();
        this.getAllDataLokasi();
      }
    },
    idWitel: function () {
      if (this.idWitel == null || this.idWitel.length == 0) {
        if (this.idRegional == null || this.idRegional.length == 0) {
          this.getAllDataDatel();
          this.getAllDataLokasi();
        }
      }
    },
    idDatel: function () {
      if (this.idDatel == null || this.idDatel.length == 0) {
        if (this.idWitel == null || this.idWitel.length == 0) {
          if (this.idRegional == null || this.idRegional.length == 0) {
            this.getAllDataLokasi();
          }
        }
      }
    },
  },
  methods: {
    setDefaultLocation() {
      this.$store.commit(SET_LOCATION, null);
      this.filter.location = null;
    },
    loadOptions({ action, searchQuery, callback }) {
      if (action === ASYNC_SEARCH) {
        simulateAsyncOperation(() => {
          const options = [];
          this.AllDataLokasi.forEach((element) => {
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
    setData() {
      this.filter.regional = this.idRegional;
      this.filter.witel = this.idWitel;
      this.filter.datel = this.idDatel;
      this.filter.location = this.idLocation;
      this.filter.alarmType = this.idAlarmType;
      this.filter.tags = this.idTags;
    },
    getDataRegional() {
      ApiService.get(process.env.VUE_APP_ROOT_API_4, "other/org?level=1")
        .then(({ data }) => {
          this.dataRegional = data.result;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    getAllDataWitel() {
      ApiService.get(process.env.VUE_APP_ROOT_API_4, "other/org?level=2")
        .then(({ data }) => {
          this.dataWitel = data.result;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    getAllDataDatel() {
      ApiService.get(process.env.VUE_APP_ROOT_API_4, "other/org?level=3")
        .then(({ data }) => {
          this.dataDatel = data.result;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    getAllDataLokasi() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_4,
        "other/org?level=4&limit=all"
      )
        .then(({ data }) => {
          this.AllDataLokasi = [];
          data.result.forEach((element) => {
            this.AllDataLokasi.push({
              id: element.loc_id,
              label: element.loc_name,
            });
          });
        })
        .catch((e) => {
          console.log(e.response);
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
    changeCheckLocation() {
      if (this.idDatel == null || this.idDatel.length == 0) {
        if (this.idWitel == null || this.idWitel.length == 0) {
          if (this.idRegional == null || this.idRegional.length == 0) {
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
    setDataRegional() {
      this.$store.commit(SET_REGIONAL, this.filter.regional);
      this.filter.witel = null;
      this.dataWitel = [];
      this.filter.datel = null;
      this.dataDatel = [];
      this.filter.location = null;
      this.dataLokasi = [];
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
        .catch((e) => {
          console.log(e.response);
        });
    },
    setDataWitel() {
      this.$store.commit(SET_WITEL, this.filter.witel);
      this.filter.datel = null;
      this.dataDatel = [];
      this.filter.location = null;
      this.dataLokasi = [];
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
      this.$store.commit(SET_DATEL, this.filter.datel);
      this.filter.location = null;
      this.dataLokasi = [];
      this.changeCheckLocation();
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
          console.log(e.response);
        });
    },
    setDataLocation() {
      this.$store.commit(SET_LOCATION, this.filter.location);
    },
    setDataTags() {
      this.$store.commit(SET_TAGS, this.filter.tags);
    },
    setDataAlarmType() {
      this.$store.commit(SET_ALARM_TYPE, this.filter.alarmType);
    },
  },
};
</script>

<style scoped>
.text-title {
  font-weight: bold;
}
</style>
