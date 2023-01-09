<template>
  <div>
    <CardFilter />
    <Graphic />
    <TableMonitoring />
  </div>
</template>

<script>
import Graphic from "./components/Graphic";
import TableMonitoring from "./components/Table";
import CardFilter from "./components/CardFilter";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

export default {
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Dashboard", subtitle: "BBM Monitoring" },
    ]);
  },
  components: {
    Graphic,
    CardFilter,
    TableMonitoring,
  },
};
</script>
