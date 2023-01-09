<template>
  <div class="card card-custom card-stretch gutter-b">
    <!--begin::Header-->
    <div class="card-header py-5">
      <b-row class="w-100">
        <b-col cols="1"
          ><b-button pill variant="success" @click="pushSkenario()"
            >+</b-button
          ></b-col
        >
        <b-col cols="9"
          ><h3 class="card-title align-items-start flex-column">
            <span class="card-label font-weight-bolder text-dark">
              Tambah Skenario Rule
            </span>
          </h3></b-col
        >
      </b-row>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body mb-6 pt-2">
      <b-row>
        <b-col cols="2" v-for="(item, i) in fixContainer" :key="i">
          <div class="card p-2 text-center">
            <b-form-select
              v-model="item.value"
              :options="item.opts"
            ></b-form-select>
          </div>
        </b-col>
      </b-row>
    </div>
    <!--end::Body-->
  </div>
</template>

<script>
export default {
  name: "AddSkenarioRTU",
  data() {
    return {
      containerSkenario: [],
      fixContainer: [],
      sensorCategory: {
        label: "Sensor",
        value: null,
        opts: [
          { value: null, text: "Sensor", disabled: true },
          { value: 1, text: "Ultrasonic" },
          { value: 2, text: "Current" },
        ],
      },
      mathOps: {
        label: "Math Ops",
        value: null,
        opts: [
          { value: null, text: "Math Ops", disabled: true },
          { value: 1, text: ">" },
          { value: 2, text: "<" },
          { value: 2, text: "<=" },
          { value: 2, text: ">=" },
          { value: 2, text: "!=" },
        ],
      },
    };
  },
  watch: {
    containerSkenario: {
      handler: function (vals) {
        if (vals[vals.length - 1].value) {
          //   this.fixContainer.push(this.mathOps);
        }
      },
      deep: true,
    },
  },
  methods: {
    pushSkenario() {
      this.containerSkenario.push(this.sensorCategory);
      this.fixContainer = this.containerSkenario;
    },
  },
};
</script>
