'use strict';

import { Model } from 'sequelize';

interface CourseAssignmentsAttributes {
  courseId: number
  userId: string
}

module.exports = (sequelize: any, DataTypes: any) => {
  class CourseAssignments extends Model<CourseAssignmentsAttributes>
    implements CourseAssignmentsAttributes {
      courseId!: number
      userId!: string

    static associate(models: any) {
      // define association here
    }
  }

  CourseAssignments.init({
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Courses',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id'
      }

    }
  }, {
    sequelize,
    modelName: 'CourseAssignment',
  });

  return CourseAssignments;
};
