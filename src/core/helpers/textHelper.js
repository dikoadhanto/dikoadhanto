import moment from "moment-timezone";

export default {
  formatDate: (format, value) => {
    let finalValue = null;
    if (isNaN(Number(value))) {
      finalValue = value;
    } else {
      finalValue = Number(value);
    }
    if (finalValue && format) {
      let dateTime = new Date(finalValue);
      dateTime = moment(dateTime).utc().local().format(format);
      return dateTime;
    }
    return null;
  },
};
