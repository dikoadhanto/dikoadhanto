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
                    :multiple="true"
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
                    :multiple="true"
                    :options="dataWitel"
                    placeholder="Pilih Witel..."
                    :normalizer="normalizer"
                    v-model="filter.witel"
                    @input="setDataWitel"
                  >
                  </treeselect>
                </div>
              </div>
            </div>
            <div class="col-md">
              <div class="mb-3 row">
                <label class="col-sm-3 col-form-label">Lokasi :</label>
                <div class="col-sm-9">
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
              </div>
              <div class="mb-3 row">
                <label class="col-sm-3 col-form-label">Tags :</label>
                <div class="col-sm-9">
                  <treeselect
                    noOptionsText="Data tidak ada"
                    noResultsText="Tags tidak ditemukan"
                    :options="dataTags"
                    :multiple="true"
                    placeholder="Pilih Tags..."
                    :normalizer="normalizer"
                    :clear-on-select="true"
                    v-model="filter.tags"
                    @input="setDataTags"
                    @search-change="searchData"
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
      dataLokasi: [],
      dataTags: [],
      dataIdDatel: [],
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
        location: null,
        tags: null,
      },
      searchName: "",
    };
  },
  computed: {
    ...mapGetters([
      "getIdRegionalMdRtu",
      "getIdWitelMdRtu",
      "getIdLocationMdRtu",
      "getIdTagsMdRtu",
    ]),
  },
  watch: {
    getIdRegionalMdRtu: function () {
      this.filter.regional = this.getIdRegionalMdRtu;
    },
    getIdWitelMdRtu: function () {
      this.filter.witel = this.getIdWitelMdRtu;
    },
  },
  methods: {
    setData() {
      this.filter.regional = this.getIdRegionalMdRtu;
      this.filter.witel = this.getIdWitelMdRtu;
      this.filter.location = this.getIdLocationMdRtu;
      this.filter.tags = this.getIdTagsMdRtu;
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
      this.$store.dispatch(
        "setRegionalMdRtu",
        this.filter.regional.length ? this.filter.regional : null
      );
      this.filter.witel = null;
      this.dataWitel = [];
      this.filter.location = null;
      this.dataLokasi = [];
      if (this.getIdRegionalMdRtu != null) {
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
      this.$store.dispatch(
        "setWitelMdRtu",
        this.filter.witel.length ? this.filter.witel : null
      );
      this.filter.location = null;
      this.dataLokasi = [];
      if (this.getIdWitelMdRtu != null) {
        this.getDataDatel();
      } else {
        this.dataIdDatel = [];
      }
    },
    getDataDatel() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_4,
        `other/org?level=2&id=(${this.filter.witel.join("|")})`
      ).then(({ data }) => {
        this.dataIdDatel = [];
        let AllDatel = data.result;
        AllDatel.forEach((data) => {
          data.datel.forEach((datel) => {
            this.dataIdDatel.push(datel.id);
          });
        });
        this.getDataLocation();
      });
    },
    getDataLocation() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_4,
        `other/org?level=3&id=(${this.dataIdDatel.join("|")})`
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
      this.$store.dispatch("setLocationMdRtu", this.filter.location);
    },
    setDataTags() {
      this.$store.dispatch("setTagsMdRtu", this.filter.tags);
    },
  },
};
</script>

<style scoped>
.text-title {
  font-weight: bold;
}
</style>
