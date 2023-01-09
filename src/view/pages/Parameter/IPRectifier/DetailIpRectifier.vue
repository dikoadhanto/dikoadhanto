<template>
  <b-modal
    ref="detail-iprectifier"
    id="detail-iprectifier"
    title="Detail IP Rectifier"
    size="lg"
    scrollable
    hide-footer
    centered
  >
    <form @submit.prevent="">
      <b-row align-v="center" class="mb-5">
        <b-col cols="3">
          <h6>NAMA RTU :</h6>
        </b-col>
        <b-col cols="9">
          <div class="form-group mb-0">
            <input
              type="text"
              class="form-control form-control-solid"
              v-model="rtuId"
              disabled
            />
          </div>
        </b-col>
      </b-row>

      <b-row align-v="center" class="mb-5">
        <b-col cols="3">
          <h6>NAMA RECTIFIER :</h6>
        </b-col>
        <b-col cols="9">
          <div class="form-group mb-0">
            <input
              type="text"
              class="form-control form-control-solid"
              v-model="namaRectifier"
              disabled
            />
          </div>
        </b-col>
      </b-row>

      <b-row align-v="center" class="mb-5">
        <b-col cols="3">
          <h6>IP RECTIFIER :</h6>
        </b-col>
        <b-col cols="9">
          <div class="form-group mb-0">
            <input
              type="text"
              class="form-control form-control-solid"
              v-model="ipRectifier"
              disabled
            />
          </div>
        </b-col>
      </b-row>
    </form>
  </b-modal>
</template>
<script>
// import ApiService from "@/core/services/api.service";

export default {
  name: "DetailIpRectifier",
  data() {
    return {
      rtuId: "",
      namaRectifier: "",
      ipRectifier: "",
    };
  },
  methods: {
    detailIpRectifier(data) {
      this.rtuId = data.rtu_name;
      this.namaRectifier = data.name;
      this.ipRectifier = data.ip_address;
    },
  },
};
</script>

<style scoped>
.required-icon {
  color: red;
}
</style>
