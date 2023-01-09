<template>
  <section id="rtu-operation">
    <!-- card filters -->
    <CardFilter />

    <!-- card-rtu -->
    <CardRtu />
  </section>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

// components
import CardRtu from "./CardRtu.vue";
import CardFilter from "./CardFilter.vue";

export default {
  name: "Operational",
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Dashboard", subtitle: "RTU Operation (Operational)" },
    ]);
    this.writeNewTitle("RTU Operation");
  },
  components: {
    CardRtu,
    CardFilter,
  },
};
</script>
