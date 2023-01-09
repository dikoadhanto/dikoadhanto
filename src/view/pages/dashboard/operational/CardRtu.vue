<template>
  <section id="card-rtu">
    <!-- timer -->
    <div class="card mb-3">
      <div class="card-body">
        <div class="row justify-content-between align-items-center">
          <div class="title col-md-4">TOTAL RTU: {{ totalRtu }}</div>
          <CountTimer @getData="getDataRtu" class="col-md-8" />
        </div>
      </div>
    </div>

    <!-- card -->
    <div class="card">
      <!--begin::Accordion-->
      <div class="accordion accordion-toggle-arrow" v-if="isReady">
        <!-- accordian card -->
        <div class="card">
          <b-card-header
            header-tag="header"
            class="p-1 rounded"
            header-bg-variant="white"
          >
            <!-- collapse toggle -->
            <div
              class="card-title collapsed"
              data-toggle="collapse"
              v-b-toggle="`collapse-1`"
            >
              Rtu Off: {{ countRtuOff }}
            </div>
          </b-card-header>
          <!-- accordian body -->
          <b-collapse visible id="collapse-1">
            <div class="card" v-if="rtuOff.length">
              <div class="card-body">
                <div class="row">
                  <!-- item rtu -->
                  <div
                    class="col-md-2 col-4 mb-2"
                    v-for="(rtu, i) in rtuOff"
                    :key="i"
                  >
                    <router-link
                      :to="`/dashboard/operational/detail-rtu/${rtu.id_rtu}`"
                      class="card bg-dark"
                    >
                      <div class="card-body text-center text-light">
                        <div class="count mb-1">
                          <img
                            src="/media/rtu-operation/card-off.webp"
                            alt="rtu-off"
                            class="img-rtu"
                          />
                        </div>
                        <div class="name">{{ rtu.sname }}</div>
                      </div>
                    </router-link>
                  </div>
                  <!-- end item rtu -->
                </div>
              </div>
            </div>
            <div class="card" v-else>
              <div class="card-body">
                <b-alert show variant="warning">Data RTU Off tidak ada</b-alert>
              </div>
            </div>
          </b-collapse>
        </div>
        <!-- accordian card -->
        <div class="card">
          <b-card-header
            header-tag="header"
            class="p-1 rounded"
            header-bg-variant="white"
          >
            <!-- collapse toggle -->
            <div
              class="card-title collapsed"
              data-toggle="collapse"
              v-b-toggle="`collapse-2`"
            >
              Rtu Alert: {{ countRtuAlert }}
            </div>
          </b-card-header>
          <!-- accordian body -->
          <b-collapse visible id="collapse-2">
            <div class="card" v-if="rtuAlert.length">
              <div class="card-body">
                <div class="row">
                  <!-- item rtu -->
                  <div
                    class="col-md-2 col-4 mb-2"
                    v-for="(rtu, i) in rtuAlert"
                    :key="i"
                  >
                    <router-link
                      :to="`/dashboard/operational/detail-rtu/${rtu.id_rtu}`"
                      class="card bg-danger"
                    >
                      <div class="card-body text-center text-light">
                        <div class="count mb-1">
                          <img
                            src="/media/rtu-operation/card-alert.webp"
                            alt="rtu-alert"
                            class="img-rtu"
                          />
                        </div>
                        <div class="name">{{ rtu.sname }}</div>
                      </div>
                    </router-link>
                  </div>
                  <!-- end item rtu -->
                </div>
              </div>
            </div>
            <div class="card" v-else>
              <div class="card-body">
                <b-alert show variant="warning"
                  >Data RTU Alert tidak ada</b-alert
                >
              </div>
            </div>
          </b-collapse>
        </div>
        <!-- accordian card -->
        <div class="card">
          <b-card-header
            header-tag="header"
            class="p-1 rounded"
            header-bg-variant="white"
          >
            <!-- collapse toggle -->
            <div
              class="card-title collapsed"
              data-toggle="collapse"
              v-b-toggle="`collapse-3`"
            >
              Rtu Normal: {{ countRtuNormal }}
            </div>
          </b-card-header>
          <!-- accordian body -->
          <b-collapse visible id="collapse-3">
            <div class="card" v-if="rtuNormal.length">
              <div class="card-body">
                <div class="row">
                  <!-- item rtu -->
                  <div
                    class="col-md-2 col-4 mb-2"
                    v-for="(rtu, i) in rtuNormal"
                    :key="i"
                  >
                    <router-link
                      :to="`/dashboard/operational/detail-rtu/${rtu.id_rtu}`"
                      class="card bg-success"
                    >
                      <div class="card-body text-center text-light">
                        <div class="count mb-1">
                          <img
                            src="/media/rtu-operation/card-normal.webp"
                            alt="rtu-normal"
                            class="img-rtu"
                          />
                        </div>
                        <div class="name">{{ rtu.sname }}</div>
                      </div>
                    </router-link>
                  </div>
                  <!-- end item rtu -->
                </div>
              </div>
            </div>
            <div class="card" v-else>
              <div class="card-body">
                <b-alert show variant="warning"
                  >Data RTU Normal tidak ada</b-alert
                >
              </div>
            </div>
          </b-collapse>
        </div>
      </div>
      <!--end::Accordion-->
      <div v-else class="m-5">
        <b-alert variant="warning" show
          >Tunggu sebentar. Sedang pengamblan data...</b-alert
        >
      </div>
    </div>

    <!-- sound to rtu alert -->
    <audio id="myAudio" controls loop>
      <source
        src="../../../../../public/media/rtu-alert.mp3"
        type="audio/mpeg"
      />
    </audio>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import ApiService from "@/core/services/api.service.js";
