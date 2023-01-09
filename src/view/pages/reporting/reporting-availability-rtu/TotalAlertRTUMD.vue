<template>
  <section id="table-alert">
    <CardFilter />
    <div v-if="$route.params.typeAlert == 'RTU'">
      <TableTotalAlertRTU />
    </div>
    <div v-else>
      <TableTotalAlertMD />
    </div>
  </section>
</template>

<script>
import CardFilter from "./CardFilter.vue";
import TableTotalAlertRTU from "./TableTotalAlertRTU.vue";
import TableTotalAlertMD from "./TableTotalAlertMD.vue";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

export default {
  name: "TotalAlert",
  components: {
    CardFilter,
    TableTotalAlertRTU,
    TableTotalAlertMD,
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Reporting", subtitle: "Reporting Availability RTU" },
    ]);
  },
  data() {
    return {};
  },
  watch: {},
  methods: {},
};
</script>

<style scoped></style>
