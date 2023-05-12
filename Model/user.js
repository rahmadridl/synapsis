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
  username: {
    type: DataTypes.CHAR(100),
    allowNull: false,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "username",
    autoIncrement: false,
    unique: true,
  },
  password: {
    type: DataTypes.CHAR(100),
    allowNull: false,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "password",
    autoIncrement: false,
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "token",
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
  tableName: "user",
  comment: "",
  indexes: [],
};
const MUserModel = db.define("user", attributes, options);
export default MUserModel;
// };
