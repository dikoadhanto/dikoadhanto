<template>
  <div id="formula-rtu">
    <div class="card">
      <div class="card-body">
        <div class="mb-5">
          <div class="btn btn-primary" @click="addRtuFormula">
            <i class="fas fa fa-plus"></i> Tambah RTU
          </div>
        </div>
        <div class="table-responsive">
          <table class="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>fdf</th>
                <th>fdf</th>
                <th>fdf</th>
                <th>fdf</th>
                <th>fdf</th>
                <th>fdf</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>fdf</td>
                <td>fdf</td>
                <td>fdf</td>
                <td>fdf</td>
                <td>fdf</td>
                <td>fdf</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import ApiService from "@/core/services/api.service";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

export default {
  data() {
    return {
      dataFormula: {},
    };
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Parameter", subtitle: "Formula Management" },
    ]);
    // this.getDataFormula();
  },
  methods: {
    addRtuFormula() {
      this.$router.push({
        name: "Add Link Formula",
      });
    },
  },
};
</script>
