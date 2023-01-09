<template>
  <b-modal
    id="modal-detail-role"
    size="xl"
    title="Detail Role"
    ok-title=""
    button-size="sm"
    ok-variant="transparent"
    ok-only
    @close="closeDetail"
    @cancel="closeDetail"
    @hidden="closeDetail"
  >
    <section id="detail-role">
      <div class="container">
        <form>
          <!-- card name -->
          <div class="card p-4 mb-3">
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label"
                >ROLE NAME <span class="required-icon">*</span> :</label
              >
              <div class="col-sm-9">
                <input
                  type="text"
                  class="form-control"
                  v-model="roleDetail.title"
                  disabled
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label">TEMPLATE ROLE :</label>
              <div class="col-sm-9">
                <input
                  type="text"
                  class="form-control"
                  v-model="roleDetail.title"
                  disabled
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label">DESKRIPSI :</label>
              <div class="col-sm-9">
                <input
                  type="text"
                  class="form-control"
                  v-model="roleDetail.description"
                  disabled
                />
              </div>
            </div>
          </div>

          <!-- list permission uam -->
          <div class="card p-4">
            <label class="col-form-label mb-3">LIST PERMISSION UAM :</label>
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
                  <div
                    class="mb-3"
                    v-for="(permission, i) in searchPermission()"
                    :key="i"
                  >
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        :value="permission"
                        :id="permission.id"
                        v-model="newListPermissions"
                        disabled
                      />
                      <label class="form-check-label" :for="permission.id">
                        {{ permission.name.toUpperCase() }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <!-- choose list -->
              <div class="col-md-6">
                <div class="card card-permission p-8">
                  <ol>
                    <li v-for="(perm, i) in newListPermissions" :key="i">
                      {{ perm.name.toUpperCase() }}
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  </b-modal>
</template>

<script>
import ApiService from "@/core/services/api.service.js";

export default {
  props: ["isDetail", "roleDetail"],
  emits: ["hideDetail"],
  data() {
    return {
      searchKey: "",
      listPermissions: [],
      newListPermissions: [],
    };
  },
  watch: {
    isDetail: function () {
      if (this.isDetail == true) {
        this.listPermissions = [];
        this.newListPermissions = [];
        this.getPermissions();
        this.getPermissionRole();
      }
    },
  },
  methods: {
    getPermissions() {
      ApiService.get(process.env.VUE_APP_ROOT_API_3, `permissions`)
        .then(({ data }) => {
          data.result.permissions.forEach((element) => {
            let newElement = {
              id: element.id,
              name: element.name,
            };
            this.listPermissions.push(newElement);
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    searchPermission() {
      let searchInput = this.searchKey.toLowerCase();
      return this.listPermissions.filter((perm) => {
        return perm.name.toLowerCase().search(searchInput) !== -1;
      });
    },
    getPermissionRole() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_3,
        `roles/${this.roleDetail.id}/permissions`
      )
        .then(({ data }) => {
          let permission = data.result.permissions;
          if (permission.length) {
            permission.forEach((element) => {
              let newElement = {
                id: element.id,
                name: element.name,
              };
              this.newListPermissions.push(newElement);
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    closeDetail() {
      this.$emit("hideDetail");
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
.form-control,
.card-permission {
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
