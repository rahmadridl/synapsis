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
} from "../../Services/Cart/CartRepository.js";

export default async function createOne(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return error_handling(
        "Failed Delete Product From Cart",
        422,
        errors.array(),
        res
      );
    } else {
      function convertTZ(date, tzString) {
        return new Date(
          (typeof date === "string" ? new Date(date) : date).toLocaleString(
            "en-US",
            { timeZone: tzString }
          )
        );
      }

      let dataCart = await findCart(req.query.id);
      if (!dataCart) {
        return error_handling(
          "Failed Delete Product From Cart",
          409,
          "Id Not Found",
          res
        );
      }
      let checkCrt = await checkCart(req.query.id, req.app.locals.user_id);
      if (!checkCrt) {
        return error_handling(
          "Failed Delete Product From Cart",
          409,
          "User Dont Have cart_id",
          res
        );
      }
      let deleteData = await deletecart({
        where: {
          id: req.query.id,
        },
        force: true,
      });
      let tax = await readcart(req.app.locals.user_id);
      let arrayIdProduct = [];
      tax.rows.forEach((element) => {
        arrayIdProduct.push(element.product_id);
      });
      let result = await findProductListId(arrayIdProduct);

      return success("Success Delete Product From Cart", 201, result, res);
    }
  } catch (error) {
    console.log(error);
    return error_handling(
      "Failed Delete Product From Cart",
      500,
      error.message,
      res
    );
  }
}
