<template>
  <section>
    <CardFilter />
    <div class="card">
      <div class="card-header">
        <h2 class="card-title align-self-center">Map View RTU</h2>
        <CountTimer @getData="loadData" />
      </div>
      <div class="card-body pt-3">
        <!-- filter status -->
        <div class="row">
          <div class="col-md-3 mb-3">
            <div v-if="showFilterStatus" class="card">
              <div class="card-body p-2">
                <!-- Status Rtu: -->
                <b-form-group
                  label="Filter status RTU :"
                  v-slot="{ ariaDescribedby }"
                  class="mb-0"
                >
                  <b-form-radio-group
                    size="sm"
                    v-model="statusRtuSelected"
                    :options="allStatusRtu"
                    :aria-describedby="ariaDescribedby"
                    @input="getPinRtuStatus"
                    plain
                  ></b-form-radio-group>
                </b-form-group>
              </div>
            </div>
          </div>
        </div>

        <!-- percent alert -->
        <div class="row justify-content-center mb-5">
          <div class="col-md-6 col-sm-12">
            <div class="card">
              <div class="card-body">
                <div class="text-center mb-2">Persentase Alert Normal</div>
                <div class="alert-wrapped">
                  <div class="badge">
                    <div class="badge-one">0%</div>
                    <div class="badge-two">50%</div>
                    <div class="badge-three">100%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- fullscreen -->
        <fullscreen>
          <div v-if="isReady == false" class="mt-10 mb-5">
            <div
              class="d-flex justify-content-center align-items-center text-center"
            >
              <b-spinner
                variant="warning"
                label="Text Centered"
                class="mr-3"
              ></b-spinner>
              <b-button
                variant="warning"
                disabled
                class="d-flex align-items-center"
              >
                Tunggu sebentar, sedang pengambilan data...
              </b-button>
            </div>
          </div>
          <div
            id="map"
            style="height: 500px; width: 100%; border-radius: 10px"
          ></div>

          <ModalRtu
            :isDetail="isDetail"
            @hideDetail="hideDetail"
            :selectedRtuId="selectedRtuId"
          />
        </fullscreen>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import ModalRtu from "./ModalRtu.vue";
import CardFilter from "./CardFilter.vue";
/* eslint-disable no-undef */
import ApiService from "@/core/services/api.service";
import CountTimer from "@/view/pages/Components/CountTimer.vue";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

