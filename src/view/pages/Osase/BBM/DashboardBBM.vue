<template>
  <div class="card card-custom card-stretch gutter-b">
    <!--begin::Header-->
    <div class="card-header border-0 py-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-dark">
          Sistem Monitoring Deg Fuel
        </span>
      </h3>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body mb-6 pt-2">
      <div class="row">
        <div class="col-4">
          <b-form-select
            v-model="selectedRegional"
            :options="optionsRegional"
          ></b-form-select>
        </div>
        <div class="col-4"></div>
        <div class="col-4">
          <b-form-select
            v-model="selectedUnit"
            :options="optionsUnit"
          ></b-form-select>
        </div>
      </div>
      <div class="row mt-1">
        <div class="col-4">
          <b-form-select
            v-model="selectedWitel"
            :options="optionsWitel"
          ></b-form-select>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <Bar />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <table class="table table-bordered">
            <thead class="text-center">
              <tr>
                <th rowspan="3">No</th>
                <th rowspan="3">Lokasi</th>
                <th colspan="2">Jumlah Tangki</th>
                <th colspan="2">Sensor</th>
                <th colspan="6">Object Monitoring</th>
              </tr>
              <tr>
                <th rowspan="2">Jenis</th>
                <th rowspan="2">Kapasitas</th>
                <th rowspan="2">Jumlah</th>
                <th rowspan="2">Exception</th>
                <th colspan="6">BBM</th>
              </tr>
              <tr>
                <th>Volume</th>
                <th>Persen</th>
                <th>Supp Ops</th>
                <th>Status</th>
                <th>(%) Sisa</th>
                <th>(Liter) Sisa</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr>
                <td>1</td>
                <td>Klari</td>
                <td>52</td>
                <td>52000</td>
                <td>0</td>
                <td>
                  <ModalExceptionSensor />
                </td>
                <td>0</td>
                <td>0</td>
                <td>-3.5 Jam</td>
                <td>
                  <b-progress class="mt-2" :max="max" show-value>
                    <b-progress-bar :value="value" variant="success" animated>
                      <span>
                        <strong>{{ value }} %</strong></span
                      ></b-progress-bar
                    >
                  </b-progress>
                </td>
                <td><a href="#">Show</a></td>
                <td><a href="#">Show</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!--end::Body-->
  </div>
</template>

<script>
// import MonitoringChart from "../Chart/MonitoringChart.vue";
import ModalExceptionSensor from "../Components/ModalExceptionSensor.vue";
import Bar from "./Bar.vue";

import {
  STATE_REGIONAL,
  STATE_FILTER_UNIT,
  STATE_WITEL,
  STATE_TABLE_WITEL,
  STATE_TABLE_REGIONAL,
  STATE_TABLE_LOKASI,
} from "./bbm.state";

export default {
  name: "DashboardBBM",
  data() {
    return {
      selectedRegional: STATE_REGIONAL.selected,
      optionsRegional: STATE_REGIONAL.opts,
      selectedUnit: STATE_FILTER_UNIT.selected,
      optionsUnit: STATE_FILTER_UNIT.opts,
      selectedWitel: STATE_WITEL.selected,
      optionsWitel: STATE_WITEL.opts,
      tableRegional: STATE_TABLE_REGIONAL.regionalData,
      tableWitel: STATE_TABLE_WITEL.witelData,
      tableLokasi: STATE_TABLE_LOKASI.locationData,
      max: 100,
      value: 80,
    };
  },
  components: {
    // MonitoringChart,
    ModalExceptionSensor,
    Bar,
  },
};
</script>