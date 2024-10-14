'use strict';
const {
  Model
} = require('sequelize');
const year = require('./year');
module.exports = (sequelize, DataTypes) => {
  class Classroom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Year, Student}) {
      // define association here
      this.belongsTo(Year, {foreignKey: 'year_id', as: 'year'})
      this.hasMany(Student, {foreignKey: 'classroom_id', as: 'students'})
      
    }
    toJSON() {
      return {...this.get(), createdAt: undefined, updatedAt: undefined};
    }
  }
  Classroom.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    class_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'classrooms',
    modelName: 'Classroom',
  });
  return Classroom;
};