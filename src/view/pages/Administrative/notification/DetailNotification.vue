<template>
  <b-modal
    id="modal-detail-notification"
    size="lg"
    title="Detail Notification"
    hide-footer
    ok-only
  >
    <section id="detail-notification">
      <div class="container">
        <form>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label">TIPE AKUN :</label>
            <div class="col-sm-9 col-form-label">
              <label class="m-0" v-if="dataNotification.type == 'user'">
                <input
                  type="radio"
                  value="user"
                  v-model="dataNotification.type"
                />
                <span
                  class="font-weight-bold ml-2 mr-5"
                  align-self="center"
                  style="font-size: 14px"
                  >USER</span
                >
              </label>
              <label class="m-0" v-else>
                <input
                  type="radio"
                  value="group"
                  v-model="dataNotification.type"
                />
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
            <label class="col-sm-3 col-form-label">TELEGRAM ID :</label>
            <div class="col-sm-9">
              <input
                type="text"
                class="form-control"
                v-model="dataNotification.telegram_chat_id"
                disabled
              />
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label">RTU :</label>
            <div class="col-sm-9">
              <Treeselect
                v-model="dataNotification.rtus"
                :options="dataNotification.rtus"
                :normalizer="normalizer"
                :multiple="true"
                disabled
              />
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label">TAGS :</label>
            <div class="col-sm-9">
              <Treeselect
                v-model="dataNotification.tags"
                placeholder="Pilih tags"
                :normalizer="normalizer"
                :options="dataNotification.tags"
                :multiple="true"
                disabled
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  </b-modal>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  components: {
    Treeselect,
  },
  data() {
    return {
      dataNotification: {},
      normalizer(node) {
        return {
          id: node,
          label: node,
        };
      },
    };
  },
  methods: {
    setDataNotification(data) {
      this.dataNotification = data;
      let dataTags = data.tags.filter((tag) => tag != null);
      let dataRtus = data.rtus.filter((rtu) => rtu != null);
      this.dataNotification.tags = dataTags;
      this.dataNotification.rtus = dataRtus;
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
