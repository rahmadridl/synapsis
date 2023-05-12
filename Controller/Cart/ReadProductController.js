import success from "../../Helper/Response/success.js";
import error_handling from "../../Helper/Response/error.js";
import { validationResult } from "express-validator";
import { readProduct } from "../../Services/Cart/CartRepository.js";
export default async function get(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return error_handling(
        "Failed Read Products",
        422,
        errors.array(),
        res
      );
    } else {
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
          year + "-" + month + "-" + day
          // + " " + hour + ":" + min + ":" + sec
        );
      }
      function convertTZ(date, tzString) {
        return new Date(
          (typeof date === "string" ? new Date(date) : date).toLocaleString(
            "en-US",
            { timeZone: tzString }
          )
        );
      }
      const search = req.query.search ? req.query.search.toLowerCase() : "";
      let tax = await readProduct(search, req.query.category_id || '')

      return success(
        "Success Read Products",
        200,
        tax.rows,
        res,
      );
    }
  } catch (error) {
    console.error(error);
    return error_handling(
      "Failed Read Products",
      500,
      error.message,
      res
    );
  }
}
