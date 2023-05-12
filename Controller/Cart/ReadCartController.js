import success from "../../Helper/Response/success.js";
import error_handling from "../../Helper/Response/error.js";
import { validationResult } from "express-validator";
import { findProductListId, readProduct, readcart } from "../../Services/Cart/CartRepository.js";
export default async function get(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return error_handling(
        "Failed Read Cart",
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
      let tax = await readcart(req.app.locals.user_id)
      let arrayIdProduct = []
      tax.rows.forEach(element => {
        arrayIdProduct.push(element.product_id)
      });
      let result = await findProductListId(arrayIdProduct)

      return success(
        "Success Read Cart",
        200,
        result,
        res,
      );
    }
  } catch (error) {
    console.error(error);
    return error_handling(
      "Failed Read Cart",
      500,
      error.message,
      res
    );
  }
}
