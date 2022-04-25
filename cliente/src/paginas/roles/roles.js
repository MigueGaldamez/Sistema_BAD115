import React from 'react';
import { useState,useEffect } from 'react';
import Axios from 'axios';  
import DatatableRoles from "./datatable";
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import swal from 'sweetalert';

const Roles = () => { 
  //PARA los ERRORES
  const[errores, setErrores] = useState([]);
  //PARA CADA ATRIBUTO
  const[nombre,setNombre]=useState("");
  //ESTE PARA CADA ATRIBUTO QUE SEPUEDE EDITAR
  const[nuevoNombre,setNuevoNombre]=useState(0);
  //LA LISTA QUEMOSTRAREMOS
  const[rolLista, setRolLista] = useState([]);
  const[permisoLista, setPermisoLista] = useState([]);
  const[modalB, setModalB] = useState([]);
  const[nuevosPermisos,setNuevosPermisos]=useState([]);
  //PARA LA BUSQUEDA
  const [q, setQ] = useState('');
  //TODAS LAS COLUMNAS
  const [columns] =useState([
    'idrol',
    'nombrerol',
  ]);
  //LAS COLUMNAS POR LAS QUE SEPUEDEN FILTRAR
  const [buscarColumnas, setBuscarColumnas] = useState([
    'idrol',
    'nombrerol',
  ]);
  

  const obtenerRoles=()=>{
    Axios.get(`http://${process.env.REACT_APP_SERVER_IP}/roles`).then((response)=>{
      setRolLista(response.data);
    });
    Axios.get(`http://${process.env.REACT_APP_SERVER_IP}/opcionespermisos`).then((response)=>{
      setPermisoLista(response.data);
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
    Axios.post(`http://${process.env.REACT_APP_SERVER_IP}/roles`,{
      //TODOS LOS CAMPOS
      nombre:nombre,
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
      obtenerRoles();
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

  const eliminarRegistro=(idrol)=>{
    Axios.delete(`http://${process.env.REACT_APP_SERVER_IP}/roles/${idrol}`).then(()=>{
      obtenerRoles();  
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

  const actualizaRegistro=(idrol)=>{
    Axios.put(`http://${process.env.REACT_APP_SERVER_IP}/roles`,{nombre:nuevoNombre,idrol:idrol})
    .then(()=>{
      obtenerRoles(); 
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
 
  const actualizaPermisos=(idrol)=>{
    Axios.post(`http://${process.env.REACT_APP_SERVER_IP}/rolesPermisos`,{permisos:nuevosPermisos,idrol:idrol}).then(()=>{
      obtenerRoles(); 
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
   obtenerRoles();
  },[]);

  return (
    <div class="container my-4">
      
       {/* Modal para nuevo registro*/} 
      <div class="modal fade" id="nuevoRegistro" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Nuevo Registro</h5>
             
              
              <button type="button" class="btn-close" onClick={cerrarModal} aria-label="Close"></button>
            </div>
            <form id="formulario" onSubmit={agregarRegistro}>
            <div class="modal-body">
              
                <label class="form-label">Nombre:</label>
                <input type="text" class="form-control form-control-sm" placeholder='Ingrese un nuevo Rol' onChange={(event)=>{ setNombre(event.target.value)}}/>        
                { 
                errores.nombre &&
               <small class="text-danger">* {errores.nombre}</small>
              }
              
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
        <h2 class="m-0"><span>Gestión de Roles </span>
          <button type="button" class="btn btn-primary btn-sm ms-3" onClick={abrirModal}>
            Nuevo Registro
          </button>
          </h2>
        </div>
          <div class="row">        
           
            <div class="col-12">
              <div class="card h-100 p-3 px-4">       
                <h5>Busqueda</h5>
                
                <div class="row">
                    <div class="col col-6">
                     
                      <input class="form-control form-control-sm"
                              type='text'
                              value={q}
                              onChange={(e) => setQ(e.target.value)}
                            />
                            <small class="text-muted">Puede buscar por {columns && columns.map((column,index) => (<span key={index}>{column}, </span>))}</small>
                    </div>
                    <div class="col col-6 mt-2">
                      <label>Criterios</label>
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
          <DatatableRoles actualizaPermisos={actualizaPermisos} nuevosPermisos={nuevosPermisos} setNuevosPermisos={setNuevosPermisos} permisos={permisoLista} data={buscar(rolLista)} eliminarRegistro={eliminarRegistro} actualizarRegistro={actualizaRegistro} setNuevoNombre={setNuevoNombre}/>
          
      </div>    
    </div>
  );
};
  
export default Roles;