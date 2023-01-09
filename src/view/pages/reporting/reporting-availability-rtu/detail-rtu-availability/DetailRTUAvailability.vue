<template>
  <section id="detail-rtu">
    <!-- <card-filter /> -->

    <div class="card">
      <div class="card-header">
        <div class="wrap-print">
          <b-button variant="secondary" class="mr-2" @click="backToPage">
            <b-icon icon="arrow-left" aria-hidden="true"></b-icon>
            Back
          </b-button>

          <div class="title-avai">Availability of {{ dataDetailRtu.name }}</div>
        </div>
      </div>
      <div class="card-body">
        <div class="wrap-title-detail">
          <div
            class="title-detail"
            :class="[target == 'rtu' && 'title-choose']"
            @click="changeDetail('rtu')"
          >
            RTU
          </div>
          <div
            class="title-detail"
            :class="[target == 'analog' && 'title-choose']"
            @click="changeDetail('analog')"
          >
            Port Analog ({{ dataPortAnalog.totalData }})
            <i class="fas fas-sm fa-alarm text-danger"></i>
          </div>
          <div
            class="title-detail"
            :class="[target == 'digital' && 'title-choose']"
            @click="changeDetail('digital')"
          >
            Port Digital ({{ dataPortDigital.totalData }})
          </div>
        </div>
        <hr />

        <div class="card" v-if="target == 'rtu'">
          <div class="card-header pb-5 pt-5">
            <div class="title-avai">{{ dataDetailRtu.name }}</div>
          </div>
          <div class="card-body">
            <RtuComp v-if="target == 'rtu'" :dataRtuId="dataDetailRtu" />
          </div>
        </div>
        <port-analog v-if="target == 'analog'" />
        <port-digital v-if="target == 'digital'" />
      </div>
    </div>
  </section>
</template>

<script>
import RtuComp from "./RTUAvailability.vue";
import ApiService from "@/core/services/api.service";
import PortAnalog from "./PortAnalogAvailability.vue";
import PortDigital from "./PortDigitalAvailability.vue";

export default {
  data() {
    return {
      target: "rtu",
      selectedOption: null,
      plnStatus: true,
      plnOff: false,
      dataDetailRtu: {},

      //analog
      currentPage: 1,
      perPage: 1,
      dataPortAnalog: [],
      dataPortDigital: [],

      dataTesting: [
        {
          id: "pln",
          label: "PLN",
        },
        {
          id: "ats",
          label: "ATS",
        },
        {
          id: "amf",
          label: "AMF",
        },
        {
          id: "genset",
          label: "Genset",
        },
        {
          id: "bbm",
          label: "Tangki BBM",
        },
        {
          id: "mdp",
          label: "MDP",
        },
        {
          id: "rectifier",
          label: "Rectifier",
        },
        {
          id: "baterai",
          label: "Baterai",
        },
        {
          id: "suhu",
          label: "Ruang Perangkat",
        },
        {
          id: "pic",
          label: "PIC",
        },
      ],

      fullscreen: false,
      statusRuangPerangkat: "off",
      statusGenset: ["off"],
      statusPln: "off",
      statusBbm: "off",
      statusRectifier: ["off"],
      statusAts: "off",
      statusBattery: ["off"],
      statusAmf: ["off"],
      countOff: 0,
      countNormal: 0,
      countAlert: 0,
    };
  },
  components: {
    RtuComp,
    PortAnalog,
    PortDigital,
  },
  mounted() {
    this.getDetailRtu();
    this.getPortAnalog();
    this.getPortDigital();
  },
  methods: {
    backToPage() {
      this.$router.go(-1);
    },
    getDetailRtu() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_4,
        `operation/rtu/${this.$route.params.idRTU}`
      )
        .then(({ data }) => {
          this.dataDetailRtu = data.result;
        })
        .catch((err) => {
          console.log(err.response, "ini err");
        });
    },

    getPortAnalog() {
      ApiService.query(
        `${process.env.VUE_APP_ROOT_API_2}/analog-digital/${this.$route.params.idRTU}`,
        {
          params: {
            mode: "analog",
            page: this.currentPage,
            limit: "all",
          },
        }
      ).then(({ data }) => {
        this.dataPortAnalog = data.result;
      });
    },
    getPortDigital() {
      ApiService.query(
        `${process.env.VUE_APP_ROOT_API_2}/analog-digital/${this.$route.params.idRTU}`,
        {
          params: {
            mode: "digital",
            page: this.currentPage,
            limit: "all",
          },
        }
      ).then(({ data }) => {
        this.dataPortDigital = data.result;
      });
    },

    changeDetail(target) {
      this.target = target;
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

.wrap-print {
  display: flex;
  align-items: center;
}
.icon-text {
  font-size: 0.8rem;
  font-weight: bold;
  text-align: center;
  word-wrap: break-word;
}

.text-alarm {
  font-size: 8px;
}

.activeStatus {
  background-color: #1bc5bd;
}

.failedStatus {
  background-color: #f64e60;
  color: white;
}

.offStatus {
  background-color: #ccc;
}

.activeStatusLine {
  border-color: #1bc5bd;
}

.failedStatusLine {
  border-color: #f64e60;
}

.offStatusLine {
  border-color: #ccc;
}

.wrap-title-detail {
  display: flex;
  align-items: center;
}
.title-detail {
  cursor: pointer;
  margin-right: 15px;
}
.title-choose {
  padding-bottom: 10px;
  border-bottom: 2px solid #1bc5bd;
}
</style>
