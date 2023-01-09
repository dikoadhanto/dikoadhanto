/* eslint-disable no-unreachable */
<template>
  <b-modal
    id="edit-user"
    title="Update Users"
    size="lg"
    scrollable
    hide-footer
    centered
    @close="closeUpdate"
    @hide="closeUpdate"
  >
    <form @submit.prevent="updateOneUser">
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
                @click="hidePass = false"
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
                label="Local"
                v-model="isLdap"
                @click="hidePass = true"
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
          <b-col class="col-9">
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
          </b-col>
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
              @change="hidePass == false ? checkEmail($event) : ''"
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

        <b-row align-v="center" class="mx-5 mb-5" no-gutters v-if="hidePass">
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

        <b-row align-v="center" class="mx-5 mb-5" no-gutters v-if="hidePass">
          <b-col cols="3">
            <h6 class="m-0">RE-TYPE PASSWORD :</h6>
          </b-col>
          <b-col cols="9">
            <input
              type="password"
              class="form-control form-control-solid"
              v-model="confirmPassword"
            />
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
              placeholder="-- Pilih organisasi --"
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

        <b-row align-v="start" class="mx-5 mb-5" no-gutters>
          <b-col cols="3" align-self="center">
            <h6 class="m-0">
              EMAIL&nbsp;<span class="required"></span>&nbsp;:
            </h6>
          </b-col>
          <b-col cols="7">
            <input
              type="email"
              class="form-control form-control-solid"
              v-model="email"
            />
            <div class="text-small text-danger">
              Untuk update email silahkan klik tombol "Update Email"
            </div>
          </b-col>
          <b-col cols="2" class="d-flex justify-content-end">
            <b-button variant="success" @click="updateEmail"
              >Update Email</b-button
            >
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
            Simpan &nbsp;
            <span><i class="fas fa-chevron-right icon-sm"></i></span>
          </button>
        </b-col>
      </b-row>
    </form>
  </b-modal>
</template>

<script>
import ApiService from "@/core/services/api.service";
import axios from "axios";
import Swal from "sweetalert2";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
// import rolePermission from "@/core/helpers/rolePermission";

