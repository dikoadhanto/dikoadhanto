<template>
  <div class="wrap-pagination">
    <!-- pagination -->
    <b-pagination
      class="mt-15"
      v-model="stateCurrentPage"
      :total-rows="totalData"
      :per-page="perPage"
      aria-controls="table-list-permission"
      @change="updatePage"
    ></b-pagination>

    <!-- show per page -->
    <div class="row align-items-center mr-0 ml-0 mb-2">
      <div class="col">
        <select
          class="form-control form-select"
          v-model="setPerPage"
          @change="changePerPage"
        >
          <option v-for="(page, i) in listPage" :key="i" :value="page.value">
            {{ page.text }}
          </option>
        </select>
      </div>
      <div class="col">
        <div class="info-page" v-if="currentPage == 1">
          Showing 1 -
          {{ perPage > totalData || perPage == "all" ? totalData : perPage }} of
          {{ totalData }}
        </div>
        <div class="info-page" v-else>
          Showing
          {{ (currentPage - 1) * perPage + 1 }}
          -
          {{
            perPage + (currentPage - 1) * perPage > totalData
              ? totalData
              : perPage + (currentPage - 1) * perPage
          }}
          of {{ totalData }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  emits: ["getData", "changeStatusReady"],
  computed: {
    ...mapGetters(["currentPage", "perPage", "totalData"]),
  },
  mounted() {
    this.stateCurrentPage = this.currentPage;
  },
  data() {
    return {
      setPerPage: 10,
      stateCurrentPage: 1,
      listPage: [
        {
          value: 10,
          text: "10",
        },
        {
          value: 20,
          text: "20",
        },
        {
          value: 50,
          text: "50",
        },
        {
          value: "all",
          text: "Semua",
        },
      ],
    };
  },

  methods: {
    updatePage(page) {
      this.$store.dispatch("setCurrentPage", page);
      this.stateCurrentPage = this.currentPage;
      this.$emit("changeStatusReady");
      this.$emit("getData");
    },
    changePerPage() {
      this.$store.dispatch("setCurrentPage", 1);
      this.$store.dispatch("setPerPage", this.setPerPage);
      this.stateCurrentPage = this.currentPage;
      this.$emit("changeStatusReady");
      this.$emit("getData");
    },
  },
};
</script>

<style scoped>
/* pagination */
.wrap-pagination {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
.info-page {
  font-size: 10px;
}
</style>
