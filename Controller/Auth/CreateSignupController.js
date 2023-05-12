import bcrypt from "bcryptjs";
import moment from "moment";
import success from "../../Helper/Response/success.js";
import errorHandling from "../../Helper/Response/error.js";
import {
    createSignUp,
} from "../../Services/Auth/AuthRepository.js";
import {
    validationResult
} from "express-validator";
var nowTime = moment().format("YYYY-MM-DD HH:mm:ss");

export default async function createOne(req, res) {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return errorHandling ("Data Gagal Register", 422, error.array(), res);
        } else {
            function convertTZ(date, tzString) {
                return new Date(
                  (typeof date === "string" ? new Date(date) : date).toLocaleString(
                    "en-US",
                    { timeZone: tzString }
                  )
                );
              }
            var create_SignUp = {
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password),
                created_at: convertTZ(new Date(Date.now()), "Asia/Jakarta"),
                updated_at: convertTZ(new Date(Date.now()), "Asia/Jakarta"), 
            };
            let SignUp = await createSignUp(create_SignUp) 
            delete SignUp.dataValues.password
            return success("Register Berhasil!", 201, SignUp, res);
        }
    } catch (error) {
        return errorHandling("Gagal Register!", 500, error.message, res);
    }
};



