<template>
  <section id="icon-count">
    <div class="card card-information" id="card-icon-count">
      <div class="card-header">
        <div class="row d-flex align-items-center">
          <div class="col-md-5">
            <div class="d-flex align-items-center">
              <div
                class="btn btn-secondary mr-2"
                v-if="getLevelTioc != 'regional'"
                @click="backToRegional"
              >
                <b-icon icon="arrow-left" aria-hidden="true"></b-icon>
                Back
              </div>
              <div class="font-weight-bold">
                Graph Summary TIOC {{ getRegionalNameTioc.toUpperCase() }}
              </div>
            </div>
          </div>
          <div class="col-md-7">
            <div class="wrap-actions">
              <CountTimer @getData="getData" class="mr-2" />
            </div>
          </div>
        </div>
      </div>
      <div
        class="card-header d-flex justify-content-between align-items-center"
      >
        <div class="font-weight-bold">Legend</div>
        <div class="d-flex justify-content-between">
          <div class="d-flex align-items-center mr-2">
            <div class="normal-icon"></div>
            {{ dataIcon.normal }}
          </div>
          <div class="d-flex align-items-center mr-2">
            <div class="warning-icon"></div>
            {{ dataIcon.warning }}
          </div>
          <div class="d-flex align-items-center">
            <div class="danger-icon"></div>
            {{ dataIcon.danger }}
          </div>
        </div>
      </div>
      <div class="card-body">
        <!-- test radial bar -->
        <div class="row" v-if="isDataReady">
          <div
            class="col-md-2 mb-5"
            v-for="(data, i) in getDataOptionsTioc"
            :key="i"
          >
            <RadialChart
              :dataSeries="data"
              :class="{ 'cursor-pointer': getLevelTioc == 'regional' }"
            />
          </div>
        </div>
        <div class="row" v-else>
          <div class="col">
            <b-alert variant="warning" show
              >Sedang pengambilan data .. ..</b-alert
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import RadialChart from "./RadialChart";
import ApiService from "@/core/services/api.service.js";
import CountTimer from "@/view/pages/Components/CountTimer.vue";

export default {
  data() {
    return {
      isDataReady: false,
      countFull: ">=70%",
      countHalf: ">=50% - 70%",
      countEmpty: "<50%",
      dataRTU: [],
      dataIcon: {
        normal: "100% OK",
        warning: "70% - 100% Up",
        danger: "< 70% Up",
      },
      dataTioc: [],
      dataVac: [],
    };
  },
  async mounted() {
    this.getData();
  },
  watch: {
    async getLevelTioc() {
      if (this.getLevelTioc == "witel") {
        await this.getDataTiocWitel();
        await this.getDataVacWitel();
        this.processData();
      }
    },
  },
  computed: {
    ...mapGetters([
      "getLevelTioc",
      "getDataOptionsTioc",
      "getIdRegionalTioc",
      "getRegionalNameTioc",
    ]),
  },
  components: {
    CountTimer,
    RadialChart,
  },
  methods: {
    async getDataTioc() {
      this.isDataReady = false;
      try {
        const { data } = await ApiService.get(
          `${process.env.VUE_APP_ROOT_API_5}`,
          "tioc/regional"
        );
        this.dataTioc = data.result;
      } catch (error) {
        console.log(error, "error .. .. ");
      }
    },
    async getDataVac() {
      try {
        const { data } = await ApiService.get(
          `${process.env.VUE_APP_ROOT_API_5}`,
          "tioc/regional/vac"
        );
        this.dataVac = data.result;
      } catch (error) {
        console.log(error, "error .. .. ");
      }
    },
    async getDataTiocWitel() {
      this.isDataReady = false;
      try {
        const { data } = await ApiService.query(
          `${process.env.VUE_APP_ROOT_API_5}/tioc/witel`,
          {
            params: {
              regionalId: this.getIdRegionalTioc,
            },
          }
        );
        this.dataTioc = data.result;
      } catch (error) {
        console.log(error, "error .. .. ");
      }
    },
    async getDataVacWitel() {
      try {
        const { data } = await ApiService.query(
          `${process.env.VUE_APP_ROOT_API_5}/tioc/witel/vac`,
          {
            params: {
              regionalId: this.getIdRegionalTioc,
            },
          }
        );
        this.dataVac = data.result;
      } catch (error) {
        console.log(error, "error .. .. ");
      }
    },
    async processData() {
      const testData = [];

      this.dataTioc.forEach((tioc) => {
        const mainPop = tioc.tags.find((t) => t.id == "1");
        const primaryPop = tioc.tags.find((t) => t.id == "2");
        const aonDc = tioc.tags.find((t) => t.id == "4");
        const dcNeucentrix = tioc.tags.find((t) => t.id == "5");
        const dcStar = tioc.tags.find((t) => t.id == "6");
        const dcIptv = tioc.tags.find((t) => t.id == "7");
        const tls = tioc.tags.find((t) => t.id == "20");
        const sto = tioc.tags.find((t) => t.id == "8");
        testData.push({
          id: tioc.id,
          name: tioc.name,
          tags: [
            mainPop,
            primaryPop,
            aonDc,
            dcNeucentrix,
            dcStar,
            dcIptv,
            tls,
            sto,
          ],
        });
      });

      await this.processTotalData(testData);
      this.processVacData(testData);
    },
    processTotalData(datas) {
      datas.forEach((data) => {
        data.total = data.tags.reduce((acc, tag) => {
          return acc + (tag ? tag.total : 0);
        }, 0);
        data.ok = data.tags.reduce((acc, tag) => {
          return acc + (tag ? tag.ok : 0);
        }, 0);
        data.not_ok = data.tags.reduce((acc, tag) => {
          return acc + (tag ? tag.not_ok : 0);
        }, 0);
      });
    },
    processVacData(datas) {
      datas.forEach((data) => {
        data.vac = 0;
      });

      this.dataVac.forEach((vac) => {
        datas.map((data) => {
          if (data.id == vac.id) {
            data.vac = vac.vac;
          }
        });
      });

      this.$store.dispatch("setDataOptionsTioc", datas);

      setTimeout(() => {
        this.isDataReady = true;
      }, 1000);
    },
    async getData() {
      if (this.getLevelTioc == "regional") {
        await this.getDataTioc();
        await this.getDataVac();
      } else {
        await this.getDataTiocWitel();
        await this.getDataVacWitel();
      }
      this.processData();
    },
    backToRegional() {
      this.$store.dispatch("setLevelTioc", "regional");
      this.$store.dispatch("setRegionalTioc", null);
      this.$store.dispatch("setWitelTioc", null);
      this.$store.dispatch("setRegionalNameTioc", "nasional");
      this.getData();
    },
  },
};
</script>

<style scoped>
.card-information {
  max-height: 650px;
  overflow-y: scroll;
}
.wrap-actions {
  display: flex;
  align-items: center;
}
.danger-icon,
.normal-icon,
.warning-icon {
  width: 20px;
  height: 20px;
  border-radius: 5px;
  margin: 0 5px 0 15px;
}
.danger-icon {
  /* background: linear-gradient(to right, #660b04 0%, #f44336 100%); */
  background-color: #f44336;
}
.warning-icon {
  /* background: linear-gradient(to right, #795b03 0%, #ffc107 100%); */
  background-color: #ffc107;
}
.normal-icon {
  /* background: linear-gradient(to right, #275533 0%, #3fd53a 100%); */
  background-color: #3fd53a;
}
</style>
