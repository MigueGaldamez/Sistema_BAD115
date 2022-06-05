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
            laboratorista: valores.nombreusuario,
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

const generarReporteTipeoSanguineo =  async (req, res) => {
    const { filtro } = req.body;
    const html = fs.readFileSync(path.join(__dirname, '../views/template-tipeo.html'), 'utf-8')
    var filename = '';
    var obj = null;
    let array = [];

    console.log(filtro);
    if (filtro==='1'){
        filename = 'TipeoSanguineo_ZonaGeografica' + '_' + (Math.floor(Math.random() * 9999) + 10000) + '.pdf';

        sql = 'select DISTINCT p.idmunicipio as idmunicipio, municipio from resultado r ' +
        'join detallechequeo d on d.iddetalle = r.iddetalle '+
        'join chequeo c on c.idchequeo = d.idchequeo '+
        'join paciente p on c.idpaciente = p.idpaciente '+
        'join municipio m on p.idmunicipio = m.idmunicipio '+
        'where idparametro=11 ';
        const response = await sqlee.query(sql);

        var municipios = response.rows;
        for(const municipio of municipios){
        
            var idmunicipio = municipio.idmunicipio;

            var AP = 0;
            var OP = 0;
            var BP = 0;
            var ABP = 0;
            var AN = 0;
            var ON = 0;
            var BN = 0;
            var ABN = 0;

            sql = 'select p.idpaciente, opcion, p.idmunicipio as idmunicipio ' +
            'from resultado r '+
            'join detallechequeo d on d.iddetalle = r.iddetalle '+
            'join chequeo c on c.idchequeo = d.idchequeo '+
            'join paciente p on c.idpaciente = p.idpaciente '+
            'join municipio m on p.idmunicipio = m.idmunicipio '+
            'where idparametro=11 ' +
            'and p.idmunicipio=$1 '+        
            'group by opcion, p.idmunicipio, p.idpaciente';
            const response = await sqlee.query(sql, [idmunicipio]);
            
            var resultados = response.rows;
            resultados.forEach(resultado => {
                
                if (resultado.opcion === 'A+'){
                    AP++;
                } else if (resultado.opcion === 'O+'){
                    OP++;
                } else if (resultado.opcion === 'B+'){
                    BP++;
                }else if (resultado.opcion === 'AB+'){
                    ABP++;
                }else if (resultado.opcion === 'A-'){
                    AN++;
                }else if (resultado.opcion === 'O-'){
                    ON++;
                }else if (resultado.opcion === 'B-'){
                    BN++;
                }else if (resultado.opcion === 'AB-'){
                    ABN++;
                }
            });

            const elemento = {
                agrupacion: municipio.municipio,
                AP: AP,
                OP: OP,
                BP: BP,
                ABP: ABP,
                AN: AN,
                ON: ON,
                BN: BN,
                ABN: ABN,
            }
            array.push(elemento);

            
        };
        
        // esta sera la data que vamos a mandar al template(plantilla) para crear el pdf
        obj = {
            nombrelaboratorio: 'Laboratorio Nacional',
            nombrereporte: 'Reporte de tipeo sanguieneo por zona geografica',
            datosLista: array,
        }

    } else if (filtro==='2'){
        
        filename = 'TipeoSanguineo_Edades' + '_' + (Math.floor(Math.random() * 9999) + 10000) + '.pdf';
        var fecha = new Date();
        var y = fecha.getFullYear();

        var edades = [
            {
                grupo: 'Primera infancia (0-5 años)',
                minedad: y,
                maxedad: y-6,
            },
            {
                grupo: 'Infancia (6 - 11 años)',
                minedad: y-7,
                maxedad: y-11,
            },
            {
                grupo: 'Adolescencia (12 - 18 años)',
                minedad: y-12,
                maxedad: y-18,
            },
            {
                grupo: 'Adulto juventud (19 - 26 años)',
                minedad: y-19,
                maxedad: y-26,
            },
            {
                grupo: 'Adultez (27- 59 años)',
                minedad: y-27,
                maxedad: y-59,
            },
            {
                grupo: 'Persona Mayor (60 años o mas)',
                minedad: y-60,
                maxedad: y-130,
            },
            
        ]

        
        for(const edad of edades){

            var AP = 0;
            var OP = 0;
            var BP = 0;
            var ABP = 0;
            var AN = 0;
            var ON = 0;
            var BN = 0;
            var ABN = 0;

            sql = 'select p.idpaciente, opcion, EXTRACT(YEAR FROM fechanacimiento) as anio ' +
            'from resultado r ' +
            'join detallechequeo d on d.iddetalle = r.iddetalle ' +
            'join chequeo c on c.idchequeo = d.idchequeo ' +
            'join paciente p on c.idpaciente = p.idpaciente ' +
            'where idparametro=11 ' +
            'and EXTRACT(YEAR FROM fechanacimiento) BETWEEN $1 AND $2 ' +
            'group by opcion, p.idpaciente, EXTRACT(YEAR FROM fechanacimiento)';
            const response = await sqlee.query(sql, [edad.maxedad, edad.minedad]);
            
            var resultados = response.rows;
            resultados.forEach(resultado => {
                if (resultado.opcion === 'A+'){
                    AP++;
                } else if (resultado.opcion === 'O+'){
                    OP++;
                } else if (resultado.opcion === 'B+'){
                    BP++;
                }else if (resultado.opcion === 'AB+'){
                    ABP++;
                }else if (resultado.opcion === 'A-'){
                    AN++;
                }else if (resultado.opcion === 'O-'){
                    ON++;
                }else if (resultado.opcion === 'B-'){
                    BN++;
                }else if (resultado.opcion === 'AB-'){
                    ABN++;
                }
            });

            const elemento = {
                agrupacion: edad.grupo,
                AP: AP,
                OP: OP,
                BP: BP,
                ABP: ABP,
                AN: AN,
                ON: ON,
                BN: BN,
                ABN: ABN,
            }
            array.push(elemento);

        };

        
        // esta sera la data que vamos a mandar al template(plantilla) para crear el pdf
        obj = {
            nombrelaboratorio: 'Laboratorio Nacional',
            nombrereporte: 'Reporte de tipeo sanguieneo por edades',
            datosLista: array,
        }

    } else if (filtro==='3'){
        
        filename = 'TipeoSanguineo_Generos' + '_' + (Math.floor(Math.random() * 9999) + 10000) + '.pdf';
        var fecha = new Date();
        var y = fecha.getFullYear();

        var generos = [{genero: 'Masculino'}, {genero: 'Femenino'}]

        
        for(const genero of generos){

            var AP = 0;
            var OP = 0;
            var BP = 0;
            var ABP = 0;
            var AN = 0;
            var ON = 0;
            var BN = 0;
            var ABN = 0;

            sql = 'select p.idpaciente, opcion, genero ' +
            'from resultado r ' +
            'join detallechequeo d on d.iddetalle = r.iddetalle ' +
            'join chequeo c on c.idchequeo = d.idchequeo ' +
            'join paciente p on c.idpaciente = p.idpaciente ' +
            'where idparametro=11 ' +
            'and genero = $1 ' +
            'group by opcion, p.idpaciente ';
            const response = await sqlee.query(sql, [genero.genero]);
            
            var resultados = response.rows;
            resultados.forEach(resultado => {
                if (resultado.opcion === 'A+'){
                    AP++;
                } else if (resultado.opcion === 'O+'){
                    OP++;
                } else if (resultado.opcion === 'B+'){
                    BP++;
                }else if (resultado.opcion === 'AB+'){
                    ABP++;
                }else if (resultado.opcion === 'A-'){
                    AN++;
                }else if (resultado.opcion === 'O-'){
                    ON++;
                }else if (resultado.opcion === 'B-'){
                    BN++;
                }else if (resultado.opcion === 'AB-'){
                    ABN++;
                }
            });

            const elemento = {
                agrupacion: genero.genero,
                AP: AP,
                OP: OP,
                BP: BP,
                ABP: ABP,
                AN: AN,
                ON: ON,
                BN: BN,
                ABN: ABN,
            }
            array.push(elemento);

        };

        
        // esta sera la data que vamos a mandar al template(plantilla) para crear el pdf
        obj = {
            nombrelaboratorio: 'Laboratorio Nacional',
            nombrereporte: 'Reporte de tipeo sanguieneo por genero',
            datosLista: array,
        }

    }
        
    // creamos el documento
    const document = {
        html: html,
        data: {
            datos: obj   // aqui enviamos toda la data
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

const generarReporteEpidemiologico =  async (req, res) => {
    const { filtro, padecimiento } = req.body;
    const html = fs.readFileSync(path.join(__dirname, '../views/template-epidemiologico.html'), 'utf-8')
    var filename = '';
    var obj = null;
    let array = [];

    console.log(filtro, padecimiento);
    if (padecimiento==='1' && filtro === '5'){ 
//Triglicéridos altos con zona geográfica filtro 1 = 5
        filename = 'TriglicéridosAltos_ZonaGeografica' + '_' + (Math.floor(Math.random() * 9999) + 10000) + '.pdf';
        
        var municipios = response.rows;
        for(const municipio of municipios){

        }
        // esta sera la data que vamos a mandar al template(plantilla) para crear el pdf
        obj = {
            nombrelaboratorio: 'Laboratorio Nacional',
            nombrereporte: 'Reporte de Triglicéridos Altos por zona geografica',
            datosLista: array,
        }

    } else if (padecimiento==='1' && filtro === '6') { 
//Triglicéridos altos con edades filtro 1 = 6
        filename = 'TriglicéridosAltos_Edades' + '_' + (Math.floor(Math.random() * 9999) + 10000) + '.pdf';
        var fecha = new Date();
        var y = fecha.getFullYear();

        var edades = [
            {
                grupo: 'Primera infancia (0-5 años)',
                minedad: y,
                maxedad: y-6,
            },
            {
                grupo: 'Infancia (6 - 11 años)',
                minedad: y-7,
                maxedad: y-11,
            },
            {
                grupo: 'Adolescencia (12 - 18 años)',
                minedad: y-12,
                maxedad: y-18,
            },
            {
                grupo: 'Adulto juventud (19 - 26 años)',
                minedad: y-19,
                maxedad: y-26,
            },
            {
                grupo: 'Adultez (27- 59 años)',
                minedad: y-27,
                maxedad: y-59,
            },
            {
                grupo: 'Persona Mayor (60 años o mas)',
                minedad: y-60,
                maxedad: y-130,
            },
            
        ]
        for(const edad of edades){
        }
        // esta sera la data que vamos a mandar al template(plantilla) para crear el pdf
        obj = {
            nombrelaboratorio: 'Laboratorio Nacional',
            nombrereporte: 'Reporte de Triglicéridos Altos por edades',
            datosLista: array,
        }

    } else if (padecimiento==='1' && filtro === '7') { 
//Triglicéridos altos con genero filtro 1 = 7
        filename = 'TriglicéridosAltos_Genero' + '_' + (Math.floor(Math.random() * 9999) + 10000) + '.pdf';
        var fecha = new Date();
        var y = fecha.getFullYear();

        var generos = [{genero: 'Masculino'}, {genero: 'Femenino'}]

        
        for(const genero of generos){
        }
        // esta sera la data que vamos a mandar al template(plantilla) para crear el pdf
        obj = {
            nombrelaboratorio: 'Laboratorio Nacional',
            nombrereporte: 'Reporte de Trigliceridos Altos por genero',
            datosLista: array,
        }

    } else if (padecimiento==='2' && filtro === '5') { 
//Colesterol con zona geografica filtro 2 = 5
        filename = 'Colesterol_ZonaGeográfica' + '_' + (Math.floor(Math.random() * 9999) + 10000) + '.pdf';
        
        var municipios = response.rows;
        for(const municipio of municipios){

        }
        // esta sera la data que vamos a mandar al template(plantilla) para crear el pdf
        obj = {
            nombrelaboratorio: 'Laboratorio Nacional',
            nombrereporte: 'Reporte Colesterol por zona geografica',
            datosLista: array,
        }

    } else if (padecimiento==='2' && filtro === '6') { 
//Colesterol con edad filtro 2 = 6
        filename = 'Colesterol_Edad' + '_' + (Math.floor(Math.random() * 9999) + 10000) + '.pdf';
        var fecha = new Date();
        var y = fecha.getFullYear();

        var edades = [
            {
                grupo: 'Primera infancia (0-5 años)',
                minedad: y,
                maxedad: y-6,
            },
            {
                grupo: 'Infancia (6 - 11 años)',
                minedad: y-7,
                maxedad: y-11,
            },
            {
                grupo: 'Adolescencia (12 - 18 años)',
                minedad: y-12,
                maxedad: y-18,
            },
            {
                grupo: 'Adulto juventud (19 - 26 años)',
                minedad: y-19,
                maxedad: y-26,
            },
            {
                grupo: 'Adultez (27- 59 años)',
                minedad: y-27,
                maxedad: y-59,
            },
            {
                grupo: 'Persona Mayor (60 años o mas)',
                minedad: y-60,
                maxedad: y-130,
            },
            
        ]
        for(const edad of edades){
        }
        // esta sera la data que vamos a mandar al template(plantilla) para crear el pdf
        obj = {
            nombrelaboratorio: 'Laboratorio Nacional',
            nombrereporte: 'Reporte de Colesterol por edades',
            datosLista: array,
        }

    } else if (padecimiento==='2' && filtro === '7') { 
//Colesterol con genero filtro 2 = 7
        filename = 'Colesterol_Genero' + '_' + (Math.floor(Math.random() * 9999) + 10000) + '.pdf';
        
        var fecha = new Date();
        var y = fecha.getFullYear();

        var generos = [{genero: 'Masculino'}, {genero: 'Femenino'}]

        
        for(const genero of generos){
        }
        // esta sera la data que vamos a mandar al template(plantilla) para crear el pdf
        obj = {
            nombrelaboratorio: 'Laboratorio Nacional',
            nombrereporte: 'Reporte de Colesterol Altos por genero',
            datosLista: array,
        }

    } else if (padecimiento==='3' && filtro === '5') { 
//AcidoUrico con zona geografica filtro 3 = 5
        filename = 'AcidoUrico_ZonaGeográfica' + '_' + (Math.floor(Math.random() * 9999) + 10000) + '.pdf';
        
        var municipios = response.rows;
        for(const municipio of municipios){

        }
        // esta sera la data que vamos a mandar al template(plantilla) para crear el pdf
        obj = {
            nombrelaboratorio: 'Laboratorio Nacional',
            nombrereporte: 'Reporte Acido Úrrico por zona geografica',
            datosLista: array,
        }

    } else if (padecimiento==='3' && filtro === '6') { 
//AcidoUrico con edad filtro 3 = 6
        filename = 'AcidoUrico_Edad' + '_' + (Math.floor(Math.random() * 9999) + 10000) + '.pdf';
        var fecha = new Date();
        var y = fecha.getFullYear();

        var edades = [
            {
                grupo: 'Primera infancia (0-5 años)',
                minedad: y,
                maxedad: y-6,
            },
            {
                grupo: 'Infancia (6 - 11 años)',
                minedad: y-7,
                maxedad: y-11,
            },
            {
                grupo: 'Adolescencia (12 - 18 años)',
                minedad: y-12,
                maxedad: y-18,
            },
            {
                grupo: 'Adulto juventud (19 - 26 años)',
                minedad: y-19,
                maxedad: y-26,
            },
            {
                grupo: 'Adultez (27- 59 años)',
                minedad: y-27,
                maxedad: y-59,
            },
            {
                grupo: 'Persona Mayor (60 años o mas)',
                minedad: y-60,
                maxedad: y-130,
            },
            
        ]
        for(const edad of edades){
        }
        // esta sera la data que vamos a mandar al template(plantilla) para crear el pdf
        obj = {
            nombrelaboratorio: 'Laboratorio Nacional',
            nombrereporte: 'Reporte de Acido Úrico Altos por edades',
            datosLista: array,
        }

    } else if (padecimiento==='3' && filtro === '7') { 
//AcidoUrico con genero filtro 3 = 7
        filename = 'AcidoUrico_Genero' + '_' + (Math.floor(Math.random() * 9999) + 10000) + '.pdf';
        
        var fecha = new Date();
        var y = fecha.getFullYear();

        var generos = [{genero: 'Masculino'}, {genero: 'Femenino'}]

        
        for(const genero of generos){
        }
        // esta sera la data que vamos a mandar al template(plantilla) para crear el pdf
        obj = {
            nombrelaboratorio: 'Laboratorio Nacional',
            nombrereporte: 'Reporte de Acido Úrico Altos por genero',
            datosLista: array,
        }

    } else if (padecimiento==='4' && filtro === '5') { 
//Glucosa con zona geografica filtro 4 = 5
        filename = 'Glucosa_ZonaGeográfica' + '_' + (Math.floor(Math.random() * 9999) + 10000) + '.pdf';
        
        var municipios = response.rows;
        for(const municipio of municipios){

        }
        // esta sera la data que vamos a mandar al template(plantilla) para crear el pdf
        obj = {
            nombrelaboratorio: 'Laboratorio Nacional',
            nombrereporte: 'Reporte Glucosa por zona geografica',
            datosLista: array,
        }

    } else if (padecimiento==='4' && filtro === '6') { 
//Glucosa con edad filtro 4 = 6
        filename = 'Glucosa_Edad' + '_' + (Math.floor(Math.random() * 9999) + 10000) + '.pdf';
        var fecha = new Date();
        var y = fecha.getFullYear();

        var edades = [
            {
                grupo: 'Primera infancia (0-5 años)',
                minedad: y,
                maxedad: y-6,
            },
            {
                grupo: 'Infancia (6 - 11 años)',
                minedad: y-7,
                maxedad: y-11,
            },
            {
                grupo: 'Adolescencia (12 - 18 años)',
                minedad: y-12,
                maxedad: y-18,
            },
            {
                grupo: 'Adulto juventud (19 - 26 años)',
                minedad: y-19,
                maxedad: y-26,
            },
            {
                grupo: 'Adultez (27- 59 años)',
                minedad: y-27,
                maxedad: y-59,
            },
            {
                grupo: 'Persona Mayor (60 años o mas)',
                minedad: y-60,
                maxedad: y-130,
            },
            
        ]
        for(const edad of edades){
        }
        // esta sera la data que vamos a mandar al template(plantilla) para crear el pdf
        obj = {
            nombrelaboratorio: 'Laboratorio Nacional',
            nombrereporte: 'Reporte de Glucosa por edades',
            datosLista: array,
        }

    } else if (padecimiento==='4'  && filtro === '7') {
//Glucosa con genero filtro 4 = 7
        filename = 'Glucosa_Genero' + '_' + (Math.floor(Math.random() * 9999) + 10000) + '.pdf';
        
        var fecha = new Date();
        var y = fecha.getFullYear();

        var generos = [{genero: 'Masculino'}, {genero: 'Femenino'}]

        
        for(const genero of generos){
        }
        // esta sera la data que vamos a mandar al template(plantilla) para crear el pdf
        obj = {
            nombrelaboratorio: 'Laboratorio Nacional',
            nombrereporte: 'Reporte de Glucosa por genero',
            datosLista: array,
        }

    }
}

const generarReporteCantidadExamenes =  async (req, res) => {
    const { filtro, idpaciente, iddepartamento, idmunicipio, fechainicio, fechafin } = req.body;
    const html = fs.readFileSync(path.join(__dirname, '../views/template-examenes.html'), 'utf-8')
    var filename = '';
    var obj = null;
    
    if (filtro==='1' && (idpaciente !== 0 || idpaciente !== null)){
        
        var sql = 'select DISTINCT e.idarea as idarea, nombrearea from detallechequeo d ' +
        'join chequeo c on c.idchequeo = d.idchequeo '+
        'join paciente p on c.idpaciente = p.idpaciente  '+
        'join examen e on e.idexamen = d.idexamen '+
        'join area a on a.idarea = e.idarea '+
        'where p.idpaciente = $1  AND fechaRegistro BETWEEN $2 AND $3';
        const response = await sqlee.query(sql, [idpaciente, fechainicio, fechafin]);

        let arrayAreas = [];
        var areas = response.rows;
        for(const area of areas){
        
            var sql = 'select count(p.idpaciente) as cuenta, nombreexamen from detallechequeo d ' +
            'join chequeo c on c.idchequeo = d.idchequeo '+
            'join paciente p on c.idpaciente = p.idpaciente  '+
            'join examen e on e.idexamen = d.idexamen '+
            'join area a on a.idarea = e.idarea '+
            'where p.idpaciente = $1 and a.idarea = $2 AND fechaRegistro BETWEEN $3 AND $4 group by nombreexamen';
            const response = await sqlee.query(sql, [idpaciente, area.idarea, fechainicio, fechafin]);
            
            var examenes = response.rows;
            let array = [];
            examenes.forEach(examen => {
                const elemento = {
                    nombreexamen: examen.nombreexamen,
                    cuenta: examen.cuenta,
                }
                array.push(elemento);
            });

            var elemento2 = {
                nombrearea: area.nombrearea,
                examenes: array,
            }
            arrayAreas.push(elemento2);

        };
        // esta sera la data que vamos a mandar al template(plantilla) para crear el pdf

        var nombrepaciente = "";
        var sql = 'select * from paciente where idpaciente = $1';
        const response3 = await sqlee.query(sql, [idpaciente]);
        var pacientes = response3.rows;

        for(const paciente of pacientes){
            nombrepaciente = paciente.nombrepaciente + ' ' + paciente.apellido;
        }

        obj = {
            nombrelaboratorio: 'Laboratorio Nacional',
            nombrereporte: 'Reporte de cantidad de examenes de paciente',
            filtro: 'Paciente ' +nombrepaciente,
            fechainicio: fechainicio,
            fechafin: fechafin,
            datosLista: arrayAreas,
        }

        filename = 'CantidadExamenes_'+ (nombrepaciente).replace(/ /g, "") + '_' + (Math.floor(Math.random() * 9999) + 10000) + '.pdf';
        

    } else if (filtro==='2' && iddepartamento !== 0){
        //departamento

        var sql = 'select DISTINCT e.idarea as idarea, nombrearea from detallechequeo d ' +
        'join chequeo c on c.idchequeo = d.idchequeo '+
        'join paciente p on c.idpaciente = p.idpaciente  '+
        'join examen e on e.idexamen = d.idexamen '+
        'join area a on a.idarea = e.idarea '+
        'join municipio m on m.idmunicipio = p.idmunicipio ' +
        'where m.iddepartamento = $1 AND fechaRegistro BETWEEN $2 AND $3';
        const response = await sqlee.query(sql, [iddepartamento, fechainicio, fechafin]);

        let arrayAreas = [];
        var areas = response.rows;
        for(const area of areas){
        
            var sql = 'select count(m.iddepartamento) as cuenta, nombreexamen from detallechequeo d ' +
            'join chequeo c on c.idchequeo = d.idchequeo '+
            'join paciente p on c.idpaciente = p.idpaciente  '+
            'join examen e on e.idexamen = d.idexamen '+
            'join area a on a.idarea = e.idarea '+
            'join municipio m on m.idmunicipio = p.idmunicipio '+
            'where m.iddepartamento = $1 and a.idarea = $2 AND fechaRegistro BETWEEN $3 AND $4 group by nombreexamen';
            const response = await sqlee.query(sql, [iddepartamento, area.idarea, fechainicio, fechafin]);
            
            var examenes = response.rows;
            let array = [];
            examenes.forEach(examen => {
                const elemento = {
                    nombreexamen: examen.nombreexamen,
                    cuenta: examen.cuenta,
                }
                array.push(elemento);
            });

            var elemento2 = {
                nombrearea: area.nombrearea,
                examenes: array,
            }
            arrayAreas.push(elemento2);
        };
        
        // esta sera la data que vamos a mandar al template(plantilla) para crear el pdf

        var nombredepartamento = "";
        var sql = 'select * from departamento where iddepartamento = $1';
        const response3 = await sqlee.query(sql, [iddepartamento]);
        var departamentos = response3.rows;

        for(const departamento of departamentos){
            nombredepartamento = departamento.departamento;
        }

        obj = {
            nombrelaboratorio: 'Laboratorio Nacional',
            nombrereporte: 'Reporte de cantidad de examenes de departamento',
            filtro: 'Departamento de ' + nombredepartamento,
            fechainicio: fechainicio,
            fechafin: fechafin,
            datosLista: arrayAreas,
        }

        filename = 'CantidadExamenes_'+ (nombredepartamento).replace(/ /g, "") + '_' + (Math.floor(Math.random() * 9999) + 10000) + '.pdf';

    } else if (filtro==='3' && idmunicipio !== 0){
        //municipio
        var sql = 'select DISTINCT e.idarea as idarea, nombrearea from detallechequeo d ' +
        'join chequeo c on c.idchequeo = d.idchequeo '+
        'join paciente p on c.idpaciente = p.idpaciente  '+
        'join examen e on e.idexamen = d.idexamen '+
        'join area a on a.idarea = e.idarea '+
        'where p.idmunicipio = $1  AND fechaRegistro BETWEEN $2 AND $3';
        const response = await sqlee.query(sql, [idmunicipio, fechainicio, fechafin]);

        let arrayAreas = [];
        var areas = response.rows;
        for(const area of areas){
        
            var sql = 'select count(p.idmunicipio) as cuenta, nombreexamen from detallechequeo d ' +
            'join chequeo c on c.idchequeo = d.idchequeo '+
            'join paciente p on c.idpaciente = p.idpaciente  '+
            'join examen e on e.idexamen = d.idexamen '+
            'join area a on a.idarea = e.idarea '+
            'where p.idmunicipio = $1 and e.idarea = $2 AND fechaRegistro BETWEEN $3 AND $4 group by nombreexamen';
            const response = await sqlee.query(sql, [idmunicipio, area.idarea, fechainicio, fechafin]);
            
            var examenes = response.rows;
            let array = [];
            examenes.forEach(examen => {
                const elemento = {
                    nombreexamen: examen.nombreexamen,
                    cuenta: examen.cuenta,
                }
                array.push(elemento);
            });

            var elemento2 = {
                nombrearea: area.nombrearea,
                examenes: array,
            }
            arrayAreas.push(elemento2);
        };
        
        // esta sera la data que vamos a mandar al template(plantilla) para crear el pdf
        var nombremunicipio = "";
        var sql = 'select * from municipio where idmunicipio = $1';
        const response3 = await sqlee.query(sql, [idmunicipio]);
        var municipios = response3.rows;

        for(const municipio of municipios){
            nombremunicipio = municipio.municipio;
        }

        obj = {
            nombrelaboratorio: 'Laboratorio Nacional',
            nombrereporte: 'Reporte de cantidad de examenes de municipio',
            filtro: 'Municipio de '+ nombremunicipio,
            fechainicio: obtenerfecha(fechainicio),
            fechafin: obtenerfecha(fechafin),
            datosLista: arrayAreas,
        }

        filename = 'CantidadExamenes_'+ (nombremunicipio).replace(/ /g, "") + '_' + (Math.floor(Math.random() * 9999) + 10000) + '.pdf';

    }

    if ((filtro === '1' && idpaciente !== 0) || (filtro === '2' && iddepartamento !== 0) || (filtro === '3' && idmunicipio !== 0)) {
        // creamos el documento
        const document = {
            html: html,
            data: {
                datos: obj   // aqui enviamos toda la data
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

}

const generarReporteTipos=  async (req, res) => {
    const { fechaInicio, fechaFIn,idlaboratorio } = req.body;
    const html = fs.readFileSync(path.join(__dirname, '../views/template-examenportipo.html'), 'utf-8')
    var data = [];
    if(idlaboratorio==0){
        sql ="select nombreexamen, count(d.idexamen) from detallechequeo d inner join examen e on d.idexamen = e.idexamen inner join chequeo ch  on ch.idchequeo = d.idchequeo inner join laboratorio lab on lab.idlaboratorio = ch.idlaboratorio group by (nombreexamen)";
        const response = await sqlee.query(sql);
        data = response.rows;
    }else if(idlaboratorio!=0){
        sql ="select nombreexamen, count(d.idexamen) from detallechequeo d inner join examen e on d.idexamen = e.idexamen inner join chequeo ch  on ch.idchequeo = d.idchequeo inner join laboratorio lab on lab.idlaboratorio = ch.idlaboratorio where lab.idlaboratorio=$1 group by (nombreexamen)";
        const response = await sqlee.query(sql, [idlaboratorio]);
        data = response.rows;
    }
   

    // esta sera la data que vamos a mandar al template(plantilla) para crear el pdf
    const obj = {
        nombrelaboratorio: 'Este es un campo',
        examenes: data,
    }

    // creamos el documento
    const document = {
        html: html,
        data: {
           datos: obj   // aqui enviamos toda la data
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
module.exports = {
    generarReporte,
    generarReporteResultados,
    generarReporteTipeoSanguineo,
    generarReporteCantidadExamenes,
    generarReporteEpidemiologico,
    generarReporteTipos,
};
