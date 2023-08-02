const getApiData = require("./getApiData");
const {Pokemon, Type} = require('../db'); //? De DB porque alli ya esta definido el modelo o entidad, listo para usar

//?guardamos lo que conseguimos de la API  a la DB <<

const saveApiData = async () => {
    try {
        
        const allPokemons = await getApiData(); //?devuelve array de objetos <<
        const createPokemons = await Pokemon.bulkCreate(allPokemons) //?le paso un array de objetos y agrega todos de UNA en la db <<
        
        return allPokemons;
    } catch (error) {
        return {error : error.message}
    }
}

module.exports = saveApiData;