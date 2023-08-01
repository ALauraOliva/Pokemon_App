import styleCard from './Card.module.css'
import pokebola from '../../Images/pokebola.png';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getPokemonDetail } from "../../redux/actions";

export function Card({id, nombre, imagen, vida, altura, peso, types}){
    if(imagen == null) {imagen = require('../../Images/pokemonGuessing.png')}
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch();

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const searchPokemon = () => {
        dispatch(getPokemonDetail(id));
      };


    return(
        <div key={id} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={styleCard.contenedorBorde}>
            <div className={`${styleCard.contenedorTipo} ${styleCard[(types[0].nombre? types[0].nombre : types[0])]}`}>
                <div>
                    <div className={styleCard.contenedorBasic}>
                        <div className={styleCard.basic}>
                            BASIC
                        </div>
                    </div>
                    <div className={styleCard.contenedorNombre}>
                        <div>{nombre.charAt(0).toUpperCase() + nombre.slice(1)}</div>
                        <div className={styleCard.contenedorVida}>
                            <p>hp&nbsp;&nbsp;</p>
                            <div>{vida}&nbsp;</div>
                            <img className = {styleCard.imagenIcon} src={pokebola} alt='pokebola'/>
                        </div>
                    </div>
                    {isHovered && (<div className={styleCard.contenedorPokedex}>
                        <div className={styleCard.Pokedex}>
                            <NavLink onClick={searchPokemon} className={styleCard.navLink} to={`/Detail/${id}`}>    
                                <img className = {styleCard.imagenPokedex} src={require('../../Images/pokedex.webp')} alt=''/>\
                            </NavLink>
                        </div>
                    </div>)}
                </div>
                <div className={styleCard.contenedorFooter}>
                    <div className={styleCard.contenedorImagenBorde}>
                        <div className={`${styleCard.contenedorImagen} ${styleCard[(types[0].nombre? types[0].nombre : types[0])+'Imagen']}`}>
                            <img src={imagen} alt={nombre}/>
                        </div>
                    </div>
                </div>
                <div className={styleCard.contenedorInfo}>
                    <div className={styleCard.contenedorInfoCard}>
                        <div className={styleCard.contenedorTipos}>
                            {types.map( (tipo, index) => <img key={index} src={require(`../../Images/${tipo.nombre? tipo.nombre: tipo}Type.png`)} alt=''/> )}
                        </div>
                        <div className={styleCard.infoCard}>TYPE</div>
                    </div>
                    <div className={styleCard.verticalLine}/>
                    <div className={styleCard.contenedorInfoCard}>
                        <div className={styleCard.contenedorInfoD}>{altura} M</div>
                        <div className={styleCard.infoCard}>HEIGHT</div>
                    </div>
                    <div className={styleCard.verticalLine}/>
                    <div className={styleCard.contenedorInfoCard}>
                        <div className={styleCard.contenedorInfoD}>{peso} LBS</div>
                        <div className={styleCard.infoCard}>WEIGHT</div>
                    </div>
                </div>  
            </div>
        </div>
    )
}