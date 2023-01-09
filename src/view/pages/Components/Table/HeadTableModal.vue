<template>
  <thead class="text-center">
    <tr v-for="(item, i) in tableConfig" :key="i">
      <th
        v-for="(child, iChild) in item"
        :key="iChild"
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
import { STATE_HEAD_TABLE_ALARM } from "./state.head";
export default {
  name: "HeadTableModal",
  data() {
    return {
      tableConfig: STATE_HEAD_TABLE_ALARM.container,
    };
  },
  props: {
    propsHeadConfig: String,
  },
  watch: {
    propsHeadConfig: function () {},
  },
};
</script>
