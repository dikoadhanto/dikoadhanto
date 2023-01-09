<template>
  <section id="detail-rtu">
    <!-- card topologi -->

    <div class="card mb-10" :class="isFullscreen ? 'fullscreen-topology' : ''">
      <div class="card-header">
        <div class="row d-flex align-items-center">
          <div class="col-md-5">
            <div class="header-wrapper">{{ dataDetailRtu.sname }}</div>
          </div>
          <div class="col-md-7">
            <div class="button-wrapper">
              <CountTimer @getData="refreshPage" />
              <b-button
                variant="success"
                @click="changeFullscreen"
                class="ml-2"
                v-if="isFullscreen"
                title="Exit Fullscreen"
              >
                <b-icon icon="fullscreen-exit" aria-hidden="true"></b-icon>
              </b-button>
              <b-button
                variant="success"
                @click="changeFullscreen"
                class="ml-2"
                title="Fullscreen"
                v-else
              >
                <b-icon icon="fullscreen" aria-hidden="true"></b-icon>
              </b-button>
            </div>
          </div>
        </div>
      </div>
      <div class="scroll"></div>
      <div class="topology-body">
        <div class="w-100">
          <div
            class="topology-container-2"
            :class="[
              setLineStatus(statusPln, 'pln'),
              setLineStatus(lineMdp, 'mdp-rect-a'),
              setLineStatus(lineMdp, 'mdp-rect-b'),
              setLineStatus(lineRectifierA, 'rect-a'),
              setLineStatus(lineAts, 'ats'),
              setLineStatus(statusGensetA, 'genset-a'),
              setLineStatus(lineAmfA, 'amf-a'),
              setLineStatus(lineRectifierB, 'rect-b'),
              setLineStatus(statusGensetB, 'genset-b'),
              setLineStatus(lineAmfB, 'amf-b'),
              setLineStatus(statusBatteryA, 'btr-a'),
              setLineStatus(statusBatteryB, 'btr-b'),
            ]"
          >
            <div class="col-12">
              <div class="row topology-grid">
                <!-- Row 1 -->
                <div class="c-border col-1">
                  <div class="w-100">
                    <div
                      :class="getStatusClass(statusPln)"
                      class="gd-icon-wrapper pln"
                      @click="goToTopology('pln')"
                    >
                      <img
                        class="topology-icon"
                        src="/media/topology/PLN.webp"
                      />
                      <p class="m-0 icon-text">PLN</p>
                    </div>
                  </div>
                </div>
                <div class="c-border col-2">
                  <div class="h-line pln-line"></div>
                </div>
                <div class="c-border col-1">
                  <div class="l-to-b-line pln-line"></div>
                </div>
                <div class="c-border col-1"></div>
                <div class="c-border col-1">
                  <div class="b-half-line mdp-to-rect-a-line"></div>
                  <div class="r-half-line mdp-to-rect-a-line"></div>
                </div>
                <div class="c-border col-2">
                  <div class="h-line mdp-to-rect-a-line"></div>
                </div>
                <div class="c-border col-1">
                  <div class="w-100">
                    <div
                      :class="getStatusClass(statusRectifierA)"
                      class="gd-icon-wrapper rectifier"
                      @click="goToTopology('rectifier')"
                    >
                      <img
                        class="topology-icon"
                        src="/media/topology/Rectifier.webp"
                      />
                      <p class="m-0 icon-text">RECTIFIER A</p>
                    </div>
                  </div>
                </div>
                <div class="c-border col-1">
                  <div class="h-line rect-a-to-rp-line"></div>
                </div>
                <div class="c-border col-1">
                  <div class="l-to-b-line rect-a-to-rp-line"></div>
                </div>
                <div class="c-border col-1">
                  <div class="w-100">
                    <div class="gd-icon-wrapper" @click="goToTopology('pic')">
                      <img
                        class="topology-icon"
                        src="/media/topology/PIC.webp"
                      />
                      <p class="m-0 icon-text">PIC</p>
                    </div>
                  </div>
                </div>
                <div class="col-12"></div>
                <!-- END Row 1 -->
                <!-- Row 2 -->
                <div class="c-border c-h-break col-3"></div>
                <div class="c-border c-h-break col-1">
                  <div class="v-line pln-line"></div>
                </div>
                <div class="c-border c-h-break col-1"></div>
                <div class="c-border c-h-break col-1">
                  <div class="v-line mdp-to-rect-a-line"></div>
                </div>
                <div class="c-border c-h-break col-2"></div>
                <div class="c-border c-h-break col-1">
                  <div class="v-line rect-a-to-btr-a-line"></div>
                </div>
                <div class="c-border c-h-break col-1"></div>
                <div class="c-border c-h-break col-1">
                  <div class="v-line rect-a-to-rp-line"></div>
                </div>
                <div class="c-border c-h-break col-1"></div>
                <div class="col-12"></div>
                <!-- END Row 2 -->
                <!-- Row 3 -->
                <div class="c-border col-3"></div>
                <div class="c-border col-1">
                  <div class="w-100">
                    <div
                      :class="getStatusClass(statusAts)"
                      class="gd-icon-wrapper"
                      @click="goToTopology('ats')"
                    >
                      <img
                        class="topology-icon"
                        src="/media/topology/ATS.webp"
                      />
                      <p class="m-0 icon-text">ATS</p>
                    </div>
                  </div>
                </div>
                <div class="c-border col-1">
                  <div class="h-line ats-to-mdp-line"></div>
                </div>
                <div class="c-border col-1">
                  <div class="w-100">
                    <div
                      :class="getStatusClass(statusMdp)"
                      class="gd-icon-wrapper"
                      @click="goToTopology('mdp')"
                    >
                      <img
                        class="topology-icon"
                        src="/media/topology/MDP.webp"
                      />
                      <p class="m-0 icon-text">MDP</p>
                    </div>
                  </div>
                </div>
                <div class="c-border col-2"></div>
                <div class="c-border col-1">
                  <div class="w-100">
                    <div
                      :class="getStatusClass(statusBatteryA)"
                      @click="goToTopology('baterai')"
                      class="gd-icon-wrapper"
                    >
                      <img
                        class="topology-icon"
                        src="/media/topology/Baterai.webp"
                      />
                      <p class="m-0 icon-text">BATERAI A</p>
                    </div>
                  </div>
                </div>
                <div class="c-border col-1"></div>
                <div class="c-border col-1">
                  <div class="t-half-line rect-a-to-rp-line"></div>
                  <div class="r-t-line rect-a-to-rp-line"></div>
                  <!-- <div class="v-line"></div> -->
                </div>
                <div class="c-border col-1">
                  <div class="w-100">
                    <div
                      :class="getStatusClass(statusRuangPerangkat)"
                      @click="goToTopology('suhu')"
                      class="gd-icon-wrapper"
                    >
                      <img
                        class="topology-icon"
                        src="/media/topology/Ruang.webp"
                      />
                      <p class="m-0 icon-text">RUANG PERANGKAT</p>
                    </div>
                  </div>
                </div>
                <div class="col-12"></div>
                <!-- END Row 3 -->
                <!-- Row 4 -->
                <div class="c-border c-h-break col-3"></div>
                <div class="c-border c-h-break col-1">
                  <div class="v-line"></div>
                </div>
                <div class="c-border c-h-break col-1"></div>
                <div class="c-border c-h-break col-1">
                  <div class="v-line mdp-to-rect-b-line"></div>
                </div>
                <div class="c-border c-h-break col-5"></div>
                <div class="c-border c-h-break col-1">
                  <div class="v-line rect-b-to-rp-line"></div>
                </div>
                <div class="col-12"></div>
                <!-- END Row 4 -->
                <!-- Row 5 -->
                <div class="c-border col-1">
                  <div class="w-100">
                    <div
                      @click="goToTopology('genset')"
                      :class="getStatusClass(statusGensetA)"
                      class="gd-icon-wrapper"
                    >
                      <img
                        class="topology-icon"
                        src="/media/topology/Genset.webp"
                      />
                      <p class="m-0 icon-text">GENSET A</p>
                    </div>
                  </div>
                </div>
                <div class="c-border col-1">
                  <div class="h-line gen-a-to-amf-a-line"></div>
                </div>
                <div class="c-border col-1">
                  <div class="w-100">
                    <div
                      @click="goToTopology('amf')"
                      :class="getStatusClass(statusAmfA)"
                      class="gd-icon-wrapper"
                    >
                      <img
                        class="topology-icon"
                        src="/media/topology/AMF.webp"
                      />
                      <p class="m-0 icon-text">AMF A</p>
                    </div>
                  </div>
                </div>
                <div class="c-border col-1">
                  <div class="t-half-line"></div>
                  <div class="l-to-b-line"></div>
                </div>
                <div class="c-border col-1"></div>
                <div class="c-border col-1">
                  <div class="t-half-line mdp-to-rect-b-line"></div>
                  <div class="r-half-line mdp-to-rect-b-line"></div>
                </div>
                <div class="c-border col-2">
                  <div class="h-line mdp-to-rect-b-line"></div>
                </div>
                <div class="c-border col-1">
                  <div
                    :class="getStatusClass(statusRectifierB)"
                    @click="goToTopology('rectifier')"
                    class="gd-icon-wrapper"
                  >
                    <img
                      class="topology-icon"
                      src="/media/topology/Rectifier.webp"
                    />
                    <p class="m-0 icon-text">RECTIFIER B</p>
                  </div>
                </div>
                <div class="c-border col-2">
                  <div class="h-line rect-b-to-rp-line"></div>
                </div>
                <div class="c-border col-1">
                  <div class="t-half-line rect-b-to-rp-line"></div>
                  <div class="l-half-line rect-b-to-rp-line"></div>
                </div>
                <div class="col-12"></div>
                <!-- END Row 5 -->
                <!-- Row 6 -->
                <div class="c-border c-h-break col-3"></div>
                <div class="c-border c-h-break col-1">
                  <div class="v-line"></div>
                </div>
                <div class="c-border c-h-break col-4"></div>
                <div class="c-border c-h-break col-1">
                  <div class="v-line rect-b-to-btr-b-line"></div>
                </div>
                <div class="c-border c-h-break col-3"></div>
                <div class="col-12"></div>
                <!-- END Row 6 -->
                <!-- Row 7 -->
                <div class="c-border col-1">
                  <div class="w-100">
                    <div
                      :class="getStatusClass(statusGensetB)"
                      @click="goToTopology('genset')"
                      class="gd-icon-wrapper"
                    >
                      <img
                        class="topology-icon"
                        src="/media/topology/Genset.webp"
                      />
                      <p class="m-0 icon-text">GENSET B</p>
                    </div>
                  </div>
                </div>
                <div class="c-border col-1">
                  <div class="h-line gen-b-to-amf-b-line"></div>
                </div>
                <div class="c-border col-1">
                  <div class="w-100">
                    <div
                      :class="getStatusClass(statusAmfB)"
                      @click="goToTopology('amf')"
                      class="gd-icon-wrapper"
                    >
                      <img
                        class="topology-icon"
                        src="/media/topology/AMF.webp"
                      />
                      <p class="m-0 icon-text">AMF B</p>
                    </div>
                  </div>
                </div>
                <div class="c-border col-1">
                  <div class="t-half-line"></div>
                  <div class="l-half-line"></div>
                </div>
                <div class="c-border col-4"></div>
                <div class="c-border col-1">
                  <div class="w-100">
                    <div
                      :class="getStatusClass(statusBatteryB)"
                      @click="goToTopology('baterai')"
                      class="gd-icon-wrapper"
                    >
                      <img
                        class="topology-icon"
                        src="/media/topology/Baterai.webp"
                      />
                      <p class="m-0 icon-text">BATERAI B</p>
                    </div>
                  </div>
                </div>
                <div class="c-border col-3"></div>
                <div class="col-12"></div>
                <!-- END Row 7 -->
                <!-- Row 8 -->
                <div class="c-border c-h-break col-12"></div>
                <div class="col-12"></div>
                <!-- END Row 8 -->
                <!-- Row 9 -->
                <div class="c-border col-1">
                  <div class="w-100">
                    <div
                      @click="goToTopology('bbm')"
                      :class="getStatusClass(statusBbmHarian)"
                      class="gd-icon-wrapper"
                    >
                      <img
                        class="topology-icon"
                        src="/media/topology/Tangki.webp"
                      />
                      <p class="m-0 icon-text">TANGKI BBM HARIAN</p>
                    </div>
                  </div>
                </div>
                <div class="c-border col-1"></div>
                <div class="c-border col-1">
                  <div class="w-100">
                    <div
                      :class="getStatusClass(statusBbmBulanan)"
                      @click="goToTopology('bbm')"
                      class="gd-icon-wrapper"
                    >
                      <img
                        class="topology-icon"
                        src="/media/topology/Tangki.webp"
                      />
                      <p class="m-0 icon-text">TANGKI BBM BULANAN</p>
                    </div>
                  </div>
                </div>
                <div class="c-border col-9">
                  <div class="gd-alarm-wrapper p-10">
                    <b-badge variant="dark" class="py-1 px-7">{{
                      countOff
                    }}</b-badge>
                    <p class="m-0 text-alarm">OFF</p>
                    <b-badge variant="danger" class="py-1 px-7">{{
                      countAlert
                    }}</b-badge>
                    <p class="m-0 text-alarm">ALERT</p>
                    <b-badge variant="success" class="py-1 px-7">{{
                      countNormal
                    }}</b-badge>
                    <p class="m-0 text-alarm">NORMAL</p>
                    <p class="m-0 icon-text">ALARM</p>
                  </div>
                </div>
                <div class="col-12"></div>
                <!-- END Row 9 -->
                <!-- Row 10 -->
                <div class="c-border c-h-break col-12"></div>
                <div class="col-12"></div>
                <!-- END Row 10 -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- card detail -->
    <div class="card">
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
            Port Analog ({{ dataPortAnalaog.totalData }})
            <i class="fas fas-sm fa-alarm text-danger"></i>
            <span
              class="text-danger text-sm"
              v-if="dataPortAnalaog.totalAlert > 0"
            >
              {{ dataPortAnalaog.totalAlert }} Alert</span
            >
          </div>
          <div
            class="title-detail"
            :class="[target == 'digital' && 'title-choose']"
            @click="changeDetail('digital')"
          >
            Port Digital ({{ dataPortDigital.totalData }})
          </div>
          <div class="col-md-3">
            <treeselect
              :class="[target == 'topology' && 'title-choose']"
              v-model="selectedOption"
              :options="dataTesting"
              placeholder="Topology"
              @select="changeDetail('topology')"
            />
          </div>
        </div>
        <hr />

        <!-- form -->
        <RTU v-if="target == 'rtu'" :dataRtuId="dataDetailRtu" />
        <port-analog v-if="target == 'analog'" />
        <port-digital v-if="target == 'digital'" />
        <Topology v-if="target == 'topology'" :option="selectedOption" />

        <!-- Component  -->
        <fullscreen v-model="fullscreen">
          <div class="topology-fullscreen-container" v-if="fullscreen">
            <div class="topology-container">
              <!-- row 1 -->
              <b-row class="topology-wrapper" no-gutters>
                <b-col cols="4" class="d-flex">
                  <div
                    :class="[plnStatus ? 'activeStatus' : 'failedStatus']"
                    class="icon-wrapper pln"
                  >
                    <img class="topology-icon" src="/media/topology/PLN.webp" />
                    <p class="m-0 icon-text">PLN</p>
                  </div>
                  <div
                    :class="[
                      plnStatus ? 'activeStatusLine' : 'failedStatusLine',
                    ]"
                    class="line-pln"
                  ></div>
                </b-col>

                <b-col cols="6" class="d-flex rectifier-a">
                  <div
                    :class="[
                      plnStatus ? 'activeStatusLine' : 'failedStatusLine',
                    ]"
                    class="line-rectifier"
                  ></div>
                  <div
                    :class="[plnStatus ? 'activeStatus' : 'failedStatus']"
                    class="icon-wrapper rectifier"
                  >
                    <img
                      class="topology-icon"
                      src="/media/topology/Rectifier.webp"
                    />
                    <p class="m-0 icon-text">RECTIFIER A</p>
                  </div>
                  <div
                    :class="[
                      plnStatus ? 'activeStatusLine' : 'failedStatusLine',
                    ]"
                    class="line-rectifier-to-temperature"
                  ></div>
                </b-col>

                <b-col cols="2" class="d-flex justify-content-end">
                  <div class="icon-wrapper">
                    <img class="topology-icon" src="/media/topology/PIC.webp" />
                    <p class="m-0 icon-text">PIC</p>
                  </div>
                </b-col>
              </b-row>

              <!-- row 2 -->
              <b-row class="topology-wrapper mt-12" no-gutters>
                <b-col cols="4" class="d-flex ats">
                  <div
                    :class="[plnStatus ? 'activeStatus' : 'failedStatus']"
                    class="icon-wrapper"
                  >
                    <img class="topology-icon" src="/media/topology/ATS.webp" />
                    <p class="m-0 icon-text">ATS</p>
                  </div>
                  <div
                    :class="[
                      plnStatus ? 'activeStatusLine' : 'failedStatusLine',
                    ]"
                    class="line-ats"
                  ></div>
                </b-col>

                <b-col cols="3" class="d-flex mdp">
                  <div
                    :class="[plnStatus ? 'activeStatus' : 'failedStatus']"
                    class="icon-wrapper"
                  >
                    <img class="topology-icon" src="/media/topology/MDP.webp" />
                    <p class="m-0 icon-text">MDP</p>
                  </div>
                  <div
                    :class="[
                      plnStatus ? 'activeStatusLine' : 'failedStatusLine',
                    ]"
                    class="line-mdp"
                  ></div>
                </b-col>

                <b-col cols="3" class="d-flex battery-a">
                  <div class="icon-wrapper">
                    <img
                      class="topology-icon"
                      src="/media/topology/Baterai.webp"
                    />
                    <p class="m-0 icon-text">BATERAI A</p>
                  </div>
                  <div
                    :class="[
                      plnStatus ? 'failedStatusLine' : 'activeStatusLine',
                    ]"
                    class="line-baterai"
                  ></div>
                </b-col>

                <b-col cols="2" class="d-flex justify-content-end ruang">
                  <div
                    :class="[
                      plnStatus ? 'activeStatusLine' : 'failedStatusLine',
                    ]"
                    class="line-ruang"
                  ></div>
                  <div
                    :class="[plnStatus ? 'activeStatus' : 'failedStatus']"
                    class="icon-wrapper"
                  >
                    <img
                      class="topology-icon"
                      src="/media/topology/Ruang.webp"
                    />
                    <p class="m-0 icon-text">SUHU & KELEMBABAN RUANG</p>
                  </div>
                </b-col>
              </b-row>

              <!-- row 3 -->
              <b-row class="topology-wrapper" no-gutters>
                <b-col cols="2" class="d-flex genset-a">
                  <div class="icon-wrapper mt-12">
                    <img
                      class="topology-icon"
                      src="/media/topology/Genset.webp"
                    />
                    <p class="m-0 icon-text">GENSET A</p>
                  </div>
                  <div class="line-genset-a"></div>
                </b-col>

                <b-col cols="5" class="d-flex amf-a">
                  <div class="icon-wrapper mt-12">
                    <img class="topology-icon" src="/media/topology/AMF.webp" />
                    <p class="m-0 icon-text">AMF A</p>
                  </div>
                  <div class="line-amf-a"></div>
                </b-col>

                <b-col cols="5" class="d-flex rectifier-b">
                  <div
                    :class="[
                      plnStatus ? 'activeStatusLine' : 'failedStatusLine',
                    ]"
                    class="line-mdp-to-rectifier-b"
                  ></div>
                  <div
                    :class="[plnStatus ? 'activeStatus' : 'failedStatus']"
                    class="icon-wrapper mt-12"
                  >
                    <img
                      class="topology-icon"
                      src="/media/topology/Rectifier.webp"
                    />
                    <p class="m-0 icon-text">RECTIFIER B</p>
                  </div>
                  <div
                    :class="[
                      plnStatus ? 'failedStatusLine' : 'activeStatusLine',
                    ]"
                    class="line-rectifier-b"
                  ></div>
                  <div
                    :class="[
                      plnStatus ? 'activeStatusLine' : 'failedStatusLine',
                    ]"
                    class="line-rectifier-b-to-temperature"
                  ></div>
                  <div
                    :class="[
                      plnStatus ? 'activeStatusLine' : 'failedStatusLine',
                    ]"
                    class="line-rectifier-b-to-temperature-next"
                  ></div>
                </b-col>
              </b-row>

              <!-- row 4 -->
              <b-row class="topology-wrapper" no-gutters>
                <b-col cols="2" class="d-flex genset-b">
                  <div class="icon-wrapper mt-12">
                    <img
                      class="topology-icon"
                      src="/media/topology/Genset.webp"
                    />
                    <p class="m-0 icon-text">GENSET B</p>
                  </div>
                  <div class="line-genset-b"></div>
                </b-col>

                <b-col cols="5" class="d-flex amf-b">
                  <div class="icon-wrapper mt-12">
                    <img class="topology-icon" src="/media/topology/AMF.webp" />
                    <p class="m-0 icon-text">AMF B</p>
                  </div>
                  <div class="line-amf-b"></div>
                </b-col>

                <b-col cols="5" class="d-flex battery-b">
                  <div class="icon-wrapper mt-12">
                    <img
                      class="topology-icon"
                      src="/media/topology/Baterai.webp"
                    />
                    <p class="m-0 icon-text">BATERAI B</p>
                  </div>
                </b-col>
              </b-row>

              <b-row class="topology-wrapper" no-gutters>
                <b-col cols="2" class="d-flex bbm-harian">
                  <div class="icon-wrapper mt-12">
                    <img class="topology-icon" src="/media/topology/BBM.webp" />
                    <p class="m-0 icon-text">TANGKI BBM HARIAN</p>
                  </div>
                </b-col>

                <b-col cols="2" class="d-flex bbm-bulanan">
                  <div class="icon-wrapper mt-12">
                    <img class="topology-icon" src="/media/topology/BBM.webp" />
                    <p class="m-0 icon-text">TANGKI BBM BULANAN</p>
                  </div>
                </b-col>

                <b-col cols="8" class="d-flex justify-content-end alarm">
                  <div class="alarm-wrapper p-10">
                    <b-badge variant="dark" class="py-1 px-7">{{
                      this.countOff
                    }}</b-badge>
                    <p class="m-0 text-alarm">OFF</p>
                    <b-badge variant="danger" class="py-1 px-7">{{
                      this.countAlert
                    }}</b-badge>
                    <p class="m-0 text-alarm">ALERT</p>
                    <b-badge variant="success" class="py-1 px-7">{{
                      this.countNormal
                    }}</b-badge>
                    <p class="m-0 text-alarm">NORMAL</p>
                    <p class="m-0 icon-text">ALARM</p>
                  </div>
                </b-col>
              </b-row>
            </div>
          </div>
        </fullscreen>
      </div>
    </div>
  </section>
