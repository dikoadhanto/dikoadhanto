<template>
  <section>
    <div class="row mb-5">
      <div class="col">
        <div class="wrap-btn d-flex justify-content-end">
          <b-button
            :variant="activeCategory == 'harian' ? 'primary' : 'light'"
            @click="changeCategory('harian')"
            class="mx-2"
            >Harian</b-button
          >
          <b-button
            :variant="activeCategory == 'bulanan' ? 'primary' : 'light'"
            @click="changeCategory('bulanan')"
            >Bulanan</b-button
          >
        </div>
      </div>
    </div>

    <div class="alert alert-danger mt-15" role="alert" v-if="isEmpty">
      Data tidak ada...
    </div>
    <div v-else>
      <!-- data bbm daily -->
      <div v-for="(item, i) in dataBbmCategory" :key="i">
        <div>
          <div class="row mb-2">
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                value="NOMOR PORT"
                readonly
              />
            </div>
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                :value="item.no_port"
                readonly
              />
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                disabled
                value="IDENTIFIER"
              />
            </div>
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                disabled
                :value="item.identifier"
              />
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                value="JENIS TANGKI"
                readonly
              />
            </div>
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                readonly
                :value="item.bbm_type ? item.bbm_type.toUpperCase() : '-'"
              />
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                disabled
                value="DESKRIPSI"
              />
            </div>
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                disabled
                :value="item.description"
              />
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                value="KAPASITAS"
                readonly
              />
            </div>
            <div class="col-sm-3">
              <div class="d-flex align-items-center">
                <input
                  type="text"
                  class="form-control mr-2"
                  :value="item.tank_capacity ? item.tank_capacity : '-'"
                  readonly
                />
                LITER
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                disabled
                value="SISA VOLUME"
              />
            </div>
            <div class="col-sm-3">
              <div class="d-flex align-items-center">
                <input
                  type="text"
                  class="form-control mr-2"
                  disabled
                  :value="
                    Number(item.tank_capacity - item.fuel_consumption).toFixed(
                      1
                    )
                  "
                />
                LITER
              </div>
            </div>
            <div class="col-sm-3">
              <div class="d-flex align-items-center">
                <input
                  type="text"
                  class="form-control mr-2"
                  disabled
                  :value="
                    Number(
                      ((item.tank_capacity - item.fuel_consumption) /
                        item.tank_capacity) *
                        100
                    ).toFixed(1)
                  "
                />
                %
              </div>
            </div>
          </div>
        </div>
        <hr class="mt-10 mb-10" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import ApiService from "@/core/services/api.service";

export default {
  data() {
    return {
      isEmpty: false,
      dataBbm: [],
      dataBbmCategory: [],
      activeCategory: "harian",
    };
  },
  computed: {
    ...mapGetters(["getIsAutoRefresh"]),
  },

  mounted() {
    this.getDataBbm();
  },
  watch: {
    getIsAutoRefresh: function () {
      if (this.getIsAutoRefresh) {
        this.getDataBbm();
      }
    },
    activeCategory() {
      this.getDataCategory();
    },
  },
  methods: {
    getDataBbm() {
      if (this.getIsAutoRefresh) {
        this.$store.dispatch("setIsAutoRefresh", false);
      } else {
        this.isReady = false;
      }
      ApiService.get(
        process.env.VUE_APP_ROOT_API_5,
        `operation/rtu/topology/${this.$route.params.idRtu}?desc=BBM`
      )
        .then(({ data }) => {
          this.isEmpty = false;
          this.dataBbm = data.result.payload;
          this.getDataCategory();
        })
        .catch((error) => {
          this.isEmpty = true;
          console.log(error);
        });
    },
    getDataCategory() {
      if (this.activeCategory === "harian") {
        this.dataBbmCategory = this.dataBbm.filter((item) => {
          if (item.bbm_type != this.activeCategory) {
            this.isEmpty = true;
          } else {
            this.isEmpty = false;
            return item.bbm_type == this.activeCategory;
          }
        });
      } else {
        this.dataBbmCategory = this.dataBbm.filter((item) => {
          if (item.bbm_type != this.activeCategory) {
            this.isEmpty = true;
          } else {
            this.isEmpty = false;
            return item.bbm_type == this.activeCategory;
          }
        });
      }
    },
    changeCategory(category) {
      this.activeCategory = category;
    },
  },
};
</script>
