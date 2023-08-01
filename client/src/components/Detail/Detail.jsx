// import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styleDetail from "./Detail.module.css";
import { LiaRulerVerticalSolid } from "react-icons/lia"
import {TbWeight} from "react-icons/tb"


export const Detail = () => {
//   const { id } = useParams();
  const detailPokemon = useSelector((state) => state.detailPokemon);

  if (detailPokemon.types[0].nombre) {
    detailPokemon.types = detailPokemon.types.map((elemento) => elemento.nombre);
  }
  if (detailPokemon.imagen == null) {
    detailPokemon.imagen = require("../../Images/pokemonGuessing.png");
  }

  let mayorPorcentaje = Math.max(
    detailPokemon.vida,
    detailPokemon.velocidad,
    detailPokemon.defensa,
    detailPokemon.ataque
  );
  let ataquePorcentaje = (detailPokemon.ataque * 100) / mayorPorcentaje;
  let defensaPorcentaje = (detailPokemon.defensa * 100) / mayorPorcentaje;
  let vidaPorcentaje = (detailPokemon.vida * 100) / mayorPorcentaje;
  let velocidadPorcentaje = (detailPokemon.velocidad * 100) / mayorPorcentaje;

  return (
    <div className={`${styleDetail.containerDetail} ${styleDetail[(detailPokemon.types[0].nombre? detailPokemon.types[0].nombre : detailPokemon.types[0])]}`}>
        <div className={styleDetail.containerDetail2}>
            <div className={styleDetail.contenedorImg}>
                {/* <div>{id}</div> */}
                <img src={detailPokemon.imagen} alt="" />
            </div>

            <div className={styleDetail.allInfo}> 
                <div className={styleDetail.infoContainer}>
                    <div >
                        <div className={styleDetail.nombre}>{detailPokemon.nombre}</div>
                    </div>
                    <div className={styleDetail.infoContainer2}>
                        <div className={styleDetail.infoContainer3}>
                            <div className={styleDetail.infoContainer3HW}>
                                <LiaRulerVerticalSolid size={32}/>
                                <div>{detailPokemon.altura} M</div>
                            </div>
                            <div className={styleDetail.infoContainer3HW}>
                                <TbWeight size={32}/>
                                <div>{detailPokemon.peso} LB</div>
                            </div>
                        </div>
                        <div>
                            <div className={styleDetail.contenedorTipos}>
                                {detailPokemon.types.map( (tipo, index) => 
                                    <div className={styleDetail.contenedorTipo}>
                                        <img key={index} src={require(`../../Images/${tipo.nombre? tipo.nombre: tipo}Type.png`)} alt=''/> 
                                        <div>{tipo.nombre? tipo.nombre: tipo}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styleDetail.statsContainer}>
                    <div className={styleDetail.stats}>
                        <div className={styleDetail.NameStat}>
                            <p>Life</p>
                        </div>
                        <div className={`${styleDetail.barraContainer} ${styleDetail.vida}`}>
                            <div className={`${styleDetail.barra} `} style={{ width: `${vidaPorcentaje}%`, backgroundColor: "#ff0000" }}></div>
                        </div>
                        <div>{detailPokemon.vida}</div>
                    </div>

                    <div className={styleDetail.stats}>
                        <div className={styleDetail.NameStat}>
                            <p>Attack</p>
                        </div>
                        <div className={`${styleDetail.barraContainer} ${styleDetail.ataque}`}>
                            <div className={`${styleDetail.barra}`} style={{ width: `${ataquePorcentaje}%`, backgroundColor: "#ff6600" }}></div>
                        </div>
                        <div>{detailPokemon.ataque}</div>
                    </div>

                    <div className={styleDetail.stats}>
                        <div className={styleDetail.NameStat}>
                            <p>Defense</p>
                        </div>
                        <div className={`${styleDetail.barraContainer} ${styleDetail.defensa}`}>
                            <div className={`${styleDetail.barra}`} style={{ width: `${defensaPorcentaje}%`, backgroundColor: "#00cc00" }}></div>
                        </div>
                        <div>{detailPokemon.defensa}</div>
                    </div>

                    <div className={styleDetail.stats}>
                        <div className={styleDetail.NameStat}>
                            <p>Velocidad</p>
                        </div>
                        <div className={`${styleDetail.barraContainer} ${styleDetail.velocidad}`}>
                            <div className={`${styleDetail.barra}`} style={{ width: `${velocidadPorcentaje}%`, backgroundColor: "#3399ff" }}></div>
                        </div>
                        <div>{detailPokemon.velocidad}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};