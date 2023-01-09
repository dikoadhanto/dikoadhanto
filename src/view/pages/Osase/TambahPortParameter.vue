<template>
  <div class="card card-custom card-stretch gutter-b">
    <!--begin::Header-->
    <div class="card-header border-0 py-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-dark"> Parameter </span>
        <span class="text-muted mt-3 font-weight-bold font-size-sm">
          Parameter / Tipe Port & Threshold
        </span>
      </h3>
      <div class="card-toolbar">
        <b-row>
          <b-col><ModalInputPort :title="'Tambah Port'" /></b-col>
          <b-col
            ><b-button style="width: 100px" variant="danger"
              >Hapus</b-button
            ></b-col
          >
        </b-row>
      </div>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body mb-6 pt-2">
      <!-- Main table element -->
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
        <template #cell(actions)="row">
          <router-link
            :to="`/kalibrasi/edit-kalibrasi/${row.item.id_item_transaksi}`"
          >
            Details
          </router-link>
          |
          <router-link :to="`#`"> Hapus </router-link>
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

      <!-- Pagination -->
      <b-row>
        <b-col class="my-1 d-flex align-items-center">
          <div class="mr-2">
            Showing {{ currentPage }} of {{ totalRows }} entries
          </div>
        </b-col>
        <b-col class="my-1 d-flex align-items-center justify-content-end">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            class="my-0"
            first-class="border-0"
            pills
          ></b-pagination>
        </b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col class="my-1">
          <b-form-group
            label="Show"
            label-for="per-page-select"
            label-cols-sm="1"
            label-cols-md="1"
            label-align-sm="left"
            class="mb-0"
          >
            <b-form-select
              id="per-page-select"
              v-model="perPage"
              :options="pageOptions"
              class="col-12 col-md-4"
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
    </div>
    <!--end::Body-->
  </div>
</template>

<script>
import ModalInputPort from "./Components/ModalInputPort.vue";

export default {
  name: "DashboardBbm",
  data() {
    return {
      items: [
        {
          no: 1,
          id_type_port: 2,
          mode_port: "Analog",
          type: "TEM-RPKIT",
          name: "NE",
          satuan: "A",
          jenis_treshold: "ATAS-BAWAH",
          treshold_min: 80,
          treshold_max: 120,
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
          key: "id_type_port",
          label: "ID Type Port",
          //   sortable: true,
          //   searchLabel: "Search",
        },
        {
          key: "mode_port",
          label: "Mode Port",
          //   sortable: true,
          //   thStyle: "min-width: 140px",
          //   searchLabel: "Search",
        },
        {
          key: "type",
          label: "Tipe",
          //   sortable: true,
          //   thStyle: "min-widht: 140px",
          //   searchLabel: "Search",
        },
        {
          key: "name",
          label: "Nama",
          //   sortable: true,
          //   searchLabel: "Search",
        },
        {
          key: "satuan",
          label: "Satuan",
          //   sortable: true,
          //   searchLabel: "Search",
        },
        {
          key: "jenis_treshold",
          label: "Jenis Trashold",
          //   sortable: true,
          //   thStyle: "min-width: 200px",
          //   searchLabel: "Search",
        },
        {
          key: "treshold_min",
          label: "Treshold Bawah",
          //   sortable: true,
          //   searchLabel: "Search",
        },
        {
          key: "treshold_max",
          label: "Trashold Atas",
          //   sortable: true,
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
  components: {
    ModalInputPort,
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>