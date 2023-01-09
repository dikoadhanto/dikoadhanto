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
          label: "ID MD",
          model: "id_md",
          value: null,
          type: "text",
          placeholder: "Enter ID type port",
          isRequired: false,
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
          label: "Nama MD",
          model: "name_md",
          value: null,
          type: "treeselect",
          placeholder: "Enter Md name",
          isRequired: false,
          opt: [
            {
              id: "API Smart 1",
              label: "API Smart 1",
            },
            {
              id: "API Smart 2",
              label: "API Smart 2",
            },
          ],
        },
        {
          label: "Lokasi",
          model: "location",
          value: null,
          type: "treeselect",
          placeholder: "Enter Location",
          isRequired: false,
          opt: [
            {
              id: "Bandung",
              label: "Bandung",
            },
            {
              id: "Jakarta",
              label: "Jakarta",
            },
          ],
        },
        {
          label: "Kota",
          model: "city",
          value: null,
          type: "treeselect",
          placeholder: "Enter Satuan",
          isRequired: false,
          opt: [
            {
              id: "Bandung",
              label: "Bandung",
            },
            {
              id: "Jakarta",
              label: "Jakarta",
            },
          ],
        },
        {
          label: "Mode MD",
          value: null,
          model: "mode_md",
          type: "treeselect",
          placeholder: "Enter Jenis Treshold",
          isRequired: false,
          opt: [
            {
              id: "Backup1",
              label: "Backup1",
            },
            {
              id: "Backup2",
              label: "Backup2",
            },
          ],
        },
      ],
    };
  },
  props: {
    title: String,
  },
};
</script>