export default {
  name: "MapView3",
  components: {
    CardFilter,
    ModalRtu,
    CountTimer,
  },
  data() {
    return {
      isReady: false,
      allLocation: [],
      valueBar: 0,
      regionalColor: 0,
      witelColor: 0,
      isDetail: false,
      selectedRtuId: null,
      selectedWitelId: null,
      dataRegional: {
        type: "FeatureCollection",
        features: [],
      },
      dataWitels: [],
      dataTempWitels: [],
      dataRtu: [],
      totalRtus: {
        allRegional: 0,
        offRegional: 0,
        alertRegional: 0,
        normalRegional: 0,
      },
      currentMap: null,
      layer: null,
      layerVisibility: {},
      listMarker: {
        rtu: [],
      },
      newMarker: "",
      layersGroup: {
        regional: null,
        witel: null,
        rtu: null,
      },
      coordinateLayers: {
        regional: [],
      },
      layers: { regional: null, witel: null },
      currentLayer: "Regional",
      dataRtusStatus: [],
      markerRtuStatus: [],
      statusRtuSelected: "alert",
      showFilterStatus: true,
      allStatusRtu: [
        {
          value: "",
          text: "EMPTY",
        },
        {
          value: "off",
          text: "OFF",
        },
        {
          value: "alert",
          text: "ALERT",
        },
        {
          value: "normal",
          text: "NORMAL",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["regionalIdMap", "witelIdMap", "idRegionalMap"]),
  },
  mounted() {
    window.context = this;
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Dashboard", subtitle: "Map View" },
    ]);
    this.initMap();
    this.getDataRegional();
    this.writeNewTitle("Map View");
    this.getPinRtuStatus();
  },
  watch: {
    regionalIdMap: function (val) {
      if (val) {
        this.deleteMarker();
        this.statusRtuSelected = "";
        this.showFilterStatus = false;
      }
    },
  },
  methods: {
    async getPinRtuStatus() {
      try {
        const { data } = await ApiService.query(
          `${process.env.VUE_APP_ROOT_API_4}/mapview`,
          {
            params: {
              witel: "%%",
              datel: "%%",
              location: "%%",
              regional: "%%",
              isArea: "hide",
              idTags: "%%",
              level: 2,
              isChildren: "view",
              statusRtu: `${this.statusRtuSelected}`,
            },
          }
        );
        this.dataRtusStatus = [];
        data.result.forEach((rtus) => {
          rtus.rtu.forEach((rtu) => {
            this.dataRtusStatus.push(rtu);
          });
        });
        this.deleteMarker();
        this.setPinRtuStatus();
      } catch (error) {
        console.log(error.response, "error response .. ..");
      }
    },
    deleteMarker() {
      if (this.markerRtuStatus.length > 0) {
        var map = this.currentMap;
        this.markerRtuStatus.forEach((marker) => {
          map.removeLayer(marker);
        });
        this.markerRtuStatus = [];
      }
    },
    setPinRtuStatus() {
      this.markerRtuStatus = [];
      var map = this.currentMap;
      this.dataRtusStatus.forEach((rtu) => {
        var LeafIcon = L.Icon.extend({
          options: {
            iconSize: [25, 33],
            shadowSize: [37, 64],
            iconAnchor: [9, 32],
            shadowAnchor: [5, 62],
            popupAnchor: [0, -20],
          },
        });
        var greenIcon = new LeafIcon({
          iconUrl: this.getmarkerIcon(rtu.rtu_status),
        });
        if (rtu.latitude != null || rtu.longitude != null) {
          let marker = L.marker([rtu.latitude, rtu.longitude], {
            icon: greenIcon,
          })
            .bindPopup(
              `
                <div class="text-center">
                  <div class="loc">${rtu.name}</div>
                  <div class="btn btn-sm btn-primary" onclick="context.openDetail(${rtu.id_rtu})">${rtu.rtu_name}</div>
                </div>
              `
            )
            .addTo(map);
          this.markerRtuStatus.push(marker);
        }
      });
    },
    async getDataRegional() {
      try {
        let { data } = await ApiService.query(
          `${process.env.VUE_APP_ROOT_API_4}/other/org`,
          { level: 1 }
        );
        const list_promises_reg = [];
        var totalRtus = {
          allRegional: 0,
          offRegional: 0,
          alertRegional: 0,
          normalRegional: 0,
          allWitel: 0,
          offWitel: 0,
          alertWitel: 0,
          normalWitel: 0,
        };
        data.result.forEach((regional) => {
          const promise_reg = this.initRegionalArea(regional.id);
          list_promises_reg.push(promise_reg);
        });

        let listResult = [];
        let listFeatureRegional = [];
        listResult = await Promise.allSettled(list_promises_reg);
        listResult.forEach(({ value: regional }) => {
          totalRtus.allRegional += parseInt(regional.total_rtu);
          totalRtus.offRegional += parseInt(regional.rtu_down);
          totalRtus.alertRegional += parseInt(regional.rtu_alert);
          totalRtus.normalRegional += parseInt(regional.rtu_normal);
          listFeatureRegional.push(regional.area);
        });
        this.totalRtus = totalRtus;
        this.dataRegional.features = listFeatureRegional;
        this.valueBar = (
          (totalRtus.normalRegional / totalRtus.allRegional) *
          100
        ).toFixed(0);

        this.initMapLegend();
        this.isReady = true;
      } catch (error) {
        console.error("Pesan error:", error.response);
      }
    },
    async initRegionalArea(regional_id) {
      try {
        let { data } = await ApiService.query(
          `${process.env.VUE_APP_ROOT_API_4}/mapview`,
          { params: { isChildren: false, regional: regional_id } }
        );
        const result = data.result[0];
        let regional_area = result.area;

        regional_area.properties.name = result.name;
        regional_area.properties.parent_id = result.id;
        regional_area.properties.rtu_alert = result.rtu_alert;
        regional_area.properties.rtu_down = result.rtu_down;
        regional_area.properties.rtu_normal = result.rtu_normal;
        regional_area.properties.total_rtu = result.total_rtu;
        regional_area.properties.regionalColor = (
          (result.rtu_normal / result.total_rtu) *
          100
        ).toFixed(0);
        result.area = regional_area;
        this.initMapRegionalNew(regional_area);
        return result;
      } catch (err) {
        throw new Error(err);
      }
    },
    async initWitelArea({ regional_id, witel_id }) {
      try {
        let params = { isChildren: false, level: 2 };
        if (regional_id) {
          params = { ...params, regional: regional_id };
        } else if (witel_id) {
          params = { ...params, witel: witel_id };
        }
        const {
          data: { result },
        } = await ApiService.query(
          `${process.env.VUE_APP_ROOT_API_4}/mapview`,
          {
            params: params,
          }
        );

        return { witels: result, parent_id: regional_id };
      } catch (err) {
        throw new Error(err);
      }
    },
    async initRtuArea(witel_id) {
      try {
        const {
          data: { result },
        } = await ApiService.query(
          `${process.env.VUE_APP_ROOT_API_4}/mapview`,
          {
            params: { isChildren: "view", witel: witel_id, level: 2 },
          }
        );

        return { rtus: result[0].rtu, parent_id: witel_id };
      } catch (err) {
        throw new Error(err);
      }
    },
    async getParentArea({ id, level }) {
      try {
        const {
          data: { result },
        } = await ApiService.query(
          `${process.env.VUE_APP_ROOT_API_4}/other/orgparent`,
          {
            params: { id, level },
          }
        );

        return result[0];
      } catch (err) {
        throw new Error(err);
      }
    },
    initMapRegionalNew(data_regional) {
      var map = this.currentMap;

      function regionalStyle(feature) {
        return {
          weight: 1.5,
          opacity: 0.7,
          color: "black",
          dashArray: "1",
          fillOpacity: 0.7,
          fillColor: window.context.getMapColor(
            feature.properties.regionalColor
          ),
        };
      }
      function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
          weight: 3,
          color: "black",
          dashArray: "",
          fillOpacity: 0.7,
        });
      }
      // geojson
      var geojson = L.geoJson(data_regional, {
        style: regionalStyle,
        onEachFeature: function (feature, layer) {
          layer.bindTooltip(
            "<div><span>NAMA: " +
              feature.properties.name +
              "</span><br /><span>TOTAL RTU: " +
              feature.properties.total_rtu +
              "</span><br /><span>RTU NORMAL: " +
              feature.properties.rtu_normal +
              "</span><br /><span>RTU ALERT: " +
              feature.properties.rtu_alert +
              "</span><br /><span>RTU DOWN: " +
              feature.properties.rtu_down +
              "</div>"
          );
          layer.on("mouseover", highlightFeature);
          layer.on("mouseout", function (e) {
            geojson.resetStyle(e.target);
          });
          // eslint-disable-next-line no-unused-vars
          layer.on("click", function (e) {
            let legendText = document.getElementById("legend-text");
            let rtuTotalLegend = document.getElementById("rtu-total-legend");
            let rtuOffLegend = document.getElementById("rtu-off-legend");
            let rtuAlertLegend = document.getElementById("rtu-alert-legend");
            let rtuNormalLegend = document.getElementById("rtu-normal-legend");
            if (legendText) {
              legendText.innerHTML = "Regional";
              document.getElementById("back-btn").style.cssText =
                "display:block !important";
            }
            if (legendText.innerHTML == "Regional") {
              rtuTotalLegend.innerHTML = `<strong>Total RTU: ${feature.properties.total_rtu}</strong>`;
              rtuOffLegend.innerHTML = `<strong>${feature.properties.rtu_down}</strong>`;
              rtuAlertLegend.innerHTML = `<strong>${feature.properties.rtu_alert}</strong>`;
              rtuNormalLegend.innerHTML = `<strong>${feature.properties.rtu_normal}</strong>`;
            }
            window.context.initMapWitelNew({
              regional_id: feature.properties.parent_id,
            });
            window.context.$store.dispatch(
              "setRegionalIdMap",
              feature.properties.parent_id
            );
            window.context.$store.dispatch(
              "setRegionalMap",
              feature.properties.parent_id
            );
            map.fitBounds(e.target.getBounds());
          });
        },
      });
      this.layersGroup.regional.addLayer(geojson);
    },
    async initMapWitelNew({ regional_id, witel_id } = {}) {
      var map = this.currentMap;
      // eslint-disable-next-line no-unused-vars
      let data_witel = null;
      if (regional_id) {
        let datas = this.dataWitels.find(
          (item) => item.parent_id == regional_id
        );
        if (!datas) {
          let { witels } = await this.initWitelArea({ regional_id });
          data_witel = witels.reduce((result, witel) => {
            if (witel.area != null) {
              witel.area.properties.name = witel.name;
              witel.area.properties.parent_id = witel.id;
              witel.area.properties.rtu_alert = witel.rtu_alert;
              witel.area.properties.rtu_down = witel.rtu_down;
              witel.area.properties.rtu_normal = witel.rtu_normal;
              witel.area.properties.total_rtu = witel.total_rtu;
              witel.area.properties.witelColor = (
                (witel.rtu_normal / witel.total_rtu) *
                100
              ).toFixed(0);
              result.push(witel.area);
            }
            return result;
          }, []);
          this.dataWitels.push({
            parent_id: regional_id,
            area_witels: data_witel,
          });
        } else {
          data_witel = datas.area_witels;
        }
      } else if (witel_id) {
        let indexWitel = -1;
        let datas = this.dataWitels.find((item) => {
          return item.area_witels.some((witel) => {
            let isFound = witel.properties.parent_id == witel_id;
            if (isFound) {
              indexWitel = item.area_witels.indexOf(witel);
            }
            return isFound;
          });
        });
        let tempDatas = this.dataTempWitels.find(
          (witel) => witel.id == witel_id
        );
        if (!datas && !tempDatas) {
          let { witels } = await this.initWitelArea({ witel_id });
          data_witel = witels.reduce((result, witel) => {
            if (witel.area != null) {
              witel.area.properties.name = witel.name;
              witel.area.properties.parent_id = witel.id;
              witel.area.properties.rtu_alert = witel.rtu_alert;
              witel.area.properties.rtu_down = witel.rtu_down;
              witel.area.properties.rtu_normal = witel.rtu_normal;
              witel.area.properties.total_rtu = witel.total_rtu;
              witel.area.properties.witelColor = (
                (witel.rtu_normal / witel.total_rtu) *
                100
              ).toFixed(0);
              result.push(witel.area);
            }
            return result;
          }, []);
          this.dataTempWitels.push({
            id: witel_id,
            area_witel: data_witel,
          });
        } else {
          if (datas) {
            data_witel = datas.area_witels[indexWitel] || datas.area_witels;
          } else {
            data_witel = tempDatas.area_witel;
          }
        }
      }
      //   let test = true;
      //   if (test) return;

      function style(feature) {
        return {
          weight: 1.5,
          opacity: 1,
          color: "black",
          dashArray: "1",
          fillOpacity: 0.7,
          fillColor: window.context.getWitelColor(
            feature.properties.witelColor
          ),
        };
      }
      function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
          weight: 3,
          color: "black",
          dashArray: "",
          fillOpacity: 0.7,
        });
      }

      let layerWitel = L.geoJson(data_witel, {
        style: style,
        onEachFeature: function (feature, layer) {
          layer.bindTooltip(
            "<div><span>NAMA: " +
              feature.properties.name +
              "</span><br /><span>TOTAL RTU: " +
              feature.properties.total_rtu +
              "</span><br /><span>RTU NORMAL: " +
              feature.properties.rtu_normal +
              "</span><br /><span>RTU ALERT: " +
              feature.properties.rtu_alert +
              "</span><br /><span>RTU DOWN: " +
              feature.properties.rtu_down +
              "</div>"
          );
          layer.on("mouseover", highlightFeature);
          layer.on("mouseout", function (e) {
            layerWitel.resetStyle(e.target);
          });
          layer.on("click", function (e) {
            let legendText = document.getElementById("legend-text");
            let rtuTotalLegend = document.getElementById("rtu-total-legend");
            let rtuOffLegend = document.getElementById("rtu-off-legend");
            let rtuAlertLegend = document.getElementById("rtu-alert-legend");
            let rtuNormalLegend = document.getElementById("rtu-normal-legend");
            if (legendText) {
              legendText.innerHTML = "Witel";
              document.getElementById("back-btn").style.cssText =
                "display:block !important";
            }
            if (legendText.innerHTML == "Witel") {
              rtuTotalLegend.innerHTML = `<strong>Total RTU: ${feature.properties.total_rtu}</strong>`;
              rtuOffLegend.innerHTML = `<strong>${feature.properties.rtu_down}</strong>`;
              rtuOffLegend.style.cssText = "width: 30% !important";
              rtuAlertLegend.innerHTML = `<strong>${feature.properties.rtu_alert}</strong>`;
              rtuNormalLegend.innerHTML = `<strong>${feature.properties.rtu_normal}</strong>`;
            }
            window.context.selectedWitelId = feature.properties.parent_id;
            window.context.initMapRtuNew({
              witel_id: feature.properties.parent_id,
            });
            window.context.$store.dispatch(
              "setWitelIdMap",
              feature.properties.parent_id
            );
            window.context.$store.dispatch(
              "setWitelMap",
              feature.properties.parent_id
            );
            map.fitBounds(e.target.getBounds());
          });
        },
      });
      map.fitBounds(layerWitel.getBounds());
      this.layersGroup.regional.clearLayers();
      this.layersGroup.witel.clearLayers();
      this.layersGroup.rtu.clearLayers();
      this.layersGroup.witel.addLayer(layerWitel);
    },
    async initMapRtuNew(
      { witel_id, datel_id, location_id, tag_ids, status } = {
        witel_id: null,
        datel_id: null,
        location_id: null,
        tag_ids: [],
        status: [],
      }
    ) {
      var map = this.currentMap;

      let listStatus = ["off", "alert", "normal"];

      if (status && status.length > 0) {
        listStatus = status;
      }

      // eslint-disable-next-line no-unused-vars
      let data_rtu = null;
      if (witel_id) {
        let datas = this.dataRtu.find((item) => item.parent_id == witel_id);
        if (!datas) {
          var get_rtus = await this.initRtuArea(witel_id);
          data_rtu = get_rtus.rtus;

          this.dataRtu.push({
            parent_id: get_rtus.parent_id,
            rtus: get_rtus.rtus,
          });
        } else {
          data_rtu = datas.rtus;
        }
      }
      if (datel_id) {
        if (location_id) {
          data_rtu = data_rtu.filter((rtu) => rtu.locs_id == location_id);
          if (data_rtu.length == 0) {
            alert("Lokasi tidak memiliki RTU!");
            return;
          } else if (data_rtu[0] && data_rtu[0].latitude == null) {
            alert("RTU tidak memiliki titik koordinat!");
            return;
          }
        } else {
          data_rtu = data_rtu.filter((rtu) => rtu.id == datel_id);
          if (data_rtu.length == 0) {
            alert("Datel tidak memiliki RTU!");
            return;
          }
        }
      }

      if (tag_ids && tag_ids.length > 0) {
        data_rtu = data_rtu.filter((rtu) => {
          return rtu.tags.some((tag) => tag_ids.includes(tag));
        });
      }

      this.layersGroup.rtu.clearLayers();
      var LeafIcon = L.Icon.extend({
        options: {
          iconSize: [25, 33],
          shadowSize: [37, 64],
          iconAnchor: [9, 32],
          shadowAnchor: [5, 62],
          popupAnchor: [0, -20],
        },
      });

      data_rtu.forEach((rtu) => {
        if (rtu.latitude && listStatus.includes(rtu.rtu_status)) {
          var greenIcon = new LeafIcon({
            iconUrl: this.getmarkerIcon(rtu.rtu_status),
          });

          let rt_maker = new L.marker([rtu.latitude, rtu.longitude], {
            icon: greenIcon,
          }).bindPopup(
            `
              <div class="text-center">
                <div class="loc">${rtu.name}</div>
                <div class="btn btn-sm btn-primary" onclick="context.openDetail(${rtu.id_rtu})">${rtu.rtu_name}</div>
              </div>
            `
          );
          this.layersGroup.rtu.addLayer(rt_maker);
        }
      });

      this.layersGroup.witel.eachLayer(function (layer) {
        layer.eachLayer(function (sub_layer) {
          if (sub_layer.feature.properties.parent_id == witel_id) {
            map.fitBounds(sub_layer.getBounds());
          }
        });
      });
    },
    loadData() {
      let status = true;
      if (status) return;
      ApiService.query(
        `${process.env.VUE_APP_ROOT_API_4}/mapview/, {
        params:{

        }
      }mapview`,
        {}
      )
        .then(({ data }) => {
          var totalRtus = {
            allRegional: 0,
            offRegional: 0,
            alertRegional: 0,
            normalRegional: 0,
            allWitel: 0,
            offWitel: 0,
            alertWitel: 0,
            normalWitel: 0,
          };

          data.result.map((item) => {
            totalRtus.allRegional += parseInt(item.total_rtu);
            totalRtus.offRegional += parseInt(item.rtu_down);
            totalRtus.alertRegional += parseInt(item.rtu_alert);
            totalRtus.normalRegional += parseInt(item.rtu_normal);
            var statesData = item.area;
            this.dataWitels.push({
              parent_id: item.id,
              parent_name: item.name,
              witels: item.witel,
            });
            statesData.properties.name = item.name;
            statesData.properties.parent_id = item.id;
            statesData.properties.regionalColor = (
              (item.rtu_normal / item.total_rtu) *
              100
            ).toFixed(0);
            this.coordinateLayers.regional.push({
              id: item.id,
              name: item.name,
              feature: statesData,
            });
            this.dataRegional.features.push(statesData);
            item.witel.map((witel) => {
              var witelData = witel.area;
              this.dataRtu.push({
                parent_id: witel.id,
                rtus: witel.rtu,
              });
              totalRtus.allWitel += parseInt(witel.total_rtu);
              totalRtus.offWitel += parseInt(witel.rtu_down);
              totalRtus.alertWitel += parseInt(witel.rtu_alert);
              totalRtus.normalWitel += parseInt(witel.rtu_normal);
              if (witelData) {
                witelData.properties.witelColor = (
                  (witel.rtu_normal / witel.total_rtu) *
                  100
                ).toFixed(0);
                this.valueBar = (
                  (totalRtus.normalRegional / totalRtus.allRegional) *
                  100
                ).toFixed(0);
                this.dataWitels.push(witelData);
              }
            });
          });
          this.totalRtus = totalRtus;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    getData() {
      ApiService.get(`${process.env.VUE_APP_ROOT_API_3}/locations`)
        .then(({ data }) => {
          this.allLocation = data.result.locations;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    getRegionalMap() {
      ApiService.query(
        `${process.env.VUE_APP_ROOT_API_4}/mapview/, {
        params:{

        }
      }mapview`,
        {}
      )
        .then(({ data }) => {
          var totalRtus = {
            allRegional: 0,
            offRegional: 0,
            alertRegional: 0,
            normalRegional: 0,
            allWitel: 0,
            offWitel: 0,
            alertWitel: 0,
            normalWitel: 0,
          };

          data.result.map((item) => {
            totalRtus.allRegional += parseInt(item.total_rtu);
            totalRtus.offRegional += parseInt(item.rtu_down);
            totalRtus.alertRegional += parseInt(item.rtu_alert);
            totalRtus.normalRegional += parseInt(item.rtu_normal);
            var statesData = item.area;
            this.dataWitels.push({
              parent_id: item.id,
              parent_name: item.name,
              witels: item.witel,
            });
            statesData.properties.name = item.name;
            statesData.properties.parent_id = item.id;
            statesData.properties.regionalColor = (
              (totalRtus.normalRegional / totalRtus.allRegional) *
              100
            ).toFixed(0);
            this.coordinateLayers.regional.push({
              id: item.id,
              name: item.name,
              feature: statesData,
            });
            this.dataRegional.features.push(statesData);
            item.witel.map((witel) => {
              var witelData = witel.area;
              this.dataRtu.push({
                parent_id: witel.id,
                rtus: witel.rtu,
              });
              totalRtus.allWitel += parseInt(witel.total_rtu);
              totalRtus.offWitel += parseInt(witel.rtu_down);
              totalRtus.alertWitel += parseInt(witel.rtu_alert);
              totalRtus.normalWitel += parseInt(witel.rtu_normal);
              if (witelData) {
                witelData.properties.witelColor = (
                  (totalRtus.normalWitel / totalRtus.allWitel) *
                  100
                ).toFixed(0);
                this.valueBar = (
                  (totalRtus.normalRegional / totalRtus.allRegional) *
                  100
                ).toFixed(0);
                this.dataWitels.push(witelData);
              }
            });
          });
          this.totalRtus = totalRtus;
          this.initMapLegend();
          this.initMapRegional();
          this.isReady = true;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    async setFilterData(filterss) {
      let filters = { ...filterss };
      this.deleteMarker();
      this.statusRtuSelected = "";
      this.showFilterStatus = false;

      if (
        filterss.datel == null &&
        filterss.location == null &&
        filterss.regional == null &&
        filterss.tags == null &&
        filterss.witel == null &&
        filterss.rtuStatus.length > 0
      ) {
        this.setPinMap();
        this.showFilterStatus = true;
      }
      // else {
      //   this.removePinMap();
      // }

      if (!filters.witel) {
        var parent = {};
        if (filters.datel) {
          parent = await this.getParentArea({ id: filters.datel, level: 3 });
        } else if (filters.location) {
          parent = await this.getParentArea({ id: filters.location, level: 4 });
        } else if (this.selectedWitelId) {
          filters.witel = this.selectedWitelId;
        }
        if (parent.datel) filters.datel = parent.datel[0].id;
        if (parent.witel) filters.witel = parent.witel[0].id;
      }

      this.isReady = false;
      if (filters.regional) {
        await this.initMapWitelNew({ regional_id: filters.regional });
        this.isReady = true;
      } else if (filters.witel) {
        await this.initMapWitelNew({ witel_id: filters.witel });
        this.isReady = true;
      } else {
        this.initMapRegional({ resetMap: true });
        this.isReady = true;
      }

      if (filters.witel) {
        if (filters.datel) {
          if (filters.location) {
            setTimeout(() => {
              this.initMapRtuNew({
                status: filters.rtuStatus,
                tag_ids: filters.tags,
                witel_id: filters.witel,
                datel_id: filters.datel,
                location_id: filters.location,
              });
            }, 600);
          } else {
            setTimeout(() => {
              this.initMapRtuNew({
                status: filters.rtuStatus,
                tag_ids: filters.tags,
                witel_id: filters.witel,
                datel_id: filters.datel,
              });
            }, 600);
          }
        } else {
          setTimeout(() => {
            this.initMapRtuNew({
              status: filters.rtuStatus,
              tag_ids: filters.tags,
              witel_id: filters.witel,
            });
          }, 600);
        }
        let legendText = document.getElementById("legend-text");
        let rtuTotalLegend = document.getElementById("rtu-total-legend");
        let rtuOffLegend = document.getElementById("rtu-off-legend");
        let rtuAlertLegend = document.getElementById("rtu-alert-legend");
        let rtuNormalLegend = document.getElementById("rtu-normal-legend");
        if (legendText) {
          legendText.innerHTML = "Witel";
          document.getElementById("back-btn").style.cssText =
            "display:block !important";
        }
        if (legendText.innerHTML == "Witel") {
          rtuTotalLegend.innerHTML = `<strong>Total RTU: ${feature.properties.total_rtu}</strong>`;
          rtuOffLegend.innerHTML = `<strong>${feature.properties.rtu_down}</strong>`;
          rtuOffLegend.style.cssText = "width: 30% !important";
          rtuAlertLegend.innerHTML = `<strong>${feature.properties.rtu_alert}</strong>`;
          rtuNormalLegend.innerHTML = `<strong>${feature.properties.rtu_normal}</strong>`;
        }
      }
      this.isReady = true;
    },
    setPinMap() {
      ApiService.query(`${process.env.VUE_APP_ROOT_API_4}/mapview`, {
        params: {
          witel: "%%",
          datel: "%%",
          location: "%%",
          regional: "%%",
          isArea: "hide",
          idTags: "%%",
          level: 1,
          isChildren: "view",
        },
      }).catch((e) => {
        console.log("error ", e.response);
      });
    },
    hideDetail() {
      this.isDetail = false;
    },
    openDetail(id) {
      this.selectedRtuId = id;
      this.$bvModal.show("modal-informasi-rtu");
      this.isDetail = true;
    },
    initMapLegend() {
      let map = this.currentMap;
      // fullscreen map
      map.addControl(
        new L.Control.Fullscreen({
          title: {
            false: "View Fullscreen",
            true: "Exit Fullscreen",
          },
        })
      );
      map.isFullscreen();
      var backButtonLegend = L.control({ position: "bottomleft" });
      var firstLegend = L.control({ position: "bottomleft" });
      var secondLegend = L.control({ position: "bottomleft" });
      var thirdLegend = L.control({ position: "bottomleft" });

      secondLegend.onAdd = function () {
        var div = L.DomUtil.create("div", "second-legend");
        div.style.cssText = `
            width: 140%;
            padding: 6px 8px;
            background:rgba(255, 255, 255, 1);
            font: 14px Arial, Helvetica, sans-serif;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
            border-radius: 5px;
            line-height: 24px;
            color: #555;
            `;
        div.innerHTML += `
            <span class="badge badge-secondary w-100" id="rtu-total-legend"><strong>Total RTU: ${window.context.totalRtus.allRegional}</strong></span>
            <br />
            <div class="d-flex justify-content-between mt-2">
              <span class="badge badge-dark cursor-pointer" id="rtu-off-legend" onclick="window.context.goToPortSensor('off')" style="width: 30%"><strong>${window.context.totalRtus.offRegional}</strong></span>

              <span class="badge badge-danger cursor-pointer" id="rtu-alert-legend" onclick="window.context.goToPortSensor('alert')" style="width: 30%"><strong>${window.context.totalRtus.alertRegional}</strong></span>

              <span class="badge badge-success cursor-pointer" id="rtu-normal-legend" onclick="window.context.goToPortSensor('normal')" style="width: 30%"><strong>${window.context.totalRtus.normalRegional}</strong></span>
            </div>
            <div class="d-flex justify-content-between mt-2">
              <span class="badge badge-white p-0" style="width: 30%; color: black; font-size: 10px; background: transparent;"><strong>OFF</strong></span>

              <span class="badge badge-white p-0" style="width: 30%; color: red; font-size: 10px; background: transparent;"><strong>ALERT</strong></span>

              <span class="badge badge-white p-0" style="width: 30%; color: green; font-size: 10px; background: transparent;"><strong>NORMAL</strong></span>
            </div>
            `;

        return div;
      };
      secondLegend.addTo(map);

      backButtonLegend.onAdd = function () {
        var div = L.DomUtil.create("div", "button-back-legend");
        div.style.cssText = `
            padding: 5px;
            background:rgba(255, 255, 255, 1);
            font: 14px Arial, Helvetica, sans-serif;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
            border-radius: 5px;
            line-height: 20px;
            color: #555;
            `;
        div.innerHTML += `
            <div onclick="window.context.setDefaultMap()" class="btn btn-sm"><strong>Reset View</strong></div>
            `;
        return div;
      };
      backButtonLegend.addTo(map);

      thirdLegend.onAdd = function () {
        var div = L.DomUtil.create("div", "third-legend");
        div.style.cssText = `
            padding: 6px 8px;
            background:rgba(255, 255, 255, 1);
            font: 14px Arial, Helvetica, sans-serif;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
            border-radius: 5px;
            line-height: 24px;
            color: #555;
            `;
        div.innerHTML += `
            <span><strong id="legend-text">Nasional</strong></span><br />
              <button onclick="window.context.backButton()" class="btn btn-secondary font-weight-bold d-none" id="back-btn">Kembali ke Nasional</button>
            `;
        return div;
      };
      thirdLegend.addTo(map);

      map.on("fullscreenchange", function () {
        if (map.isFullscreen()) {
          firstLegend.onAdd = function () {
            var div = L.DomUtil.create("div", "first-legend");
            div.style.cssText = `
            width: 100%;
            padding: 6px 8px;
            background: white;
            font: 14px Arial, Helvetica, sans-serif;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
            border-radius: 5px;
            line-height: 24px;
            color: #555;
            `;
            div.innerHTML +=
              "<img src='/media/legend/green-pin.webp'/><span>75% - 100% Normal</span><br />";
            div.innerHTML +=
              "<img src='/media/legend/red-pin.webp'/><span>50% - 75% Alert</span><br />";
            div.innerHTML +=
              "<img src='/media/legend/black-pin.webp'/><span>0% - 50% Off</span>";

            return div;
          };
          firstLegend.addTo(map);
        } else {
          map.removeControl(firstLegend);
        }
      });
    },
    initMap() {
      var map = L.map("map", {
        closePopupOnClick: true,
      }).setView([-1.8376286, 118.1773683], 5);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      let layersGroup = this.layersGroup;
      if (this.layersGroup.regional == null) {
        layersGroup.regional = L.layerGroup().addTo(map);
        layersGroup.witel = L.layerGroup().addTo(map);
        layersGroup.rtu = L.layerGroup().addTo(map);
      }
      this.layersGroup = layersGroup;
      this.currentMap = map;
    },
    initMapRegional({ resetMap } = { resetMap: false }) {
      var map = this.currentMap;

      function regionalStyle(feature) {
        return {
          weight: 1.5,
          opacity: 0.7,
          color: "black",
          dashArray: "1",
          fillOpacity: 0.7,
          fillColor: window.context.getMapColor(
            feature.properties.regionalColor
          ),
        };
      }
      function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
          weight: 3,
          color: "black",
          dashArray: "",
          fillOpacity: 0.7,
        });
      }
      // geojson
      var geojson = L.geoJson(this.dataRegional, {
        style: regionalStyle,
        onEachFeature: function (feature, layer) {
          layer.bindTooltip(
            "<div><span>NAMA: " +
              feature.properties.name +
              "</span><br /><span>TOTAL RTU: " +
              feature.properties.total_rtu +
              "</span><br /><span>RTU NORMAL: " +
              feature.properties.rtu_normal +
              "</span><br /><span>RTU ALERT: " +
              feature.properties.rtu_alert +
              "</span><br /><span>RTU DOWN: " +
              feature.properties.rtu_down +
              "</div>"
          );
          layer.on("mouseover", highlightFeature);
          layer.on("mouseout", function (e) {
            geojson.resetStyle(e.target);
          });
          layer.on("click", function (e) {
            let legendText = document.getElementById("legend-text");
            let rtuTotalLegend = document.getElementById("rtu-total-legend");
            let rtuOffLegend = document.getElementById("rtu-off-legend");
            let rtuAlertLegend = document.getElementById("rtu-alert-legend");
            let rtuNormalLegend = document.getElementById("rtu-normal-legend");
            if (legendText) {
              legendText.innerHTML = "Regional";
              document.getElementById("back-btn").style.cssText =
                "display:block !important";
            }
            if (legendText.innerHTML == "Regional") {
              rtuTotalLegend.innerHTML = `<strong>Total RTU: ${feature.properties.total_rtu}</strong>`;
              rtuOffLegend.innerHTML = `<strong>${feature.properties.rtu_down}</strong>`;
              rtuAlertLegend.innerHTML = `<strong>${feature.properties.rtu_alert}</strong>`;
              rtuNormalLegend.innerHTML = `<strong>${feature.properties.rtu_normal}</strong>`;
            }
            window.context.initMapWitelNew({
              regional_id: feature.properties.parent_id,
            });
            window.context.$store.dispatch(
              "setRegionalIdMap",
              feature.properties.parent_id
            );
            window.context.$store.dispatch(
              "setRegionalMap",
              feature.properties.parent_id
            );
            map.fitBounds(e.target.getBounds());
          });
        },
      });
      map.fitBounds(geojson.getBounds());
      this.layersGroup.regional.clearLayers();
      if (resetMap) {
        this.layersGroup.witel.clearLayers();
        this.layersGroup.rtu.clearLayers();
      }
      this.layersGroup.regional.addLayer(geojson);
    },
    initMapWitel(regional_id) {
      var map = this.currentMap;

      function style(feature) {
        return {
          weight: 1.5,
          opacity: 1,
          color: "black",
          dashArray: "1",
          fillOpacity: 0.7,
          fillColor: window.context.getWitelColor(
            feature.properties.witelColor
          ),
        };
      }
      function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
          weight: 3,
          color: "black",
          dashArray: "",
          fillOpacity: 0.7,
        });
      }

      let { witels } = this.dataWitels.find(
        (item) => item.parent_id == regional_id
      );
      witels = witels.reduce((result, witel) => {
        if (witel.area != null) {
          witel.area.properties.name = witel.name;
          witel.area.properties.parent_id = witel.id;
          witel.area.properties.rtu_alert = witel.rtu_alert;
          witel.area.properties.rtu_down = witel.rtu_down;
          witel.area.properties.rtu_normal = witel.rtu_normal;
          witel.area.properties.total_rtu = witel.total_rtu;
          result.push(witel.area);
        }
        return result;
      }, []);

      let layerWitel = L.geoJson(witels, {
        style: style,
        onEachFeature: function (feature, layer) {
          layer.bindTooltip(
            "<div><span>NAMA: " +
              feature.properties.name +
              "</span><br /><span>TOTAL RTU: " +
              feature.properties.total_rtu +
              "</span><br /><span>RTU NORMAL: " +
              feature.properties.rtu_normal +
              "</span><br /><span>RTU ALERT: " +
              feature.properties.rtu_alert +
              "</span><br /><span>RTU DOWN: " +
              feature.properties.rtu_down +
              "</div>"
          );
          layer.on("mouseover", highlightFeature);
          layer.on("mouseout", function (e) {
            layerWitel.resetStyle(e.target);
          });
          layer.on("click", function (e) {
            let legendText = document.getElementById("legend-text");
            let rtuTotalLegend = document.getElementById("rtu-total-legend");
            let rtuOffLegend = document.getElementById("rtu-off-legend");
            let rtuAlertLegend = document.getElementById("rtu-alert-legend");
            let rtuNormalLegend = document.getElementById("rtu-normal-legend");
            if (legendText) {
              legendText.innerHTML = "Witel";
              document.getElementById("back-btn").style.cssText =
                "display:block !important";
            }
            if (legendText.innerHTML == "Witel") {
              rtuTotalLegend.innerHTML = `<strong>Total RTU: ${feature.properties.total_rtu}</strong>`;
              rtuOffLegend.innerHTML = `<strong>${feature.properties.rtu_down}</strong>`;
              rtuOffLegend.style.cssText = "width: 30% !important";
              rtuAlertLegend.innerHTML = `<strong>${feature.properties.rtu_alert}</strong>`;
              rtuNormalLegend.innerHTML = `<strong>${feature.properties.rtu_normal}</strong>`;
            }
            window.context.initMapRtu({
              witel_id: feature.properties.parent_id,
            });
            window.context.$store.dispatch(
              "setWitelIdMap",
              feature.properties.parent_id
            );
            window.context.$store.dispatch(
              "setWitelMap",
              feature.properties.parent_id
            );
            map.fitBounds(e.target.getBounds());
          });
        },
      });
      map.fitBounds(layerWitel.getBounds());
      this.layersGroup.regional.clearLayers();
      this.layersGroup.witel.clearLayers();
      this.layersGroup.rtu.clearLayers();
      this.layersGroup.witel.addLayer(layerWitel);
    },
    initMapRtu(
      { witel_id, datel_id, location_id, status } = {
        witel_id: null,
        datel_id: null,
        location_id: null,
        status: [],
      }
    ) {
      var map = this.currentMap;
      let listStatus = ["off", "alert", "normal"];
      if (status && status.length > 0) {
        listStatus = status;
      }
      let { rtus } = this.dataRtu.find((item) => item.parent_id == witel_id);
      if (datel_id) {
        if (location_id) {
          rtus = rtus.filter((rtu) => rtu.locs_id == location_id);
          if (rtus.length == 0) {
            alert("Lokasi tidak memiliki RTU!");
            return;
          } else if (rtus[0] && rtus[0].latitude == null) {
            alert("RTU tidak memiliki titik koordinat!");
            return;
          }
        } else {
          rtus = rtus.filter((rtu) => rtu.id == datel_id);
          if (rtus.length == 0) {
            alert("Datel tidak memiliki RTU!");
            return;
          }
        }
      }
      this.layersGroup.rtu.clearLayers();
      var LeafIcon = L.Icon.extend({
        options: {
          iconSize: [25, 33],
          shadowSize: [37, 64],
          iconAnchor: [9, 32],
          shadowAnchor: [5, 62],
          popupAnchor: [0, -20],
        },
      });
      rtus.forEach((loc) => {
        if (loc.latitude && listStatus.includes(loc.rtu_status)) {
          var greenIcon = new LeafIcon({
            iconUrl: this.getmarkerIcon(loc.rtu_status),
          });

          let rt_maker = new L.marker([loc.latitude, loc.longitude], {
            icon: greenIcon,
          }).bindPopup(
            `
              <div class="text-center">
                <div class="loc">${loc.name}</div>
                <div class="btn btn-sm btn-primary" onclick="context.openDetail(${loc.id_rtu})">${loc.rtu_name}</div>
              </div>
            `
          );
          this.layersGroup.rtu.addLayer(rt_maker);
        }
      });

      this.layersGroup.witel.eachLayer(function (layer) {
        layer.eachLayer(function (sub_layer) {
          if (sub_layer.feature.properties.parent_id == witel_id) {
            map.fitBounds(sub_layer.getBounds());
          }
        });
      });
    },
    goToPortSensor(rtuStatus) {
      this.$store.dispatch(
        "setRegionalSensor",
        this.regionalIdMap == null ? null : [this.regionalIdMap]
      );
      this.$store.dispatch(
        "setWitelSensor",
        this.witelIdMap == null ? null : [this.witelIdMap]
      );
      this.$store.dispatch("setRtuStatusSensor", rtuStatus);
      this.$store.dispatch("setAlarmTypeSensor", rtuStatus);
      this.$router.push({
        name: "Port Sensor",
      });
      this.$store.dispatch("setRegionalIdMap", null);
      this.$store.dispatch("setWitelIdMap", null);
    },
    setDefaultMap() {
      var map = this.currentMap;
      map.setView([-1.8376286, 118.1773683], 5);
      this.currentMap = map;
    },
    backButton() {
      this.showFilterStatus = true;
      let legendText = document.getElementById("legend-text");
      let rtuTotalLegend = document.getElementById("rtu-total-legend");
      let rtuOffLegend = document.getElementById("rtu-off-legend");
      let rtuAlertLegend = document.getElementById("rtu-alert-legend");
      let rtuNormalLegend = document.getElementById("rtu-normal-legend");
      if (
        legendText.innerHTML == "Regional" ||
        legendText.innerHTML == "Witel"
      ) {
        legendText.innerHTML = "Nasional";
        document.getElementById("back-btn").style.display = "none";
        this.initMapRegional({ resetMap: true });
        window.context.$store.dispatch("setRegionalMap", null);
        window.context.$store.dispatch("setWitelMap", null);
      }
      if (legendText.innerHTML == "Nasional") {
        rtuTotalLegend.innerHTML = `<strong>Total RTU: ${window.context.totalRtus.allRegional}</strong>`;
        rtuOffLegend.innerHTML = `<strong>${window.context.totalRtus.offRegional}</strong>`;
        rtuAlertLegend.innerHTML = `<strong>${window.context.totalRtus.alertRegional}</strong>`;
        rtuNormalLegend.innerHTML = `<strong>${window.context.totalRtus.normalRegional}</strong>`;
        window.context.$store.dispatch("setRegionalIdMap", null);
        window.context.$store.dispatch("setWitelIdMap", null);
      }
    },
    getmarkerIcon(status) {
      if (status.toLowerCase() == "off") {
        return "/media/legend/black-pin.webp";
      } else if (status.toLowerCase() == "alert") {
        return "/media/legend/red-pin.webp";
      } else if (status.toLowerCase() == "normal") {
        return "/media/legend/green-pin.webp";
      }
    },
    getMapColor(regColor) {
      regColor = parseInt(regColor);
      if (regColor < 5) {
        return "#f21111";
      } else if (regColor >= 5 && regColor <= 10) {
        return "#f21111";
      } else if (regColor > 10 && regColor <= 15) {
        return "#f21111";
      } else if (regColor > 15 && regColor <= 20) {
        return "#f23711";
      } else if (regColor > 20 && regColor <= 25) {
        return "#f23711";
      } else if (regColor > 25 && regColor <= 30) {
        return "#f25c11";
      } else if (regColor > 30 && regColor <= 35) {
        return "#f25c11";
      } else if (regColor > 35 && regColor <= 40) {
        return "#f28211";
      } else if (regColor > 40 && regColor <= 45) {
        return "#f28211";
      } else if (regColor > 45 && regColor <= 50) {
        return "#f2a711";
      } else if (regColor > 50 && regColor <= 55) {
        return "#f2a711";
      } else if (regColor > 55 && regColor <= 60) {
        return "#f2cc11";
      } else if (regColor > 60 && regColor <= 65) {
        return "#f2cc11";
      } else if (regColor > 65 && regColor <= 70) {
        return "#f2f211";
      } else if (regColor > 70 && regColor <= 75) {
        return "#f2f211";
      } else if (regColor > 75 && regColor <= 80) {
        return "#c2e60f";
      } else if (regColor > 80 && regColor <= 85) {
        return "#c2e60f";
      } else if (regColor > 85 && regColor <= 90) {
        return "#67f211";
      } else if (regColor > 90 && regColor <= 95) {
        return "#46e800";
      } else if (regColor > 95 && regColor <= 100) {
        return "#39bd00";
      }
    },
    getWitelColor(witelColor) {
      witelColor = parseInt(witelColor);
      if (witelColor < 5) {
        return "#f21111";
      } else if (witelColor >= 5 && witelColor <= 10) {
        return "#f21111";
      } else if (witelColor > 10 && witelColor <= 15) {
        return "#f21111";
      } else if (witelColor > 15 && witelColor <= 20) {
        return "#f23711";
      } else if (witelColor > 20 && witelColor <= 25) {
        return "#f23711";
      } else if (witelColor > 25 && witelColor <= 30) {
        return "#f25c11";
      } else if (witelColor > 30 && witelColor <= 35) {
        return "#f25c11";
      } else if (witelColor > 35 && witelColor <= 40) {
        return "#f28211";
      } else if (witelColor > 40 && witelColor <= 45) {
        return "#f28211";
      } else if (witelColor > 45 && witelColor <= 50) {
        return "#f2a711";
      } else if (witelColor > 50 && witelColor <= 55) {
        return "#f2a711";
      } else if (witelColor > 55 && witelColor <= 60) {
        return "#f2cc11";
      } else if (witelColor > 60 && witelColor <= 65) {
        return "#f2cc11";
      } else if (witelColor > 65 && witelColor <= 70) {
        return "#f2f211";
      } else if (witelColor > 70 && witelColor <= 75) {
        return "#f2f211";
      } else if (witelColor > 75 && witelColor <= 80) {
        return "#c2e60f";
      } else if (witelColor > 80 && witelColor <= 85) {
        return "#c2e60f";
      } else if (witelColor > 85 && witelColor <= 90) {
        return "#67f211";
      } else if (witelColor > 90 && witelColor <= 95) {
        return "#46e800";
      } else if (witelColor > 95 && witelColor <= 100) {
        return "#39bd00";
      }
    },
    getStatusBar() {
      if (this.valueBar < 5) {
        return "zero";
      } else if (this.valueBar >= 5 && this.valueBar <= 10) {
        return "ten";
      } else if (this.valueBar > 10 && this.valueBar <= 15) {
        return "ten-half";
      } else if (this.valueBar > 15 && this.valueBar <= 20) {
        return "twenty";
      } else if (this.valueBar > 20 && this.valueBar <= 25) {
        return "twenty-half";
      } else if (this.valueBar > 25 && this.valueBar <= 30) {
        return "thirty";
      } else if (this.valueBar > 30 && this.valueBar <= 35) {
        return "thirty-half";
      } else if (this.valueBar > 35 && this.valueBar <= 40) {
        return "fourty";
      } else if (this.valueBar > 40 && this.valueBar <= 45) {
        return "fourty-half";
      } else if (this.valueBar > 45 && this.valueBar <= 50) {
        return "fifty";
      } else if (this.valueBar > 50 && this.valueBar <= 55) {
        return "fifty-half";
      } else if (this.valueBar > 55 && this.valueBar <= 60) {
        return "sixty";
      } else if (this.valueBar > 60 && this.valueBar <= 65) {
        return "sixty-half";
      } else if (this.valueBar > 65 && this.valueBar <= 70) {
        return "seventy";
      } else if (this.valueBar > 70 && this.valueBar <= 75) {
        return "seventy-half";
      } else if (this.valueBar > 75 && this.valueBar <= 80) {
        return "eighty";
      } else if (this.valueBar > 80 && this.valueBar <= 85) {
        return "eighty-half";
      } else if (this.valueBar > 85 && this.valueBar <= 90) {
        return "ninety";
      } else if (this.valueBar > 90 && this.valueBar <= 95) {
        return "ninety-half";
      } else if (this.valueBar > 95 && this.valueBar <= 100) {
        return "onehundred";
      }
    },
  },
};
</script>

<style scoped>
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}

