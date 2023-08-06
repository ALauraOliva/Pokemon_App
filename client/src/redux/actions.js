//?ACTIONS aqui se puede llamar a APIS en el REDUCER solo es para cambiar el store STATE
import { GET_POKEMONS_HOME, GET_POKEMONS_DB, GET_ALL_POKEMONS, GET_POKEMON_DETAIL, FILTER_POKEMONS, FILTER_BY_TYPE, ORDER_POKES, ORDER_ATTACK, GET_TYPES, SET_ORIGIN_POKEMONS, RESET_FILTER, SET_PAGINA, SET_FILTERS, CREATE_POKEMON, FILTER_ADD_NEW_ONE } from "./action-types";
import axios from 'axios';
const apiUrl = 'https://pokedex-server-7fgg.onrender.com';

export const getPokemonsHome = () => {
    return async (dispatch) => {
        try {
            const {data} = await axios.get(`${apiUrl}/pokemons`);
            dispatch({type : GET_POKEMONS_HOME, payload: data})
        } catch (error) {
            alert("error: " + error.response.data.error)
        }
    }
}

export const getPokemonsDB = () => {
    return async (dispatch) => {
        try {
            const {data} = await axios.get(`${apiUrl}/pokemonsdb`);
            dispatch({type : GET_POKEMONS_DB, payload: data})
        } catch (error) {
            alert("error: " + error.response.data.error)
        }
    }
}

export const getAllPokemons = () => {
    return (dispatch) => {
        dispatch({type: GET_ALL_POKEMONS, payload: {}})
    }
}

export const getPokemonDetail = (id) => {
    return (dispatch) => {
        dispatch({type: GET_POKEMON_DETAIL, payload: id})
    }
}

export const filterPokemons = (searchedValue) => async (dispatch, getState) => {
    const originPokemon = getState().originPokemon;
    let tmpArrayPokemones = [];

    if (originPokemon === 'APIPokemons'){ tmpArrayPokemones = getState().allPokemonsHome}
    if (originPokemon === 'allPokemons'){ tmpArrayPokemones = getState().allPokemons    } 
    if (originPokemon === 'dbPokemons' ){ tmpArrayPokemones = getState().allPokemonsDB  }

    tmpArrayPokemones = tmpArrayPokemones.filter(pokemon => pokemon.nombre.toLowerCase() === String(searchedValue.toLowerCase()))

    if (tmpArrayPokemones.length > 0) {
      dispatch({ type: FILTER_POKEMONS, payload: tmpArrayPokemones });

    } else {
        if (originPokemon !== 'dbPokemons'){
            try {
              const params = {
                  name: searchedValue,
                };
              const response = await axios.get(
                `${apiUrl}/pokemons/name`, {params});
              dispatch({ type: FILTER_ADD_NEW_ONE, payload: [response.data] });
            } catch (error) {
              // Manejo de errores si la API falla
              alert("Error: No se pudo obtener el pokemon de la API");
            }
        }

        if (originPokemon === 'dbPokemons'){
            alert("Error: No existe ese pokemon en la DB")
        }
    }
  };

export const filterByType = (type) => {
    return (dispatch) => {
        dispatch({type: FILTER_BY_TYPE, payload: type})
    }
}

export const getTypes = () => {
    return async (dispatch) => {
        try {
            const {data} = await axios.get(`${apiUrl}/types`);
            dispatch({type : GET_TYPES, payload: data})
        } catch (error) {
            alert("error: " + error.response.data.error)
        }
    }
}

export const setOriginPokemons = (origin) => {
    return (dispatch) => {
        dispatch({type: SET_ORIGIN_POKEMONS, payload: origin})
    }
}

export const orderPokes = (order) => {
    return {type: ORDER_POKES, payload:order}
}

export const orderAttack = (attack) => {
    return {type: ORDER_ATTACK, payload:attack}
}

export const resetFilter = (attack) => {
    return {type: RESET_FILTER, payload:{}}
}

export const setPagina = (page) => {
    return {type: SET_PAGINA, payload:page}
}

export const setFilters = (filter) => {
    return {type: SET_FILTERS, payload:filter}
}

export const createPokemon = (pokemonData) => {
    return async (dispatch) => {
        if (pokemonData.nombre === '') {
            alert('Debes completar los datos')
        } else {
            try {
                const { data } = await axios.post(`${apiUrl}/pokemons`, pokemonData);
                dispatch({ type: CREATE_POKEMON, payload: data });
                alert("Pokemon Created");
            } catch (error) {
                alert("error: " + error.response.data.error);
            }
        }
    }
}