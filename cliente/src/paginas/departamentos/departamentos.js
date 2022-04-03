import React from 'react';
import { useState,useEffect } from 'react';
import Axios from 'axios';  
import DatatableRoles from "./datatable";

const Roles = () => { 
  const[nombre,setNombre]=useState("");
  //ESTE PARA CADA ATRIBUTO QUE SEPUEDE EDITAR
  const[nuevoNombre,setNuevoNombre]=useState(0);
  //LA LISTA QUEMOSTRAREMOS
  const[departamentoLista, setDepartamentoLista] = useState([]);
  //PARA LA BUSQUEDA
  const [q, setQ] = useState('');
  //TODAS LAS COLUMNAS
  const columns =departamentoLista[0] && Object.keys(departamentoLista[0]);
  //LAS COLUMNAS POR LAS QUE SEPUEDEN FILTRAR
  const [buscarColumnas, setBuscarColumnas] = useState([
    'iddepartamento',
    'nombre',
  ]);

  const obtenerRegistros=()=>{
    Axios.get('http://localhost:3001/departamentos').then((response)=>{
      setDepartamentoLista(response.data);  });
  };
  //AGREGAR
  const agregarRegistro=()=>{    
    Axios.post('http://localhost:3001/departamentos',{
      //TODOS LOS CAMPOS
      nombre:nombre,
    }).then(()=>{
      //ACTUALIZAR DATOS
      obtenerRegistros();
    });
  };

  const eliminarRegistro=(iddepartamento)=>{
    Axios.delete(`http://localhost:3001/departamentos/${iddepartamento}`).then(()=>{
      obtenerRegistros();  
    });
  };

  const actualizaRegistro=(iddepartamento)=>{
    Axios.put('http://localhost:3001/departamentos',{nombre:nuevoNombre,iddepartamento:iddepartamento}).then(()=>{
      obtenerRegistros();  
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
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Nuevo Registro</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <label for="exampleInputEmail1" class="form-label">Nombre:</label>
                <input type="email" class="form-control form-control-sm" placeholder='Ingrese un nuevo Rol' onChange={(event)=>{ setNombre(event.target.value)}}/>        
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" class="btn btn-primary" onClick={agregarRegistro}>Guardar</button>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4 mb-4">
        <div class="row bordeLateral mb-3">
        <h2 class="m-0"><span>Gestión de Departamentos</span>
          <button type="button" class="btn btn-primary btn-sm ms-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
          <DatatableRoles  data={buscar(departamentoLista)} eliminarRegistro={eliminarRegistro} actualizarRegistro={actualizaRegistro} setNuevoNombre={setNuevoNombre}/>
  




      </div>    
    </div>
  );
};
  
export default Roles;