import moment from "moment";

const now_times = (req, res) => {
  var now_time = moment().format("YYYY-MM-DD HH:mm:ss");
  return now_time;
};

export { now_times };
