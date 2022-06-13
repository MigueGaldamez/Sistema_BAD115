import React from 'react';
import { useState,useEffect } from 'react';
import Axios from 'axios';  
import Moment from 'moment';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import swal from 'sweetalert';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const ReporteExamenesPorTipo = () => { 

  //PARA CADA ATRIBUTO
  const[fechainicio,setFechaIncio]=useState(Moment().subtract(7, 'days').format('YYYY-MM-DD'));
  const[fechafin,setFechaFin]=useState(Moment().format('YYYY-MM-DD'));
  const[idlaboratorio,setidlaboratorio]=useState(0);

  const[laboratorioLista,setLaboratorioLista]=useState([]);
  const[validarLista, setValidarLista] = useState([]);

  //esto es para validar en el backend y mandar siempre el id usuario
  Axios.interceptors.request.use(function (config) {
    var id = cookies.get('usuario').idusuario;
    config.headers.idusuario =  id;
    return config;
});
  const obtenerRegistros=()=>{
    Axios.get(`${process.env.REACT_APP_SERVER_IP}/laboratorios`).then((response)=>{
      setLaboratorioLista(response.data); 
    });
    var id = cookies.get('usuario').idusuario;
    Axios.get(`${process.env.REACT_APP_SERVER_IP}/validarpermisos/${id}`).then((response)=>{
      setValidarLista(response.data);
    });
  }

  const generarReporte=() =>{
   
    Axios.post(`${process.env.REACT_APP_SERVER_IP}/generarpdftipo`,{
      idlaboratorio:idlaboratorio,
      fechainicio: fechainicio,
      fechafin: fechafin,
    })
    .then((response)=>{

      var filename = response.data.body.path;
      console.log(filename);
      // abrir el archivo en una nueva pestaña
      var link = document.createElement("a");
      link.download =true;
      link.href = `${process.env.REACT_APP_SERVER_IP}/docs/${filename}`;
      link.target = "_blank";
      link.click();

    }).catch(function (error) {
      console.log(error);
    });
  }

  


  //LEER LOS DATOS AL CARGAR
  useEffect(()=>{
   obtenerRegistros();
 
  },[]);
  return (
    <>{/*asi validamos cada permiso*/}
    {(!validarLista.includes(73)) && 
    <div class="col container mx-auto my-auto text-center">
      <h1 class="text-primary">Ups...</h1>
       <h4>No tiene permisos para ver estos registros</h4>
   </div>}
    {validarLista.includes(73) &&
    <div class="col container">
      
      <div class="mt-4 mb-4 sticky-top sticky">
        <div class="row bordeLateral mb-3">
        <h2 class="m-0"><span>Reporte de examenes realizados por area y tipo</span></h2>
        </div>
         
          <div class="row">        
           
            <div class="col-12">
              <div class="card h-100 p-3 px-4">       
                  <form>
                      <div class="row">

                        <div class="col col-6">                          
                          <div class="row">

                            <div class="col col-12">
                              <label class="form-label">Filtrar por:</label>
                              <select class="form-select form-select-sm mb-2" aria-label="Default select example" onChange={(event)=>{setidlaboratorio(event.target.value)}}>
                                <option value="0" selected>Todos los laboratorios</option>
                              
                                {laboratorioLista.map((lab)=>{
                                  return(
                                    <option value={lab.idlaboratorio}>{lab.nombrelaboratorio}</option>
                                  )
                                })}
                              </select> 
                            </div> 
                          </div>
                          
                          <div class="row">

                            <div class="col col-6">
                              <label class="form-label">Fecha inicio:</label>
                              <input type="date" class="form-control form-control-sm" onChange={(event)=>{setFechaIncio(event.target.value)}} defaultValue={Moment().subtract(7, 'days').format('YYYY-MM-DD')} />
                             
                            </div> 
                              
                            <div class="col col-6">
                              <label class="form-label">Fecha fin:</label>
                              <input type="date"  class="form-control form-control-sm" onChange={(event)=>{setFechaFin(event.target.value)}} defaultValue={Moment().format('YYYY-MM-DD')} />
                            
                            </div>
                            
                          </div>
                          <br></br>
                          <button type="button" class="btn btn-danger" onClick={()=>{generarReporte()}}>Generar reporte</button>
                        </div>

                        

                    </div>
                    
                    
                  </form>                
              </div>
            </div>
          </div>

      </div>    
    </div>}</>
  );
};
export default ReporteExamenesPorTipo;