<template>
  <thead class="text-center">
    <tr v-for="(item, i) in headTags" :key="i">
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
import { STATE_HEAD_TABLE_TAGS } from "./state.head";

export default {
  name: "HeadTableTags",
  data() {
    return {
      headTags: STATE_HEAD_TABLE_TAGS.container,
    };
  },
  props: {
    propsHeadConfig: String,
  },
};
</script>
