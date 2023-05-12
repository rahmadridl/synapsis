import read_cart from "../../Controller/Cart/ReadCartController.js";
import create_cart from "../../Controller/Cart/AddCartController.js";
import delete_cart from "../../Controller/Cart/DeleteCartController.js";
import checkout from "../../Controller/Cart/CheckoutController.js";
import payment from "../../Controller/Cart/PaymentController.js";
import read_product from "../../Controller/Cart/ReadProductController.js";
import AuthMiddleware from "../../Middleware/Authentication.js";

const cartRoutes = (app) => {
  app.route(`/api/addcart`).post(AuthMiddleware, create_cart);
  app.route(`/api/cart`).get(AuthMiddleware, read_cart);
  app.route(`/api/deletecart`).put(AuthMiddleware, delete_cart);
  app.route(`/api/checkout`).post(AuthMiddleware, checkout);
  app.route(`/api/payment`).put(AuthMiddleware, payment);
  app.route(`/api/product`).get(AuthMiddleware, read_product);
};
export { cartRoutes };
