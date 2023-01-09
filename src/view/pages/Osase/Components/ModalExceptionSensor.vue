<template>
  <div>
    <b-button @click="modalShow = !modalShow" variant="primary">1</b-button>

    <b-modal v-model="modalShow" :centered="true" hide-footer hide-header>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Sensor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Sensor A</td>
          </tr>
        </tbody>
      </table>
    </b-modal>
  </div>
</template>

<script>
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  data() {
    return {
      modalShow: false,
      id_type_port: null,
      formInput: [
        {
          label: "ID Type Port",
          model: "id_type_port",
          value: null,
          type: "text",
          placeholder: "Enter ID type port",
          isRequired: false,
        },
        {
          label: "Mode Port",
          model: "mode_port",
          value: null,
          type: "treeselect",
          placeholder: "Enter Port Mode",
          isRequired: false,
          opt: [
            {
              id: "analog",
              label: "Analog",
            },
            {
              id: "digital",
              label: "Digital",
            },
          ],
        },
        {
          label: "Tipe",
          model: "type",
          value: null,
          type: "treeselect",
          placeholder: "Enter Type",
          isRequired: false,
          opt: [
            {
              id: "TEM-RPKIT1",
              label: "TEM-RPKIT1",
            },
            {
              id: "TEM-RPKIT2",
              label: "TEM-RPKIT2",
            },
          ],
        },
        {
          label: "Name",
          model: "name",
          value: null,
          type: "text",
          placeholder: "Enter Port",
          isRequired: false,
        },
        {
          label: "Satuan",
          model: "satuan",
          value: null,
          type: "treeselect",
          placeholder: "Enter Satuan",
          isRequired: false,
          opt: [
            {
              id: "ampere",
              label: "Ampere",
            },
            {
              id: "ohm",
              label: "Ohm",
            },
          ],
        },
        {
          label: "Jenis Threshold",
          value: null,
          model: "jenis_treshold",
          type: "text",
          placeholder: "Enter Jenis Treshold",
          isRequired: false,
        },
        {
          label: "Threshold Bawah",
          model: "treshold_min",
          value: null,
          type: "text",
          placeholder: "Enter Treshold Bawah",
          isRequired: false,
        },
        {
          label: "Threshold Atas",
          model: "treshold_max",
          value: null,
          type: "text",
          placeholder: "Enter Treshold Atas",
          isRequired: false,
        },
      ],
    };
  },
  props: {
    title: String,
  },
};
</script>