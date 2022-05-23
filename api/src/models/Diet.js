const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  // sequelize.authenticate()
  //   .then(()=>{
  //     console.log("Conexion establecida con Food");
  //   })
  //   .catch((error) => {
  //     return Error(error);
  //   });

  sequelize.define("diet", {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
