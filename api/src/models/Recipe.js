const { DataTypes } = require('sequelize');
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


  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
    },
    img: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
    createdInDB: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    }
  });
};
