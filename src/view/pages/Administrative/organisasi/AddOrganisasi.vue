<template>
  <b-modal
    id="modal-add-organisasi"
    size="lg"
    title="Tambah Organisasi"
    ok-title="Simpan"
    @ok="addOrganization"
    button-size="sm"
    ok-variant="success"
    ok-only
    @close="closeAdd"
  >
    <section id="add-organisasi">
      <div class="container">
        <form>
          <!-- parent organisasi -->
          <div class="card p-4 mb-10">
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label">PARENT ORGANISASI :</label>
              <div class="col-sm-9">
                <input
                  type="text"
                  class="form-control"
                  disabled
                  :value="organizationSelected.name"
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label"
                >NAMA ORGANISASI <span class="required-icon">*</span> :</label
              >
              <div class="col-sm-9">
                <input type="text" class="form-control" v-model="name" />
              </div>
            </div>
          </div>
          <!-- pic, lokasi and address -->
          <div class="card p-4">
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label">NAMA PIC :</label>
              <div class="col-sm-9">
                <!-- <b-form-select class="form-control" v-model="pic">
                  <option disabled value="">Pilih Nama PIC</option>
                  <option
                    v-for="(userPic, i) in dataUserPic"
                    :key="i"
                    :value="userPic.users_id"
                  >
                    {{ userPic.name }}
                  </option>
                </b-form-select> -->
                <treeselect
                  v-model="pic"
                  :options="dataUserPic"
                  placeholder="Pilih Nama PIC"
                  openDirection="bottom"
                  :normalizer="normalizer"
                  noOptionsText="Tunggu sebentar..."
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label"
                >LOKASI <span class="required-icon">*</span> :</label
              >
              <div class="col-sm-9">
                <input type="text" class="form-control" v-model="sname" />
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label">ALAMAT :</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" v-model="address" />
              </div>
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
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import ApiService from "@/core/services/api.service.js";

export default {
  props: ["organizationSelected", "isAdd"],
  emits: ["getAllDataOrganization", "hideAdd"],
  components: {
    Treeselect,
  },
  data() {
    return {
      pic: null,
      name: "",
      sname: "",
      address: "",
      dataUserPic: [],
      normalizer(node) {
        return {
          id: node.users_id,
          label: node.name,
        };
      },
    };
  },
  watch: {
    isAdd: function () {
      if (this.isAdd == true) {
        this.getDataUser();
      }
    },
  },
  methods: {
    addOrganization() {
      if (this.name == "" || this.name == null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Anda harus mengisi nama organisasi!",
        });
      } else {
        if (this.sname == "" || this.sname == null) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Anda harus mengisi lokasi organisasi!",
          });
        } else {
          let dataOrganization = {
            parentId: this.organizationSelected.id,
            name: this.name,
            sname: this.sname,
            level: parseInt(this.organizationSelected.level) + 1,
            address: this.address,
            pic: this.pic,
          };
          ApiService.post(
            `${process.env.VUE_APP_ROOT_API_3}/organizations`,
            dataOrganization
          )
            .then(({ data }) => {
              if (data.code == 201) {
                Swal.fire({
                  icon: "success",
                  title: "Berhasil",
                  text: `Anda berhasil menambahkan organisasi ${this.name}.`,
                });
                this.name = "";
                this.sname = "";
                this.pic = null;
                this.address = "";
                this.$emit("hideAdd");
                this.$emit("getAllDataOrganization");
              }
            })
            .catch((e) => {
              if (e.response.status == 409) {
                Swal.fire({
                  icon: "error",
                  title: "Oops..",
                  text: "Anda tidak berhak mengubah organisasi ini!",
                });
                this.name = "";
                this.sname = "";
                this.pic = null;
                this.address = "";
              } else if (e.response.status == 500) {
                Swal.fire({
                  icon: "error",
                  title: "Maaf..",
                  text: "Server sedang dalam perbaikan, silahkan coba beberapa saat lagi!",
                });
                this.name = "";
                this.sname = "";
                this.pic = null;
                this.address = "";
              }
              console.log(e.response);
            });
        }
      }
    },
    getDataUser() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_1,
        "administrative/users"
      ).then(({ data }) => {
        this.dataUserPic = data.result.payload;
      });
    },
    closeAdd() {
      this.name = "";
      this.sname = "";
      this.pic = null;
      this.address = "";
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
