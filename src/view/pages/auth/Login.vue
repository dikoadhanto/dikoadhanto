<template>
  <section id="login-page">
    <div class="row">
      <SideImage />
      <div class="form-login col-md-5">
        <div class="container mx-12">
          <div class="form-title">
            Gunakan akun POINT Telkom untuk mengakses
          </div>
          <div class="form-subtitle">
            atau <br />
            <router-link to="/register" class="form-register"
              >Daftar akun baru
            </router-link>
          </div>
          <form>
            <div class="mb-10">
              <label class="form-label">Username / NIK Portal</label>
              <input
                type="text"
                class="form-control"
                v-model="username"
                @keyup.enter="loginUser"
              />
            </div>
            <div class="mb-10">
              <div class="wrap-label">
                <label class="form-label">Password</label>
                <label>
                  <router-link class="wrong-label" to="/forget-password">
                    Lupa password?
                  </router-link>
                </label>
              </div>
              <div class="input-group">
                <input
                  :type="seePassword ? 'text' : 'password'"
                  class="form-control"
                  v-model="password"
                  @keyup.enter="loginUser"
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
            </div>
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
                <div class="text-center" v-if="isShowLogin">
                  <div class="btn btn-dark" @click="loginUser">Sign in</div>
                </div>
              </div>
            </div>
          </form>
          <div class="text-info-bottom">
            Copyright &copy; 2013-2021 Divisi Service Operation. All Rights
            Reserved.
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { VueRecaptcha } from "vue-recaptcha";
import SideImage from "./component/SideImage.vue";
import { SET_AUTH, SET_ERROR } from "@/core/services/store/auth.module";

export default {
  data() {
    return {
      // isShowLogin: true,
      isShowLogin: false,
      username: "",
      password: "",
      seePassword: false,
      site_key: "6LfURg4iAAAAAAgfOxbs6Fbur4B9ZxMvIN4LgsuD",
      site_key2: "6LdbFg4iAAAAAPpXnX4E1yv8fJrTf6NssO31Jc1k",
    };
  },
  components: {
    SideImage,
    VueRecaptcha,
  },
  mounted() {
    this.writeNewTitle("Login");
  },
  methods: {
    verifyMethod() {
      this.isShowLogin = true;
    },
    expiredMethod() {
      this.isShowLogin = false;
    },
    errorMethod() {
      this.isShowLogin = false;
    },
    showError(message) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
      });
    },
    async loginUser() {
      if (this.username == "") {
        return this.showError("Username tidak boleh kosong!");
      }

      if (this.password == "") {
        return this.showError("Password tidak boleh kosong!");
      }

      let credentials = {
        username: this.username,
        password: this.password,
      };

      if (this.isShowLogin != true) {
        return this.showError("Verfikasi robot gagal!");
      }

      axios
        .post(`${process.env.VUE_APP_ROOT_API_1}/users/login`, credentials)
        .then(({ data }) => {
          this.$store.commit(SET_AUTH, data.result);
          this.$router.push({ name: "MapView" });
        })
        .catch((err) => {
          let response = err.response;
          if (response.status == 404) {
            this.showError("Username anda tidak ditemukan!");
            this.password = "";
          } else if (
            response.data.code == 500 &&
            response.data.message == "Username or password is wrong"
          ) {
            this.showError("Password anda salah!");
            this.password = "";
          } else if (
            response.data.code == 500 &&
            response.data.message == "User is no longer active"
          ) {
            this.showError("Akun ini sudah tidak aktif lagi!");
            this.password = "";
          } else if (
            response.data.code == 500 &&
            response.data.message ==
              `Failed, invalid credentials for ${this.username}`
          ) {
            this.showError("Username atau password anda salah!");
            this.password = "";
          } else if (
            response.data.code == 500 &&
            response.data.message ==
              "The user is not yet active, please activate it first via admin"
          ) {
            this.showError(
              "Akun ini belum diaktifkan. Silahkan aktifkan terlebih dahulu!"
            );
            this.password = "";
          } else if (
            response.data.code == 500 &&
            response.data.message.includes("too many login attempts")
          ) {
            this.showError(response.data.message);
            this.username = "";
            this.password = "";
          } else {
            this.showError(response.data.message);
            this.password = "";
          }
          this.$store.commit(SET_ERROR, response.data.message);
        });
    },
  },
};
</script>

<style scoped>
/* form */
.form-login {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
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
  font-weight: 400;
  text-align: center;
}
.form-subtitle {
  color: #b5b5c3;
  margin-bottom: 50px;
}
.form-register {
  color: #f64360;
  font-weight: 500;
}
.form-control {
  border: none;
  background-color: #f4f8fa;
}
.wrap-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.wrong-label {
  padding: 10px;
  color: #f64360;
  border-radius: 5px;
  background-color: transparent;
}
.wrong-label:hover {
  color: #c70000;
  font-weight: 400;
}
.text-info-bottom {
  bottom: 10px;
  font-size: 10px;
  position: absolute;
}
.input-group-text {
  border-radius: 0 8px 8px 0;
}
.fa-eye:hover,
.fa-eye-slash:hover {
  cursor: pointer;
  color: #000000;
}
</style>
