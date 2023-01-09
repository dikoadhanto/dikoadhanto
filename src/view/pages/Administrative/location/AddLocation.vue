<template>
  <b-modal
    id="add-location"
    title="Tambah Lokasi"
    size="lg"
    scrollable
    hide-footer
    centered
    @close="closeAdd"
    @cancel="closeAdd"
    @hidden="closeAdd"
  >
    <form ref="addLocationForm" @submit.prevent="addDataLocation">
      <div class="card">
        <b-row align-v="center" class="m-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">REGIONAL :</h6>
          </b-col>
          <b-col cols="9">
            <treeselect
              noOptionsText="Data tidak ada"
              noResultsText="Regional tidak ditemukan"
              :options="dataRegional"
              placeholder="Pilih regional"
              :normalizer="normalizer"
              :clear-on-select="true"
              v-model="selectedRegional"
            ></treeselect>
          </b-col>
        </b-row>

        <b-row align-v="center" class="mx-5 mb-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">WITEL :</h6>
          </b-col>
          <b-col cols="9">
            <treeselect
              noOptionsText="Data tidak ada"
              noResultsText="Witel tidak ditemukan"
              :options="dataWitel"
              placeholder="Pilih witel"
              :normalizer="normalizer"
              :clear-on-select="true"
              v-model="selectedWitel"
            ></treeselect>
          </b-col>
        </b-row>

        <b-row align-v="center" class="mx-5 mb-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">DATEL :</h6>
          </b-col>
          <b-col cols="9">
            <treeselect
              noOptionsText="Data tidak ada"
              noResultsText="Datel tidak ditemukan"
              :options="dataDatel"
              placeholder="Pilih datel"
              :normalizer="normalizer"
              :clear-on-select="true"
              v-model="selectedDatel"
            ></treeselect>
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
              class="form-control form-control-solid empty"
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
            <treeselect
              noOptionsText="Data tidak ada"
              noResultsText="PIC tidak ditemukan"
              :options="dataPic"
              placeholder="Pilih PIC"
              :normalizer="normalizerPic"
              :clear-on-select="true"
              v-model="pic"
            ></treeselect>
            <!-- <select class="form-control form-control-solid empty" v-model="pic">
              <option value="" selected disabled hidden>Pilih PIC</option>
              <option
                v-for="(data, i) in dataPic"
                :key="i"
                :value="data.users_id"
              >
                {{ data.name }}
              </option>
            </select>
            <i class="fa fa-chevron-down"></i> -->
          </b-col>
        </b-row>

        <b-row align-v="center" class="mx-5 mb-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">TAGS :</h6>
          </b-col>
          <b-col cols="9">
            <Treeselect
              style="background: f3f6f9"
              v-model="selectedTags"
              placeholder="Pilih tags"
              :options="dataTags"
              node-label-prop="name"
              :multiple="true"
            />
          </b-col>
        </b-row>

        <b-row align-v="center" class="mx-5 mb-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">
              ALAMAT&nbsp;<span class="required">*</span>&nbsp;:
            </h6>
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
  props: ["isAdd"],
  emits: ["closeAdd"],
  data() {
    return {
      dataRegional: [],
      selectedRegional: null,
      dataWitel: [],
      selectedWitel: null,
      dataDatel: [],
      selectedDatel: null,
      location: "",
      sname: "",
      pic: null,
      dataPic: [],
      selectedTags: [],
      dataTags: [],
      address: "",
      latitude: -6.914744,
      longitude: 107.60981,
      marker: null,
      map: null,
      normalizer(node) {
        return {
          label: node.name,
        };
      },
      normalizerPic(node) {
        return {
          id: node.users_id,
          label: node.name,
        };
      },
    };
  },
  mounted() {
    this.getDataOrganization();
    this.getDataPic();
    this.getDataTags();
  },
  watch: {
    isAdd(val) {
      if (val == true) {
        setTimeout(() => {
          this.initMap();
        }, 500);
      }
    },
    selectedRegional: function () {
      this.dataWitel = [];
      this.selectedWitel = null;
      this.dataDatel = [];
      this.selectedDatel = null;
      if (this.selectedRegional !== null) {
        this.dataWitel = this.dataRegional.find(
          (item) => item.id === this.selectedRegional
        ).organizations;
      }
    },
    selectedWitel: function () {
      this.dataDatel = [];
      this.selectedDatel = null;
      if (this.selectedWitel !== null) {
        this.dataDatel = this.dataWitel.find(
          (item) => item.id === this.selectedWitel
        ).organizations;
      }
    },
  },
  methods: {
    // initialize the map
    initMap() {
      let rememberLat = this.latitude;
      let rememberLng = this.longitude;

      this.map = L.map("map").setView([-3.1533595, 120.7380532], 4);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      var searchControl = new SearchControl({
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
      var vm = this;
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

      // let newMap = L.map("map").setView([-3.1533595, 120.7380532], 4);
      // L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      //   attribution:
      //     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      // }).addTo(newMap);

      // const searchControl = new SearchControl({
      //   notFoundMessage: "Maaf, alamat tidak ditemukan.",
      //   style: "bar",
      //   showMarker: false,
      //   provider: new OpenStreetMapProvider({
      //     params: {
      //       "accept-language": "id",
      //       countrycodes: "id",
      //       addressdetails: 1,
      //     },
      //   }),
      // });
      // newMap.addControl(searchControl);

      // newMap.invalidateSize();

      // this.marker = L.marker([rememberLat, rememberLng], {
      //   draggable: true,
      // }).addTo(newMap);
      // const vm = this;
      // newMarker.on("dragend", function (e) {
      //   vm.marker.getLatLng().lat, vm.marker.getLatLng().lng;
      //   vm.updateLatLng(vm.marker.getLatLng().lat, vm.marker.getLatLng().lng);
      // });

      // newMap.on("click", function (e) {
      //   vm.marker.setLatLng(e.latlng);
      //   vm.updateLatLng(e.latlng.lat, e.latlng.lng);
      // });
    },

    // update latitude and longitude
    updateLatLng(lat, lng, reverse) {
      // let rememberLat = this.latitude;
      // let rememberLng = this.longitude;

      // let newMap = L.map("map").setView([-3.1533595, 120.7380532], 4);
      // let newMarker = L.marker([rememberLat, rememberLng], {
      //   draggable: true,
      // }).addTo(newMap);
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

    // submit form for add location
    addDataLocation() {
      if (this.location == "" || this.location == null) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Lokasi tidak boleh kosong",
        });
      } else if (this.address == "" || this.address == null) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Alamat tidak boleh kosong",
        });
      } else if (this.sname.length > 3) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Sname tidak boleh lebih dari 3 karakter",
        });
      } else {
        let data = {
          name: this.location,
          sname: this.sname,
          organizationId: this.selectedDatel,
          address: this.address,
          pic: this.pic,
          tagsId: this.selectedTags,
          latitude: this.latitude.toString(),
          longitude: this.longitude.toString(),
        };
        ApiService.post(`${process.env.VUE_APP_ROOT_API_1}/locations`, data)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "Data berhasil ditambahkan",
            }).then((result) => {
              if (result.isConfirmed) {
                this.$bvModal.hide("add-location");
                this.selectedRegional = null;
                this.selectedWitel = null;
                this.selectedDatel = null;
                this.location = "";
                this.sname = "";
                this.address = "";
                this.pic = null;
                this.selectedTags = [];
                this.latitude = -6.914744;
                this.longitude = 107.60981;
                this.$emit("closeAdd");
                this.$emit("getAllDataLocation");
              }
            });
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    },
    closeAdd() {
      this.$emit("closeAdd");
    },
  },
};
</script>

<style scoped>
/* placeholder select form */
select.empty {
  color: gray;
}

/* mandatory symbol */
.required {
  content: "*";
  color: red;
}

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

#map {
  height: 300px;
  margin: 0 15px 15px 15px;
  border-radius: 5px;
}

.leaflet-control {
  z-index: 1 !important;
}

.leaflet-control-container > .leaflet-geosearch-bar {
  z-index: 2 !important;
}
</style>
