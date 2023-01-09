<template>
  <section>
    <div class="row mb-2">
      <div class="col-sm-6">
        <input type="text" class="form-control" value="NAMA" readonly />
      </div>
      <div class="col-sm-6">
        <input
          type="text"
          class="form-control"
          :value="dataPic.name"
          readonly
        />
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-sm-6">
        <input type="text" class="form-control" disabled value="NIK" />
      </div>
      <div class="col-sm-6">
        <input
          type="text"
          class="form-control"
          disabled
          :value="dataPic.username"
        />
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-sm-6">
        <input type="text" class="form-control" value="NOMOR PONSEL" readonly />
      </div>
      <div class="col-sm-6">
        <input
          type="text"
          class="form-control"
          :value="dataPic.phone == 'null' ? '-' : dataPic.phone"
          readonly
        />
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-sm-6">
        <input type="text" class="form-control" disabled value="ORGANISASI" />
      </div>
      <div class="col-sm-6">
        <input
          type="text"
          class="form-control"
          disabled
          :value="dataPic.organization"
        />
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-sm-6"></div>
      <div class="col-sm-6">
        <img
          :src="
            dataPic.profile_picture == 'null'
              ? 'https://picsum.photos/id/1/300'
              : `https://newosase.telkom.co.id/be-1-${dataPic.profile_picture}`
          "
          class="img-user"
        />
      </div>
    </div>
  </section>
</template>

<script>
import ApiService from "@/core/services/api.service";

export default {
  data() {
    return {
      dataPic: {},
    };
  },
  mounted() {
    this.getDataPic();
  },
  methods: {
    getDataPic() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_5,
        `operation/rtu/${this.$route.params.idRtu}`
      )
        .then(({ data }) => {
          this.dataPic = data.result.pic;
        })
        .catch((e) => {
          console.log(e.response, "error");
        });
    },
  },
};
</script>

<style scoped>
.img-user {
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: 5px;
}
</style>
