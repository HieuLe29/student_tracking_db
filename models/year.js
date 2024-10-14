'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Year extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Classroom, Student}) {
      // define association here
      this.hasMany(Classroom, {foreignKey: 'year_id'});
      this.hasMany(Student, {foreignKey: 'year_id'});
     }
    toJSON() {
      return {...this.get(), createdAt: undefined, updatedAt: undefined};
    }
  }
  Year.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    year_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    start_date: {
       type: DataTypes.DATE,
       allowNull: false
    },
    end_date: {
      type:DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'years',
    modelName: 'Year',
  });
  return Year;
};