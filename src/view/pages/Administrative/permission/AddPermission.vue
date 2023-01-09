<template>
  <b-modal
    id="modal-add-permission"
    size="lg"
    title="Tambah Permission"
    ok-title="Simpan"
    @ok="addPermission"
    button-size="sm"
    ok-variant="success"
    @close="closePermission"
    ok-only
  >
    <section id="add-permission">
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
  props: ["selectedPermission"],
  emits: ["hideAdd", "getDataPermissions"],
  data() {
    return {
      name: "",
      desc: "",
    };
  },
  methods: {
    addPermission() {
      if (this.name == "") {
        Swal.fire({
          icon: "error",
          title: "Oops",
          text: "Maaf, nama permission harus diisi.",
        });
        this.$emit("hideAdd");
      } else {
        // data send to post
        let dataPermission = {
          permissions: [
            {
              name: this.name,
              description: this.desc,
              parent_id:
                this.selectedPermission.length > 0
                  ? this.selectedPermission[0].id
                  : null,
            },
          ],
        };

        // call api
        ApiService.post(
          `${process.env.VUE_APP_ROOT_API_3}/permissions`,
          dataPermission
        )
          .then(({ data }) => {
            if (data.code == 201) {
              Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Anda berhasil menambahkan permission.",
              });
              this.name = "";
              this.desc = "";
              this.$emit("getDataPermissions");
              this.$emit("hideAdd");
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
              this.$emit("hideAdd");
            } else if (e.response.status == 500) {
              Swal.fire({
                icon: "error",
                title: "Oops",
                text: "Maaf, server sedang dalam perbaikan. Silahkan coba beberapa saat lagi.",
              });
              this.name = "";
              this.desc = "";
              this.$emit("hideAdd");
            }
          });
      }
    },
    closePermission() {
      this.$emit("hideAdd");
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
