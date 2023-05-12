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
  status_payment: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "status_payment",
    autoIncrement: false,
    unique: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "user_id",
    autoIncrement: false,
  },
  total_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "total_price",
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
  tableName: "payment",
  comment: "",
  indexes: [],
};
const MpaymentModel = db.define("payment", attributes, options);
export default MpaymentModel;
// };
