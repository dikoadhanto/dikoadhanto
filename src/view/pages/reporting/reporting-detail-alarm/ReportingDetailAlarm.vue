<template>
  <div>
    <CardFilter />
    <TableReportingDetailAlarm />
  </div>
</template>

<script>
import CardFilter from "./CardFilter.vue";
import TableReportingDetailAlarm from "./TableReportingDetailAlarm.vue";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

export default {
  name: "ReportingDetailAlarm",
  components: {
    CardFilter,
    TableReportingDetailAlarm,
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Reporting", subtitle: "Reporting Detail Alarm" },
    ]);
    this.writeNewTitle("Reporting Detail Alarm");
  },
};
</script>
