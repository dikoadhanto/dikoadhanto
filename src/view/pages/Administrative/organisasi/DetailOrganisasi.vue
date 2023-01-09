<template>
  <b-modal
    id="modal-detail-organisasi"
    size="lg"
    title="Detail Organisasi"
    ok-title=""
    button-size="sm"
    ok-variant="transparent"
    ok-only
    @close="closeDetail"
  >
    <section id="add-organisasi">
      <div class="container p-4">
        <!-- card parent and name -->
        <div class="card p-4 mb-10">
          <form>
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label">PARENT ORGANISASI :</label>
              <div class="col-sm-9">
                <input
                  type="text"
                  class="form-control"
                  disabled
                  :value="detailOrganization.parent_name"
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label"
                >NAMA ORGANISASI <span class="required-icon">*</span> :</label
              >
              <div class="col-sm-9">
                <input
                  type="text"
                  class="form-control"
                  disabled
                  :value="detailOrganization.name"
                />
              </div>
            </div>
          </form>
        </div>
        <!-- card pic, lok and address -->
        <div class="card p-4">
          <form>
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label">NAMA PIC :</label>
              <div class="col-sm-9" v-if="detailOrganization.pic == 'null'">
                <input
                  type="text"
                  class="form-control"
                  disabled
                  :value="empty"
                />
              </div>
              <div class="col-sm-9" v-else>
                <input
                  type="text"
                  class="form-control"
                  disabled
                  :value="picName"
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label"
                >LOKASI <span class="required-icon">*</span> :</label
              >
              <div class="col-sm-9" v-if="detailOrganization.sname == 'null'">
                <input
                  type="text"
                  class="form-control"
                  disabled
                  :value="empty"
                />
              </div>
              <div class="col-sm-9" v-else>
                <input
                  type="text"
                  class="form-control"
                  disabled
                  :value="detailOrganization.sname"
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label">ALAMAT :</label>
              <div class="col-sm-9" v-if="detailOrganization.address == 'null'">
                <input
                  type="text"
                  class="form-control"
                  disabled
                  :value="empty"
                />
              </div>
              <div class="col-sm-9" v-else>
                <input
                  type="text"
                  class="form-control"
                  disabled
                  :value="detailOrganization.address"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </b-modal>
</template>

<script>
import Swal from "sweetalert2";
import ApiService from "@/core/services/api.service.js";

export default {
  props: ["organizationSelected", "showDetail"],
  emits: ["hideDetail"],
  watch: {
    showDetail: function () {
      if (this.showDetail == true) {
        this.getDetailOrganization();
      }
    },
  },
  data() {
    return {
      empty: "-",
      picName: "",
      detailOrganization: {},
    };
  },
  methods: {
    getDetailOrganization() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_3,
        `organizations/${this.organizationSelected.id}`
      )
        .then(({ data }) => {
          if (data.code == 200) {
            this.getDataPic(data.result.pic);
            this.detailOrganization = data.result;
          } else if (data.code == 500) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Maaf, server sedang dalam perbaikan. Mohon menunggu sebentar lagi!",
            });
          }
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    getDataPic(pic_id) {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_1,
        "administrative/users"
      ).then(({ data }) => {
        let pic = data.result.payload.find((e) => e.users_id === pic_id);
        this.picName = pic.name;
      });
    },
    closeDetail() {
      this.$emit("hideDetail");
    },
  },
};
</script>

<style scoped>
.required-icon {
  color: #c70000;
}
</style>
