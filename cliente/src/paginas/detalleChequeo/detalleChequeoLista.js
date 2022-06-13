import React from 'react';
import { useState,useEffect } from 'react';
import Axios from 'axios';  
import DatatableRoles from "./datatableLista";
import Moment from 'moment';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import swal from 'sweetalert';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
var SHA256 = require("crypto-js/sha256");


const DetalleChequeo = () => { 
  //PARA los ERRORES
  const[errores, setErrores] = useState([]);
  //PARA CADA ATRIBUTO
  /*const[nombreexamen,setNombreExamen]=useState("");
  const[area,setArea]=useState(0);*/
  
  //ESTE PARA CADA ATRIBUTO QUE SEPUEDE EDITAR
  /*const[nuevoNombreExamen,setNuevoNombreExamen]=useState("");*/

  //LA LISTA QUEMOSTRAREMOS
  const[pacientesLista, setPacientesLista] = useState([]);
  const[ordenesLista, setOrdenesLista] = useState([]);
  const[resultadosLista, setResultadosLista] = useState([]);
  const[parametroLista, setParametrosLista] = useState([]);
  const[opcionesLista, setOpcionesLista] = useState([]);
  const[intervalosLista, setIntervalosLista] = useState([]);
  const[intervalosRefLista, setIntervalosRefLista] = useState([]);

  const[modalB, setModalB] = useState([]);
  const[modalRegistro, setModalRegistro] = useState([]);
  const[modalVerResultado, setModalVerResultado] = useState([]);
  //PARA LA BUSQUEDA
  
  const [q, setQ] = useState('');
  //TODAS LAS COLUMNAS
  const [columns] =useState([
    'nombreexamen',
    'nombrearea',
    'nombrepaciente',
    'nombrepaciente',
    'nombreusuario',
  ]);
  //LAS COLUMNAS POR LAS QUE SEPUEDEN FILTRAR
  const [buscarColumnas, setBuscarColumnas] = useState([
    'nombreexamen',
    'nombrearea',
    'nombrepaciente',
    'nombrepaciente',
    'nombreusuario',
  ]);

  Axios.interceptors.request.use(function (config) {
    var id = cookies.get('usuario').idusuario;
    config.headers.idusuario =  id;
    return config;
  });
  

  const obtenerRegistros=()=>{
    Axios.get(`${process.env.REACT_APP_SERVER_IP}/ordenesLista`).then((response)=>{
      setOrdenesLista(response.data);
    });

    Axios.get(`${process.env.REACT_APP_SERVER_IP}/pacientesPacienteExamenes`).then((response)=>{
      setPacientesLista(response.data);
    });

    Axios.get(`${process.env.REACT_APP_SERVER_IP}/opcionesResultados`).then((response)=>{
      setOpcionesLista(response.data);
    });

    Axios.get(`${process.env.REACT_APP_SERVER_IP}/intervalosResultados`).then((response)=>{
      setIntervalosLista(response)
    });
    
    Axios.get(`${process.env.REACT_APP_SERVER_IP}/intervalosRefResultados`).then((response)=>{
      setIntervalosRefLista(response.data);
    });
  };

  
  const obtenerParametros=(id)=>{
    Axios.get(`${process.env.REACT_APP_SERVER_IP}/parametrosResultados/${id}`).then((response)=>{
      setParametrosLista(response.data);
    });
  };

  const obtenerResultados=(id)=>{
    Axios.get(`${process.env.REACT_APP_SERVER_IP}/resultados/${id}`).then((response)=>{
      setResultadosLista(response.data);
    });
  };
 
  const abrirModal=()=>{
    var modal = new Modal(document.getElementById('nuevoRegistro'));
    setModalB(modal);
    modal.show();
  }
  const cerrarModal=()=>{
    //Limpiamos los errores
    setErrores([]);
    document.getElementById("errores").innerHTML="";
    //limpiamos los campos
    //setNombre('');
    //limpiamos el formulario
    document.getElementById("formulario").reset();
    //cerramos el modal
    var modal = modalRegistro;
    modal.hide();
  }

  /*const abrirModalRegistro=()=>{
    document.getElementById("errores").innerHTML="";
    var modal = new Modal(document.getElementById('registrarResultados'));
    setModalRegistro(modal);
    modal.show();
    
  }

  const cerrarModalResultados=()=>{
    //Limpiamos los errores
    setErrores([]);
    document.getElementById("mod_errores").innerHTML="";
    //limpiamos los campos
    //setNombre('');
    //limpiamos el formulario
    document.getElementById("mod_formulario").reset();
    //cerramos el modal
    var modal = modalVerResultado;
    modal.hide();
  }*/

  const abrirModalVerResultados=()=>{
    document.getElementById("errores").innerHTML="";
    var modal = new Modal(document.getElementById('verResultados'));
    setModalVerResultado(modal);
    modal.show();
    
  }

  const generarReporteResultados=(valores, resultados, parametros, intervalos, opciones) =>{
    Axios.post(`${process.env.REACT_APP_SERVER_IP}/generarpdfresultados`,{
      valores:valores,
      resultados:resultados,
      parametros:parametros,
      intervalos:intervalos,
      opciones:opciones
    })
    .then((response)=>{
      //console.log(response);
      var filename = response.data.body.path;
      console.log(response.data.body.path);
      var link = document.createElement("a");
      link.download =true;
      link.href = `${process.env.REACT_APP_SERVER_IP}/docs/${filename}`;
      link.target = "_blank";
      link.click();
      //document.getElementById('my_iframe').src = url;
    }).catch(function (error) {
      console.log(error);
    });
  }

  function buscar(rows) {
    return rows.filter((row) =>
      buscarColumnas.some(
        (column) =>
          row[column]
            .toString()
            .toLowerCase()
            .indexOf(q.toLowerCase()) > -1,
      ),
    );
  }


  //LEER LOS DATOS AL CARGAR
  useEffect(()=>{
   obtenerRegistros();
  },[]);

  return (
    <div class="col container my-4">
      
      
      <div class="mt-4 mb-4">
      <div class="row bordeLateral mb-3">
        <h2 class="m-0"><span>Resultados de Examenes</span></h2>
        </div>
          <div class="row">        
           
            <div class="col-12">
              <div class="card h-100 p-3 px-4">       
               
              <div class="row">
                    <div class="col col-6">
                    <h5>Busqueda</h5>
                      <input class="form-control form-control-sm"
                              type='text'
                              value={q}
                              onChange={(e) => setQ(e.target.value)}
                            />
                            <small class="text-muted">Puede buscar por {columns && columns.map((column,index) => (<span key={index}>{column}, </span>))}</small>
                    </div>
                    <div class="col col-6">
                      <label><b>Criterios:</b></label>
                        <br/>
                      {columns &&
                              columns.map((column,index) => (
                                <div key={index} class="form-check form-check-inline">
                                <label>
                                  
                                  {column}
                                </label>
                                <input
                                    type='checkbox'
                                    class="form-check-input"
                                    checked={buscarColumnas.includes(column)}
                                    onChange={(e) => {
                                      const checked = buscarColumnas.includes(column);
                                      setBuscarColumnas((prev) =>
                                        checked
                                          ? prev.filter((sc) => sc !== column)
                                          : [...prev, column],
                                      );
                                    }}
                                  />
                                  </div>
                              ))}
                    </div>
                </div>
              
              </div>
            </div>
          </div>
          
          <DatatableRoles  
                      data={buscar(ordenesLista)} 
                      resultadosLista={resultadosLista} 
                      abrirModalVerResultados={abrirModalVerResultados}
                      obtenerParametros={obtenerParametros}
                      obtenerResultados={obtenerResultados}
                      parametroLista={parametroLista}
                      intervalosLista={intervalosLista}
                      intervalosRefLista={intervalosRefLista}
                      opcionesLista={opcionesLista}
                      generarReporteResultados={generarReporteResultados}
                      />
      </div>    
    </div>
  );
};
  
export default DetalleChequeo;