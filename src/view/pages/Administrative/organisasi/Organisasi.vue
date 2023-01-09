<template>
  <section id="organisasi-general">
    <div class="card card-main">
      <div class="card-header py-4">
        <div class="title">List Organization</div>
        <div class="btn-expand">
          <router-link
            to="/administrative/organisasi/list"
            class="btn btn-success btn-sm mr-3"
          >
            SECOND LIST
          </router-link>
          <div
            class="btn btn-success btn-sm mr-3"
            @click="expandTreeView(false)"
          >
            HIDE ALL
          </div>
          <div class="btn btn-success btn-sm" @click="expandTreeView(true)">
            EXTEND
          </div>
        </div>
      </div>
      <div class="card-body p-4">
        <div class="container">
          <div class="wrap-icon mb-3">
            <i
              class="fas fa-eye mr-4 icon-view"
              title="Detail"
              @click="DetailOrg('modal-detail-organisasi')"
            ></i>
            <i
              class="fas fa-plus mr-4 icon-add"
              title="Tambah"
              @click="addOrg('modal-add-organisasi')"
            ></i>
            <i
              class="fas fa-pen mr-4 icon-edit"
              title="Update"
              @click="updateOrg('modal-update-organisasi')"
            ></i>
            <i
              class="fas fa-trash mr-4 icon-delete"
              title="Hapus"
              @click="removeOrg"
            ></i>
          </div>
          <div class="row">
            <div class="col-md p-4">
              <treeselect
                v-model="value"
                :multiple="true"
                :default-expand-level="Infinity"
                :options="listOrganization"
                placeholder="Pilih organisasi..."
                :alwaysOpen="expandTree"
                openDirection="bottom"
                :normalizer="normalizer"
                noChildrenText="Tidak ada data selanjutnya"
                noOptionsText="Tunggu sebentar..."
                @select="getOrganizationSelected"
              />
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
      :idOrganizationUpdate="value"
      :isUpdate="isUpdate"
      @hideUpdate="hideUpdate"
      @getAllDataOrganization="getDataOrganizations"
    />
  </section>
</template>

<script>
import Swal from "sweetalert2";
import AddOrganisasi from "./AddOrganisasi.vue";
import Treeselect from "@riophae/vue-treeselect";
import UpdateOrganisasi from "./UpdateOrganisasi.vue";
import DetailOrganisasi from "./DetailOrganisasi.vue";
import ApiService from "@/core/services/api.service.js";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

