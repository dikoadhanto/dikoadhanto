import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
export default new Router({
  mode: "history",
  base: "/new",
  routes: [
    {
      path: "/",
      component: () => import("@/view/layout/Layout"),
      children: [
        // -------------------------------------------------
        // dashboard - map view
        // -------------------------------------------------
        {
          path: "",
          name: "MapView Default",
          component: () => import("@/view/pages/MapView/MapView2.vue"),
        },
        {
          path: "dashboard/map-view",
          name: "MapView",
          component: () => import("@/view/pages/MapView/MapView2.vue"),
        },
        {
          path: "dashboard/table-view/:idRtu",
          name: "TableView",
          component: () =>
            import("@/view/pages/dashboard/table-view/TableView.vue"),
        },

        // -------------------------------------------------
        // dashboard - operational
        // -------------------------------------------------
        {
          path: "dashboard/operational",
          name: "Operational",
          component: () =>
            import("@/view/pages/dashboard/operational/Operational.vue"),
        },
        {
          path: "dashboard/operational/detail-rtu/:idRtu",
          name: "Detail RTU",
          component: () =>
            import("@/view/pages/dashboard/operational/DetailRtu.vue"),
        },
        {
          path: "dashboard/operational/detail-rtu-secondary/:idRtu",
          name: "Detail RTU Secondary",
          component: () =>
            import("@/view/pages/dashboard/operational/DetailRtu2.vue"),
        },

        // -------------------------------------------------
        // dashboard - port sensor table
        // -------------------------------------------------
        {
          path: "dashboard/port-sensor",
          name: "Port Sensor",
          component: () =>
            import("@/view/pages/dashboard/port-sensor/PortSensor.vue"),
        },

        // -------------------------------------------------
        // dashboard - location monitoring table pagination from database
        // -------------------------------------------------
        {
          path: "dashboard/dashboard-view",
          name: "DashboardView",
          component: () =>
            import("@/view/pages/dashboard/dashboard-view/DashboardView.vue"),
        },

        // -------------------------------------------------
        // dashboard - location monitoring table paginatino from front end
        // -------------------------------------------------
        {
          path: "dashboard/location-monitoring-table",
          name: "Location Monitoring Table",
          component: () =>
            import(
              "@/view/pages/dashboard/dashboard-view/LocationMonitoringTable.vue"
            ),
        },

        // -------------------------------------------------
        // dashbord - tioc
        // -------------------------------------------------
        {
          path: "dashboard/dashboard-tioc",
          name: "DashboardTioc",
          component: () =>
            import("@/view/pages/dashboard/dashboard-tioc/DashboardTioc.vue"),
        },
        {
          path: "dashboard/dashboard-tioc/detail-total",
          name: "Detail Tioc Table Total",
          component: () =>
            import(
              "@/view/pages/dashboard/dashboard-tioc/detail/table/TableTotal.vue"
            ),
        },
        {
          path: "dashboard/dashboard-tioc/detail-vac",
          name: "Detail Tioc Table Vac",
          component: () =>
            import(
              "@/view/pages/dashboard/dashboard-tioc/detail/table/TableVac.vue"
            ),
        },
        {
          path: "dashboard/dashboard-tioc/detail/table-view/:idRtu",
          name: "Table View Dashboard Tioc",
          component: () =>
            import(
              "@/view/pages/dashboard/dashboard-tioc/detail/view-rtu/TableRtu.vue"
            ),
        },

        // -------------------------------------------------
        // dashboard - bbm monitoring
        // -------------------------------------------------
        {
          path: "dashboard/BBM_nasional",
          name: "BBM Nasional",
          component: () => import("@/view/pages/BBM/BbmNasional.vue"),
        },
        {
          path: "dashboard/BBM_regional",
          name: "BBM Regional",
          component: () => import("@/view/pages/BBM/BbmRegional.vue"),
        },
        {
          path: "dashboard/BBM_witel",
          name: "BBM Witel",
          component: () => import("@/view/pages/BBM/BbmWitel.vue"),
        },

        // -------------------------------------------------
        // dashboard - bbm monitoring secondary
        // -------------------------------------------------
        {
          path: "dashboard/bbm-monitoring",
          name: "BBM Monitoring",
          component: () =>
            import("@/view/pages/dashboard/bbm-monitoring/BbmMonitoring.vue"),
        },

        // -------------------------------------------------
        // dashboard - md rtu monitoring
        // -------------------------------------------------
        {
          path: "dashboard/md-rtu-monitoring",
          name: "MdRtuMonitoring",
          component: () =>
            import(
              "@/view/pages/dashboard/md-rtu-monitoring/MdRtuMonitoring.vue"
            ),
        },

        // -------------------------------------------------
        // dashbord - ip rectifier link
        // -------------------------------------------------
        {
          path: "dashboard/ip-rectifier-link",
          name: "IpRectifierLink",
          component: () =>
            import(
              "@/view/pages/dashboard/ip-rectifier-link/IpRectifierLink.vue"
            ),
        },

        // -------------------------------------------------
        // reporting - reporting availability rtu
        // -------------------------------------------------
        {
          path: "reporting/reporting-availability-rtu",
          name: "ReportingAvailabilityRtu",
          component: () =>
            import(
              "./view/pages/reporting/reporting-availability-rtu/ReportingAvailabilityRtu.vue"
            ),
        },
        {
          path: "reporting/reporting-availability-rtu/rtu-down",
          name: "RTU Down Availability",
          component: () =>
            import(
              "./view/pages/reporting/reporting-availability-rtu/TableRtuDown.vue"
            ),
        },
        {
          path: "reporting/reporting-availability/table-total-alert/:typeAlert/:idTotalAlert/:selectTotalAlert",
          name: "TotalAlert",
          component: () =>
            import(
              "./view/pages/reporting/reporting-availability-rtu/TotalAlertRTUMD.vue"
            ),
        },
        {
          path: "reporting/reporting-availability/detail-rtu/:idRTU",
          name: "AvailabilityDetailRTU",
          component: () =>
            import(
              "./view/pages/reporting/reporting-availability-rtu/detail-rtu-availability/DetailRTUAvailability.vue"
            ),
        },

        // -------------------------------------------------
        // reporting - reporting summary alarm
        // -------------------------------------------------
        {
          path: "reporting/reporting-summary-alarm",
          name: "ReportingSummaryAlarm",
          component: () =>
            import(
              "@/view/pages/reporting/reporting-summary-alarm/ReportingSummaryAlarm.vue"
            ),
        },

        // -------------------------------------------------
        // reporting - reporting detail alarm
        // -------------------------------------------------
        {
          path: "reporting/reporting-detail-alarm",
          name: "ReportingDetailAlarm",
          component: () =>
            import(
              "@/view/pages/reporting/reporting-detail-alarm/ReportingDetailAlarm.vue"
            ),
        },

        // -------------------------------------------------
        // parameter - rrd management
        // -------------------------------------------------
        {
          path: "parameter/rrd-management",
          name: "RRDList",
          component: () => import("@/view/pages/Parameter/Rrd/RrdList.vue"),
        },

        // -------------------------------------------------
        // parameter - md management
        // -------------------------------------------------
        {
          path: "parameter/md-management",
          name: "mDList",
          component: () => import("@/view/pages/Parameter/Md/MdList.vue"),
        },

        // -------------------------------------------------
        // parameter - rtu management
        // -------------------------------------------------
        {
          path: "parameter/rtu-management",
          name: "RtuList",
          component: () => import("@/view/pages/Parameter/Rtu/RtuList.vue"),
        },
        {
          path: "parameter/rtu-management-new",
          name: "TableContainnerRtu2",
          component: () =>
            import("@/view/pages/Parameter/Rtu/RtuListSecondary.vue"),
        },
        {
          path: "parameter/rtu-management-new/rtu-port/:id",
          name: "RtuPort",
          props: { rtuName: "" },
          component: () => import("@/view/pages/Parameter/Rtu/RtuPort.vue"),
        },
        {
          path: "parameter/rtu-management/add-rtu",
          name: "AddRtu",
          component: () => import("@/view/pages/Parameter/Rtu/AddRtu.vue"),
        },
        {
          path: "parameter/rtu-management/add-rtu-new",
          name: "AddRtu2",
          component: () =>
            import("@/view/pages/Parameter/Rtu/AddRtuSecondary.vue"),
        },
        {
          path: "parameter/rtu-management/update-rtu",
          name: "UpdateRtu",
          component: () => import("@/view/pages/Parameter/Rtu/UpdateRtu.vue"),
        },
        {
          path: "parameter/rtu-management/update-rtu-new/:idSelected",
          name: "UpdateRtu2",
          component: () =>
            import("@/view/pages/Parameter/Rtu/UpdateRtuSecondary.vue"),
        },
        {
          path: "parameter/rtu-management/literal-template",
          name: "Literal Template",
          component: () =>
            import("@/view/pages/Parameter/Rtu/LiteralTemplate.vue"),
        },

        // -------------------------------------------------
        // parameter - port type management
        // -------------------------------------------------
        {
          path: "parameter/port-type-management",
          name: "PortList",
          component: () => import("@/view/pages/Parameter/Port/PortList.vue"),
        },
        {
          path: "parameter/port-type-management-add-port",
          name: "AddPort",
          component: () => import("@/view/pages/Parameter/Port/AddPort.vue"),
        },
        {
          path: "parameter/port-type-management-update-port",
          name: "UpdatePort",
          component: () => import("@/view/pages/Parameter/Port/UpdatePort.vue"),
        },

        // -------------------------------------------------
        // parameter - bbm tank management
        // -------------------------------------------------
        {
          path: "parameter/bbm-tank-management",
          name: "BBMTankList",
          component: () =>
            import("@/view/pages/Parameter/BBMTank/BBMTankList.vue"),
        },

        // -------------------------------------------------
        // parameter - bbm pricing
        // -------------------------------------------------
        {
          path: "parameter/bbm-pricing",
          name: "BBMPricingList",
          component: () =>
            import("@/view/pages/Parameter/BBMPricing/BBMPricingList.vue"),
        },

        // -------------------------------------------------
        // parameter - ip rectifier
        // -------------------------------------------------
        {
          path: "parameter/ip-rectifier",
          name: "IPRectifierList",
          component: () =>
            import("@/view/pages/Parameter/IPRectifier/IPRectifierList.vue"),
        },

        // -------------------------------------------------
        // parameter - formula management
        // -------------------------------------------------
        {
          path: "parameter/formula-management",
          name: "FormulaList",
          component: () =>
            import("@/view/pages/Parameter/Formula/FormulaList.vue"),
        },
        {
          path: "parameter/formula-management/add-formula",
          name: "AddFormula",
          component: () =>
            import("@/view/pages/Parameter/Formula/AddFormula.vue"),
        },
        {
          path: "parameter/formula-management/update-formula/:idSelected",
          name: "UpdateFormula",
          component: () =>
            import("@/view/pages/Parameter/Formula/UpdateFormula.vue"),
        },
        {
          path: "parameter/formula-management/list-link-formula",
          name: "List Link Formula",
          component: () =>
            import("@/view/pages/Parameter/Formula/ListFormulaRtuLink.vue"),
        },
        {
          path: "parameter/formula-management/add-link-formula",
          name: "Add Link Formula",
          component: () =>
            import("@/view/pages/Parameter/Formula/AddFormulaRtuLink.vue"),
        },
        // -------------------------------------------------
        // parameter - formula v2 management
        // -------------------------------------------------
        {
          path: "parameter/formula-v2-management",
          name: "FormulaV2List",
          component: () => import("@/view/pages/Parameter/FormulaV2/index.vue"),
        },
        {
          path: "parameter/formula-v2-management/add-formula",
          name: "AddFormulaV2",
          component: () =>
            import("@/view/pages/Parameter/FormulaV2/create.vue"),
        },
        {
          path: "parameter/formula-v2-management/:formulaId/update",
          name: "UpdateFormulaV2",
          component: () =>
            import("@/view/pages/Parameter/FormulaV2/update.vue"),
        },
        {
          path: "parameter/formula-v2-management/:formulaId/rtu",
          name: "ListRtuFormulaV2",
          component: () =>
            import("@/view/pages/Parameter/FormulaV2/rtu/index.vue"),
        },
        {
          path: "parameter/formula-v2-management/:formulaId/rtu/create",
          name: "AddRtuFormulaV2",
          component: () =>
            import("@/view/pages/Parameter/FormulaV2/rtu/create.vue"),
        },

        // -------------------------------------------------
        // parameter - tags management
        // -------------------------------------------------
        {
          path: "parameter/tags-management",
          name: "Tags",
          component: () => import("@/view/pages/Parameter/tags/Tags.vue"),
        },

        // -------------------------------------------------
        // parameter - alert management
        // -------------------------------------------------
        {
          path: "parameter/alert-management",
          name: "AlertList",
          component: () => import("@/view/pages/Parameter/Alert/AlertList.vue"),
        },

        // -------------------------------------------------
        // administrative - user
        // -------------------------------------------------
        {
          path: "administrative/user",
          name: "User",
          component: () => import("@/view/pages/Administrative/user/User.vue"),
        },

        // -------------------------------------------------
        // administrative - organisasi v1
        // -------------------------------------------------
        {
          path: "administrative/organisasi",
          name: "Organisasi",
          component: () =>
            import("@/view/pages/Administrative/organisasi/Organisasi.vue"),
        },

        // -------------------------------------------------
        // administrative - organisasi v2
        // -------------------------------------------------
        {
          path: "administrative/organisasi/list",
          name: "List Organisasi",
          component: () =>
            import("@/view/pages/Administrative/organisasi/ListOrganisasi.vue"),
        },

        // -------------------------------------------------
        // administrative - role
        // -------------------------------------------------
        {
          path: "administrative/role",
          name: "Role",
          component: () =>
            import("@/view/pages/Administrative/role/ListRole.vue"),
        },
        {
          path: "administrative/role-permission/:idRole",
          name: "Role Permission",
          component: () =>
            import("@/view/pages/Administrative/role/ListPermission.vue"),
        },

        // -------------------------------------------------
        // administrative - location
        // -------------------------------------------------
        {
          path: "administrative/location",
          name: "Location",
          component: () =>
            import("@/view/pages/Administrative/location/Location.vue"),
        },

        // -------------------------------------------------
        // administrative - permission
        // -------------------------------------------------
        {
          path: "administrative/permission",
          name: "Permission",
          component: () =>
            import("@/view/pages/Administrative/permission/ListPermission.vue"),
        },

        // -------------------------------------------------
        // administrative - telegram
        // -------------------------------------------------
        {
          path: "administrative/telegram",
          name: "telegram",
          component: () =>
            import(
              "@/view/pages/Administrative/telegram/ListTelegramGroup.vue"
            ),
        },

        // -------------------------------------------------
        // administrative - api
        // -------------------------------------------------
        {
          path: "administrative/api",
          name: "api",
          component: () =>
            import("@/view/pages/Administrative/api/ListApi.vue"),
        },

        // -------------------------------------------------
        // administrative - notification
        // -------------------------------------------------
        {
          path: "administrative/notification",
          name: "notification",
          component: () =>
            import(
              "@/view/pages/Administrative/notification/ListNotification.vue"
            ),
        },
      ],
    },

    // login page
    {
      path: "/login",
      name: "login",
      component: () => import("@/view/pages/auth/Login.vue"),
    },

    // register page
    {
      path: "/register",
      name: "register",
      component: () => import("@/view/pages/auth/Register.vue"),
    },

    // forget password page
    {
      path: "/forget-password",
      name: "forget-password",
      component: () => import("@/view/pages/auth/ForgetPassword.vue"),
    },

    // change password page
    {
      path: "/resetpassword/:token",
      name: "resetpassword",
      component: () => import("@/view/pages/auth/ChangePassword.vue"),
    },

    // verification email page
    {
      path: "/verify/email/:token",
      name: "verification-email",
      component: () => import("@/view/pages/auth/VerificationEmail.vue"),
    },

    // error page
    {
      path: "*",
      redirect: "/404",
    },
    {
      // the 404 route, when none of the above matches
      path: "/404",
      name: "404",
      component: () => import("@/view/pages/error/Error-2.vue"),
    },
  ],
});
