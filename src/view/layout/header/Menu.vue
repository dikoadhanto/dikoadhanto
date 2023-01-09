<template>
  <div>
    <ul class="menu-nav">
      <!-- dashboard -->
      <li class="current">
        <b-dropdown
          :class="[hasActiveChildren('dashboard') && 'active']"
          class="parent-link"
          size="sm"
          variant="link"
          :toggle-class="[
            isScroll ? 'text-dark' : 'text-white',
            'btn text-decoration-none btn-md font-weight-bolder px-5',
            { 'btn-hover-transparent-white': !hasActiveChildren('dashboard') },
          ]"
          no-caret
          no-flip
          text="Dashboard"
        >
          <!--begin::Navigation-->
          <div class="navi navi-hover min-w-md-250px">
            <b-dropdown-item>
              <router-link to="/dashboard/map-view" active-class="active">
                <div
                  :class="{ active: hasActiveChildren('map-view') }"
                  class="navi-link"
                >
                  <li class="d-flex align-items-center">Map View</li>
                </div>
              </router-link>
            </b-dropdown-item>

            <!-- RTU Operation (Operational) -->
            <b-dropdown-item>
              <router-link
                to="/dashboard/operational"
                v-if="checkPermissionReturn('dashboard_rtu_operation')"
              >
                <div
                  class="navi-link"
                  :class="{ active: hasActiveChildren('operational') }"
                >
                  <li class="d-flex align-items-center">RTU Operation</li>
                </div>
              </router-link>
            </b-dropdown-item>

            <!-- Port Sensor Table -->
            <b-dropdown-item>
              <router-link
                to="/dashboard/port-sensor"
                v-if="checkPermissionReturn('dashboard_port_sensor_table')"
              >
                <div
                  class="navi-link"
                  :class="{ active: hasActiveChildren('port-sensor') }"
                >
                  <li class="d-flex align-items-center">Port Sensor Table</li>
                </div>
              </router-link>
            </b-dropdown-item>

            <!-- Location Monitoring Table (Dashboard View) -->
            <b-dropdown-item>
              <router-link
                to="/dashboard/location-monitoring-table"
                v-if="checkPermissionReturn('dashboard_location_monitoring')"
              >
                <div
                  class="navi-link"
                  :class="{
                    active: hasActiveChildren('location-monitoring-table'),
                  }"
                >
                  <li class="d-flex align-items-center">
                    Location Monitoring Table
                  </li>
                </div>
              </router-link>
            </b-dropdown-item>

            <!-- TIOC (Dashboard TIOC) -->
            <b-dropdown-item>
              <router-link
                to="/dashboard/dashboard-tioc"
                v-if="checkPermissionReturn('dashboard_tioc')"
              >
                <div
                  class="navi-link"
                  :class="{ active: hasActiveChildren('dashboard-tioc') }"
                >
                  <li class="d-flex align-items-center">TIOC</li>
                </div>
              </router-link>
            </b-dropdown-item>

            <!-- BBM Monitoring (Monitoring BBM) -->
            <b-dropdown-item>
              <router-link
                v-if="checkPermissionReturn('dashboard_bbm')"
                to="/dashboard/bbm-monitoring"
              >
                <div
                  class="navi-link"
                  :class="{ active: hasActiveChildren('bbm-monitoring') }"
                >
                  <li class="d-flex align-items-center">BBM Monitoring</li>
                </div>
              </router-link>
            </b-dropdown-item>

            <!-- MD & RTU Monitoring -->
            <b-dropdown-item>
              <router-link
                to="/dashboard/md-rtu-monitoring"
                v-if="checkPermissionReturn('dashboard_md_rtu_monitoring')"
              >
                <div
                  class="navi-link"
                  :class="{ active: hasActiveChildren('md-rtu-monitoring') }"
                >
                  <li class="d-flex align-items-center">MD & RTU Monitoring</li>
                </div>
              </router-link>
            </b-dropdown-item>

            <!-- IP Rectifier Link -->
            <b-dropdown-item>
              <router-link
                to="/dashboard/ip-rectifier-link"
                v-if="checkPermissionReturn('dashboard_ip_rectifier_link')"
              >
                <div
                  class="navi-link"
                  :class="{ active: hasActiveChildren('ip-rectifier-link') }"
                >
                  <li class="d-flex align-items-center">IP Rectifier Link</li>
                </div>
              </router-link>
            </b-dropdown-item>
          </div>
          <!--end::Navigation-->
        </b-dropdown>
      </li>

      <!-- reporting -->
      <li>
        <b-dropdown
          v-if="checkPermissionReturn('reporting')"
          :class="[hasActiveChildren('reporting') && 'active']"
          class="parent-link"
          size="sm"
          variant="link"
          :toggle-class="[
            isScroll ? 'text-dark' : 'text-white',
            'btn text-decoration-none btn-md font-weight-bolder px-5',
            { 'btn-hover-transparent-white': !hasActiveChildren('reporting') },
          ]"
          no-caret
          no-flip
          text="Reporting"
        >
          <div class="navi navi-light navi-hover min-w-md-250px">
            <!-- Reporting Availability RTU -->
            <b-dropdown-item>
              <router-link
                to="/reporting/reporting-availability-rtu"
                v-if="checkPermissionReturn('reporting_availability_rtu')"
              >
                <div
                  :class="{
                    active: hasActiveChildren('reporting-availability-rtu'),
                  }"
                  class="navi-link"
                >
                  <li class="d-flex align-items-center">
                    Reporting Availability RTU
                  </li>
                </div>
              </router-link>
            </b-dropdown-item>

            <!-- Reporting Summary Alarm -->
            <b-dropdown-item>
              <router-link
                to="/reporting/reporting-summary-alarm"
                v-if="checkPermissionReturn('reporting_summary_alarm')"
              >
                <div
                  class="navi-link"
                  :class="{
                    active: hasActiveChildren('reporting-summary-alarm'),
                  }"
                >
                  <li class="d-flex align-items-center">
                    Reporting Summary Alarm
                  </li>
                </div>
              </router-link>
            </b-dropdown-item>

            <!-- Reporting Detail Alarm -->
            <b-dropdown-item>
              <router-link
                to="/reporting/reporting-detail-alarm"
                v-if="checkPermissionReturn('reporting_detail_alarm')"
              >
                <div
                  class="navi-link"
                  :class="{
                    active: hasActiveChildren('reporting-detail-alarm'),
                  }"
                >
                  <li class="d-flex align-items-center">
                    Reporting Detail Alarm
                  </li>
                </div>
              </router-link>
            </b-dropdown-item>
          </div>
        </b-dropdown>
      </li>

      <!-- administration -->
      <li>
        <b-dropdown
          v-if="checkPermissionReturn('administration')"
          :class="[hasActiveChildren('administrative') && 'active']"
          class="parent-link"
          size="sm"
          variant="link"
          :toggle-class="[
            isScroll ? 'text-dark' : 'text-white',
            'btn text-decoration-none btn-md font-weight-bolder px-5',
            {
              'btn-hover-transparent-white':
                !hasActiveChildren('administrative'),
            },
          ]"
          no-caret
          no-flip
          text="Administration"
        >
          <!--begin::Navigation-->
          <div class="navi navi-light navi-hover min-w-md-250px">
            <!-- user -->
            <b-dropdown-item>
              <router-link
                v-if="checkPermissionReturn('administration_users')"
                to="/administrative/user"
              >
                <div
                  class="navi-link"
                  :class="{ active: hasActiveChildren('user') }"
                >
                  <li class="d-flex align-items-center">User Management</li>
                </div>
              </router-link>
            </b-dropdown-item>

            <!-- role -->
            <b-dropdown-item>
              <router-link
                v-if="checkPermissionReturn('administration_roles')"
                to="/administrative/role"
              >
                <div
                  class="navi-link"
                  :class="{ active: hasActiveChildren('role') }"
                >
                  <li class="d-flex align-items-center">Role Management</li>
                </div>
              </router-link>
            </b-dropdown-item>

            <!-- permission -->
            <b-dropdown-item>
              <router-link
                v-if="checkPermissionReturn('administration_permissions')"
                to="/administrative/permission"
              >
                <div
                  class="navi-link"
                  :class="{ active: hasActiveChildren('permission') }"
                >
                  <li class="d-flex align-items-center">
                    Permission Management
                  </li>
                </div>
              </router-link>
            </b-dropdown-item>

            <!-- organisasi -->
            <b-dropdown-item>
              <router-link
                v-if="checkPermissionReturn('administration_organizations')"
                to="/administrative/organisasi"
              >
                <div
                  class="navi-link"
                  :class="{ active: hasActiveChildren('organisasi') }"
                >
                  <li class="d-flex align-items-center">
                    Organization Management
                  </li>
                </div>
              </router-link>
            </b-dropdown-item>

            <!-- location -->
            <b-dropdown-item>
              <router-link
                v-if="checkPermissionReturn('administration_locations')"
                to="/administrative/location"
              >
                <div
                  class="navi-link"
                  :class="{ active: hasActiveChildren('location') }"
                >
                  <li class="d-flex align-items-center">Location Management</li>
                </div>
              </router-link>
            </b-dropdown-item>

            <!-- notification -->
            <b-dropdown-item>
              <router-link
                v-if="checkPermissionReturn('administration_notifications')"
                to="/administrative/notification"
              >
                <div
                  class="navi-link"
                  :class="{ active: hasActiveChildren('notification') }"
                >
                  <li class="d-flex align-items-center">
                    Notification Management
                  </li>
                </div>
              </router-link>
            </b-dropdown-item>

            <!-- telegram group -->
            <b-dropdown-item>
              <router-link
                v-if="checkPermissionReturn('administration_telegram_group')"
                to="/administrative/telegram"
              >
                <div
                  class="navi-link"
                  :class="{ active: hasActiveChildren('telegram') }"
                >
                  <li class="d-flex align-items-center">
                    Telegram Group Management
                  </li>
                </div>
              </router-link>
            </b-dropdown-item>

            <!-- api mgmt -->
            <b-dropdown-item>
              <router-link
                v-if="checkPermissionReturn('administration_api')"
                to="/administrative/api"
              >
                <div
                  class="navi-link"
                  :class="{ active: hasActiveChildren('api') }"
                >
                  <li class="d-flex align-items-center">API Management</li>
                </div>
              </router-link>
            </b-dropdown-item>
          </div>
          <!--end::Navigation-->
        </b-dropdown>
      </li>

      <!-- parameter -->
      <li>
        <b-dropdown
          v-if="checkPermissionReturn('parameter')"
          :class="[hasActiveChildren('parameter') && 'active']"
          class="parent-link"
          size="sm"
          variant="link"
          :toggle-class="[
            isScroll ? 'text-dark' : 'text-white',
            'btn text-decoration-none btn-md font-weight-bolder px-5',
            { 'btn-hover-transparent-white': !hasActiveChildren('parameter') },
          ]"
          no-caret
          no-flip
          text="Parameter"
        >
          <!--begin::Navigation-->
          <div class="navi navi-hover min-w-md-250px">
            <!-- RRD Management -->
            <b-dropdown-item>
              <router-link
                v-if="checkPermissionReturn('parameter_rrd')"
                to="/parameter/rrd-management"
              >
                <div
                  class="navi-link"
                  :class="{ active: hasActiveChildren('rrd-management') }"
                >
                  <li class="d-flex align-items-center">RRD Management</li>
                </div>
              </router-link>
            </b-dropdown-item>

            <!-- MD Management -->
            <b-dropdown-item>
              <router-link
                v-if="checkPermissionReturn('parameter_md')"
                to="/parameter/md-management"
              >
                <div
                  class="navi-link"
                  :class="{ active: hasActiveChildren('md-management') }"
                >
                  <li class="d-flex align-items-center">MD Management</li>
                </div>
              </router-link>
            </b-dropdown-item>

            <!-- RTU Management -->
            <b-dropdown-item>
              <router-link
                v-if="checkPermissionReturn('parameter_rtu')"
                to="/parameter/rtu-management-new"
              >
                <div
                  class="navi-link"
                  :class="{ active: hasActiveChildren('rtu-management') }"
                >
                  <li class="d-flex align-items-center">RTU Management</li>
                </div>
              </router-link>
            </b-dropdown-item>

            <!-- Port Type Management -->
            <b-dropdown-item>
              <router-link
                v-if="checkPermissionReturn('parameter_ports')"
                to="/parameter/port-type-management"
              >
                <div
                  class="navi-link"
                  :class="{ active: hasActiveChildren('port-type-management') }"
                >
                  <li class="d-flex align-items-center">
                    Port Type Management
                  </li>
                </div>
              </router-link>
            </b-dropdown-item>

            <!-- BBM Tank Management -->
            <b-dropdown-item>
              <router-link
                v-if="checkPermissionReturn('parameter_tanks')"
                to="/parameter/bbm-tank-management"
              >
                <div
                  class="navi-link"
                  :class="{ active: hasActiveChildren('bbm-tank-management') }"
                >
                  <li class="d-flex align-items-center">BBM Tank Management</li>
                </div>
              </router-link>
            </b-dropdown-item>

            <!-- BBM Pricing -->
            <b-dropdown-item>
              <router-link
                to="/parameter/bbm-pricing"
                v-if="checkPermissionReturn('parameter_bbm_pricing')"
              >
                <div
                  class="navi-link"
                  :class="{ active: hasActiveChildren('bbm-pricing') }"
                >
                  <li class="d-flex align-items-center">BBM Pricing</li>
                </div>
              </router-link>
            </b-dropdown-item>

            <!-- IP Rectifier -->
            <b-dropdown-item>
              <router-link
                to="/parameter/ip-rectifier"
                v-if="checkPermissionReturn('parameter_ip_rectifier')"
              >
                <div
                  class="navi-link"
                  :class="{ active: hasActiveChildren('ip-rectifier') }"
                >
                  <li class="d-flex align-items-center">IP Rectifier</li>
                </div>
              </router-link>
            </b-dropdown-item>

            <!-- Formula Management -->
            <b-dropdown-item>
              <router-link
                v-if="checkPermissionReturn('parameter_formulas')"
                to="/parameter/formula-management"
              >
                <div
                  class="navi-link"
                  :class="{ active: hasActiveChildren('formula-management') }"
                >
                  <li class="d-flex align-items-center">Formula Management</li>
                </div>
              </router-link>
            </b-dropdown-item>

            <!-- Tags Management -->
            <b-dropdown-item>
              <router-link
                v-if="checkPermissionReturn('parameter_tags')"
                to="/parameter/tags-management"
              >
                <div
                  class="navi-link"
                  :class="{ active: hasActiveChildren('tags-management') }"
                >
                  <li class="d-flex align-items-center">Tags Management</li>
                </div>
              </router-link>
            </b-dropdown-item>
          </div>
          <!--end::Navigation-->
        </b-dropdown>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "KTMenu",
  created() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    hasActiveChildren(match) {
      return this.$route["path"].indexOf(match) !== -1;
    },
    handleScroll() {
      if (window.innerWidth > 991) {
        if (window.scrollY > 100) {
          this.isScroll = true;
        } else {
          this.isScroll = false;
        }
      } else {
        this.isScroll = true;
      }
    },
    handleResize() {
      if (window.innerWidth > 991) {
        this.handleScroll();
      } else {
        this.isScroll = true;
      }
    },
  },
  data() {
    return {
      isScroll: false,
      menus: {
        dashboard: [],
      },
    };
  },
};
</script>

<style scoped>
.b-dropdown-text {
  padding: 0px !important;
}
div.parent-link.active {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid transparent;
  border-radius: 4px;
}

.navi-link li {
  color: black;
  font-weight: 500;
}
.navi-link.active li {
  color: #0275d8;
}

@media screen and (max-width: 480px) {
  div.parent-link .navi {
    position: relative;
    overflow: scroll;
    left: 10px;
  }
  div.parent-link .navi li {
    margin-left: 10% !important;
  }
}
</style>
