import sign_up from "../../Controller/Auth/CreateSignupController.js";
import sign_in from "../../Controller/Auth/CreateSigninController.js";
import log_out from "../../Controller/Auth/CreateLogoutController.js";
import profil from "../../Controller/Auth/ReadProfileController.js";

import read_statusAktif from "../../Controller/Auth/ReadControllerStatusAktif.js";
import update_user from "../../Controller/Auth/UpdateController.js";
import validatorAuth from "../../Validator/AuthValidator.js";
import AuthMiddleware from "../../Middleware/Authentication.js";

const AuthRoutes = (app) => {
  app.route(`/api/signup`).post(validatorAuth("signup"), sign_up);
  app.route(`/api/signin`).post(validatorAuth("signin"), sign_in);
  app.route(`/api/logout`).post(validatorAuth("logout"), log_out);
  app.route(`/api/profile`).get(AuthMiddleware, profil);
  app
    .route(`/api/user_aktif`)
    .get(AuthMiddleware, validatorAuth("read_aktif"), read_statusAktif);
  app.route(`/api/update`).put(validatorAuth("update"), update_user);
};

export { AuthRoutes };
