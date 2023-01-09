<template>
  <section id="table-location">
    <div class="card">
      <div class="card-header">
        <div class="row d-flex align-items-center">
          <div class="col-md">
            <div class="d-flex align-items-center">
              <div class="font-weight-bolder">Table View Summary Status</div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="card-header d-flex justify-content-between align-items-center"
      >
        <div class="font-weight-bold">Legend</div>
        <div class="d-flex justify-content-between">
          <Legend :dataLegend="dataLegend[0]" color="#3fd53a"></Legend>
          <Legend :dataLegend="dataLegend[1]" color="#f44336"></Legend>
          <Legend :dataLegend="dataLegend[2]" color="#3599fd"></Legend>
          <Legend :dataLegend="dataLegend[3]" color="#fd8c35"></Legend>
        </div>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered table-striped table-hover">
            <thead class="text-center">
              <tr>
                <th rowspan="3">No</th>
                <th rowspan="3">Lokasi</th>
                <th rowspan="2" colspan="3">Total</th>
                <th rowspan="3">VAC</th>
                <th colspan="9">CrLvl-1</th>
                <th colspan="12">CrLvl-2</th>
                <th colspan="3">CrLvl-3</th>
              </tr>
              <tr>
                <th colspan="3">Main PoP</th>
                <th colspan="3">Primary PoP</th>
                <th colspan="3">AON DC</th>
                <th colspan="3">N-CENTRIX DC</th>
                <th colspan="3">STAR DC</th>
                <th colspan="3">IPTV DC</th>
                <th colspan="3">TLS</th>
                <th colspan="3">STO</th>
              </tr>
              <tr>
                <template v-for="i in 9">
                  <th :key="`ok${i}`">OK</th>
                  <th :key="`nok${i}`">NOK</th>
                  <th :key="`ttl${i}`">TTL</th>
                </template>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, i) in getDataOptionsTioc" :key="i">
                <td>{{ i + 1 }}</td>
                <td class="text-nowrap">{{ data.name }}</td>
                <td
                  class="ok-text cursor-pointer"
                  @click="goToDetail(data.id, 'total', data.name, 'ok')"
                >
                  {{ data.ok }}
                </td>
                <td
                  class="nok-text cursor-pointer"
                  @click="goToDetail(data.id, 'total', data.name, 'nok')"
                >
                  {{ data.not_ok }}
                </td>
                <td
                  class="total-text cursor-pointer"
                  @click="goToDetail(data.id, 'total', data.name, 'total')"
                >
                  {{ data.total }}
                </td>
                <td
                  class="vac-text cursor-pointer"
                  @click="goToDetail(data.id, 'vac', data.name)"
                >
                  {{ data.vac }}
                </td>
                <template v-for="(tag, i) in data.tags">
                  <td :key="`tag-ok${i}`" class="ok-text">
                    {{ tag ? tag.ok : 0 }}
                  </td>
                  <td :key="`tag-nok${i}`" class="nok-text">
                    {{ tag ? tag.not_ok : 0 }}
                  </td>
                  <td :key="`tag-ttl${i}`" class="total-text">
                    {{ tag ? tag.total : 0 }}
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import Legend from "./components/Legend";
import ApiService from "@/core/services/api.service.js";

export default {
  data() {
    return {
      dataLegend: [
        {
          count: 0,
          status: "OK",
        },
        {
          count: 0,
          status: "NOT OK",
        },
        {
          count: 0,
          status: "TOTAL",
        },
        {
          count: 0,
          status: "VAC",
        },
      ],
    };
  },
  watch: {
    getDataOptionsTioc(newVal, oldVal) {
      if (newVal.length > 0) {
        this.setDataLegend();
      }
    },
  },
  computed: {
    ...mapGetters([
      "getDataOptionsTioc",
      "getIdWitelTioc",
      "getIdRegionalTioc",
      "getLevelTioc",
      "getLocNameTioc",
    ]),
  },
  components: {
    Legend,
  },
  methods: {
    setDataLegend() {
      let countOk = this.getDataOptionsTioc.reduce((acc, tag) => {
        return acc + Number(tag.ok);
      }, 0);
      let countNotOk = this.getDataOptionsTioc.reduce((acc, tag) => {
        return acc + Number(tag.not_ok);
      }, 0);
      let countTotal = this.getDataOptionsTioc.reduce((acc, tag) => {
        return acc + Number(tag.total);
      }, 0);
      let countVac = this.getDataOptionsTioc.reduce((acc, tag) => {
        return acc + Number(tag.vac);
      }, 0);

      this.dataLegend[0].count = countOk;
      this.dataLegend[1].count = countNotOk;
      this.dataLegend[2].count = countTotal;
      this.dataLegend[3].count = countVac;
    },
    async goToDetail(id, vac, locName, status) {
      await this.setIdTioc(id);

      this.$store.dispatch("setLocnameTioc", locName);

      await this.setStatusRtu(status);

      let name =
        vac == "vac" ? "Detail Tioc Table Vac" : "Detail Tioc Table Total";
      this.$router.push({ name });
    },
    setIdTioc(id) {
      if (this.getLevelTioc == "regional") {
        this.$store.dispatch("setRegionalTioc", id);
        this.$store.dispatch("setWitelTioc", null);
      } else {
        this.$store.dispatch("setWitelTioc", id);
      }
    },
    setStatusRtu(status) {
      switch (status) {
        case "ok":
          this.$store.dispatch("setStatusRtuTioc", "normal");
          break;
        case "nok":
          this.$store.dispatch("setStatusRtuTioc", "alert");
          break;
        default:
          this.$store.dispatch("setStatusRtuTioc", "");
          break;
      }
    },
  },
};
</script>

<style scoped>
.ok-text {
  color: #3fd53a;
}
.nok-text {
  color: #f44336;
}
.total-text {
  color: #3599fd;
}
.vac-text {
  color: #fd8c35;
}
</style>
