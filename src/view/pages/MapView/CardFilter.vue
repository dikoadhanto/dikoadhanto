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
                    noOptionsText="Pilih datel terlebih dahulu"
                    noResultText="Lokasi tidak ditemukan"
                    :async="true"
                    :load-options="loadOptions"
                    :clear-on-select="true"
                    placeholder="Pilih lokasi"
                    v-model="filter.location"
                    @input="setDataLocation"
                  ></treeselect>
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
                    :clear-on-select="true"
                    :multiple="true"
                    v-model="filter.tags"
                    @input="setDataTags"
                    @search-change="searchData"
                  >
                  </treeselect>
                </div>
              </div>
              <div class="mb-3 row">
                <div class="col-sm-12 text-right">
                  <button
                    type="button"
                    @click="setFilter"
                    class="btn btn-primary"
                  >
                    Submit
                  </button>
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
import { SET_TAGS_MAP } from "@/core/services/store/mapview.module";
import { SET_WITEL_MAP } from "@/core/services/store/mapview.module";
import { SET_DATEL_MAP } from "@/core/services/store/mapview.module";
import { SET_LOCATION_MAP } from "@/core/services/store/mapview.module";
import { SET_REGIONAL_MAP } from "@/core/services/store/mapview.module";
import { ASYNC_SEARCH } from "@riophae/vue-treeselect";

const simulateAsyncOperation = (fn) => {
  setTimeout(fn, 1000);
};

export default {
  components: {
    Treeselect,
  },
  mounted() {
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
      allDataLokasi: [],
      dataLokasi: [],
      dataTags: [],
      rtuStatus: [
        {
          id: "normal",
          label: "NORMAL",
        },
        {
          id: "alert",
          label: "ALERT",
        },
        {
          id: "off",
          label: "OFF",
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
        tags: null,
        rtuStatus: null,
      },
      searchName: "",
    };
  },
  computed: {
    ...mapGetters([
      "idRegionalMap",
      "idWitelMap",
      "idDatelMap",
      "idLocationMap",
      "idTagsMap",
    ]),
  },
  watch: {
    idRegionalMap: function () {
      if (this.idRegionalMap == null || this.idRegionalMap.length == 0) {
        this.getAllDataWitel();
        this.getAllDataDatel();
        this.getAllDataLokasi();
        this.filter.regional = null;
      } else {
        this.filter.regional = this.idRegionalMap;
      }
    },
    idWitelMap: function () {
      if (this.idWitelMap == null || this.idWitelMap.length == 0) {
        if (this.idRegionalMap == null || this.idRegionalMap.length == 0) {
          this.getAllDataDatel();
          this.getAllDataLokasi();
        }
        this.filter.witel = null;
      } else {
        this.filter.witel = this.idWitelMap;
      }
    },
    idDatelMap: function () {
      if (this.idDatelMap == null || this.idDatelMap.length == 0) {
        if (this.idWitelMap == null || this.idWitelMap.length == 0) {
          if (this.idRegionalMap == null || this.idRegionalMap.length == 0) {
            this.getAllDataLokasi();
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
          this.allDataLokasi.forEach((element) => {
            if (
              element.label.toLowerCase().includes(searchQuery.toLowerCase())
            ) {
              options.push(element);
            }
          });

          callback(null, options.slice(0, 101));
        });
      }
    },
    setData() {
      this.filter.regional = this.idRegionalMap;
      this.filter.witel = this.idWitelMap;
      this.filter.datel = this.idDatelMap;
      this.filter.location = this.idLocationMap;
      this.filter.tags = this.idTagsMap;
    },
    setFilter() {
      this.$parent.setFilterData(this.filter);
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
      this.allDataLokasi = [];
      ApiService.get(
        process.env.VUE_APP_ROOT_API_4,
        "other/org?level=4&limit=all"
      )
        .then(({ data }) => {
          this.allDataLokasi = data.result.map((loc) => {
            return {
              id: loc.loc_id,
              label: loc.loc_name,
            };
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
    changeCheckLocation() {
      if (this.idDatelMap == null || this.idDatelMap.length == 0) {
        if (this.idWitelMap == null || this.idWitelMap.length == 0) {
          if (this.idRegionalMap == null || this.idRegionalMap == 0) {
            this.isCheckLocation == false;
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
      this.$store.commit(SET_REGIONAL_MAP, this.filter.regional);
      this.filter.witel = null;
      this.dataWitel = [];
      this.filter.datel = null;
      this.dataDatel = [];
      this.filter.location = null;
      this.dataLokasi = [];
      this.changeCheckLocation();
      if (this.filter.regional !== null) {
        this.getDataWitel();
      } else {
        this.getAllDataWitel();
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
        .catch((e) => {
          console.log(e.response);
        });
    },
    setDataWitel() {
      this.$store.commit(SET_WITEL_MAP, this.filter.witel);
      this.filter.datel = null;
      this.dataDatel = [];
      this.filter.location = null;
      this.dataLokasi = [];
      this.changeCheckLocation();
      if (this.filter.witel !== null) {
        this.getDataDatel();
      } else {
        this.getAllDataDatel();
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
      this.$store.commit(SET_DATEL_MAP, this.filter.datel);
      this.filter.location = null;
      this.dataLokasi = [];
      this.changeCheckLocation();
      if (this.filter.datel !== null) {
        this.getDataLocation();
      } else {
        this.getAllDataLokasi();
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
          this.dataLokasi = temporaryData;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    setDataLocation() {
      this.$store.commit(SET_LOCATION_MAP, this.filter.location);
    },
    setDataTags() {
      this.$store.commit(SET_TAGS_MAP, this.filter.tags);
    },
    searchData(e) {
      this.searchName = e.toLowerCase();
      this.getDataTags();
    },
  },
};
</script>

<style scoped>
.text-title {
  font-weight: bold;
}
</style>
