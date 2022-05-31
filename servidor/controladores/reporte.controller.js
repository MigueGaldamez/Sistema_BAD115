const { sqlee } = require('./controlador');

const fs = require('fs');
const pdf = require('pdf-creator-node');
const path = require('path');

const options = require('../helpers/options');

const generarReporte =  async (req, res) => {
    const { data } = req.body;
    const html = fs.readFileSync(path.join(__dirname, '../views/template-copy.html'), 'utf-8')
    const filename = Math.random() + '_doc' + '.pdf';
    let array = [];
    
    // recorremos la data enviada por la request y la insertamos en un arreglo
    data.forEach(element => {
        const elemento = {
            idlaboratorio : element.idlaboratorio,
            nombrelaboratorio : element.nombrelaboratorio,
        }
        array.push(elemento);
    });

    // esta sera la data que vamos a mandar al template(plantilla) para crear el pdf
    const obj = {
        campo: 'Este es un campo',
        laboratoriosLista: array,
    }

    // creamos el documento
    const document = {
        html: html,
        data: {
            laboratorios: obj   // aqui enviamos toda la data
        },
        path: './docs/' + filename
    }

    // creamos el pdf
    pdf.create(document, options)
    .then(resp => {
        res.status(200).json({
        message: 'Creado con exito',
        body: {
            path: filename //enviamos el nombre del archivo como respuesta
        }
    });
    }).catch(error => {
        console.log(error);
    });

    const filepath = `http://${process.env.REACT_APP_SERVER_IP}/docs/` + filename;

    


}


const generarReporteResultados =  async (req, res) => {
    const { valores, resultados, parametros, intervalos, opciones } = req.body;
    const html = fs.readFileSync(path.join(__dirname, '../views/template.html'), 'utf-8')
    const filename = (valores.nombrepaciente + valores.apellido).replace(/ /g, "") + '_' + (valores.nombreexamen).replace(/ /g, "") + '_' + (Math.floor(Math.random() * 9999) + 10000) + '.pdf';
    let array = [];

    sql = 'select archivo from detallechequeo where iddetalle = $1';
    const response = await sqlee.query(sql, [valores.iddetalle]);

    var datos = response.rows;
    var archivo = '';
    for(const dato of datos){
        if(dato.archivo !== null){
            archivo = dato.archivo;
        }
    }
  
    if(archivo==='' || archivo===null){

        parametros.forEach(parametro => {
            if(parametro.tipo==='1'){

                opciones.forEach(opcion => {
                    if(parametro.idparametro === opcion.idparametro){

                        resultados.forEach(resultado => {
                            if(parametro.idparametro === resultado.idparametro && opcion.opcion === resultado.opcion){

                                const elemento = {
                                    nombreparametro : parametro.parametro,
                                    valor : resultado.opcion,
                                    unidad : '',
                                    comentario : resultado.comentario,
                                }

                                array.push(elemento);
                            }
                        
                        });
                    }
                
                });

            } else if(parametro.tipo==='2'){

                intervalos.forEach(intervalo => {
                    if(parametro.idparametro === intervalo.idparametro){

                        resultados.forEach(resultado => {
                            if(parametro.idparametro === resultado.idparametro){

                                const elemento = {
                                    nombreparametro : parametro.parametro,
                                    valor : resultado.valor,
                                    unidad : intervalo.simbolo,
                                    comentario : resultado.comentario,
                                }

                                array.push(elemento);
                            }
                        
                        });
                    }
                
                });
            }

        });


        var hoy = new Date();
        var cumpleanos = new Date(valores.fechanacimiento);
        var edad = hoy.getFullYear() - cumpleanos.getFullYear();
        var m = hoy.getMonth() - cumpleanos.getMonth();

        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }

        const obj = {
            nombrelaboratorio:valores.nombrelaboratorio,
            nombrepaciente: valores.nombrepaciente + ' ' + valores.apellido,
            edad: edad + ' años', 
            genero: valores.genero,
            laboratorista: 'laboratorista',
            fechaingreso: obtenerfecha(valores.fechaingreso) + '    ' + valores.horaingreso,
            fecharegistro: obtenerfecha(valores.fecharegistro) + '    ' + valores.horaregistro,

            nombreexamen: valores.nombreexamen,

            resultadosLista: array,
        }

        const document = {
            html: html,
            data: {
                resultados: obj
            },
            path: './docs/' + filename
        }

        pdf.create(document, options)
        .then(resp => {
            //console.log(res);
            res.status(200).json({
                message: 'Creado con exito',
                body: {
                    path: filename
                }
            });

        }).catch(error => {
            console.log(error);
        });

        try{
            const response =  await sqlee.query('UPDATE detallechequeo SET archivo = $1 WHERE iddetalle = $2',
            [filename, valores.iddetalle]);
        }catch(error){
            res.status(500).json(error);
        }

        const filepath = `http://${process.env.REACT_APP_SERVER_IP}/docs/` + filename; 

    }  else {

        res.status(200).json({
            message: 'Creado con exito',
            body: {
                path: archivo
            }
        });
    }
}

function obtenerfecha(date) {
    var fecha = new Date(date);
    var y = fecha.getFullYear();
    var m = fecha.getMonth()+1;
    var d = fecha.getDate();

    return (d + '/'+ m + '/' + y);
}


module.exports = {
    generarReporte,
    generarReporteResultados
};