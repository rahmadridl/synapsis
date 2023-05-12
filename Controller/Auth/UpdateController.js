import bcrypt from "bcryptjs";
import moment from "moment";
import success from "../../Helper/Response/success.js";
import errorHandling from "../../Helper/Response/error.js";
import {
  updateUser,
  FindUserbyid,
} from "../../Services/Auth/AuthRepository.js";
import { validationResult } from "express-validator";
var nowTime = moment().format("YYYY-MM-DD HH:mm:ss");

export default async function updateOne(req, res, next) {
  try {
    let checkData = await FindUserbyid(req.query.id);
    if (!checkData) {
      var deskripsi = {
        value: req.query.id,
        msg: "Data User Tidak Tersedia",
        param: "id",
        location: "params",
      };
      var data_deskripsi = [];
      data_deskripsi.push(deskripsi);
      return errorHandling("Data User Gagal Diubah", 500, data_deskripsi, res);
    } else {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return errorHandling(
          "Data User Gagal Diubah",
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
        var inputUser = {
          username: req.body.username,
          password: bcrypt.hashSync(req.body.password),
          created: convertTZ(new Date(Date.now()), "Asia/Jakarta"),
          updated: convertTZ(new Date(Date.now()), "Asia/Jakarta"),
        };
        let updateData = await updateUser(inputUser, {
          where: { id: req.query.id },
        });

        let responData = await FindUserbyid(req.query.id);
        return success("Data User Berhasil Diubah", 200, responData, res);
      }
    }
  } catch (error) {
    return errorHandling("Data User Gagal Diubah", 500, error.message, res);
  }
}
