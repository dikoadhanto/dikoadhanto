<template>
  <b-modal
    id="link-tag-rtu"
    size="lg"
    title="Tag RTU Link"
    button-size="sm"
    hide-footer
    @close="closeUpdate"
    @cancel="closeUpdate"
    @dismiss="closeUpdate"
    @dismissed="closeUpdate"
    @hidden="closeUpdate"
  >
    <section id="select-rtu-port">
      <div class="container">
        <form @submit.prevent="addlinkTag">
          <!-- name, desc, template -->
          <div class="card p-4 mb-3">
            <b-row align-v="center" class="mb-5">
              <b-col cols="3">
                <h6>Nama TAGS:</h6>
              </b-col>
              <b-col cols="9">
                <div class="form-group mb-0">
                  <input
                    disabled
                    type="text"
                    class="form-control form-control-solid"
                    v-model="selectNamaTags"
                  />
                  <!-- <select
                    class="form-control form-control-solid"
                    v-model="selectNamaFormula"
                  >
                    <option>Pilih Nama TAGS</option>
                    <option
                      v-for="(data, i) in listNamaFormula"
                      :key="i"
                      :value="data.md_id"
                    >
                      <span class="badge badge-danger text-white">{{
                        data.md_name
                      }}</span>
                    </option>
                  </select> -->
                </div>
              </b-col>
            </b-row>

            <b-row align-v="center" class="mb-5">
              <b-col cols="3">
                <h6>DESKRIPSI:</h6>
              </b-col>
              <b-col cols="9">
                <div class="form-group mb-0">
                  <input
                    type="text"
                    disabled
                    class="form-control form-control-solid"
                    v-model="selectDeskripsi"
                  />
                  <!-- <select
                    class="form-control form-control-solid"
                    v-model="selectDeskripsi"
                  >
                    <option>Pilih Nama Deskripsi</option>
                    <option
                      v-for="(data, i) in listDeskripsi"
                      :key="i"
                      :value="data.md_id"
                    >
                      <span class="badge badge-danger text-white">{{
                        data.md_name
                      }}</span>
                    </option>
                  </select> -->
                </div>
              </b-col>
            </b-row>
          </div>

          <!-- list permission uam -->
          <div class="card p-4">
            <h6>LIST RTU</h6>
            <div class="row">
              <!-- list wrap -->
              <div class="col-md-6">
                <div class="card p-3 card-permission mb-4">
                  <div class="mb-3">
                    <!-- search -->
                    <div class="row">
                      <div class="col-md-8">
                        <input
                          v-model="searchKey"
                          type="text"
                          placeholder="Search..."
                          class="form-control form-search"
                        />
                      </div>
                    </div>
                  </div>
                  <!-- list -->
                  <div class="mb-3" v-for="(item, i) in listTag" :key="i">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        :value="item"
                        :id="item.rtu_id"
                        v-model="newListTags"
                      />
                      <label class="form-check-label" :for="item.rtu_id">
                        {{ item.rtu_name.toUpperCase() }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <!-- choose list -->
              <div class="col-md-6">
                <div class="card card-permission p-8">
                  <ol>
                    <li v-for="(perm, i) in newListTags" :key="i">
                      {{ perm.rtu_name.toUpperCase() }}
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

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
      </div>
    </section>
  </b-modal>
</template>

<script>
import Swal from "sweetalert2";
import ApiService from "@/core/services/api.service.js";

export default {
  props: ["isUpdate", "itemTags"],
  emits: ["getAllDataTags", "hideLink"],
  data() {
    return {
      listNamaFormula: [],
      selectNamaFormula: "",
      listDeskripsi: [],
      selectNamaTags: "",
      selectDeskripsi: "",
      dataSelectTags: {},
      idRtu: [],
      idTags: null,

      searchKey: "",
      listTag: [],
      newListTags: [],
      dataListTags: [],
      selectedRtuTagsLink: [],
    };
  },
  watch: {
    isUpdate: function () {
      if (this.isUpdate == true) {
        this.setDataTag();
        this.getRtu();
      }
    },
    searchKey: function () {
      this.getRtu();
    },
  },
  methods: {
    setDataTag() {
      this.selectNamaTags = this.itemTags.name;
      this.selectDeskripsi = this.itemTags.description;
      this.idRtu = this.itemTags.rtu_ids;
      this.idTags = this.itemTags.id;
    },

    getRtu() {
      ApiService.query(`${process.env.VUE_APP_ROOT_API_4}/rtu`, {
        params: {
          page: "1",
          limit: "all",
          name_rtu: this.searchKey,
        },
      })
        .then(({ data }) => {
          this.listTag = [];
          this.newListTags = [];
          data.result.payload.map((item) => {
            this.listTag.push({
              rtu_id: item.rtu_id,
              rtu_name: item.rtu_name,
            });
          });
          this.listTag.map((item) => {
            if (this.idRtu.includes(item.rtu_id)) {
              this.newListTags.push({
                rtu_id: item.rtu_id,
                rtu_name: item.rtu_name,
              });
            }
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addlinkTag() {
      // this.listTag.map((item) => {
      //   if (this.idRtu.includes(item.rtu_id)) {
      //     this.newListTags.push({
      //       rtu_id: item.rtu_id,
      //       rtu_name: item.rtu_name,
      //     });
      //   }
      // });
      this.newListTags.map((item) => {
        return this.selectedRtuTagsLink.push(item.rtu_id);
      });
      ApiService.post(
        `${process.env.VUE_APP_ROOT_API_3}/tags/${this.itemTags.id}/rtus`,
        this.selectedRtuTagsLink
      )
        .then(({ data }) => {
          if (data.code == 201) {
            Swal.fire({
              icon: "success",
              title: "Berhasil...",
              text: "Tersimpan",
            }).then((result) => {
              if (result.isConfirmed || result.isDismissed) {
                this.searchKey = "";
                this.$bvModal.hide("link-tag-rtu");
                this.newListTags = [];
                this.selectedRtuTagsLink = [];
                this.$emit("getAllDataTags");
              }
            });
          }
        })
        .catch((e) => {
          if (e.response.status == 500) {
            Swal.fire({
              icon: "error",
              title: "Maaf..",
              text: "Server sedang dalam perbaikan, silahkan coba beberapa saat lagi!",
            });
          }
        });
      // this.$emit("hideLink");
    },
    closeUpdate() {
      this.$emit("hideLink");
    },
  },
};
</script>

<style scoped>
.col-form-label {
  font-weight: bold;
}
.required-icon {
  color: #c70000;
}
.form-control {
  background-color: #f4f8fa;
}
.form-search {
  background-color: #ffffff;
}
.card-permission {
  height: 600px;
  overflow: scroll;
}
</style>
