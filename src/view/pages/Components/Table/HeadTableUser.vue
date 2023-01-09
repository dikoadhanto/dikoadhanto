<template>
  <thead class="text-center">
    <tr v-for="(item, i) in headUser" :key="i">
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
import { STATE_HEAD_TABLE_USER } from './state.head'

export default {
  name: 'HeadTableUser',
  data() {
    return {
      headUser: STATE_HEAD_TABLE_USER.container
    }
  },
  props: {
    propsHeadConfig: String
  }
}
</script>
