import User from "../../Model/user.js";
import jwt from "jsonwebtoken";
import moment from "moment";
import jwtsecret from "../../Config/auth_config.js";
import success from "../../Helper/Response/success.js";
import errorHandling from "../../Helper/Response/error.js";
import { base_url } from "../../Helper/api.js";
import {
  FindUserByEmail,
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
      let user = await FindUserByEmail(req.body.username);
      // let resDataClinic = await FindClinicbyid(user.clinic_id);

      var token = jwt.sign(
        {
          user_id: user.id,
        },
        jwtsecret,
        {
          expiresIn: 86400, //24 hours
        }
      );
      await User.update(
        {
          token: token,
        },
        { where: { id: user.id } }
      );

      // console.log("TES", dataClinic[0]);
      var data = {
        id: user.id,
        username: user.username,
        accessToken: token,
      };
      return success("Login Berhasil!", 201, data, res);
    }
  } catch (error) {
    console.log(error);
    return errorHandling("Login Gagal!", 500, error.message, res);
  }
}
