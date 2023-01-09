<template>
  <div class="card mb-8">
    <div class="card-header">
      <div class="row align-items-center">
        <div class="col">
          <div class="font-weight-bolder">
            Akumulasi Volume BBM {{ titleGraph }}
          </div>
        </div>
        <div class="col-md-4 justify-content-end">
          <div class="d-flex justify-content-between align-items-center">
            <!-- back button -->
            <div
              class="cursor-pointer btn btn-light"
              v-if="activePage != 'regional'"
              @click="backToPrevious"
            >
              <i class="fas fa fa-arrow-left fa-sm"></i> Back
            </div>

            <!-- filter button -->
            <div
              class="cursor-pointer"
              @click="activeGraph = 'volume'"
              :class="{ 'btn btn-success': activeGraph == 'volume' }"
            >
              Volume
            </div>
            <div
              class="cursor-pointer"
              @click="activeGraph = 'percent'"
              :class="{ 'btn btn-success': activeGraph == 'percent' }"
            >
              Percentage
            </div>
            <div
              class="cursor-pointer"
              @click="activeGraph = 'alarm'"
              :class="{ 'btn btn-success': activeGraph == 'alarm' }"
              v-if="activePage != 'location'"
            >
              Total Alarm
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-body">
      <BarChart :type="activeGraph" @changeGraph="setGraphLocation" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BarChart from "./graphics/BarChart";

export default {
  data() {
    return {
      activeGraph: "volume",
      titleGraph: "Nasional",
    };
  },
  computed: {
    ...mapGetters({
      activePage: "getActivePageBbm",
      dataBbm: "getDataBbm",
    }),
  },
  components: {
    BarChart,
  },
  watch: {
    dataBbm: function (value) {
      this.setTitleGraph(value);
    },
  },
  methods: {
    setTitleGraph(data) {
      if (this.activePage == "regional") {
        this.titleGraph = "Nasional";
        return;
      }

      if (this.dataBbm.length == 0) {
        this.titleGraph = this.activePage;
        return;
      }

      if (this.activePage == "witel") {
        this.titleGraph = this.dataBbm[0].regional;
        return;
      }

      if (this.activePage == "location") {
        this.titleGraph = this.dataBbm[0].witel;
        return;
      }
    },
    backToPrevious() {
      if (this.activePage == "witel") {
        this.$store.dispatch("setIdRegionalBbm", null);
        this.$store.dispatch("setActivePageBbm", "regional");
        return;
      }

      if (this.activePage == "location") {
        this.$store.dispatch("setIdWitelBbm", null);
        this.$store.dispatch("setActivePageBbm", "witel");
        return;
      }
    },
    setGraphLocation() {
      this.activeGraph = "volume";
    },
  },
};
</script>
