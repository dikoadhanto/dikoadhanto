<template>
  <b-modal
    id="modal-update-md"
    title="Update MD"
    size="lg"
    scrollable
    centered
    ok-title="Simpan"
    @ok="updateMd"
    button-size="sm"
    ok-variant="success"
    ok-only
    @cancel="closeUpdate"
    @hidden="closeUpdate"
    @close="closeUpdate"
  >
    <div>
      <div class="card p-5">
        <b-row class="d-flex align-items-center mb-8">
          <b-col cols="3">
            <h6>VIRTUAL&nbsp;<span class="required-icon">*</span>&nbsp;:</h6>
          </b-col>
          <b-col cols="9">
            <span class="switch switch-sm switch-icon" v-if="virtual">
              <label>
                <input type="checkbox" value="1" v-model="virtual" disabled />
                <span></span>
              </label>
            </span>
            <span class="switch switch-sm switch-icon" v-else>
              <label>
                <input
                  type="checkbox"
                  value="0"
                  name="select"
                  v-model="virtual"
                  disabled
                />
                <span></span>
              </label>
            </span>
          </b-col>
        </b-row>

        <b-row v-if="virtual == false">
          <b-col cols="3">
            <h6>LOKASI&nbsp;<span class="required-icon">*</span>&nbsp;:</h6>
          </b-col>
          <b-col>
            <div class="form-group">
              <b-form-select class="form-control" v-model="locationId" disabled>
                <option disabled value="">Pilih Nama Location</option>
                <option
                  disabled
                  v-for="(loc, i) in dataLocations"
                  :key="i"
                  :value="loc.id"
                >
                  {{ loc.name }}
                </option>
              </b-form-select>
            </div>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="3">
            <h6>NAMA MD&nbsp;<span class="required-icon">*</span>&nbsp;:</h6>
          </b-col>
          <b-col>
            <div class="form-group">
              <input
                type="text"
                class="form-control form-control-solid"
                v-model="mdName"
              />
            </div>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="3">
            <h6>RRD&nbsp;<span class="required-icon">*</span>&nbsp;:</h6>
          </b-col>
          <b-col>
            <div class="form-group">
              <select
                class="form-control form-control-solid"
                v-model="selectRRD"
                disabled
              >
                <option>Pilih RRD</option>
                <option v-for="(data, i) in listRRD" :key="i" :value="data.id">
                  <span class="badge badge-danger text-white">{{
                    data.name
                  }}</span>
                </option>
              </select>
            </div>
          </b-col>
        </b-row>

        <b-row class="d-flex align-items-center mb-8">
          <b-col cols="3">
            <h6>IP ADDRESS&nbsp;<span class="required-icon">*</span>&nbsp;:</h6>
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

          <b-col cols="0" v-if="mdIp.length > 0">
            <button class="btn btn-sm btn-secondary mr-5" disabled="disabled">
              Check IP
            </button>
          </b-col>
          <b-col cols="0" v-else>
            <button class="btn btn-sm btn-secondary mr-5" disabled="disabled">
              Check IP
            </button>
          </b-col>

          <b-col cols="0" class="d-flex align-items-center">
            <h6>PORT<span class="required-icon">*</span>:</h6>
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

        <b-row v-if="virtual == false">
          <b-col cols="3">
            <h6>SNAME MD&nbsp;<span class="required-icon">*</span>&nbsp;:</h6>
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

      <div class="card p-5 mt-5">
        <b-row>
          <b-col cols="3">
            <h6>MODE MD&nbsp;<span class="required-icon">*</span>&nbsp;:</h6>
          </b-col>
          <b-col cols="9">
            <label>
              <input type="radio" value="0" v-model="modeMD" />
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
                v-model="modeMD"
                required
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

        <b-row v-if="modeMD == '0'">
          <b-col cols="3">
            <h6>MD BACKUP&nbsp;<span class="required-icon">*</span>&nbsp;:</h6>
          </b-col>
          <b-col>
            <div class="form-group">
              <select
                class="form-control form-control-solid"
                v-model="selectMdBackUp"
              >
                <option>Pilih MD Backup</option>
                <option
                  v-for="(data, i) in dataListMdBackUp"
                  :key="i"
                  :value="data.md_id"
                >
                  <span class="badge badge-danger text-white">{{
                    data.md_name
                  }}</span>
                </option>
              </select>
            </div>
            <!-- {{ selectMdBackUp }} -->
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="3">
            <h6>
              INSTALLATION DATE & TIME&nbsp;<span class="required-icon">*</span
              >&nbsp;:
            </h6>
          </b-col>
          <b-col>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                v-model="dateTime"
                disabled
              />
            </div>
          </b-col>
        </b-row>
      </div>
    </div>
  </b-modal>
</template>

<script>
import axios from "axios";
import ipRegex from "ip-regex";
import Swal from "sweetalert2";
import textHelper from "@/core/helpers/textHelper";
import ApiService from "@/core/services/api.service";

