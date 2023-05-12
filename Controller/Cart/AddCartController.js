import moment from "moment";
import success from "../../Helper/Response/success.js";
import error_handling from "../../Helper/Response/error.js";
import { validationResult } from "express-validator";
import axios from "axios";
import { createcart, findProduct } from "../../Services/Cart/CartRepository.js";

export default async function createOne(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return error_handling(
        "Failed Add To Cart",
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

      let getPrice = await findProduct(req.body.product_id)
      let createData = await createcart({
        ...req.body,
        user_id: req.app.locals.user_id,
        price: getPrice.price,
        created_at: convertTZ(new Date(Date.now()), "Asia/Jakarta"),
        updated_at: convertTZ(new Date(Date.now()), "Asia/Jakarta"),
      });

      return success("Success Add To Cart", 201, createData, res);
    }
  } catch (error) {
    console.log(error);
    return error_handling(
      "Failed Add To Cart",
      500,
      error.message,
      res
    );
  }
}
