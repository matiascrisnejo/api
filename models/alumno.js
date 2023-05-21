'use strict';
module.exports = (sequelize, DataTypes) => {
  const alumno = sequelize.define('alumno', {
    nombre: DataTypes.STRING,
    id_alumno: DataTypes.INTEGER
  }, {});
    // associations can be defined here
    //codigo de asociacion  (tiene muchos:)
  alumno.associate = function(models) {
  	alumno.hasMany(models.biblioteca,  // Modelo al que pertenece
    {
      as: 'biblioteca',                 // nombre de mi relacion
      foreignKey: 'id_alumno'       // campo con el que voy a igualar 
    })
  };
  ///////////////////////

  return alumno;
};