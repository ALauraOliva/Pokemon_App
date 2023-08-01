import { useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import styledNav from './Nav.module.css'
import logotipo from '../../Images/Logo-Pokemon.png'
import styleSearchBar from '../../components/SearchBar/SearchBar.module.css'
import { useState } from "react";
import { setOriginPokemons } from '../../redux/actions'
import { useDispatch } from 'react-redux';

export const Nav = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const [originPoke, setoriginPoke] = useState({ //Para saber que marca el usuario
        APIPokemons : true,
        dbPokemons  : false,
        allPokemons : false
    }) 

    const originCheck = (event) => {
        setoriginPoke({
            APIPokemons : false,
            dbPokemons  : false,
            allPokemons : false,
            [event.target.value] : event.target.checked
        })

        dispatch(setOriginPokemons(event.target.value))
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
                            <input type="radio" id={originPoke} name="originPoke" value={'APIPokemons'} onChange={originCheck}/>
                            <label >API Pokemons</label>
                        </div>
                        <div>
                            <input type="radio" id={originPoke} name="originPoke" value={'dbPokemons'} onChange={originCheck}/>
                            <label >DB Pokemons</label>
                        </div>
                        <div>
                            <input type="radio" id={originPoke} name="originPoke" value={'allPokemons'} onChange={originCheck}/>
                            <label >All Pokemons</label>
                        </div>
                    </div>
                </div>
            }
            </div>
        </div>
    )
}   