<template>
  <div class="card">
    <div class="card-header">
      <div class="row align-items-center">
        <div class="col">
          <div class="font-weight-bolder">Detail {{ getFilename() }}</div>
        </div>
        <div class="col d-flex justify-content-end">
          <!-- back button -->
          <div
            class="cursor-pointer btn btn-light mr-3"
            v-if="activePage != 'regional'"
            @click="backToPrevious"
          >
            <i class="fas fa fa-arrow-left fa-sm"></i> Back
          </div>
          <div
            class="btn btn-success"
            @click="
              ExportToExcelFromMixin(
                'Tabel' + getFilename(),
                'table-bbm-monitoring'
              )
            "
          >
            Export
          </div>
        </div>
      </div>
    </div>
    <div class="card-body">
      <TableLocation v-if="activePage == 'location'" />
      <TableDefault v-if="activePage == 'regional' || activePage == 'witel'" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TableDefault from "./tables/TableDefault";
import TableLocation from "./tables/TableLocation";

export default {
  computed: {
    ...mapGetters({
      activePage: "getActivePageBbm",
      dataBbm: "getDataBbm",
    }),
  },
  watch: {
    dataBbm: function () {
      this.getFilename();
    },
  },
  components: {
    TableDefault,
    TableLocation,
  },
  async mounted() {
    await this.$store.dispatch("setIdRegionalBbm", null);
    await this.$store.dispatch("setIdWitelBbm", null);
    await this.$store.dispatch("setActivePageBbm", "regional");
  },
  methods: {
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
    getFilename() {
      let title = "Status Monitoring";
      let page = "";
      if (this.activePage == "regional") {
        page = "Nasional";
      }

      if (this.dataBbm.length == 0) {
        this.page = this.activePage;
      }

      if (this.activePage == "witel") {
        page = this.dataBbm[0].regional;
      }

      if (this.activePage == "location") {
        page = this.dataBbm[0].witel;
      }

      return `${title} ${page}`;
    },
  },
};
</script>
