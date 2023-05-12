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
  name: {
    type: DataTypes.CHAR(100),
    allowNull: false,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "name",
    autoIncrement: false,
    unique: true,
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
  tableName: "category",
  comment: "",
  indexes: [],
};
const McategoryModel = db.define("category", attributes, options);
export default McategoryModel;
// };
