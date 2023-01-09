<template>
  <b-modal
    id="add-md"
    size="lg"
    title="Tambah MD"
    scrollable
    hide-footer
    @close="closeModal"
    @cancel="closeModal"
    @hidden="closeModal"
    centered
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
                <input
                  type="checkbox"
                  value="1"
                  v-model="virtual"
                  @change="checkTipe()"
                />
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
                  @change="checkTipe()"
                />
                <span></span>
              </label>
            </span>
          </b-col>
        </b-row>

        <b-row v-if="virtual == false">
          <b-col cols="3">
            <h6>LOKASI&nbsp;<span class="required"></span>&nbsp;:</h6>
          </b-col>
          <b-col>
            <div class="form-group">
              <b-form-select
                class="form-control"
                v-model="locationId"
                @change="templateSname()"
              >
                <option disabled value="">Pilih Nama Location</option>
                <option
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
                v-model="nameMD"
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
                v-model="ipAddress"
              />
              <!-- <span class="form-text text-muted">Please enter your IP</span> -->
            </div>
          </b-col>

          <b-col cols="0" v-if="ipAddress.length > 0">
            <div v-if="virtual == false">
              <button class="btn btn-sm btn-secondary mr-5" disabled="disabled">
                Check IP
              </button>
            </div>
            <div v-else>
              <button
                class="btn btn-sm btn-success mr-5"
                @click.prevent="cekIp"
              >
                Check IP
              </button>
            </div>
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

        <b-row v-if="virtual === false">
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
              <input type="radio" value="0" v-model="is_backup" checked />
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
                v-model="is_backup"
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

        <b-row v-if="is_backup == '0'">
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

      <b-row>
        <b-col cols="auto" class="ml-auto">
          <div v-if="isClick == true">
            <button
              type="submit"
              class="btn btn-sm btn-success mt-5"
              @click.prevent="submitFrom"
            >
              Simpan &nbsp;
              <span><i class="fas fa-chevron-right icon-sm"></i></span>
            </button>
          </div>
          <div v-else>
            <button
              type="button"
              class="btn btn-secondary spinner spinner-dark spinner-right"
            >
              Simpan &nbsp;
            </button>
          </div>
        </b-col>
      </b-row>
    </div>
  </b-modal>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import ipRegex from "ip-regex";
import textHelper from "@/core/helpers/textHelper";
import ApiService from "@/core/services/api.service";
import Axios from "axios";

