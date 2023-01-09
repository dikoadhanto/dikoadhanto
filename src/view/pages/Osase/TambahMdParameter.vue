<template>
  <div class="card card-custom card-stretch gutter-b">
    <!--begin::Header-->
    <div class="card-header border-0 py-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-dark"> Parameter </span>
        <span class="text-muted mt-3 font-weight-bold font-size-sm">
          Parameter / MD
        </span>
      </h3>
      <div class="card-toolbar">
        <b-row>
          <b-col><ModalInputMd :title="'Tambah MD'" /></b-col>
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
import ModalInputMd from "./Components/ModalInputMd.vue";

export default {
  name: "DashboardBbm",
  data() {
    return {
      items: [
        {
          no: 1,
          id_md: "MD-API",
          ip_address: "1.1.1.1",
          name_md: "API SMART",
          location: "Bandung Japati",
          city: "Bandung",
          mode_md: "Backup",
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
          key: "id_md",
          label: "ID MD",
          //   sortable: true,
          //   searchLabel: "Search",
        },
        {
          key: "ip_address",
          label: "IP Address",
          //   sortable: true,
          //   thStyle: "min-width: 140px",
          //   searchLabel: "Search",
        },
        {
          key: "name_md",
          label: "Nama MD",
          //   sortable: true,
          //   thStyle: "min-widht: 140px",
          //   searchLabel: "Search",
        },
        {
          key: "location",
          label: "Lokasi",
          //   sortable: true,
          //   searchLabel: "Search",
        },
        {
          key: "city",
          label: "Kota",
          //   sortable: true,
          //   searchLabel: "Search",
        },
        {
          key: "mode_md",
          label: "Mode MD",
          //   sortable: true,
          //   thStyle: "min-width: 200px",
          //   searchLabel: "Search",
        },
        { key: "actions", label: "Actions", thStyle: "min-width: 140px" },
      ],
      filters: {
        no: "",
        id_md: "",
        ip_address: "",
        name_md: "",
        location: "",
        city: "",
        mode_md: "",
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
              id_md: "",
              ip_address: "",
              name_md: "",
              location: "",
              city: "",
              mode_md: "",
            },
          ];
    },
  },
  components: {
    ModalInputMd,
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