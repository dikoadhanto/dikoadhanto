<template>
  <section id="login-page">
    <div class="row">
      <SideImage />
      <div class="form-login col-md-5">
        <div class="container mx-12">
          <div class="form-title">Daftar Sekarang</div>
          <div class="form-subtitle mb-8">
            Sudah punya akun?
            <span
              ><router-link class="span-login" to="/login"
                >Login disini</router-link
              ></span
            >
          </div>
          <form>
            <div class="mb-5 radio-label">
              <div class="form-radio mr-5">
                <input
                  type="radio"
                  :value="1"
                  v-model="isLdap"
                  id="ldap"
                  class="cursor-pointer"
                />
                <label class="form-check-label ml-1 cursor-pointer" for="ldap"
                  >LDAP</label
                >
              </div>
              <div class="form-radio">
                <input
                  type="radio"
                  :value="0"
                  v-model="isLdap"
                  id="local"
                  class="cursor-pointer"
                />
                <label class="form-check-label ml-1 cursor-pointer" for="local"
                  >Local</label
                >
              </div>
            </div>
            <div class="mb-5">
              <label class="form-label">Organization</label>
              <treeselect
                v-model="organization"
                :options="dataOrganizations"
                placeholder="Pilih organisasi..."
                :alwaysOpen="false"
                :normalizer="normalizer"
                noChildrenText="Tidak ada data selanjutnya"
                noOptionsText="Data belum ada"
              />
            </div>
            <div class="mb-5">
              <label class="form-label">Name</label>
              <input type="text" class="form-control" v-model="name" />
            </div>
            <div class="mb-5">
              <label class="form-label">Username/NIK</label>
              <input type="text" class="form-control" v-model="username" />
            </div>
            <div class="mb-5">
              <label class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                v-model="email"
                @keyup="checkEmail"
              />
              <div class="text-danger text-sm" v-if="error.email">
                Harap isi email dengan benar!
              </div>
            </div>
            <div class="mb-5" v-if="isLdap !== 1">
              <label class="form-label">Password</label>
              <div class="input-group">
                <input
                  :type="seePassword ? 'type' : 'password'"
                  class="form-control"
                  v-model="password"
                />
                <span
                  class="input-group-text border-0"
                  @click="seePassword = !seePassword"
                >
                  <span v-if="seePassword">
                    <i class="fas fa fa-sm fa-eye-slash"></i>
                  </span>
                  <span v-else>
                    <i class="fas fa fa-sm fa-eye"></i>
                  </span>
                </span>
              </div>
              <small>
                Password minimal 12 karakter, terdiri dari angka, simbol, huruf
                besar, huruf kecil dan tidak terdapat spasi!
              </small>
            </div>
            <div class="mb-5">
              <label class="form-label">Role</label>
              <treeselect
                v-model="role"
                :options="dataRoles"
                placeholder="Pilih role..."
                :alwaysOpen="false"
                openDirection="bottom"
                noOptionsText="Data belum ada"
                :maxHeight="150"
              />
            </div>
            <!-- <vue-recaptcha
              :sitekey="site_key"
              @verify="verifyMethod"
              @expired="expiredMethod"
              @error="errorMethod"
            ></vue-recaptcha>
            <div class="text-center mt-4" v-if="showButtonSubmit">
              <div class="btn btn-dark" @click="signUpUser">Sign Up</div>
            </div> -->
            <div class="row align-items-center">
              <div class="col-md-8 col-sm-12 mb-2">
                <vue-recaptcha
                  size="sm"
                  :sitekey="site_key"
                  @verify="verifyMethod"
                  @expired="expiredMethod"
                  @error="errorMethod"
                ></vue-recaptcha>
              </div>
              <div class="col-md-4 col-sm-12">
                <div class="text-center" v-if="showButtonSubmit">
                  <div class="btn btn-dark" @click="signUpUser">Sign Up</div>
                </div>
              </div>
            </div>
          </form>
          <div class="text-info-bottom mt-10">
            Copyright &copy; 2013-2021 Divisi Service Operation. All Rights
            Reserved.
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Swal from "sweetalert2";
import { VueRecaptcha } from "vue-recaptcha";
import SideImage from "./component/SideImage.vue";
import ApiService from "@/core/services/api.service.js";

