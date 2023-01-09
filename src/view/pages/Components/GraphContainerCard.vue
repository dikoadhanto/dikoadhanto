<template>
  <div>
    <div class="card-header">
      <div class="card-title m-0">
        <b-row align-v="center">
          <b-col sm="6" md="7">
            <h3 class="card-label">
              Akumulasi Volume BBM {{ cardTitle(headTable) }}
            </h3>
          </b-col>
          <b-col></b-col>
          <b-col sm="6" md="1" class="p-0 mr-5 btn-tab">
            <b-button
              variant="secondary"
              class="w-100"
              v-if="this.setRegionalId != null"
              @click="backToRegional()"
            >
              <b-icon icon="arrow-left" aria-hidden="true"></b-icon>
              Back</b-button
            >
          </b-col>
          <b-col sm="6" md="1" class="p-0 btn-tab">
            <b-button
              :variant="activeCategory == 'percentage' ? 'primary' : 'light'"
              class="w-100"
              @click="changeCategory('percentage')"
            >
              Percentage</b-button
            >
          </b-col>
          <b-col sm="6" md="1" class="p-0 btn-tab">
            <b-button
              :variant="activeCategory == 'volume' ? 'primary' : 'light'"
              class="w-100"
              @click="changeCategory('volume')"
            >
              Volume</b-button
            >
          </b-col>
          <b-col v-if="isAlarmActive" sm="6" md="1" class="p-0">
            <b-button
              v-if="headTable != 'headLocation'"
              :variant="activeCategory == 'alarm' ? 'primary' : 'light'"
              class="w-100"
              @click="changeCategory('alarm')"
            >
              Alarm</b-button
            >
          </b-col>
        </b-row>
      </div>
    </div>
    <div class="card-body p-1">
      <!--begin::Example-->
      <div class="example mb-10">
        <bar-graph-data ref="childComponent" />
      </div>
      <!--end::Example-->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { STATE_ORG_TEMP } from "../BBM/bbm.state";
import {
  SET_IS_CATEGORY,
  SET_REGIONAL_ID,
  SET_WITEL_ID,
} from "@/core/services/store/data.module";

export default {
  name: "GraphContainerCard",
  data() {
    return {
      tempData: STATE_ORG_TEMP.container,
      activeCategory: "percentage",
      isAlarmActive: true,
    };
  },
  watch: {
    headTable: function () {
      if (this.headTable === "headLocation") {
        this.isAlarmActive = false;
      } else {
        this.isAlarmActive = true;
      }
    },
  },
  computed: {
    ...mapGetters(["headTable", "setData", "setRegionalId", "setWitelId"]),
  },
  components: {
    BarGraphData: () => import("./Graph/Bar.vue"),
  },
  methods: {
    cardTitle(data) {
      if (data === "headRegional") {
        return "Nasional";
      } else if (data === "headLocation") {
        return "Witel";
      } else {
        return "Regional";
      }
    },
    changeCategory(category) {
      this.$store.dispatch(SET_IS_CATEGORY, category);
      this.activeCategory = category;
    },
    backToRegional() {
      if (this.headTable == "headWitel") {
        this.$store.dispatch(SET_REGIONAL_ID, null);
        console.info("Phase 1: Back button");
        this.$refs.childComponent.getRegVolume();
      } else if (this.headTable == "headLocation") {
        // this.$store.dispatch(SET_REGIONAL_ID, null);
        this.$store.dispatch(SET_WITEL_ID, null);
        console.info("Phase 2: Back button");
        this.$refs.childComponent.generateWitelData();
      }
    },
  },
};
</script>

<style scoped>
.btn-tab {
  margin-right: 2px;
}
</style>
