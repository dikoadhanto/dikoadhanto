<template>
  <b-modal
    id="modal-update-telegram"
    size="lg"
    title="Update Telegram Group"
    ok-title="Simpan"
    @ok="updateTelegram"
    button-size="sm"
    ok-variant="success"
    cancel-title="Batal"
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
            <label class="col-sm-3 col-form-label">DESKRIPSI :</label>
            <div class="col-sm-9">
              <input type="text" class="form-control" v-model="description" />
            </div>
          </div>
        </form>
      </div>
    </section>
  </b-modal>
</template>

<script>
import Swal from "sweetalert2";
import ApiService from "@/core/services/api.service.js";

export default {
  props: ["telegramSelected"],
  data() {
    return {
      name: "",
      description: "",
    };
  },
  methods: {
    setDataTelegram() {
      setTimeout(() => {
        this.name = this.telegramSelected.group_name;
        this.description = this.telegramSelected.description ?? "-";
      }, 500);
    },
    updateTelegram() {
      if (this.name == "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Group Name wajib diisi!",
        });
      } else {
        let data = {
          group_name: this.name,
          description: this.description,
        };
        ApiService.put(
          `${process.env.VUE_APP_ROOT_API_3}/telegram-groups/${this.telegramSelected.uuid}`,
          data
        )
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Berhasil...",
              text: "Telegram Group berhasil diupdate",
            });
            setTimeout(() => {
              this.$parent.getData();
            }, 500);
          })
          .catch((e) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Sepertinya ada kesalahan di sistem kami. Coba lagi nanti",
            });
            console.log(e);
            this.$parent.getData();
          });
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
