<template>
  <b-modal
    id="update-tags"
    title="Update Tags"
    size="lg"
    scrollable
    hide-footer
    centered
  >
    <form @submit.prevent="updateTags">
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
              v-model="tag.name"
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
              v-model="tag.description"
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
  props: ["getIdTags"],
  emit: ["getAllDataTags"],
  data() {
    return {
      tag: {
        name: "",
        description: "",
      },
    };
  },
  methods: {
    setTag(data) {
      this.tag = data;
    },
    updateTags() {
      if (this.tag.name === "" || this.tag.description === null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Nama Tags tidak boleh kosong",
        });
      } else {
        let data = {
          name: this.tag.name,
          description: this.tag.description,
        };
        ApiService.put(
          `${process.env.VUE_APP_ROOT_API_3}/tags/${this.tag.id}`,
          data
        )
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "Tags berhasil diupdate",
            }).then((result) => {
              if (result.isConfirmed) {
                this.$bvModal.hide("update-tags");
                this.name = "";
                this.description = "";
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
