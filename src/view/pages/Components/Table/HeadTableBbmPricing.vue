<template>
  <thead class="text-center">
    <tr v-for="(item, i) in headBbmPricing" :key="i">
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
import { STATE_HEAD_TABLE_BBM_PRICING } from "./state.head";

export default {
  name: "HeadTableBbmPricing",
  data() {
    return {
      headBbmPricing: STATE_HEAD_TABLE_BBM_PRICING.container,
    };
  },
  props: {
    propsHeadConfig: String,
  },
};
</script>
