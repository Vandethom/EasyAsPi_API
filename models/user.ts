'use strict';

import { Model, UUIDV4 } from 'sequelize';

interface UserAttributes {
  id: string
  name: string
  email: string
  password: string
  grade: number
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes>
    implements UserAttributes {
      id!: string;
      name!: string;
      email!: string;
      password!: string;
      grade!: number;

      static associate(models: any) {
        User.belongsToMany(models.Course, {
          through: 'CourseAssignment'
        })
      }
    }
  
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