export default {
  name: "AddMd",
  emits: ["getAllMd"],

  data() {
    return {
      options: [],
      options2: null,
      virtual: true,
      is_virtual: "1",
      ipAddress: "",
      port: 0,
      nameMD: "",
      is_backup: "1",
      dateTime: "",
      isCekIp: false,
      is_finished_input: false,
      idSelected: "",
      locationId: "",
      dataLocations: [],
      dataListMdBackUp: [],
      selectMdBackUp: "",
      sname: "",

      listRRD: [],
      selectRRD: "",

      isClick: true,

      normalizerLocation(node) {
        return {
          id: node.id,
          label: node.name,
        };
      },
      filter: {
        location: null,
      },
    };
  },
  methods: {
    openAddMD() {
      this.fromatDateNow();
      this.getLocation();
      this.getDataRrd();
      this.getMdBackup();
    },
    closeModal() {
      this.filter.location = null;
      this.$bvModal.hide("add-md");
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
          console.log(error.response);
        });
    },

    getLocation() {
      Axios.get(`${process.env.VUE_APP_ROOT_API_3}/locations?page=1&limit=500`)
        .then(({ data }) => {
          this.dataLocations = data.result.locations;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    async cekIp() {
      if (this.nameMD == "" || this.nameMD == null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Anda harus mengisi nama MD!!",
        });
      } else if (!ipRegex({ exact: true }).test(this.ipAddress)) {
        this.isCekIp = false;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "IP yang ada masukan tidak sesuai format!!",
        });
      } else {
        ApiService.get(
          `${process.env.VUE_APP_ROOT_API_4}/md`,
          `generate-virtual-port/${this.ipAddress}`
        )
          .then(({ data }) => {
            this.port = data.result;
            this.isCekIp = true;
            this.templateSname();
            Swal.fire({
              icon: "success",
              title: "Berhasil!",
              text: "IP telah ditemukan",
            });
          })
          .catch(({ response }) => {
            if (response.status == "IP is not Reached") {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "IP yang ada masukan tidak tersedia!!",
              });
            } else if (response.status == 500) {
              this.isCekIp = false;

              Swal.fire({
                icon: "error",
                title: "Oops...",
              });
            }
          });
      }
    },

    async submitFrom() {
      this.isClick = false;

      if (this.nameMD == "" || this.nameMD == null) {
        this.isClick = true;

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Anda harus mengisi nama MD!!",
        });
      } else if (this.selectRRD == null || this.selectRRD == "") {
        this.isClick = true;

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Anda harus pilih RRD terlebih dahulu!!",
        });
      } else if (this.virtual === false && this.locationId == "") {
        this.isClick = true;

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Anda harus pilih lokasi terlebih dahulu!!",
        });
      } else if (!this.isCekIp) {
        this.isClick = true;

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Anda harus check ip terlebih dahulu!!",
        });
      } else if (this.is_backup == "0" && this.selectMdBackUp == "") {
        this.isClick = true;

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Anda harus pilih MD backup dahulu!!",
        });
      } else {
        if (this.virtual) {
          this.is_virtual = "1";
          this.locationId = "";
          this.sname = "";
        } else {
          this.is_virtual = "0";
        }
        if (this.is_backup == "1") {
          this.selectMdBackUp = "";
        }

        let editNameMd = this.nameMD.replace(/\s+/g, "_");
        let credentials = {
          name: editNameMd.toUpperCase(),
          is_virtual: this.is_virtual,
          id_m_rrd: this.selectRRD,
          ip_address: this.ipAddress,
          is_backup: this.is_backup,
          id_m_location: this.locationId,
          id_md_backup: this.selectMdBackUp,
          port: this.port,
          sname: this.sname,
          // is_finished_input: true,
        };
        axios
          .post(`${process.env.VUE_APP_ROOT_API_4}/md`, credentials)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Berhasil!",
              text: "MD berhasil ditambahkan!",
            }).then((result) => {
              this.isClick = true;
              if (result.isConfirmed) {
                this.virtual = true;
                this.is_virtual = "1";
                this.ipAddress = "";
                this.port = 0;
                this.nameMD = "";
                this.modeMD = "1";
                this.sname = "";
                this.dateTime = "";
                this.isCekIp = false;
                this.is_finished_input = false;
                this.idSelected = "";
                this.locationId = "";
                this.dataLocations = [];
                this.dataListMdBackUp = [];
                this.selectMdBackUp = "";
                this.selectRRD = "";
                this.$emit("getAllMd");
              }
            });
          })
          .catch(({ response }) => {
            this.isCekIp = false;
            this.isClick = true;
            if (response.status == 409) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "IP yang ada masukan sudah digunakan!!",
              });
            } else if (response.status == 500) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "IP yang ada masukan sudah digunakan!!",
              });
            }
          });
      }
    },
    getMdBackup() {
      ApiService.query(
        `${process.env.VUE_APP_ROOT_API_4}/md?page=1&limit=all&is_backup=1`
      )
        .then(({ data }) => {
          this.dataListMdBackUp = data.result.payload;
        })
        .catch((e) => {
          console.log(e.response);
          this.dataListMdBackUp = "";
        });
    },

    checkTipe() {
      if (this.virtual === false) {
        this.port = 9273;
        this.isCekIp = true;
      } else {
        this.port = 0;
      }
    },

    //format sname rtu
    templateSname() {
      let tipeMd;
      if (this.virtual === false) {
        // get data lokasi form id lokasi
        let output = this.dataLocations.filter(
          (data) => data.id == this.locationId
        );

        let lengthMds = output[0].mds.length;
        let dataMds = output[0].mds;

        //jika length mds = 0 maka akan dimulai dari 01 contoh"`MD-snamelokasi-01`"
        if (lengthMds == 0) {
          tipeMd = `MD-${output[0].sname}-1`;
        } else {
          tipeMd = `MD-${output[0].sname}-${
            dataMds[lengthMds - 1].sname_number + 1
          }`;
        }
      }
      this.sname = tipeMd;
    },

    fromatDateNow() {
      this.dateTime = textHelper.formatDate("DD-MM-YYYY HH:mm", Date.now());
    },

    replaceNameMd() {
      let newName = this.nameMD.replace(/\s+/g, "_");
      return newName;
    },
    clickSpiner() {
      this.isClickSpiner = true;
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
