export default function validation(formData){

    const errors = {};
    
    if(formData.nombre.length > 10){
        errors.nombre = 'El nombre no puede exceder los 10 caracteres'
    }

    if(!formData.imagen){
        errors.imagen = 'Debes ingresar una imagen'
    }

    if(formData.vida > 100){
        errors.vida = 'La vida no puede exceder los 100 puntos'
    }

    if(formData.ataque > 100){
        errors.ataque = 'El ataque no puede exceder los 100 puntos'
    }

    if(formData.defensa > 100){
        errors.defensa = 'La defensa no puede exceder los 100 puntos'
    }

    if(formData.velocidad > 100){
        errors.velocidad = 'La velocidad no puede exceder los 100 puntos'
    }
    
    if(formData.altura > 100){
        errors.altura = 'La altura no puede exceder los 100 M'
    }

    if(formData.peso > 100){
        errors.peso = 'El peso no puede exceder las 100 LB'
    }
    
    if(formData.types.length < 2){
        errors.types = 'Debes seleccionar al menos dos tipos para tu pokemon'
    }
    return errors;
}