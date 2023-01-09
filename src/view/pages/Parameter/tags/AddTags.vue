<template>
  <b-modal
    ref="add-tags"
    id="add-tags"
    title="Tambah Tags"
    size="lg"
    scrollable
    hide-footer
    centered
  >
    <form @submit.prevent="addTags">
      <b-row align-v="center" class="mb-5">
        <!-- Input Nama -->
        <b-col cols="3">
          <h6>Nama Tags :</h6>
        </b-col>
        <b-col cols="9">
          <div class="form-group mb-0">
            <input
              type="text"
              class="form-control form-control-solid"
              v-model="nameTags"
            />
          </div>
        </b-col>
      </b-row>

      <!-- Input Deskripsi -->
      <b-row align-v="center" class="mb-5">
        <b-col cols="3">
          <h6>Deskripsi :</h6>
        </b-col>
        <b-col cols="9">
          <div class="form-group mb-0">
            <input
              type="text"
              class="form-control form-control-solid"
              v-model="descTags"
            />
          </div>
        </b-col>
      </b-row>

      <!-- Button Simpan -->
      <b-row align-v="center">
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
import Swal from "sweetalert2";
import ApiService from "@/core/services/api.service";

export default {
  emits: ["getAllDataTags"],
  data() {
    return {
      nameTags: "",
      descTags: "",
    };
  },
  methods: {
    async addTags() {
      if (this.nameTags === "" || this.nameTags === null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Nama Tags tidak boleh kosong!",
        });
      } else {
        let dataTags = {
          tags: [
            {
              name: this.nameTags,
              description: this.descTags,
            },
          ],
        };
        ApiService.post(`${process.env.VUE_APP_ROOT_API_3}/tags`, dataTags)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Berhasil!",
              text: "Tags berhasil ditambahkan!",
            }).then((result) => {
              if (result.isConfirmed) {
                this.$bvModal.hide("add-tags");
                this.nameTags = "";
                this.descTags = "";
                this.$emit("getAllDataTags");
              }
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>
