import React from 'react';
import { useState,useEffect } from 'react';
import Axios from 'axios';  
import DatatableRoles from "./datatable";
import Moment from 'moment';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import swal from 'sweetalert';
var SHA256 = require("crypto-js/sha256");

const Chequeos = () => { 
  //PARA los ERRORES
  const[errores, setErrores] = useState([]);
  //PARA CADA ATRIBUTO
  const[laboratorio,setLaboratorio]=useState(0);
  const[paciente,setPaciente]=useState("");
  //    const[usuario,setUsuario]=useState(0);
  const[fechaChequeo,setFechaChequeo]=useState(Moment().format('YYYY-MM-DD'));
  const[horaChequeo,setHoraChequeo]=useState(Moment().format('HH:mm:ss'));
  
  //ESTE PARA CADA ATRIBUTO QUE SEPUEDE EDITAR
  const[nuevaFechaChequeo,setNuevaFechaChequeo]=useState("");
  const[nuevaHoraChequeo,setNuevaHoraChequeo]=useState("");
  const[nuevoIdLaboratorio,setNuevoLaboratorio]=useState(0);

  //LA LISTA QUEMOSTRAREMOS
  const[chequeoLista, setChequeoLista] = useState([]);
  const[pacienteLista, setPacienteLista] = useState([]);
  const[usuarioLista, setUsuarioLista] = useState([]);
  const[laboratorioLista, setLaboratorioLista] = useState([]);

  const[modalB, setModalB] = useState([]);
  //PARA LA BUSQUEDA
  const [q, setQ] = useState('');
  //TODAS LAS COLUMNAS
  const [columns] =useState([
    'idchequeo',
    'paciente',
    'laboratorio',
    'usuario',
    'fechaChequeo',
    'horaChequeo'
    
  ]);
  //LAS COLUMNAS POR LAS QUE SEPUEDEN FILTRAR
  const [buscarColumnas, setBuscarColumnas] = useState([
    'idchequeo',
    'paciente',
    'laboratorio',
    'usuario',
    'fechaChequeo',
    'horaChequeo'
  ]);
  

  const obtenerRegistros=()=>{
    Axios.get(`http://${process.env.REACT_APP_SERVER_IP}/chequeos`).then((response)=>{
      setChequeoLista(response.data);
    });
    Axios.get(`http://${process.env.REACT_APP_SERVER_IP}/pacientes`).then((response)=>{
      setPacienteLista(response.data);
    });
    Axios.get(`http://${process.env.REACT_APP_SERVER_IP}/usuarioslibres`).then((response)=>{
      setUsuarioLista(response.data);
    });
    Axios.get(`http://${process.env.REACT_APP_SERVER_IP}/laboratorios`).then((response)=>{
      setLaboratorioLista(response.data);
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
    //limpiamos los campos
    //setNombre('');
    //limpiamos el formulario
    document.getElementById("formulario").reset();
    //cerramos el modal
    var modal = modalB;
    modal.hide();
  }
  //AGREGAR
  const agregarRegistro=(event)=>{    
    event.preventDefault();
    console.log("fsdfd" + fechaChequeo);
    Axios.post(`http://${process.env.REACT_APP_SERVER_IP}/chequeos`,{
      //TODOS LOS CAMPOS
      paciente:paciente,
      laboratorio:laboratorio,
      fechaChequeo:fechaChequeo,
      horaChequeo:horaChequeo,
      //usuario:"",
    }).then((response)=>{
      if(response.data.errores==null){      
        cerrarModal();
        swal({
          title: "Exito!",
          text: "Guardado con exito",
          icon: "success",
          button: `Entendido`, 
        })
      }else{        
        setErrores(response.data.errores);
      }
      //ACTUALIZAR DATOS
      obtenerRegistros();
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
  };

  const eliminarRegistro=(idchequeo)=>{
    Axios.delete(`http://${process.env.REACT_APP_SERVER_IP}/chequeos/${idchequeo}`).then((res)=>{
      obtenerRegistros();
      swal({
        title: "Exito!",
        text: "Eliminado con exito",
        icon: "success",
        button: `Entendido`, 
      })  
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
  };

  const actualizaRegistro=(idchequeo)=>{
    Axios.put(`http://${process.env.REACT_APP_SERVER_IP}/chequeos`,{idlaboratorio:nuevoIdLaboratorio, fechaChequeo:nuevaFechaChequeo, horaChequeo:nuevaHoraChequeo, idchequeo:idchequeo}).then(()=>{
      obtenerRegistros();
      swal({
        title: "Exito!",
        text: "Actualizado con exito",
        icon: "success",
        button: `Entendido`, 
      })
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
     });;
  };

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
    <div class="container my-4">
      
      <div class="modal fade" id="nuevoRegistro" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Nuevo Registro</h5>
              <button type="button" class="btn-close"  onClick={cerrarModal} aria-label="Close"></button>
            </div>
            <form id="formulario" onSubmit={agregarRegistro}>
            <div class="modal-body">

            <label for="" class="form-label mt-3">Pacientes:</label>
              <select class="form-select form-select-sm" aria-label="Default select example" onChange={(event)=>{
                setPaciente(event.target.value)}}>
                   <option selected>Seleccione un Paciente</option>
                    {pacienteLista.map((paciente) => {
                     
                    
                    return(  <option  value={paciente.idpaciente}>{paciente.nombrepaciente + ' ' + paciente.apellido}</option>)
                    })}
              </select>        
              { 
                errores.paciente &&
                <p><small class="text-danger">* {errores.paciente}</small></p>
              }

              <label for="" class="form-label mt-3">Laboratorio:</label>
              <select class="form-select form-select-sm" aria-label="Default select example" onChange={(event)=>{
                setLaboratorio(event.target.value)}}>
                   <option selected>Seleccione un Laboratorio</option>
                    {laboratorioLista.map((laboratorio) => {
                     
                    
                    return(  <option  value={laboratorio.idlaboratorio}>{laboratorio.nombrelaboratorio}</option>)
                    })}
              </select>        
              { 
                errores.laboratorio &&
                <p><small class="text-danger">* {errores.laboratorio}</small></p>
              }
                
              <label for="" class="form-label">Fecha de chequeo:</label>
              <input type="date" class="form-control form-control-sm" onChange={(event)=>{setFechaChequeo(event.target.value)}} defaultValue={Moment().format('YYYY-MM-DD')} />
              { 
                errores.fechaChequeo &&
               <p><small class="text-danger">* {errores.fechaChequeo}</small></p>
              }

              <label for="" class="form-label">Hora de chequeo:</label>
              <input type="time" class="form-control form-control-sm" onChange={(event)=>{setHoraChequeo(event.target.value)}} defaultValue={Moment().format('HH:mm:ss')} />
              { 
                errores.horaChequeo &&
               <p><small class="text-danger">* {errores.horaChequeo}</small></p>
              }
              
              
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary"  onClick={cerrarModal}>Cancelar</button>
              <button type="button" class="btn btn-primary" onClick={agregarRegistro}>Guardar</button>
            </div>
            </form>
          </div>
        </div>
      </div>

      <div class="mt-4 mb-4">
      <div class="row bordeLateral mb-3">
        <h2 class="m-0"><span>Gestión de Chequeos</span>
          <button type="button" class="btn btn-primary btn-sm ms-3" onClick={abrirModal}>
            Nuevo Registro
          </button>
          </h2>
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
          <DatatableRoles  data={buscar(chequeoLista)} usuarios={usuarioLista} laboratorios={laboratorioLista} eliminarRegistro={eliminarRegistro} actualizarRegistro={actualizaRegistro}  setNuevoLaboratorio={setNuevoLaboratorio} setNuevaFechaChequeo={setNuevaFechaChequeo} setNuevaHoraChequeo={setNuevaHoraChequeo} />
          
      </div>    
    </div>
  );
};
  
export default Chequeos;