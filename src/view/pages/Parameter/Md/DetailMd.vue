<template>
  <b-modal
    id="detail-md"
    title="Detail MD"
    size="lg"
    scrollable
    hide-footer
    centered
    @close="closeModal"
    @cancel="closeModal"
    @hidden="closeModal"
  >
    <form>
      <div class="card p-4 mb-3">
        <b-row class="d-flex align-items-center mb-8">
          <b-col cols="3">
            <h6>VIRTUAL&nbsp;<span class="required"></span>&nbsp;:</h6>
          </b-col>
          <b-col cols="9">
            <span class="switch switch-sm switch-icon" v-if="is_virtual">
              <label>
                <input
                  type="checkbox"
                  value="true"
                  checked="checked"
                  disabled
                />
                <span></span>
              </label>
            </span>
            <span class="switch switch-sm switch-icon" v-else>
              <label>
                <input type="checkbox" disabled />
                <span></span>
              </label>
            </span>
          </b-col>
        </b-row>

        <b-row v-if="is_virtual == false">
          <b-col cols="3">
            <h6>LOKASI&nbsp;<span class="required"></span>&nbsp;:</h6>
          </b-col>
          <b-col>
            <div class="form-group">
              <input
                type="text"
                class="form-control form-control-solid"
                v-model="locationName"
                disabled
              />
            </div>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="3">
            <h6>NAMA MD&nbsp;<span class="required"></span>&nbsp;:</h6>
          </b-col>
          <b-col>
            <div class="form-group">
              <input
                type="text"
                class="form-control form-control-solid"
                v-model="mdName"
                disabled
              />
            </div>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="3">
            <h6>RRD&nbsp;<span class="required"></span>&nbsp;:</h6>
          </b-col>
          <b-col>
            <div class="form-group">
              <input
                type="text"
                class="form-control form-control-solid"
                v-model="RRDName"
                disabled
              />
            </div>
          </b-col>
        </b-row>

        <b-row class="d-flex align-items-center mb-8">
          <b-col cols="3">
            <h6>IP ADDRESS&nbsp;<span class="required"></span>&nbsp;:</h6>
          </b-col>
          <b-col cols="4">
            <div class="form-group m-0">
              <input
                type="text"
                class="form-control form-control-solid"
                value=""
                v-model="mdIp"
                disabled
              />
            </div>
          </b-col>
          <b-col cols="0" class="d-flex align-items-center">
            <h6>PORT<span class="required"></span>:</h6>
          </b-col>
          <b-col>
            <div class="form-group m-0">
              <input
                type="text"
                class="form-control form-control-solid"
                disabled="disabled"
                required="PORT"
                v-model="port"
              />
            </div>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="3">
            <h6>SNAME MD&nbsp;<span class="required"></span>&nbsp;:</h6>
          </b-col>
          <b-col>
            <div class="form-group">
              <input
                type="text"
                class="form-control form-control-solid"
                v-model="sname"
                disabled
              />
            </div>
          </b-col>
        </b-row>
      </div>

      <div class="card p-4">
        <b-row>
          <b-col cols="3">
            <h6>MODE MD&nbsp;<span class="required"></span>&nbsp;:</h6>
          </b-col>
          <b-col cols="9">
            <label>
              <input
                type="radio"
                value="0"
                v-model="mdBackup"
                checked
                disabled
              />
              <span
                class="font-weight-bold ml-2 mr-5"
                align-self="center"
                style="font-size: 14px"
                >MAIN</span
              >
            </label>
            <label>
              <input
                type="radio"
                value="1"
                label="Local"
                v-model="mdBackup"
                required
                disabled
              />
              <span
                class="font-weight-bold ml-2"
                align-self="center"
                style="font-size: 14px"
                >BACKUP</span
              >
            </label>
          </b-col>
        </b-row>

        <b-row v-if="mdBackup == '0'">
          <b-col cols="3">
            <h6>MD BACKUP&nbsp;<span class="required"></span>&nbsp;:</h6>
          </b-col>
          <b-col>
            <div class="form-group">
              <select class="form-control form-control-solid" disabled>
                <option>{{ listMDBackup }}</option>
              </select>
            </div>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="3">
            <h6>
              INSTALLATION DATE & TIME&nbsp;<span class="required"></span
              >&nbsp;:
            </h6>
          </b-col>
          <b-col>
            <div class="form-group">
              <input
                type="text"
                class="form-control form-control-solid"
                readonly
                v-model="installed_on"
                disabled
              />
            </div>
          </b-col>
        </b-row>
      </div>
    </form>
  </b-modal>
</template>

<script>
import ApiService from "@/core/services/api.service";
import textHelper from "@/core/helpers/textHelper";

export default {
  data() {
    return {
      mdType: false,
      mdName: "",
      RRDName: "",
      mdIp: "",
      port: "",
      sname: "",
      mdBackup: "",
      locationName: "",
      status: "",
      listMDBackup: [],
      is_virtual: false,
      installed_on: "",
    };
  },

  methods: {
    getDetailMd(id) {
      ApiService.get(process.env.VUE_APP_ROOT_API_4, `md/${id}`)
        .then(({ data }) => {
          this.mdType = data.result.md_type;
          this.mdName = data.result.md_name;
          this.RRDName = data.result.rrd;
          this.mdIp = data.result.md_ip;
          this.port = data.result.port;
          this.mdBackup = data.result.md_backup;
          this.locationName = data.result.location_name;
          this.status = data.result.status;
          this.is_virtual = data.result.is_virtual;
          this.listMDBackup = data.result.list_md.length
            ? data.result.list_md[0].name
            : "-";
          this.sname = data.result.md_sname;

          if (typeof data.result.is_virtual === "string") {
            if (data.result.is_virtual === "1") {
              this.is_virtual = true;
            } else {
              this.is_virtual = false;
            }
          }

          if (
            data.result.installed_on == null ||
            data.result.installed_on == ""
          ) {
            this.installed_on = "-";
          } else {
            this.installed_on = textHelper.formatDate(
              "YYYY-MM-DD HH:mm:ss",
              data.result.installed_on
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    closeModal() {
      this.$bvModal.hide("detail-md");
    },
  },
};
</script>