</template>

<script>
import RTU from "./content-detail/RTU.vue";
import PortAnalog from "./content-detail/PortAnalog.vue";
import PortDigital from "./content-detail/PortDigital.vue";
import Topology from "./content-detail/topology/Topology.vue";
import ApiService from "@/core/services/api.service";
import CountTimer from "@/view/pages/Components/CountTimer.vue";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  data() {
    return {
      target: "rtu",
      selectedOption: null,
      plnStatus: true,
      plnOff: false,
      dataDetailRtu: [],

      //analog
      currentPage: 1,
      perPage: 1,
      dataPortAnalaog: [],
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
      isFullscreen: false,
      statusRuangPerangkat: "",
      statusGensetA: "",
      statusGensetB: "",
      statusGensetC: "",
      statusPln: "",
      statusMdp: "",
      lineMdp: "",
      statusBbmHarian: "",
      statusBbmBulanan: "",
      statusRectifierA: "",
      statusRectifierB: "",
      lineRectifierA: "",
      lineRectifierB: "",
      statusAts: "",
      lineAts: "",
      statusBatteryA: "",
      statusBatteryB: "",
      statusAmfA: "",
      statusAmfB: "",
      statusAmfC: "",
      lineAmfA: "",
      lineAmfB: "",
      lineAmfC: "",
      countOff: 0,
      countNormal: 0,
      countAlert: 0,
      dataGenset: [],
    };
  },
  components: {
    RTU,
    Topology,
    PortAnalog,
    PortDigital,
    Treeselect,
    CountTimer,
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Dashboard", subtitle: "Detail RTU" },
    ]);
    this.refreshPage();
    this.writeNewTitle("RTU Operation");
  },
  methods: {
    refreshPage() {
      this.getDetailRtu();
      this.getPortAnalog();
      this.getPortDigital();
      this.getTopologyRtu();
    },
    goToTopology(param) {
      window.scroll({
        top: 1150,
        left: 0,
        behavior: "smooth",
      });
      this.target = "topology";
      this.selectedOption = param;
    },
    getDetailRtu() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_4,
        `operation/rtu/${this.$route.params.idRtu}`
      )
        .then(({ data }) => {
          this.dataDetailRtu = data.result;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },

    getPortAnalog() {
      ApiService.query(
        `${process.env.VUE_APP_ROOT_API_4}/operation/rtu/port/${this.$route.params.idRtu}`,
        {
          params: {
            mode: "analog",
            page: this.currentPage,
            limit: this.perPage,
          },
        }
      ).then(({ data }) => {
        this.dataPortAnalaog = data.result;
      });
    },
    getPortDigital() {
      ApiService.query(
        `${process.env.VUE_APP_ROOT_API_4}/operation/rtu/port/${this.$route.params.idRtu}`,
        {
          params: {
            mode: "digital",
            page: this.currentPage,
            limit: this.perPage,
          },
        }
      ).then(({ data }) => {
        this.dataPortDigital = data.result;
      });
    },
    getTopologyRtu() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_4,
        `operation/rtu/${this.$route.params.idRtu}/port-lines`
      )
        .then(({ data }) => {
          this.dataGenset = [];
          data.result.topology.forEach((item) => {
            switch (item.id) {
              case 9:
                this.statusRuangPerangkat = this.getStatusAnalog(item);
                break;
              case 10:
                this.dataGenset.push(item);
                break;
              case 11:
                this.dataGenset.push(item);
                break;
              case 12:
                this.dataGenset.push(item);
                break;
              case 13:
                this.statusPln = this.getStatusPLN(item);
                break;
              case 14:
                this.statusBbmHarian = this.getStatusAnalog(item);
                break;
              case 15:
                this.statusBbmBulanan = this.getStatusAnalog(item);
                break;
              case 16:
                if (this.checkStatus(item) == "digital") {
                  this.lineRectifierA = this.getStatusDigital(item);
                } else if (this.checkStatus(item) == "analog") {
                  this.statusRectifierA = this.getStatusAnalog(item);
                }
                break;
              case 17:
                if (this.checkStatus(item) == "digital") {
                  this.lineRectifierB = this.getStatusDigital(item);
                } else if (this.checkStatus(item) == "analog") {
                  this.statusRectifierB = this.getStatusAnalog(item);
                }
                break;
              case 18:
                if (this.checkStatus(item) == "digital") {
                  this.lineAts = this.getStatusDigital(item);
                } else if (this.checkStatus(item) == "analog") {
                  this.statusAts = this.getStatusAnalog(item);
                }
                break;
              case 19:
                this.statusBatteryA = this.getStatusAnalog(item);
                break;
              case 20:
                this.statusBatteryB = this.getStatusAnalog(item);
                break;
              case 21:
                if (this.checkStatus(item) == "digital") {
                  this.lineAmfA = this.getStatusDigital(item);
                } else if (this.checkStatus(item) == "analog") {
                  this.statusAmfA = this.getStatusAnalog(item);
                }
                break;
              case 22:
                if (this.checkStatus(item) == "digital") {
                  this.lineAmfB = this.getStatusDigital(item);
                } else if (this.checkStatus(item) == "analog") {
                  this.statusAmfB = this.getStatusAnalog(item);
                }
                break;
              case 23:
                if (this.checkStatus(item) == "digital") {
                  this.lineAmfC = this.getStatusDigital(item);
                } else if (this.checkStatus(item) == "analog") {
                  this.statusAmfC = this.getStatusAnalog(item);
                }
                break;
              case 25:
                if (this.checkStatus(item) == "digital") {
                  this.lineMdp = this.getStatusDigital(item);
                } else if (this.checkStatus(item) == "analog") {
                  this.statusMdp = this.getStatusAnalog(item);
                }
                break;
            }
          });
          this.countStatus(data.result.topology);
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    checkStatus(item) {
      let result = "empty";
      if (item.port) {
        if (item.port.no_port.includes("D")) {
          result = "digital";
        } else {
          result = "analog";
        }
      }
      return result;
    },
    getStatusAnalog(item) {
      let result = "";
      if (item.port) {
        if (item.port.treshold.length == 0) {
          result = "normal";
        } else {
          result = "alert";
        }
      } else {
        result = "";
      }
      return result;
    },
    getStatusDigital(item) {
      let result = "";
      if (item.port) {
        if (item.port.value == 0) {
          result = "off";
        } else {
          result = "normal";
        }
      } else {
        result = "";
      }
      return result;
    },
    getStatusPLN(item) {
      let gensetResult = [];
      this.dataGenset.forEach((item) => {
        gensetResult.push(this.getStatusDigital(item));
      });

      let result = "";
      if (item.port) {
        if (item.port.value == 1) {
          result = "off";
        } else {
          result = "normal";
        }
      } else {
        result = "";
      }

      let newResult = result;
      if (result != "") {
        if (gensetResult.includes(result)) {
          newResult = "alert";
        }
      }

      gensetResult = gensetResult.map((status) => {
        if (status == "") {
          return status;
        } else {
          if (status == result) {
            return "alert";
          } else {
            return status;
          }
        }
      });

      this.statusGensetA = gensetResult[0];
      this.statusGensetB = gensetResult[1];
      this.statusGensetC = gensetResult[2];
      return newResult;
    },
    countStatus(data) {
      this.countOff = 0;
      this.countNormal = 0;
      this.countAlert = 0;
      data.forEach((item) => {
        if (item.port == null) {
          this.countOff++;
        } else {
          if (item.port.treshold.length == 0) {
            this.countNormal++;
          } else {
            this.countAlert++;
          }
        }
      });
    },
    getStatusClass(status) {
      switch (status) {
        case "off":
          return "offStatus";
        case "normal":
          return "activeStatus";
        case "alert":
          return "failedStatus";
      }
    },
    getStatusLineClass(status) {
      switch (status) {
        case "off":
          return "offStatusLine";
        case "normal":
          return "activeStatusLine";
        case "alert":
          return "failedStatusLine";
      }
    },
    setLineStatus(status, className) {
      switch (status) {
        case "off":
          return className + "-off";
        case "normal":
          return className + "-active";
        case "alert":
          return className + "-failed";
      }
    },
    changeDetail(target) {
      this.target = target;
    },
    fullscreenToggle() {
      this.fullscreen = !this.fullscreen;
    },
    changeFullscreen() {
      this.isFullscreen = !this.isFullscreen;
    },
  },
};
</script>

