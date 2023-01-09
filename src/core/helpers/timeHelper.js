export default {
  changeDurationTime(time) {
    let seconds = Math.floor(time) % 60;
    let minutes = Math.floor(time / 60) % 60;
    let hours = Math.floor(time / 3600) % 24;
    let days = Math.floor(time / 86400);
    let s = seconds < 10 ? "0" + seconds : seconds;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let h = hours < 10 ? "0" + hours : hours;
    let d = days < 10 ? "0" + days : days;
    return `${d}h ${h}j ${m}m ${s}d`;
  },
};
