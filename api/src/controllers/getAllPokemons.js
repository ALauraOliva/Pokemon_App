const getApiData = require('../controllers/getApiData')

const getAllPokemons = async() => {
    try {
       
        const allPokemons = await getApiData();
        
        if(!allPokemons) throw new Error('No se pudo recuperar los pokemones de la API')

        return allPokemons;
    } catch (error) {
        return {error : error.message}
    }
}

module.exports = getAllPokemons;