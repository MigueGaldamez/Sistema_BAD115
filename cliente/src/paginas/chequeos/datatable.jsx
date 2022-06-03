import React, { useState, useEffect } from 'react';
import Pagination from '../../componentes/Paginacion/paginacion';
import Moment from 'moment';
export default function DatatableRoles({ examenes,labs,pacientes,data,eliminarRegistro,actualizarRegistro,setNuevaHoraChequeo,setNuevaFechaChequeo,setNuevoLaboratorio, laboratorios, setNuevoUsuario,setNuevaProfesion,profesiones }) {
  
  const dataOriginal = data;
  const[registro,setRegistro]=useState([]);
  const[registroPaciente,setRegistroPaciente]=useState([]);
  const[registroLab,setRegistroLab]=useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [registrosXpagina] = useState(5);

  // obtener los actuales
  const indexUltimoRegistro = paginaActual * registrosXpagina;
  const indicePrimerRegistro = indexUltimoRegistro - registrosXpagina;
  data = data.slice(indicePrimerRegistro, indexUltimoRegistro);
 
    // cambiar pagina
  const paginate = numeroPagina => setPaginaActual(numeroPagina);

  const columns = data[0] && Object.keys(data[0]);
  
  function mostrarDatos(id){
    var registro2 = dataOriginal.find(x => x.idchequeo == id);
    var registroPa = pacientes.find(x => x.idpaciente == registro2.idpaciente);
    var registroLa = labs.find(x => x.idlaboratorio == registro2.idlaboratorio);
    setRegistroPaciente(registroPa);
    setRegistroLab(registroLa);

    for(const examen of registro2.examenes){
      var detalle = examenes.find(x => x.idexamen == examen.idexamen);
      examen.detalle =detalle;
    }
    setRegistro(registro2);
  }
  return (
    <>
    <table class="table table-striped mt-3 table-hover table-responsive-lg" cellPadding={0} cellSpacing={0}>
      <thead class="table-dark">
        <tr>
        {data[0] && columns.map((heading) => {
             if(heading!='fechaactualizacion' && heading!='fechacreacion' && heading!='examenes' && heading!='idchequeo' && heading!='idusuario' && heading!='idlaboratorio' && heading!='idpaciente' && heading!='archivo')
            return(<th>{heading}</th>)
            })}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
      {data.map((row) =>{  const id = row['idchequeo'];  return(
          <tr>
           
            {columns.map((column) => {
            if(column=='paciente'){ return(
                
              <td>{row[column]}  </td>
           
            )}
           
            if(column=='estadochequeo'){
              return(       
                <>
                {row[column]==false && <td><input class="form-control form-control-sm" disabled type="text" value="En Proceso"/></td>}
                {row[column]==true && <td><input class="form-control form-control-sm" disabled type="text" value="Finalizado"/></td>}
                </>
               )
            }
            
            
            if(column=='laboratorio')
            return(
              <td>
              <select class="form-select form-select-sm" aria-label="Default select example" onChange={(event)=>{
                setNuevoLaboratorio(event.target.value)}}>
                   
                {laboratorios.map((laboratorio) => {
                  if(row['idlaboratorio']==laboratorio.idlaboratorio)
                
                return(  <option selected value={laboratorio.idlaboratorio}>{laboratorio.nombrelaboratorio}</option>)
                if(row['idlaboratorio']!=laboratorio.idlaboratorio)
                
                return(  <option  value={laboratorio.idlaboratorio}>{laboratorio.nombrelaboratorio}</option>)
                })}
              </select>
              </td>
            )
            if(column=='fechachequeo')
            return(
                
              <td> <input type="date" class="form-control form-control-sm" onChange={(event)=>{setNuevaFechaChequeo(event.target.value)}} key={id} defaultValue={Moment(row[column]).format('YYYY-MM-DD')} /></td>
            )
            if(column=='horachequeo')
            return(
                
              <td> <input type="time" class="form-control form-control-sm" onChange={(event)=>{setNuevaHoraChequeo(event.target.value)}} key={id} defaultValue={row[column]} /></td>
           
            )

            })}
              <td  >
              <a class="btn btn-success btn-sm mx-1" onClick={()=>{actualizarRegistro(id)}}>Actualizar</a>
              <a class="btn btn-danger btn-sm mx-1" data-bs-toggle="modal" data-bs-target={'#eliminarModal'+id} >Eliminar</a>
              <a class="btn btn-dark btn-sm mx-1" data-bs-toggle="modal" data-bs-target={'#detallesModal'} onClick={()=>{mostrarDatos(id)}} >Ver detalles</a>
              
              </td>
              {/* Modal para eliminar */}
              <div class="modal fade" id={'eliminarModal'+id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Confirmar</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body mx-auto">
                    <ul class="list-unstyled">
                      <li><h6><span>¿Esta seguro que desea eliminar este registro?</span></h6></li>
                      
                      <li>
                        <ul>
                        <li>Chequeo para paciente {row['paciente']} para el dia {Moment(row['fechaChequeo']).format('DD MMMM YYYY')}</li>  
                        </ul>
                      </li>
                      <li> <small>Este proceso es irreversible</small></li>
                    </ul>
                     
                    
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                      <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={()=>{eliminarRegistro(id)}}>Eliminar</button>
                    </div>
                  </div>
                </div>
              </div>
              {/* FIN MODAL*/}
          </tr>
        )})}
        {data.length ==0 && 
        <tr><td class="text-center">No hay registros que coincidan</td></tr>
        }
      </tbody>
    </table>
    {/* Modal para eliminar */}
    <div class="modal fade" id={'detallesModal'} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Ver detalles de Chequeo</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <div class="row">
  <div class="col-4">
    <div class="list-group" id="list-tab" role="tablist">
      <a class="list-group-item list-group-item-action active" id="list-home-list" data-bs-toggle="list" href="#list-home" role="tab" aria-controls="list-home">Paciente</a>
      <a class="list-group-item list-group-item-action" id="list-profile-list" data-bs-toggle="list" href="#list-profile" role="tab" aria-controls="list-profile">Laboratorio</a>
      <a class="list-group-item list-group-item-action" id="list-messages-list" data-bs-toggle="list" href="#list-messages" role="tab" aria-controls="list-messages">Examenes</a>

    </div>
  </div>
  <div class="col-8">
    <div class="tab-content" id="nav-tabContent">
      <div class="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
        <h6 class="fw-normal">Paciente: <span class="text-primary">{registroPaciente.nombrepaciente} {registroPaciente.apellido} </span></h6>
        <h6 class="fw-normal">Correo: <span class="text-primary text-decoration-underline">{registroPaciente.correopaciente}</span></h6>
        <h6 class="fw-normal">Dirección: <span class="fw-bold">{registroPaciente.direccion}</span></h6>
        <h6 class="fw-normal">Municipio: <span class="fw-bold">{registroPaciente.municipio}</span></h6>
        <h6 class="fw-normal">Estado civil: <span class="fw-bold">{registroPaciente.estadocivil}</span></h6>
      </div>
      <div class="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
      <h6 class="fw-normal">Laboratorio del chequeo: <br/><span class="text-primary">{registroLab.nombrelaboratorio} </span></h6>
        <h6 class="fw-normal">Municipio del laboratorio: <br/><span class="fw-bold">{registroLab.municipio}</span></h6>
        
      
      </div>
      <div class="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">
        
          {registro.examenes && <h5>Examenes solicitados</h5>}
          {registro.examenes && (registro.examenes).map((exa)=>{
            return(<li><span>{exa.detalle.nombreexamen}</span></li>)
          })}
          <h6 class="mt-3">Solicitados en: <span class="fw-normal">{registro.fechacreacion}</span></h6>
      </div>
    </div>
  </div>
</div>
                     
                    
                    </div>
                    <div class="modal-footer">
                   
                      <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Entendido</button>
                    </div>
                  </div>
                </div>
              </div>
              {/* FIN MODAL*/}
    <Pagination
        registrosPorPagina={registrosXpagina}
        registrosTotales={dataOriginal.length}
        paginate={paginate}
      />
    </>
  );
}