.progress {
  margin: 0 auto;
  width: 100%;
  height: 2.5rem;
}

.progress {
  padding: 2px;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25),
    0 1px rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25),
    0 1px rgba(255, 255, 255, 0.08);
}

.progress-text {
  font-size: 16px;
  margin-bottom: 5px;
}

.progress-bar {
  border-radius: 4px;
  background-image: -webkit-linear-gradient(
    top,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.05)
  );
  background-image: -moz-linear-gradient(
    top,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.05)
  );
  background-image: -o-linear-gradient(
    top,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.05)
  );
  background-image: linear-gradient(
    top,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.05)
  );
  -webkit-transition: 0.4s linear;
  -moz-transition: 0.4s linear;
  -o-transition: 0.4s linear;
  transition: 0.4s linear;
  -webkit-transition-property: width, background-color;
  -moz-transition-property: width, background-color;
  -o-transition-property: width, background-color;
  transition-property: width, background-color;
  -webkit-box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.25),
    inset 0 1px rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.25),
    inset 0 1px rgba(255, 255, 255, 0.1);
}

#zero {
  width: 5%;
  background-color: #f21111;
}

#ten {
  width: 10%;
  background-color: #f21111;
}

#ten-half {
  width: 15%;
  background-color: #f21111;
}

#twenty {
  width: 20%;
  background-color: #f23711;
}

