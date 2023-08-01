import React, { useState } from 'react';
import styleCreate from './Create.module.css'
import { useSelector } from 'react-redux';
import validation from '../Validation/Validation';
import {AiFillWarning} from 'react-icons/ai'

export const Create = ({onCreatePokemon }) => {

  const allTypesPokemon = useSelector((state) => state.allTypesPokemon)
  const [checkedItems, setCheckedItems] = useState({}); // Estado para mantener los checkboxes seleccionados

  const [formData, setFormData] = useState({
    nombre    : '',
    imagen    : "",
    vida      : 0,
    ataque    : 0,
    defensa   : 0,
    velocidad : 0,
    altura    : 0, 
    peso      : 0,
    types     : []
  });
  const [errors, setErrors] = useState({})

  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;
    const index = Number(value); // Extraer el índice del nombre del checkbox

    setCheckedItems((prevState) => ({ ...prevState, [value]: checked }));
    
    // Actualiza el estado de formData.types
    setFormData((prevFormData) => {
      if (checked) {
        // Agrega el índice al array types si no está presente
        return { ...prevFormData, types: [...prevFormData.types, index] };
      } else {
        // Elimina el índice del array types
        return {
          ...prevFormData,
          types: prevFormData.types.filter((typeIndex) => typeIndex !== index),
        };
      }
    });

    setErrors(validation({
      ...formData,
      [name] : value
    }))
  };

  // Manejar cambios en los campos del formulario
  const handleChange = (event) => {
    const { name, value } = event.target;
    const parsedValue = name === "nombre" || name === "imagen" ? value : Number(value);
    setFormData({ ...formData, [name]: parsedValue });

    setErrors(validation({
      ...formData,
      [name] : value
    }))

  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onCreatePokemon(formData);

    setFormData({
      nombre: '',
      imagen: "",
      vida: 0,
      ataque: 0,
      defensa: 0,
      velocidad: 0,
      altura: 0,
      peso: 0,
      types : []
    });

    setCheckedItems({}); // Reiniciar el estado de checkedItems a un objeto vacío
  };

  return (
    <form className={styleCreate.formulario} onSubmit={handleSubmit}>

      <div className={styleCreate.parent}>
        <div className={styleCreate.div1}> 
            <img src={formData.imagen ? (formData.imagen) : require('../../Images/pokemonGuessing.png')}  alt=''></img>
        </div>

        <div className={styleCreate.div2}> 
          <div className={styleCreate.contenedorTitulo}>
            <p className={styleCreate.titulo}>CREATE YOUR OWN POKEMON</p>
          </div>
          <div className={styleCreate.contenedorInputs}>
            <div className={styleCreate.contenedorInput}>
              <div>
                  <label>Name:</label>
                  <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
              </div>
                  
              
              <div>
                <label>Image:</label>
                <input type="text" name="imagen" value={formData.imagen} onChange={handleChange} />
                
              </div>
              
              <div>
                <label>Life:</label>
                <input type="number" name="vida" value={formData.vida} onChange={handleChange} />
               
              </div>

              <div>
                <label>Attack:</label>
                <input type="number" name="ataque" value={formData.ataque} onChange={handleChange} />
                
              </div>
            </div>

            <div className={styleCreate.contenedorInput}>
              <div>
                <label>Defense:</label>
                <input type="number" name="defensa" value={formData.defensa} onChange={handleChange} />
                
              </div>

              <div>
                <label>Speed:</label>
                <input type="number" name="velocidad" value={formData.velocidad} onChange={handleChange} />
                
              </div>

              <div>
                <label>Height:</label>
                <input type="number" name="altura" value={formData.altura} onChange={handleChange} />
                
              </div>

              <div>
                <label>Weight:</label>
                <input type="number" name="peso" value={formData.peso} onChange={handleChange} />
                
              </div>
            </div>
          </div>

        </div>

        <div className={styleCreate.div3}> 
          <div className={styleCreate.types}>
            {allTypesPokemon.map((opcion, index) => (
              <div key={index + 1} className={styleCreate.contenedorTypesIcon}>
                <input
                  type="checkbox"
                  id={`opcion_${index}`}
                  name="types"
                  checked={checkedItems[index + 1] ? true : false}
                  onChange={handleCheckboxChange}
                  value={index + 1}
                />
                <label htmlFor={`opcion_${index}`}>{opcion.nombre}</label>
                <img className={styleCreate.tiposIcon} key={index} src={require(`../../Images/${opcion.nombre? opcion.nombre: opcion}Type.png`)} alt=''/> 
              </div>
              ))}
          </div>

          <div className={styleCreate.contenedorErrores}>
            {errors.types && <p className={styleCreate.errores}style={{color:"white"}}><AiFillWarning size={14}/>&nbsp; {errors.types}</p>}
            {errors.nombre && <p className={styleCreate.errores} style={{color:"white"}}><AiFillWarning size={14}/>&nbsp;  {errors.nombre}</p>}
            {errors.imagen && <p className={styleCreate.errores} style={{color:"white"}}><AiFillWarning size={14}/>&nbsp;  {errors.imagen}</p>}
            {errors.vida && <p className={styleCreate.errores} style={{color:"white"}}><AiFillWarning size={14}/>&nbsp;  {errors.vida}</p>}
            {errors.ataque && <p className={styleCreate.errores} style={{color:"white"}}><AiFillWarning size={14}/>&nbsp;  {errors.ataque}</p>}
            {errors.defensa && <p className={styleCreate.errores} style={{color:"white"}}><AiFillWarning size={14}/>&nbsp;  {errors.defensa}</p>}
            {errors.velocidad && <p className={styleCreate.errores} style={{color:"white"}}><AiFillWarning size={14}/>&nbsp;  {errors.velocidad}</p>}
            {errors.altura && <p className={styleCreate.errores} style={{color:"white"}}><AiFillWarning size={14}/>&nbsp;  {errors.altura}</p>}
            {errors.peso && <p className={styleCreate.errores} style={{color:"white"}}><AiFillWarning size={14}/>&nbsp; {errors.peso}</p>}  
          </div>
          
          <div className={styleCreate.contenedorButton}>
            <button type="submit">Create Pokemon</button>
          </div>
        </div>

      </div>
    </form>
  );
}
