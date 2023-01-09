<template>
  <b-modal
    id="modal-update-notification"
    size="lg"
    title="Update Notification"
    ok-title="Simpan"
    @ok="updateNotification"
    button-size="sm"
    ok-variant="success"
    ok-only
    @close="setDefaultData"
    @cancel="setDefaultData"
    @hidden="setDefaultData"
  >
    <section id="update-notification">
      <div class="container">
        <form>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label"
              >TIPE AKUN <span class="required-icon">*</span> :</label
            >
            <div class="col-sm-9 col-form-label">
              <label class="m-0" v-if="type == 'user'">
                <input type="radio" value="user" v-model="type" />
                <span
                  class="font-weight-bold ml-2 mr-5"
                  align-self="center"
                  style="font-size: 14px"
                  >USER</span
                >
              </label>
              <label class="m-0" v-else>
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
              <input
                type="text"
                class="form-control"
                v-model="telegramId"
                disabled
              />
            </div>
          </div>
          <div class="mb-4 row">
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
              <div class="text-danger text-small">
                *Cukup dibiarkan kosong jika data RTU tidak ingin dirubah.
              </div>
              <div class="text-small">
                Data RTU sekarang adalah
                <span class="text-bold">{{
                  dataTelegramBeforeUpdate.rtus.join(", ")
                }}</span>
              </div>
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

      dataTelegramBeforeUpdate: {
        rtus: [],
      },
      dataAllRTU: [],
      dataAllTags: [],
      dataTelegramSelected: {},
    };
  },
  components: {
    Treeselect,
  },
  mounted() {
    this.getDataRTU();
    this.getDataTags();
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
    setDataNotification(notified) {
      this.dataTelegramBeforeUpdate = notified;
      ApiService.get(
        process.env.VUE_APP_ROOT_API_3,
        `notifieds/${notified.telegram_chat_id}`
      )
        .then(({ data }) => {
          this.dataTelegramSelected = data.result;
          this.type = data.result.type;
          this.telegramId = notified.telegram_name;
          this.dataTagsSelected = data.result.tag_ids;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    updateNotification() {
      if (this.dataTagsSelected.length === 0) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "TAGS wajib diisi",
        });
      } else {
        let dataUpdate = {
          rtu_ids:
            this.dataRTUSelected.length == 0
              ? this.dataTelegramSelected.rtu_ids
              : this.dataRTUSelected,
          tag_ids: this.dataTagsSelected,
        };
        ApiService.put(
          `${process.env.VUE_APP_ROOT_API_3}/notifieds/${this.dataTelegramSelected.telegram_chat_id}`,
          dataUpdate
        )
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Berhasil.",
              text: `Anda berhasil mengupdate data telegram ${this.telegramId}`,
            });
            this.setDefaultData();
            this.$parent.getDataNotification();
          })
          .catch((e) => {
            Swal.fire({
              icon: "error",
              title: "Oops..",
              text: `${e.response.data.result.details[0].message}`,
            });
            this.setDefaultData();
            console.log(e.response);
          });
      }
    },
    setDefaultData() {
      this.type = "";
      this.telegramId = null;
      this.dataRTUSelected = [];
      this.dataTagsSelected = [];
      this.dataTelegramBeforeUpdate = {
        rtus: [],
      };
      this.dataTelegramSelected = {};
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
.text-small {
  font-size: 10px;
}
.text-bold {
  font-weight: bold;
}
</style>
