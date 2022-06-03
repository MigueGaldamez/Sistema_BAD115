import React from 'react';
import { useState,useEffect } from 'react';
import Axios from 'axios';  
import DatatableRoles from "./datatable";
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import swal from 'sweetalert';

const Examenes = () => { 
    //PARA los ERRORES
  const[errores, setErrores] = useState([]);
  //PARA CADA ATRIBUTO
  const[nombre,setNombre]=useState("");
  const[area,setArea]=useState(0);
  const[parametros,setParametros]=useState([]);
  //ESTE PARA CADA ATRIBUTO QUE SEPUEDE EDITAR
  const[nuevoNombre,setNuevoNombre]=useState("");
  const[nuevaArea,setNuevaArea]=useState(0);
  const[nuevosParametros,setNuevosParametros]=useState([]);
  //LA LISTA QUEMOSTRAREMOS
  const[areaLista, setAreaLista] = useState([]);
  const[parametroLista, setParametroLista] = useState([]);
  const[examenLista, setExamenLista] = useState([]);
  const[modalB, setModalB] = useState([]);
  //PARA LA BUSQUEDA
  const [q, setQ] = useState('');
  //TODAS LAS COLUMNAS
  const [columns] = useState([
    'idexamen',
    'nombreexamen',
    'idarea'
  ]);
  //LAS COLUMNAS POR LAS QUE SEPUEDEN FILTRAR
  const [buscarColumnas, setBuscarColumnas] = useState([
    'idexamen',
    'nombreexamen',
    'idarea'
  ]);

  const obtenerRegistros=()=>{
    Axios.get(`https://${process.env.REACT_APP_SERVER_IP}/examenes`).then((response)=>{
      setExamenLista(response.data);  });
    Axios.get(`https://${process.env.REACT_APP_SERVER_IP}/areas`).then((response)=>{
      setAreaLista(response.data);  });
  };

  const  consultarParametros=(idarea)=>{
    Axios.get(`https://${process.env.REACT_APP_SERVER_IP}/parametros_area/${idarea}`,{
      
    }).then((response)=>{
      setParametroLista(response.data);  });
  }
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
    setArea('');
    //limpiamos el formulario
    document.getElementById("formulario").reset();
    //cerramos el modal
    var modal = modalB;
    modal.hide();
  }

  //AGREGAR
  const agregarRegistro=(event)=>{    
    event.preventDefault();
    Axios.post(`https://${process.env.REACT_APP_SERVER_IP}/examenes`,{
      //TODOS LOS CAMPOS
      nombre:nombre,
      area:area,
      parametros:parametros
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

  const eliminarRegistro=(idexamen)=>{
    Axios.delete(`https://${process.env.REACT_APP_SERVER_IP}/examenes/${idexamen}`).then((res)=>{
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

  const actualizaRegistro=(idexamen)=>{
    Axios.put(`https://${process.env.REACT_APP_SERVER_IP}/examenes`,{nombre:nuevoNombre,idexamen:idexamen,area:nuevaArea,parametros:nuevosParametros}).then(()=>{
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

    const manejarChecks= (event) => {
      var updatedList = [...parametros];
      if (event.target.checked) {
        updatedList = [...parametros, parseInt(event.target.value)];
      } else {
        updatedList.splice(parametros.indexOf(parseInt(event.target.value)), 1);
      }
      setParametros(updatedList);
      console.log(updatedList);
    };



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
                <label for="exampleInputEmail1" class="form-label">Nombre del examen:</label>
                <input type="email" class="form-control form-control-sm" placeholder='Ingrese el nombre del examen' onChange={(event)=>{ setNombre(event.target.value)}}/>        
                { 
                errores.nombre &&
               <p><small class="text-danger">* {errores.nombre}</small></p>
              }
              <label for="" class="form-label mt-3">Area:</label>
              <select class="form-select form-select-sm" aria-label="Default select example" onChange={(event)=>{
                setArea(event.target.value)
                consultarParametros(event.target.value)
                }}>
                   <option selected value="0">Seleccione una area</option>
                    {areaLista.map((area) => {
                     
                    
                    return(  <option  value={area.idarea}>{area.nombrearea}</option>)
                    })}
                  </select>        
                { 
                errores.municipio &&
               <p><small class="text-danger">* {errores.municipio}</small></p>
              }

              {parametroLista.length>0 &&
              
                  <div class="mt-3 px-2">
                    <h6>Seleccionar Parametros</h6>
                    {parametroLista.map((parametro) => {
                     
                    
                     return(  
                      <div class="form-check">
                      <input class="form-check-input" onChange={manejarChecks} value={parametro.idparametro} type="checkbox"  id="flexCheckDefault"/>
                      <label class="form-check-label" for="flexCheckDefault">
                      {parametro.parametro}
                      </label>
                    </div>)
                     })}
                  </div>
              }
               {parametroLista.length<=0 &&
                  <div>
                  <small>realice su seleccion</small>
                  </div>
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
        <h2 class="m-0"><span>Gestión de Definicion de Examenes</span>
        
          <button type="button" class="btn btn-primary btn-sm ms-3"  onClick={abrirModal}>
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
                            <small class="text-muted">Puede buscar por {columns && columns.map((column) => (<span>{column}, </span>))}</small>
                    </div>
                    <div class="col col-6 mt-2">
                      <label>Criterios</label>
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
          <DatatableRoles  
          data={buscar(examenLista)} 
          areas={areaLista} 
          eliminarRegistro={eliminarRegistro} 
          actualizarRegistro={actualizaRegistro} 
          setNuevoNombre={setNuevoNombre} 
          consultarParametros={consultarParametros}
          setNuevaArea={setNuevaArea}
          parametroLista={parametroLista}
          areaLista={areaLista}
          nuevosParametros={nuevosParametros}
          setNuevosParametros={setNuevosParametros}/>
      </div>    
    </div>
  );
};
export default Examenes;