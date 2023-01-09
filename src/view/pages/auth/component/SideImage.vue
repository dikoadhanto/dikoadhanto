<template>
  <div class="img-login col-md-7">
    <div>
      <div class="title">NEWOSASE</div>
      <!-- <div class="subtitle">
        Welcome To Our Newest Website
      </div> -->
      <img
        src="/media/login/img-only.png"
        alt="side-image"
        class="image-login"
      />
    </div>
  </div>
</template>

<style scoped>
/* side image */
.img-login {
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: #ffecec;
}
.title,
.subtitle {
  text-align: center;
}
.title {
  font-size: 42px;
  font-weight: 600;
}
.subtitle {
  font-size: 20px;
  color: #495a6e;
  font-weight: 400;
  font-style: italic;
}
.image-login {
  height: 400px;
  margin-top: 50px;
  background-size: contain;
}

@media only screen and (max-width: 600px) {
  .img-login {
    display: none;
  }
}
</style>
