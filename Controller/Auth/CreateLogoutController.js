import User from "../../Model/m_user.js";
import jwt from "jsonwebtoken";
import moment from "moment";
import jwtsecret from "../../Config/auth_config.js";
import success from "../../Helper/Response/success.js";
import errorHandling from "../../Helper/Response/error.js";
import {
    FindUserByEmail,
    FindRolesbyid,
    FindClinicbyid,
} from "../../Services/Auth/AuthRepository.js";
import {
    validationResult
} from "express-validator";
import axios from "axios";

const now_times = (req, res) => {
    var now_time = moment().add(7, "hours").format("YYYY-MM-DD HH:mm:ss");
    return now_time;
  };

  export default async function createOne(req, res) {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return errorHandling("Logout Gagal", 401, error.array(), res);
        } else {
            let user = await FindUserByEmail(req.body.email);
            let data_roles = await FindRolesbyid(user.role);
            // let data_klinik = await FindClinicbyid(user.clinic_id)

            var token = jwt.sign(
                { 
                    user_id: user.id
                },
                jwtsecret,
                {
                    expiresIn: 86400, //24 hours
                }
            );

            await User.update(
                {
                    token: null,
                    expired_time: now_times(),
                },
                { where: { id: user.id } }
            );

            var data = {
                id: user.id,
                email: user.email,
                role: data_roles.name
            };
            return success("Logout Berhasil!", 201, data, res);
        }
    } catch (error) {
        return errorHandling("Logout Gagal!", 500, error.message, res);
    }
  };