import CountTimer from "@/view/pages/Components/CountTimer.vue";

export default {
  data() {
    return {
      isReady: false,
      // data rtu
      rtuOff: [],
      rtuAlert: [],
      rtuNormal: [],

      // total
      totalRtu: 0,
      countRtuOff: 0,
      countRtuAlert: 0,
      countRtuNormal: 0,
    };
  },
  computed: {
    ...mapGetters([
      "idRegional",
      "idWitel",
      "idDatel",
      "idLocation",
      "idAlarmType",
      "idTags",
    ]),
  },
  components: {
    CountTimer,
  },
  watch: {
    idRegional: function () {
      this.getDataRtu();
    },
    idWitel: function () {
      this.getDataRtu();
    },
    idDatel: function () {
      this.getDataRtu();
    },
    idLocation: function () {
      this.getDataRtu();
    },
    idAlarmType: function () {
      this.getDataRtu();
    },
    idTags: function () {
      this.getDataRtu();
    },
    countRtuAlert: function () {
      setTimeout(() => {
        if (this.countRtuAlert > 0) {
          document.getElementById("myAudio").play();
        } else {
          document.getElementById("myAudio").pause();
        }
      }, 1000);
    },
  },
  mounted() {
    this.getDataRtu();
  },
  methods: {
    async getDataRtu() {
      this.setDefaultData();
      this.isReady = false;
      ApiService.get(
        process.env.VUE_APP_ROOT_API_5,
        `operation/rtu/status?regional=${
          this.idRegional == null ? "%%" : `(${this.idRegional.join("|")})`
        }&witel=${
          this.idWitel == null ? "%%" : `(${this.idWitel.join("|")})`
        }&datel=${
          this.idDatel == null ? "%%" : `(${this.idDatel.join("|")})`
        }&id_m_location=${
          this.idLocation == null ? "%%" : `(${this.idLocation.join("|")})`
        }&alarm=${
          this.idAlarmType == null ? "%%" : `(${this.idAlarmType.join("|")})`
        }&id_tags=${this.idTags == null ? "%%" : `(${this.idTags.join("|")})`}`
      )
        .then(({ data }) => {
          let dataRTU = data.result;
          dataRTU.forEach((rtu) => {
            if (rtu.status == "normal") {
              this.rtuNormal = rtu.rtu_sname;
              this.countRtuNormal = parseInt(rtu.total);
              this.totalRtu += parseInt(rtu.total);
            } else if (rtu.status == "off") {
              this.rtuOff = rtu.rtu_sname;
              this.countRtuOff = parseInt(rtu.total);
              this.totalRtu += parseInt(rtu.total);
            } else if (rtu.status == "alert") {
              this.rtuAlert = rtu.rtu_sname;
              this.countRtuAlert = parseInt(rtu.total);
              this.totalRtu += parseInt(rtu.total);
            }
          });
          this.isReady = true;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    setDefaultData() {
      this.totalRtu = 0;
      this.countRtuOff = 0;
      this.countRtuAlert = 0;
      this.countRtuNormal = 0;
      this.rtuOff = [];
      this.rtuAlert = [];
      this.rtuNormal = [];
    },
  },
};
</script>

<style scoped>
.title {
  font-weight: bold;
}
.img-rtu {
  width: 30%;
}
#myAudio {
  display: none;
}
</style>
