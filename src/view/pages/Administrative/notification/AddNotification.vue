<template>
  <b-modal
    id="modal-add-notification"
    size="lg"
    title="Tambah Notification"
    ok-title="Simpan"
    @ok="addNotification"
    button-size="sm"
    ok-variant="success"
    ok-only
    @close="setDefaultData"
    @cancel="setDefaultData"
    @hidden="setDefaultData"
  >
    <section id="add-notification">
      <div class="container">
        <form>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label"
              >TIPE AKUN <span class="required-icon">*</span> :</label
            >
            <div class="col-sm-9 col-form-label">
              <label class="m-0">
                <input type="radio" value="user" v-model="type" />
                <span
                  class="font-weight-bold ml-2 mr-5"
                  align-self="center"
                  style="font-size: 14px"
                  >USER</span
                >
              </label>
              <label class="m-0">
                <input type="radio" value="group" v-model="type" />
                <span
                  class="font-weight-bold ml-2"
                  align-self="center"
                  style="font-size: 14px"
                  >GROUP</span
                >
              </label>
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label"
              >TELEGRAM ID <span class="required-icon">*</span> :</label
            >
            <div class="col-sm-9">
              <Treeselect
                v-model="telegramId"
                noOptionsText="Harap pilih type akun terlebih dahulu"
                noResultsText="Data telegram tidak ditemukan"
                placeholder="Pilih data telegram"
                :options="dataTelegramId"
              />
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label"
              >RTU <span class="required-icon">*</span> :</label
            >
            <div class="col-sm-9">
              <treeselect
                :async="true"
                :multiple="true"
                :clear-on-select="true"
                :load-options="loadRTU"
                placeholder="Ketik untuk cari RTU"
                v-model="dataRTUSelected"
              />
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label"
              >TAGS <span class="required-icon">*</span> :</label
            >
            <div class="col-sm-9">
              <Treeselect
                v-model="dataTagsSelected"
                placeholder="Pilih tags"
                :options="dataAllTags"
                :multiple="true"
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  </b-modal>
</template>

<script>
import Swal from "sweetalert2";
import Treeselect from "@riophae/vue-treeselect";
import { ASYNC_SEARCH } from "@riophae/vue-treeselect";
import ApiService from "@/core/services/api.service.js";

const simulateAsyncOperation = (fn) => {
  setTimeout(fn, 1000);
};

export default {
  data() {
    return {
      type: "",
      telegramId: null,
      dataRTUSelected: [],
      dataTagsSelected: [],

      dataTelegramId: [],
      dataAllRTU: [],
      dataAllTags: [],
    };
  },
  components: {
    Treeselect,
  },
  mounted() {
    this.getDataRTU();
    this.getDataTags();
  },
  watch: {
    type: function () {
      this.telegramId = null;
      this.getDataTelegramID();
    },
  },
  methods: {
    getDataRTU() {
      ApiService.query(`${process.env.VUE_APP_ROOT_API_4}/rtu`, {
        params: {
          limit: "all",
        },
      })
        .then(({ data }) => {
          this.dataAllRTU = data.result.payload.map((rtu) => {
            return {
              id: rtu.rtu_id,
              label: rtu.rtu_name,
            };
          });
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    loadRTU({ action, searchQuery, callback }) {
      if (action === ASYNC_SEARCH) {
        simulateAsyncOperation(() => {
          const options = [];
          this.dataAllRTU.forEach((element) => {
            if (
              element.label.toLowerCase().includes(searchQuery.toLowerCase())
            ) {
              options.push(element);
            }
          });
          callback(null, options.slice(0, 100));
        });
      }
    },
    getDataTags() {
      ApiService.query(`${process.env.VUE_APP_ROOT_API_3}/tags`, {
        params: {
          limit: null,
        },
      })
        .then(({ data }) => {
          this.dataAllTags = data.result.tags.map((tag) => {
            return {
              id: tag.id,
              label: tag.name,
            };
          });
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    getDataTelegramID() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_3,
        `notifieds/option-telegrams`
      )
        .then(({ data }) => {
          const dataTelegram = data.result;

          let newData = [];

          // get spesifik data telegram
          if (this.type == "group") {
            newData = dataTelegram.filter((tele) => tele.type == "group");
          } else {
            newData = dataTelegram.filter((tele) => tele.type == "user");
          }

          this.dataTelegramId = newData.map((tele) => {
            return {
              id: tele.telegram_chat_id,
              label: tele.name,
            };
          });
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    addNotification() {
      if (this.type == "" || this.type == null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "TIPE AKUN wajib diisi",
        });
      } else if (this.telegramId == "" || this.telegramId == null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "TELEGRAM ID wajib diisi",
        });
      } else if (this.dataRTUSelected.length === 0) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "RTU wajib diisi",
        });
      } else if (this.dataTagsSelected.length === 0) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "TAGS wajib diisi",
        });
      } else {
        let dataPostApi = {
          type: this.type,
          telegram_chat_id: this.telegramId,
          rtu_ids: this.dataRTUSelected,
          tag_ids: this.dataTagsSelected,
        };

        ApiService.post(
          `${process.env.VUE_APP_ROOT_API_3}/notifieds`,
          dataPostApi
        )
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Berhasil.",
              text: "Anda berhasil menambahkan data notifikasi.",
            });
            this.setDefaultData();
            this.$parent.getDataNotification();
          })
          .catch((e) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${e.response.data.result.details[0].message}`,
            });
            this.dataTelegramId = [];
            this.dataRTUSelected = [];
          });
      }
    },
    setDefaultData() {
      this.type = "";
      this.dataTelegramId = [];
      this.telegramId = null;
      this.dataRTUSelected = [];
      this.dataTagsSelected = [];
    },
  },
};
</script>

<style scoped>
.col-form-label {
  font-weight: bold;
}
.required-icon {
  color: #c70000;
}
.form-control {
  background-color: #f4f8fa;
}
</style>
