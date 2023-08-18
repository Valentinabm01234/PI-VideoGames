const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo para GENRE
  sequelize.define('genre', {
    // Definición de la columna 'id'.
    id: {
      type: DataTypes.INTEGER,     // Tipo de dato: número entero.
      allowNull: false,            // No se permite que este valor sea nulo.
      primaryKey: true            // Esta columna es la clave primaria de la tabla.
    },
    // Definición de la columna 'name'.
    name: {
      type: DataTypes.STRING,      // Tipo de dato: cadena de texto.
      allowNull: false            // No se permite que este valor sea nulo.
    },
  }, {
    // Opciones adicionales para el modelo.
    freezeTableName: true,        // Evita que Sequelize pluralice el nombre de la tabla.
    timestamps: false,            // No se incluirán automáticamente marcas de tiempo (createdAt, updatedAt).
    tableName: "genres"           // Define el nombre real de la tabla en la base de datos.
  });
}