#twenty-half {
  width: 25%;
  background-color: #f23711;
}

#thirty {
  width: 30%;
  background-color: #f25c11;
}

#thirty-half {
  width: 35%;
  background-color: #f25c11;
}

#fourty {
  width: 40%;
  background-color: #f28211;
}

#fourty-half {
  width: 45%;
  background-color: #f28211;
}

#fifty {
  width: 50%;
  background-color: #f2a711;
}

#fifty-half {
  width: 55%;
  background-color: #f2a711;
}

#sixty {
  width: 60%;
  background-color: #f2cc11;
}

#sixty-half {
  width: 65%;
  background-color: #f2cc11;
}

#seventy {
  width: 70%;
  background-color: #f2f211;
}

#seventy-half {
  width: 75%;
  background-color: #f2f211;
}

#eighty {
  width: 80%;
  background-color: #c2e60f;
}

#eighty-half {
  width: 85%;
  background-color: #67f211;
}

#ninety {
  width: 90%;
  background-color: #67f211;
}

#ninety-half {
  width: 95%;
  background-color: #46e800;
}

#onehundred {
  width: 100%;
  background-color: #39bd00;
}

/*Setup*/
html,
body {
  padding: 0;
  margin: 0;
}

html,
body,
#mapid {
  height: 100%;
  width: 100%;
}

