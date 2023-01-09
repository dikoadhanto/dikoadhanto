<template>
  <div class="card">
    <div class="card-header">
      <div class="row">
        <!-- left comp -->
        <div class="col-md-5 d-flex align-items-center">
          <div class="btn btn-secondary mr-2" @click="backToHome">
            <b-icon icon="arrow-left" aria-hidden="true"></b-icon>
            Back
          </div>
          <div class="font-weight-bolder">
            Table View Summary {{ locName.toUpperCase() }}
          </div>
        </div>
        <!-- right comp -->
        <div class="col-md-7">
          <CountTimer @getData="getDataTable" />
        </div>
      </div>
    </div>

    <TableView ref="table-view" v-if="isReady" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CountTimer from "@/view/pages/Components/CountTimer.vue";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import TableView from "@/view/pages/dashboard/dashboard-view/TableView.vue";

export default {
  components: {
    TableView,
    CountTimer,
  },
  data() {
    return {
      locName: "",
      isReady: false,
    };
  },
  mounted() {
    this.checkDataProps();
  },
  computed: {
    ...mapGetters(["getIdWitelTioc", "getLocNameTioc", "getIdRegionalTioc"]),
  },
  methods: {
    checkDataProps() {
      if (this.getIdRegionalTioc != null) {
        this.$store.dispatch(
          "setRegionalLocMonitoring",
          this.getIdRegionalTioc
        );
        this.$store.dispatch("setWitelLocMonitoring", this.getIdWitelTioc);
        this.locName = this.getLocNameTioc;
        this.isReady = true;
      } else {
        this.backToHome();
        this.isReady = false;
      }
    },
    backToHome() {
      this.$router.push({
        name: "DashboardTioc",
      });
    },
    getDataTable() {
      this.$refs["table-view"].getLocationMonitoring();
    },
    setDefaultData() {
      this.isReady = false;
      this.$store.dispatch("setRegionalLocMonitoring", null);
      this.$store.dispatch("setWitelLocMonitoring", null);
    },
  },
  beforeDestroy() {
    this.setDefaultData();
  },
};
</script>
