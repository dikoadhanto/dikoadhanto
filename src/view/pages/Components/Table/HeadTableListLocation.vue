<template>
  <thead class="text-center">
    <tr v-for="(item, i) in headListLocation" :key="i">
      <th
        v-for="(child, j) in item"
        :key="j"
        :rowspan="`${child.rowSpan ? child.rowSpan : ''}`"
        :colspan="`${child.colSpan ? child.colSpan : ''}`"
      >
        {{ child.label }}
      </th>
    </tr>
  </thead>
</template>

<script>
import { STATE_HEAD_TABLE_LIST_LOCATION } from "./state.head";

export default {
  name: "HeadTableListLocation",
  data() {
    return {
      headListLocation: STATE_HEAD_TABLE_LIST_LOCATION.container,
    };
  },
  props: {
    propsHeadConfig: String,
  },
};
</script>

<style scoped>
table {
  table-layout: fixed;
  word-wrap: break-word;
}
</style>
