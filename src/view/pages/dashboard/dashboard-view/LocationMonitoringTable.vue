<template>
  <section id="monitoring-table">
    <card-filter />
    <div class="card">
      <div class="card-header">
        <div class="row d-flex align-items-center">
          <div class="col-md-5">
            <h4 class="title">Location Monitoring Table</h4>
          </div>
          <div class="col-md-7">
            <div class="wrap-actions">
              <CountTimer @getData="getDataTable" class="mr-2" />
              <b-button
                variant="danger"
                @click="
                  ExportToExcelFromMixin(
                    'Table Location Monitoring',
                    'table-location-monitoring'
                  )
                "
              >
                <b-icon
                  icon="file-earmark-excel-fill"
                  aria-hidden="true"
                ></b-icon>
              </b-button>
            </div>
          </div>
        </div>
      </div>
      <TableView ref="table-view" />
    </div>
  </section>
</template>

<script>
import TableView from "./TableView";
import CardFilter from "./CardFilter.vue";
import CountTimer from "@/view/pages/Components/CountTimer.vue";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

export default {
  components: {
    TableView,
    CountTimer,
    CardFilter,
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Dashboard", subtitle: "Location Monitoring Table" },
    ]);
    this.writeNewTitle("Location Monitoring Table");
  },
  methods: {
    getDataTable() {
      this.$refs["table-view"].getLocationMonitoring();
    },
  },
};
</script>

<style scoped>
.wrap-actions {
  display: flex;
  align-items: center;
}
</style>
