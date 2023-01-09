<template>
  <div>
    <div class="card-header">
      <div class="card-title m-0">
        <b-row align-v="center">
          <b-col sm="6" md="11">
            <h3 class="card-label">
              Detail Status Monitoring {{ cardTitle(headTable) }}
            </h3>
          </b-col>
          <b-col sm="6" md="1">
            <b-button
              variant="primary"
              @click="
                ExportToExcel(
                  `Detail Status Monitoring ${cardTitle(headTable)}`
                )
              "
              >Export</b-button
            >
          </b-col>
        </b-row>
      </div>
    </div>

    <div class="card-body">
      <b-row class="mb-2">
        <b-col></b-col>
        <b-col></b-col>
        <b-col md="2" sm="12" align-self="end">
          <b-form-input
            v-model="filter"
            placeholder="Search"
            v-on:keyup.enter="getDataTable"
          ></b-form-input>
        </b-col>
      </b-row>

      <!--begin::Table-->
      <b-row>
        <b-col>
          <div class="example mb-10 table-responsive">
            <table
              class="table table-bordered"
              id="table-monitoring"
              :border="{ isExport: 1 }"
            >
              <head-table :propsHeadConfig="headTable"></head-table>
              <tbody class="text-center" v-if="headTable != 'headLocation'">
                <tr v-for="(item, i) in dataTable" :key="i">
                  <th scope="row">{{ item.i }}</th>
                  <td>
                    {{
                      headerConfig == "headRegional"
                        ? item.regional
                        : item.witel
                    }}
                  </td>
                  <td>
                    {{
                      formulaBBMPrice(
                        item.percentage,
                        item.tank_capacity,
                        item.bbm_price
                      )
                    }}
                  </td>
                  <td>{{ item.tank_total }}</td>
                  <td>{{ item.tank_capacity }}</td>
                  <td>{{ item.tank_total }}</td>
                  <td>
                    <b-button
                      variant="danger"
                      class="font-weight-bold p-1 w-50"
                      @click="getTableAlarmFailed(item.id_regional)"
                      >{{ item.sensor_failed }}</b-button
                    >
                  </td>
                  <td>{{ item.volume.toFixed(0) }}</td>
                  <td>
                    <b-progress
                      :value="getItemPercentage(item.percentage)"
                      :max="100"
                      show-progress
                      animated
                    ></b-progress>
                  </td>
                  <td>
                    <b-button
                      variant="warning"
                      class="font-weight-bold p-1 w-50"
                      @click="showModalAlarm('my-modal-alarm')"
                      >{{ item.alarm }}</b-button
                    >
                  </td>
                </tr>
              </tbody>
              <tbody class="text-center" v-else>
                <template v-for="(itemLoc, i) in dataTableLocation">
                  <tr :key="i">
                    <th
                      scope="row"
                      :rowspan="itemLoc.tanks.length + 1"
                      style="text-align: center; vertical-align: middle"
                    >
                      {{ itemLoc.i }}
                    </th>
                    <td
                      :rowspan="itemLoc.tanks.length + 1"
                      style="text-align: center; vertical-align: middle"
                    >
                      {{ itemLoc.location }}
                    </td>
                    <td
                      :rowspan="itemLoc.tanks.length + 1"
                      style="text-align: center; vertical-align: middle"
                    >
                      {{ itemLoc.rtu_id }}
                    </td>
                    <td
                      :rowspan="itemLoc.tanks.length + 1"
                      style="text-align: center; vertical-align: middle"
                    >
                      {{ itemLoc.rtu_name }}
                    </td>
                    <td
                      :rowspan="itemLoc.tanks.length + 1"
                      style="text-align: center; vertical-align: middle"
                    >
                      {{ itemLoc.description }}
                    </td>
                  </tr>
                  <tr v-for="item in itemLoc.tanks" :key="item.id_tank">
                    <td>{{ item.tank_type }}</td>
                    <td>{{ item.tank_capacity }}</td>
                    <td>
                      {{
                        formulaBBMPrice(
                          item.percentage,
                          item.tank_capacity,
                          itemLoc.bbm_price
                        )
                      }}
                    </td>
                    <td>
                      <b-button
                        v-if="
                          item.volume &&
                          item.volume > 0 &&
                          item.percentage &&
                          item.percentage <= 100
                        "
                        variant="primary"
                        class="font-weight-bold p-1 w-100"
                        >Normal</b-button
                      >
                      <b-button
                        v-else
                        variant="danger"
                        class="font-weight-bold p-1 w-100"
                        >Sensor Broken</b-button
                      >
                    </td>
                    <td>
                      {{ item.volume ? item.volume.toFixed(2) + " L" : "-" }}
                    </td>
                    <td>
                      <b-progress
                        :value="item.percentage"
                        :max="100"
                        show-progress
                        animated
                      ></b-progress>
                    </td>
                    <td>{{ convertSupportHour(item.support_hour) }}</td>
                    <td>
                      <b-button
                        v-if="item.support_hour >= 12"
                        variant="primary"
                        class="font-weight-bold p-1 w-100"
                        >Aman</b-button
                      >
                      <b-button
                        v-else-if="item.support_hour < 5"
                        variant="danger"
                        class="font-weight-bold p-1 w-100"
                        >Bahaya</b-button
                      >
                      <b-button
                        v-else
                        variant="warning"
                        class="font-weight-bold p-1 w-100"
                        >Waspada</b-button
                      >
                    </td>
                    <td>
                      <b-button
                        variant="primary"
                        class="font-weight-bold p-1 w-100"
                        @click="locationLiterGraph(item.id_tank, false, true)"
                        >Liter</b-button
                      >
                    </td>
                    <td>
                      <b-button
                        variant="primary"
                        class="font-weight-bold p-1 w-100"
                        @click="locationLiterGraph(item.id_tank, true, true)"
                        >Percent</b-button
                      >
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
            <b-row align-v="end">
              <b-col sm="6" md="9"
                ><b-pagination
                  v-model="currentPage"
                  :total-rows="totalRows"
                  :per-page="perPage"
                  class="my-0"
                  first-class="border-0"
                  pills
                ></b-pagination
              ></b-col>
              <b-col sm="6" md="1" class="p-0">
                <b-form-select
                  v-model="perPage"
                  :options="pageOptions"
                ></b-form-select>
              </b-col>
              <b-col
                class="text-right"
                align-self="center"
                sm="6"
                md="2"
                v-if="
                  headTable == 'headLocation' && dataTableLocation.length > 0
                "
              >
                Show {{ dataTableLocation[0].i }} -
                {{ dataTableLocation[dataTableLocation.length - 1].i }} of
                {{ totalRows }} entries
              </b-col>
              <b-col
                class="text-right"
                align-self="center"
                sm="6"
                md="2"
                v-else-if="dataTable.length > 0"
              >
                Show {{ dataTable[0].i }} -
                {{ dataTable[dataTable.length - 1].i }} of
                {{ totalRows }} entries
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
      <!--end::Table-->

      <b-modal
        title="Detail Alarm Sensor"
        ref="my-modal"
        hide-footer
        size="lg"
        centered
      >
        <div class="d-block text-center">
          <b-container fluid class="p-0">
            <b-row class="mb-2">
              <b-col md="2"> Tipe Tangki :</b-col>
              <b-col md="3">
                <b-form-radio-group
                  id="radio-group-1"
                  v-model="selected"
                  :options="optsTipeTangki"
                  name="radio-options"
                ></b-form-radio-group>
              </b-col>
              <b-col></b-col>
              <b-col md="2">
                <b-form-input placeholder="Search"></b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="p-0">
                <table class="table table-bordered">
                  <head-table-modal
                    :propsHeadConfig="headTbAlarm"
                  ></head-table-modal>
                  <tbody>
                    <tr v-for="(item, i) in dataTableAlarm" :key="i">
                      <td>{{ item.i }}</td>
                      <td>{{ item.witel }}</td>
                      <td>{{ item.location }}</td>
                      <td>{{ item.tank_type }}</td>
                      <td>{{ item.sensor_type }}</td>
                      <td>01/12/21</td>
                      <td>{{ item.duration.toFixed(0) }}</td>
                      <td>{{ item.pic }}</td>
                      <td>
                        <b-button
                          variant="primary"
                          class="w-100 mb-2"
                          @click="
                            alarmLiterGraph(item.rtu_port_id, false, false)
                          "
                          >Liter</b-button
                        >
                        <b-button
                          variant="primary"
                          class="w-100"
                          @click="
                            alarmLiterGraph(item.rtu_port_id, true, false)
                          "
                          >Percent</b-button
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </b-col>
            </b-row>
            <b-row align-v="end">
              <b-col sm="6" md="9"
                ><b-pagination
                  v-model="currentPage"
                  :total-rows="totalRows"
                  :per-page="perPage"
                  class="my-0"
                  first-class="border-0"
                  pills
                ></b-pagination
              ></b-col>
              <b-col sm="6" md="1" class="p-0">
                <b-form-select
                  v-model="selected"
                  :options="options"
                ></b-form-select>
              </b-col>
              <b-col class="text-right" align-self="center" sm="6" md="2">
                Show {{ perPage * currentPage }} of {{ totalRows }} entries
              </b-col>
            </b-row>
          </b-container>
        </div>
      </b-modal>

      <b-modal
        ref="my-modal-alarm"
        title="Graph Metric"
        hide-footer
        size="xl"
        centered
      >
        <div class="d-block text-center">
          <b-container fluid class="p-0">
            <b-row align-v="center">
              <b-col class="p-0" md="1"> Start Time: </b-col>
              <b-col class="p-0" md="2">
                <b-form-datepicker
                  v-model="startDate"
                  size="sm"
                  class="mb-2"
                ></b-form-datepicker>
              </b-col>
              <b-col class="p-0" md="1"> End Time: </b-col>
              <b-col class="p-0" md="2">
                <b-form-datepicker
                  size="sm"
                  v-model="endDate"
                  class="mb-2"
                ></b-form-datepicker>
              </b-col>
              <b-col></b-col>
              <b-col sm="6" md="1" class="p-1 btn-tab">
                <b-button
                  :variant="activeCategory === 'daily' ? 'success' : 'light'"
                  class="w-100"
                  @click="changeCategory('daily')"
                >
                  Daily
                </b-button>
              </b-col>
              <b-col sm="6" md="1" class="p-1 btn-tab">
                <b-button
                  :variant="activeCategory == 'weekly' ? 'success' : 'light'"
                  class="w-100"
                  @click="changeCategory('weekly')"
                >
                  Weekly
                </b-button>
              </b-col>
              <b-col sm="6" md="1" class="p-1 btn-tab">
                <b-button
                  :variant="activeCategory == 'monthly' ? 'success' : 'light'"
                  class="w-100"
                  @click="changeCategory('monthly')"
                >
                  Monthly
                </b-button>
              </b-col>
              <b-col sm="6" md="1" class="p-1 btn-tab">
                <b-button
                  :variant="activeCategory == 'yearly' ? 'success' : 'light'"
                  class="w-100"
                  @click="changeCategory('yearly')"
                >
                  Yearly
                </b-button>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="p-0">
                <line-bar
                  v-if="delayShow"
                  :startDate="startDate"
                  :endDate="endDate"
                ></line-bar>
              </b-col>
            </b-row>
          </b-container>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ApiService from "@/core/services/api.service.js";
