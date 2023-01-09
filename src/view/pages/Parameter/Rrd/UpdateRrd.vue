<template>
  <b-modal
    id="modal-edit-rrd"
    size="lg"
    title="Update RRD"
    ok-title="Simpan"
    @ok="editRrd"
    button-size="sm"
    ok-variant="success"
    ok-only
  >
    <section id="add-rrd">
      <div class="container">
        <div>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label"
              >NAMA RRD <span class="required-icon">*</span> :</label
            >
            <div class="col-sm-9">
              <input type="text" class="form-control" v-model="name" />
            </div>
          </div>
          <!-- <div class="mb-3 row">
            <label class="col-sm-3 col-form-label"
              >RRD IP <span class="required-icon">*</span> :</label
            >
            <div class="col-sm-9">
              <input type="text" class="form-control" v-model="ip_address" />
            </div>
          </div> -->
          <div class="mb-3 row align-items-center">
            <label class="col-sm-3 col-form-label"
              >IS ACTIVE <span class="required-icon">*</span> :</label
            >
            <div class="col-sm-9">
              <b-form-checkbox
                name="check-button"
                size="lg"
                switch
                v-model="is_active"
              >
                <div v-if="is_active">Active</div>
                <div v-else>Tidak Active</div>
              </b-form-checkbox>
            </div>
          </div>
        </div>
      </div>
    </section>
  </b-modal>
</template>

<script>
import Swal from "sweetalert2";
import ApiService from "@/core/services/api.service";

export default {
  props: ["isEdit", "rrdSelected"],
  emits: ["getDataRrd", "hideEdit"],
  data() {
    return {
      name: "",
      // ip_address: "",
      is_active: true,
    };
  },
  watch: {
    isEdit: function () {
      if (this.isEdit) {
        this.setDataRrd();
      }
    },
  },
  methods: {
    setDataRrd() {
      this.name = this.rrdSelected.name;
      // this.ip_address = this.rrdSelected.ip_address;
      this.is_active = this.rrdSelected.is_active == 1 ? true : false;
    },
    editRrd() {
      if (this.name == "" || this.ip_address == "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Form tidak boleh kosong!",
        });
        this.$emit("hideEdit");
      } else {
        let data = {
          name: this.name,
          // ip_address: this.ip_address,
          is_active: this.is_active == true ? 1 : 0,
        };
        ApiService.put(
          `${process.env.VUE_APP_ROOT_API_4}/rrd/${this.rrdSelected.id}`,
          data
        )
          .then(({ data }) => {
            if (data.code == 201 || data.code == 200) {
              Swal.fire({
                icon: "success",
                title: "Success...",
                text: "Anda berhasil mengubah data RRD.",
              });
              this.name = "";
              // this.ip_address = "";
              this.$emit("getDataRrd");
            }
          })
          .catch((e) => {
            console.log(e);
            if (e.response.status == 500) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Server sedang dalam perbaikan. Mohon menunggu beberapa saat lagi.",
              });
            }
          });
        this.$emit("hideEdit");
      }
    },
    closeEdit() {
      this.$emit("hideEdit");
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
