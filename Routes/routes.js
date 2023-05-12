import { AuthRoutes } from "../Services/Auth/AuthRouter.js";
import { cartRoutes } from "../Services/Cart/CartRoutes.js";

const MainRoutes = (app) => {
    AuthRoutes(app);
    cartRoutes(app)
};
  
export default MainRoutes;
  