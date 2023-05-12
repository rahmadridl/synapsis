import success from "../../Helper/Response/success.js";
import errorHandling from "../../Helper/Response/error.js";
import {
    readProfile
} from "../../Services/Auth/AuthRepository.js";
import {
    validationResult
} from "express-validator";


// Get Detail User dan clinic
export default async function get(req, res) {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return errorHandling ("Data Gagal Ditampilkan", 422, error.array(), res);
        } else {
            const search = req.query.search ? req.query.search.toLowerCase() : '';

            let requirement = {};
            let token = req.app.locals.token;
            let user = req.app.locals.user_id;
            if (search) requirement.search = search; //Filter By Search
            let tax = await readProfile(requirement, token, user);

            return success(
                'Detail User Berhasil Ditampilkan',
                200,
                tax.rows,
                res,
            );
        }
    } catch (error) {
        return errorHandling('Detail User Gagal Ditampilkan', 500, error.message, res);
    }
}

    
            