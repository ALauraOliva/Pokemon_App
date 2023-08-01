const axios = require ('axios')
const { Type } = require('../db');
const URL = 'https://pokeapi.co/api/v2/type'

const getPokemonTypes = async () => {
    try {
        const {data} = await axios(URL);
        const pokemonTypes = (data.results).map(tipoPokemon => {
            return {nombre: tipoPokemon.name}
        });

        await Type.bulkCreate(pokemonTypes)

        return pokemonTypes;
    } catch (error) {
        return {error: error.message}
    }
}

module.exports = getPokemonTypes;