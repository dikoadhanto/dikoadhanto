<template>
  <b-modal
    ref="add-user"
    id="add-user"
    title="Tambah Users"
    size="lg"
    scrollable
    hide-footer
    centered
    @close="closeModal"
    @cancel="closeModal"
  >
    <form @submit.prevent="submitForm">
      <div class="card">
        <b-row align-v="center" class="m-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">
              OTENTIKASI&nbsp;<span class="required"></span>&nbsp;:
            </h6>
          </b-col>
          <b-col cols="9">
            <label class="m-0">
              <input
                type="radio"
                :value="1"
                v-model="isLdap"
                @click="hidePass = true"
              />
              <span
                class="font-weight-bold ml-2 mr-5"
                align-self="center"
                style="font-size: 14px"
                >LDAP</span
              >
            </label>
            <label class="m-0">
              <input
                type="radio"
                :value="0"
                v-model="isLdap"
                @click="hidePass = false"
              />
              <span
                class="font-weight-bold ml-2"
                align-self="center"
                style="font-size: 14px"
                >LOCAL</span
              >
            </label>
          </b-col>
        </b-row>

        <b-row align-v="center" class="mx-5 mb-5 mt-1" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">ACTIVE STATUS :</h6>
          </b-col>
          <div class="col-9">
            <span class="switch switch-sm switch-icon" v-if="is_active">
              <label class="m-0">
                <input type="checkbox" name="" v-model="is_active" />
                <span></span>
              </label>
            </span>
            <span class="switch switch-sm switch-icon" v-else>
              <label class="m-0">
                <input type="checkbox" name="select" v-model="is_active" />
                <span></span>
              </label>
            </span>
          </div>
        </b-row>

        <b-row align-v="center" class="mx-5 mb-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">
              USERNAME&nbsp;<span class="required"></span>&nbsp;:
            </h6>
          </b-col>
          <b-col cols="9">
            <input
              type="text"
              class="form-control form-control-solid"
              v-model="username"
              @change="hidePass == true ? checkEmail($event) : ''"
            />
          </b-col>
        </b-row>
        <b-row align-v="center" class="mx-5 mb-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">PICTURE :</h6>
          </b-col>
          <b-col cols="9">
            <div>
              <div
                class="imagePreviewWrapper"
                :style="{ 'background-image': `url(${viewImage})` }"
                @click="selectImage"
              ></div>

              <input
                ref="fileInput"
                accept=".jpg,.jpeg,.png"
                type="file"
                @input="pickFile"
              />
              <div class="text-small text-danger">Ukuran maks. 500kb</div>
            </div>
          </b-col>
        </b-row>
      </div>

      <div class="card mt-7">
        <b-row align-v="center" class="m-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">NAMA&nbsp;<span class="required"></span>&nbsp;:</h6>
          </b-col>
          <b-col cols="9">
            <input
              type="text"
              class="form-control form-control-solid"
              v-model="name"
            />
          </b-col>
        </b-row>

        <b-row align-v="center" class="mx-5 mb-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">ROLE&nbsp;<span class="required"></span>&nbsp;:</h6>
          </b-col>
          <b-col cols="9">
            <treeselect
              :options="dataRole"
              v-model="selectedRoleId"
              placeholder="Pilih role..."
              :multiple="true"
              :normalizer="normalizerRole"
              @input="checkPic"
            >
            </treeselect>
          </b-col>
        </b-row>

        <b-row align-v="center" class="mx-5 mb-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">
              ORGANISASI&nbsp;<span class="required"></span>&nbsp;:
            </h6>
          </b-col>
          <b-col cols="9">
            <treeselect
              v-model="organisasi"
              :options="listOrganization"
              placeholder="Pilih organisasi..."
              :normalizer="normalizer"
              noChildrenText="Tidak ada data selanjutnya"
              noOptionsText="Data belum ada"
              @select="getIdOrganization"
            />
          </b-col>
        </b-row>

        <b-row align-v="center" class="mx-5 mb-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">
              NOMOR PONSEL&nbsp;<span class="required"></span>&nbsp;:
            </h6>
          </b-col>
          <b-col cols="9">
            <input
              type="text"
              class="form-control form-control-solid"
              v-model="phoneNumber"
            />
          </b-col>
        </b-row>

        <b-row align-v="center" class="mx-5 mb-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">
              EMAIL&nbsp;<span class="required"></span>&nbsp;:
            </h6>
          </b-col>
          <b-col cols="9">
            <input
              type="email"
              class="form-control form-control-solid"
              v-model="email"
            />
          </b-col>
        </b-row>

        <b-row
          align-v="center"
          class="mx-5 mb-5"
          no-gutters
          v-if="hidePass == false"
        >
          <b-col cols="3">
            <h6 class="m-0">PASSWORD :</h6>
          </b-col>
          <b-col cols="9">
            <input
              type="password"
              class="form-control form-control-solid"
              v-model="password"
            />
          </b-col>
        </b-row>

        <b-row
          align-v="center"
          class="mx-5 mb-5"
          no-gutters
          v-if="hidePass == false"
        >
          <b-col cols="3">
            <h6 class="m-0">RE-TYPE PASSWORD :</h6>
          </b-col>
          <b-col cols="9">
            <input
              type="password"
              class="form-control form-control-solid"
              v-model="cPassword"
            />
          </b-col>
        </b-row>

        <b-row align-v="center" class="mx-5 mb-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">TELEGRAM ID :</h6>
          </b-col>
          <b-col cols="9">
            <input
              type="text"
              class="form-control form-control-solid"
              v-model="telegramId"
            />
          </b-col>
        </b-row>

        <b-row align-v="center" class="mx-5 mb-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">TELEGRAM USERNAME :</h6>
          </b-col>
          <b-col cols="9">
            <input
              type="text"
              class="form-control form-control-solid"
              v-model="telegramUname"
            />
          </b-col>
        </b-row>
      </div>

      <b-row align-v="center" class="m-5">
        <b-col cols="auto" class="ml-auto">
          <button type="submit" class="btn btn-sm btn-success mt-5">
            SIMPAN &nbsp;
            <span><i class="fas fa-chevron-right icon-sm"></i></span>
          </button>
        </b-col>
      </b-row>
    </form>
  </b-modal>
