import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/core/services/store";
import ApiService from "@/core/services/api.service";
// import MockService from "@/core/mock/mock.service";
import { VERIFY_AUTH } from "@/core/services/store/auth.module";
import { RESET_LAYOUT_CONFIG } from "@/core/services/store/config.module";
import VueFullscreen from "vue-fullscreen";
import axios from "axios";
import Swal from "sweetalert2";
import { jsPDF } from "jspdf";

Vue.config.productionTip = false;
Vue.use(VueFullscreen);

Vue.mixin({
  data() {
    return {
      listPermission: this.getReturnRolePermissions(),
      formulaMasters: [
        {
          table: "m_tanks",
          columns: [
            "tank_heigth",
            "tank_length",
            "tank_wide",
            "tank_capacity",
            "power",
            "fuel_consumption",
            "engine_capacity",
          ],
        },
      ],
    };
  },
  beforeDestroy() {
    document.title = `New Osase`;
  },
  methods: {
    writeNewTitle(page) {
      document.title = `New Osase | ${page}`;
    },
    getReturnRolePermissions() {
      if (localStorage.getItem("user_permissions")) {
        let nameRoles = [];
        let roles = JSON.parse(localStorage.getItem("user_permissions"));
        roles.forEach((role) => {
          nameRoles.push(role.toLowerCase());
        });
        return nameRoles;
      }
    },
    checkPermissionReturn(perm) {
      if (!this.listPermission) {
        return false;
      }

      if (this.listPermission.includes(perm.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    },
    checkPermission(name, textError) {
      if (!this.listPermission.includes(name.toLowerCase())) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: textError,
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            router.push({ name: "MapView" }).catch(() => {});
          }
        });
      }
    },
    ExportToExcelFromMixin(filename, id) {
      var downloadLink;
      var dataType = "application/vnd.ms-excel";
      var tableSelect = document.getElementById(id);
      var tableHTML = tableSelect.outerHTML.replace(/ |#/g, (x) => {
        return x == "#" ? "No" : "%20";
      });
      // Specify file name
      filename = filename ? filename + ".xls" : "excel_data.xls";
      // Create download link element
      downloadLink = document.createElement("a");
      document.body.appendChild(downloadLink);
      if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob(["\ufeff", tableHTML], {
          type: dataType,
        });
        navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        // Create a link to the file
        downloadLink.href = "data:" + dataType + ", " + tableHTML;
        // Setting the file name
        downloadLink.download = filename;
        //triggering the function
        downloadLink.click();
      }
    },
    upperCaseFirstChart(text) {
      return text[0].toUpperCase() + text.substring(1);
    },
    generatePdf(name, idTable) {
      // var doc = new jsPDF();
      let doc = new jsPDF("l", "pt", [window.innerWidth, window.innerHeight]);

      let handleElement = {
        // eslint-disable-next-line no-unused-vars
        "#editor": function (element, renderer) {
          return true;
        },
      };

      const table = document.getElementById(idTable);
      doc.html(table, {
        x: 40,
        y: 20,
        height: window.innerHeight + 20,
        elementHandlers: handleElement,
        callback: function (doc) {
          doc.save(`${name}.pdf`);
        },
      });
    },
  },
});

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      if (error.response.status === 401) {
        if (error.response.data.message == "Unauthorized") {
          if (error.response.data.result.isTokenExpired == true) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Sesi login anda sudah berakhir. Silahkan lakukan login ulang",
            });
            localStorage.clear();
            router.push({ name: "login" }).catch(() => {});
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Anda tidak boleh mengakses halaman ini.",
            });
            router.push({ name: "MapView" }).catch(() => {});
          }
        }
      }
    }
    return Promise.reject(error);
  }
);

// Global 3rd party plugins
import "popper.js";
import "tooltip.js";
import PerfectScrollbar from "perfect-scrollbar";
window.PerfectScrollbar = PerfectScrollbar;
import ClipboardJS from "clipboard";
window.ClipboardJS = ClipboardJS;

// Vue 3rd party plugins
import i18n from "@/core/plugins/vue-i18n";
import vuetify from "@/core/plugins/vuetify";
import "@/core/plugins/portal-vue";
import "@/core/plugins/bootstrap-vue";
import "@/core/plugins/perfect-scrollbar";
import "@/core/plugins/highlight-js";
import "@/core/plugins/inline-svg";
import "@/core/plugins/apexcharts";
import "@/core/plugins/treeselect";
import "@/core/plugins/metronic";
import "@mdi/font/css/materialdesignicons.css";

// API service init
ApiService.init();

// Remove this to disable mock API
// MockService.init();

router.beforeEach((to, from, next) => {
  const isAuth = localStorage.getItem("id_token") !== null;
  // checked to login and register
  if (to.name == "login" || to.name == "register") {
    if (isAuth) {
      next({ name: "MapView" });
    } else {
      next();
    }
  }

  // Ensure we checked auth before each page load.
  Promise.all([store.dispatch(VERIFY_AUTH)]).then(next);

  // reset config to initial state
  store.dispatch(RESET_LAYOUT_CONFIG);

  // Scroll page to top on every route change
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
