<template>
  <b-modal
    id="update-data-location"
    title="Update Lokasi"
    size="lg"
    scrollable
    hide-footer
    centered
  >
    <form @submit.prevent="updateDataLocation">
      <div class="card">
        <b-row align-v="center" class="m-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">REGIONAL :</h6>
          </b-col>
          <b-col cols="9">
            <select
              class="form-control form-control-solid empty"
              v-model="selectedRegional"
              disabled
            >
              <option value="" selected disabled hidden>Pilih regional</option>
              <option
                v-for="(data, i) in dataRegional"
                :key="i"
                :value="data.id"
              >
                {{ data.name }}
              </option>
            </select>
            <i class="fa fa-chevron-down"></i>
          </b-col>
        </b-row>

        <b-row align-v="center" class="mx-5 mb-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">WITEL :</h6>
          </b-col>
          <b-col cols="9">
            <select
              class="form-control form-control-solid empty"
              v-model="selectedWitel"
              disabled
            >
              <option value="" selected disabled hidden>Pilih witel</option>
              <option v-for="(data, i) in dataWitel" :key="i" :value="data.id">
                {{ data.name }}
              </option>
            </select>
            <i class="fa fa-chevron-down"></i>
          </b-col>
        </b-row>

        <b-row align-v="center" class="mx-5 mb-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">DATEL :</h6>
          </b-col>
          <b-col cols="9">
            <select
              class="form-control form-control-solid empty"
              v-model="selectedDatel"
              disabled
            >
              <option value="" selected disabled hidden>Pilih datel</option>
              <option v-for="(data, i) in dataDatel" :key="i" :value="data.id">
                {{ data.name }}
              </option>
            </select>
            <i class="fa fa-chevron-down"></i>
          </b-col>
        </b-row>
      </div>

      <div class="card my-5">
        <b-row align-v="center" class="m-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">
              LOKASI&nbsp;<span class="required">*</span>&nbsp;:
            </h6>
          </b-col>
          <b-col cols="9">
            <input
              type="text"
              class="form-control form-control-solid"
              v-model="location"
            />
          </b-col>
        </b-row>

        <b-row align-v="center" class="mx-5 mb-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">SNAME <small>(max. 3 huruf)</small> :</h6>
          </b-col>
          <b-col cols="9">
            <input
              type="text"
              class="form-control form-control-solid empty"
              v-model="sname"
            />
          </b-col>
        </b-row>

        <b-row align-v="center" class="mx-5 mb-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">PIC :</h6>
          </b-col>
          <b-col cols="9">
            <select class="form-control form-control-solid empty" v-model="pic">
              <option value="" selected disabled hidden>Pilih PIC</option>
              <option
                v-for="(data, i) in dataPic"
                :key="i"
                :value="data.users_id"
              >
                {{ data.name }}
              </option>
            </select>
            <i class="fa fa-chevron-down"></i>
          </b-col>
        </b-row>

        <b-row align-v="center" class="mx-5 mb-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">TAGS :</h6>
          </b-col>
          <b-col cols="9">
            <Treeselect
              v-model="selectedTags"
              :options="dataTags"
              placeholder="Pilih tags"
              :multiple="true"
            />
          </b-col>
        </b-row>

        <b-row align-v="center" class="mx-5 mb-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">ALAMAT :</h6>
          </b-col>
          <b-col cols="9">
            <input
              type="text"
              v-model="address"
              class="form-control form-control-solid"
              placeholder="Masukkan alamat..."
            />
          </b-col>
        </b-row>
      </div>

      <div class="card my-5">
        <h6 class="ml-5 mt-5">Klik pada map untuk menentukan koordinat</h6>
        <div id="map"></div>
        <b-row align-v="center" class="m-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">LATITUDE :</h6>
          </b-col>
          <b-col cols="9">
            <input
              type="text"
              v-model="latitude"
              class="form-control form-control-solid"
            />
          </b-col>
        </b-row>
        <b-row align-v="center" class="m-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">LONGITUDE :</h6>
          </b-col>
          <b-col cols="9">
            <input
              type="text"
              v-model="longitude"
              class="form-control form-control-solid"
            />
          </b-col>
        </b-row>
      </div>

      <b-row>
        <b-col cols="auto" class="ml-auto">
          <button type="submit" class="btn btn-sm btn-success mt-5">
            Simpan &nbsp;
            <span><i class="fas fa-chevron-right icon-sm"></i></span>
          </button>
        </b-col>
      </b-row>
    </form>
  </b-modal>
</template>

