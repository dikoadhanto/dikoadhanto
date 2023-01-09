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
          label: "ID RTU",
          model: "id_rtu",
          value: null,
          type: "treeselect",
          placeholder: "Enter ID RTU",
          isRequired: false,
          opt: [
            {
              id: "RTU STO Balaikota",
              label: "RTU STO Balaikota",
            },
            {
              id: "RTU STO Balaidesa",
              label: "RTU STO Balaidesa",
            },
          ],
        },
        {
          label: "MD",
          model: "id_md",
          value: null,
          type: "treeselect",
          placeholder: "Enter md",
          isRequired: false,
          opt: [
            {
              id: 1,
              label: "MD-API1",
            },
            {
              id: 2,
              label: "MD-API2",
            },
          ],
        },
        {
          label: "Lokasi",
          model: "location",
          value: null,
          type: "treeselect",
          placeholder: "Enter lokasi",
          isRequired: false,
          opt: [
            {
              id: "Bandung Japati",
              label: "Bandung Japati",
            },
            {
              id: "Bandung Soreang",
              label: "Bandung Soreang",
            },
          ],
        },
        {
          label: "IP Address",
          model: "ip_address",
          value: null,
          type: "treeselect",
          placeholder: "Enter IP",
          isRequired: false,
          opt: [
            {
              id: "1.1.1.1",
              label: "1.1.1.1",
            },
            {
              id: "1.1.1.2",
              label: "1.1.1.2",
            },
          ],
        },
        {
          label: "Nama RTU",
          model: "rtu_name",
          value: null,
          type: "text",
          placeholder: "Enter RTU",
          isRequired: false,
        },
        {
          label: "Level",
          value: null,
          model: "jenis_treshold",
          type: "text",
          placeholder: "Enter Level",
          isRequired: false,
        },
        {
          label: "Template",
          model: "template",
          value: null,
          type: "text",
          placeholder: "Enter Template",
          isRequired: false,
        },
        {
          label: "Organisasi",
          model: "organization",
          value: null,
          type: "text",
          placeholder: "Enter Organisasi",
          isRequired: false,
        },
        {
          label: "Port",
          model: "port",
          value: null,
          type: "text",
          placeholder: "Enter PORT",
          isRequired: false,
        },
        {
          label: "rule",
          model: "rule",
          value: null,
          type: "text",
          placeholder: "Enter Rule",
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