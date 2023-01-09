<template>
  <div>
    <b-button @click="modalShow = !modalShow" variant="primary">1</b-button>

    <b-modal v-model="modalShow" centered="true" hide-footer hide-header>
      <table class="table table-bordered">
        <thead class="text-center">
          <tr>
            <th rowspan="3">No</th>
            <th rowspan="3">Lokasi</th>
            <th colspan="2">Jumlah Tangki</th>
            <th colspan="2">Sensor</th>
            <th colspan="3">Object Monitoring</th>
          </tr>
          <tr>
            <th rowspan="2">Jumlah</th>
            <th rowspan="2">Kapasitas</th>
            <th rowspan="2">Jumlah</th>
            <th rowspan="2">Exception</th>
            <th colspan="3">BBM</th>
          </tr>
          <tr>
            <th>Volume</th>
            <th>Persen</th>
            <th>Alarm</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr>
            <td>1</td>
            <td>TREG 1</td>
            <td>52</td>
            <td>52000</td>
            <td>0</td>
            <td>
              <ModalExceptionSensor />
            </td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
          </tr>
        </tbody>
      </table>
    </b-modal>
  </div>
</template>

<script>
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  data() {},
  props: {
    title: String,
  },
};
</script>