import { AuthRoutes } from "../Services/Auth/AuthRouter.js";
import { rolesRoutes } from "../Services/Roles/RolesRoutes.js";
import { permissionRoutes } from "../Services/Permission/PermissionRoutes.js";

const MainRoutes = (app) => {
    AuthRoutes(app);
    rolesRoutes(app);
    permissionRoutes(app)
};
  
export default MainRoutes;
  