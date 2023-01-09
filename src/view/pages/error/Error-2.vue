<template>
  <div class="d-flex flex-column flex-root">
    <div
      class="d-flex flex-row-fluid bgi-size-cover bgi-position-center"
      :style="{
        backgroundImage: `url(${backgroundImage})`,
      }"
    >
      <!-- begin:: Content -->
      <div
        class="d-flex flex-row-fluid flex-column justify-content-end align-items-center text-center text-white pb-40"
      >
        <h1 class="display-1 font-weight-bold">OOPS!</h1>
        <span class="display-4 font-weight-boldest mb-8">
          Halaman yang anda cari tidak ditemukan
        </span>
        <div class="col-md-4">
          <router-link to="/" class="btn btn-primary w-100">
            Kembali ke menu utama
          </router-link>
        </div>
      </div>
      <!-- end:: Content -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Error-2",
  mounted() {},
  computed: {
    backgroundImage() {
      return process.env.BASE_URL + "media/error/bg2.jpg";
    },
  },
};
</script>
