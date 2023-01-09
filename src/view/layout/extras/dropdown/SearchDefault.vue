<template>
  <div
    v-bind:class="{ 'quick-search-has-result': hasResult() }"
    class="quick-search quick-search-dropdown quick-search-result-compact"
    id="kt_quick_search_dropdown"
  >
    <form method="get" class="quick-search-form">
      <div
        class="input-group spinner-input spinner-sm spinner-brand spinner-right"
        v-bind:class="{ spinner: loading }"
      >
        <div class="input-group-prepend">
          <span class="input-group-text">
            <i class="flaticon2-search-1"></i>
          </span>
        </div>
        <input
          @keyup="onSearch"
          type="text"
          class="form-control quick-search-input"
          placeholder="Cari RTU..."
        />
        <div class="input-group-append">
          <span class="input-group-text">
            <i
              class="quick-search-close"
              @click="reset"
              v-bind:style="{ display: hasResult() ? 'flex' : '' }"
            ></i>
          </span>
        </div>
      </div>
    </form>

    <KTSearchResult :data="dataRtu"></KTSearchResult>
  </div>
</template>

<script>
import ApiService from "@/core/services/api.service.js";
import KTSearchResult from "@/view/layout/extras/dropdown/SearchResult.vue";

export default {
  name: "KTSearchDefault",
  components: { KTSearchResult },
  data() {
    return {
      dataRtu: [],
      name: "",
      loading: false,
    };
  },
  mounted() {
    if (this.checkPermissionReturn("parameter_rtu_view")) {
      this.getDataRtu();
    }
  },
  methods: {
    getDataRtu() {
      this.dataRtu = [];
      ApiService.query(`${process.env.VUE_APP_ROOT_API_4}/rtu/only?`, {
        params: {
          limit: "100",
          name: this.name,
        },
      })
        .then(({ data }) => {
          this.dataRtu = data.result.map((rtu) => {
            return {
              id: rtu.id,
              label: `${rtu.name} (${rtu.sname})`,
            };
          });
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    async onSearch(event) {
      this.loading = true;
      this.name = event.target.value;
      await this.getDataRtu();
      this.loading = false;
    },
    hasResult() {
      return this.dataRtu.length || false;
    },
    reset() {
      this.dataRtu = [];
    },
  },
};
</script>
