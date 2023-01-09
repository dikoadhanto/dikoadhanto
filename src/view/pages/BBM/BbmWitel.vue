<template>
  <div>
    <!--begin::Filter-->
    <div class="card card-custom card-stretch gutter-b">
      <FilterCard1 />
    </div>
    <!--end::Filter-->
    <!--begin::Graph-->
    <div class="card card-custom gutter-b">
      <graph-container-card></graph-container-card>
    </div>
    <!--end::Graph-->

    <div class="card card-custom gutter-b">
      <table-container-card :propsHeader="tableHeader"></table-container-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  components: {
    FilterCard1: () => import("../Components/FilterCard1.vue"),
    GraphContainerCard: () => import("../Components/GraphContainerCard.vue"),
    TableContainerCard: () => import("../Components/TableContainerCard.vue"),
  },
  data() {
    return {
      tabIndex: 0,
      tableHeader: "witel",
    };
  },
  computed: {
    ...mapGetters(["layoutConfig"]),

    config() {
      return this.layoutConfig();
    },
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Monitoring BBM", subtitle: "Witel" },
    ]);

    this.$nextTick(() => {
      const hljs = this.$el.querySelectorAll(".hljs");
      hljs.forEach((hl) => {
        hl.classList.remove("hljs");
        hl.classList.add(`language-${hl.classList[1]}`);
      });
    });
    this.writeNewTitle("BBM Monitoring");
  },
  destroyed() {
    localStorage.removeItem("monitoringTab");
  },
  methods: {
    /**
     * Reset config
     */
    reset(event) {
      event.preventDefault();
      // remove existing saved config
      localStorage.removeItem("config");
      window.location.reload();
    },

    /**
     * Submit form
     * @param event
     */
    submit(event) {
      event.preventDefault();
      // save new config to localStorage
      localStorage.setItem("config", JSON.stringify(this.config));
      window.location.reload();
    },
  },
};
</script>
