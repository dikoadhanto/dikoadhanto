<template>
  <thead class="text-center">
    <tr v-for="(item, i) in tableConfig" :key="i">
      <th
        v-for="(child, j) in item"
        :key="j"
        scope="col"
        :rowspan="`${child.rowSpan ? child.rowSpan : ''}`"
        :colspan="`${child.colSpan ? child.colSpan : ''}`"
      >
        {{ child.label }}
      </th>
    </tr>
  </thead>
</template>

<script>
import { STATE_HEAD_TABLE_LIST_MD } from "./state.head";

export default {
  name: "HeadTableListMD",
  data() {
    return {
      tableConfig: STATE_HEAD_TABLE_LIST_MD.container,
    };
  },
  props: {
    propsHeadConfig: String,
  },
  watch: {
    propsHeadConfig: function () {
      this.tableConfig = this[`${this.propsHeadConfig}`];
    },
  },
};
</script>
