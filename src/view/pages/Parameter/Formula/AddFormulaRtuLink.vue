<template>
  <div id="formula-rtu">Isaaa isaa</div>
</template>

<script>
import { mapGetters } from "vuex";
import ApiService from "@/core/services/api.service";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

export default {
  data() {
    return {
      dataFormula: {},
    };
  },
  computed: {
    ...mapGetters(["getIdFormulaRtu"]),
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Parameter", subtitle: "Formula Management" },
    ]);
    this.getDataFormula();
  },
  methods: {
    getDataFormula() {
      ApiService.query(
        `${process.env.VUE_APP_ROOT_API_4}/formula/${this.getIdFormulaRtu}`
      )
        .then(({ data }) => {
          this.dataFormula = data.result;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
  },
};
</script>
