<template>
  <b-modal
    id="add-bbm-pricing"
    title="Tambah BBM Pricing"
    size="lg"
    hide-footer
    centered
    @close="closeAdd"
  >
    <form @submit.prevent="submitForm">
      <b-row align-v="center" class="m-5" no-gutters>
        <b-col cols="4">
          <h6 class="m-0">
            ORGANISASI&nbsp;<span class="required"></span>&nbsp;:
          </h6>
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
          <h6 class="m-0">
            HARGA BBM PER LITER&nbsp;<span class="required"></span>&nbsp;:
          </h6>
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
    };
  },
  mounted() {
    this.getOrganization();
  },
  methods: {
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
    submitForm() {
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
        let data = {
          id_m_organization: this.organization,
          price: this.bbmPrice,
        };
        ApiService.post(`${process.env.VUE_APP_ROOT_API_3}/bbm-prices`, data)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "Harga BBM berhasil ditambahkan",
            }).then((result) => {
              if (result.isConfirmed || result.isDismissed) {
                this.$bvModal.hide("add-bbm-pricing");
                this.organization = null;
                this.bbmPrice = "";
                this.$emit("getAllDataBbmPrice");
              }
            });
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              icon: "error",
              title: "Oops..",
              text: "Organisasi tersebut sudah memiliki harga BBM",
            });
          });
      }
    },
    closeAdd() {
      this.organization = null;
      this.bbmPrice = null;
      this.$emit.hideAdd;
    },
  },
};
</script>

<style scoped>
.required:after {
  content: "*";
  color: red;
}
</style>
