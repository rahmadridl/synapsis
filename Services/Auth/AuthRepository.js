import User from "../../Model/user.js";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import sequelize from "sequelize";
import pkg from "lodash";
const { groupBy, forEach, find } = pkg;

// Start Session Create Data User
const createSignUp = async (data, transaction) => {
  const t = transaction ? transaction : await User.sequelize.transaction();
  try {
    let result = await User.create(data, { transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error("[EXCEPTION] createSignUp", error);
    throw new Error(error);
  }
};
// End Session Create Data User

// Start Session Update Data User
const updateUser = async (data, filter, transaction) => {
  const t = transaction ? transaction : await User.sequelize.transaction();
  try {
    let result = await User.update(data, { ...filter, transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error("[EXCEPTION] updateUser", error);
    throw new Error(error);
  }
};
// End Session Update Data User

// Start Session User By Email
const FindUserByEmail = async (email) => {
  try {
    let result = await User.findOne({
      where: {
        username: { [Op.iLike]: `${email}` },
      },
    });
    console.log("data" + JSON.stringify(result));
    return result;
  } catch (error) {
    // console.error("[EXCEPTION] FindIcdtByName", error);
    throw new Error(error);
  }
};
// End Session User By Email

// Start Session Clinic
const FindnotById = async (id) => {
  try {
    let result = await User.findAll({
      where: {
        id: { [Op.not]: id },
      },
    });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] FindnotById", error);
    throw new Error(error);
  }
};
// End Session Clinic

// Start Session User By Id
const FindUserbyid = async (id) => {
  try {
    let result = await User.findByPk(id, {
      raw: true,
    });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] findUserById", error);
    throw new Error(error);
  }
};
// End Session User By Id

// Start Session Cek Password
const CekPassword = async (pass_body, pass_user) => {
  try {
    // let user = await User.findOne({
    //   where: {
    //     username: username,
    //   },
    // });

    let result = bcrypt.compareSync(pass_body, pass_user);
    // console.log("data" + JSON.stringify(result));
    return result;
  } catch (error) {
    // console.error("[EXCEPTION] CekPassword", error);
    throw new Error(error);
  }
};
// End Session Cek Password

//Start Session Read Data User All
const readUser = async ({ search }, page, page_size, token) => {
  try {
    let result = await User.findAndCountAll({
      where: {
        [Op.or]: [
          {
            name: search
              ? sequelize.where(
                  sequelize.fn("LOWER", sequelize.col("name")),
                  "LIKE",
                  "%" + search + "%"
                )
              : { [Op.like]: `%%` },
          },
        ],
        // name: name ? { [Op.iLike]: `%${name}%` } : { [Op.iLike]: `%%` },
      },
      offset: page_size * page,
      limit: page_size,
      order: [["id", "DESC"]],
    });

    var datas = result.rows;
    let resDataClinic = await axios.get(
      base_url + "api/datamaster/clinic_aktif/read",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    var dataClinic = resDataClinic.data.payload;

    var newArray = datas.map((item) => {
      let detailClinic = dataClinic.filter(
        (data) => data.id == item.clinic_id
      )[0];
      // console.log("TES1", detailClinic);
      let Clinic = {
        clinic_id: detailClinic.id,
        clinic_name: detailClinic.clinic_name,
        clinic_code: detailClinic.clinic_code,
      };

      return {
        id: item.id,
        name: item.name,
        email: item.email,
        role: item.role,
        status: item.status,
        phone: item.phone,
        klinik: Clinic,
        // created_at: now_times(),
        // updated_at: now_times()
      };
    });

    result["rows"] = newArray;
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
//End Session Read Data User All

//Start Session Read Data User All
const readProfile = async ({ search }, token, user) => {
  var m_roles = User.belongsTo(rolesModel, {
    foreignKey: "role",
  });
  try {
    let result = await User.findOne({
      where: {
        id: user,
      },
    });
    // console.log("LIHAT", result);
    let dataRoles = await rolesModel.findAndCountAll();
    let MappingRolesPermission = await rolesPermissionModel.findAndCountAll();
    let permission = await permissionModel.findAndCountAll();

    var datas = result;
    var roles = dataRoles.rows;
    var mappingRolesP = MappingRolesPermission.rows;
    var permissionData = permission.rows;

    let resDataClinic = await axios.get(
      base_url + "api/datamaster/clinic_aktif/read",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    var dataClinic = resDataClinic.data.payload;

    const ArrayPermission = [];

    let detailClinic = dataClinic.filter(
      (data) => data.id == datas.clinic_id
    )[0];
    // console.log("TES1", detailClinic);
    let clinic = {
      id: detailClinic.id,
      clinic_name: detailClinic.clinic_name,
      clinic_code: detailClinic.clinic_code,
      account_type: detailClinic.account_type,
      alamat: detailClinic.alamat,
      logo: detailClinic.logo,
      license_type: detailClinic.license_type,
      license_duration: detailClinic.license_duration,
      phone: detailClinic.phone,
      email: detailClinic.email,
      created_at: detailClinic.created_at,
      updated_at: detailClinic.updated_at,
      status: detailClinic.status,
    };

    let dataRoles2 = mappingRolesP.filter(
      (data) => data.m_roles_id == datas.role
    );

    forEach(dataRoles2, (row) => {
      let detailPermission = permissionData.filter(
        (data) => data.id == row.m_permission_id
      )[0];

      let permissionDetail = {
        permission_id: detailPermission.id,
        permission_name: detailPermission.nama,
        permission_code: detailPermission.kode,
      };
      ArrayPermission.push(permissionDetail);
    });

    const detailRoles = roles.filter((data) => data.id == datas.role)[0];
    var Roles = {
      roles_id: detailRoles.id,
      roles_name: detailRoles.role_name,
      roles_code: detailRoles.role_code,
      permission: ArrayPermission,
    };

    var data = {
      id: datas.id,
      name: datas.name,
      email: datas.email,
      role: Roles,
      status: datas.status,
      phone: datas.phone,
      clinic: clinic,
      foto: datas.foto,
    };

    result["rows"] = data;
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
//End Session Read Data User All

async function loop(items, callback) {
  for (var a = 0; a < items.length; a++) {
    // eslint-disable-next-line
    await callback(items[a]);
  }
}

//Start Session Read User True
const readUserStatusAktif = async ({ name }, token) => {
  try {
    let result = await User.findAndCountAll({
      where: {
        name: name ? { [Op.iLike]: `%${name}%` } : { [Op.iLike]: `%%` },
        status: true,
      },
      order: [["id", "DESC"]],
    });

    var datas = result.rows;
    let resDataClinic = await axios.get(
      base_url + "api/datamaster/clinic_aktif/read",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    var dataClinic = resDataClinic.data.payload;

    var newArray = datas.map((item) => {
      let detailClinic = dataClinic.filter(
        (data) => data.id == item.clinic_id
      )[0];
      // console.log("TES1", detailClinic);
      let Clinic = {
        clinic_id: detailClinic.id,
        clinic_name: detailClinic.clinic_name,
        clinic_code: detailClinic.clinic_code,
      };

      return {
        id: item.id,
        name: item.name,
        email: item.email,
        role: item.role,
        status: item.status,
        phone: item.phone,
        klinik: Clinic,
        // created_at: now_times(),
        // updated_at: now_times()
      };
    });

    result["rows"] = newArray;
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
//End Session Read User True

export {
  createSignUp,
  FindUserByEmail,
  CekPassword,
  FindUserbyid,
  readUser,
  readProfile,
  updateUser,
  readUserStatusAktif,
  FindnotById,
};
