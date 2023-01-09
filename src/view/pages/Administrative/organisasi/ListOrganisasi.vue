<template>
  <section id="organisasi-general">
    <div class="card card-main">
      <div class="card-header">
        <div class="title-card-header">List Organization</div>
        <div class="icon-extend">
          <router-link
            to="/administrative/organisasi"
            class="btn btn-success btn-sm mr-3"
          >
            FIRST LIST
          </router-link>
          <div class="btn btn-success btn-sm mr-4" @click="toggleHide">
            Hide All
          </div>
          <div class="btn btn-success btn-sm" @click="toggleExtend">Extend</div>
        </div>
      </div>
      <div class="card-body p-4">
        <div class="container">
          <div class="row">
            <div class="col-md p-4">
              <div class="card card-list p-4" v-if="isReady">
                <!-- tree organization -->
                <TreeOrganization
                  :isExtend="isExtend"
                  :node="listOrganization"
                  @detailOrg="detailOrg"
                  @addOrg="addOrg"
                  @updateOrg="updateOrg"
                  @removeOrg="removeOrg"
                />
              </div>

              <!-- data not ready -->
              <div class="alert alert-warning mt-15" role="alert" v-else>
                Tunggu sebentar, sedang pengambilan data...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- modal detail organisasi -->
    <DetailOrganisasi
      :organizationSelected="selectedOrganization"
      :showDetail="showDetail"
      @hideDetail="hideDetail"
    />
    <!-- modal add organisasi-->
    <AddOrganisasi
      :organizationSelected="selectedOrganization"
      @getAllDataOrganization="getDataOrganizations"
      :isAdd="isAdd"
      @hideAdd="hideAdd"
    />
    <!-- modal update organisasi-->
    <UpdateOrganisasi
      :idOrganizationUpdate="selectedOrganization.id"
      :isUpdate="isUpdate"
      @hideUpdate="hideUpdate"
      @getAllDataOrganization="getDataOrganizations"
    />
  </section>
</template>

<script>
import Swal from "sweetalert2";
import TreeOrganization from "./TreeView.vue";
import ApiService from "@/core/services/api.service.js";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

// modal
import AddOrganisasi from "./AddOrganisasi.vue";
import UpdateOrganisasi from "./UpdateOrganisasi.vue";
import DetailOrganisasi from "./DetailOrganisasi.vue";

export default {
  name: "Organisasi",
  mounted() {
    // set administration
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Administrative", subtitle: "Organization Management" },
    ]);
    this.getDataOrganizations();
    this.writeNewTitle("Organization Management");
  },
  components: {
    TreeOrganization,
    AddOrganisasi,
    DetailOrganisasi,
    UpdateOrganisasi,
  },
  data() {
    return {
      isReady: false,
      listOrganization: [],

      // extend
      isExtend: true,

      // add
      isAdd: false,

      // detail
      showDetail: false,

      // update
      isUpdate: false,
    };
  },
  computed: {
    selectedOrganization() {
      return this.$store.state.organization.selectedOrganization;
    },
  },
  methods: {
    // function get data all organization
    getDataOrganizations() {
      ApiService.get(process.env.VUE_APP_ROOT_API_3, "organizations/hierarchy")
        .then(({ data }) => {
          this.isReady = true;
          this.listOrganization = data.result.organizations[0];
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    // toggle to extend or hide
    toggleHide() {
      this.isExtend = false;
    },
    toggleExtend() {
      this.isExtend = true;
    },
    // function add organization
    addOrg() {
      this.isAdd = true;
      this.$bvModal.show("modal-add-organisasi");
    },
    hideAdd() {
      this.isAdd = false;
    },

    // function update organization
    updateOrg() {
      this.$bvModal.show("modal-update-organisasi");
      this.isUpdate = true;
    },
    hideUpdate() {
      this.isUpdate = false;
    },
    // function detail organization
    detailOrg() {
      this.showDetail = true;
      this.$bvModal.show("modal-detail-organisasi");
    },
    hideDetail() {
      this.showDetail = false;
    },
    // function remove organization
    removeOrg() {
      let organizationName = this.selectedOrganization.name;
      Swal.fire({
        title: `Anda yakin ingin menghapus organisasi ${organizationName}?`,
        showCancelButton: true,
        confirmButtonColor: "#c70000",
        confirmButtonText: "Hapus",
      }).then((result) => {
        if (result.isConfirmed) {
          ApiService.delete(
            `${process.env.VUE_APP_ROOT_API_3}/organizations?orgId=${this.selectedOrganization.id}`
          )
            .then(({ data }) => {
              if (data.code == 200) {
                Swal.fire({
                  icon: "success",
                  title: "Berhasil",
                  text: `Anda berhasil menghapus organisasi ${organizationName}.`,
                });
                this.getDataOrganizations();
              }
            })
            .catch((e) => {
              if (e.response.status == 409) {
                Swal.fire({
                  icon: "error",
                  title: "Oops..",
                  text: "Anda tidak berhak menghapus organisasi ini!",
                });
              } else if (e.response.status == 500) {
                Swal.fire({
                  icon: "error",
                  title: "Maaf..",
                  text: "Server sedang dalam perbaikan, silahkan coba beberapa saat lagi!",
                });
              }
              console.log(e.response);
            });
        }
      });
    },
  },
};
</script>

<style scoped>
.card-main {
  height: 500px;
}
.card-header {
  display: flex;
  font-weight: bold;
  align-items: center;
  justify-content: space-between;
}
.wrap-icon i {
  padding: 5px;
  color: #000000;
  border-radius: 5px;
  background-color: transparent;
}
.wrap-icon i:hover {
  cursor: pointer;
  background-color: #909090;
}

/* table */
.card-table {
  border: 1px solid #000000;
}

/* list card */
.card-list {
  height: 350px;
  overflow: scroll;
}

/* image */
.image-telkom {
  width: 100%;
  border-radius: 10px;
}
</style>
