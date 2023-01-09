<template>
  <div class="d-flex align-items-center mr-2">
    <div
      class="legend-icon text-light text-center font-weight-bold"
      :style="`background-color: ${color}`"
    >
      {{ dataLegend.count }}
    </div>
    {{ dataLegend.status }}
  </div>
</template>

<script>
export default {
  props: ["dataLegend", "color"],
};
</script>

<style scoped>
.legend-icon {
  width: 50px;
  height: 20px;
  border-radius: 5px;
  margin: 0 5px 0 15px;
  font-size: 12px;
}
</style>
