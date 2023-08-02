const axios = require('axios');

//?Controladores no manejan res ni req, soolo logica
const getApiData = async () => {
    try {
        let i = 1;
        let pokemons = [];

        while(i <= 60){
            let apiData = await axios(`https://pokeapi.co/api/v2/pokemon/${i}/`);
            pokemons.push(apiData);
            i++;
        }

        pokemons = (await Promise.all(pokemons)).map(pokemon => {//?MAP devuelve un array 
            return({
                idApi: pokemon.data.id,
                nombre:pokemon.data.name,
                imagen:pokemon.data.sprites.other.dream_world.front_default,
                vida:pokemon.data.stats[0].base_stat,
                ataque:pokemon.data.stats[1].base_stat,
                defensa:pokemon.data.stats[2].base_stat,
                velocidad:pokemon.data.stats[5].base_stat,
                altura:pokemon.data.height,
                peso: pokemon.data.weight,
                types: pokemon.data.types.map(type => type.type.name)
            })}
        )
        
        let allPokemons = [];
        pokemons.map(poke => {allPokemons = allPokemons.concat(poke)})
        
        return allPokemons;

    } catch (error) {
        return {error : error.message}
    }
}

module.exports = getApiData;