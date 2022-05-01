const departamentoModel = {
    type: "object",
    required: [],
    properties: {
        area: {
            type: "interger",
            minLength: 1,
            "errorMessage": {
                "type": "El tipo de dato debe ser numerico",
                "minLength": "Este campo es requerido"
              }
        },
        parametro: {
            type: "string",
            minLength: 1,
            "errorMessage": {
                "type": "El tipo de dato debe ser numerico",
                "minLength": "Este campo es requerido"
              }
        },
        tipo: {
            type: "string",
            minLength: 1,
            "errorMessage": {
                "type": "El tipo de dato debe ser numerico",
                "minLength": "Este campo es requerido"
              }
        },
    },
};
module.exports={ 
    departamentoModel
};