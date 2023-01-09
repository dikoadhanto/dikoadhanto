<template>
  <b-modal
    id="modal-detail-port"
    size="lg"
    title="Detail Port"
    hide-footer
    scrollable
    centered
  >
    <section id="detail-port">
      <form>
        <div class="card p-4 mb-3">
          <!-- rtu name -->

          <b-row class="d-flex align-items-center mb-8" align-v="center">
            <b-col cols="3">
              <h6>MODE PORT&nbsp;<span class="required"></span>&nbsp;:</h6>
            </b-col>
            <b-col v-if="listPort.mode == 'analog'">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  id="analog"
                  name="mode_port"
                  value="analog"
                  checked="checked"
                />
                <label for="analog" class="form-check-label">ANALOG</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  id="digital"
                  name="mode_port"
                  value="digital"
                />
                <label for="digital" class="form-check-label">Digital</label>
              </div>
            </b-col>
            <div class="col-sm-9" v-else>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  id="analog"
                  name="mode_port"
                  value="analog"
                />
                <label for="analog" class="form-check-label">ANALOG</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  id="digital"
                  name="mode_port"
                  value="digital"
                  checked="checked"
                />
                <label for="digital" class="form-check-label">Digital</label>
              </div>
            </div>
          </b-row>
          <b-row class="d-flex align-items-center mb-8" align-v="center">
            <b-col cols="3">
              <h6>
                IDENTIFIER NAME&nbsp;<span class="required"></span>&nbsp;:
              </h6>
            </b-col>

            <b-col>
              <input
                type="text"
                class="form-control"
                v-model="listPort.identifier"
                disabled
              />
            </b-col>
          </b-row>
          <!-- <b-row class="d-flex align-items-center mb-8" align-v="center">
            <b-col cols="3">
              <h6>GROUP TOPOLOGY&nbsp;<span class="required"></span>&nbsp;:</h6>
            </b-col>

            <b-col>
              <input
                type="text"
                class="form-control"
                v-model="dataPort.device_name"
                disabled
              />
            </b-col>
          </b-row> -->
        </div>
        <!-- unit -->
        <div class="card p-4 mb-10">
          <b-row class="d-flex align-items-center mb-8" align-v="center">
            <b-col cols="3">
              <h6>UNIT&nbsp;<span class="required"></span>&nbsp;:</h6>
            </b-col>

            <b-col>
              <input
                type="text"
                class="form-control"
                v-model="listPort.units"
                disabled
              />
            </b-col>
          </b-row>
          <b-row class="d-flex align-items-center mb-8" align-v="center">
            <b-col cols="3">
              <h6>
                CALIBRATION VALUE&nbsp;<span class="required"></span>&nbsp;:
              </h6>
            </b-col>

            <b-col>
              <input
                type="text"
                class="form-control"
                v-model="listPort.calibration_value"
                disabled
              />
            </b-col>
          </b-row>
          <b-row class="d-flex align-items-center mb-8" align-v="center">
            <b-col cols="3">
              <h6>DATA ROTATION&nbsp;<span class="required"></span>&nbsp;:</h6>
            </b-col>
            <b-col>
              <input
                type="text"
                class="form-control"
                v-model="listPort.data_rotation"
                disabled
              />
            </b-col>
            <b-col>HARI</b-col>
          </b-row>

          <b-row class="d-flex align-items-center mb-8" align-v="center">
            <b-col>
              <div class="table-responsive">
                <table
                  class="table table-striped table-bordered table-hover"
                  border="1"
                >
                  <thead class="text-center">
                    <tr>
                      <th>#</th>
                      <th>LABEL</th>
                      <th>SERVERITY</th>
                      <th>DURATION</th>
                      <th>THRESHOLD RULE</th>
                      <th>DESKRIPSI</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(data, i) in listThreshold" :key="i">
                      <td>{{ i + 1 }}</td>
                      <td>{{ data.label }}</td>
                      <td>{{ data.labels_severity }}</td>
                      <td>{{ data.duration }}</td>
                      <td>{{ data.rule }}</td>
                      <td>{{ data.desc }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </b-col>
          </b-row>
        </div>
      </form>
    </section>
  </b-modal>
</template>

<script>
import ApiService from "@/core/services/api.service";

export default {
  props: ["idSelected"],
  emits: ["hideDetail"],
  data() {
    return {
      listPort: {},
      listThreshold: [],
    };
  },
  watch: {
    idSelected: function () {
      this.getDataThreshold();
    },
  },
  methods: {
    getDataThreshold() {
      ApiService.get(
        `${process.env.VUE_APP_ROOT_API_4}/port`,
        `treshold/${this.idSelected}`
      )
        .then(({ data }) => {
          this.listPort = data.result;
          this.listThreshold = data.result.info_treshold;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.col-form-label {
  font-weight: bold;
}
.required-icon {
  color: #c70000;
}

.required:after {
  content: "*";
  color: red;
}

.form-control {
  background-color: #f4f8fa;
}
</style>
