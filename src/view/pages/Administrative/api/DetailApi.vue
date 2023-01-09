<template>
  <b-modal
    id="modal-detail-api"
    size="lg"
    title="Detail API"
    ok-title=""
    button-size="sm"
    ok-variant="transparent"
    ok-only
    @close="closeDetail"
  >
    <section id="detail-api">
      <div class="container">
        <form>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label"
              >API ROLE <span class="required-icon">*</span> :</label
            >
            <div class="col-sm-9">
              <input type="text" class="form-control" v-model="role" disabled />
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label"
              >APPLICATION <span class="required-icon">*</span> :</label
            >
            <div class="col-sm-9">
              <input
                type="text"
                class="form-control"
                v-model="application"
                disabled
              />
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label">TOKEN :</label>
            <div class="col-sm-9">
              <input
                type="text"
                class="form-control"
                disabled
                v-model="token"
              />
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label">EXPIRED DATE :</label>
            <div class="col-sm-9">
              <input type="date" class="form-control" v-model="date" disabled />
            </div>
          </div>
        </form>
      </div>
    </section>
  </b-modal>
</template>

<script>
export default {
  props: ["apiSelected", "isDetail"],
  emits: ["hideDetail"],
  data() {
    return {
      role: "",
      application: "",
      token: "",
      date: "",
    };
  },
  watch: {
    isDetail: function () {
      if (this.isDetail == true) {
        this.setDataApi();
      }
    },
  },
  methods: {
    setDataApi() {
      this.role = this.apiSelected.role;
      this.application = this.apiSelected.application;
      this.token = this.apiSelected.token;
      this.date = this.getReturnTime(this.apiSelected.expired_at);
    },
    getReturnTime(time) {
      let timeObject = new Date(parseInt(time));
      let date = timeObject.getDate();
      let month = timeObject.getMonth() + 1;
      let year = timeObject.getFullYear();
      if (month.toString().length == 1) {
        month = `0${month}`;
      }
      if (date.toString().length == 1) {
        date = `0${date}`;
      }
      return `${year}-${month}-${date}`;
    },
    closeDetail() {
      this.$emit("hideDetail");
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
