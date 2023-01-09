<template>
  <b-modal
    id="modal-add-telegram"
    size="lg"
    title="Tambah Telegram Group"
    ok-title="Simpan"
    @ok="addTelegram"
    button-size="sm"
    ok-variant="success"
    ok-only
  >
    <section id="add-telegram">
      <div class="container">
        <form>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label"
              >GROUP NAME <span class="required-icon">*</span> :</label
            >
            <div class="col-sm-9">
              <input type="text" class="form-control" v-model="name" />
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label"
              >GROUP ID <span class="required-icon">*</span> :</label
            >
            <div class="col-sm-9">
              <input type="text" class="form-control" v-model="id" />
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label">DESKRIPSI :</label>
            <div class="col-sm-9">
              <input type="text" class="form-control" v-model="deskripsi" />
            </div>
          </div>
        </form>
      </div>
    </section>
  </b-modal>
</template>

<script>
import Swal from "sweetalert2";

export default {
  props: ["isAdd"],
  emits: ["hideAdd"],
  data() {
    return {
      name: "",
      id: "",
      deskripsi: "",
    };
  },
  methods: {
    addTelegram() {
      if (this.name == "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "GROUP Name wajib diisi",
        });
      } else {
        if (this.id == "") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "GROUP ID wajib diisi",
          });
        }
      }
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
