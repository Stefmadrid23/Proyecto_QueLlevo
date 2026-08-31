export function validarRequerido(valor: string): string | null {
    if (!valor || valor.trim().length ===0){
        return "Este campo es obligatorio";
    }
    return null;
}

export function validarEmail(valor:string): string | null {
    const requerido= validarRequerido(valor);
    if (requerido) return requerido;

    const regex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(valor)){
        return "Ingresar un correo válido (ej: nombre@correo.com";
    }
    return null;
}

export function validaTelefono(valor: string): string | null {
    const requerido= validarRequerido(valor);
    if(requerido) return requerido;

    const regex= /^\d{4}-?\d{4}$/;
    if(!regex.test(valor)){
        return "Ingresa un telefono valido (8 digitos, ej; 9999-9999";

    }
    return null;
}

export function validarPassword(valor: string): string | null {
    const requerido = validarRequerido(valor);
    if (requerido) return requerido;

    if(valor.length <6){
        return "La contraseña debe tener al menos 6 caracteres";
    }
    return null;
}

export function validarTexto(valor: string, minimo= 2): string | null {
    const requerido = validarRequerido(valor);
    if (requerido) return requerido;

    if (valor.trim().length <minimo){
        return 'Debe tener al menos ${minimo} caracteres';
    }
    return null;
}