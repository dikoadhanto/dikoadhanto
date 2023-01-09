<template>
  <div>
    <CardFilter />
    <GraphReportingSummaryAlarm />
    <TableReportingSummaryAlarm />
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import CardFilter from "./CardFilter.vue";
import GraphReportingSummaryAlarm from "./GraphReportingSummaryAlarm.vue";
import TableReportingSummaryAlarm from "./TableReportingSummaryAlarm.vue";

export default {
  name: "ReportingSummaryAlarm",
  components: {
    CardFilter,
    GraphReportingSummaryAlarm,
    TableReportingSummaryAlarm,
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Reporting", subtitle: "Reporting Summary Alarm" },
    ]);
    this.writeNewTitle("Reporting Summary Alarm");
  },
};
</script>