<style scoped>
.icon-text {
  font-size: 0.8rem;
  font-weight: bold;
  text-align: center;
  word-wrap: break-word;
}

.topology-container {
  width: 100%;
  padding: 4%;
  /* height: 300px; */
  overflow: scroll;
  position: relative;
  background-color: white;
}

.topology-fullscreen-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.topology-wrapper {
  display: flex;
}

.topology-icon {
  width: 75%;
  height: auto;
}

.icon-wrapper {
  padding: 5px;
  height: 105px;
  display: flex;
  cursor: pointer;
  max-width: 100px;
  border-radius: 10px;
  align-items: center;
  flex-direction: column;
  border: 1px solid #ccc;
  justify-content: space-around;
}

.topology-icon {
  width: 60%;
  height: auto;
}

.rectifier-a {
  justify-content: end;
  right: 78px;
}

.line-pln {
  border: 5px solid #000;
  width: 185px;
  height: 94px;
  top: 50px;
  border-left: none;
  border-bottom: none;
  position: relative;
}

.line-ats {
  border: 5px solid #000;
  width: 75px;
  border-right: none;
  border-bottom: none;
  border-left: none;
  position: absolute;
  top: 50%;
  right: -75px;
}

.line-mdp {
  border: 5px solid #000;
  border-left: none;
  border-top: none;
  border-right: none;
  width: 55px;
  height: 85px;
  right: 20px;
  top: -29%;
  position: absolute;
}

