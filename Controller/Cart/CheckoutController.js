import success from "../../Helper/Response/success.js";
import error_handling from "../../Helper/Response/error.js";
import { validationResult } from "express-validator";
import {
    checkPayment,
  createpayment,
  findProductListId,
  readProduct,
  readcart,
  updatepayment,
} from "../../Services/Cart/CartRepository.js";
export default async function get(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return error_handling("Failed Checkout", 422, errors.array(), res);
    } else {
      function convertTZ(date, tzString) {
        return new Date(
          (typeof date === "string" ? new Date(date) : date).toLocaleString(
            "en-US",
            { timeZone: tzString }
          )
        );
      }
      let tax = await readcart(req.app.locals.user_id);
      let arrayIdProduct = [];
      tax.rows.forEach((element) => {
        arrayIdProduct.push(element.product_id);
      });
      let result = await findProductListId(arrayIdProduct);
      let totalPrice = 0;
      let listProduct = [];
      result.forEach((element) => {
        totalPrice += element.price;
        listProduct.push({
          name: element.name,
          price: element.price,
        });
      });
      let payload = {
        listProduct,
        totalPrice,
      };

      let check = await checkPayment(req.app.locals.user_id)
      if (check) {
          let update = await updatepayment({
            total_price: totalPrice,
            updated_at: convertTZ(new Date(Date.now()), "Asia/Jakarta"),
          },{where:{
            user_id:req.app.locals.user_id
          }});
      } else {
          let create = await createpayment({
            user_id: req.app.locals.user_id,
            total_price: totalPrice,
            status_payment: false,
            created_at: convertTZ(new Date(Date.now()), "Asia/Jakarta"),
            updated_at: convertTZ(new Date(Date.now()), "Asia/Jakarta"),
          });
      }

      return success("Success Checkout", 200, payload, res);
    }
  } catch (error) {
    console.error(error);
    return error_handling("Failed Checkout", 500, error.message, res);
  }
}
