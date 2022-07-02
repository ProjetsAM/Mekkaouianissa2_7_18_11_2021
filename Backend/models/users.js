'use strict';

const {  Model } = require('sequelize');
//associate et hasmany : Tables avec une interaction entre autres fichiers models(table)
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Message }) {
      this.hasMany(Message, {
          onDelete: 'cascade',
          foreignKey: 'UserId',
      })       
  
    }
  }
  User.init({
    userName: { 
     type: DataTypes.STRING,
     allowNull: false 
    },
    email: {  
      type: DataTypes.STRING,
      unique: true,
      allowNull: false 
     },
    password: { 
     type: DataTypes.STRING,
     allowNull: false
    },
    avatar: { 
     type: DataTypes.STRING,
     allowNull: false,
     defaultValue: "http:///localhost:3001/images/default_user.jpg"
    },
    isAdmin:{ 
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    sequelize,
    modelName: 'User',
  });
  return User;
};