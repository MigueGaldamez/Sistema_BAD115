import React from 'react';
import { useState,useEffect } from 'react';
import Axios from 'axios';  
import DatatableRoles from "./datatable";
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import swal from 'sweetalert';

const Laboratorios = () => { 
    //PARA los ERRORES
  const[errores, setErrores] = useState([]);
  //PARA CADA ATRIBUTO
  const[nombre,setNombre]=useState("");
  const[municipio,setMunicipio]=useState(0);
  //ESTE PARA CADA ATRIBUTO QUE SEPUEDE EDITAR
  const[nuevoNombre,setNuevoNombre]=useState(0);
  const[nuevoIdMunicipio,setNuevoIdMunicipio]=useState(0);
  //LA LISTA QUEMOSTRAREMOS
  const[municipioLista, setMunicipioLista] = useState([]);
  const[laboratorioLista, setLaboratorioLista] = useState([]);
  const[modalB, setModalB] = useState([]);
  //PARA LA BUSQUEDA
  const [q, setQ] = useState('');
  //TODAS LAS COLUMNAS
  const [columns] = useState([
    'idlaboratorio',
    'nombrelaboratorio',
    'municipio'
  ]);
  //LAS COLUMNAS POR LAS QUE SEPUEDEN FILTRAR
  const [buscarColumnas, setBuscarColumnas] = useState([
    'idlaboratorio',
    'nombrelaboratorio',
    'municipio'
  ]);

  const obtenerRegistros=()=>{
    Axios.get(`https://${process.env.REACT_APP_SERVER_IP}/laboratorios`).then((response)=>{
      setLaboratorioLista(response.data);  });
    Axios.get(`https://${process.env.REACT_APP_SERVER_IP}/municipios`).then((response)=>{
      setMunicipioLista(response.data);  });
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
    setMunicipio('');
    //limpiamos el formulario
    document.getElementById("formulario").reset();
    //cerramos el modal
    var modal = modalB;
    modal.hide();
  }

  //AGREGAR
  const agregarRegistro=(event)=>{    
    event.preventDefault();
    Axios.post(`https://${process.env.REACT_APP_SERVER_IP}/laboratorios`,{
      //TODOS LOS CAMPOS
      nombre:nombre,
      municipio:municipio,
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

  const eliminarRegistro=(idlaboratorio)=>{
    Axios.delete(`https://${process.env.REACT_APP_SERVER_IP}/laboratorios/${idlaboratorio}`).then((res)=>{
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

  const actualizaRegistro=(idlaboratorio)=>{
    Axios.put(`https://${process.env.REACT_APP_SERVER_IP}/laboratorios`,{nombre:nuevoNombre,idlaboratorio:idlaboratorio,idmunicipio:nuevoIdMunicipio}).then(()=>{
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
  
  const generarReporte=(data) =>{
    
    Axios.post(`https://${process.env.REACT_APP_SERVER_IP}/generarpdf`,{data:data})
    .then((response)=>{

      var filename = response.data.body.path;

      // abrir el archivo en una nueva pestaña
      var link = document.createElement("a");
      link.download =true;
      link.href = `https://${process.env.REACT_APP_SERVER_IP}/docs/${filename}`;
      link.target = "_blank";
      link.click();

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
                <label for="exampleInputEmail1" class="form-label">Laboratorio:</label>
                <input type="email" class="form-control form-control-sm" placeholder='Ingrese un nuevo Municipio' onChange={(event)=>{ setNombre(event.target.value)}}/>        
                { 
                errores.nombre &&
               <p><small class="text-danger">* {errores.nombre}</small></p>
              }
              <label for="" class="form-label mt-3">Municipio:</label>
              <select class="form-select form-select-sm" aria-label="Default select example" onChange={(event)=>{
                setMunicipio(event.target.value)}}>
                   <option selected>Seleccione un Municipio</option>
                    {municipioLista.map((municipio) => {
                     
                    
                    return(  <option  value={municipio.idmunicipio}>{municipio.municipio}</option>)
                    })}
                  </select>        
                { 
                errores.municipio &&
               <p><small class="text-danger">* {errores.municipio}</small></p>
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
        <h2 class="m-0"><span>Gestión de Laboratorios</span>
        
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
          <DatatableRoles  data={buscar(laboratorioLista)} municipios={municipioLista} eliminarRegistro={eliminarRegistro} actualizarRegistro={actualizaRegistro} setNuevoNombre={setNuevoNombre} setNuevoIdMunicipio={setNuevoIdMunicipio} generarReporte={generarReporte}/>

      </div>    
    </div>
  );
};
export default Laboratorios;