export default {
  data() {
    return {
      mdName: "",
      mdIp: "",
      port: 0,
      dateTime: null,
      is_virtual: "",
      virtual: true,
      isCekIp: true,
      modeMD: "",
      locationName: "",
      dataLocations: [],
      locationId: "",
      dataListMdBackUp: [],
      selectMdBackUp: "",
      idSelected: "",

      listRRD: [],
      selectRRD: "",
    };
  },
  emits: ["getAllDataMd"],

  methods: {
    showModal(id) {
      this.idSelected = id;
      this.getLocation();
      this.getMdBackup();
      this.getDataRrd();
      this.getDetailMd();
      this.$bvModal.show("modal-update-md");
    },
    getDetailMd() {
      ApiService.get(process.env.VUE_APP_ROOT_API_4, `md/${this.idSelected}`)
        .then(({ data }) => {
          this.is_virtual = data.result.is_virtual;
          this.mdName = data.result.md_name;
          this.locationId = data.result.id_m_location;
          if (data.result.is_virtual === "1") {
            this.virtual = true;
          } else {
            this.virtual = false;
          }
          this.sname = data.result.md_sname;
          this.mdIp = data.result.md_ip;
          this.port = data.result.port;
          this.modeMD = data.result.md_backup;
          if (data.result.list_md.length > 0) {
            this.selectMdBackUp = data.result.list_md[0].id;
          }
          this.selectRRD = data.result.id_m_rrd;
          this.dateTime = data.result.installed_on;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateMd() {
      if (this.mdName == "" || this.mdName == null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Anda harus mengisi nama MD!!",
        });
      } else if (this.virtual === false && this.locationId == "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Anda harus pilih lokasi terlebih dahulu!!",
        });
      } else if (!this.isCekIp) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Anda harus check ip terlebih dahulu!!",
        });
      } else if (this.modeMD == "0" && this.selectMdBackUp == "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Anda harus pilih MD backup dahulu!!",
        });
      } else {
        if (this.virtual) {
          this.is_virtual = "1";
          this.locationId = "";
        } else {
          this.is_virtual = "0";
        }
        if (this.modeMD == "1") {
          this.selectMdBackUp = "";
        }

        let editNameMd = this.mdName.replace(/\s+/g, "_");

        let data = {
          is_virtual: this.is_virtual,
          name: editNameMd.toUpperCase(),
          id_m_location: this.locationId,
          ip_address: this.mdIp,
          port: this.port,
          is_backup: this.modeMD,
          id_backup: this.selectMdBackUp,
        };
        ApiService.patch(
          `${process.env.VUE_APP_ROOT_API_4}/md/${this.idSelected}`,
          data
        )
          .then(({ data }) => {
            if (data.code == 200) {
              Swal.fire({
                icon: "success",
                title: "Berhasil...",
                text: "Anda berhasil mengupdate MD",
              });
              this.mdName = "";
              this.mdIp = "";
              this.port = 0;
              this.dateTime = null;
              this.is_virtual = "";
              this.virtual = true;
              this.isCekIp = true;
              this.modeMD = "";
              this.locationName = "";
              this.dataLocations = [];
              this.locationId = "";
              this.dataListMdBackUp = [];
              this.selectMdBackUp = "";
              this.selectRRD = "";
              this.$emit("getAllDataMd");
              this.closeUpdate();
            }
          })
          .catch((e) => {
            if (e.response.data.code == 500) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Server sedang dalam perbaikan. Mohon menunggu beberapa saat lagi",
              });
            } else if (e.response.data.code == 401) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Anda tidak berhak mengubah data ini",
              });
            }
          });
      }
    },
    getLocation() {
      axios
        .get(`${process.env.VUE_APP_ROOT_API_3}/locations`)
        .then(({ data }) => {
          this.dataLocations = data.result.locations;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDataRrd() {
      ApiService.get(process.env.VUE_APP_ROOT_API_4, "rrd?limit=all")
        .then(({ data }) => {
          data.result.payload.forEach((data) => {
            if (data.is_active == 1) {
              this.listRRD.push(data);
            }
          });
        })
        .catch((error) => {
          if (error.response.data.code == 404) {
            this.dataRrd = "";
          }
          console.log("error rrd", error.response);
        });
    },
    getMdBackup() {
      ApiService.query(
        `${process.env.VUE_APP_ROOT_API_4}/md?page=1&limit=all&is_backup=1`
      )
        .then(({ data }) => {
          this.dataListMdBackUp = data.result.payload;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    checkTipe() {
      if (this.virtual === false) {
        this.port = 9273;
        this.isCekIp = true;
      } else {
        this.port = 0;
        this.sname = "";
      }
    },

    fromatDateNow() {
      this.dateTime = textHelper.formatDate("DD-MM-YYYY HH:mm", Date.now());
      this.openAddMD = false;
    },

    replaceNameMd() {
      var newName = this.nameMD.replace(/\s+/g, "_");
      return newName;
    },

    cekIp() {
      if (!ipRegex({ exact: true }).test(this.mdIp)) {
        this.isCekIp = false;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "IP yang ada masukan tidak sesuai format!!",
        });
      } else {
        let credentials = {
          is_virtual: this.is_virtual,
          ip_address: this.mdIp,
        };
        axios
          .post(
            "http://10.60.185.116:8061/config/telegraf/insertMd",
            credentials
          )
          .then(({ data }) => {
            this.port = data.data;
            this.isCekIp = true;
            Swal.fire({
              icon: "success",
              title: "Berhasil!",
              text: "IP berhasil di check",
            });
          })
          .catch(({ response }) => {
            if (response.data.err == "IP is not Reached") {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "IP yang ada masukan tidak tersedia!!",
              });
            }
          });
      }
    },

    updateIp() {
      this.isCekIp = false;
    },
    getReturnTime(time) {
      let timeObject = new Date(parseInt(time));
      let date = timeObject.getDate();
      let month = timeObject.getMonth() + 1;
      let year = timeObject.getFullYear();
      if (month.toString().length == 1) {
        month = `0${month}`;
      }
      if (date.toString().length == 1) {
        date = `0${date}`;
      }
      return `${year}-${month}-${date}`;
    },
    closeUpdate() {
      this.sname = "";
      this.idSelected = "";
      this.selectMdBackUp = "";
      this.$bvModal.hide("modal-update-md");
    },
  },
};
</script>

<style scoped>
.required-icon {
  color: #c70000;
}

.form-control {
  background-color: #f4f8fa;
}
</style>
