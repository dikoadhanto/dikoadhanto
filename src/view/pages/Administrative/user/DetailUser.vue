<template>
  <b-modal
    id="detail-user"
    title="Detail Users"
    size="lg"
    scrollable
    hide-footer
    centered
    @close="closeDetail"
    @hide="closeDetail"
  >
    <form>
      <div class="card">
        <b-row align-v="center" class="m-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">
              OTENTIKASI&nbsp;<span class="required"></span>&nbsp;:
            </h6>
          </b-col>
          <b-col cols="9">
            <label class="m-0">
              <input
                type="radio"
                value="1"
                v-model="isLdap"
                required
                disabled
              />
              <span
                class="font-weight-bold ml-2 mr-5"
                align-self="center"
                style="font-size: 14px"
                >LDAP</span
              >
            </label>
            <label class="m-0">
              <input
                type="radio"
                value="0"
                label="Local"
                v-model="isLdap"
                required
                disabled
              />
              <span
                class="font-weight-bold ml-2"
                align-self="center"
                style="font-size: 14px"
                >LOCAL</span
              >
            </label>
          </b-col>
        </b-row>

        <b-row align-v="center" class="mx-5 mb-5 mt-1" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">ACTIVE STATUS :</h6>
          </b-col>
          <b-col class="col-9">
            <span class="switch switch-sm switch-icon" v-if="is_active">
              <label class="m-0">
                <input type="checkbox" name="" v-model="is_active" disabled />
                <span></span>
              </label>
            </span>
            <span class="switch switch-sm switch-icon" v-else>
              <label class="m-0">
                <input
                  type="checkbox"
                  name="select"
                  v-model="is_active"
                  disabled
                />
                <span></span>
              </label>
            </span>
          </b-col>
        </b-row>

        <b-row align-v="center" class="mx-5 mb-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">
              USERNAME&nbsp;<span class="required"></span>&nbsp;:
            </h6>
          </b-col>
          <b-col cols="9">
            <input
              type="text"
              class="form-control form-control-solid"
              v-model="username"
              disabled
            />
          </b-col>
        </b-row>

        <b-row align-v="center" class="mx-5 mb-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">PICTURE :</h6>
          </b-col>
          <b-col cols="9">
            <div>
              <div
                class="imagePreviewWrapper"
                :style="{ 'background-image': `url(${viewImage})` }"
              ></div>
            </div>
          </b-col>
        </b-row>
      </div>

      <div class="card mt-7">
        <b-row align-v="center" class="m-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">NAMA&nbsp;<span class="required"></span>&nbsp;:</h6>
          </b-col>
          <b-col cols="9">
            <input
              type="text"
              class="form-control form-control-solid"
              v-model="name"
              disabled
            />
          </b-col>
        </b-row>

        <b-row align-v="center" class="mx-5 mb-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">ROLE&nbsp;<span class="required"></span>&nbsp;:</h6>
          </b-col>
          <b-col cols="9">
            <Treeselect
              disabled
              v-model="selectedRoleId"
              :options="listRole"
              node-label-prop="title"
              :multiple="true"
            />
          </b-col>
        </b-row>

        <b-row align-v="center" class="mx-5 mb-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">
              ORGANISASI&nbsp;<span class="required"></span>&nbsp;:
            </h6>
          </b-col>
          <b-col cols="9">
            <input
              type="text"
              class="form-control form-control-solid"
              v-model="organisasi"
              disabled
            />
          </b-col>
        </b-row>

        <b-row align-v="center" class="mx-5 mb-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">
              NOMOR PONSEL&nbsp;<span class="required"></span>&nbsp;:
            </h6>
          </b-col>
          <b-col cols="9">
            <input
              type="text"
              class="form-control form-control-solid"
              v-model="phoneNumber"
              disabled
            />
          </b-col>
        </b-row>

        <b-row align-v="center" class="mx-5 mb-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">
              EMAIL&nbsp;<span class="required"></span>&nbsp;:
            </h6>
          </b-col>
          <b-col cols="7">
            <input
              type="email"
              class="form-control form-control-solid"
              v-model="email"
              disabled
            />
          </b-col>
          <b-col
            cols="2"
            class="d-flex align-items-center justify-content-between"
          >
            <span class="pr-1" v-if="emailVerified === 1">
              <label class="m-0">
                <h6 class="m-0 pl-1">
                  VERIFIED&nbsp;<i
                    class="flaticon2-correct text-primary icon-lg"
                  ></i>
                </h6>
              </label>
            </span>
            <span class="pr-1" v-else>
              <label class="m-0">
                <h6 class="m-0 pl-1">NOT VERIFIED</h6>
              </label>
            </span>
          </b-col>
        </b-row>

        <b-row align-v="center" class="mx-5 mb-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">TELEGRAM ID :</h6>
          </b-col>
          <b-col cols="9">
            <input
              type="text"
              class="form-control form-control-solid"
              v-model="telegramId"
              disabled
            />
          </b-col>
        </b-row>

        <b-row align-v="center" class="mx-5 mb-5" no-gutters>
          <b-col cols="3">
            <h6 class="m-0">TELEGRAM USERNAME :</h6>
          </b-col>
          <b-col cols="7">
            <input
              type="text"
              class="form-control form-control-solid"
              v-model="telegramUname"
              disabled
            />
          </b-col>
          <b-col
            cols="2"
            class="d-flex align-items-center justify-content-between"
          >
            <span class="pr-1" v-if="telegramVerified === 1">
              <label class="m-0">
                <h6 class="m-0 pl-1">
                  VERIFIED&nbsp;<i
                    class="flaticon2-correct text-primary icon-lg"
                  ></i>
                </h6>
              </label>
            </span>
            <span class="pr-1" v-else>
              <label class="m-0">
                <h6 class="m-0 pl-1">NOT VERIFIED</h6>
              </label>
            </span>
          </b-col>
        </b-row>
      </div>
    </form>
  </b-modal>
