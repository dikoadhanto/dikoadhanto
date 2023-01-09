<template>
  <section id="dashboard-tioc">
    <IconCount class="mb-5" />
    <TableLocation />
  </section>
</template>

<script>
import IconCount from "./IconCount.vue";
import TableLocation from "./TableLocation.vue";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

export default {
  name: "DashboardTioc",
  components: {
    IconCount,
    TableLocation,
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Dashboard", subtitle: "Dashboard TIOC" },
    ]);
    this.writeNewTitle("TIOC");
  },
};
</script>