</template>

<script>
// import ApiService from "@/core/services/api.service";
import axios from "axios";
import Swal from "sweetalert2";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  props: ["isAdd"],
  emits: ["closeAdd", "getUser"],
  components: {
    Treeselect,
  },
  data() {
    return {
      valueRole: [],
      dataRole: [],
      selectedRoleId: [],
      picRole: [],
      countRolePic: 0,
      mappingRolePic: [],
      username: "",
      // ldap = 1,local = 0
      isLdap: null,
      // true/aktif = 1, false/non-aktif = 0
      is_active: false,
      name: "",
      role: [],
      organisasi: null,
      phoneNumber: "",
      email: "",
      password: "",
      cPassword: "",
      telegramId: null,
      telegramUname: null,
      options: [
        { value: "1", name: "LDAP" },
        { value: "0", name: "Local" },
      ],
      roleOptions: [],
      listOrganization: [],
      normalizer(node) {
        return {
          label: node.name,
          children: node.organizations,
        };
      },
      normalizerRole(node) {
        return {
          label: node.title,
        };
      },
      hidePass: false,
      previewImage: null,
      viewImage: "/media/users/blank.png",
      isPic: false,
    };
  },
  watch: {
    isAdd(val) {
      if (val == true) {
        this.getRole();
        this.getOrganization();
      }
    },
  },
  methods: {
    selectImage() {
      this.$refs.fileInput.click();
    },
    pickFile() {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          if (file[0].size > 500000) {
            Swal.fire({
              title: "Oops..",
              text: "Ukuran file terlalu besar",
              icon: "error",
            });
          } else {
            this.viewImage = e.target.result;
            this.previewImage = file[0];
          }
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
      }
    },
    async getRole() {
      try {
        let { data } = await axios({
          url: `${process.env.VUE_APP_ROOT_API_3}/roles`,
          method: "GET",
        });
        this.dataRole = data.result.roles;
      } catch (error) {
        console.log(error);
      }
    },
    checkRole(pic) {
      let i = 0;
      for (i in this.dataRole) {
        if (this.dataRole[i].indexOf(pic) != -1) {
          ("betul ini pic");
        } else {
          ("ini bukan pic");
        }
      }
    },
    checkPic() {
      const roleTitles = [];
      this.dataRole.forEach((item) => {
        if (this.selectedRoleId.includes(item.id)) {
          roleTitles.push(item.title);
        }
      });

      return roleTitles.filter((title) => title.includes("PIC")).length > 0;
    },
    async getOrganization() {
      try {
        let { data } = await axios({
          url: `${process.env.VUE_APP_ROOT_API_3}/organizations/hierarchy`,
          method: "GET",
        });
        let dataOrg = data.result.organizations;
        this.listOrganization = dataOrg;
      } catch (error) {
        console.log(error);
      }
    },
    getIdOrganization(node) {
      this.idSelected = node;
    },
    checkEmail(event) {
      this.email = event.target.value + "@telkom.co.id";
    },
    checkRoleName(e) {
      console.log(e.response);
    },
    submitForm() {
      this.checkPic();
      if (this.isLdap === "" || this.isLdap === null) {
        return this.showModalError("Pilih salah satu otentikasi");
      }

      if (this.username === "" || this.username === null) {
        return this.showModalError("Username tidak boleh kosong");
      }

      if (this.name === "" || this.name === null) {
        return this.showModalError("Nama tidak boleh kosong");
      }

      if (this.phoneNumber === "" || this.phoneNumber === null) {
        return this.showModalError("Nomor telepon tidak boleh kosong");
      }

      if (this.email === "" || this.email === null) {
        return this.showModalError("Email tidak boleh kosong");
      }

      if (this.password == "" && this.isLdap == 0) {
        return this.showModalError("Password tidak boleh kosong");
      }

      if (this.cPassword == "" && this.isLdap == 0) {
        return this.showModalError("Konfirmasi password tidak boleh kosong");
      }

      const differentPassword = this.password != this.cPassword;

      if (differentPassword && this.isLdap == 0) {
        return this.showModalError(
          "Password dan konfirmasi password harus sama!"
        );
      }

      if (this.previewImage == null && this.checkPic()) {
        return this.showModalError("Foto tidak boleh kosong");
      }

      if (this.selectedRoleId === "" || this.selectedRoleId === null) {
        return this.showModalError("Role tidak boleh kosong");
      }
      this.justUpload();
    },
    justUpload() {
      const fd = new FormData();
      fd.append("is_ldap", this.isLdap);
      fd.append("is_active", this.is_active ? "1" : "0");
      fd.append("username", this.username);
      fd.append("name", this.name);
      if (this.previewImage !== "" || this.previewImage !== null) {
        fd.append("foto", this.previewImage);
      }
      fd.append("roles", "");
      for (let roleId of this.selectedRoleId) {
        fd.append("roles", roleId);
      }
      fd.append("id_organization", this.idSelected.id);
      fd.append("phone_number", this.phoneNumber);
      fd.append("email", this.email);
      if (this.isLdap == 0) {
        fd.append("password", this.password);
      }
      if (this.telegramId != null) {
        fd.append("telegram_id", this.telegramId);
      }
      if (this.telegramUname != null) {
        fd.append("telegram_username", this.telegramUname);
      }
      fd.append("is_email_verified", 1);
      this.$bvModal.show("modalLoading");
      axios({
        url: `${process.env.VUE_APP_ROOT_API_1}/administrative/users/add`,
        method: "POST",
        headers: {
          token: localStorage.getItem("id_token"),
          "Content-Type": "multipart/form-data; boundary=$(fd._boundary)",
        },
        data: fd,
      })
        .then(({ data }) => {
          if (data.code == 201) {
            this.$bvModal.hide("modalLoading");
            Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "Data berhasil ditambahkan",
            }).then((result) => {
              if (result.isConfirmed || result.isDismissed) {
                this.$emit("closeAdd");
                this.$bvModal.hide("add-user");
                this.$emit("getUser");
                this.isLdap = "";
                this.is_active = "";
                this.username = "";
                this.name = "";
                this.roles = [];
                this.role = [];
                this.previewImage = null;
                this.selectedRoleId = [];
                this.organisasi = null;
                this.phoneNumber = "";
                this.organisasi = null;
                this.idSelected = "";
                this.dataRole = [];
                this.viewImage = "/media/users/blank.png";
                this.email = "";
                this.password = "";
                this.cPassword = "";
                this.telegramId = null;
                this.telegramUname = null;
              }
            });
          } else if (data.code == 409) {
            this.$bvModal.hide("modalLoading");
            this.showModalError("Anda tidak berhak menambahkan data user");
          } else if (data.code == 500) {
            this.$bvModal.hide("modalLoading");
            this.showModalError(
              "Server sedang dalam perbaikan, silahkan coba beberapa saat lagi"
            );
          }
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response.data.message == "Only images are allowed") {
            this.$bvModal.hide("modalLoading");
            this.showModalError("Hanya file gambar JPG/PNG yang diperbolehkan");
          } else if (
            error.response.data.message ==
            "Username or email already exists, please use different data"
          ) {
            this.$bvModal.hide("modalLoading");
            this.showModalError(error.response.data.message);
          } else if (error.response.statusText == "Request Entity Too Large") {
            this.$bvModal.hide("modalLoading");
            this.showModalError(
              "Ukuran file gambar tidak boleh lebih dari 500kb"
            );
          }
        });
    },
    showModalError(message) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
      });
    },
    closeModal() {
      this.$emit("closeAdd");
    },
  },
};
</script>

<style scoped>
/* mandatory symbol */
.required:after {
  content: "*";
  color: red;
}

/* placeholder select form */
select.empty {
  color: gray;
}

.imagePreviewWrapper {
  width: 150px;
  height: 150px;
  display: block;
  cursor: pointer;
  margin: 0 0 20px 0;
  background-size: cover;
  background-position: center center;
}
</style>
