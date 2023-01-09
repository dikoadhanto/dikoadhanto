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
    <div v-if="headTbAlarm">
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
    </div>
  </thead>
</template>

<script>
import {
  STATE_HEAD_TABLE_LOCATION,
  STATE_HEAD_TABLE_WITEL,
  STATE_HEAD_TABLE_REGIONAL,
  STATE_HEAD_TABLE_ALARM,
} from "./state.head";
export default {
  name: "HeadTable",
  data() {
    return {
      tableConfig: STATE_HEAD_TABLE_REGIONAL.container,
      headRegional: STATE_HEAD_TABLE_REGIONAL.container,
      headWitel: STATE_HEAD_TABLE_WITEL.container,
      headLocation: STATE_HEAD_TABLE_LOCATION.container,
      headAlarm: STATE_HEAD_TABLE_ALARM.container,
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
