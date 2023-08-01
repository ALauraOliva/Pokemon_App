const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define('pokemon', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    nombre:{
        type: DataTypes.STRING,
        unique: true,
        allowNull:false
    },
    imagen:{
        type: DataTypes.STRING,
        allowNull:false
    },
    vida:{
        type: DataTypes.FLOAT,
        allowNull:false
    },
    ataque:{
        type: DataTypes.FLOAT,
        allowNull:false
    },
    defensa:{
        type: DataTypes.FLOAT,
        allowNull:false
    },
    velocidad:{
        type: DataTypes.FLOAT,
        allowNull:false
    },
    altura:{
        type: DataTypes.FLOAT,
        allowNull:false
    },
    peso:{
        type: DataTypes.FLOAT,
        allowNull:false
    }
},
    { timestamps: false }); 
};
