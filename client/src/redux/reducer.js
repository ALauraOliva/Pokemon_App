import { GET_POKEMONS_HOME, GET_POKEMONS_DB, GET_POKEMON_DETAIL, FILTER_POKEMONS, FILTER_BY_TYPE, ORDER_POKES, GET_TYPES, SET_ORIGIN_POKEMONS, ORDER_ATTACK, GET_ALL_POKEMONS, RESET_FILTER, SET_PAGINA, CREATE_POKEMON } from "./action-types";

const initialState = {
    allPokemonsHome  : [],
    allPokemonsDB    : [],
    allPokemons      : [],
    detailPokemon    : {},
    filteredPokemons : [],
    maxPages         : 5,
    pagina           : 1,
    allTypesPokemon  : [],
    originPokemon    : 'APIPokemons', //por default APIPokemons
    filtersDefault   : ['N', 'N', 'N']
}

const reducer = (state = initialState, {type, payload}) => { //? {type, payload} = action
    let tmpArrayPokemones;
    if (state.originPokemon === 'APIPokemons'){ tmpArrayPokemones = state.allPokemonsHome}
    if (state.originPokemon === 'dbPokemons') { tmpArrayPokemones = state.allPokemonsDB  }
    if (state.originPokemon === 'allPokemons'){ tmpArrayPokemones = state.allPokemons    } 

    switch( type ){
        case GET_POKEMONS_HOME:
            return{
                ...state,
                filteredPokemons: state.filteredPokemons.length > 0 ? state.filteredPokemons : payload,
                allPokemonsHome : state.allPokemonsHome.length > 0  ? state.allPokemonsHome  : payload,
                // pagina          : 1
            }
            
        case GET_POKEMONS_DB:
            return{
                ...state,
                allPokemonsDB : state.allPokemonsDB.length > 0  ? state.allPokemonsDB  : payload,
                // pagina        : 1
            }
        
        case GET_ALL_POKEMONS:
            return{
                ...state,
                allPokemons : state.allPokemonsHome.concat(state.allPokemonsDB) ,
                // pagina      : 1
            }
        
        case GET_POKEMON_DETAIL:
            const pokemon = tmpArrayPokemones.find((poke) => poke.id ? poke.id === payload : poke.idApi === payload);
            return{
                ...state,
                detailPokemon : pokemon
            }
        
        case FILTER_POKEMONS:
            let maxPagesFilterPokemones = Math.ceil(payload.length / 12)
            if(payload.length===0) {maxPagesFilterPokemones = 1}

            return{
                ...state,
                filteredPokemons : payload,
                allPokemonsHome  : (state.originPokemon === 'APIPokemons' || state.originPokemon === 'allPokemons') && tmpArrayPokemones.concat(payload),
                allPokemons      : (state.originPokemon === 'APIPokemons' || state.originPokemon === 'allPokemons') && tmpArrayPokemones.concat(payload, state.allPokemonsDB),
                maxPages         : maxPagesFilterPokemones,
                pagina           : 1,
            }

        case FILTER_BY_TYPE:  
            let tmpArrayPokemonesType = tmpArrayPokemones;          
            tmpArrayPokemonesType = tmpArrayPokemonesType.filter(pokemon => { let p;
                for (let i = 0; i < pokemon.types.length ; i++){
                    if( pokemon.types[i] ===payload ) { p = pokemon;return p}
                }
                return p&&p
            })

            if (payload === 'AllTypes') {tmpArrayPokemonesType = tmpArrayPokemones}
            
            let maxPages = Math.ceil(tmpArrayPokemonesType.length / 12)
            if(tmpArrayPokemonesType.length===0) {maxPages = 1}

            return{
                ...state,
                filteredPokemons : tmpArrayPokemonesType,
                maxPages         : maxPages,
                pagina           : 1,
                filtersDefault   : [payload, state.filtersDefault[1], state.filtersDefault[2]]
            }
        
        case ORDER_POKES:
            if(state.filteredPokemons.length > 0) {tmpArrayPokemones = state.filteredPokemons}

            if(payload === 'Ascendente'){
                tmpArrayPokemones = tmpArrayPokemones.sort(function(a, b){
                    if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
                        return -1;
                    }
                    if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                })
            }
            if(payload === 'Descendente'){
                tmpArrayPokemones = tmpArrayPokemones.sort(function(a, b){
                    if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
                        return -1;
                        }
                        if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
                        return 1;
                        }
                        return 0;
                })
            }

            return{
                ...state,
                filteredPokemons : tmpArrayPokemones,
                pagina           : 1,
                filtersDefault   : [state.filtersDefault[0], payload, state.filtersDefault[2]]
            }

        case ORDER_ATTACK:
            let tempAttackOrder = [];
        
            if (state.originPokemon === 'APIPokemons'){tempAttackOrder = state.filteredPokemons.length > 0 ? state.filteredPokemons : state.allPokemonsHome;}
            if (state.originPokemon === 'dbPokemons') {tempAttackOrder = state.filteredPokemons.length > 0 ? state.filteredPokemons : state.allPokemonsDB}
            if (state.originPokemon === 'allPokemons'){tempAttackOrder = state.filteredPokemons.length > 0 ? state.filteredPokemons : state.allPokemons}

            if(payload === 'A'){
                tempAttackOrder = tempAttackOrder.sort(function(a, b){
                    if (a.ataque < b.ataque) {
                        return -1;
                    }
                    if (a.ataque > b.ataque) {
                        return 1;
                    }
                    return 0;
                })
            }
            if(payload === 'M'){
                tempAttackOrder = tempAttackOrder.sort(function(a, b){
                    if (a.ataque > b.ataque) {
                        return -1;
                        }
                        if (a.ataque > b.ataque) {
                        return 1;
                        }
                        return 0;
                })
            }

            return{
                ...state,
                filteredPokemons : tempAttackOrder,
                pagina           : 1,
                filtersDefault   : [state.filtersDefault[0], state.filtersDefault[1], payload]
            }

        case GET_TYPES:
            return{
                ...state,
                allTypesPokemon : payload
            }
        
        case RESET_FILTER:
            let maxPagesfil = Math.ceil(tmpArrayPokemones.length / 12)
            if(tmpArrayPokemones.length===0) {maxPagesfil = 1}

            return{
                ...state,
                filteredPokemons : tmpArrayPokemones,
                maxPages         : maxPagesfil,
                pagina           : 1,
                filtersDefault   : ["N", "N", "N"]
            }
        
        case SET_ORIGIN_POKEMONS:
            let newFilterPokemonsByOrigin = state.allPokemonsHome;

            if(payload === 'APIPokemons')
                newFilterPokemonsByOrigin = state.allPokemonsHome;
            if(payload === 'dbPokemons')
                newFilterPokemonsByOrigin = state.allPokemonsDB;
            if(payload === 'allPokemons')
                newFilterPokemonsByOrigin = state.allPokemons;

            let maxPagesOrigin = Math.ceil(newFilterPokemonsByOrigin?.length / 12)
            if(newFilterPokemonsByOrigin.length===0) {maxPagesOrigin = 1}

            return{
                ...state,
                originPokemon    : payload,
                filteredPokemons : newFilterPokemonsByOrigin,
                maxPages         : maxPagesOrigin,
                pagina           : 1
            }
        
        case SET_PAGINA:
            return{
                ...state,
                pagina : payload
            }
        
        case CREATE_POKEMON:
            tmpArrayPokemones = state.allPokemonsDB.push(payload);

            return{
                ...state,
                allPokemonsDB : tmpArrayPokemones
            }

        default:
            return{...state}
    }
}

export default reducer;