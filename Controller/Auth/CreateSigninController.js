import User from "../../Model/m_user.js";
import jwt from "jsonwebtoken";
import moment from "moment";
import jwtsecret from "../../Config/auth_config.js";
import success from "../../Helper/Response/success.js";
import errorHandling from "../../Helper/Response/error.js";
import { base_url } from "../../Helper/api.js";
import {
  FindUserByEmail,
  FindRolesbyid,
  FindClinicbyid,
} from "../../Services/Auth/AuthRepository.js";
import { validationResult } from "express-validator";
import axios from "axios";

const update_time = (req, res) => {
  var expired_time = moment()
    .add(10, "hours")
    // .add(3, "minutes")
    .format("YYYY-MM-DD HH:mm:ss");

  console.log(expired_time);
  return expired_time;
};

export default async function createOne(req, res) {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return errorHandling("Email Atau Password Tidak Sesuai", 401, error.array(), res);
    } else {
      let user = await FindUserByEmail(req.body.email);
      let data_roles = await FindRolesbyid(user.role);
      // let resDataClinic = await FindClinicbyid(user.clinic_id);

      var token = jwt.sign(
        {
          user_id: user.id,
          clinic_id: user.clinic_id,
        },
        jwtsecret,
        {
          expiresIn: 86400, //24 hours
        }
      );
      await User.update(
        {
          token: token,
          expired_time: update_time(),
          token_notif: req.body.idToken
        },
        { where: { id: user.id } }
      );

      // console.log("aaaa", token);
      let resDataClinic = await axios.get(
        base_url + "api/datamaster/clinic_aktif/read",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      var dataClinic = resDataClinic.data.payload;
      // console.log("TES", dataClinic);

      let detailClinic = dataClinic.filter(
        (data) => data.id == user.clinic_id
      )[0];
      // console.log("TES1", detailClinic);
      let Clinic = {
        clinic_id: detailClinic.id,
        clinic_name: detailClinic.clinic_name,
        clinic_code: detailClinic.clinic_code,
      };

      // console.log("TES", dataClinic[0]);
      var data = {
        id: user.id,
        email: user.email,
        role: data_roles.id,
        clinic: Clinic.clinic_id,
        clinic_code: Clinic.clinic_code,
        clinic_name: Clinic.clinic_name,
        accessToken: token,
      };
      return success("Login Berhasil!", 201, data, res);
    }
  } catch (error) {
    console.log(error);
    return errorHandling("Login Gagal!", 500, error.message, res);
  }
}
