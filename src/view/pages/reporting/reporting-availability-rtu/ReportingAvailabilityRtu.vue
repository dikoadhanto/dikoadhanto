<template>
  <section id="report-availibility-rtu">
    <card-filter />
    <table-availability />
  </section>
</template>

<script>
import CardFilter from "./CardFilter.vue";
import TableAvailability from "./TableAvailability.vue";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

export default {
  name: "ReportingAvailabilityRtu",
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Reporting", subtitle: "Reporting Availability RTU" },
    ]);
    this.writeNewTitle("Reporting Availability RTU");
  },
  components: {
    CardFilter,
    TableAvailability,
  },
};
</script>
