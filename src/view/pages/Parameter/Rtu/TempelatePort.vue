<template>
  <b-modal
    id="tempelate-port"
    title="TEMPLATE"
    size="xl"
    scrollable
    hide-footer
    centered
    @close="closeModal"
    @cancel="closeModal"
    @hidden="closeModal"
  >
    <div class="row mb-5">
      <div class="col-md-5">
        <input
          type="text"
          class="form-control"
          v-model="searchRtuName"
          placeholder="Cari template berdasarkan nama rtu.."
        />
      </div>
    </div>
    <table
      class="table table-hover table-bordered table-striped"
      v-if="isReady"
    >
      <thead>
        <tr>
          <th>#</th>
          <th>RTU</th>
          <th>MODBUS</th>
          <th>DESKRIPSI</th>
          <th>MODE PORT</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="align-items-center icon-select"
          v-for="(item, i) in dataTemplate"
          :key="i"
          @click="selectTemplate(item.info_port, item.rtu_name)"
        >
          <td>{{ i + 1 }}</td>
          <td rowspan>{{ item.rtu_name }}</td>
          <td class="text-center">
            <tr
              class="text-center"
              v-for="(items, j) in item.info_port"
              :key="j"
            >
              <td>{{ items.port_rtu }}</td>
            </tr>
          </td>
          <td>
            <tr v-for="(items, j) in item.info_port" :key="j">
              <td>{{ items.desc }}</td>
            </tr>
          </td>
          <td class="text-center">
            <tr
              class="text-center"
              v-for="(items, j) in item.info_port"
              :key="j"
            >
              <td>{{ items.mode_port }}</td>
            </tr>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="alert alert-warning mt-15" role="alert" v-else>
      Tunggu sebentar, sedang pengambilan data...
    </div>
  </b-modal>
</template>
<script>
import ApiService from "@/core/services/api.service";
export default {
  name: "tempelate",

  data() {
    return {
      isReady: true,
      searchRtuName: "",
      rtu_name: "",
      sizeInfoPort: 0,
      info_port: [],
      dataTemplate: [],
    };
  },
  emit: ["closeModalTempelate"],
  props: ["isOpen"],
  watch: {
    isOpen: function () {
      if (this.isOpen) {
        this.isReady = false;

        this.getTemplate();
      }
    },
    searchRtuName: function () {
      this.getTemplate();
    },
  },
  methods: {
    getTemplate() {
      ApiService.query(`${process.env.VUE_APP_ROOT_API_4}/rtu/template`, {
        params: {
          limit: 30,
          rtu_name: this.searchRtuName,
        },
      })
        .then(({ data }) => {
          this.isReady = false;
          this.dataTemplate = data.result;
          this.info_port = data.result.info_port;
          this.isReady = true;
        })
        .catch((error) => {
          this.isReady = true;
          console.log(error.response);
        });
    },
    selectTemplate(dataPort, nameRTUTemplare) {
      this.$store.dispatch("setDataTemplateRtuPort", dataPort);
      this.$store.dispatch("setDataTemplateNameRtuPort", nameRTUTemplare);
      this.$store.dispatch("setDefaultPorts");
      dataPort.forEach((data) => {
        this.$store.dispatch("setDataPorts", {
          // general
          id_m_port: data.id_m_port ?? "",
          port_rtu: data.port_rtu ?? "",
          selectPort: {
            calibration_value: data.calibration ?? "",
            created_at: "",
            data_rotation: data.data_rotation ?? "",
            device_name: "",
            id_port: data.id_m_port ?? null,
            identifier: data.name_identifier ?? "",
            port_mode: data.mode_port ?? "",
            port_name: "",
            units: data.units ?? "",
            updated_at: "",
          },
          mode_port: data.mode_port ?? "",
          name_identifier: data.name_identifier ?? "",
          selectDevice: {
            id: data.device_id,
            name: data.device_name,
          },
          device_id: data.device_id ?? null,
          device_name: "",
          description: data.desc ?? "",
          units: data.units ?? "",
          calibration: data.calibration ?? "",
          is_monitored: data.is_monitored ? data.is_monitored.toString() : "0",
          telegram_reminder: data.telegram_reminder
            ? data.telegram_reminder.toString()
            : "0",
          monitored: data.is_monitored == 1 ? true : false,
          reminder: data.telegram_reminder == 1 ? true : false,
          id_m_formula: data.id_m_formula ?? "",
          formula: data.formula ?? "",

          // adding bbm
          is_tanks: false,
          tank_length: data.tank_length,
          tank_height: data.tank_height,
          tank_wide: data.tank_wide,
          type_tank: data.type_tank,
          power: data.power,
          fuel_consumption: data.fuel_consumption,
          // harga: "",
          kapasitas: data.tank_capacity,
          selectBentuk: "",

          // adding kwh
          port_kwh_1: "",
          port_kwh_2: "",
        });
      });
      this.$emit("closeModalTempelate");
    },
    closeModal() {
      this.$emit("closeModalTempelate");
    },
  },
};
</script>
<style scoped>
/* button add and delete */
.button-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-right: 20px;
}

.wrap-pagination {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.badge-success {
  background-color: rgb(36, 199, 36);
}

.icon-select {
  cursor: pointer;
}

.icon-detail:hover {
  border: 1px solid transparent;
}

/* hover icon plus circle */
.fa-plus-circle:hover {
  color: #ffffff !important;
  background-color: #1bc5bd !important;
}

/* hover icon minus circle */
.fa-minus-circle {
  color: #ffffff !important;
  background-color: #1bc5bd !important;
  border: 1px solid transparent !important;
}

.fa-eye,
.fa-pen,
.fa-trash,
.icon-detail,
.button-click {
  cursor: pointer;
}

.card-detail {
  z-index: 999;
  position: absolute;
}

.list-detail {
  list-style-type: none;
}
</style>
