import moment from "moment";

// export default async function convert_time(time) {
//   if (time === null || time === undefined) {
//     // console.log('masuk null');
//     return null;
//   }
//   return momentt(time).format("YYYY,MM,DD");
// }

function getDateTime(date) {
  // var date = new Date();
  var hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;
  var min = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;
  var sec = date.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = (month < 10 ? "0" : "") + month;
  var day = date.getDate();
  day = (day < 10 ? "0" : "") + day;
  return (
    year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec
  );
}



function convertTZ(date, tzString) {
  return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}

const convert_time = (time) => {
  if (time === null || time === undefined) {
    // console.log('masuk null');
    return null;
  }
  console.log(time);
  let result = moment(time).local().format("HH:mm:ss");
  console.log(result);
  return result;
};

async function loop(item, callback) {
  for (var a = 0; a < item.length; a++) {
    // eslint-disable-next-line
    await callback(item[a]);
  }
}

export { convert_time, loop, getDateTime, convertTZ };
