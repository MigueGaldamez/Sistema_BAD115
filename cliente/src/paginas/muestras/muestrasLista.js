import React from 'react';
import { useState,useEffect } from 'react';
import Axios from 'axios';  
import DatatableRoles from "./datatableLista";
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import swal from 'sweetalert';

const Muestras = () => { 
  //PARA los ERRORES
  const[errores, setErrores] = useState([]);
  //PARA CADA ATRIBUTO
  //LA LISTA QUEMOSTRAREMOS
  const[muestraLista, setMuestraLista] = useState([]);

  const[modalVerMuestra, setModalVerMuestra] = useState([]);
  //PARA LA BUSQUEDA
  const [q, setQ] = useState('');
  //TODAS LAS COLUMNAS
  const [columns] = useState([
    'nombreexamen',
    'nombrearea',
    'nombrepaciente'
  ]);
  //LAS COLUMNAS POR LAS QUE SEPUEDEN FILTRAR
  const [buscarColumnas, setBuscarColumnas] = useState([
    'nombreexamen',
    'nombrearea',
    'nombrepaciente'
  ]);

  const obtenerRegistros=()=>{
    Axios.get(`http://${process.env.REACT_APP_SERVER_IP}/obtenerMuestras`).then((response)=>{
      setMuestraLista(response.data);
    });
  };

  const abrirModalVerMuestra=()=>{
    var modal = new Modal(document.getElementById('verMuestra'));
    setModalVerMuestra(modal);
    modal.show();
    
  }

  const cerrarModalVerMuestra=()=>{
    //Limpiamos los errores
    setErrores([]);
    //limpiamos los campos
    //setNombre('');
    //cerramos el modal
    var modal = modalVerMuestra;
    modal.hide();
  }
 
  /*const abrirModal=()=>{
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
  }*/

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
    <div class="col container my-4">
     
      <div class="mt-4 mb-4">
      <div class="row bordeLateral mb-3">
        <h2 class="m-0"><span>Muestras de examenes</span>
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
          <DatatableRoles  data={buscar(muestraLista)} abrirModalVerMuestra={abrirModalVerMuestra}/>
          
      </div>    
    </div>
  );
};
  
export default Muestras;