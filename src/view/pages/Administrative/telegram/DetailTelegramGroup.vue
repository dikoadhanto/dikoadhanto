<template>
  <b-modal
    id="modal-detail-telegram"
    size="lg"
    title="Detail Telegram Group"
    hide-footer
  >
    <section id="add-telegram">
      <div class="container">
        <form>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label">GROUP NAME :</label>
            <div class="col-sm-9">
              <input
                type="text"
                class="form-control"
                v-model="telegramSelected.group_name"
                disabled
              />
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label">GROUP ID :</label>
            <div class="col-sm-9">
              <input
                type="text"
                class="form-control"
                v-model="telegramSelected.chat_id"
                disabled
              />
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label">DESKRIPSI :</label>
            <div class="col-sm-9">
              <input
                type="text"
                class="form-control"
                :placeholder="
                  telegramSelected.description
                    ? telegramSelected.description
                    : '-'
                "
                disabled
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  </b-modal>
</template>

<script>
export default {
  props: ["telegramSelected"],
};
</script>

<style scoped>
.col-form-label {
  font-weight: bold;
}
.form-control {
  background-color: #f4f8fa;
}
</style>
