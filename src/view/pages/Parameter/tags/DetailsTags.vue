<template>
  <b-modal
    id="details-tags"
    title="Detail Tags"
    size="lg"
    scrollable
    hide-footer
    centered
  >
    <form>
      <b-row align-v="center" class="mb-5">
        <!-- Input Nama -->
        <b-col cols="3">
          <h6>Nama Tags :</h6>
        </b-col>
        <b-col cols="9">
          <div class="form-group mb-0">
            <input
              type="text"
              class="form-control form-control-solid"
              v-model="tag.name"
              disabled
            />
          </div>
        </b-col>
      </b-row>

      <!-- Input Deskripsi -->
      <b-row align-v="center" class="mb-5">
        <b-col cols="3">
          <h6>Deskripsi :</h6>
        </b-col>
        <b-col cols="9">
          <div class="form-group mb-0">
            <input
              type="text"
              class="form-control form-control-solid"
              v-model="tag.description"
              disabled
            />
          </div>
        </b-col>
      </b-row>
    </form>
  </b-modal>
</template>

<script>
export default {
  props: ["getIdTags"],
  data() {
    return {
      tag: {
        name: "",
        description: "",
      },
    };
  },
  methods: {
    setTag(data) {
      this.tag = data;
    },
  },
};
</script>
