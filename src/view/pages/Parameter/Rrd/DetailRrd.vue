<template>
  <b-modal id="modal-detail-rrd" size="lg" title="Detail RRD" hide-footer>
    <section id="detail-rrd">
      <div class="container">
        <form>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label">NAMA RRD <span class="required-icon">*</span> :</label>
            <div class="col-sm-9">
              <input type="text" class="form-control" v-model="rrdSelected.name" disabled>
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label">RRD IP <span class="required-icon">*</span> :</label>
            <div class="col-sm-9">
              <input type="text" class="form-control" v-model="rrdSelected.ip_address" disabled>
            </div>
          </div>
          <div class="mb-3 row align-items-center">
            <label class="col-sm-3 col-form-label">IS ACTIVE <span class="required-icon">*</span> :</label>
            <div class="col-sm-9">
            <b-form-checkbox name="check-button" size="lg" switch disabled checked="true" v-if="rrdSelected.is_active == 1">
              Active
            </b-form-checkbox>
            <b-form-checkbox name="check-button" size="lg" switch disabled v-else>
              Tidak Active
            </b-form-checkbox>
            </div>
          </div>
        </form>
      </div>
    </section>
  </b-modal>
</template>

<script>
export default {
  props: ['rrdSelected'],
}
</script>

<style scoped>
.col-form-label{
  font-weight: bold;
}
.required-icon{
  color: #c70000;
}
.form-control{
  background-color: #F4F8FA;
}
</style>