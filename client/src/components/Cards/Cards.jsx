import { getPokemonsHome, getPokemonsDB, getTypes, getAllPokemons, orderPokes, orderAttack } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState,} from "react";
import { Card } from "../Card/Card"
import { Pagination } from "../Pagination/Pagination";
import styleCards from './Cards.module.css'
import { SearchBar } from "../SearchBar/SearchBar";
import { PreLoader } from "../PreLoader/PreLoader";

export const Cards = () => {
    const dispatch  = useDispatch();
    const porPagina = 12;

    const [loading, setLoading]         = useState(true);
    const [filtroClick, setFiltroClick] = useState(false)
    
    const filteredPokemons = useSelector((state) => state.filteredPokemons)
    const maxPages         = useSelector((state) => state.maxPages)
    const pagina           = useSelector((state) => state.pagina)

    useEffect(() =>{
        dispatch(getPokemonsHome())
        dispatch(getPokemonsDB())
        dispatch(getTypes())
    }, [dispatch])
    
    useEffect(() => {
        setFiltroClick(false);
        if(filteredPokemons.length > 0 && loading === true){
            dispatch(getAllPokemons());
            setLoading(false);
        }
    }, [filteredPokemons, loading, filtroClick, dispatch])
    
    const handleOrder = (event) =>{
        dispatch(orderPokes(event.target.value));
        setFiltroClick(true)
    }

    const filterAttack = (event) => {
        dispatch(orderAttack(event.target.value))
        setFiltroClick(true)
    }

    return (
        <>  
            {
                loading === true ?
                <PreLoader/>
                :
                <>
                    <SearchBar handleOrder = {handleOrder}  filterAttack={filterAttack}/>
                    <div className={styleCards.contenedorGridCards}> 
                    {
                        filteredPokemons.length >    0
                        
                        ?
                        
                        filteredPokemons.slice(
                            (pagina - 1) * porPagina,  //1 12
                            (pagina - 1) * porPagina + porPagina //12 24
                        ).map((pokemon) => {
                            return(
                                <Card
                                    key      = {pokemon.idApi ? pokemon.idApi : pokemon.id}
                                    id       = {pokemon.idApi ? pokemon.idApi : pokemon.id}
                                    nombre   = {pokemon.nombre}
                                    imagen   = {pokemon.imagen}
                                    vida     = {pokemon.vida}
                                    altura   = {pokemon.altura}
                                    peso     = {pokemon.peso}
                                    types    = {pokemon.types}
                                />
                            )
                        })

                        :
                        <div className={styleCards.NodataFound}>
                            <p>No Data Found !</p>
                            <img className={styleCards.NodataFoundImg} src={require('../../Images/pikachuCrying.gif')} alt="loading..." />
                        </div>
                        
                    }
                    </div>
                    {filteredPokemons.length > 0 && <Pagination pagina={pagina} maxPages={maxPages}/>}
                </>
            }
            
        </>
    )
}
