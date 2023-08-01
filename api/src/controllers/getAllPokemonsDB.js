const { Pokemon, Type } = require ('../db')

const getAllPokemons = async() => {
    try {
        const allPokemons = await Pokemon.findAll({ include: Type });
        //console.log(allPokemons)
        if(!allPokemons) throw new Error('No se pudo recuperar los pokemones de la DB')

        return allPokemons;
    } catch (error) {
        return {error : error.message}
    }
}

module.exports = getAllPokemons;