<script>
/* eslint-disable no-unused-vars */
import L from "leaflet";
import { SearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import ApiService from "@/core/services/api.service";
import Swal from "sweetalert2";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  components: {
    Treeselect,
  },
  data() {
    return {
      dataRegional: [],
      selectedRegional: "",
      dataWitel: [],
      selectedWitel: "",
      dataDatel: [],
      selectedDatel: "",
      location: "",
      sname: "",
      pic: "",
      dataPic: [],
      selectedTags: [],
      dataTags: [],
      tags: "",
      address: "",
      latitude: "",
      longitude: "",
      locationSelected: "",
      marker: null,
      map: null,
    };
  },
  mounted() {
    this.getDataPic();
    this.getDataTags();
  },
  watch: {
    selectedRegional: function () {
      if (this.selectedRegional !== "" && this.dataRegional.length) {
        this.dataWitel = this.dataRegional.find(
          (item) => item.id === this.selectedRegional
        ).organizations;
      }
    },
    selectedWitel: function () {
      if (this.selectedWitel !== "" && this.dataWitel.length) {
        this.dataDatel = this.dataWitel.find(
          (item) => item.id === this.selectedWitel
        ).organizations;
      }
    },
  },
  methods: {
    // get data location to set on update form
    setDataLocation(data) {
      this.locationSelected = data.id;
      this.selectedRegional = data.id_regional;
      this.selectedWitel = data.id_witel;
      this.selectedDatel = data.id_datel;
      this.location = data.name;
      this.sname = data.sname;
      this.pic = data.pic === null ? "" : data.pic;
      this.selectedTags =
        data.tags === [] ? data.tags : data.tags.map((item) => item.id);
      this.address = data.address;
      this.latitude = data.latitude === "null" ? "-" : data.latitude;
      this.longitude = data.longitude === "null" ? "-" : data.longitude;
    },

    // initialize map
    initMap() {
      let rememberLat = this.latitude;
      let rememberLng = this.longitude;

      this.map = L.map("map").setView([this.latitude, this.longitude], 10);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      const searchControl = new SearchControl({
        notFoundMessage: "Maaf, alamat tidak ditemukan.",
        position: "topright",
        autoComplete: true,
        keepResult: true,
        maxSuggestions: 5,
        marker: {
          icon: new L.Icon.Default(),
          draggable: false,
        },
        maxMarkers: 1,
        retainZoomLevel: false,
        resultFormat: ({ result }) => result.label,
        searchLabel: "Cari alamat",
        animateZoom: true,
        updateMap: true,
        style: "bar",
        showMarker: false,
        provider: new OpenStreetMapProvider({
          params: {
            "accept-language": "id",
            countrycodes: "id",
            addressdetails: 1,
          },
        }),
      });
      this.map.addControl(searchControl);

      this.map.invalidateSize();

      this.marker = L.marker([rememberLat, rememberLng], {
        draggable: true,
      }).addTo(this.map);
      const vm = this;
      this.marker.on("dragend", function (e) {
        vm.marker.getLatLng().lat, vm.marker.getLatLng().lng;
        vm.updateLatLng(vm.marker.getLatLng().lat, vm.marker.getLatLng().lng);
      });

      this.map.on("geosearch/showlocation", function (e) {
        vm.marker.getLatLng().lat, vm.marker.getLatLng().lng;
      });

      this.map.on("click", function (e) {
        vm.marker.setLatLng(e.latlng);
        vm.updateLatLng(e.latlng.lat, e.latlng.lng);
      });
    },

    // update latitude and longitude
    updateLatLng(lat, lng, reverse) {
      if (reverse) {
        this.marker.getLatLng([lat, lng]);
        this.map.panTo([lat, lng]);
      } else {
        this.latitude = this.marker.getLatLng().lat;
        this.longitude = this.marker.getLatLng().lng;
        this.map.panTo([lat, lng]);
      }
    },

    // get data organization
    getDataOrganization() {
      ApiService.get(
        `${process.env.VUE_APP_ROOT_API_3}/organizations/hierarchy`
      )
        .then(({ data }) => {
          this.dataRegional = data.result.organizations[0].organizations;
          this.dataWitel = this.dataRegional.find(
            (item) => item.id === this.selectedRegional
          ).organizations;
          this.dataDatel = this.dataWitel.find(
            (item) => item.id === this.selectedWitel
          ).organizations;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },

    // get data pic
    getDataPic() {
      ApiService.get(`${process.env.VUE_APP_ROOT_API_1}/administrative/users`)
        .then(({ data }) => {
          this.dataPic = data.result.payload;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },

    // get data tags
    getDataTags() {
      ApiService.get(`${process.env.VUE_APP_ROOT_API_3}/tags`).then(
        ({ data }) => {
          this.dataTags = data.result.tags.map((item) => ({
            id: item.id,
            label: item.name,
          }));
        }
      );
    },

    // submit form for update location
    updateDataLocation(data) {
      if (this.location === "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Nama Lokasi tidak boleh kosong!",
        });
      } else if (this.address === "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Alamat tidak boleh kosong!",
        });
      } else if (this.sname.length > 3) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Sname tidak boleh lebih dari 3 karakter",
        });
      } else {
        let dataLocation = {
          name: this.location,
          sname: this.sname,
          organizationId: this.selectedDatel,
          address: this.address,
          pic: this.pic,
          tagsId: this.selectedTags,
          latitude: this.latitude.toString(),
          longitude: this.longitude.toString(),
        };
        ApiService.put(
          `${process.env.VUE_APP_ROOT_API_3}/locations/${this.locationSelected}`,
          dataLocation
        )
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Data Lokasi berhasil diubah",
            }).then((result) => {
              if (result.isConfirmed) {
                this.$bvModal.hide("update-data-location");
                this.$emit("getAllDataLocation");
              }
            });
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    },
  },
};
</script>

<style scoped>
/* mandatory icon */
.required {
  content: "*";
  color: red;
}

/* icon for dropdown */
select + i.fa {
  float: right;
  margin-top: -31px;
  margin-right: 15px;
  /* this is so when you click on the chevron, your click actually goes on the dropdown menu */
  pointer-events: none;
  /* everything after this is just to cover up the original arrow */
  /* (for browsers that don't support the syntax used above) */
  padding: 5px;
}

/* map */
#map {
  height: 300px;
  margin: 0 15px 15px 15px;
  border-radius: 5px;
}
</style>
