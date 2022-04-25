import React from 'react';
import { useState,useEffect } from 'react';
import Axios from 'axios';  
import DatatableRoles from "./datatable";
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import swal from 'sweetalert';

const Poblaciones = () => { 
  //PARA los ERRORES
  const[errores, setErrores] = useState([]);
  //PARA CADA ATRIBUTO
  const[nombre,setNombre]=useState("");
  const[edadMinima,setEdadMinima]=useState(1);
  const[edadMaxima,setEdadMaxima]=useState(2);
  //ESTE PARA CADA ATRIBUTO QUE SEPUEDE EDITAR
  const[nuevoNombre,setNuevoNombre]=useState("");
  const[nuevoEdadMinima,setNuevoEdadMinima]=useState(0);
  const[nuevoEdadMaxima,setNuevoEdadMaxima]=useState(0);
  //LA LISTA QUEMOSTRAREMOS
  const[poblacionLista, setPoblacionLista] = useState([]);
  const[modalB, setModalB] = useState([]);
  //PARA LA BUSQUEDA
  const [q, setQ] = useState('');
  //TODAS LAS COLUMNAS
  const [columns] =useState([
    'idpoblacion',
    'edadminimo',
    'edadmaximo',
    'poblacion'
  ]);
  //LAS COLUMNAS POR LAS QUE SEPUEDEN FILTRAR
  const [buscarColumnas, setBuscarColumnas] = useState([
    'idpoblacion',
    'edadminimo',
    'edadmaximo',
    'poblacion'
  ]);
  

  const obtenerRegistros=()=>{
    Axios.get(`http://${process.env.REACT_APP_SERVER_IP}/poblaciones`).then((response)=>{
      setPoblacionLista(response.data);
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
    setEdadMaxima(0);
    setEdadMinima(0);
    //limpiamos el formulario
    document.getElementById("formulario").reset();
    //cerramos el modal
    var modal = modalB;
    modal.hide();
  }
  //AGREGAR
  const agregarRegistro=(event)=>{    
    event.preventDefault();
    Axios.post(`http://${process.env.REACT_APP_SERVER_IP}/poblaciones`,{
      //TODOS LOS CAMPOS
      nombre:nombre,
      edadmaximo:edadMaxima,
      edadminimo:edadMinima,
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
  };

  const eliminarRegistro=(idpoblacion)=>{
    Axios.delete(`http://${process.env.REACT_APP_SERVER_IP}/poblaciones/${idpoblacion}`).then(()=>{
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

  const actualizaRegistro=(idpoblacion)=>{
    Axios.put(`http://${process.env.REACT_APP_SERVER_IP}/poblaciones`,{nombre:nuevoNombre,edadmaximo:nuevoEdadMaxima,edadminimo:nuevoEdadMinima,idpoblacion:idpoblacion}).then(()=>{
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
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Nuevo Registro</h5>
             
              
              <button type="button" class="btn-close" onClick={cerrarModal} aria-label="Close"></button>
            </div>
            <form id="formulario" onSubmit={agregarRegistro}>
            <div class="modal-body">
              
                <label class="form-label">Nombre:</label>
                <input type="text" class="form-control form-control-sm" placeholder='Ingrese una nueva poblacion' onChange={(event)=>{ setNombre(event.target.value)}}/>        
                { 
                errores.nombre &&
                <p>
               <small class="text-danger">* {errores.nombre}</small></p>
              }
               <label class="form-label mt-1">Edad Minima:</label>
                <input type="number" defaultValue={1} min="1" max="99" class="form-control form-control-sm" placeholder='' onChange={(event)=>{ setEdadMinima(event.target.value)}}/>        
                { 
                errores.edadminimo &&
                <p><small class="text-danger">* {errores.edadminimo}</small></p>
              }
              <label class="form-label mt-1">Edad Maxima:</label>
                <input type="number" min="1" max="99" defaultValue={2} class="form-control form-control-sm" placeholder='' onChange={(event)=>{ setEdadMaxima(event.target.value)}}/>        
                { 
                errores.edadmaximo &&
                <p><small class="text-danger">* {errores.edadmaximo}</small></p>
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
        <h2 class="m-0"><span>Gestión de Poblaciones</span>
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
          <DatatableRoles  data={buscar(poblacionLista)} eliminarRegistro={eliminarRegistro} actualizarRegistro={actualizaRegistro} setNuevoNombre={setNuevoNombre} setNuevoEdadMaxima={setNuevoEdadMaxima} setNuevoEdadMinima={setNuevoEdadMinima}/>
          
      </div>    
    </div>
  );
};
  
export default Poblaciones;