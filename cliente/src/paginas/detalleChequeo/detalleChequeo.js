import React from 'react';
import { useState,useEffect } from 'react';
import Axios from 'axios';  
import DatatableRoles from "./datatable";
import Moment from 'moment';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import swal from 'sweetalert';
var SHA256 = require("crypto-js/sha256");

const DetalleChequeo = () => { 
  //PARA los ERRORES
  const[errores, setErrores] = useState([]);
  //PARA CADA ATRIBUTO
  /*const[nombreexamen,setNombreExamen]=useState("");
  const[area,setArea]=useState(0);*/
  
  //ESTE PARA CADA ATRIBUTO QUE SEPUEDE EDITAR
  /*const[nuevoNombreExamen,setNuevoNombreExamen]=useState("");*/
  const[nuevaArea,setNuevaArea]=useState(0);
  const[nuevoNombre,setNuevoNombre]=useState("");
  const[nuevoApellido,setNuevoApellido]=useState("");
  const[nuevaFechaNacimiento,setNuevaFechaNacimiento]=useState("");

  //LA LISTA QUEMOSTRAREMOS
  const[pacientesLista, setPacientesLista] = useState([]);
  const[ordenesLista, setOrdenesLista] = useState([]);
  const[resultadosLista, setResultadosLista] = useState([]);
  const[parametroLista, setParametrosLista] = useState([]);
  const[opcionesLista, setOpcionesLista] = useState([]);
  const[intervalosLista, setIntervalosLista] = useState([]);

  const columns = pacientesLista[0] && Object.keys(pacientesLista[0]);

  const[modalB, setModalB] = useState([]);
  const[modalRegistro, setModalRegistro] = useState([]);
  const[modalVerResultado, setModalVerResultado] = useState([]);
  //PARA LA BUSQUEDA
  /*
  const [q, setQ] = useState('');
  //TODAS LAS COLUMNAS
  const [columns] =useState([
    'idexamen',
    'nombreexamen',
    'area',
    
  ]);
  //LAS COLUMNAS POR LAS QUE SEPUEDEN FILTRAR
  const [buscarColumnas, setBuscarColumnas] = useState([
    'idexamen',
    'nombreexamen',
    'area',
  ]);
  */

  const obtenerRegistros=()=>{
    Axios.get(`http://${process.env.REACT_APP_SERVER_IP}/pacientesPacienteExamenes`).then((response)=>{
      setPacientesLista(response.data);
    });

    Axios.get(`http://${process.env.REACT_APP_SERVER_IP}/opcionesResultados`).then((response)=>{
      setOpcionesLista(response.data);
    });

    Axios.get(`http://${process.env.REACT_APP_SERVER_IP}/intervalosResultados`).then((response)=>{
      setIntervalosLista(response.data);
    });
    
  };

  const obtenerTabla=(id)=>{
    Axios.get(`http://${process.env.REACT_APP_SERVER_IP}/ordenes/${id}`).then((response)=>{
      setOrdenesLista(response.data);
    });
  };

  
  const obtenerParametros=(id)=>{
    Axios.get(`http://${process.env.REACT_APP_SERVER_IP}/parametrosResultados/${id}`).then((response)=>{
      setParametrosLista(response.data);
    });
  };

  const obtenerResultados=(id)=>{
    Axios.get(`http://${process.env.REACT_APP_SERVER_IP}/resultados/${id}`).then((response)=>{
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

  const abrirModalRegistro=()=>{
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
  }

  const abrirModalVerResultados=()=>{
    document.getElementById("errores").innerHTML="";
    var modal = new Modal(document.getElementById('verResultados'));
    setModalVerResultado(modal);
    modal.show();
    
  }

  const guardar=(iddetalle, idchequeo)=>{
    var aux = "";
    var cont = 0;
    var registros = [];
    var data = {}
    var variables = {};

    parametroLista.map((element) => {
      if (element.tipo == 1) {
        variables = {
          idopcion: document.getElementById(element.parametro).value,
          valor: 0,
        }
      } else if (element.tipo == 2) {
        variables = {
          idopcion: 0,
          valor: document.getElementById(element.parametro).value,
        }
      }
      
      Axios.post(`http://${process.env.REACT_APP_SERVER_IP}/validarResultados`,{
        tipo: element.tipo,
        idparametro:element.idparametro,
        iddetalle:iddetalle,
        idopcion: variables.idopcion,
        valor: variables.valor,
        positivo:true,
        comentario:"",
        presencia:1,
      }).then((response)=>{
        if(response.data.errores==null){
          cont++;
          data = {
            tipo: element.tipo,
            idparametro:element.idparametro,
            iddetalle:iddetalle,
            valor: document.getElementById(element.parametro).value,
            positivo:true,
            comentario: document.getElementById('comentario_'+element.parametro).value,
            presencia:1,
          };
          registros.push(data);
          if (cont==parametroLista.length){

            registros.forEach( function (element) {
              Axios.post(`http://${process.env.REACT_APP_SERVER_IP}/resultados`,{
                tipo: element.tipo,
                idparametro: element.idparametro,
                iddetalle: element.iddetalle,
                idopcion: element.idopcion,
                valor: element.valor,
                positivo: element.positivo,
                comentario: element.comentario,
                presencia: element.presencia,
                fecharegistro:Moment().format('YYYY-MM-DD'),
                horaregistro:Moment().format('HH:mm'),
              })
            });

            obtenerTabla(idchequeo);
            cerrarModal();
            swal({
              title: "Exito!",
              text: "Guardado con exito",
              icon: "success",
              button: `Entendido`, 
            })
            
          }
        }else{
          aux += "<small class='text-danger'>* " + response.data.errores.errorParametros + "</small><br/>"
          document.getElementById("errores").innerHTML=aux;
        }
        //ACTUALIZAR DATOS
        //obtenerRegistros();
      }).catch(function (error) {
        if(error.response!=null){
          swal({
            title: "Error!",
            text: error.response.data.detail,
            icon: "error",
            button: "Aww yiss!",
          });
        }if(error.response==null){
          swal({
            title: "Error!",
            text: "Error de conexion al servidor",
            icon: "error",
            button: "Aww yiss!",
          });
        }
      });
    });
    
  }

  const modificar=(iddetalle, idchequeo)=>{
    
    var aux = "";
    var cont = 0;
    var registros = [];
    var data = {}
    var variables = {};

    parametroLista.map((element) => {
      if (element.tipo == 1) {
        variables = {
          idopcion: document.getElementById('mod_'+element.parametro).value,
          valor: 0,
        }
      } else if (element.tipo == 2) {
        variables = {
          idopcion: 0,
          valor: document.getElementById('mod_'+element.parametro).value,
        }
      }
      Axios.post(`http://${process.env.REACT_APP_SERVER_IP}/validarResultados`,{
        tipo: element.tipo,
        idparametro:element.idparametro,
        iddetalle:iddetalle,
        idopcion: variables.idopcion,
        valor: variables.valor,
        positivo:true,
        comentario:"",
        presencia:1,
      }).then((response)=>{
        if(response.data.errores==null){
          cont++;
          data = {
            tipo: element.tipo,
            idparametro:element.idparametro,
            iddetalle:iddetalle,
            valor: document.getElementById('mod_'+element.parametro).value,
            positivo:true,
            comentario:document.getElementById('mod_comentario_'+element.parametro).value,
            presencia:1,
          };
          registros.push(data);
          if (cont==parametroLista.length){

            registros.forEach( function (element) {
              Axios.put(`http://${process.env.REACT_APP_SERVER_IP}/resultados`,{
                tipo: element.tipo,
                idparametro: element.idparametro,
                iddetalle: element.iddetalle,
                idopcion: element.idopcion,
                valor: element.valor,
                positivo: element.positivo,
                comentario: element.comentario,
                presencia: element.presencia,
                fecharegistro:Moment().format('YYYY-MM-DD'),
                horaregistro:Moment().format('HH:mm'),
              })
            });

            obtenerTabla(idchequeo);
            cerrarModalResultados();
            swal({
              title: "Exito!",
              text: "Guardado con exito",
              icon: "success",
              button: `Entendido`, 
            })
            
          }
        }else{
          aux += "<small class='text-danger'>* " + response.data.errores.errorParametros + "</small><br/>"
          document.getElementById("mod_errores").innerHTML=aux;
        }
        //ACTUALIZAR DATOS
        //obtenerRegistros();
      }).catch(function (error) {
        if(error.response!=null){
          swal({
            title: "Error!",
            text: error.response.data.detail,
            icon: "error",
            button: "Aww yiss!",
          });
        }if(error.response==null){
          swal({
            title: "Error!",
            text: "Error de conexion al servidor",
            icon: "error",
            button: "Aww yiss!",
          });
        }
      });
    });
    
  }

  const eliminar=(iddetalle, idchequeo)=>{
    swal({
      title: "Eliminar resultados de examen",
      text: "¿Esta seguro que desea eliminar este examen?",
      icon: "warning",
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        Axios.delete(`http://${process.env.REACT_APP_SERVER_IP}/resultados/${iddetalle}`).then(()=>{
          swal({
            title: "Exito!",
            text: "Eliminado con exito",
            icon: "success",
            button: `Entendido`, 
          });
          obtenerTabla(idchequeo);
          cerrarModalResultados();
          //ACTUALIZAR DATOS
          //obtenerRegistros();
        }).catch(function (error) {
          if(error.response!=null){
            swal({
              title: "Error!",
              text: error.response.data.detail,
              icon: "error",
              button: "Aww yiss!",
            });
          }if(error.response==null){
            swal({
              title: "Error!",
              text: "Error de conexion al servidor",
              icon: "error",
              button: "Aww yiss!",
            });
          }
        });
        
      }
    });

  }

  const generarReporteResultados=(valores, resultados, parametros, intervalos, opciones) =>{
    Axios.post(`http://${process.env.REACT_APP_SERVER_IP}/generarpdfresultados`,{
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
      link.href = `http://${process.env.REACT_APP_SERVER_IP}/docs/${filename}`;
      link.target = "_blank";
      link.click();
      //document.getElementById('my_iframe').src = url;
    }).catch(function (error) {
      console.log(error);
    });
  }

  /*function buscar(rows) {
    return rows.filter((row) =>
      buscarColumnas.some(
        (column) =>
          row[column]
            .toString()
            .toLowerCase()
            .indexOf(q.toLowerCase()) > -1,
      ),
    );
  }*/


  //LEER LOS DATOS AL CARGAR
  useEffect(()=>{
   obtenerRegistros();
  },[]);

  return (
    <div class="container my-4">
      
      
      <div class="mt-4 mb-4">
      <div class="row bordeLateral mb-3">
        <h2 class="m-0"><span>Resultados de Examenes</span></h2>
        </div>
          <div class="row">        
           
            <div class="col-12">
              <div class="card h-100 p-3 px-4">       
               
                <div class="row">
                    <div class="col col-4">
                      <h5>Pacientes</h5>
                      <div class="list-group">
                      {pacientesLista.map((row) =>{  
                        const id = row['idcheq'];  
                      return(
                        <button class="list-group-item d-flex list-group-item-action justify-content-between align-items-start"
                        onClick={()=>{obtenerTabla(id)}}>

                          {columns.map((column) => {
                          if(column=='nombrepaciente')
                          return(
                              <div class="ms-2 me-auto">
                                <div class="fw-bold">{row['nombrepaciente']} {row['apellido']}</div>
                                <p class="text-start mb-0">{Moment().diff(row['fechanacimiento'], 'years')} años</p>
                              </div>
                          )

                          if(column=='cuenta')
                          return (
                            <span class="badge bg-primary rounded-pill">{row[column]}</span>
                          )
                          })}
                            
                        </button>
                      )})}
                      </div>
                    </div>
                    <div class="col col-8">
                      <h5 class="">Examenes</h5>
                      <DatatableRoles  
                      data={ordenesLista} 
                      resultadosLista={resultadosLista} 
                      abrirModalRegistro={abrirModalRegistro}
                      abrirModalVerResultados={abrirModalVerResultados}
                      setNuevoNombre={setNuevoNombre} 
                      setNuevoApellido={setNuevoApellido} 
                      setNuevaFechaNacimiento={setNuevaFechaNacimiento} 
                      setNuevaArea={setNuevaArea}
                      obtenerParametros={obtenerParametros}
                      obtenerResultados={obtenerResultados}
                      parametroLista={parametroLista}
                      intervalosLista={intervalosLista}
                      opcionesLista={opcionesLista}
                      guardar={guardar}
                      modificar={modificar}
                      eliminar={eliminar}
                      generarReporteResultados={generarReporteResultados}
                      />
                    </div>
                </div>
              
              </div>
            </div>
          </div>
          
          
      </div>    
    </div>
  );
};
  
export default DetalleChequeo;