.line-rectifier {
  border: 5px solid #000;
  width: 93px;
  height: 137%;
  top: 50px;
  border-right: none;
  border-bottom: none;
  position: relative;
}

.line-rectifier-to-temperature {
  border: 5px solid #000;
  width: 119px;
  height: 117px;
  top: 50px;
  border-left: none;
  border-bottom: none;
  position: absolute;
  margin-right: 5%;
  right: -144px;
}

.line-baterai {
  border: 5px solid #000;
  width: 100px;
  height: 39px;
  border-top: none;
  border-right: none;
  border-bottom: none;
  position: relative;
  right: 20%;
  top: -39px;
}

.line-ruang {
  border: 5px solid #000;
  width: 15%;
  border-right: none;
  border-bottom: none;
  border-left: none;
  position: absolute;
  left: 25%;
  top: 18%;
}

.line-genset-a {
  border: 5px solid #000;
  width: 66px;
  border-top: none;
  border-right: none;
  border-left: none;
  position: relative;
  bottom: 35%;
}

.line-amf-a {
  border: 5px solid #000;
  width: 5%;
  height: 65%;
  border-top: none;
  border-left: none;
  position: absolute;
  top: 0%;
  left: 24%;
}

.line-mdp-to-rectifier-b {
  border: 5px solid #000;
  border-top: none;
  border-right: none;
  width: 95px;
  position: absolute;
  height: 148px;
  left: 60px;
  top: -51px;
}

