import cart from "../../Model/cart.js";
import product from "../../Model/product.js";
import payment from "../../Model/payment.js";
import { Op } from "sequelize";
import sequelize from "sequelize";

// Start Session Create Data payment
const createpayment = async (data, transaction) => {
  const t = transaction ? transaction : await payment.sequelize.transaction();
  try {
    let result = await payment.create(data, { transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error("[EXCEPTION] Createpayment", error);
    throw new Error(error);
  }
};
// End Session Create Data payment

// Start Session Create Data cart
const createcart = async (data, transaction) => {
  const t = transaction ? transaction : await cart.sequelize.transaction();
  try {
    let result = await cart.create(data, { transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error("[EXCEPTION] Createcart", error);
    throw new Error(error);
  }
};
// End Session Create Data cart

// Start Session Delete Data cart
const deletecart = async (filter, transaction) => {
  const t = transaction ? transaction : await cart.sequelize.transaction();
  try {
    let result = await cart.destroy({
      ...filter,
      transaction,
    });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error("[EXCEPTION] deletecart", error);
    throw new Error(error);
  }
};
// End Session Delete Data cart

// Start Session Update Data cart
const updatecart = async (data, filter, transaction) => {
  const t = transaction ? transaction : await cart.sequelize.transaction();
  try {
    let result = await cart.update(data, { ...filter, transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error("[EXCEPTION] updatecart", error);
    throw new Error(error);
  }
};
// End Session Update Data cart

// Start Session Update Data payment
const updatepayment = async (data, filter, transaction) => {
  const t = transaction ? transaction : await payment.sequelize.transaction();
  try {
    let result = await payment.update(data, { ...filter, transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error("[EXCEPTION] updatepayment", error);
    throw new Error(error);
  }
};
// End Session Update Data payment

// Start Session Read Data cart
const readcart = async (id) => {
  try {
    let result = await cart.findAndCountAll({
      where: {
        user_id: id,
      },
    });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] readcart", error);
    throw new Error(error);
  }
};
// End Session Read Data cart

// Start Session Read Data cart
const readProduct = async (search, category) => {
  try {
    let result = await product.findAndCountAll({
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
        category_id: category != "" ? category : { [Op.ne]: null },
      },
    });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] readProduct", error);
    throw new Error(error);
  }
};
// End Session Read Data cart

// Start Session Read Data cart With Status = True
const readcartStatusAktif = async ({ nama }, klinik) => {
  try {
    let result = await cart.findAndCountAll({
      where: {
        nama_pasien: nama ? { [Op.iLike]: `%${nama}%` } : { [Op.iLike]: `%%` },
        clinic_id: klinik,
        status: true,
      },
      order: [["id", "DESC"]],
    });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] readcartStatusAktif", error);
    throw new Error(error);
  }
};
// End Session Read Data cart With Status = True

const checkPayment = async (id) => {
  try {
    let result = await payment.findOne({
        where:{
            user_id:id,
            status_payment: false
        }
    });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] checkPayment", error);
    throw new Error(error);
  }
};

const findPayment = async (id) => {
  try {
    let result = await payment.findOne({
        where:{
            user_id:id,
        }
    });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] findPayment", error);
    throw new Error(error);
  }
};

const findCart = async (id) => {
  try {
    let result = await cart.findByPk(id);
    return result;
  } catch (error) {
    console.error("[EXCEPTION] findCart", error);
    throw new Error(error);
  }
};

const checkCart = async (id, user_id) => {
  try {
    let result = await cart.findOne({
      where: {
        id,
        user_id,
      },
    });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] checkCart", error);
    throw new Error(error);
  }
};

const findProduct = async (id) => {
  try {
    let result = await product.findByPk(id);
    return result;
  } catch (error) {
    console.error("[EXCEPTION] findProduct", error);
    throw new Error(error);
  }
};

const findProductListId = async (id) => {
  try {
    let result = await product.findAll({
      where: {
        id: { [Op.in]: id },
      },
    });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] findProductListId", error);
    throw new Error(error);
  }
};

export {
  createpayment,
  createcart,
  deletecart,
  updatecart,
  updatepayment,
  readcart,
  readcartStatusAktif,
  readProduct,
  findCart,
  findProduct,
  findProductListId,
  checkCart,
  checkPayment,
  findPayment
};
