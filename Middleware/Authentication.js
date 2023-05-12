import jwt from 'jsonwebtoken';
import erorr_handling from "../Helper/Response/error.js";
import { getApikey, getToken } from '../Helper/authentication.js';

const authentication = async (req, res, next) => {
  try {
    // console.log(req.headers.authorization)
    const noauth = req.query.noauth;
    if (noauth) return next();

    const token = getToken(req.headers.authorization);
    // console.log(token);
    const apikey = getApikey(req.headers.authorization);
    if (!token || !apikey) {
      return erorr_handling('Unauthorized Access', 401, 'Please Login First', res);
    }
    
    jwt.verify(token, "your_key", (error, decoded) => {
      if (
        (error && error.name === 'JsonWebTokenError') ||
        (error && error.name === 'TokenExpiredError')
      ) {
        return erorr_handling(error.message, 401, 'Please Re Login', res);
      }
      req.app.locals.token = token;
      req.app.locals.user_id = decoded.user_id;
      next();
    });
  } catch (error) {
    console.error(error);
    return erorr_handling(error.message, 401, 'Please Login First', res);
  }
};

export default authentication;