import { SET_HEAD_TABLE } from "@/core/services/store/headTable.module";
import {
  SET_IS_CATEGORY,
  SET_IS_CATEGORY_GRAPH,
  SET_IS_PERCENTAGE,
  SET_IS_RTU_PORT_ID,
  SET_IS_LOCATION,
  SET_ONE_REGIONAL,
} from "@/core/services/store/data.module";

export default {
  name: "TableContainerCard",
  data() {
    return {
      currentPage: 1,
      isExport: false,
      selected: null,
      options: [
        { value: null, text: "all", disabled: true },
        { value: 3, text: "3" },
        { value: 5, text: "5" },
      ],
      optsTipeTangki: [
        { value: "harian", text: "harian" },
        { value: "bulanan", text: "bulanan" },
      ],
      headerConfig: "headRegional",
      headTbAlarm: "headAlarm",
      delayShow: false,
      dataTable: [],
      dataTableLocation: [],
      dataTableAlarm: [],
      dataTableLiter: [],
      totalRows: 100,
      perPage: 10,
      filter: "",
      pageOptions: [10, 15, { value: 100, text: "All" }],
      activeCategory: "daily",
      isPercentage: false,
      startDate: "",
      endDate: "",
    };
  },
  computed: {
    ...mapGetters([
      "headTable",
      "setData",
      "setRegionalId",
      "setWitelId",
      "setIsCategory",
      "setIsLocation",
    ]),
  },
  watch: {
    headTable: function () {
      this.headerConfig = this.headTable;
      if (this.headTable == "headRegional") {
        this.getTableRegionals();
      } else if (this.headTable == "headWitel") {
        this.getTableWitel();
      } else if (this.headTable == "headLocation") {
        this.getTableLocations();
      }
    },
    setData: function () {
      this.getDataTable();
    },
    currentPage: {
      handler: function () {
        this.getDataTable();
      },
    },
    headerConfig: function () {
      this.currentPage = 1;
      this.totalRows = 0;
    },
    setRegionalId: function () {
      if (this.setRegionalId) {
        this.headerConfig = "headWitel";
        this.$store.dispatch(SET_HEAD_TABLE, "headWitel");
      } else {
        this.headerConfig = "headRegional";
        this.$store.dispatch(SET_HEAD_TABLE, "headRegional");
      }
      this.getDataTable();
    },
    setWitelId: function () {
      if (this.setWitelId) {
        this.headerConfig = "headLocation";
        this.$store.dispatch(SET_HEAD_TABLE, "headLocation");
      } else {
        this.headerConfig = "headWitel";
        this.$store.dispatch(SET_HEAD_TABLE, "headWitel");
      }
      this.getDataTable();
    },
    perPage: {
      handler: function () {
        this.currentPage = 1;
        this.getDataTable();
      },
    },
  },
  props: {
    propsHeader: String,
  },
  components: {
    HeadTable: () => import("./Table/HeadTable.vue"),
    HeadTableModal: () => import("./Table/HeadTableModal.vue"),
    LineBar: () => import("./Graph/Line.vue"),
  },
  methods: {
    ExportToExcel(filename) {
      this.isExport = true;
      var downloadLink;
      var dataType = "application/vnd.ms-excel";
      var tableSelect = document.getElementById("table-monitoring");
      var tableHTML = tableSelect.outerHTML.replace(/ |#/g, (x) => {
        return x == "#" ? "No" : "%20";
      });

      // Specify file name
      filename = filename ? filename + ".xls" : "excel_data.xls";

      // Create download link element
      downloadLink = document.createElement("a");

      document.body.appendChild(downloadLink);

      if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob(["\ufeff", tableHTML], {
          type: dataType,
        });
        navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        // Create a link to the file
        downloadLink.href = "data:" + dataType + ", " + tableHTML;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
      }
      this.isExport = false;
    },
    getDataTable() {
      if (this.filter.length > 2 || this.filter.length === 0) {
        if (this.headerConfig == "headLocation") {
          if (this.setIsCategory == "alarm") {
            this.$store.dispatch(SET_IS_CATEGORY, "percentage");
          }
          this.getTableLocations();
        } else if (this.headerConfig == "headWitel") {
          this.getTableWitel();
        } else {
          this.getTableRegionals();
        }
      }
    },
    async getTableRegionals() {
      this.$bvModal.show("modalLoading");
      var url;
      if (this.setRegionalId) {
        url = `/regionals/bbm/monitoring?page=${this.currentPage}&limit=${this.perPage}&qSearch=${this.filter}`;
      } else {
        url = `/regionals/bbm/monitoring?page=${this.currentPage}&limit=${this.perPage}&qSearch=${this.filter}`;
      }
      await ApiService.query(url)
        .then(({ data }) => {
          let resData = data.result.regionals;
          this.dataTable = resData;
          this.totalRows = Number(data.result.totalData);
          setTimeout(() => {
            this.$bvModal.hide("modalLoading");
          }, 600);
          return resData;
        })
        .catch((error) => {
          setTimeout(() => {
            this.$bvModal.hide("modalLoading");
          }, 600);
          this.dataTable = [];
          console.log(error);
        });
    },
    formulaBBMPrice(persenTangki, literCapacity, bbmPrice) {
      let persen = 0;
      if (persenTangki >= 0) {
        persen = (100 - persenTangki) / 100;
      }
      const countPrice = literCapacity * bbmPrice ?? 0;
      const persenPrice = countPrice * persen;
      const finalPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(persenPrice);
      return finalPrice;
    },
    convertSupportHour(hour) {
      if (hour) {
        if (hour < 24) {
          return hour.toFixed(2) + " Jam";
        } else {
          const days = Math.floor(hour / 24);

          const hourLeft = hour - days * 24;

          return days + " Hari " + hourLeft.toFixed(1) + " Jam";
        }
      }
      return "-";
    },
    cardTitle(data) {
      if (data === "headRegional") {
        return "Nasional";
      } else if (data === "headLocation") {
        return "Witel";
      } else {
        return "Regional";
      }
    },
    showModalAlarm() {
      this.$refs["my-modal"].show();
    },
    showModalGraph() {
      this.$refs["my-modal-alarm"].show();
      this.delayShow = true;
    },
    async getTableWitel() {
      var url;
      if (this.setRegionalId) {
        url = `/witels/bbm/monitoring?regionalId=${this.setRegionalId}&page=${this.currentPage}&limit=${this.perPage}&qSearch=${this.filter}`;
      }
      this.$bvModal.show("modalLoading");
      await ApiService.query(url)
        .then(({ data }) => {
          setTimeout(() => {
            this.$bvModal.hide("modalLoading");
          }, 600);
          let resData = data.result.witels;
          this.dataTable = resData;
          this.totalRows = Number(data.result.totalData);
          return resData;
        })
        .catch((error) => {
          setTimeout(() => {
            this.$bvModal.hide("modalLoading");
          }, 600);
          this.dataTable = [];
          console.log(error);
        });
    },
    async getTableLocations() {
      var url;
      if (this.setWitelId) {
        url = `/locations/bbm/monitoring?witelId=${this.setWitelId}&page=${this.currentPage}&limit=${this.perPage}&qSearch=${this.filter}`;
      }
      await ApiService.query(url)
        .then(({ data }) => {
          let resData = data.result.locations;
          this.totalRows = Number(data.result.totalData);
          this.dataTableLocation = resData;
          return resData;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getTableAlarmFailed(idRegional) {
      this.$store.dispatch(SET_ONE_REGIONAL, idRegional);
      this.showModalAlarm();
      await ApiService.query(
        `/regionals/bbm/monitoring/${idRegional}/sensor-fail?limit=${this.perPage}&page=${this.currentPage}`
      )
        .then((data) => {
          this.showModalAlarm();
          let resData = data.data.result.regionals;
          this.dataTableAlarm = resData;
          this.totalRows = Number(data.data.result.totalData);
          this.$store.dispatch(SET_IS_RTU_PORT_ID, resData);
          return resData;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async locationLiterGraph(rtuPortId, isPercentage, isLocation) {
      this.$store.dispatch(SET_IS_RTU_PORT_ID, rtuPortId);
      this.$store.dispatch(SET_IS_PERCENTAGE, isPercentage);
      this.$store.dispatch(SET_IS_LOCATION, isLocation);
      this.showModalGraph();
    },
    alarmLiterGraph(rtuPort, isPercentage, isLocation) {
      this.$store.dispatch(SET_IS_LOCATION, isLocation);
      this.$store.dispatch(SET_IS_RTU_PORT_ID, rtuPort);
      this.$store.dispatch(SET_IS_PERCENTAGE, isPercentage);
      this.showModalGraph();
    },
    async regionalAlarmSensorGraph(rtuPortId) {
      this.showModalGraph();
      await ApiService.query(
        `/regionals/bbm/monitoring/${rtuPortId}?groupTime=daily`
      )
        .then(({ data }) => {
          let resData = data.result.regionals;
          this.$store.dispatch(SET_IS_RTU_PORT_ID, rtuPortId);
          this.showModalGraph();
          return resData;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    groupCalculateVol(data) {
      var result = [];
      data.reduce(function (res, value) {
        if (!res[value.id_location]) {
          res[value.id_location] = {
            id_location: value.id_location,
            location: value.location,
            rtu_id: value.rtu_id,
            tank_capacity: value.tank_capacity,
            sensor_status: value.sensor_failed,
            tank_type: value.tank_type,
            percentage: value.percentage,
            volume: 0,
          };
          result.push(res[value.id_location]);
        }
        res[value.id_location].volume += value.volume;
        return res;
      }, {});
      return result;
    },
    changeCategory(category) {
      this.$store.dispatch(SET_IS_CATEGORY_GRAPH, category);
      this.activeCategory = category;
    },
    getItemPercentage(data) {
      return data > 0 ? data : 0;
    },
  },
};
</script>