// tree select
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  components: {
    SideImage,
    Treeselect,
    VueRecaptcha,
  },
  data() {
    return {
      showButtonSubmit: false,
      site_key: "6LfURg4iAAAAAAgfOxbs6Fbur4B9ZxMvIN4LgsuD",
      site_key2: "6LdbFg4iAAAAAPpXnX4E1yv8fJrTf6NssO31Jc1k",
      isLdap: null,
      organization: null,
      name: "",
      username: "",
      email: "",
      password: "",
      role: null,
      seePassword: false,

      dataRoles: [],
      dataOrganizations: [],

      // normalizer tree select
      normalizer(node) {
        return {
          label: node.name,
          children: node.organizations,
        };
      },

      error: {
        email: false,
      },
    };
  },
  mounted() {
    this.writeNewTitle("Register");
    this.getDataRoles();
    this.getDataOrganizations();
  },
  methods: {
    verifyMethod() {
      this.showButtonSubmit = true;
    },
    expiredMethod() {
      this.showButtonSubmit = false;
    },
    errorMethod() {
      this.showButtonSubmit = false;
    },
    getDataRoles() {
      ApiService.get(process.env.VUE_APP_ROOT_API_3, `roles/pure?limit=1000`)
        .then(({ data }) => {
          let roles = data.result;
          roles.forEach((role) => {
            let newRole = {
              id: role.id,
              label: role.title,
            };
            this.dataRoles.push(newRole);
          });
        })
        .catch((e) => {
          this.showError(e.response.data.message);
        });
    },
    getDataOrganizations() {
      ApiService.get(process.env.VUE_APP_ROOT_API_3, "organizations/phierarchy")
        .then(({ data }) => {
          this.dataOrganizations = data.result.organizations;
        })
        .catch((e) => {
          this.showError(e.response.data.message);
        });
    },
    checkEmail(e) {
      let email = e.target.value.split("@");
      if (email.length > 1) {
        this.error.email = false;
      } else {
        this.error.email = true;
      }
    },
    signUpUser() {
      if (this.error.email) {
        this.password = "";
        return this.showError("Harap isi email dengan benar..!");
      }

      if (this.isLdap == 1) {
        if (this.checkDataLdap()) {
          this.showError(
            "Semua data harus sudah terisi, mohon periksa kembali!"
          );
        } else {
          this.signUp();
        }
      } else {
        if (this.checkDataLdap() || this.checkDataNonLdap()) {
          this.showError(
            "Semua data harus sudah terisi, mohon periksa kembali!"
          );
          this.password = "";
        } else {
          this.checkPassword();
        }
      }
    },
    checkDataLdap() {
      if (
        this.username == "" ||
        this.organization == null ||
        this.name == "" ||
        this.role == null
      ) {
        return true;
      }

      return false;
    },
    checkDataNonLdap() {
      if (this.password == "" || this.isLdap == null) {
        return true;
      }

      return false;
    },
    checkPassword() {
      const number = /\d/;
      // eslint-disable-next-line no-useless-escape
      const speChar = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      const space = /[ ]/;
      const lowerCase = /[a-z]/;
      const upperCase = /[A-Z]/;

      if (this.password.length < 12) {
        return this.showError("Password minimal 12 karakter!");
      }
      if (space.test(this.password)) {
        return this.showError("Password tidak boleh berisi spasi!");
      }
      if (!number.test(this.password) || !speChar.test(this.password)) {
        return this.showError("Password harus berisi angka dan symbol!");
      }
      if (!lowerCase.test(this.password) || !upperCase.test(this.password)) {
        return this.showError(
          "Password harus berisi huruf besar dan huruf kecil!"
        );
      }
      this.signUp();
    },
    showError(message) {
      Swal.fire({
        icon: "error",
        title: "Oops..",
        text: message,
      });
    },
    signUp() {
      let dataUser = {
        username: this.username,
        id_organization: this.organization,
        name: this.name,
        email: this.email,
        password: this.password == "" ? "123" : this.password,
        role: this.role,
        is_ldap: this.isLdap.toString(),
      };
      if (this.showButtonSubmit != true) {
        this.password = "";
        return this.showError("Verfikasi robot gagal!");
      }

      ApiService.post(
        `${process.env.VUE_APP_ROOT_API_1}/users/register`,
        dataUser
      )
        .then(() => {
          if (this.isLdap == 1) {
            Swal.fire({
              icon: "success",
              title: "Berhasil...",
              text: "Akun anda berhasil didaftarkan. Harap menunggu aktivasi akun.",
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "Berhasil...",
              text: "Akun anda berhasil didaftarkan. Silahkan verifikasi email anda untuk melakukan login.",
            });
          }
          this.setDefaultData();
          this.$router.push({ name: "login" });
        })
        .catch((e) => {
          this.showError(e.response.data.message);
          this.setDefaultData();
        });
    },
    setDefaultData() {
      this.username = "";
      this.organization = null;
      this.name = "";
      this.email = "";
      this.password = "";
      this.role = null;
      this.isLdap = null;
    },
  },
};
</script>

<style scoped>
/* form */
.form-login {
  display: flex;
  padding-top: 10px;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
}
.form-title {
  font-size: 20px;
  font-weight: 500;
  color: #495a6e;
  text-align: center;
}
.form-subtitle,
.form-register {
  font-size: 16px;
  font-weight: 500;
  text-align: center;
}
.span-login {
  color: #f64360;
  font-weight: 500;
}
.form-subtitle {
  color: #b5b5c3;
  margin-bottom: 50px;
}
.form-control {
  border: none;
  background-color: #f4f8fa;
}
.form-radio {
  display: flex;
  align-items: center;
}
.radio-label {
  display: flex;
}
.text-info-bottom {
  font-size: 10px;
}
.input-group-text {
  border-radius: 0 8px 8px 0;
}
.fa-eye:hover,
.fa-eye-slash:hover {
  cursor: pointer;
  color: #000000;
}

input[type="radio"] {
  margin-right: 5px;
  transform: scale(1.5);
}
</style>
