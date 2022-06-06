import React from 'react';
import { useState,useEffect } from 'react';
import Axios from 'axios';  
import Moment from 'moment';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import swal from 'sweetalert';

const ReporteCantidadExamenes = () => { 

  //PARA CADA ATRIBUTO
  const[filtro,setFiltro]=useState('0');
  const[fechainicio,setFechaIncio]=useState(Moment().subtract(7, 'days').format('YYYY-MM-DD'));
  const[fechafin,setFechaFin]=useState(Moment().format('YYYY-MM-DD'));

  const[pacienteLista, setPacienteLista] = useState([]);
  const[municipioLista,setMunicipioLista]=useState([]);
  const[departamentoLista,setDepartamentoLista]=useState([]);

  const obtenerRegistros=()=>{
    Axios.get(`http://${process.env.REACT_APP_SERVER_IP}/pacientes`).then((response)=>{
      setPacienteLista(response.data);
    });

    Axios.get(`http://${process.env.REACT_APP_SERVER_IP}/municipios`).then((response)=>{
      setMunicipioLista(response.data);  
    });

    Axios.get(`http://${process.env.REACT_APP_SERVER_IP}/departamentos`).then((response)=>{
      setDepartamentoLista(response.data); 
    });
  }

  const generarReporte=() =>{

    var idpaciente = 0;
    var iddepartamento = 0;
    var idmunicipio = 0;

    if (filtro === '1'){
      idpaciente = document.getElementById("paciente").value;
    } else if (filtro === '2') {
      iddepartamento = document.getElementById("departamento").value;
    } else if (filtro === '3') {
      idmunicipio = document.getElementById("municipio").value;
    }
    console.log(idpaciente);
    Axios.post(`http://${process.env.REACT_APP_SERVER_IP}/generarpdfexamenes`,{
      filtro: filtro,
      idpaciente: idpaciente,
      iddepartamento: iddepartamento,
      idmunicipio: idmunicipio,
      fechainicio: fechainicio,
      fechafin: fechafin,
    })
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

  const seleccionarFiltro=(id) => {
    setFiltro(id);
    if(id==='1'){

      document.getElementById("filtro").innerHTML = "";

      var html = '<label class="form-label">Paciente:</label>' +
      '<select id="paciente" class="form-select form-select-sm mb-2" size="5" aria-label="Default select example" onChange="">';
      pacienteLista.forEach(paciente => {
        html += '<option value=' + paciente.idpaciente + '> ' + paciente.nombrepaciente + ' ' + paciente.apellido + '</option>';
      });
      html += '</select>';
      document.getElementById("filtro").innerHTML = html;
      document.getElementById("paciente").value = 1;
                                
    } else if(id=='2') {

      document.getElementById("filtro").innerHTML = "";

      var html = '<label class="form-label">Departamento:</label>' +
      '<select id="departamento" defaultValue="2" class="form-select form-select-sm mb-2" aria-label="Default select example" onChange="">';
      departamentoLista.forEach(departamento => {
        html += '<option value=' + departamento.iddepartamento + '> ' + departamento.departamento + '</option>';
      });
      html += '</select>';
      document.getElementById("filtro").innerHTML = html;

    } else if(id==='3') {

      document.getElementById("filtro").innerHTML = "";

      var html = '<label class="form-label">Municipio:</label>' +
      '<select id="municipio" defaultValue="0" class="form-select form-select-sm mb-2" aria-label="Default select example" onChange="">';
      municipioLista.forEach(municipio => {
        html += '<option value=' + municipio.idmunicipio + '> ' + municipio.municipio + '</option>';
      });
      html += '</select>';
      document.getElementById("filtro").innerHTML = html;
    }
  
  }


  //LEER LOS DATOS AL CARGAR
  useEffect(()=>{
   obtenerRegistros();
 
  },[]);
  return (
    <div class="col container my-4">
      
      <div class="mt-4 mb-4">
        <div class="row bordeLateral mb-3">
        <h2 class="m-0"><span>Reporte de examenes realizados</span></h2>
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
                              <select class="form-select form-select-sm mb-2" aria-label="Default select example" onChange={(event)=>{seleccionarFiltro(event.target.value)}}>
                                <option value="0" disabled selected>Seleccione un filtro</option>
                                <option value="1">Paciente</option>
                                <option value="2">Departamento</option>
                                <option value="3">Municipio</option>
                              </select> 
                            </div> 
                          </div>
                          
                          <div class="row">

                            <div class="col col-6">
                              <label class="form-label">Fecha inicio:</label>
                              <input type="date" class="form-control form-control-sm" onChange={(event)=>{setFechaIncio(event.target.value)}} defaultValue={Moment().subtract(7, 'days').format('YYYY-MM-DD')} />
                              { /*
                                errores.fechaChequeo &&
                              <p><small class="text-danger">* {errores.fechaChequeo}</small></p>
                                */}
                            </div> 
                              
                            <div class="col col-6">
                              <label class="form-label">Fecha fin:</label>
                              <input type="date"  class="form-control form-control-sm" onChange={(event)=>{setFechaFin(event.target.value)}} defaultValue={Moment().format('YYYY-MM-DD')} />
                              { /*
                                errores.fechaChequeo &&
                              <p><small class="text-danger">* {errores.fechaChequeo}</small></p>
                                */}
                            </div>
                            
                          </div>
                          <br></br>
                          <button type="button" class="btn btn-danger" onClick={()=>{generarReporte()}}>Generar reporte</button>
                        </div>

                        <div class="col col-6">
                          <div id="filtro">
                            
                          </div>
                        </div>

                    </div>
                    
                    
                  </form>                
              </div>
            </div>
          </div>

      </div>    
    </div>
  );
};
export default ReporteCantidadExamenes;