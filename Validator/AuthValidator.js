import { body, check, query } from "express-validator";
import {
  FindUserByEmail,
  CekPassword,
  FindUserbyid,
} from "../Services/Auth/AuthRepository.js";

const validate = (method) => {
  switch (method) {
    case "signup": {
      return [
        body("username").custom(async (value) => {
          if (value === "") {
            throw new Error("username Tidak Boleh Kosong");
          } else if (value === null) {
            throw new Error("username Tidak Boleh Kosong");
          } else if (!value) {
            throw new Error("username Tidak Boleh Kosong");
          } else {
            return value;
          }
        }),

        body("password").custom(async (value) => {
          if (value === "") {
            throw new Error("Password Tidak Boleh Kosong");
          } else if (value === null) {
            throw new Error("Password Tidak Boleh Kosong");
          } else if (!value) {
            throw new Error("Password Tidak Boleh Kosong");
          } else {
            return value;
          }
        }),
      ];
    }

    case "signin": {
      return [
        body("username").custom(async (value, { req }) => {
          if (value != null && value != "") {
            let cek_data_username = await FindUserByEmail(value);
            if (!cek_data_username) {
              throw new Error("username Tidak Ditemukan");
            }
          } else {
            if (value === "") {
              throw new Error("username Tidak Boleh Kosong");
            } else if (value === "") {
              throw new Error("username Tidak Boleh Kosong");
            } else if (value === null) {
              throw new Error("username Tidak Boleh Kosong");
            } else if (!value) {
              throw new Error("username Tidak Boleh Kosong");
            } else {
              return value;
            }
          }
        }),
        body("password").custom(async (value, { req }) => {
          if (value != null && value != "") {
            // console.log("qqww", req.body.email);
            let user = await FindUserByEmail(req.body.username);
            let cek_password = await CekPassword(value, user.password);
            // console.log("datas", cek_password);
            if (!cek_password) {
              throw new Error("Password Tidak Valid");
            }
          } else {
            if (value === "") {
              throw new Error("Password Tidak Boleh Kosong");
            } else if (value === null) {
              throw new Error("Password Tidak Boleh Kosong");
            } else {
              return value;
            }
          }
        }),
      ];
    }

    case "logout": {
      return [
        body("email").custom(async (value, { req }) => {
          if (value != null && value != "") {
            let cek_data_username = await FindUserByEmail(value);
            if (!cek_data_username) {
              throw new Error("Email Tidak Ditemukan");
            }
          } else {
            if (value === "") {
              throw new Error("Email Tidak Boleh Kosong");
            } else if (value === "") {
              throw new Error("Email Tidak Boleh Kosong");
            } else if (value === null) {
              throw new Error("Email Tidak Boleh Kosong");
            } else if (!value) {
              throw new Error("Field Email Harus Dikirim");
            } else {
              return value;
            }
          }
        }),
      ];
    }

    case "read": {
      return [
        query("Page_size").custom(async (value, { req }) => {
          if (req.query.page_size === undefined) {
            throw new Error("Page size Harus Diisi");
          } else {
            return value;
          }
        }),
        query("Page").custom(async (value, { req }) => {
          if (req.query.page === undefined) {
            throw new Error("Page  Harus Diisi");
          } else {
            return value;
          }
        }),
      ];
    }

    // Start Session Validator Read Aktif
    case "read_aktif": {
      return [
        query("Page_size").custom(async (value, { req }) => {
          return value;
        }),
        query("Page").custom(async (value, { req }) => {
          return value;
        }),
      ];
    }
    // End Session Validator Read Aktif

    case "update": {
      return [
        body("username").custom(async (value) => {
          if (value === "") {
            throw new Error("username Tidak Boleh Kosong");
          } else if (value === null) {
            throw new Error("username Tidak Boleh Kosong");
          } else if (!value) {
            throw new Error("username Tidak Boleh Kosong");
          } else {
            return value;
          }
        }),

        // body("password").custom(async (value) => {
        //   if (value === "") {
        //     throw new Error("Password Tidak Boleh Kosong");
        //   } else if (value === null) {
        //     throw new Error("Password Tidak Boleh Kosong");
        //   } else if (!value) {
        //     throw new Error("Field Password Id Harus Dikirim");
        //   } else {
        //     return value;
        //   }
        // }),

      ];
    }

    default:
      return [];
  }
};

export default validate;
