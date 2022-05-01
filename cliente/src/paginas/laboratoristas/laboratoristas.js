import React from 'react';
import { useState,useEffect } from 'react';
import Axios from 'axios';  
import DatatableRoles from "./datatable";
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import swal from 'sweetalert';
var SHA256 = require("crypto-js/sha256");

const Laboratoristas = () => { 
  //PARA los ERRORES
  const[errores, setErrores] = useState([]);
  //PARA CADA ATRIBUTO
  const[nuevoRegistro,setNuevoRegistro]=useState(false);
  const[nombre,setNombre]=useState("");
  const[numeroJunta,setNumeroJunta]=useState("");
  const[usuario,setUsuario]=useState(0);
  const[laboratorio,setLaboratorio]=useState(0);
  const[contrasenia,setContrasenia]=useState("");
  const[confirmarC,setConfirmarC]=useState("");
  const[estado,setEstado]=useState(true);
  const[correo,setCorreo]=useState("");
  const[profesion,setProfesion]=useState(0);

  //ESTE PARA CADA ATRIBUTO QUE SEPUEDE EDITAR
  const[nuevoNumeroJunta,setNuevoNumeroJunta]=useState("");
  const[nuevaProfesion,setNuevaProfesion]=useState(0);
  const[nuevoUsuario,setNuevoUsuario]=useState(0);
  //LA LISTA QUEMOSTRAREMOS
  const[profesionLista, setProfesionLista] = useState([]);
  const[usuarioLista, setUsuarioLista] = useState([]);
  const[laboratorioLista, setLaboratorioLista] = useState([]);
  const[laboratoristaLista, setLaboratoristaLista] = useState([]);

  const[modalB, setModalB] = useState([]);
  //PARA LA BUSQUEDA
  const [q, setQ] = useState('');
  //TODAS LAS COLUMNAS
  const [columns] =useState([
    'idlaboratorista',
    'profesion',
    'usuario',
    'numerojuntavigilacia',
    
  ]);
  //LAS COLUMNAS POR LAS QUE SEPUEDEN FILTRAR
  const [buscarColumnas, setBuscarColumnas] = useState([
    'idlaboratorista',
    'profesion',
    'usuario',
    'numerojuntavigilacia',
  ]);
  

  const obtenerRegistros=()=>{
    Axios.get(`http://${process.env.REACT_APP_SERVER_IP}/laboratoristas`).then((response)=>{
      setLaboratoristaLista(response.data);
    });
    Axios.get(`http://${process.env.REACT_APP_SERVER_IP}/profesiones`).then((response)=>{
      setProfesionLista(response.data);
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
    setNombre('');
    //limpiamos el formulario
    document.getElementById("formulario").reset();
    //cerramos el modal
    var modal = modalB;
    modal.hide();
  }
  //AGREGAR
  const agregarRegistro=(event)=>{    
    event.preventDefault();
    var contraseniaEncriptada = (SHA256(contrasenia)).toString();
    var confirmacionEncriptada = (SHA256(confirmarC)).toString();
    if(nuevoRegistro==true){
      Axios.post(`http://${process.env.REACT_APP_SERVER_IP}/laboratoristas`,{
        //TODOS LOS CAMPOS
        nuevo:1,
        nombre:nombre,
        correo:correo,
        contrasenia:contraseniaEncriptada,
        estado:estado,
        laboratorio:laboratorio,
        confirmarC:confirmacionEncriptada,
        profesion:profesion,
        numeroJunta:numeroJunta,
      
      }).then((response)=>{    
        if(response.data.errores==null){      
          cerrarModal();
          swal({
            title: "Exito!",
            text: "Guardado con exito",
            icon: "success",
            button: `Entendido`, 
          });
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
    }else if(nuevoRegistro==false){
      
      Axios.post(`http://${process.env.REACT_APP_SERVER_IP}/laboratoristas`,{
        //TODOS LOS CAMPOS
        nuevo:0,
        usuario:usuario,
        profesion:profesion,
        numeroJunta:numeroJunta,
      
      }).then((response)=>{    
        if(response.data.errores==null){      
          cerrarModal();
          swal({
            title: "Exito!",
            text: "Guardado con exito",
            icon: "success",
            button: `Entendido`, 
          });
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
    }
   
  };

  const eliminarRegistro=(idlaboratorista)=>{
    Axios.delete(`http://${process.env.REACT_APP_SERVER_IP}/laboratoristas/${idlaboratorista}`).then(()=>{
      obtenerRegistros();
      swal({
        title: "Exito!",
        text: "Eliminado con exito",
        icon: "success",
        button: `Entendido`, 
      });
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

  const actualizaRegistro=(idlaboratorista)=>{
    Axios.put(`http://${process.env.REACT_APP_SERVER_IP}/laboratoristas`,{idlaboratorista:idlaboratorista,profesion:nuevaProfesion,usuario:nuevoUsuario,numerojunta:nuevoNumeroJunta}).then(()=>{
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
      <div class="modal fade" id="nuevoRegistro" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Nuevo Pefil de Laboratorista </h5>
             
              
              <button type="button" class="btn-close" onClick={cerrarModal} aria-label="Close"></button>
            </div>
            <form id="formulario" onSubmit={agregarRegistro}>
            <div class="modal-body">
              
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true" onClick={(event)=>{setNuevoRegistro(false)}}>Asociar a usuario existente</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false" onClick={(event)=>{setNuevoRegistro(true)}}>Crear Nuevo usuario</button>
              </li>
              
            </ul>
            <div class="tab-content container" id="myTabContent">
              <div class="tab-pane fade show active row" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div class="col col-6 mx-auto">
                <label for="" class="form-label mt-3">Seleccionar Usuario:</label>
                  <select class="form-select form-select-sm" aria-label="Default select example" onChange={(event)=>{
                    setUsuario(event.target.value)}}>
                      <option selected>Seleccione un Usuario</option>
                        {usuarioLista.map((usuario) => {
                        
                        
                        return(  <option  value={usuario.idusuario}>{usuario.nombreusuario}</option>)
                        })}
                      </select>        
                    { 
                    errores.usuario &&
                  <small class="text-danger">* {errores.usuario}</small>
                  }
                </div>
              </div>
              <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                  {/*comeinza*/}
                  <div class=" row mt-3">
                    <div class="col col-6">
                      <label class="form-label">Usuario:</label>
                      <input type="text" class="form-control form-control-sm" placeholder='Ingrese su nombre de usuario' onChange={(event)=>{ setNombre(event.target.value)}}/>        
                      { 
                        errores.nombre &&
                      <small class="text-danger">* {errores.nombre}</small>
                      }
                  </div>
                  <div class="col col-6">
                      <label for="" class="form-label">Laboratorio:</label>
                      <select class="form-select form-select-sm" aria-label="Default select example" onChange={(event)=>{
                        setLaboratorio(event.target.value)}}>
                          <option selected>Seleccione un laboratorio:</option>
                            {laboratorioLista.map((laboratorio) => {
                            
                            
                            return(  <option  value={laboratorio.idlaboratorio}>{laboratorio.nombrelaboratorio}</option>)
                            })}
                          </select>        
                        { 
                        errores.laboratorio &&
                      <small class="text-danger">* {errores.laboratorio}</small>
                      }
                </div>
                <div class="col col-6">
                    <label class="form-label mt-3">Contrasenia:</label>
                      <input type="password" class="form-control form-control-sm" placeholder='Ingrese su contraseña' onChange={(event)=>{ setContrasenia(event.target.value)}}/>        
                      { 
                      errores.contrasenia &&
                    <small class="text-danger">* {errores.contrasenia}</small>
                    }
                </div>
                <div class="col col-6">
                  <label class="form-label mt-3">Confirmar contraseña:</label>
                    <input type="password" class="form-control form-control-sm" placeholder='Confirme su contraseña' onChange={(event)=>{ setConfirmarC(event.target.value)}}/>        
                    { 
                    errores.confirmarC &&
                  <small class="text-danger">* {errores.confirmarC}</small>
                  }
                </div>
                <div class="col col-6">
                  
                <label class="form-label mt-3">Correo:</label>
                  <input type="email" class="form-control form-control-sm" placeholder='Ingrese su correo' onChange={(event)=>{ setCorreo(event.target.value)}}/>        
                  { 
                  errores.correo &&
                <small class="text-danger">* {errores.correo}</small>
                }
                </div>
                <div class="col col-6">
              
                <div class="form-check form-switch mt-5"><input type="checkbox"  role="switch" class="form-check-input" onChange={(event)=>{
                  setEstado(event.target.value)
                  }} defaultChecked="true" />
                  <label class="form-check-label" for="flexCheckDefault">
                    Activo
                  </label>
                </div>        
                  { 
                  errores.estado &&
                <small class="text-danger">* {errores.estado}</small>
                }
                </div>
                </div>
                  {/**termina */}
              </div>
            </div>

                  <hr></hr>
                  <h5>Datos de Laborista:</h5>
                <div class="row mt-2 px-3">
                  <div class="col col-6">
                        <label for="" class="form-label">Profesion:</label>
                        <select class="form-select form-select-sm" aria-label="Default select example" onChange={(event)=>{
                          setProfesion(event.target.value)}}>
                            <option selected>Seleccione una profesion:</option>
                              {profesionLista.map((profesion) => {
                              
                              
                              return(  <option  value={profesion.idprofesion}>{profesion.nombreprofesion}</option>)
                              })}
                            </select>        
                          { 
                          errores.profesion &&
                        <small class="text-danger">* {errores.profesion}</small>
                        }
                  </div>
                  <div class="col col-6">
                      <label class="form-label">Número de junta:</label>
                    <input type="text" class="form-control form-control-sm" placeholder='Ingrese el número de junta' onChange={(event)=>{ setNumeroJunta(event.target.value)}}/>        
                    { 
                    errores.numeroJunta &&
                    <p>
                  <small class="text-danger">* {errores.numeroJunta}</small></p>
                  }
                  </div>
                </div>
              
              
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" onClick={cerrarModal} >Cancelar</button>
              <button type="button" class="btn btn-primary" onClick={agregarRegistro}>Guardar</button>
              
            </div>
            </form>
          </div>
        </div>
      </div>
      <div class="mt-4 mb-4">
      <div class="row bordeLateral mb-3">
        <h2 class="m-0"><span>Gestión de Laboratoristas</span>
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
          <DatatableRoles  data={buscar(laboratoristaLista)} eliminarRegistro={eliminarRegistro} actualizarRegistro={actualizaRegistro} profesiones={profesionLista} usuarios={usuarioLista} setNuevoNumeroJunta={setNuevoNumeroJunta} setNuevoUsuario={setNuevoUsuario} setNuevaProfesion={setNuevaProfesion}/>
          
      </div>    
    </div>
  );
};
  
export default Laboratoristas;