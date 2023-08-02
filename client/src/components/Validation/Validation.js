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

    if(formData.vida < 1){
        errors.vida = 'La vida debe ser al menos 1 punto'
    }
    
    if(formData.ataque < 1){
        errors.ataque = 'El ataque debe ser al menos 1 punto'
    }
    
    if(formData.defensa > 100){
        errors.defensa = 'La defensa debe ser al menos 1 punto'
    }
    
    if(formData.velocidad < 1){
        errors.velocidad = 'La velocidad debe ser al menos 1 punto'
    }
    
    if(formData.altura < 1){
        errors.altura = 'La altura debe ser al menos 1 punto'
    }
    
    if(formData.peso < 1){
        errors.peso = 'El peso debe ser al menos 1 punto'
    }

    if(formData.types.length < 2){
        errors.types = 'Debes seleccionar al menos dos tipos para tu pokemon'
    }
    
    return errors;
}