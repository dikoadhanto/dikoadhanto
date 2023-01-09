<template>
  <div class="card card-custom card-stretch gutter-b">
    <!--begin::Header-->
    <div class="card-header border-0 py-5">
      <h3 class="card-title align-items-start flex-column"></h3>
      <div class="card-toolbar">
        <b-row>
          <b-col><ModalInputRuleRTU :title="'Buat Rule'" /></b-col>
        </b-row>
      </div>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body mb-6 pt-2">
      <b-table
        :items="filtered"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filter-included-fields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        :busy.sync="loading"
        show-empty
        responsive
        @filtered="onFiltered"
      >
        <template slot="top-row" slot-scope="{ fields }">
          <th class="p-0 px-1 pb-1" v-for="field in fields" :key="field.key">
            <b-form-input
              v-model="filters[field.key]"
              v-if="field.searchLabel"
              :placeholder="field.searchLabel"
            ></b-form-input>
          </th>
        </template>
        <template #table-busy>
          <div class="text-center text-primary my-2">
            <b-spinner class="align-middle"></b-spinner>
            &nbsp;<strong>Loading...</strong>
          </div>
        </template>

        <template #cell(status)="row">
          <toggle-button
            :value="row"
            color="#00ff3f"
            :sync="false"
            :labels="true"
          />
        </template>
        <template #cell(actions)="row">
          <b-button variant="warning" class="w-100 mt-1" @click="`${row}`">
            Edit
          </b-button>
          <br />
          <b-button variant="primary" @click="`#`" class="w-100 mt-1">
            Keterangan
          </b-button>
          <br />
          <b-button variant="primary" @click="`#`" class="w-100 mt-1">
            Detail
          </b-button>
          <br />
          <b-button variant="danger" @click="`#`" class="w-100 mt-1">
            Delete
          </b-button>
        </template>

        <template #row-details="row">
          <b-card>
            <ul>
              <li v-for="(value, key) in row.item" :key="key">
                {{ key }}: {{ value }}
              </li>
            </ul>
          </b-card>
        </template>
      </b-table>
    </div>
    <!--end::Body-->
  </div>
</template>

<script>
import ModalInputRuleRTU from "../Components/ModalInputRuleRTU.vue";
export default {
  name: "AddRuleRTU",
  data() {
    return {
      items: [
        {
          no: 1,
          created_date: "22-11-2021",
          created_by: "User1",
          rule_name: "Alert&Treshold",
          rule_desc: "Treatment Pengukuran",
          id_rtu: "RTU001",
          status: false,
        },
      ],
      fields: [
        {
          key: "no",
          label: "Nomor",
          //   sortable: true,
          //   sortDirection: "desc",
          //   searchLabel: "Search",
        },
        {
          key: "created_date",
          label: "Tanggal Buat",
          //   sortable: true,
          //   searchLabel: "Search",
        },
        {
          key: "created_by",
          label: "Dibuat Oleh",
          //   sortable: true,
          //   thStyle: "min-width: 140px",
          //   searchLabel: "Search",
        },
        {
          key: "rule_name",
          label: "Nama Rule",
          //   sortable: true,
          //   thStyle: "min-widht: 140px",
          //   searchLabel: "Search",
        },
        {
          key: "rule_desc",
          label: "Deskripsi Rule",
          //   sortable: true,
          //   searchLabel: "Search",
        },
        {
          key: "id_rtu",
          label: "RTU ID",
          //   sortable: true,
          //   searchLabel: "Search",
        },
        {
          key: "status",
          label: "Status",
          //   sortable: true,
          //   thStyle: "min-width: 200px",
          //   searchLabel: "Search",
        },
        { key: "actions", label: "Actions", thStyle: "min-width: 140px" },
      ],
      filters: {
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
      pageOptions: [5, 10, 15, { value: 100, text: "Tampilkan semua" }],
      perPage: 5,
      totalRows: 1,
      currentPage: 1,
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
  },
  components: {
    ModalInputRuleRTU,
  },
};
</script>

<style scoped>
.h-150 {
  height: 150px;
}
.clicked-card:active {
  background-color: black !important;
}
</style>