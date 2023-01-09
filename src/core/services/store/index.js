import Vue from "vue";
import Vuex from "vuex";

import bbm from "./bbm.module";
import user from "./user.module";
import auth from "./auth.module";
import config from "./config.module";
import storeData from "./data.module";
import mapview from "./mapview.module";
import formula from "./formula.module";
import profile from "./profile.module";
import dashboardTioc from "./tioc.module";
import headTable from "./headTable.module";
import htmlClass from "./htmlclass.module";
import portSensor from "./portSensor.module";
import pagination from "./pagination.module";
import operational from "./operational.module";
import breadcrumbs from "./breadcrumbs.module";
import organization from "./organization.module";
import rtuManagement from "./rtuManagement.module";
import mdRtuMonitoring from "./mdRtuMonitoring.module";
import konfigurasiTangki from "./konfigurasiTangki.modul";
import reportDetailAlarm from "./reportDetailAlarm.module";
import reportSummaryAlarm from "./reportSummaryAlarm.module";
import locationMonitoring from "./locationMonitoring.module";
import reportAvailabilityRtu from "./reportAvailabilityRtu.module";
import rtuManagemenetTemplate from "./rtuManagemenetTemplate.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    bbm,
    auth,
    user,
    config,
    formula,
    mapview,
    profile,
    htmlClass,
    storeData,
    headTable,
    pagination,
    portSensor,
    operational,
    breadcrumbs,
    organization,
    rtuManagement,
    dashboardTioc,
    mdRtuMonitoring,
    konfigurasiTangki,
    reportDetailAlarm,
    reportSummaryAlarm,
    locationMonitoring,
    reportAvailabilityRtu,
    rtuManagemenetTemplate,
  },
});
