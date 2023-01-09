<template>
  <div class="card">
    <div class="card-header">
      <div class="row align-items-center">
        <div class="btn btn-secondary mr-2" @click="backToPreviousPage">
          <b-icon icon="arrow-left" aria-hidden="true"></b-icon>
          Back
        </div>
        <div class="font-weight-bolder">
          Table View Summary {{ dataRtu.name }}
        </div>
      </div>
    </div>
    <div class="card-header pb-0">
      <div class="d-flex">
        <div
          class="mr-6 pb-3 px-2 cursor-pointer"
          :class="{ active: dataActive == 'rtu' }"
          @click="dataActive = 'rtu'"
        >
          RTU
        </div>
        <div
          class="mr-6 pb-3 px-2 cursor-pointer"
          :class="{ active: dataActive == 'analog' }"
          @click="dataActive = 'analog'"
        >
          Port Analog
        </div>
        <div
          class="mr-6 pb-3 px-2 cursor-pointer"
          :class="{ active: dataActive == 'digital' }"
          @click="dataActive = 'digital'"
        >
          Port Digital
        </div>
      </div>
    </div>
    <div class="card-body">
      <RtuComp :dataRtuId="dataRtu" v-if="dataActive == 'rtu'" />
      <PortAnalog v-if="dataActive == 'analog'" />
      <PortDigital v-if="dataActive == 'digital'" />
    </div>
  </div>
</template>

<script>
import ApiService from "@/core/services/api.service";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

import RtuComp from "@/view/pages/dashboard/operational/content-detail/RTU.vue";
import PortAnalog from "@/view/pages/dashboard/operational/content-detail/PortAnalog.vue";
import PortDigital from "@/view/pages/dashboard/operational/content-detail/PortDigital.vue";

export default {
  data() {
    return {
      dataRtu: {},
      dataActive: "rtu",
    };
  },
  components: {
    RtuComp,
    PortAnalog,
    PortDigital,
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Dashboard", subtitle: "Dashboard TIOC" },
    ]);
    this.getDataRtu();
  },
  methods: {
    getDataRtu() {
      const id = this.$route.params.idRtu;

      ApiService.get(process.env.VUE_APP_ROOT_API_4, `operation/rtu/${id}`)
        .then(({ data }) => {
          this.dataRtu = data.result;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    backToPreviousPage() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.active {
  color: red;
  border-bottom: 2px solid red;
}
</style>
