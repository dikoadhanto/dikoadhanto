<template>
  <b-modal
    id="modal-detail-permission"
    size="lg"
    title="Detail Permission"
    ok-title=""
    button-size="sm"
    ok-variant="transparent"
    @close="closePermission"
    ok-only
  >
    <section id="detail-permission">
      <div class="container">
        <form>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label"
              >PERMISSION NAME <span class="required-icon">*</span> :</label
            >
            <div class="col-sm-9">
              <input type="text" class="form-control" v-model="name" disabled />
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label">DESKRIPSI :</label>
            <div class="col-sm-9">
              <input type="text" class="form-control" v-model="desc" disabled />
            </div>
          </div>
        </form>
      </div>
    </section>
  </b-modal>
</template>

<script>
export default {
  props: ["selectedPermission", "isDetail"],
  emits: ["hideDetail"],
  data() {
    return {
      name: "",
      desc: "",
    };
  },
  watch: {
    isDetail: function () {
      if (this.isDetail == true) {
        this.name = this.selectedPermission.name.toUpperCase();
        this.desc = this.selectedPermission.description
          ? this.selectedPermission.description.toUpperCase()
          : "-";
      }
    },
  },
  methods: {
    closePermission() {
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
