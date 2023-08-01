const axios = require ('axios')
const {Pokemon} = require('../db');
const URL = 'https://pokeapi.co/api/v2/pokemon'

const getPokemonById = async (req, _res) => {
    try {
        const {idPokemon} = req.params;
        const {data} = await axios(`${URL}/${idPokemon}`);
        
        if (!data.name) throw Error(`No se pudo encontrar el pokemon con ID = ${id}`)
        
        PokemonFound = {
            id: data.id,
            nombre:data.name,
            imagen:data.sprites.other.dream_world.front_default,
            vida:data.stats[0].base_stat,
            ataque:data.stats[1].base_stat,
            defensa:data.stats[2].base_stat,
            velocidad:data.stats[5].base_stat,
            altura:data.height,
            peso: data.weight
        };

        return PokemonFound;
    } catch (error) {
        return {error:error.message};
    }
}

module.exports = getPokemonById;