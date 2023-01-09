<template>
  <section id="verif-email">
    <!-- if data ready -->
    <div class="container" v-if="isReady">
      <!-- if success -->
      <div class="card p-20 text-center" v-if="result">
        <div class="icon-success mb-10">
          <i class="fas fa-check-circle"></i>
        </div>
        <div class="info-success mb-10">
          <b>Selamat</b><br /><span class="text-span"
            >Akun anda berhasil terverifikasi!</span
          >
        </div>
        <div>
          <router-link to="/login" class="btn btn-dark">
            Go to login
          </router-link>
        </div>
      </div>

      <!-- if error -->
      <div class="card p-20 text-center" v-else>
        <div class="icon-wrong mb-10">
          <i class="fas fa-times-circle"></i>
        </div>
        <div class="info-wrong mb-10">
          <b>Oops...</b><br /><span class="text-span">{{ messageError }}</span>
        </div>
        <div>
          <router-link to="/login" class="btn btn-dark">
            Go to login
          </router-link>
        </div>
      </div>
    </div>
    <!-- if data not ready -->
    <div class="container" v-else>
      <b-alert show variant="warning">Tunggu sebentar...</b-alert>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      isReady: false,
      result: false,
      token: this.$route.params.token,
      messageError: "",
    };
  },
  mounted() {
    this.checkTokenReady();
    this.writeNewTitle("Verifikasi Email");
  },
  methods: {
    checkTokenReady() {
      if (this.token == "" || this.token == null) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "Anda harus melakukan verifikasi email terlebih dahulu.",
        });
        this.$router.push({ name: "register" });
      } else {
        this.checkResponseToken();
      }
    },
    checkResponseToken() {
      axios
        .get(`${process.env.VUE_APP_ROOT_API_1}/verify/email/${this.token}`)
        .then(({ data }) => {
          if (data.code == 200) {
            this.result = true;
            this.isReady = true;
          }
        })
        .catch((e) => {
          this.result = false;
          this.isReady = true;
          this.messageError = e.response.data.message;
        });
    },
  },
};
</script>

<style scoped>
#verif-email {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card {
  border-radius: 50px;
  background: #e0e0e0;
  box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
}
.fa-check-circle,
.info-success {
  color: #2b2d42;
}
.fa-times-circle,
.info-wrong {
  color: #c70000;
}
.fa-check-circle,
.fa-times-circle {
  font-size: 50px;
}
.info-success,
.info-wrong {
  font-size: 30px;
}
.text-span {
  font-size: 20px;
  margin-top: -10px;
}
</style>
