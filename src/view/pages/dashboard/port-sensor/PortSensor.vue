<template>
  <section id="port-sensor">
    <CardFilter />
    <TablePort />
  </section>
</template>

<script>
import TablePort from "./TablePort.vue";
import CardFilter from "./CardFilter.vue";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

export default {
  components: {
    TablePort,
    CardFilter,
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Dashboard", subtitle: "Port Sensor Table" },
    ]);
    this.writeNewTitle("Port Sensor Table");
  },
};
</script>
