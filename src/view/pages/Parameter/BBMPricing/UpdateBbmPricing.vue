<template>
  <b-modal
    id="update-bbm-pricing"
    title="Update BBM Pricing"
    size="lg"
    hide-footer
    centered
  >
    <form @submit.prevent="updateDataBbmPricing">
      <b-row align-v="center" class="m-5" no-gutters>
        <b-col cols="4">
          <h6 class="m-0">ORGANISASI :</h6>
        </b-col>
        <b-col cols="8">
          <treeselect
            v-model="organization"
            :options="listOrganization"
            placeholder="Pilih Organisasi"
            :normalizer="normalizer"
            @select="getIdOrganization"
          />
        </b-col>
      </b-row>

      <b-row align-v="center" class="mx-5 mb-5" no-gutters>
        <b-col cols="4">
          <h6 class="m-0">HARGA BBM PER LITER :</h6>
        </b-col>
        <b-col cols="8">
          <input
            type="number"
            class="form-control form-control-solid"
            v-model="bbmPrice"
          />
        </b-col>
      </b-row>

      <b-row align-v="center" class="m-5">
        <b-col cols="auto" class="ml-auto">
          <button type="submit" class="btn btn-sm btn-success mt-5">
            SIMPAN &nbsp;
            <span><i class="fas fa-chevron-right icon-sm"></i></span>
          </button>
        </b-col>
      </b-row>
    </form>
  </b-modal>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import ApiService from "@/core/services/api.service";
import Swal from "sweetalert2";

export default {
  components: {
    Treeselect,
  },
  data() {
    return {
      organization: null,
      bbmPrice: null,
      listOrganization: [],
      parentSelected: null,
      normalizer(node) {
        return {
          label: node.name,
          children: node.organizations,
        };
      },
      dataBbmSelected: null,
    };
  },
  mounted() {
    this.getOrganization();
  },
  methods: {
    setDataBbmPrice(data) {
      this.organization = data.id_m_organization;
      this.bbmPrice = data.price;
      this.dataBbmSelected = data.id;
    },
    getOrganization() {
      ApiService.get(
        `${process.env.VUE_APP_ROOT_API_3}/organizations/hierarchy`
      )
        .then(({ data }) => {
          this.listOrganization = data.result.organizations;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getIdOrganization(node) {
      this.parentSelected = node;
    },
    updateDataBbmPricing() {
      if (this.organization == "" || this.organization == null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Pilih salah satu organisasi",
        });
      } else if (this.bbmPrice == "" || this.bbmPrice == null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Harga BBM per liter harus diisi",
        });
      } else {
        let dataBbm = {
          id_m_organization: this.organization,
          price: this.bbmPrice,
        };
        ApiService.put(
          `${process.env.VUE_APP_ROOT_API_3}/bbm-prices/${this.dataBbmSelected}`,
          dataBbm
        )
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "Data harga BBM berhasil diubah",
            }).then((result) => {
              if (result.isConfirmed || result.isDismissed) {
                this.$bvModal.hide("update-bbm-pricing");
                this.$emit("getAllDataBbmPrice");
              }
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>
