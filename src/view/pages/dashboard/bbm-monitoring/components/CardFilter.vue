<template>
  <div class="card mb-8">
    <div class="card-body">
      <div class="row">
        <div class="col-md-1">
          <div class="text-title mt-1">Filters</div>
        </div>
        <div class="col-md-11">
          <div class="row">
            <div class="col-md">
              <div class="mb-3 row">
                <label class="col-sm-3 col-form-label">Regional :</label>
                <div class="col-sm-9">
                  <treeselect
                    noOptionsText="Tunggu sebentar..."
                    :clear-on-select="true"
                    noResultsText="Regional tidak ditemukan"
                    :options="dataRegionals"
                    placeholder="Pilih Regional..."
                    openDirection="bottom"
                    v-model="filter.idReg"
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
                    :options="dataWitels"
                    placeholder="Pilih data witel"
                    openDirection="bottom"
                    v-model="filter.idWitel"
                    @input="setDataWitel"
                  >
                  </treeselect>
                </div>
              </div>
            </div>
            <div class="col-md">
              <!-- <div class="mb-3 row">
                <label class="col-sm-3 col-form-label">Type :</label>
                <div class="col-sm-9">
                  <treeselect
                    noOptionsText="Data belum tersedia"
                    noResultsText="Type tidak ditemukan"
                    :options="dataType"
                    :clear-on-select="true"
                    openDirection="bottom"
                    v-model="filter.idType"
                    @input="setDataType"
                    placeholder="Pilih data type"
                  >
                  </treeselect>
                </div>
              </div> -->
              <div class="mb-3 row">
                <label class="col-sm-3 col-form-label">Tags :</label>
                <div class="col-sm-9">
                  <treeselect
                    noOptionsText="Data tidak ada"
                    noResultsText="Tags tidak ditemukan"
                    :options="dataTags"
                    placeholder="Pilih Tags..."
                    :multiple="true"
                    :clear-on-select="true"
                    openDirection="bottom"
                    v-model="filter.idTags"
                    @input="setDataTags"
                    @search-change="searchDataTags"
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
import ApiService from "@/core/services/api.service";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  components: {
    Treeselect,
  },
  data() {
    return {
      filter: {
        idReg: null,
        idWitel: null,
        idType: null,
        idTags: null,
      },
      searchTags: "",
      dataRegionals: [],
      dataWitels: [],
      dataType: [],
      dataTags: [],
    };
  },
  computed: {
    ...mapGetters([
      "getIdRegionalBbm",
      "getIdWitelBbm",
      "getIdTypeBbm",
      "getIdTagsBbm",
    ]),
  },
  watch: {
    getIdRegionalBbm: function (value) {
      this.setFilterRegional(value);
    },
    getIdWitelBbm: function (value) {
      this.setFilterWitel(value);
    },
  },
  async mounted() {
    await this.setData();
    await this.getDataRegional();
    await this.getDataTags();
  },
  methods: {
    setData() {
      this.filter.idReg = this.getIdRegionalBbm;
      this.filter.idWitel = this.getIdWitelBbm;
      this.filter.idType = this.getIdTypeBbm;
      this.filter.idTags = this.getIdTagsBbm;
    },
    async getDataRegional() {
      try {
        const { data } = await ApiService.query(
          `${process.env.VUE_APP_ROOT_API_4}/other/org?level=1`
        );

        this.dataRegionals = this.mappingData(data.result);
      } catch (error) {
        console.log(error);
      }
    },
    setFilterRegional(id) {
      this.filter.idReg = id;
      this.filter.idWitel = null;
      this.$store.dispatch("setIdWitelBbm", null);
      if (id) {
        this.getDataWitel();
      } else {
        this.dataWitels = [];
      }
    },
    setFilterWitel(id) {
      this.filter.idWitel = id;
    },
    setDataRegional() {
      this.$store.dispatch("setIdRegionalBbm", this.filter.idReg);
      this.filter.idWitel = null;
      this.$store.dispatch("setIdWitelBbm", null);
      if (this.filter.idReg) {
        this.$store.dispatch("setActivePageBbm", "witel");
        this.getDataWitel();
      } else {
        this.$store.dispatch("setActivePageBbm", "regional");
        this.dataWitels = [];
      }
    },
    async getDataWitel() {
      try {
        const { data } = await ApiService.query(
          `${process.env.VUE_APP_ROOT_API_4}/other/org`,
          {
            params: {
              level: 1,
              id: this.getIdRegionalBbm,
            },
          }
        );

        this.dataWitels = this.mappingData(data.result[0].witel);
      } catch (error) {
        console.log(error);
      }
    },
    setDataWitel() {
      this.$store.dispatch("setIdWitelBbm", this.filter.idWitel);
      if (this.filter.idWitel) {
        this.$store.dispatch("setActivePageBbm", "location");
      } else {
        this.witelCheckIdReg();
      }
    },
    witelCheckIdReg() {
      if (this.filter.idReg) {
        this.$store.dispatch("setActivePageBbm", "witel");
      } else {
        this.$store.dispatch("setActivePageBbm", "regional");
      }
    },
    async getDataTags() {
      try {
        const { data } = await ApiService.query(
          `${process.env.VUE_APP_ROOT_API_3}/tags/pure`,
          {
            params: {
              searchName: this.searchTags,
            },
          }
        );

        this.dataTags = this.mappingData(data.result);
      } catch (error) {
        console.log(error);
      }
    },
    mappingData(datas) {
      const result = datas.map((data) => {
        return {
          id: data.id,
          label: data.name,
        };
      });

      return result;
    },
    setDataType() {
      this.$store.dispatch("setIdTypeBbm", this.filter.idType);
    },
    setDataTags() {
      this.$store.dispatch("setIdTagsBbm", this.filter.idTags);
    },
    searchDataTags(e) {
      this.searchTags = e.toLowerCase();
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
