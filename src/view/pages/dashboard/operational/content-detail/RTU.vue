<template>
  <section>
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
          value="DESKRIPSI"
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
          :value="`${dataPic.name} / ${dataPic.phone ? dataPic.phone : '-'}`"
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
    <div id="map" style="height: 300px; width: 100%; border-radius: 10px"></div>
  </section>
</template>

<script>
export default {
  /* eslint-disable no-undef */
  props: ["dataRtuId"],
  data() {
    return {
      dataPic: {},
    };
  },
  mounted() {
    setTimeout(() => {
      this.initMap();
      this.dataPic = this.dataRtuId.pic;
    }, 1000);
  },
  methods: {
    initMap() {
      let latitude = this.dataRtuId.latitude ?? "-6.2299747";
      let longitude = this.dataRtuId.longitude ?? "106.8164516";
      var map = L.map("map").setView([latitude, longitude], 10);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker([latitude, longitude])
        .addTo(map)
        .bindTooltip(this.dataRtuId.name)
        .closeTooltip();
    },
  },
  beforeDestroy() {
    this.dataPic = {};
  },
};
</script>
