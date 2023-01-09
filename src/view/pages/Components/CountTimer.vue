<template>
  <section id="timer-counter">
    <div class="count-desc mr-1">Refresh Period :</div>
    <b-form-select
      class="form-select-counter mr-2"
      v-model="timerSelected"
      :options="listTime"
      @input="setTimerSelected"
    ></b-form-select>
    <div class="wrap-refresh bg-success text-white mr-2">
      <div class="refresh-text mr-2">Auto Refresh</div>
      <div class="refresh-box bg-white text-success">
        {{ changeTimer() }}
      </div>
    </div>
    <div class="wrap-refresh bg-success text-white">
      <div class="refresh-text mr-2">Last Update</div>
      <div class="refresh-box bg-white text-success">{{ lastTimeUpdate }}</div>
    </div>
  </section>
</template>

<script>
import textHelper from "@/core/helpers/textHelper.js";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  emits: ["getData"],
  data() {
    return {
      listTime: [
        // {
        //   text: "10 Detik",
        //   value: 10000,
        // },
        {
          text: "1 Menit",
          value: 60000,
        },
        {
          text: "2 Menit",
          value: 120000,
        },
        {
          text: "5 Menit",
          value: 300000,
        },
        {
          text: "10 Menit",
          value: 600000,
        },
        {
          text: "No Refresh",
          value: null,
        },
      ],
      timerSelected: 60000,
      timerInterval: 60000,
      lastTimeUpdate: "0/00/0000, 0:00:00",
    };
  },
  mounted() {
    this.changeTimeUpdate();
    this.countTimerInterval = setInterval(() => {
      if (this.timerInterval > 1000) {
        this.timerInterval -= 1000;
      } else {
        this.timerInterval = this.timerSelected;
      }
    }, 1000);
  },
  watch: {
    timerInterval: function () {
      if (this.timerInterval == null) {
        return;
      }
      if (this.timerInterval == 1000) {
        setTimeout(() => {
          this.$emit("getData");
          this.$store.dispatch("setIsAutoRefresh", true);
          this.changeTimeUpdate();
        }, 1000);
      }
    },
  },
  methods: {
    changeTimer() {
      let time = this.timerInterval / 1000;
      let minutes = Math.floor(time / 60);
      let seconds = time - minutes * 60;
      return `${minutes > 9 ? minutes : "0" + minutes} : ${
        seconds > 9 ? seconds : "0" + seconds
      }`;
    },
    changeTimeUpdate() {
      let date = new Date();
      this.lastTimeUpdate = textHelper.formatDate("DD/MM/YYYY, HH:mm:ss", date);
    },
    setTimerSelected() {
      this.timerInterval = this.timerSelected;
    },
  },
  beforeDestroy() {
    clearInterval(this.countTimerInterval);
  },
};
</script>

<style scoped>
#timer-counter {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
}
.form-select-counter {
  width: 17%;
}
.wrap-refresh {
  display: flex;
  align-items: center;
}
.refresh-box,
.wrap-refresh {
  padding: 5px;
  border-radius: 5px;
}
.refresh-text {
  font-weight: 500;
}
</style>
