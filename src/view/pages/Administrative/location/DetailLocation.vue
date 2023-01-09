<template>
  <b-modal
    id="detail-data-location"
    title="Detail Lokasi"
    size="lg"
    scrollable
    hide-footer
    centered
  >
    <form>
      <div class="card">
        <b-row align-v="center" class="m-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">REGIONAL :</h6>
          </b-col>
          <b-col cols="9">
            <input
              class="form-control form-control-solid empty"
              v-model="regional"
              disabled
            />
          </b-col>
        </b-row>

        <b-row align-v="center" class="mx-5 mb-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">WITEL :</h6>
          </b-col>
          <b-col cols="9">
            <input
              class="form-control form-control-solid empty"
              v-model="witel"
              disabled
            />
          </b-col>
        </b-row>

        <b-row align-v="center" class="mx-5 mb-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">DATEL :</h6>
          </b-col>
          <b-col cols="9">
            <input
              class="form-control form-control-solid empty"
              v-model="datel"
              disabled
            />
          </b-col>
        </b-row>
      </div>

      <div class="card my-5">
        <b-row align-v="center" class="m-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">LOKASI :</h6>
          </b-col>
          <b-col cols="9">
            <input
              class="form-control form-control-solid empty"
              v-model="location"
              disabled
            />
          </b-col>
        </b-row>

        <b-row align-v="center" class="mx-5 mb-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">SNAME :</h6>
          </b-col>
          <b-col cols="9">
            <input
              class="form-control form-control-solid empty"
              v-model="sname"
              disabled
            />
          </b-col>
        </b-row>

        <b-row align-v="center" class="mx-5 mb-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">PIC :</h6>
          </b-col>
          <b-col cols="9">
            <input
              class="form-control form-control-solid empty"
              v-model="pic"
              disabled
            />
          </b-col>
        </b-row>

        <b-row align-v="center" class="mx-5 mb-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">TAGS :</h6>
          </b-col>
          <b-col cols="9">
            <input
              class="form-control form-control-solid empty"
              v-model="tags"
              disabled
            />
          </b-col>
        </b-row>

        <b-row align-v="center" class="mx-5 mb-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">ALAMAT :</h6>
          </b-col>
          <b-col cols="9">
            <input
              v-model="address"
              class="form-control form-control-solid"
              disabled
            />
          </b-col>
        </b-row>
      </div>

      <div class="card my-5">
        <b-row align-v="center" class="m-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">LATITUDE :</h6>
          </b-col>
          <b-col cols="9">
            <input
              v-model="latitude"
              class="form-control form-control-solid"
              disabled
            />
          </b-col>
        </b-row>

        <b-row align-v="center" class="mx-5 mb-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">LONGITUDE :</h6>
          </b-col>
          <b-col cols="9">
            <input
              v-model="longitude"
              class="form-control form-control-solid"
              disabled
            />
          </b-col>
        </b-row>

        <div id="map"></div>
      </div>
    </form>
  </b-modal>
</template>

<script>
import L from "leaflet";

export default {
  data() {
    return {
      regional: "",
      witel: "",
      datel: "",
      location: "",
      sname: "",
      pic: "",
      tags: "",
      address: "",
      latitude: "",
      longitude: "",
      map: null,
      marker: null,
    };
  },
  methods: {
    // initialize map
    initMap() {
      this.map = L.map("map").setView([this.latitude, this.longitude], 8);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      this.marker = L.marker([this.latitude, this.longitude], {
        draggable: false,
      }).addTo(this.map);
    },

    // get data location to set on detail location
    setDataLocation(data) {
      this.regional = data.regional;
      this.witel = data.witel;
      this.datel = data.datel;
      this.location = data.name;
      this.sname = data.sname;
      this.pic = data.pic_name === null ? "-" : data.pic_name;
      this.tags =
        data.tags == null
          ? null
          : data.tags.map((item) => item.name).join(", ");
      this.address = data.address;
      this.latitude = data.latitude === null ? "-" : data.latitude;
      this.longitude = data.longitude === null ? "-" : data.longitude;
    },
  },
};
</script>

<style scoped>
#map {
  height: 300px;
  margin: 0 15px 15px 15px;
  border-radius: 5px;
}
</style>
