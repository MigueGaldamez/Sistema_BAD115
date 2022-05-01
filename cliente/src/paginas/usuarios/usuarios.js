import React from 'react';
import { useState,useEffect } from 'react';
import Axios from 'axios';  
import DatatableRoles from "./datatable";
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import swal from 'sweetalert';
import Cookies from 'universal-cookie';
var SHA256 = require("crypto-js/sha256");
const cookies = new Cookies();

const Usuarios = () => { 
    //PARA los ERRORES
  const[errores, setErrores] = useState([]);
  //PARA CADA ATRIBUTO
  const[nombre,setNombre]=useState("");
  const[laboratorio,setLaboratorio]=useState(0);
  const[contrasenia,setContrasenia]=useState("");
  const[confirmarC,setConfirmarC]=useState("");
  const[estado,setEstado]=useState(true);
  const[correo,setCorreo]=useState("");
  //ESTE PARA CADA ATRIBUTO QUE SEPUEDE EDITAR
  const[nuevoNombre,setNuevoNombre]=useState(0);
  const[nuevoLaboratorio,setNuevoLaboratorio]=useState(0);
  const[nuevaContrasenia,setNuevaContrasenia]=useState("");
  const[nuevoEstado,setNuevoEstado]=useState(null);
  const[nuevoCorreo,setNuevoCorreo]=useState("");
  const[nuevoConfirmarC,setNuevoConfirmarC]=useState("");

  const[nuevosRoles,setNuevosRoles]=useState([]);
  const[rolLista, setRolLista] = useState([]);
  //LA LISTA QUEMOSTRAREMOS
  const[usuarioLista, setUsuarioLista] = useState([]);
  const[laboratorioLista, setLaboratorioLista] = useState([]);
  const[modalB, setModalB] = useState([]);
  //PARA LA BUSQUEDA
  const [q, setQ] = useState('');
  //TODAS LAS COLUMNAS
  const [columns] = useState([
    'laboratorio',
    'estado',
    'correousuario',
    'nombreusuario'
  ]);
  //LAS COLUMNAS POR LAS QUE SEPUEDEN FILTRAR
  const [buscarColumnas, setBuscarColumnas] = useState([
    'laboratorio',
    'estado',
    'correousuario',
    'nombreusuario'
  ]);

  const obtenerRegistros=()=>{
    const token = cookies.get("usuario");
    console.log("Sip: "+token);
    const config = {
        headers: { Authorization:token }
    };
    Axios.get(`http://${process.env.REACT_APP_SERVER_IP}/usuarios`,config).then((response)=>{
      setUsuarioLista(response.data);  });
    Axios.get(`http://${process.env.REACT_APP_SERVER_IP}/laboratorios`).then((response)=>{
      setLaboratorioLista(response.data);  });
      Axios.get(`http://${process.env.REACT_APP_SERVER_IP}/roles`).then((response)=>{
        setRolLista(response.data);
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
    setLaboratorio(0);
    setEstado(true);
    setContrasenia("");
    setCorreo("");
    setConfirmarC("");
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
    Axios.post(`http://${process.env.REACT_APP_SERVER_IP}/usuarios`,{
      //TODOS LOS CAMPOS
      nombre:nombre,
      correo:correo,
      contrasenia:contraseniaEncriptada,
      estado:estado,
      laboratorio:laboratorio,
      confirmarC:confirmacionEncriptada,
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

  const eliminarRegistro=(idusuario)=>{
    Axios.delete(`http://${process.env.REACT_APP_SERVER_IP}/usuarios/${idusuario}`).then(()=>{
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

  const actualizaRegistro=(idusuario)=>{
    Axios.put(`http://${process.env.REACT_APP_SERVER_IP}/usuarios`,{nombre:nuevoNombre,idusuario:idusuario,laboratorio:nuevoLaboratorio,correo:nuevoCorreo,estado:nuevoEstado}).then(()=>{
      obtenerRegistros();
      swal({
        title: "Exito!",
        text: "Actualizado con exito",
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
  
  const actualizaRoles=(idusuario)=>{
    Axios.post(`http://${process.env.REACT_APP_SERVER_IP}/usuariosroles`,{roles:nuevosRoles,idusuario:idusuario}).then(()=>{
      obtenerRegistros(); 
      swal({
        title: "Exito!",
        text: "Guardado con exito",
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
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Nuevo Registro</h5>
              <button type="button" class="btn-close"  onClick={cerrarModal} aria-label="Close"></button>
            </div>
            <form id="formulario" onSubmit={agregarRegistro}>
            <div class="modal-body row mx-2">
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
        <h2 class="m-0"><span>Gestión de Usuarios</span>
        
          <button type="button" class="btn btn-primary btn-sm ms-3"  onClick={abrirModal}>
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
                            <small class="text-muted">Puede buscar por {columns && columns.map((column) => (<span>{column}, </span>))}</small>
                    </div>
                    <div class="col col-6">
                      <label><b>Criterios:</b></label>
                        <br/>
                      {columns &&
                              columns.map((column) => (
                                <div class="form-check form-check-inline">
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
          <DatatableRoles nuevosRoles={nuevosRoles} setNuevosRoles={setNuevosRoles} actualizaRoles={actualizaRoles} roles={rolLista} data={buscar(usuarioLista)} laboratorios={laboratorioLista} eliminarRegistro={eliminarRegistro} actualizarRegistro={actualizaRegistro} setNuevoNombre={setNuevoNombre} setNuevaContrasenia={setNuevaContrasenia} setNuevoCorreo={setNuevoCorreo} setNuevoEstado={setNuevoEstado} setNuevoLaboratorio={setNuevoLaboratorio}/>
  




      </div>    
    </div> 
  );
};
  
export default Usuarios;