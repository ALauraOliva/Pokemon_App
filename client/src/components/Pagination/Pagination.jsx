//rafc ATAJO para crear el arrow function fast
import stylePagination from './Pagination.module.css'
import PokemonGoArrowRight from '../../Images/PokemonGoArrowRight.png'
import PokemonGoArrowLeft from '../../Images/PokemonGoArrowLeft.png'
import { useDispatch } from 'react-redux'
import { setPagina } from "../../redux/actions";

export const Pagination = ({pagina, maxPages}) => {
    const dispatch = useDispatch();

    const nextPage = () => {
        if(pagina + 1 > Math.ceil(maxPages)){
            dispatch(setPagina(maxPages))
        }else{
            dispatch(setPagina(pagina + 1))
        }
    }

    const previousPage = () => {
        if(pagina - 1 < 1){
            dispatch(setPagina(1))
        }else{
            dispatch(setPagina(pagina - 1))
        }
    }

    return (
        <div className={stylePagination.contenedor}>
            <button  className={stylePagination.buttonPrevious} onClick={previousPage}><img src={PokemonGoArrowLeft} alt=''/></button>
            <p>{pagina}</p>
            <p>of {maxPages} </p>
            <button className={stylePagination.buttonNext} onClick={nextPage}><img src={PokemonGoArrowRight} alt=''/></button>
        </div>
    )
}
