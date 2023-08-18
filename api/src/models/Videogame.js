const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
 sequelize.define('videogame', {
  // Definición de la columna 'id'.
  id: {
    type: DataTypes.INTEGER,    // Tipo de dato: número entero.
    primaryKey: true,           // Esta columna es la clave primaria de la tabla.
    autoIncrement: true         // Se incrementa automáticamente para cada nuevo registro.
  },
  // Definimos la columna 'name'.
  name: {
    type: DataTypes.STRING,      // Tipo de dato: cadena de texto.
    allowNull: false,            // No se permite que este valor sea nulo.
  },
  // Definimos la columna 'description'.
  description: {
    type: DataTypes.TEXT,        // Tipo de dato: texto largo.
    allowNull: false             // No se permite que este valor sea nulo.
  },
  // Definimos la columna 'platforms'.
  platforms: {
    type: DataTypes.STRING,      // Tipo de dato: cadena de texto.
    allowNull: false             // No se permite que este valor sea nulo.
  },
  // Definimos la columna 'releaseDate'.
  releaseDate: {
    type: DataTypes.STRING      // Tipo de dato: cadena de texto.
  },
  // Definimos la columna 'rating'.
  rating: {
    type: DataTypes.INTEGER     // Tipo de dato: número entero.
  },
});
};

//Esto es crucial para poder almacenar y consultar datos relacionados con videojuegos en la base de datos.
