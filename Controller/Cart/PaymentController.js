import moment from "moment";
import success from "../../Helper/Response/success.js";
import error_handling from "../../Helper/Response/error.js";
import { validationResult } from "express-validator";
import axios from "axios";
import {
  checkCart,
  createcart,
  deletecart,
  findCart,
  findProduct,
  findProductListId,
  readcart,
  updatepayment,
} from "../../Services/Cart/CartRepository.js";

export default async function createOne(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return error_handling("Failed Payment", 422, errors.array(), res);
    } else {
      function convertTZ(date, tzString) {
        return new Date(
          (typeof date === "string" ? new Date(date) : date).toLocaleString(
            "en-US",
            { timeZone: tzString }
          )
        );
      }

      let dataPayment = await updatepayment(
        {
          status_payment: true,
          updated_at: convertTZ(new Date(Date.now()), "Asia/Jakarta"),
        },
        {
          where: {
            user_id: req.app.locals.user_id,
          },
        }
      );

      let deleteData = await deletecart({
        where: {
          user_id: req.app.locals.user_id,
        },
        force: true,
      });

      return success("Success Payment", 201, "Thank You", res);
    }
  } catch (error) {
    console.log(error);
    return error_handling("Failed Payment", 500, error.message, res);
  }
}
