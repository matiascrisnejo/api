'use strict';
module.exports = (sequelize, DataTypes) => {
  const biblioteca = sequelize.define('biblioteca', {
    nombre: DataTypes.STRING,
    id_alumno: DataTypes.INTEGER
  }, {});
  biblioteca.associate = function(models) {
    // associations can be defined here
    //asociacion a carrera (pertenece a:)
  	biblioteca.belongsTo(models.alumno// modelo al que pertenece
    ,{
      as : 'Alumno-Relacionada',  // nombre de mi relacion
      foreignKey: 'id_alumno'     // campo con el que voy a igualar
    })
  	/////////////////////
  };
  return biblioteca;
};