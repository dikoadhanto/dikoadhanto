<template>
  <div class="card card-custom card-stretch gutter-b">
    <!--begin::Header-->
    <div class="card-header border-0 py-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-dark">
          Buat Device RTU
        </span>
      </h3>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body mb-6 pt-2">
      <div class="row">
        <div class="col h-200" v-for="(item, i) in devicesRtu" :key="i">
          <div
            class="card rounded p-4 bg-warning h-150 clicked-card"
            @click="goTo(`/kalibrasi/RTU/addRuleRTU?vid=${item.id}`)"
          >
            <h3 class="my-auto text-center text-light">{{ item.name }}</h3>
          </div>
        </div>
      </div>
    </div>
    <!--end::Body-->
  </div>
</template>

<script>
export default {
  name: "MasterRTU",
  data() {
    return {
      devicesRtu: [
        {
          id: "RTU001",
          name: "RTU 001",
        },
        {
          id: "RTU002",
          name: "RTU 002",
        },
        {
          id: "RTU003",
          name: "RTU 003",
        },
      ],
    };
  },
  methods: {
    goTo(routes) {
      this.$router.push(routes);
    },
  },
};
</script>

<style scoped>
.h-150 {
  height: 150px;
}
.clicked-card:active {
  background-color: black !important;
}
</style>