<template>
  <section id="login-page">
    <div class="row">
      <SideImage />
      <div class="form-login col-md-5">
        <div class="container mx-12">
          <!-- before send email -->
          <div v-if="!isReady">
            <div class="form-title mb-20">
              Mohon buat kata sandi baru <br />
              akun Anda
            </div>
            <div class="mb-10">
              <label class="form-label">New Password</label>
              <input
                :type="[seePassword ? 'text' : 'password']"
                class="form-control"
                v-model="newPassword"
                @keyup="checkPassword"
                @keyup.enter="changePassword"
              />
              <div class="wrong-label" v-if="wrongPassword">
                Password yang anda isi belum sama
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Confirm Password</label>
              <input
                :type="[seePassword ? 'text' : 'password']"
                class="form-control"
                v-model="confirmPassword"
                @keyup="checkPassword"
                @keyup.enter="changePassword"
              />
              <div class="wrong-label" v-if="wrongPassword">
                Password yang anda isi belum sama
              </div>
            </div>
            <div class="mb-10">
              <div
                class="icon-toggle-password"
                @click="seePassword = !seePassword"
                v-if="!seePassword"
              >
                <i class="fas fa-sm fa-eye"></i> Lihat password
              </div>
              <div
                class="icon-toggle-password"
                @click="seePassword = !seePassword"
                v-else
              >
                <i class="fas fa-sm fa-eye-slash"></i> Sembunyikan password
              </div>
            </div>
            <div class="text-center">
              <div class="btn btn-dark" @click="changePassword">Send</div>
            </div>
          </div>

          <!-- after send email -->
          <div v-else>
            <div class="icon-success text-center mb-3">
              <i
                class="fas text-dark fa-check-circle"
                style="font-size: 30px"
              ></i>
            </div>
            <div class="form-title">Berhasil</div>
            <div class="info-success mb-5">
              Anda berhasil membuat kata sandi baru
            </div>
            <div class="text-center">
              <router-link class="btn btn-sm btn-dark" to="/login">
                Sign in
              </router-link>
            </div>
          </div>
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
import SideImage from "./component/SideImage.vue";

export default {
  data() {
    return {
      isReady: false,
      newPassword: "",
      seePassword: false,
      confirmPassword: "",
      wrongPassword: false,
      token: this.$route.params.token,
    };
  },
  components: {
    SideImage,
  },
  mounted() {
    this.checkTokenReady();
    this.writeNewTitle("Ganti Password");
  },
  methods: {
    checkTokenReady() {
      if (this.token == "" || this.token == null) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Anda harus melakukan verifikasi email terlebih dahulu.",
        });
        this.$router.push({ name: "forget-password" });
      } else {
        this.checkTokenExpired();
      }
    },
    checkTokenExpired() {
      const tokenData = this.token.split(".")[1];
      const decodedJWT = JSON.parse(atob(tokenData));
      const dateNow = new Date();
      const miliseconds = dateNow.getTime() / 1000;
      if (decodedJWT.exp < miliseconds) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Waktu untuk mereset password sudah kadaluarsa. Harap melakukan permintaan ulang.",
        });
        this.$router.push({ name: "forget-password" });
      }
    },
    checkPassword() {
      if (this.newPassword !== this.confirmPassword) {
        this.wrongPassword = true;
      } else {
        this.wrongPassword = false;
      }
    },
    changePassword() {
      if (this.newPassword == "" || this.confirmPassword == "") {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Password baru harus diisi",
        });
      } else {
        if (this.wrongPassword) {
          Swal.fire({
            icon: "error",
            title: "Oops..",
            text: "Password yang anda isi belum sama",
          });
        } else {
          let data = {
            password: this.newPassword,
          };
          axios
            .patch(
              `${process.env.VUE_APP_ROOT_API_1}/users/resetpasswd/${this.token}`,
              data
            )
            .then(({ data }) => {
              if (data.code == 200) {
                Swal.fire({
                  icon: "success",
                  title: "Yeeay..",
                  text: "Anda berhasil mengganti password.",
                });
                this.isReady = true;
              }
            })
            .catch((e) => {
              if (e.response.status == 500) {
                Swal.fire({
                  icon: "error",
                  title: "Oops..",
                  text: "Server sedang dalam perbaikan. Mohon tunggu beberapa saat lagi.",
                });
              }
            });
          this.newPassword = "";
          this.confirmPassword = "";
        }
      }
    },
  },
};
</script>

<style scoped>
/* form */
.form-login {
  display: flex;
  padding-top: 120px;
  min-height: 100vh;
  position: relative;
  justify-content: center;
  background-color: #ffffff;
}
.form-title {
  font-size: 18px;
  color: #495a6e;
  font-weight: 500;
  text-align: center;
}
.form-control {
  border: none;
  background-color: #f4f8fa;
}
.wrong-label {
  color: #f64360;
}
.info-success {
  font-size: 13px;
  color: #b5b5c3;
  text-align: center;
}
.icon-toggle-password {
  font-size: 10px;
  color: #b5b5c3;
}
.icon-toggle-password:hover {
  cursor: pointer;
  color: #020a13;
}
.text-info-bottom {
  bottom: 10px;
  font-size: 10px;
  position: absolute;
}
</style>
