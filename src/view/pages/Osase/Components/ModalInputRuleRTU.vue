<template>
  <div>
    <b-button @click="modalShow = !modalShow" variant="primary"
      >Buat Rule</b-button
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
        <div class="w-100 text-center">
          <b-button
            variant="primary"
            size="sm"
            class="text-center mr-2"
            @click="goTo(`/kalibrasi/RTU/addSkenarioRTU?vid=${'RTU001'}`)"
          >
            Submit
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
          label: "Nama Rule",
          model: "rule_name",
          value: null,
          type: "text",
          placeholder: "Isi Nama Rule",
          isRequired: false,
        },
        {
          label: "Deskripsi Rule",
          model: "rule_desc",
          value: null,
          type: "text",
          placeholder: "Isi Deskripsi rule",
          isRequired: false,
        },
        {
          label: "Keterangan",
          model: "keterangan",
          value: null,
          type: "text",
          placeholder: "Isi Keterangan",
          isRequired: false,
        },
      ],
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
    filtered() {
      const filtered = this.items.filter((item) => {
        return Object.keys(this.filters).every((key) =>
          String(item[key])
            .toUpperCase()
            .includes(this.filters[key].toUpperCase())
        );
      });
      return filtered.length > 0
        ? filtered
        : [
            {
              no: "",
              id_type_port: "",
              mode_port: "",
              type: "",
              name: "",
              satuan: "",
              jenis_treshold: "",
              treshold_min: "",
              treshold_max: "",
            },
          ];
    },
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    goTo(routes) {
      this.$router.push(routes);
      this.modalShow = false;
    },
  },
  props: {
    title: String,
  },
};
</script>