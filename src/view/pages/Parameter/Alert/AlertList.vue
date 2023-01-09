<template>
  <div>ALERT MANAGEMENT PAGE</div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

export default {
  name: "AlertList",
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Parameter", subtitle: "Alert Management" },
    ]);
  },
};
</script>
