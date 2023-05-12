import { body, check, query } from "express-validator";
import {
  FindUserByEmail,
  CekPassword,
  FindUserbyid
} from "../Services/Auth/AuthRepository.js";

const validate = (method) => {
  switch (method) {
    case "signup": {
      return [
        body("name").custom(async (value) => {
            if (value === "") {
              throw new Error("Nama Tidak Boleh Kosong");
            } else if (value === null) {
              throw new Error("Nama Tidak Boleh Kosong");
            } else if (!value) {
              throw new Error("Field Nama Harus Dikirim");
            } else {
              return value;
            }
          }),

        body("email").custom(async (value) => {
          // var data_gmail = value.find((a) => a.startsWith("@gmail.com"));
          // var search_gmail = value.search("@gmail.com");
          // var search_yahoo1 = value.search("@yahoo.com");
          // var search_yahoo2 = value.search("@yahoo.co.id");

          // if (value != null && value != "") {
          //   let cek_data_email = await FindUserByEmail(value);
          //   if (
          //     search_gmail === -1 &&
          //     search_yahoo1 === -1 &&
          //     search_yahoo2 === -1
          //   ) {
          //     throw new Error("Email Tidak Valid");
          //   }
          //   if (cek_data_email !== null) {
          //     throw new Error("Email Sudah Ada");
          //   }
          // } else {
            if (value === "") {
              throw new Error("Email Tidak Boleh Kosong");
            } else if (value === null) {
              throw new Error("Email Tidak Boleh Kosong");
            } else if (!value) {
              throw new Error("Field Email Harus Dikirim");
            } else {
              return value;
            }
          }
        ),
        // check("email", "Email tidak valid")
        //   .isEmail()
        //   .normalizeEmail({ gmail_remove_dots: true, yahoo_remove_dots: true }),

        body("status")
          .exists()
          .withMessage("Field Status Wajib Kirim")
          .isBoolean()
          .withMessage("Status Tidak Valid"),

        body("password").custom(async (value) => {
          if (value === "") {
            throw new Error("Password Tidak Boleh Kosong");
          } else if (value === null) {
            throw new Error("Password Tidak Boleh Kosong");
          } else if (!value) {
            throw new Error("Field Password Id Harus Dikirim");
          } else {
            return value;
          }
        }),

        body("role").custom(async (value) => {
          if (value === "") {
            throw new Error("Role Tidak Boleh Kosong");
          } else if (value === null) {
            throw new Error("Role Tidak Boleh Kosong");
          } else if (!value) {
            throw new Error("Field Role Id Harus Dikirim");
          } else {
            return value;
          }
        }),

        body("phone").custom(async (value) => {
          if (value === "") {
            throw new Error("No Telepon Tidak Boleh Kosong");
          } else if (value === null) {
            throw new Error("No Telepon Tidak Boleh Kosong");
          } else if (!value) {
            throw new Error("Field No Telepon Harus Dikirim");
          } else {
            return value;
          }
        }),

          body("clinic_id").custom(async (value) => {
            if (value === "") {
              throw new Error("Clinic id Tidak Boleh Kosong");
            } else if (value === null) {
              throw new Error("Clinic id Tidak Boleh Kosong");
            } else if (!value) {
              throw new Error("Field Clinic id Harus Dikirim");
            } else {
              return value;
            }
          }),
      ];
    }

    case "signin": {
      return [
        body("email").custom(async (value, { req }) => {
          if (value != null && value != "") {
            let cek_data_username = await FindUserByEmail(value);
            if (!cek_data_username) {
              throw new Error("Email Tidak Ditemukan");
            }
          } else {
            if (value === "" ) {
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
        body("password").custom(async (value, { req }) => {
          if (value != null && value != "") {
            // console.log("qqww", req.body.email);
            let user = await FindUserByEmail(req.body.email);
            console.log("tes", req.body.email);
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
            if (value === "" ) {
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
        body("name").custom(async (value) => {
          if (value === "") {
            throw new Error("Nama Tidak Boleh Kosong");
          } else if (value === null) {
            throw new Error("Nama Tidak Boleh Kosong");
          } else if (!value) {
            throw new Error("Field Nama Harus Dikirim");
          } else {
            return value;
          }
        }),

        body("email").custom(async (value,{req}) => {
          // var data_gmail = value.find((a) => a.startsWith("@gmail.com"));
          // var search_gmail = value.search("@gmail.com");
          // var search_yahoo1 = value.search("@yahoo.com");
          // var search_yahoo2 = value.search("@yahoo.co.id");
  
          // if (value != null && value != "") {
          //   let cek_data_email = await FindUserByEmail(value);
          //   let cek_data = await FindUserbyid(req.query.id);
          //   if (
          //     search_gmail === -1 &&
          //     search_yahoo1 === -1 &&
          //     search_yahoo2 === -1
          //   ) {
          //     throw new Error("Email Tidak Valid");
          //   }
          //   if (cek_data_email !== null && cek_data.email !== value) {
          //     throw new Error("Email Sudah Ada");
          //   }
          // } else {
            if (value === "") {
              throw new Error("Email Tidak Boleh Kosong");
            } else if (value === null) {
              throw new Error("Email Tidak Boleh Kosong");
            } else if (!value) {
              throw new Error("Field Email Harus Dikirim");
            } else {
              return value;
            }
          
        }),

      // check("email", "Email tidak valid")
      //   .isEmail()
      //   .normalizeEmail({ gmail_remove_dots: true, yahoo_remove_dots: true }),

      body("status")
        .exists()
        .withMessage("Field Status Wajib Kirim")
        .isBoolean()
        .withMessage("Status Tidak Valid"),

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

      // body("role").custom(async (value) => {
      //   if (value === "") {
      //     throw new Error("Role Tidak Boleh Kosong");
      //   } else if (value === null) {
      //     throw new Error("Role Tidak Boleh Kosong");
      //   } else if (!value) {
      //     throw new Error("Field Role Id Harus Dikirim");
      //   } else {
      //     return value;
      //   }
      // }),

      body("phone").custom(async (value) => {
        if (value === "") {
          throw new Error("No Telepon Tidak Boleh Kosong");
        } else if (value === null) {
          throw new Error("No Telepon Tidak Boleh Kosong");
        } else if (!value) {
          throw new Error("Field No Telepon Harus Dikirim");
        } else {
          return value;
        }
      }),


        // body("clinic_id").custom(async (value) => {
        //   if (value === "") {
        //     throw new Error("Clinic id Tidak Boleh Kosong");
        //   } else if (value === null) {
        //     throw new Error("Clinic id Tidak Boleh Kosong");
        //   } else if (!value) {
        //     throw new Error("Field Clinic id Harus Dikirim");
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
