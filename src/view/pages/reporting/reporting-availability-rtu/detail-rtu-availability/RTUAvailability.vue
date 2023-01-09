<template>
  <section>
    <section v-if="dataRtuId.name">
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
            value="DESKRIPSI RTU"
            disabled
          />
        </div>
        <div class="col-md-6">
          <input
            type="text"
            class="form-control form-sm"
            v-model="dataRtuId.description"
            disabled
          />
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-md-6">
          <input
            type="text"
            class="form-control form-sm"
            value="IP ADDRESS RTU"
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
            value="LOKASI"
            disabled
          />
        </div>
        <div class="col-md-6">
          <input
            type="text"
            class="form-control form-sm"
            v-model="dataRtuId.location"
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
            :value="`${dataRtuId.pic.name} / ${
              dataRtuId.pic.phone ? dataRtuId.pic.phone : '-'
            }`"
            readonly
          />
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-md-6">
          <input
            type="text"
            class="form-control form-sm"
            value="TOTAL PORT"
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

      <!-- location -->
      <div class="loc my-5">LOKASI:</div>
      <div
        id="map"
        style="height: 300px; width: 100%; border-radius: 10px"
      ></div>
    </section>
    <section v-else>Wait ...</section>
  </section>
</template>

<script>
export default {
  /* eslint-disable no-undef */
  props: ["dataRtuId"],
  mounted() {
    setTimeout(() => {
      this.initMap();
    }, 1000);
  },
  methods: {
    initMap() {
      var map = L.map("map").setView(
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
  },
};
</script>
