const axios = require ('axios')
const {Pokemon} = require('../db');
const URL = 'https://pokeapi.co/api/v2/pokemon'

//!CREAR UUID ID POKEMONES DE CREACION 
const getPokemonByName = async (req,_res) => {  
    try {
        let { name } = req.query
        name = name.toLowerCase();
  
        let pokemonFounByName = await Pokemon.findOne({where : {nombre: name }}); 
        
        if(!pokemonFounByName){
            const {data} = await axios(`${URL}/${name}`)
            
            if(!data.name) throw new Error(`No se pudo encontrar el pokemon con nombre = ${name}`)
            
            pokemonFounByName = {
                idApi: data.id,
                nombre:data.name,
                imagen:data.sprites.other.dream_world.front_default,
                vida:data.stats[0].base_stat,
                ataque:data.stats[1].base_stat,
                defensa:data.stats[2].base_stat,
                velocidad:data.stats[5].base_stat,
                altura:data.height,
                peso: data.weight,
                types: data.types.map(type => type.type.name)
            };
        }
        
        return pokemonFounByName;

    } catch (error) {

        return {error: error.message};
    }
}

module.exports = getPokemonByName;