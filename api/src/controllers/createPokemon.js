const { Pokemon, Type } = require('../db');

const createPokemon = async (req, _res) => {
    try {
        const {nombre, imagen, vida, ataque, defensa, velocidad, altura, peso, types} = req.body;
        console.log('lleguie hasta aqui');
        console.log(types);

        if(!nombre|| !imagen|| !vida|| !ataque|| !defensa|| !velocidad|| !altura|| !peso|| !types) throw new Error("Falta llenar datos");
        const pokemonCreated = await Pokemon.create({
            nombre: nombre,
            imagen: imagen,
            vida: vida,
            ataque: ataque,
            defensa: defensa,
            velocidad: velocidad,
            altura: altura,
            peso: peso
        })

        await pokemonCreated.addType(types)

        const pokemonWithTypes = await getPokemonWithTypes(pokemonCreated.id);

        return pokemonWithTypes;
    } catch (error) {
        return {error: error.message}
    }
}


const getPokemonWithTypes = async (pokemonId) => {
    try {
        // Aquí realizas la consulta para obtener el pokemon
        const pokemon = await Pokemon.findOne({
          where: { id: pokemonId },
        });
    
        if (!pokemon) {
          throw new Error('Pokemon not found');
        }
    
        // Aquí obtenemos los tipos asociados al pokemon
        const types = await pokemon.getTypes({
          attributes: ['nombre'], // Indica que solo deseas el atributo "nombre" de la tabla Type
        });
    
        // Extraer los nombres de los tipos asociados al pokemon
        const typesNames = types.map((type) => type.nombre);
    
        // Crear un nuevo objeto que contenga los datos del pokemon y los nombres de los tipos
        const pokemonWithTypes = {
          id: pokemon.id,
          nombre: pokemon.nombre,
          imagen: pokemon.imagen,
          vida: pokemon.vida,
          ataque: pokemon.ataque,
          defensa: pokemon.defensa,
          velocidad: pokemon.velocidad,
          altura: pokemon.altura,
          peso: pokemon.peso,
          types: typesNames,
        };
    
        return pokemonWithTypes; // Devuelve el pokemon con sus tipos asociados (incluyendo los nombres de los tipos)
      } catch (error) {
        return { error: error.message };
      }
  };

module.exports = createPokemon;