.status-wrapped {
  display: flex;
  justify-content: center;
}

.status-alert {
  display: flex;
  align-items: center;
}

.red-status {
  background-color: red;
  width: 10px;
  height: 10px;
}

.yellow-status {
  background-color: #f2a711;
  width: 10px;
  height: 10px;
}

.green-status {
  background-color: green;
  width: 10px;
  height: 10px;
}

/*Legend specific*/
div.legend.leaflet-control {
  padding: 6px 8px;
  font: 14px Arial, Helvetica, sans-serif;
  background: white;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  line-height: 24px;
  color: #555;
}

.legend h4 {
  text-align: center;
  font-size: 16px;
  margin: 2px 12px 8px;
  color: red !important;
}

.legend span {
  position: relative;
  bottom: 3px;
}

.legend img {
  width: 18px;
  height: 18px;
  float: left;
  margin: 0 8px 0 0;
  opacity: 0.7;
}

.alert-wrapped {
  display: flex;
  justify-content: center;
  color: white;
}

.badge {
  background-image: linear-gradient(
    to right,
    #ff0000,
    #ff5900,
    #ff8500,
    #ffa900,
    #ffcb00,
    #efd300,
    #dcdb00,
    #c8e300,
    #a0d300,
    #78c200,
    #4db100,
    #009f01
  );
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 13px;
  border-radius: 15px;
}

.badge-two {
  color: black;
}

#back-btn {
  display: none;
}
</style>