.line-rectifier-b {
  border: 5px solid #000;
  border-top: none;
  border-right: none;
  border-bottom: none;
  height: 39px;
  position: absolute;
  bottom: -27%;
}

.line-rectifier-b-to-temperature {
  border: 5px solid #000;
  border-top: none;
  border-left: none;
  width: 119px;
  height: 120px;
  position: absolute;
  right: 40px;
  top: -14%;
}

.line-rectifier-b-to-temperature-next {
  border: 5px solid #000;
  border-right: none;
  border-bottom: none;
  border-left: none;
  width: 25px;
  position: absolute;
  right: 15px;
  top: -14%;
}

.line-genset-b {
  border: 5px solid #000;
  width: 66px;
  border-top: none;
  border-right: none;
  border-left: none;
  position: relative;
  bottom: 35%;
}

.line-amf-b {
  border: 5px solid #000;
  width: 5%;
  height: 100%;
  border-top: none;
  border-left: none;
  position: absolute;
  top: -35%;
  left: 24%;
}
.line-genset-c {
  border: 5px solid #000;
  width: 66px;
  border-top: none;
  border-right: none;
  border-left: none;
  position: relative;
  bottom: 35%;
}

.line-amf-c {
  border: 5px solid #000;
  width: 5%;
  height: 100%;
  border-top: none;
  border-left: none;
  position: absolute;
  top: -35%;
  left: 24%;
}

