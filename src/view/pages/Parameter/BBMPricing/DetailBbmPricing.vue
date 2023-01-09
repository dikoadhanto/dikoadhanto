<template>
  <b-modal
    id="detail-bbm-pricing"
    title="Detail BBM Pricing"
    size="lg"
    hide-footer
    centered
    @close="closeDetail"
    @hide="closeDetail"
  >
    <form>
      <b-row align-v="center" class="m-5" no-gutters>
        <b-col cols="4">
          <h6 class="m-0">ORGANISASI :</h6>
        </b-col>
        <b-col cols="8">
          <input
            class="form-control form-control-solid"
            v-model="detailOrganisasi"
            disabled
          />
        </b-col>
      </b-row>

      <b-row align-v="center" class="mx-5 mb-5" no-gutters>
        <b-col cols="4">
          <h6 class="m-0">HARGA BBM PER LITER :</h6>
        </b-col>
        <b-col cols="8">
          <input
            class="form-control form-control-solid"
            v-model="detailBbmPrice"
            disabled
          />
        </b-col>
      </b-row>
    </form>
  </b-modal>
</template>

<script>
export default {
  props: ["detailBbmPricing", "isDetail"],
  emits: ["hideDetail"],
  data() {
    return {
      detailOrganisasi: "",
      detailBbmPrice: "",
    };
  },
  watch: {
    isDetail: function () {
      if (this.isDetail == true) {
        this.detailOrganisasi = this.detailBbmPricing.org_name;
        this.detailBbmPrice =
          "Rp. " + Number(this.detailBbmPricing.price).toLocaleString("id-ID");
      }
    },
  },
  methods: {
    closeDetail() {
      this.$emit("hideDetail");
    },
  },
};
</script>

<style scoped></style>
