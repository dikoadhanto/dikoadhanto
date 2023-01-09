<template>
  <section id="md-rtu-monitoring">
    <card-filter />
    <div class="card">
      <div class="card-header">
        <div class="wrap-title">
          <div
            class="title mr-3"
            :class="page == 'summary' ? 'title-active' : ''"
            @click="changeDataTable('summary')"
          >
            Table View Summary RTU
          </div>
          <div
            class="title mr-3"
            :class="page == 'status-md' ? 'title-active' : ''"
            @click="changeDataTable('status-md')"
          >
            Table View Status MD
          </div>
          <div
            class="title mr-3"
            :class="page == 'status-rtu' ? 'title-active' : ''"
            @click="changeDataTable('status-rtu')"
          >
            Table View Status RTU
          </div>
        </div>
        <div class="wrap-actions">
          <b-button
            variant="secondary"
            class="mr-2"
            v-if="getIdWitelMdRtu != null && page == 'summary'"
            @click="backToBefore"
          >
            <b-icon icon="arrow-left" aria-hidden="true"></b-icon>
            Back
          </b-button>
          <CountTimer @getData="getData" class="mr-1" />

          <b-button
            variant="danger"
            size="sm"
            @click="exportToExcel"
            class="p-1"
          >
            <b-icon
              icon="file-earmark-excel-fill"
              aria-hidden="true"
              font-scale="1"
            ></b-icon>
            Export
          </b-button>
        </div>
      </div>
      <div class="card-body">
        <TableSummary v-if="page == 'summary'" ref="summary" />
        <TableStatusMd v-if="page == 'status-md'" ref="status-md" />
        <TableStatusRtu v-if="page == 'status-rtu'" ref="status-rtu" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import CardFilter from "./CardFilter.vue";
import CountTimer from "@/view/pages/Components/CountTimer.vue";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

// page table body
import TableSummary from "./table-body/TableSummary.vue";
import TableStatusMd from "./table-body/TableStatusMd.vue";
import TableStatusRtu from "./table-body/TableStatusRtu.vue";

export default {
  name: "MdRtuMonitoring",
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Dashboard", subtitle: "MD & RTU Monitoring" },
    ]);
    this.$store.dispatch("setRtuStatusSensor", "");
    this.writeNewTitle("MD RTU Monitoring");

    setTimeout(() => {
      this.getData();
    }, 2000);
  },
  computed: {
    ...mapGetters([
      "getIdRegionalMdRtu",
      "getIdWitelMdRtu",
      "getIdLocationMdRtu",
      "getIdTagsMdRtu",
    ]),
  },
  components: {
    CountTimer,
    CardFilter,
    TableSummary,
    TableStatusMd,
    TableStatusRtu,
  },
  data() {
    return {
      page: "summary",
    };
  },
  methods: {
    getData() {
      if (this.page == "summary") {
        return this.$refs["summary"].getData();
      } else if (this.$refs["status-md"]) {
        return this.$refs["status-md"].getData();
      } else if (this.$refs["status-rtu"]) {
        return this.$refs["status-rtu"].getData();
      }
    },
    changeDataTable(page) {
      this.page = page;
    },
    backToBefore() {
      if (this.getIdLocationMdRtu != null) {
        this.$store.dispatch("setLocationMdRtu", null);
        this.$store.dispatch("setPageMdRtu", "regional");
      } else {
        this.$store.dispatch("setWitelMdRtu", null);
      }
    },
    exportToExcel() {
      if (this.page == "summary") {
        this.ExportToExcelFromMixin("Table View Summary RTU", "table-summary");
      } else if (this.page == "status-md") {
        this.ExportToExcelFromMixin("Table View Status MD", "table-status-md");
      } else if (this.page == "status-rtu") {
        this.ExportToExcelFromMixin(
          "Table View Status RTU",
          "table-status-rtu"
        );
      }
    },
  },
};
</script>

<style scoped>
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.wrap-actions,
.wrap-title,
.wrap-refresh {
  display: flex;
  align-items: center;
}
.title {
  cursor: pointer;
}
.refresh-box,
.wrap-refresh {
  padding: 5px;
  border-radius: 5px;
}
.refresh-text {
  font-weight: 500;
}
.title-active {
  font-weight: bold;
  padding-bottom: 10px;
  border-bottom: 2px solid #00c853;
}
</style>
