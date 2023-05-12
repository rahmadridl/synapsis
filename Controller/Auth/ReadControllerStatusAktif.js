import success from "../../Helper/Response/success.js";
import errorHandling from "../../Helper/Response/error.js";
import {
    readUserStatusAktif
} from "../../Services/Auth/AuthRepository.js";
import {
    validationResult
} from "express-validator";

export default async function get(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return errorHandling("Data Gagal Ditampilkan", 422, errors.array(), res);
      } else {
        const name = req.query.name || "";
  
        let requirement = {};
        // let klinik = clinic_id;
        let token = req.app.locals.token;
        if (name) requirement.name = name; //Filter Datas By Name
        let tax = await readUserStatusAktif(requirement,token);
        return success(
          "Data User Berhasil Ditampilkan",
          200,
          tax.rows,
          res
        );
      }
    } catch (error) {
      console.error(error);
      return errorHandling("Data User Gagal Ditampilkan", 500, error.message, res);
    }
  }
  