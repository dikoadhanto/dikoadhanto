<template>
  <div class="topbar-item">
    <div
      id="kt_quick_user_toggle"
      class="btn btn-icon btn-hover-transparent-white d-flex align-items-center btn-lg px-md-2 w-md-auto"
    >
      <span
        class="text-white opacity-70 font-weight-bold font-size-base d-none d-md-inline mr-1"
      >
        Hi,
      </span>
      <span
        class="text-white opacity-90 font-weight-bolder font-size-base d-none d-md-inline mr-4"
      >
        {{ userProfile.name }}
      </span>
      <span class="symbol symbol-35">
        <span
          class="symbol-label text-white font-size-h5 font-weight-bold bg-white-o-30"
        >
          {{ getFirstString() }}
        </span>
      </span>
    </div>

    <div
      id="kt_quick_user"
      ref="kt_quick_user"
      class="offcanvas offcanvas-right p-10"
    >
      <!--begin::Header-->
      <div
        class="offcanvas-header d-flex align-items-center justify-content-between pb-5"
      >
        <h3 class="font-weight-bold m-0">
          <!-- User Profile -->
          <!-- <small class="text-muted font-size-sm ml-2">12 messages</small> -->
        </h3>
        <a
          href="#"
          class="btn btn-xs btn-icon btn-light btn-hover-primary"
          id="kt_quick_user_close"
        >
          <i class="ki ki-close icon-xs text-muted"></i>
        </a>
      </div>
      <!--end::Header-->

      <!--begin::Content-->
      <perfect-scrollbar
        class="offcanvas-content pr-5 mr-n5 scroll"
        style="max-height: 90vh; position: relative"
      >
        <!--begin::Header-->
        <div class="d-flex align-items-center mt-5">
          <div class="symbol symbol-100 mr-5">
            <img class="symbol-label" :src="picture" alt="" />
            <i class="symbol-badge bg-success"></i>
          </div>
          <div class="d-flex flex-column">
            <a
              href="#"
              class="font-weight-bold font-size-h5 text-dark-75 text-hover-primary"
            >
              {{ userProfile.name }}
            </a>
            <div class="text-muted mt-1">{{ userProfile.title }}</div>
            <div class="navi mt-2">
              <a href="#" class="navi-item">
                <span class="navi-link p-0 pb-2">
                  <span class="navi-icon mr-1">
                    <span class="svg-icon svg-icon-lg svg-icon-primary">
                      <!--begin::Svg Icon-->
                      <inline-svg
                        src="media/svg/icons/Communication/Mail-notification.svg"
                      />
                      <!--end::Svg Icon-->
                    </span>
                  </span>
                  <!-- <span class="navi-text text-muted text-hover-primary">
                    jm@softplus.com
                  </span> -->
                </span>
              </a>
            </div>
            <button class="btn btn-light-primary btn-bold" @click="onLogout">
              Sign out
            </button>
          </div>
        </div>
        <!--end::Header-->
        <div class="separator separator-dashed mt-8 mb-5"></div>
        <!--begin::Nav-->
        <!-- <div class="navi navi-spacer-x-0 p-0"> -->
        <!--begin::Item-->
        <!-- <router-link
            to="/builder"
            @click.native="closeOffcanvas"
            href="#"
            class="navi-item"
          > -->
        <!-- <div class="navi-link">
              <div class="symbol symbol-40 bg-light mr-3">
                <div class="symbol-label">
                  <span class="svg-icon svg-icon-md svg-icon-success"> -->
        <!--begin::Svg Icon-->
        <!-- <inline-svg
                      src="media/svg/icons/General/Notification2.svg"
                    /> -->
        <!--end::Svg Icon-->
        <!-- </span>
                </div>
              </div>
              <div class="navi-text">
                <div class="font-weight-bold">My Profile</div>
                <div class="text-muted">
                  Account settings and more
                  <span
                    class="label label-light-danger label-inline font-weight-bold"
                  >
                    update
                  </span>
                </div>
              </div>
            </div>
          </router-link> -->
        <!--end:Item-->
        <!--begin::Item-->
        <!-- <router-link
            to="/builder"
            @click.native="closeOffcanvas"
            href="#"
            class="navi-item"
          >
            <div class="navi-link">
              <div class="symbol symbol-40 bg-light mr-3">
                <div class="symbol-label">
                  <span class="svg-icon svg-icon-md svg-icon-warning"> -->
        <!--begin::Svg Icon-->
        <!-- <inline-svg src="media/svg/icons/Shopping/Chart-bar1.svg" /> -->
        <!--end::Svg Icon-->
        <!-- </span>
                </div>
              </div>
              <div class="navi-text">
                <div class="font-weight-bold">My Messages</div>
                <div class="text-muted">Inbox and tasks</div>
              </div>
            </div>
          </router-link> -->
        <!--end:Item-->
        <!--begin::Item-->
        <!-- <router-link
            to="/builder"
            @click.native="closeOffcanvas"
            href="#"
            class="navi-item"
          >
            <div class="navi-link">
              <div class="symbol symbol-40 bg-light mr-3">
                <div class="symbol-label">
                  <span class="svg-icon svg-icon-md svg-icon-danger"> -->
        <!--begin::Svg Icon-->
        <!-- <inline-svg src="media/svg/icons/Files/Selected-file.svg" /> -->
        <!--end::Svg Icon-->
        <!-- </span>
                </div>
              </div>
              <div class="navi-text">
                <div class="font-weight-bold">My Activities</div>
                <div class="text-muted">Logs and notifications</div>
              </div>
            </div>
          </router-link> -->
        <!--end:Item-->
        <!--begin::Item-->
        <!-- <router-link
            to="/builder"
            @click.native="closeOffcanvas"
            href="#"
            class="navi-item"
          >
            <div class="navi-link">
              <div class="symbol symbol-40 bg-light mr-3">
                <div class="symbol-label">
                  <span class="svg-icon svg-icon-md svg-icon-primary"> -->
        <!--begin::Svg Icon-->
        <!-- <inline-svg
                      src="media/svg/icons/Communication/Mail-opened.svg"
                    /> -->
        <!--end::Svg Icon-->
        <!-- </span>
                </div>
              </div>
              <div class="navi-text">
                <div class="font-weight-bold">My Tasks</div>
                <div class="text-muted">latest tasks and projects</div>
              </div>
            </div>
          </router-link> -->
        <!--end:Item-->
        <!-- </div> -->
        <!--end::Nav-->
        <!-- <div class="separator separator-dashed my-7"></div> -->
        <!--begin::Notifications-->
        <div>
          <!--begin:Heading-->
          <h5 class="mb-5">Recent Notifications</h5>
          <!-- end:Heading -->
          <template v-for="(item, i) in list">
            <!--begin::Item -->
            <div
              class="d-flex align-items-center rounded p-5 gutter-b"
              v-bind:class="`bg-light-success`"
              v-bind:key="i"
            >
              <!-- <span
                class="svg-icon mr-5"
                v-bind:class="`svg-icon-${item.type}`"
              >
                <span class="svg-icon svg-icon-lg"> -->
              <!--begin::Svg Icon-->
              <!-- <inline-svg :src="item.svg" /> -->
              <!--end::Svg Icon-->
              <!-- </span>
              </span> -->
              <div class="d-flex flex-column flex-grow-1 mr-2">
                <div
                  class="font-weight-bolder text-dark-75 text-hover-primary font-size-lg mb-1"
                >
                  {{ item.title }}
                </div>
                <span class="text-muted font-size-sm">
                  {{ item.detail }}
                </span>
                <span class="font-size-sm">
                  {{ changeTimeUpdate(item.clock) }}
                </span>
              </div>
              <!-- <span
                class="font-weight-bolder py-1 font-size-lg"
                v-bind:class="`text-${item.type}`"
              >
                {{ item.alt }}
              </span> -->
            </div>
            <!--end::Item -->
          </template>
          <template v-if="list.length == 0">
            <div
              class="d-flex align-items-center rounded p-5 gutter-b"
              v-bind:class="`bg-light-warning`"
            >
              <div class="d-flex flex-column flex-grow-1 mr-2">
                <div
                  class="font-weight-bolder text-dark-75 text-hover-primary font-size-lg mb-1"
                >
                  Tidak ada data notifikasi.
                </div>
              </div>
            </div>
          </template>
        </div>
        <!--end::Notifications-->
      </perfect-scrollbar>
      <!--end::Content-->
    </div>
  </div>
