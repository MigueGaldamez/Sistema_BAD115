const departamentoModel = {
    type: "object",
    required: [],
    properties: {
        nombre: {
            type: "string",
            minLength: 1,
            "errorMessage": {
                "type": "El tipo de dato debe ser numerico",
                "minLength": "Este campo es requerido"
              }
        },/*
         apellido: {
            type: "string",
            minLength: 1,
            "errorMessage": {
                "type": "El tipo de dato debe ser numerico",
                "minLength": "Este campo es requerido"
              }
        },*/
    },
};
module.exports={ 
    departamentoModel
};