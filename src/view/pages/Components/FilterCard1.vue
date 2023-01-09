<template>
  <b-container fluid class="p-4">
    <b-row>
      <b-col sm="12" md="2"><h6>Filters</h6></b-col>
      <b-col>
        <b-row align-v="center">
          <b-col sm="3" md="2">Regional:</b-col>
          <b-col sm="10"
            ><Treeselect
              v-model="selectedRegional"
              :multiple="true"
              placeholder="All Regional"
              :options="optionsRegional"
          /></b-col>
        </b-row>
      </b-col>
      <b-col>
        <b-row align-v="center">
          <b-col sm="3" md="2">Type:</b-col>
          <b-col sm="10"
            ><Treeselect
              v-model="selectedType"
              placeholder="Select Type"
              :options="optionsType"
          /></b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row class="mt-1">
      <b-col sm="12" md="2"></b-col>
      <b-col>
        <b-row align-v="center">
          <b-col sm="3" md="2">Witel:</b-col>
          <b-col sm="10"
            ><Treeselect
              v-model="selectedWitel"
              :multiple="true"
              placeholder="All Witel"
              :options="optionsWitel"
          /></b-col>
        </b-row>
      </b-col>
      <b-col>
        <b-row align-v="center">
          <b-col sm="3" md="2">Tags:</b-col>
          <b-col sm="10"
            ><Treeselect
              v-model="selectedTag"
              placeholder="Select Tag"
              :options="optionsTag"
          /></b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import {
  // STATE_REGIONAL,
  // STATE_FILTER_UNIT,
  // STATE_WITEL,
  STATE_TYPE_SITE,
  STATE_TAGS,
} from "../BBM/bbm.state";

// eslint-disable-next-line no-unused-vars
import { SET_HEAD_TABLE } from "@/core/services/store/headTable.module";

import ApiService from "@/core/services/api.service.js";
import { mapGetters } from "vuex";
import {
  SET_REGIONAL_ID,
  SET_WITEL_ID,
  SET_DATA,
} from "@/core/services/store/data.module";

export default {
  name: "FilterCard1",
  data() {
    return {
      selectedRegional: [],
      optionsRegional: [],
      selectedType: STATE_TYPE_SITE.selected,
      optionsType: STATE_TYPE_SITE.opts,
      selectedWitel: [],
      optionsWitel: [],
      optionsTag: STATE_TAGS.opts,
      selectedTag: STATE_TAGS.selected,
    };
  },
  computed: {
    ...mapGetters([
      "setData",
      "setRegionalId",
      "setWitelId",
      "setLimit",
      "setPage",
      "setIsCategory",
      "setRegionalFilter",
      "headTable",
    ]),
  },
  components: {
    Treeselect,
  },
  watch: {
    selectedRegional: function () {
      this.$store.dispatch(SET_REGIONAL_ID, this.selectedRegional);
      if (this.selectedRegional != null) {
        this.$router.push({ name: "BBM Regional" });
      }
      this.getWitels();
    },
    selectedWitel: function () {
      this.$store.dispatch(SET_WITEL_ID, this.selectedWitel);
      if (this.selectedWitel != null) {
        this.$router.push({ name: "BBM Witel" });
      }
    },
    setWitelId: function () {
      this.getDataLocation();
    },
    setRegionalFilter: function () {
      if (this.selectedRegional === []) {
        this.selectedRegional === this.setRegionalFilter;
      }
    },
  },
  methods: {
    async getRegionals() {
      await ApiService.get(`regionals`)
        .then(({ data }) => {
          let resRegionals = data.result.regionals;
          let mapRegionals = resRegionals.map((item) => {
            return {
              id: item.id,
              label: item.name,
            };
          });
          this.optionsRegional = mapRegionals;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getWitels() {
      await ApiService.query(
        `witels?regionalId=${this.setRegionalId.join("&regionalId=")}`
      )
        .then(({ data }) => {
          let resWitels = data.result.witels;
          let mapWitels = resWitels.map((item) => {
            return {
              id: item.id,
              label: item.name,
            };
          });
          this.optionsWitel = mapWitels;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getData() {
      await ApiService.get(
        `${process.env.VUE_APP_ROOT_API_5}/regionals/bbm/monitoring`
      )
        .then((result) => {
          if (result.data.result) {
            this.$store.dispatch(SET_DATA, result.data.result);
          }
        })
        .catch((err) => {
          console.log(err.response, "error response");
        });
    },
    async getDataWitel() {
      var url;
      if (this.setRegional) {
        url = `/witels/bbm/monitoring?regionalId=${this.setRegionalId}`;
      } else if (this.setRegional.length > 1) {
        url = `/witels/bbm/monitoring?regionalId=${this.setRegionalId.join(
          "&regionalId="
        )}`;
      }
      await ApiService.query(url)
        .then()
        .catch((err) => {
          console.log(err);
        });
    },
    async getDataLocation() {
      let url = `/witels/bbm/monitoring`;
      if (this.setWitelId) {
        url += `?witelId=${this.setWitelId}`;
      }
      await ApiService.get(url)
        .then((result) => {
          if (result.data.result) {
            this.$store.dispatch(SET_DATA, result.data.result);
          }
        })
        .catch((err) => {
          console.log(err.response);
          alert(`Data Tidak ada`, err);
        });
    },
    checkRegionalId() {
      if (this.setRegionalId !== null) {
        this.selectedRegional = this.setRegionalId;
        this.getWitels();
        this.checkWitelId();
      } else {
        this.$router.push({ name: "BBM Nasional" });
      }
    },
    checkWitelId() {
      if (this.setWitelId !== null) {
        this.selectedWitel = this.setWitelId;
      } else {
        this.$router.push({ name: "BBM Regional" });
      }
    },
  },
  mounted() {
    this.getRegionals();
    this.checkRegionalId();
    this.getData();
  },
};
</script>
