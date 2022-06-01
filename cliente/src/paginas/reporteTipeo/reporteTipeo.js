import React from 'react';
import { useState,useEffect } from 'react';
import Axios from 'axios';  
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import swal from 'sweetalert';

const Laboratorios = () => { 

  //PARA CADA ATRIBUTO
  const[filtro,setFiltro]=useState('1');
  
  const generarReporte=() =>{
    
    Axios.post(`http://${process.env.REACT_APP_SERVER_IP}/generarpdftipeo`,{filtro:filtro,})
    .then((response)=>{

      var filename = response.data.body.path;
      console.log(filename);
      // abrir el archivo en una nueva pestaña
      var link = document.createElement("a");
      link.download =true;
      link.href = `http://${process.env.REACT_APP_SERVER_IP}/docs/${filename}`;
      link.target = "_blank";
      link.click();

    }).catch(function (error) {
      console.log(error);
    });
  }
 


  //LEER LOS DATOS AL CARGAR
  useEffect(()=>{
   //obtenerRegistros();
 
  },[]);
  return (
    <div class="container my-4">
      
      <div class="mt-4 mb-4">
        <div class="row bordeLateral mb-3">
        <h2 class="m-0"><span>Reporte de tipeo de sangre</span></h2>
        </div>
         
          <div class="row">        
           
            <div class="col-12">
              <div class="card h-100 p-3 px-4">       
                
                <div class="row">
                    <div class="col col-6">
                    <form>

                    <label class="form-label">Generar por:</label>
                    <select class="form-select form-select-sm my-2" aria-label="Default select example" onChange={(event)=>{setFiltro(event.target.value)}}>
                   
                      <option value="1">Zona geografica</option>
                      <option value="2">Zona edades</option>
                      <option value="3">Zona genero</option>
                  </select> 
                  <br></br>
                  <button type="button" class="btn btn-danger" onClick={()=>{generarReporte()}}>Generar reporte</button>
                  </form>
                    </div>
                    <div class="col col-6 mt-2">
                      
                    </div>
                </div>
              </div>
            </div>
          </div>

      </div>    
    </div>
  );
};
export default Laboratorios;