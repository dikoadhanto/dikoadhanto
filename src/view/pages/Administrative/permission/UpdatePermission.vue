<template>
  <b-modal
    id="modal-update-permission"
    size="lg"
    title="Update Permission"
    ok-title="Simpan"
    @ok="updatePermission"
    button-size="sm"
    ok-variant="success"
    @close="closePermission"
    ok-only
  >
    <section id="update-permission">
      <div class="container">
        <form>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label"
              >PERMISSION NAME <span class="required-icon">*</span> :</label
            >
            <div class="col-sm-9">
              <input type="text" class="form-control" v-model="name" />
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label">DESKRIPSI :</label>
            <div class="col-sm-9">
              <input type="text" class="form-control" v-model="desc" />
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
  props: ["selectedPermission", "isUpdate"],
  emits: ["hideUpdate", "getDataPermissions"],
  data() {
    return {
      name: "",
      desc: "",
    };
  },
  watch: {
    isUpdate: function () {
      if (this.isUpdate == true) {
        this.name = this.selectedPermission.name;
        this.desc = this.selectedPermission.description;
      }
    },
  },
  methods: {
    updatePermission() {
      if (this.name == "") {
        Swal.fire({
          icon: "error",
          title: "Oops",
          text: "Maaf, nama permission harus diisi.",
        });
        this.$emit("hideUpdate");
      } else {
        // data send to post
        let dataPermission = {
          name: this.name,
          description: this.desc,
        };

        // call api
        let permId = this.selectedPermission.id;
        ApiService.put(
          `${process.env.VUE_APP_ROOT_API_3}/permissions/${permId}`,
          dataPermission
        )
          .then(({ data }) => {
            if (data.code == 200) {
              Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Anda berhasil mengubah permission.",
              });
              this.name = "";
              this.desc = "";
              this.$emit("getDataPermissions");
              this.$emit("hideUpdate");
            }
          })
          .catch((e) => {
            if (e.response.status == 400) {
              Swal.fire({
                icon: "error",
                title: "Oops",
                text: "Maaf, sepertinya ada kesalahan pada pengisian data.",
              });
              this.name = "";
              this.desc = "";
              this.$emit("hideUpdate");
            } else if (e.response.status == 500) {
              Swal.fire({
                icon: "error",
                title: "Oops",
                text: "Maaf, server sedang dalam perbaikan. Silahkan coba beberapa saat lagi.",
              });
              this.name = "";
              this.desc = "";
              this.$emit("hideUpdate");
            }
          });
      }
    },
    closePermission() {
      this.$emit("hideUpdate");
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