export default {
  name: "Organisasi",
  components: {
    Treeselect,
    AddOrganisasi,
    DetailOrganisasi,
    UpdateOrganisasi,
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Administrative", subtitle: "Organization Management" },
    ]);
    this.checkPermission(
      "administration_organizations",
      "Maaf, Anda tidak dapet mengakses halaman ini, karena Anda tidak memiliki hak akses"
    );
    this.getDataOrganizations();
    this.writeNewTitle("Organization Management");
  },
  data() {
    return {
      value: null,
      isUpdate: false,
      showDetail: false,
      expandTree: true,
      selectedOrganization: {},
      listOrganization: [],
      listPermission: this.getReturnRolePermissions(),

      // normalizer tree select
      normalizer(node) {
        return {
          label: node.name,
          children: node.organizations,
        };
      },

      // add
      isAdd: false,
    };
  },
  watch: {
    value: function () {
      if (this.value.length > 1) {
        this.value.shift();
      }
    },
  },
  methods: {
    // check permission
    checkPermission(name, textError) {
      if (!this.listPermission.includes(name)) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: textError,
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            this.$router.push({ name: "MapView" });
          }
        });
      }
    },
    // expand tree
    expandTreeView(v) {
      this.expandTree = v;
    },

    // function get data all organization
    getDataOrganizations() {
      ApiService.get(process.env.VUE_APP_ROOT_API_3, "organizations/hierarchy")
        .then(({ data }) => {
          let dataOrg = data.result.organizations;
          this.listOrganization = dataOrg;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // function to get organization was selected from tree view
    getOrganizationSelected(node) {
      this.selectedOrganization = node;
    },
    // function add organization
    addOrg(id) {
      this.checkPermission(
        "administration_organizations_create",
        "Maaf, Anda tidak dapet mengakses halaman ini, karena Anda tidak memiliki hak akses"
      );
      if (this.value == "" || this.value == null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Anda harus memilih parent organisasi terlebih dahulu!",
        });
      } else {
        if (
          this.selectedOrganization.level == "3" ||
          this.selectedOrganization == 3
        ) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Level tingkat 3 tidak bisa menjadi parent. Anda harus memilih tingkat level diatasnya",
          });
        } else {
          this.isAdd = true;
          this.$bvModal.show(id);
        }
      }
    },
    hideAdd() {
      this.isAdd = false;
    },

    // function update organization
    updateOrg(id) {
      this.checkPermission(
        "administration_organizations_update",
        "Maaf, Anda tidak dapet mengakses halaman ini, karena Anda tidak memiliki hak akses"
      );
      if (this.value == "" || this.value == null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Anda harus memilih organisasi terlebih dahulu!",
        });
      } else if (
        this.selectedOrganization.level == "0" ||
        this.selectedOrganization == 0
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Anda tidak boleh memilih level 0. Anda harus memilih level dibawahnya!",
        });
      } else {
        this.$bvModal.show(id);
        this.isUpdate = true;
      }
    },
    hideUpdate() {
      this.isUpdate = false;
    },
    // function detail organization
    DetailOrg(id) {
      this.checkPermission(
        "administration_organizations_view",
        "Maaf, Anda tidak dapet mengakses halaman ini, karena Anda tidak memiliki hak akses"
      );
      if (this.value == "" || this.value == null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Anda harus memilih organisasi terlebih dahulu!",
        });
      } else if (
        this.selectedOrganization.level == "0" ||
        this.selectedOrganization == 0
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Anda tidak boleh memilih level 0. Anda harus memilih level dibawahnya!",
        });
      } else {
        this.$bvModal.show(id);
        this.showDetail = true;
      }
    },
    hideDetail() {
      this.showDetail = false;
    },
    // function remove organization
    removeOrg() {
      this.checkPermission(
        "administration_organizations_delete",
        "Maaf, Anda tidak dapet mengakses halaman ini, karena Anda tidak memiliki hak akses"
      );
      if (this.value == "" || this.value == null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Anda harus memilih organisasi terlebih dahulu!",
        });
      } else {
        let organizationName = this.selectedOrganization.name;
        Swal.fire({
          title: `Anda yakin ingin menghapus organisasi ${organizationName}?`,
          showCancelButton: true,
          confirmButtonColor: "#c70000",
          confirmButtonText: "Hapus",
        }).then((result) => {
          if (result.isConfirmed) {
            ApiService.delete(
              `${process.env.VUE_APP_ROOT_API_3}/organizations?orgId=${this.value}`
            )
              .then(({ data }) => {
                if (data.code == 200) {
                  Swal.fire({
                    icon: "success",
                    title: "Berhasil",
                    text: `Anda berhasil menghapus organisasi ${organizationName}.`,
                  });
                  this.getDataOrganizations();
                } else if (data.code == 409) {
                  Swal.fire({
                    icon: "error",
                    title: "Oops..",
                    text: "Anda tidak berhak menghapus organisasi ini!",
                  });
                } else if (data.code == 500) {
                  Swal.fire({
                    icon: "error",
                    title: "Maaf..",
                    text: "Server sedang dalam perbaikan, silahkan coba beberapa saat lagi!",
                  });
                }
              })
              .catch((e) => {
                console.log(e);
              });
          }
        });
      }
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

/* image */
.image-telkom {
  width: 100%;
  border-radius: 10px;
}
</style>
