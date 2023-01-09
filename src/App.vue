<template>
  <router-view></router-view>
</template>

<style lang="scss">
// 3rd party plugins css
@import "~bootstrap-vue/dist/bootstrap-vue.css";
@import "~perfect-scrollbar/css/perfect-scrollbar.css";
@import "~socicon/css/socicon.css";
@import "~animate.css";
@import "~@fortawesome/fontawesome-free/css/all.css";
@import "~line-awesome/dist/line-awesome/css/line-awesome.css";
@import "assets/plugins/flaticon/flaticon.css";
@import "assets/plugins/flaticon2/flaticon.css";
@import "assets/plugins/keenthemes-icons/font/ki.css";

// Main demo style scss
@import "assets/sass/style.vue";

// Check documentation for RTL css
// Update HTML with RTL attribute at public/index.html
/*@import "assets/css/style.vue.rtl";*/
</style>

<script>
import { OVERRIDE_LAYOUT_CONFIG } from "@/core/services/store/config.module";

export default {
  name: "MetronicVue",
  mounted() {
    /**
     * this is to override the layout config using saved data from localStorage
     * remove this to use config only from static json (@/core/config/layout.config.json)
     */
    this.$store.dispatch(OVERRIDE_LAYOUT_CONFIG);
  },
};
</script>

<style>
/* pagination */
.wrap-pagination {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
.info-page {
  font-size: 10px;
}
/* all icon */
.icon-list,
.icon-view,
.icon-add,
.icon-edit,
.icon-delete {
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid transparent;
  color: #ffffff !important;
}

.icon-list:hover,
.icon-view:hover,
.icon-add:hover,
.icon-edit:hover,
.icon-delete:hover {
  color: #ffffff !important;
  border: 1px solid transparent;
}

.icon-list {
  background-color: #f5a700 !important;
}

.icon-list:hover {
  background-color: #db9500 !important;
}

.icon-view {
  background-color: #139ae9 !important;
}

/* hover icon view */
.icon-view:hover {
  background-color: #177db8 !important;
}

.icon-add {
  background-color: #ffa200 !important;
}

/* hover icon add */
.icon-add:hover {
  background-color: #db8f01 !important;
}

.icon-edit {
  background-color: #01b652 !important;
}

/* hover icon edit */
.icon-edit:hover {
  background-color: #009c46 !important;
}

.icon-delete {
  background-color: #f10000 !important;
}

/* hover icon delete */
.icon-delete:hover {
  background-color: #bb0000 !important;
}

.clickable {
  cursor: pointer;
}

.clickable:hover {
  color: #0374ff;
}

.clickable:active {
  color: #005cccc9;
}
</style>
