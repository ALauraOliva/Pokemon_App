import { useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import styledNav from './Nav.module.css'
import logotipo from '../../Images/Logo-Pokemon.png'
import styleSearchBar from '../../components/SearchBar/SearchBar.module.css'
import { setOriginPokemons } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux';

export const Nav = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const originPokemon = useSelector((state) => state.originPokemon);

    const originCheck = (event) => {
        dispatch(setOriginPokemons(event.target.value));
    }

    return (
        <div className={styledNav.contenedorNav}>
            <div className={styledNav.contentLogotipo}>
                <img src={logotipo} alt=''/>
            </div>
            <div className={styledNav.contenedorOpc}>
                <NavLink className={styledNav.opciones} to={'/Home'}>Home</NavLink>
                <NavLink className={styledNav.opciones} to={'/create'}>Create</NavLink>
                <NavLink className={styledNav.opciones} to={'/about'}>About</NavLink>
                <NavLink className={styledNav.opciones} to={'/'}>LogOut</NavLink>
            </div>
            <div>
                {location.pathname === '/Home' && 
                    <div className={styleSearchBar.searchBarContainer}>
                    <div className={styleSearchBar.originContainer}>
                        <div className={styleSearchBar.originName}>Origin : </div>
                        <div> 
                            <input type="radio"  name="originPoke" value={'APIPokemons'} checked={originPokemon === 'APIPokemons'} onChange={originCheck}/>
                            <label >API Pokemons</label>
                        </div>
                        <div>
                            <input type="radio"  name="originPoke" value={'dbPokemons'} checked={originPokemon === 'dbPokemons'} onChange={originCheck}/>
                            <label >DB Pokemons</label>
                        </div>
                        <div>
                            <input type="radio" name="originPoke" value={'allPokemons'} checked={originPokemon === 'allPokemons'} onChange={originCheck}/>
                            <label >All Pokemons</label>
                        </div>
                    </div>
                </div>
            }
            </div>
        </div>
    )
}   