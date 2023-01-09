<template>
  <section id="table-summary-alarm">
    <div class="card">
      <div class="card-header">
        <div class="wrap-print">
          <b-button
            variant="secondary"
            class="mr-3"
            @click="backToBefore"
            v-if="getTableSummaryAlarm == 'detail'"
          >
            <b-icon icon="arrow-left" aria-hidden="true"></b-icon> Back
          </b-button>
          <h4
            class="title-summary-alarm m-0"
            v-if="getTableSummaryAlarm == 'general'"
          >
            Reporting Summary Alarm {{ getPageSummaryAlarm }}
          </h4>
          <h4
            class="title-summary-alarm m-0 cursor-pointer"
            v-else-if="getTableSummaryAlarm == 'detail'"
          >
            Total Alert {{ getDetailSummaryAlarm.name }}
          </h4>
        </div>
        <div class="wrap-print">
          <b-button
            variant="primary"
            class="mr-3"
            @click="
              generatePdf(getTableName(), 'table-reporting-summary-alarm')
            "
          >
            <b-icon icon="printer-fill" aria-hidden="true"></b-icon> Print
          </b-button>
          <b-button
            variant="danger"
            @click="
              ExportToExcelFromMixin(
                getTableName(),
                'table-reporting-summary-alarm'
              )
            "
          >
            <b-icon icon="file-earmark-excel-fill" aria-hidden="true"></b-icon>
            Print To Excel
          </b-button>
        </div>
      </div>
      <div class="card-body" v-if="getPageSummaryAlarm == 'National'">
        <TableNational v-if="getTableSummaryAlarm == 'general'" />
        <TableDetail v-else />
      </div>
      <div class="card-body" v-if="getPageSummaryAlarm == 'Regional'">
        <TableRegional v-if="getTableSummaryAlarm == 'general'" />
        <TableDetail v-else />
      </div>
      <div class="card-body" v-if="getPageSummaryAlarm == 'Witel'">
        <TableWitel v-if="getTableSummaryAlarm == 'general'" />
        <TableDetail v-else />
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

// table
// import TableDetail from "./table/TableDetail.vue";
import TableDetail from "./table/SecondaryTableDetail.vue";
import TableNational from "./table/TableNational.vue";
import TableRegional from "./table/TableRegional.vue";
import TableWitel from "./table/TableWitel.vue";

export default {
  computed: {
    ...mapGetters([
      "getTableSummaryAlarm",
      "getPageSummaryAlarm",
      "getDetailSummaryAlarm",
      "getIdRegionalSummaryAlarm",
      "getIdWitelSummaryAlarm",
    ]),
  },
  watch: {
    getIdRegionalSummaryAlarm: function () {
      if (this.getIdRegionalSummaryAlarm == null) {
        this.$store.dispatch("setPageSummaryAlarm", "National");
        this.$store.dispatch("setTableSummaryAlarm", "general");
      } else {
        this.$store.dispatch("setPageSummaryAlarm", "Regional");
        this.$store.dispatch("setTableSummaryAlarm", "general");
      }
    },
    getIdWitelSummaryAlarm: function () {
      if (this.getIdWitelSummaryAlarm == null) {
        this.$store.dispatch("setPageSummaryAlarm", "Regional");
        this.$store.dispatch("setTableSummaryAlarm", "general");
      } else {
        this.$store.dispatch("setPageSummaryAlarm", "Witel");
        this.$store.dispatch("setTableSummaryAlarm", "general");
      }
    },
  },
  components: {
    TableDetail,
    TableNational,
    TableRegional,
    TableWitel,
  },
  methods: {
    backToBefore() {
      if (this.getTableSummaryAlarm == "detail") {
        this.$store.dispatch("setDetailSummaryAlarm", {});
        this.$store.dispatch("setTableSummaryAlarm", "general");
      }
    },
    getTableName() {
      let tableName = "Tabel Reporting Summary Alarm";
      if (this.getTableSummaryAlarm == "general") {
        tableName = `Tabel Reporting Summary Alarm ${this.getPageSummaryAlarm}`;
      } else if (this.getTableSummaryAlarm == "detail") {
        tableName = `Tabel Total Alert ${this.getDetailSummaryAlarm.name}`;
      }
      return tableName;
    },
    printToPdf() {
      window.print();
    },
  },
};
</script>

<style scoped>
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.wrap-print {
  display: flex;
  align-items: center;
}
</style>
