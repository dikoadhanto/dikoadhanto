<template>
  <div>
    <b-button @click="modalShow = !modalShow" variant="primary"
      >Tambah</b-button
    >

    <b-modal v-model="modalShow" :title="title">
      <b-row v-for="(input, i) in formInput" :key="i" class="mt-2">
        <b-col>
          <b-form-group
            v-if="input.type == 'text'"
            :label="input.label"
            label-for="per-page-select"
            label-cols-sm="4"
            label-cols-md="4"
            label-align-sm="left"
            class="mb-0"
          >
            <b-form-input
              v-model="input.value"
              :type="input.type"
              :placeholder="input.placeholder"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            v-if="input.type == 'treeselect'"
            :label="input.label"
            label-for="per-page-select"
            label-cols-sm="4"
            label-cols-md="4"
            label-align-sm="left"
            class="mb-0"
          >
            <treeselect
              id="template-name"
              required
              :options="input.opt"
              :placeholder="input.placeholder"
              v-model="input.value"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <template #modal-footer class="col">
        <div class="w-100">
          <b-button
            variant="primary"
            size="sm"
            class="float-left mr-2"
            @click="modalShow = false"
          >
            Simpan
          </b-button>
          <b-button
            variant="primary"
            size="sm"
            class="float-left"
            @click="modalShow = false"
          >
            Batal
          </b-button>
        </div>
      </template>
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