</template>

<script>
import ApiService from "@/core/services/api.service";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  props: ["idSelected", "isDetail"],
  emits: ["hideDetail"],
  components: {
    Treeselect,
  },
  data() {
    return {
      selectedRoleId: [],
      listRole: [],
      username: "",
      isLdap: "",
      is_active: false,
      name: "",
      role: "",
      organisasi: "",
      phoneNumber: "",
      email: "",
      emailVerified: "",
      password: "",
      cPassword: "",
      telegramId: "",
      telegramUname: "",
      telegramVerified: "",
      options: [
        { value: "1", name: "LDAP" },
        { value: "0", name: "Local" },
      ],
      roleOptions: [],
      viewImage: "",
    };
  },
  watch: {
    isDetail: function () {
      if (this.isDetail == true) {
        this.getOneUser();
        this.getDataRole();
      }
    },
  },
  methods: {
    async getOneUser() {
      await ApiService.get(
        process.env.VUE_APP_ROOT_API_1,
        `administrative/users/${this.idSelected}`
      )
        .then(({ data }) => {
          this.isLdap = data.result.is_ldap;
          this.is_active = data.result.is_active;
          this.username = data.result.username;
          this.viewImage =
            data.result.profile_picture === "null" ||
            data.result.profile_picture === null ||
            data.result.profile_picture === ""
              ? "/media/users/blank.png"
              : process.env.VUE_APP_ROOT_API_1 +
                "-" +
                data.result.profile_picture;
          this.name = data.result.name;
          this.selectedRoleId = data.result.roles.map((item) => {
            return item.id;
          });
          this.organisasi = data.result.organization.name;
          this.phoneNumber =
            data.result.phone_number === "null" ||
            data.result.phone_number === null
              ? "-"
              : data.result.phone_number;
          this.email =
            data.result.email === "null" || data.result.email === null
              ? "-"
              : data.result.email;
          this.emailVerified = data.result.is_email_verified;
          this.telegramId =
            data.result.telegram_id === "null" ||
            data.result.telegram_id === null
              ? "-"
              : data.result.telegram_id;
          this.telegramUname =
            data.result.telegram_username === "null" ||
            data.result.telegram_username === null
              ? "-"
              : data.result.telegram_username;
          this.telegramVerified = data.result.is_telegram_verified;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getDataRole() {
      ApiService.get(`${process.env.VUE_APP_ROOT_API_3}/roles`).then(
        ({ data }) => {
          this.listRole = data.result.roles.map((item) => ({
            id: item.id,
            label: item.title,
          }));
        }
      );
    },
    closeDetail() {
      this.$emit("hideDetail");
    },
  },
};
</script>

<style scoped>
.imagePreviewWrapper {
  width: 150px;
  height: 150px;
  display: block;
  margin: 0 0 20px 0;
  background-size: cover;
  background-position: center center;
}

/* switch icon */
.switch input:empty ~ span:before {
  background-color: #afb2c7;
}
</style>
