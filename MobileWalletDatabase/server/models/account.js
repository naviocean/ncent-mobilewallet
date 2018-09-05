'use strict';
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
      defaultValue: DataTypes.UUIDV4
    },
    public_key: {
	    type:DataTypes.STRING,
      allowNull: true,
      unique:true
    },
    email: {
    	type:DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    phone_no: {
    	type:DataTypes.STRING,
      allowNull: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    experienced_investor: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    sufficient_income_level: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    desired_cash_allocation: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    desired_bitcoin_allocation: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    desired_eth_allocation: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    email_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    is_investor: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    is_whitelisted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    comply_requested: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  });
  return Account;
}