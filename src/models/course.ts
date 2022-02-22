'use strict';

import { Model } from 'sequelize';

interface CourseAttributes {
  id: number
  title: string
  grade: number
  theme: string
  content: string
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Course extends Model<CourseAttributes>
    implements CourseAttributes {
      id!: number;
      title!: string
      grade!: number
      theme!: string
      content!: string
      static associate(models: any) {
        Course.belongsToMany(models.User, {
          through: 'CourseAssignments'
        })
      }
  }
  Course.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    theme: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Course',
  });

  return Course;
};
