<template>
  <b-modal
    id="modal-informasi-rtu"
    size="lg"
    title="Informasi Rtu"
    @close="closeRtu"
    @hidden="closeRtu"
    hide-footer
  >
    <section v-if="isReady">
      <div class="container">
        <div class="mb-4 d-flex">
          <router-link
            :to="`/dashboard/table-view/${selectedRtuId}`"
            class="btn btn-success ml-auto"
            >TABLE VIEW</router-link
          >
        </div>
        <div class="row mb-2">
          <div class="col-md-6">
            <input
              type="text"
              class="form-control form-sm"
              value="NAMA RTU"
              readonly
            />
          </div>
          <div class="col-md-6">
            <input
              type="text"
              class="form-control form-sm"
              v-model="dataRtuId.name"
              readonly
            />
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-md-6">
            <input
              type="text"
              class="form-control form-sm"
              value="ORGANISASI"
              disabled
            />
          </div>
          <div class="col-md-6">
            <input
              type="text"
              class="form-control form-sm"
              v-model="dataRtuId.pic.organization"
              disabled
            />
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-md-6">
            <input
              type="text"
              class="form-control form-sm"
              value="LOKASI"
              readonly
            />
          </div>
          <div class="col-md-6">
            <input
              type="text"
              class="form-control form-sm"
              v-model="dataRtuId.location"
              readonly
            />
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-md-6">
            <input
              type="text"
              class="form-control form-sm"
              value="SNAME"
              disabled
            />
          </div>
          <div class="col-md-6">
            <input
              type="text"
              class="form-control form-sm"
              v-model="dataRtuId.sname"
              disabled
            />
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-md-6">
            <input
              type="text"
              class="form-control form-sm"
              value="PIC / NOMOR PONSEL"
              readonly
            />
          </div>
          <div class="col-md-6">
            <input
              type="text"
              class="form-control form-sm"
              :value="
                dataRtuId.pic.phone == null
                  ? `${dataRtuId.pic.name} / -`
                  : `${dataRtuId.pic.name} / ${dataRtuId.pic.phone}`
              "
              readonly
            />
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-md-6">
            <input
              type="text"
              class="form-control form-sm"
              value="TAGS"
              disabled
            />
          </div>
          <div class="col-md-6">
            <input
              type="text"
              class="form-control form-sm"
              v-model="dataRtuId.total_port"
              disabled
            />
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-md-6">
            <input
              type="text"
              class="form-control form-sm"
              value="ALAMAT"
              readonly
            />
          </div>
          <div class="col-md-6">
            <input
              type="text"
              class="form-control form-sm"
              v-model="dataRtuId.ip_address"
              readonly
            />
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-md-6">
            <input
              type="text"
              class="form-control form-sm"
              value="LATITUDE"
              disabled
            />
          </div>
          <div class="col-md-6">
            <input
              type="text"
              class="form-control form-sm"
              v-model="dataRtuId.latitude"
              disabled
            />
          </div>
        </div>
        <div class="row mb-5">
          <div class="col-md-6">
            <input
              type="text"
              class="form-control form-sm"
              value="LONGITUDE"
              readonly
            />
          </div>
          <div class="col-md-6">
            <input
              type="text"
              class="form-control form-sm"
              v-model="dataRtuId.longitude"
              readonly
            />
          </div>
        </div>
        <!-- location -->
        <div
          id="map-detail"
          style="height: 300px; width: 100%; border-radius: 10px"
        ></div>
      </div>
    </section>
    <section v-else>
      <div class="container-map"></div>
    </section>
  </b-modal>
</template>

<script>
import ApiService from "@/core/services/api.service";

export default {
  /* eslint-disable no-undef */
  props: ["isDetail", "selectedRtuId"],
  emits: ["hideDetail"],
  data() {
    return {
      isReady: false,
      dataRtuId: {},
    };
  },
  watch: {
    isDetail: function () {
      if (this.isDetail == true) {
        this.getDataRtu();
        setTimeout(() => {
          this.isReady = true;
        }, 500);
        setTimeout(() => {
          this.initMapDetail();
        }, 1000);
      }
    },
  },
  methods: {
    getDataRtu() {
      ApiService.get(
        `${process.env.VUE_APP_ROOT_API_4}`,
        `operation/rtu/${this.selectedRtuId}`
      )
        .then(({ data }) => {
          this.dataRtuId = data.result;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    initMapDetail() {
      var map = L.map("map-detail").setView(
        [this.dataRtuId.latitude, this.dataRtuId.longitude],
        8
      );
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker([this.dataRtuId.latitude, this.dataRtuId.longitude])
        .addTo(map)
        .bindTooltip(this.dataRtuId.name)
        .closeTooltip();
    },
    closeRtu() {
      this.$emit("hideDetail");
    },
  },
};
</script>

<style scoped>
.container-map {
  background-color: brown;
  border-radius: 10px;
  width: 100%;
  height: 300px;
}
</style>