.ats {
  justify-content: end;
}

.mdp {
  justify-content: center;
  position: relative;
}

.battery-a {
  justify-content: center;
  right: -47px;
  position: relative;
}

.rectifier-b {
  position: relative;
  left: -85px;
  justify-content: center;
}

.battery-b {
  justify-content: center;
  left: -86px;
}

.alarm-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 2px solid #ccc;
  border-radius: 10px;
  width: 115px;
  height: 150px;
  padding: 5px;
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

.card-header {
  font-weight: bold;
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
.button-wrapper {
  display: flex;
  align-items: center;
}

@media (min-width: 768px) and (max-width: 991px) {
  .icon-wrapper {
    width: 68px;
    height: 72px;
  }

  .line-pln {
    width: 126px;
    height: 72px;
    top: 36px;
  }

  .line-genset-a {
    width: 45px;
  }

  .line-genset-b {
    width: 45px;
  }

  .line-genset-c {
    width: 45px;
  }

  .line-mdp {
    width: 18%;
    top: -62%;
    right: 20px;
    height: 59px;
    top: -29%;
  }

  .line-rectifier {
    top: 35px;
    width: 48px;
    height: 149%;
  }

  .line-rectifier-to-temperature {
    width: 106px;
    height: 88px;
    top: 37px;
    right: -115px;
  }

  .battery-a {
    right: -23px;
  }

  .line-baterai {
    top: -36px;
    right: 20%;
    height: 36px;
  }

  .line-mdp-to-rectifier-b {
    width: 47px;
    height: 112px;
    top: -35px;
    margin-left: 0.5px;
  }

  .line-ruang {
    width: 25px;
    left: 18%;
  }

  .line-rectifier-b {
    height: 36px;
    bottom: -33%;
  }

  .line-rectifier-b-to-temperature {
    width: 100px;
    height: 92px;
    right: 8px;
    top: -14%;
  }

  .line-rectifier-b-to-temperature-next {
    right: -17px;
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .icon-wrapper {
    width: 80px;
    height: 90px;
  }

  .line-pln {
    width: 160px;
  }

  .line-genset-a {
    width: 60px;
  }

  .line-genset-b {
    width: 60px;
  }

  .line-genset-c {
    width: 60px;
  }

  .line-amf-a {
    width: 6%;
    left: 23%;
  }

  .line-amf-b {
    width: 6%;
    left: 23%;
  }

  .line-amf-c {
    width: 6%;
    left: 23%;
  }

  .line-mdp {
    width: 45px;
    right: 20px;
    height: 74px;
  }

  .line-rectifier {
    width: 76px;
    height: 134%;
    top: 48px;
  }

  .line-mdp-to-rectifier-b {
    top: -42px;
    height: 126px;
    width: 74px;
  }

  .line-baterai {
    top: -40px;
    right: 42px;
    height: 40px;
  }

  .line-rectifier-to-temperature {
    right: -138px;
    width: 118px;
    height: 101px;
  }

  .line-rectifier-b {
    height: 37px;
    bottom: -28%;
  }

  .line-rectifier-b-to-temperature {
    right: 15px;
    height: 100px;
  }

  .line-rectifier-b-to-temperature-next {
    right: -5px;
    width: 20px;
  }

  .line-ruang {
    left: 28%;
  }

  .battery-a {
    right: -37px;
  }
}

@media (max-width: 1024px) {
  /* pln */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .pln-wrapped
    > .line-pln {
    width: 196px;
    top: 42px;
  }

  /* ats */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .ats
    > .line-ats {
    width: 79px;
    right: -78px;
  }

  /* amf a */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .amf-a
    > .line-amf-a {
    width: 11%;
    left: 20%;
  }

  /* genset a */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .genset-a
    > .line-genset-a {
    width: 77px;
  }

  /* amf b */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .amf-b
    > .line-amf-b {
    width: 11%;
    left: 20%;
  }

  /* genset b */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .genset-b
    > .line-genset-b {
    width: 77px;
  }

  /* amf c */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .amf-c
    > .line-amf-c {
    width: 11%;
    left: 20%;
  }

  /* genset c */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .genset-c
    > .line-genset-c {
    width: 77px;
  }

  /* line mdp */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .mdp
    > .line-mdp {
    width: 59px;
    right: 8%;
  }

  /* line mdp to rectifier a */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .rectifier-a
    > .line-rectifier {
    width: 100px;
  }

  /* line mdp recitifer b */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .rectifier-b
    > .line-mdp-to-rectifier-b {
    width: 100px;
    height: 131px;
    left: 56px;
    top: -43px;
  }

  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .battery-a {
    left: 50px;
  }

  /* recitifer b */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .rectifier-b {
    left: -79px;
  }

  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .battery-b {
    left: -80px;
  }

  /* line rectifier b to temperature */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .rectifier-b
    > .line-rectifier-b-to-temperature {
    right: 41px;
    width: 115px;
    height: 107px;
  }

  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .rectifier-b
    > .line-rectifier-b-to-temperature-next {
    right: 1px;
    width: 41px;
  }

  /* line rectifier a to temperature */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .ruang
    > .line-ruang {
    width: 27%;
    left: 22%;
  }
}

@media (min-width: 1025px) and (max-width: 1280px) {
  /* pln */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .pln-wrapped
    > .line-pln {
    width: 245px;
  }

  /* ats */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .ats
    > .line-ats {
    width: 97px;
    right: -97px;
  }

  /* amf a */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .amf-a
    > .line-amf-a {
    width: 10%;
    left: 20%;
  }

  /* amf b */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .amf-b
    > .line-amf-b {
    width: 10%;
    left: 20%;
  }

  /* amf c */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .amf-c
    > .line-amf-c {
    width: 10%;
    left: 20%;
  }

  /* genset a */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .genset-a
    > .line-genset-a {
    width: 96px;
  }

  /* genset b */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .genset-b
    > .line-genset-b {
    width: 96px;
  }

  /* genset c */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .genset-c
    > .line-genset-c {
    width: 96px;
  }

  /* line mdp */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .mdp
    > .line-mdp {
    right: 42px;
  }

  /* line mdp recitifer b */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .rectifier-b
    > .line-mdp-to-rectifier-b {
    width: 157px;
    left: 38px;
  }

  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .rectifier-a {
    right: 85px;
  }

  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .battery-a {
    right: -60px;
  }

  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .battery-a
    > .line-baterai {
    right: 17%;
  }

  /* recitifer a */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .rectifier-a
    > .line-rectifier {
    width: 156px;
  }

  /* line rectifier b to temperature */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .rectifier-b
    > .line-rectifier-b-to-temperature {
    width: 155px;
  }

  /* line rectifier a to temperature */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .rectifier-a
    > .line-rectifier-to-temperature {
    right: -184px;
    width: 155px;
  }

  /* line rectifier a to temperature */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .ruang
    > .line-ruang {
    width: 16%;
    left: 33%;
  }
}

@media (min-width: 1400px) and (max-width: 1440px) {
  .line-pln {
    width: 246px;
  }

  .line-genset-a {
    width: 50%;
  }

  .line-genset-b {
    width: 50%;
  }

  .line-genset-c {
    width: 50%;
  }

  .line-amf-a {
    width: 50px;
    left: 20%;
  }

  .line-amf-b {
    width: 50px;
    left: 20%;
  }

  .line-amf-c {
    width: 50px;
    left: 20%;
  }

  .line-ats {
    width: 98px;
    right: -98px;
  }

  .line-rectifier {
    width: 143px;
  }

  .line-mdp {
    width: 77px;
    right: 20px;
  }

  .line-mdp-to-rectifier-b {
    width: 137px;
  }

  .line-rectifier-to-temperature {
    width: 151px;
    height: 117px;
    right: -181px;
  }

  .line-ruang {
    width: 13%;
    left: 36%;
  }

  .line-rectifier-b-to-temperature {
    width: 157px;
  }

  .line-baterai {
    right: 17%;
  }

  .battery-a {
    right: -70px;
  }

  /* pln */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .pln-wrapped
    > .line-pln {
    width: 289px;
  }

  /* ats */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .ats
    > .line-ats {
    width: 113px;
    right: -113px;
  }

  /* amf a */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .amf-a
    > .line-amf-a {
    width: 73px;
    left: 18%;
  }

  /* genset a */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .genset-a
    > .line-genset-a {
    width: 54%;
  }

  /* amf b */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .amf-b
    > .line-amf-b {
    width: 73px;
    left: 18%;
  }

  /* genset b */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .genset-b
    > .line-genset-b {
    width: 54%;
  }

  /* amf c */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .amf-c
    > .line-amf-c {
    width: 73px;
    left: 18%;
  }

  /* genset c */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .genset-c
    > .line-genset-c {
    width: 54%;
  }

  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .mdp
    > .line-mdp {
    width: 92px;
    right: 21px;
  }

  /* recitifer a */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .rectifier-a {
    right: 93px;
  }

  /* line mdp to rectifier a */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .rectifier-a
    > .line-rectifier {
    width: 164px;
  }

  /* recitifer b */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .rectifier-b {
    left: -89px;
  }

  /* line mdp recitifer b */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .rectifier-b
    > .line-mdp-to-rectifier-b {
    width: 158px;
    left: 64px;
  }

  /* battery b */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .battery-b {
    left: -89px;
  }

  /* line rectifier b to temperature */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .rectifier-b
    > .line-rectifier-b-to-temperature {
    right: 72px;
    width: 151px;
  }

  /* line rectifier b to temperature */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .rectifier-b
    > .line-rectifier-b-to-temperature-next {
    right: 11px;
    width: 61px;
  }

  /* line rectifier a to temperature */
  .fullscreen-topology
    > .scroll
    > .topology-container
    > .topology-wrapper
    > .ruang
    > .line-ruang {
    width: 29%;
    left: 25%;
  }
}

@media (min-width: 1441px) {
  .line-pln {
    width: 246px;
  }

  .line-genset-a {
    width: 50%;
  }

  .line-genset-b {
    width: 50%;
  }

  .line-genset-c {
    width: 50%;
  }

  .line-amf-a {
    width: 10%;
    left: 20%;
  }

  .line-amf-b {
    width: 10%;
    left: 20%;
  }

  .line-amf-c {
    width: 10%;
    left: 20%;
  }

  .line-ats {
    width: 98px;
    right: -98px;
  }

  .line-rectifier {
    width: 143px;
  }

  .line-mdp {
    width: 78px;
    right: 20px;
  }

  .line-mdp-to-rectifier-b {
    width: 138px;
  }

  .line-rectifier-to-temperature {
    width: 151px;
    height: 118px;
    right: -181px;
  }

  .line-ruang {
    width: 13%;
    left: 36%;
  }

  .line-rectifier-b-to-temperature {
    width: 157px;
  }

  .line-rectifier-b-to-temperature-next {
    width: 26px;
  }

  .line-baterai {
    right: 17%;
  }

  .battery-a {
    right: -70px;
  }
}

@media (min-width: 1441px) and (max-width: 2560px) {
  .fullscreen-topology > .scroll > .topology-container {
    padding-left: 27%;
    padding-right: 27%;
  }
}

/* .card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
} */
.fullscreen-topology {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: auto !important;
  /* max-height: 100vh !important; */
  overflow-y: scroll;
  z-index: 9999;
}

/* New CSS Topology */

.topology-body {
  padding: 40px 30px;
}

.topology-grid > div.c-border {
  height: 90px;
  /* border: 1px solid #000; */
  padding: 0;
}

.topology-grid > .c-h-break {
  height: 50px !important;
}

.gd-icon-wrapper {
  position: absolute;
  background-color: #ffffff;
  z-index: 13;
  padding: 5px;
  /* height: 100%; */
  min-height: 100%;
  display: flex;
  cursor: pointer;
  width: 100%;
  /* width: 80px; */
  /* margin-left: auto;
  margin-right: auto;
  right: 0;
  left: 0; */
  border-radius: 10px;
  align-items: center;
  flex-direction: column;
  border: 1px solid #ccc;
  justify-content: space-around;
}

.topology-grid .v-line {
  height: 100%;
  width: calc(50% + 0.5rem);
  position: absolute;
  border-right: 0.5rem solid #000000;
  /* background-color: #4ef65c; */
  background-color: #ffffff;
  z-index: 11;
}

.topology-grid .h-line {
  width: 100%;
  position: absolute;
  top: calc(50% - 0.5rem);
  height: calc(50% + 0.5rem);
  border-top: 0.5rem solid #000000;
  /* background-color: #4ef65c; */
  background-color: #ffffff;
}

.topology-grid .l-half-line {
  width: calc(50% + 0.5rem);
  height: calc(50% + 0.5rem);
  top: calc(50% - 0.5rem);
  border-top: 0.5rem solid #000000;
  position: absolute;
  z-index: 12;
  /* background-color: #4ef65c; */
  background-color: #ffffff;
}
.topology-grid .l-to-t-line {
  width: calc(50% + 0.5rem);
  height: calc(50% + 0.5rem);
  border: 0.5rem solid #000000;
  border-left: none;
  border-top: none;
  position: absolute;
  /* background-color: #4ef65c; */
  background-color: #ffffff;
}
.topology-grid .l-to-b-line {
  width: calc(50% + 0.5rem);
  height: calc(50% + 0.5rem);
  top: calc(50% - 0.5rem);
  border: 0.5rem solid #000000;
  border-left: none;
  border-bottom: none;
  position: absolute;
  z-index: 11;
  /* background-color: #4ef65c; */
  background-color: #ffffff;
}
.topology-grid .r-half-line {
  width: 50%;
  height: calc(50% + 0.5rem);
  top: calc(50% - 0.5rem);
  left: calc(50% + 0.01rem);
  border-top: 0.5rem solid #000000;
  position: absolute;
  z-index: 10;
  /* background-color: #4ef65c; */
  background-color: #ffffff;
}

.topology-grid .t-half-line {
  width: calc(50% + 0.5rem);
  height: calc(50% - 0.05rem);
  border-right: 0.5rem solid #000000;
  position: absolute;
  z-index: 11;
  /* background-color: #4ef65c; */
  background-color: #ffffff;
}
.topology-grid .b-half-line {
  width: calc(50% + 0.5rem);
  height: calc(50% + 0.5rem);
  top: calc(50% - 0.5rem);
  border-right: 0.5rem solid #000000;
  position: absolute;
  z-index: 11;
  /* background-color: #4ef65c; */
  background-color: #ffffff;
}
.topology-grid .r-t-line {
  width: 50%;
  height: 50%;
  left: calc(50% - 0rem);
  border-bottom: 0.5rem solid #000000;
  position: absolute;
  z-index: 10;
  /* background-color: #4ef65c; */
  background-color: #ffffff;
}

.gd-alarm-wrapper {
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 2px solid #ccc;
  border-radius: 10px;
  width: 115px;
  height: 150px;
  padding: 5px;
}

.pln-off .pln-line,
.mdp-rect-a-off .mdp-to-rect-a-line,
.rect-a-off .rect-a-to-rp-line,
.ats-off .ats-to-mdp-line,
.mdp-rect-b-off .mdp-to-rect-b-line,
.rect-b-off .rect-b-to-rp-line,
.gen-a-off .gen-a-to-amf-a-line,
.btr-a-off .rect-a-to-btr-a-line,
.btr-b-off .rect-b-to-btr-b-line,
.gen-b-off .gen-b-to-amf-b-line {
  border-color: #ccc !important;
}

.pln-active .pln-line,
.mdp-rect-a-active .mdp-to-rect-a-line,
.rect-a-active .rect-a-to-rp-line,
.ats-active .ats-to-mdp-line,
.mdp-rect-b-active .mdp-to-rect-b-line,
.rect-b-active .rect-b-to-rp-line,
.gen-a-active .gen-a-to-amf-a-line,
.btr-a-active .rect-a-to-btr-a-line,
.btr-b-active .rect-b-to-btr-b-line,
.gen-b-active .gen-b-to-amf-b-line {
  border-color: #1bc5bd !important;
}

.pln-failed .pln-line,
.mdp-rect-a-failed .mdp-to-rect-a-line,
.rect-a-failed .rect-a-to-rp-line,
.ats-failed .ats-to-mdp-line,
.mdp-rect-b-failed .mdp-to-rect-b-line,
.rect-b-failed .rect-b-to-rp-line,
.gen-a-failed .gen-a-to-amf-a-line,
.btr-a-failed .rect-a-to-btr-a-line,
.btr-b-failed .rect-b-to-btr-b-line,
.gen-b-failed .gen-b-to-amf-b-line {
  border-color: #f64e60 !important;
}

/* END New CSS Topology */
</style>
