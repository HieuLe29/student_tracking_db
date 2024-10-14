'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Classroom, Year}) {
      // define association here
      this.belongsTo(Classroom, {foreignKey: 'classroom_id', as: 'classroom'});
      this.belongsTo(Year, {foreignKey: 'year_id', as: 'year'})
    }
    toJSON() {
      return {...this.get(), createdAt: undefined, updatedAt: undefined};
    }
    
  }
  Student.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    student_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date_of_birth:{
      type: DataTypes.DATE,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'students',
    modelName: 'Student',
  });
  return Student;
};