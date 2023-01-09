<template>
  <section id="login-page">
    <div class="row">
      <SideImage />
      <div class="form-login col-md-5">
        <div class="container mx-12">
          <!-- before send email -->
          <div v-if="!isReady">
            <div class="form-title mb-20">
              Masukkan alamat email Anda <br />
              dan Kami akan mengirimkan tautan pemulihan akun
            </div>
            <div class="mb-10">
              <label class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                v-model="email"
                @keyup="checkEmail"
                @keyup.enter="sendEmail"
              />
              <div class="wrong-label" v-if="wrongEmail">
                Harap masukkan format email yang benar
              </div>
            </div>
            <div class="text-center">
              <div class="btn btn-dark" @click="sendEmail">Send</div>
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
            <div class="form-title">Email Terkirim</div>
            <div class="info-success">
              Periksa email Anda dan buka <br />
              tautan yang kami kirimkan untuk <br />
              melanjutkan
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
      email: "",
      isReady: false,
      wrongEmail: false,
    };
  },
  components: {
    SideImage,
  },
  mounted() {
    this.writeNewTitle("Lupa Password");
  },
  methods: {
    checkEmail() {
      let splitEmail = this.email.split("@");
      this.wrongEmail = splitEmail.length !== 2 ? true : false;
    },
    sendEmail() {
      if (this.email == "") {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Anda harus mengisi email terlebih dahulu",
        });
      } else {
        if (this.wrongEmail) {
          Swal.fire({
            icon: "error",
            title: "Oops..",
            text: "Harap masukkan format email dengan benar",
          });
        } else {
          let data = {
            email: this.email,
          };
          axios
            .post(`${process.env.VUE_APP_ROOT_API_1}/users/forgot`, data)
            .then(({ data }) => {
              if (data.code == 200) {
                Swal.fire({
                  icon: "success",
                  title: "Yeeay",
                  text: "Silahkan cek email anda untuk mengecek tautan yang kami kirim.",
                });
              }
            })
            .catch((e) => {
              if (e.response.status == 500) {
                Swal.fire({
                  icon: "error",
                  title: "Oops..",
                  text: "Server sedang dalam perbaikan. Mohon menunggu beberapa saat lagi.",
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops..",
                  text: e.response.data.message,
                });
              }
            });
          this.isReady = true;
          this.email = "";
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
.text-info-bottom {
  bottom: 10px;
  font-size: 10px;
  position: absolute;
}
</style>
