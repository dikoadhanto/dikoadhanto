<template>
  <b-modal
    id="details-device-type"
    title="Detail Device Type"
    size="lg"
    scrollable
    hide-footer
    centered
  >
    <form>
      <b-row align-v="center" class="mb-5">
        <!-- Input Nama -->
        <b-col cols="3">
          <h6>Nama Lokasi :</h6>
        </b-col>
        <b-col cols="9">
          <div class="form-group mb-0">
            <input
              type="text"
              class="form-control form-control-solid"
              v-model="dataDeviceType.locs_name"
              disabled
            />
          </div>
        </b-col>
      </b-row>

      <!-- Input Deskripsi -->
      <b-row align-v="center" class="mb-5">
        <b-col cols="3">
          <h6>SNAME RTU :</h6>
        </b-col>
        <b-col cols="9">
          <div class="form-group mb-0">
            <input
              type="text"
              class="form-control form-control-solid"
              v-model="dataDeviceType.sname"
              disabled
            />
          </div>
        </b-col>
      </b-row>

      <b-row align-v="center" class="mb-5">
        <b-col cols="3">
          <h6>Device Name :</h6>
        </b-col>
        <b-col cols="9">
          <div class="form-group mb-0">
            <input
              type="text"
              class="form-control form-control-solid"
              v-model="dataDeviceType.device_name"
              disabled
            />
          </div>
        </b-col>
      </b-row>
      <b-row align-v="center" class="mb-5">
        <b-col cols="3">
          <h6>No Port :</h6>
        </b-col>
        <b-col cols="9">
          <div class="form-group mb-0">
            <input
              type="text"
              class="form-control form-control-solid"
              v-model="dataDeviceType.no_port"
              disabled
            />
          </div>
        </b-col>
      </b-row>
    </form>
  </b-modal>
</template>

<script>
import ApiService from "@/core/services/api.service";

export default {
  props: ["getIdDevice"],
  emits: ["hiddenDetailDeviceType"],

  data() {
    return {
      dataDeviceType: [],
    };
  },
  watch: {
    getIdDevice: function () {
      if (this.getIdDevice != null) {
        this.getData();
      }
    },
  },
  methods: {
    getData() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_2,
        `detail/rtuport-alarm/${this.getIdDevice}`
      )
        .then(({ data }) => {
          this.dataDeviceType = data.result;
        })
        .catch((e) => {
          console.log(e.response, "error response bree...");
        });
    },
  },
};
</script>

<style scoped>
.required-icon {
  color: #c70000;
}

.form-control {
  background-color: #f4f8fa;
}
</style>
