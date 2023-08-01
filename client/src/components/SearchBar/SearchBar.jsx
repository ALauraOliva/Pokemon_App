import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterPokemons, filterByType, resetFilter } from "../../redux/actions";
import styleSearchBar from './SearchBar.module.css'

export const SearchBar = ({handleOrder, filterAttack}) => {
    const dispatch = useDispatch();
    
    const allTypesPokemon  = useSelector((state) => state.allTypesPokemon)
    const originPokemon    = useSelector((state) => state.originPokemon)
    const allPokemonsHome  = useSelector((state) => state.allPokemonsHome)
    const allPokemonsDB    = useSelector((state) => state.allPokemonsDB)
    const allPokemons      = useSelector((state) => state.allPokemons)
    const filtersDefault   = useSelector((state) => state.filtersDefault)

    const [searchValue, setSearchValue]        = useState("");
    const [filterePokemons, setFilterPokemons] = useState([]);  


    const onChange = (event) => {
        let pokemonsFiltered;

        if (originPokemon === 'APIPokemons') { pokemonsFiltered = allPokemonsHome }
        if (originPokemon === 'dbPokemons' ) { pokemonsFiltered = allPokemonsDB   }
        if (originPokemon === 'allPokemons') { pokemonsFiltered = allPokemons     }
        
        pokemonsFiltered = pokemonsFiltered.filter(pokemon => {
            const searchPoke = event.target.value.toLowerCase(); //pika
            const pokemonName = pokemon.nombre.toLowerCase(); //pikachu

            return searchPoke && pokemonName.includes(searchPoke) && pokemonName !== searchPoke; //retorna si el nmbre del pokemon empieza con lo que estamos escribiendo //STARTSWITH
        }) 
        
        setFilterPokemons(pokemonsFiltered)
        setSearchValue(event.target.value);
    }

    const onSearch = (value) =>{
        setSearchValue(value);
        setFilterPokemons([]);
    }

    const searchPush = (searchValue) => {
        dispatch(filterPokemons(searchValue))
        setSearchValue("")
    }

    const resetFilterCall = () => {
        dispatch(resetFilter())
    }

    const searchByType = (event) => {
        dispatch(filterByType(event.target.value))
    }
    

    return(
        <>  
            <div className={styleSearchBar.searchContainer}>
                <div className={styleSearchBar.filter}>
                    <div className={styleSearchBar.filterName}>Filter by Type: </div>
                    <select value={filtersDefault[0]} onChange={searchByType}>
                        <option value="N" key={0} >All Types</option>
                        {allTypesPokemon.map((type, index) => <option key={index} value={type.nombre}>{type.nombre}</option>)}
                    </select>
                </div>

                <div className={styleSearchBar.filter}>
                    <div className={styleSearchBar.filterName}>Order By: </div> 
                    <select onChange={handleOrder} value={filtersDefault[1]}>
                        <option value="N">Name</option>
                        <option value="Ascendente">A - Z</option>
                        <option value="Descendente">Z - A</option>
                    </select> 
                </div>

                <div className={styleSearchBar.filter}>
                    <div className={styleSearchBar.filterName}>Order By: </div> 
                    <select onChange={filterAttack} value={filtersDefault[2]}> 
                        <option value="N">Attack</option>
                        <option value="M">+ &nbsp;&nbsp;&nbsp;-</option>
                        <option value="A">- &nbsp;&nbsp;&nbsp;+</option>
                    </select> 
                </div>

                <div className={styleSearchBar.search}>
                    <input list="pokemonData" type = 'text' value = {searchValue} onChange = {onChange} placeholder = "Search a pokemon ..."/>
                    <datalist id="pokemonData">
                        {
                            filterePokemons?.map(pokemon => {
                                return(
                                    <option className={styleSearchBar.optionDatalist} key={pokemon.nombre} onClick={() => onSearch(pokemon.nombre)}>
                                        {pokemon.nombre} 
                                    </option>
                                )
                            })
                        }
                    </datalist>
                    <button onClick={() =>{searchPush(searchValue)}}>Search</button>
                    <button onClick={() =>{resetFilterCall()}}>Reset Filter</button>
                </div>
            </div>

        </>
    )
}