export default {
  components: {
    Treeselect,
  },
  props: ["userSelected", "getAllUser", "isUpdate"],
  emits: ["hideUpdate"],
  data() {
    return {
      selectedRoleId: [],
      dataRole: [],
      picRole: [],
      countRolePic: 0,
      username: "",
      // ldap = 1, local = 0
      isLdap: "",
      is_active: false,
      name: "",
      organisasi: "",
      phoneNumber: "",
      email: "",
      password: null,
      confirmPassword: null,
      telegramId: 0,
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
          label: node.title == null ? "" : node.title,
        };
      },
      previewImage: null,
      viewImage: "",
      listPerrmission: [],
      hidePass: false,
    };
  },
  watch: {
    // userSelected: function () {
    //   if (this.userSelected !== null) {
    //     this.getOneUser();
    //   }
    // },
    isUpdate: function () {
      if (this.isUpdate == true) {
        this.selectedRoleId = [];
        this.dataRole = [];
        this.roleOptions = [];
        this.listOrganization = [];
        this.listPermission = [];
        this.getOneUser();
        this.getRole();
        this.getOrganization();
        this.getIdOrganization();
      }
    },
  },
  // mounted() {
  //   this.getRole();
  //   this.getOrganization();
  // },
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
              icon: "error",
              title: "Oops...",
              text: "Ukuran gambar tidak boleh lebih dari 500kb",
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
    async getOneUser() {
      await ApiService.get(
        process.env.VUE_APP_ROOT_API_1,
        `administrative/users/${this.userSelected}`
      )
        .then(({ data }) => {
          this.listPermission = data.auth.permissions;
          this.isLdap = data.result.is_ldap;
          if (this.isLdap == 0) {
            this.hidePass = true;
          } else {
            this.hidePass = false;
          }
          this.is_active = data.result.is_active == "1" ? true : false;
          this.username = data.result.username;
          this.viewImage =
            data.result.profile_picture === "null" ||
            data.result.profile_picture === null ||
            data.result.profile_picture === ""
              ? "/media/users/blank.png"
              : process.env.VUE_APP_ROOT_API_1 +
                "-" +
                data.result.profile_picture;
          this.name = data.result.name;
          this.selectedRoleId = this.getDataRoles(data.result.roles);
          this.organisasi = data.result.organization.id;
          this.phoneNumber =
            data.result.phone_number === "null" ||
            data.result.phone_number === null
              ? ""
              : data.result.phone_number;
          this.email =
            data.result.email === "null" || data.result.email === null
              ? ""
              : data.result.email;
          this.telegramId =
            data.result.telegram_id === "null" ||
            data.result.telegram_id === null
              ? null
              : data.result.telegram_id;
          this.telegramUname =
            data.result.telegram_username === "null" ||
            data.result.telegram_username === null
              ? null
              : data.result.telegram_username;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getDataRoles(roles) {
      let idRoles = [];
      roles.forEach((item) => {
        idRoles.push(item.id);
      });
      return idRoles;
    },
    async getRole() {
      try {
        let { data } = await axios({
          url: `${process.env.VUE_APP_ROOT_API_3}/roles`,
          method: "GET",
        });
        let listRole = data.result.roles;
        listRole.forEach((item) => {
          this.dataRole.push({
            id: item.id,
            title: item.title,
          });
        });
      } catch (error) {
        console.log(error);
      }
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
    checkPic() {
      const roleTitles = [];
      this.dataRole.forEach((item) => {
        if (this.selectedRoleId.includes(item.id)) {
          roleTitles.push(item.title);
        }
      });

      return roleTitles.filter((title) => title.includes("PIC")).length > 0;
    },
    updateEmail() {
      let data = {
        email: this.email,
      };
      ApiService.patch(
        `${process.env.VUE_APP_ROOT_API_1}/administrative/users/changemail/${this.userSelected}`,
        data
      )
        .then(({ data }) => {
          if (data.code == 200) {
            Swal.fire({
              title: "Success",
              text: "Email has been updated",
              icon: "success",
              confirmButtonText: "Ok",
            });
          }
        })
        .catch((error) => {
          console.log(error.response);
          this.showModalError(error.response.data.message);
        });
    },
    updateOneUser() {
      if (this.isLdap === "" || this.isLdap === null) {
        return this.showModalError("Pilih salah satu otentikasi");
      }

      if (this.username === "" || this.username === null) {
        return this.showModalError("Username tidak boleh kosong");
      }

      if (this.viewImage == "/media/users/blank.png" && this.checkPic()) {
        return this.showModalError("Foto tidak boleh kosong");
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

      const differentPassword = this.password != this.confirmPassword;

      if (differentPassword && this.isLdap == 0) {
        return this.showModalError(
          "Password dan konfirmasi password harus sama!"
        );
      }

      if (this.selectedRoleId === "" || this.selectedRoleId === null) {
        return this.showModalError("Role tidak boleh kosong");
      }

      this.checkIsLdap();

      const fd = new FormData();
      // eslint-disable-next-line no-unused-vars
      const blob = new Blob([this.previewImage], { type: "text/xml" });
      fd.append("is_ldap", this.isLdap);
      fd.append("is_active", this.is_active ? "1" : "0");
      fd.append("username", this.username);
      fd.append("name", this.name);
      if (this.previewImage != "") {
        fd.append("foto", this.previewImage);
      }
      fd.append("roles", "");
      for (let roleId of this.selectedRoleId) {
        fd.append("roles", roleId);
      }
      fd.append("id_organization", this.organisasi);
      fd.append("phone_number", this.phoneNumber);
      if (this.password !== null && this.password !== "") {
        fd.append("password", this.password);
      }
      if (this.telegramId !== null && this.telegramId !== "") {
        fd.append("telegram_id", this.telegramId);
      } else {
        fd.append("telegram_id", (this.telegramId = null));
      }
      if (this.telegramUname !== null && this.telegramUname !== "") {
        fd.append("telegram_username", this.telegramUname);
      } else {
        fd.append("telegram_username", (this.telegramUname = null));
      }
      this.$bvModal.show("modalLoading");
      axios({
        url: `${process.env.VUE_APP_ROOT_API_1}/administrative/users/update/${this.userSelected}`,
        method: "PATCH",
        headers: {
          token: localStorage.getItem("id_token"),
          "Content-Type": "multipart/form-data; boundary=${fd._boundary}",
        },
        data: fd,
      })
        .then(({ data }) => {
          if (data.code == 200) {
            this.$bvModal.hide("modalLoading");
            Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "Data berhasil diubah",
            }).then((result) => {
              if (result.isConfirmed) {
                this.setDefaultData();
                this.$bvModal.hide("edit-user");
                this.$emit("success");
              }
            });
          } else if (data.code == 409) {
            this.$bvModal.hide("modalLoading");
            this.showModalError("Anda tidak dapat mengubah data user ini");
          } else if (data.code == 500) {
            this.$bvModal.hide("modalLoading");
            this.showModalError(
              "Server sedang dalam perbaikan, silahkan coba beberapa saat lagi"
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    checkIsLdap() {
      if (this.isLdap == 1) {
        this.password = "";
        this.confirmPassword = "";
      }
    },
    setDefaultData() {
      this.isLdap = "";
      this.is_active = false;
      this.username = "";
      this.viewImage = "";
      this.name = "";
      this.password = null;
      this.confirmPassword = null;
      this.selectedRoleId = [];
      this.organisasi = "";
      this.phoneNumber = "";
      this.email = "";
      this.telegramId = null;
      this.telegramUname = null;
    },
    showModalError(message) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
      });
    },
    closeUpdate() {
      this.$emit("hideUpdate");
    },
  },
};
</script>

<style scoped>
.vue-treeselect__control {
  background-color: black !important;
}

.vue-treeselect__menu {
  background-color: green !important;
}

/* mandatory symbol */
.required:after {
  content: "*";
  color: red;
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

/* switch icon */
.switch input:empty ~ span:before {
  background-color: #afb2c7;
}
</style>
