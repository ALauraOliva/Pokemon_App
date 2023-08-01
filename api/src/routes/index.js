const getAllPokemons = require('../controllers/getAllPokemons')
const router = require('express').Router();
const getPokemonById = require('../controllers/getPokemonById')
const getPokemonByName = require('../controllers/getPokemonByName')
const createPokemon = require('../controllers/createPokemon')
const getPokemonTypes = require('../controllers/getPokemonTypes')
const getAllPokemonsDB = require('../controllers/getAllPokemonsDB')

router.get('/pokemons', async (_req, res) => { //?retorna los primeros 20 pokemones para HOME 
    try {
        const allPokemons = await getAllPokemons();
       
        if(allPokemons.error) throw Error(allPokemons.error)
        
        res.status(200).json(allPokemons)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.get('/pokemonsdb', async (_req, res) => { //?retorna los primeros 20 pokemones para HOME 
    try {
        const allPokemons = await getAllPokemonsDB();
       
        if(allPokemons.error) throw Error(allPokemons.error)
        
        res.status(200).json(allPokemons)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.get('/pokemons/name', async (req, res) => {
    try {
        const pokemonName = await getPokemonByName(req, res);

        if(pokemonName.error) throw Error(pokemonName.error)

        return res.status(200).send(pokemonName)
    } catch (error) {
        return res.status(404).send(error.message);
    }
})

router.get('/pokemons/:idPokemon', async (req, res) => {
    try {
        const pokemon = await getPokemonById(req, res)

        if(pokemon.error) throw Error(pokemon.error)

        return res.status(200).json(pokemon);
    } catch (error) {
        return res.status(404).send(error);
    }
})



router.post('/pokemons', async(req, res) => {
    try {
        const pokemonCreated = await createPokemon(req, res);

        if(pokemonCreated.error) throw Error(pokemonCreated.error)

        return res.status(200).json(pokemonCreated)
    } catch (error) {
        return res.status(404).send(error.message)
    }
})

router.get('/types', async(_req, res) => {
    try {
        const pokemonTypes = await getPokemonTypes();

        if(pokemonTypes.error) throw Error(pokemonTypes.error)

        return res.status(200).json(pokemonTypes)
    } catch (error) {
        return res.status(404).send(error)
    }
})

module.exports = router;
