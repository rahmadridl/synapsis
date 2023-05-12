import DataTypes from "sequelize";
import db from "../Config/config.js";

const attributes = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: null,
    comment: null,
    primaryKey: true,
    field: "id",
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "user_id",
    autoIncrement: false,
    unique: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "product_id",
    autoIncrement: false,
    unique: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "price",
    autoIncrement: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: new Date(Date.now()),
    comment: null,
    primaryKey: false,
    field: "created_at",
    autoIncrement: false,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: new Date(Date.now()),
    comment: null,
    primaryKey: false,
    field: "updated_at",
    autoIncrement: false,
  },
};
const options = {
  freezeTableName: true,
  timestamps: false,
  tableName: "cart",
  comment: "",
  indexes: [],
};
const McartModel = db.define("cart", attributes, options);
export default McartModel;
// };