</template>

<style lang="scss" scoped>
#kt_quick_user {
  overflow: hidden;
}
</style>

<script>
import Swal from "sweetalert2";
import ApiService from "@/core/services/api.service";
import { LOGOUT } from "@/core/services/store/auth.module";
import KTLayoutQuickUser from "@/assets/js/layout/extended/quick-user.js";
import KTOffcanvas from "@/assets/js/components/offcanvas.js";

export default {
  name: "KTQuickUser",
  data() {
    return {
      userProfile: {
        name: "",
        title: "",
      },
      list: [],
    };
  },
  mounted() {
    // Init Quick User Panel
    KTLayoutQuickUser.init(this.$refs["kt_quick_user"]);
    this.userProfile.name = localStorage.getItem("user_name");
    this.userProfile.title = localStorage.getItem("user_title");

    this.getDataNotification();
  },
  methods: {
    getDataNotification() {
      ApiService.query(
        `${process.env.VUE_APP_ROOT_API_1}/notification?limit=all`
      )
        .then(({ data }) => {
          this.list = data.result.payload;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    changeTimeUpdate(date) {
      if (!date) {
        return "-";
      } else {
        date = Number(date);
        let newDate = new Date(date);
        let day = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        let hours = newDate.getHours();
        let minutes = newDate.getMinutes();
        let seconds = newDate.getSeconds();
        let timezone = "";
        let offset = -(newDate.getTimezoneOffset() / 60);
        switch (offset) {
          case 7:
            timezone = "WIB";
            break;
          case 8:
            timezone = "WITA";
            break;
          case 9:
            timezone = "WIT";
            break;
          default:
            timezone = "";
        }
        let fixDate = `${day}/${month}/${year} : ${hours}:${minutes}:${seconds} ${timezone}`;
        return fixDate;
      }
    },
    onLogout() {
      Swal.fire({
        title: `Anda yakin ingin sign out?`,
        showCancelButton: true,
        cancelButtonText: "Batal",
        confirmButtonColor: "#c70000",
        confirmButtonText: "Sign Out",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await ApiService.delete(
              `${process.env.VUE_APP_ROOT_API_1}/users/logout`
            );
            this.$store.dispatch(LOGOUT);
            this.$router.push({ name: "login" });
          } catch (error) {
            console.log(error, "error logout ..");
          }
        }
      });
    },
    closeOffcanvas() {
      new KTOffcanvas(KTLayoutQuickUser.getElement()).hide();
    },
    getFirstString() {
      return this.userProfile.name[0];
    },
  },
  computed: {
    picture() {
      return process.env.BASE_URL + "media/users/300_21.jpg";
    },
  },
};
</script>
