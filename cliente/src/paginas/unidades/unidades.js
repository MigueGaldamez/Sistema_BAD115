import React from 'react';
import { useState,useEffect } from 'react';
import Axios from 'axios';  
import DatatableRoles from "./datatable";
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import swal from 'sweetalert';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const Unidades = () => { 
  //PARA los ERRORES
  const[errores, setErrores] = useState([]);
  //PARA CADA ATRIBUTO
  const[nombre,setNombre]=useState("");
  const[simbolo,setSimbolo]=useState("");
  //ESTE PARA CADA ATRIBUTO QUE SEPUEDE EDITAR
  const[nuevoNombre,setNuevoNombre]=useState("");
  const[nuevoSimbolo,setNuevoSimbolo]=useState("");
  //LA LISTA QUEMOSTRAREMOS
  const[unidadLista, setUnidadLista] = useState([]);
  const[modalB, setModalB] = useState([]);
  const[validarLista, setValidarLista] = useState([]);
  //PARA LA BUSQUEDA
  const [q, setQ] = useState('');
  //TODAS LAS COLUMNAS
  const [columns] =useState([
    'idunidad',
    'nombreunidad',
    'simbolo',
    
  ]);
  //LAS COLUMNAS POR LAS QUE SEPUEDEN FILTRAR
  const [buscarColumnas, setBuscarColumnas] = useState([
    'idunidad',
    'nombreunidad',
    'simbolo',
  ]);
  

  //esto es para validar en el backend y mandar siempre el id usuario
  Axios.interceptors.request.use(function (config) {
    var id = cookies.get('usuario').idusuario;
    config.headers.idusuario =  id;
    return config;
});
  const obtenerRegistros=()=>{
    Axios.get(`http://${process.env.REACT_APP_SERVER_IP}/unidades`).then((response)=>{
      setUnidadLista(response.data);
    });
    var id = cookies.get('usuario').idusuario;
    Axios.get(`http://${process.env.REACT_APP_SERVER_IP}/validarpermisos/${id}`).then((response)=>{
      setValidarLista(response.data);
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
    setSimbolo('');
    //limpiamos el formulario
    document.getElementById("formulario").reset();
    //cerramos el modal
    var modal = modalB;
    modal.hide();
  }
  //AGREGAR
  const agregarRegistro=(event)=>{    
    event.preventDefault();
    Axios.post(`http://${process.env.REACT_APP_SERVER_IP}/unidades`,{
      //TODOS LOS CAMPOS
      nombre:nombre,
      simbolo:simbolo,
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
        if(error.response.data.detail){
          swal({
            title: "Error!",
            text: error.response.data.detail,
            icon: "error",
            button: "Aww yiss!",
          });
        }else if(error.response.data){
          swal({
            title: "Error!",
            text: error.response.data,
            icon: "error",
            button: "Aww yiss!",
          });
        }
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

  const eliminarRegistro=(idunidad)=>{
    Axios.delete(`http://${process.env.REACT_APP_SERVER_IP}/unidades/${idunidad}`).then(()=>{
      obtenerRegistros();
      swal({
        title: "Exito!",
        text: "Eliminado con exito",
        icon: "success",
        button: `Entendido`, 
      });
    }).catch(function (error) {
      if(error.response!=null){
        if(error.response.data.detail){
          swal({
            title: "Error!",
            text: error.response.data.detail,
            icon: "error",
            button: "Aww yiss!",
          });
        }else if(error.response.data){
          swal({
            title: "Error!",
            text: error.response.data,
            icon: "error",
            button: "Aww yiss!",
          });
        }
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

  const actualizaRegistro=(idunidad)=>{
    Axios.put(`http://${process.env.REACT_APP_SERVER_IP}/unidades`,{nombre:nuevoNombre,simbolo:nuevoSimbolo,idunidad:idunidad}).then(()=>{
      obtenerRegistros();
      
    }).catch(function (error) {
      if(error.response!=null){
        if(error.response.data.detail){
          swal({
            title: "Error!",
            text: error.response.data.detail,
            icon: "error",
            button: "Aww yiss!",
          });
        }else if(error.response.data){
          swal({
            title: "Error!",
            text: error.response.data,
            icon: "error",
            button: "Aww yiss!",
          });
        }
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
    <>{/*asi validamos cada permiso*/}
    {(!validarLista.includes(25)) && 
    <div class="col container mx-auto my-auto text-center">
      <h1 class="text-primary">Ups...</h1>
       <h4>No tiene permisos para ver estos registros</h4>
   </div>}{
   
 }
    {validarLista.includes(25) &&
    <div class="col container my-4">
      <div class="modal fade" id="nuevoRegistro" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Nuevo Registro</h5>
             
              
              <button type="button" class="btn-close" onClick={cerrarModal} aria-label="Close"></button>
            </div>
            <form id="formulario" onSubmit={agregarRegistro}>
            <div class="modal-body">
              
                <label class="form-label">Nombre Unidad:</label>
                <input type="text" class="form-control form-control-sm" placeholder='Ingrese una nueva unidad' onChange={(event)=>{ setNombre(event.target.value)}}/>        
                { 
                errores.nombre &&
                <p>
               <small class="text-danger">* {errores.nombre}</small></p>
              }

              <label class="form-label mt-3">Simbolo Unidad:</label>
                <input type="text" class="form-control form-control-sm" placeholder='Ingrese el simbolo' onChange={(event)=>{ setSimbolo(event.target.value)}}/>        
                { 
                errores.simbolo &&
                <p>
               <small class="text-danger">* {errores.simbolo}</small></p>
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
        <h2 class="m-0"><span>Gestión de Unidades</span>
        {validarLista.includes(26) &&
          <button type="button" class="btn btn-primary btn-sm ms-3" onClick={abrirModal}>
            Nuevo Registro
          </button>}
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
          <DatatableRoles validarLista={validarLista} data={buscar(unidadLista)} eliminarRegistro={eliminarRegistro} actualizarRegistro={actualizaRegistro} setNuevoNombre={setNuevoNombre} setNuevoSimbolo={setNuevoSimbolo}/>
          
      </div>    
    </div>}</>
  );
};
  
export default Unidades;