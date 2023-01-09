<template>
  <perfect-scrollbar
    class="quick-search-wrapper scroll"
    style="max-height: 40vh; position: relative"
    v-bind:options="{ suppressScrollX: true }"
  >
    <div class="quick-search-result">
      <!--begin::Message-->
      <div v-if="data.length == 0" class="text-muted d-none">
        Data RTU tidak ditemukan.
      </div>
      <!--end::Message-->

      <template v-for="item in data">
        <!--begin::Section-->
        <div
          :key="item.id"
          class="font-weight-bolder text-uppercase mb-2 cursor-pointer text-dark text-hover-primary"
          @click="setDataRtu(item.id)"
        >
          {{ item.label }}
        </div>
      </template>
    </div>
  </perfect-scrollbar>
</template>

<script>
export default {
  name: "KTSearchResult",
  props: {
    data: Array,
  },
  methods: {
    setDataRtu(idRtu) {
      this.$router.push({
        name: "Detail RTU",
        params: { idRtu: idRtu },
      });
      this.$store.dispatch("setRtuId", idRtu);
    },
  },
};
</script>
