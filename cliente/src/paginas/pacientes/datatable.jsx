import React, { useState, useEffect } from 'react';
import Pagination from '../../componentes/Paginacion/paginacion';
import Moment from 'moment';
export default function DatatableRoles(
  { data,
    eliminarRegistro,
    actualizarRegistro,
    setNuevoNombre,
    setNuevoMunicipio,
    municipios,
    setNuevoEstado,
    setNuevoApellido,
    setNuevaDireccion,
    setNuevaFechaNacimiento,
    setNuevoCorreo,
    estados,
    actualizaDetalles,
    abrirModalActualizacion,
    cerrarModalActualizacion,
    erroresA,
    pasoA,
    setPasoA,
    setContactosA,
    contactosA,
    setNuevoNumero,
    setNuevoidentificador,
    setNuevoEstadoCivil,
    setNuevoIdentificadorEmergencias,
    setNuevoNumeroEmergencias,
    eliminarNumeroActu,
    agregarNumeroActu
 }) {
  Moment.locale('es');
  const dataOriginal = data;
  const [paginaActual, setPaginaActual] = useState(1);
  const [registrosXpagina] = useState(15);
  const [valores, setvalores] = useState([]);
  //Obtener los actuales 
  const indexUltimoRegistro = paginaActual * registrosXpagina;
  const indicePrimerRegistro = indexUltimoRegistro - registrosXpagina;
  data = data.slice(indicePrimerRegistro, indexUltimoRegistro);

  //Cambiar de pagina 
  const paginate = numeroPagina => setPaginaActual(numeroPagina);

  const columns = data[0] && Object.keys(data[0]);

  const abrirModalA=(id)=>{
    var result = dataOriginal.find(obj => {
      return obj.idpaciente === id;
    })
    setNuevoNombre(result.nombrepaciente);
    setNuevoApellido(result.apellido);
    setNuevoMunicipio(result.idmunicipio);
    setNuevaDireccion(result.direccion);
    setNuevaFechaNacimiento(result.fechanacimiento);
    setNuevoCorreo(result.correopaciente);
    setNuevoEstado(result.idestado);
    setNuevoIdentificadorEmergencias(result.contactoemergencia.nombrecontacto);
    setNuevoNumeroEmergencias(result.contactoemergencia.telefono);

    setContactosA(result.numeros);
    setvalores(result);
    abrirModalActualizacion();
  }
  const cerrarModalA=()=>{
    setvalores([]);
    cerrarModalActualizacion();
  }
  return (
    <>
    <table class="table table-striped mt-4 table-hover table-responsive-lg" cellPadding={0} cellSpacing={0}>
      <thead class="table-dark">
        <tr>
          {data[0] && columns.map((heading) => {
             if(heading!='contactoemergencia' && heading!='numeros' && heading!='idmunicipio' && heading!='idestado' && heading!='idpaciente' && heading!='direccion' && heading!='correopaciente' && heading!="fechanacimiento")
            return(<th>{heading}</th>)
            })}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) =>{  const id = row['idpaciente'];  return(
          <tr>
           
            {columns.map((column) => {
              
            if(column=='nombrepaciente')
            return(
                
              <td> <input type="text" class="form-control form-control-sm" onChange={(event)=>{
                setNuevoNombre(event.target.value)
                }} key={id} defaultValue={row[column]} /></td>
             
            )
           
            if(column=='apellido')
            return(
                
              <td> <input type="text" class="form-control form-control-sm" onChange={(event)=>{
                setNuevoApellido(event.target.value)
                }} key={id} defaultValue={row[column]} /></td>
             
            )
           
            
            if(column=='municipio')
            return(
                <td>
                  <select class="form-select form-select-sm" aria-label="Default select example" onChange={(event)=>{
                setNuevoMunicipio(event.target.value)}}>
                   
                    {municipios.map((municipio) => {
                      if(row['idmunicipio']==municipio.idmunicipio)
                    
                    return(  <option selected value={municipio.idmunicipio}>{municipio.municipio}</option>)
                    if(row['idmunicipio']!=municipio.idmunicipio)
                    
                    return(  <option  value={municipio.idmunicipio}>{municipio.municipio}</option>)
                    })}
                  </select>
                </td>
             
            )
            if(column=='estadocivil')
            return(
                <td>
                  <select class="form-select form-select-sm" aria-label="Default select example" onChange={(event)=>{
                setNuevoEstado(event.target.value)}}>
                   
                    {estados.map((estado) => {
                      if(row['idestado']==estado.idestado)
                    
                    return(  <option selected value={estado.idestado}>{estado.estadocivil}</option>)
                    if(row['idestado']!=estado.idestado)
                    
                    return(  <option  value={estado.idestado}>{estado.estadocivil}</option>)
                    })}
                  </select>
                </td>
             
            )
            })}
              <td  >
              <a class="btn btn-success btn-sm mx-1" onClick={()=>{actualizarRegistro(id)}}>Actualizar</a>
              <a class="btn btn-danger btn-sm mx-1" data-bs-toggle="modal" data-bs-target={'#eliminarModal'+id} >Eliminar</a>
              <a class="btn btn-info btn-sm mx-1" data-bs-toggle="modal" data-bs-target={'#detalles'+id} >Detalles</a>
              <a class="btn btn-dark btn-sm mx-1" onClick={()=>{abrirModalA(id)}} >Modificar</a>
              
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
                        <li>{row['nombrepaciente']}</li>  
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
               {/* Modal para ver detalles */}
               <div class="modal fade" id={'detalles'+id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Ver detalles:</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      
                 
                   
                      <div class="list-group bordeLateral">
                        <div class="list-group-item text-dark" aria-current="true">
                          <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">{row['nombrepaciente']}</h5>
                            <span class="badge badge-info px-2 pt-1 pb-0">
                            <h5 class="fw-normal"><b>Edad:</b> {  Moment(new Date()).diff(Moment(row['fechanacimiento']),'years')}</h5>
                            </span>
                          
                          </div>
                          
                          <p class="mb-1">{row['apellido']}.</p>
                          <dl class="row">
                            <dt class="col-sm-4">Municipio:</dt>
                            <dd class="col-sm-8">{row['municipio']}</dd>

                            <dt class="col-sm-4">Dirección:</dt>
                            <dd class="col-sm-8">
                              {row['direccion']}
                            </dd>

                            <dt class="col-sm-4">Estado Civil:</dt>
                            <dd class="col-sm-8">{row['estadocivil']}</dd>

                            <dt class="col-sm-4">Correo:</dt>
                            <dd class="col-sm-8">{row['correopaciente']}</dd>

                            <dt class="col-sm-4">Números:</dt>
                            <dd class="col-sm-8">
                            {row['numeros'].map((numero,index)=>{
                              return(
                                <dl class="row mb-0">
                                <dt class="col-sm-5">{numero.nombreidentificador}</dt>
                                <dd class="col-sm-7">{numero.numero}</dd>
                              </dl>
                              )
                            })}
                             
                            </dd>

                            <dt class="col-sm-4">Contacto emergencia:</dt>
                            <dd class="col-sm-8">
                              <dl class="row">
                                <dt class="col-sm-5">{row['contactoemergencia'].nombrecontacto}</dt>
                                <dd class="col-sm-7">{row['contactoemergencia'].telefono}</dd>
                              </dl>   
                            </dd>
                          </dl>
                 
                          <small>Registrado por:.</small>
                          <br/>
                          <small><b>Nacimiento:</b> {Moment(row['fechanacimiento']).format('dddd DD MMMM')}</small>
                        </div>

                      </div>
                    
                  
                  
                     
                    
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Entendido</button>
                    
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
    {/*iniciai*/}
    <div class="modal fade" id="actualizarDetalles" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modificar Registro</h5>
              <button type="button" class="btn-close"  onClick={cerrarModalA} aria-label="Close"></button>
            </div>
            <form id="formularioActu" onSubmit={actualizaDetalles}>
            <div class="modal-body">
              
              
              <nav>
                
  <div class="nav nav-tabs" id="nav-tab" role="tablist">
    <button class={"nav-link position-relative" + (pasoA==1 ?' active':'')} id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true" onClick={()=>setPasoA(1)}>
      <span class="badge bg-success p-1">1</span> Datos de Usuario
      {(erroresA.nombre || erroresA.apellido || erroresA.municipio || erroresA.direccion || erroresA.fechaNacimiento || erroresA.correo|| erroresA.estadoCivil) &&
          <span class="position-absolute top-0 end-90 translate-middle p-2 bg-danger border border-light rounded-circle">
          </span> 
      }
    </button>
    <button class={"nav-link position-relative" + (pasoA==2 ?' active':'')} id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false" onClick={()=>setPasoA(2)}>
      <span class="badge bg-success p-1">2</span> Numeros de contacto
      {(erroresA.numero || erroresA.identificador) &&
          <span class="position-absolute top-0 end-90 translate-middle p-2 bg-danger border border-light rounded-circle">
          </span> 
      }
    </button>
    <button class={"nav-link position-relative" + (pasoA==3 ?' active':'')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false" onClick={()=>setPasoA(3)}>
      <span class="badge bg-success p-1">3</span> Contacto de emergencia
      {(erroresA.numeroEmergencias || erroresA.identificadorEmergencias) &&
          <span class="position-absolute top-0 end-90 translate-middle p-2 bg-danger border border-light rounded-circle">
          </span> 
      }
    </button>
  </div>
</nav>
<div class="tab-content" id="nav-tabContent">
  <div class={"tab-pane fade"+ (pasoA==1? ' active show':'')} id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
      {/*INICIA DATOS DEUSUARIO*/}
      <div class="row mt-3 px-3">
      <div class="bordeLateral"><h6>Información General:</h6></div>
        <div class="col col-6">
                <label for="exampleInputEmail1" class="form-label">Nombres del Paciente:</label>
                <input defaultValue={valores.nombrepaciente} type="text" class="form-control form-control-sm" placeholder='Ingrese los nombres del paciente' onChange={(event)=>{ setNuevoNombre(event.target.value)}}/>        
                { 
                erroresA.nombre &&
               <p><small class="text-danger">* {erroresA.nombre}</small></p>
              }
                </div>
                <div class="col col-6">
                <label for="exampleInputEmail1" class="form-label">Apellidos del Paciente:</label>
                <input defaultValue={valores.apellido} type="text" class="form-control form-control-sm" placeholder='Ingrese los apellidos del pacientes' onChange={(event)=>{ setNuevoApellido(event.target.value)}}/>        
                { 
                erroresA.apellido &&
               <p><small class="text-danger">* {erroresA.apellido}</small></p>
              }
                </div>
                <div class="col col-4 mt-3">
              <label for="" class="form-label">Departamento:</label>
                </div>
                <div class="col col-4 mt-3">
              <label for="" class="form-label">Municipio:</label>
              <select class="form-select form-select-sm" aria-label="Default select example" onChange={(event)=>{
                setNuevoMunicipio(event.target.value)}}>
                  
                    {municipios.map((municipio) => {
                     if(municipio.idmunicipio == valores.idmunicipio){
                       return(
                        <option selected value={municipio.idmunicipio}>{municipio.municipio}</option>
                       )
                     }
                    if(municipio.idmunicipio != valores.idmunicipio){
                      return(  <option  value={municipio.idmunicipio}>{municipio.municipio}</option>)
                    }
                    
                    })}
                  </select>        
                { 
                erroresA.municipio &&
               <p><small class="text-danger">* {erroresA.municipio}</small></p>
              }
              </div>
             
              <div class="col col-4 mt-3">
                  <label for="exampleInputEmail1" class="form-label">Direccion:</label>
                  <input  defaultValue={valores.direccion} type="text" class="form-control form-control-sm" placeholder='Ingrese la direccion' onChange={(event)=>{ setNuevaDireccion(event.target.value)}}/>        
                  { 
                  erroresA.direccion &&
                <p><small class="text-danger">* {erroresA.direccion}</small></p>
                }
              </div>
              
              <div class="col col-4 mt-3">
                  <label for="exampleInputEmail1" class="form-label">Fecha de Nacimiento:</label>
                  <input  defaultValue={Moment(valores.fechanacimiento).format('yyyy-MM-DD')} type="date" class="form-control form-control-sm" placeholder='Ingrese la direccion' onChange={(event)=>{ setNuevaFechaNacimiento(event.target.value)}}/>        
                  
                
                  { 
                  erroresA.fechaNacimiento &&
                <p><small class="text-danger">* {erroresA.fechaNacimiento}</small></p>
                }
              </div>
              <div class="col col-4 mt-3">
                  <label for="exampleInputEmail1" class="form-label">Correo:</label>
                  <input defaultValue={valores.correopaciente} type="email" class="form-control form-control-sm" placeholder='Ingrese el correo' onChange={(event)=>{ setNuevoCorreo(event.target.value)}}/>        
                  { 
                  erroresA.correo &&
                <p><small class="text-danger">* {erroresA.correo}</small></p>
                }
              </div>
              <div class="col col-4 mt-3">
                <label for="" class="form-label">Estado Civil:</label>
                <select class="form-select form-select-sm" aria-label="Default select example" onChange={(event)=>{
                  setNuevoEstado(event.target.value)}}>
                    <option selected>Seleccione un Estado Civil</option>
                      {estados.map((estado) => {
                      
                      if(estado.idestado == valores.idestado){
                          return(  <option selected value={estado.idestado}>{estado.estadocivil}</option>)
                      }
                      if(estado.idestado != valores.idestado){
                        return(  <option value={estado.idestado}>{estado.estadocivil}</option>)
                    }
                     
                      })}
                    </select>        
                  { 
                  erroresA.estado &&
                <p><small class="text-danger">* {erroresA.estado}</small></p>
                }
              </div>
      </div>

      {/*FINALIZA*/}
  </div>
  <div class={"tab-pane fade"+ (pasoA==2? ' active show':'')} id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
    <form class="row mt-3 px-3" id="numeroformAct">
    <div class="bordeLateral"><h6>Numero/s de contacto:</h6></div>
    
    <div class="col col-6">
      
          <label for="exampleInputEmail1" class="form-label">Identificador de número:</label>
          <input type="text" class="form-control form-control-sm" placeholder='Ingrese el identificador' onChange={(event)=>{ setNuevoidentificador(event.target.value)}}/>        
          { 
          erroresA.identificador &&
        <p><small class="text-danger">* {erroresA.identificador}</small></p>
        }
      </div>
      <div class="col col-6">
          <label for="exampleInputEmail1" class="form-label">Número:</label>
          <input type="number" class="form-control form-control-sm" placeholder='Ingrese el numero' onChange={(event)=>{ setNuevoNumero(event.target.value)}}/>        
          { 
          erroresA.numero &&
        <p><small class="text-danger">* {erroresA.numero}</small></p>
        }
      </div>
      <div class="mt-2">
      <a class="btn btn-info btn-sm mb-3"  onClick={agregarNumeroActu}>Agregar</a>
     
      
      <div class="row"> 
      
      
       {contactosA.map((contacto,index)=>{
        return(
          <div class="col col-3" key={index}>
            <div class="card">
              <div class="card-body p-3 px-3">
                <h6 class="card-title">{contacto.numero}</h6>
                <h6 class="card-subtitle mb-2 text-muted">{contacto.nombreidentificador}</h6>
                <a href="#" class="btn btn-sm btn-danger"  onClick={()=>eliminarNumeroActu(index)}>Retirar</a>             
              </div>
            </div>
          </div>         
        )
      })}
       </div>
      </div>
    </form>
  </div>
  <div class={"tab-pane fade"+ (pasoA==3? ' active show':'')} id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
  <div class="row px-3 mt-3">
    <div class="bordeLateral"><h6>Contacto de emergencia:</h6></div>
    <div class="col col-6">
          <label for="exampleInputEmail1" class="form-label">Identificador de número:</label>
          <input defaultValue={valores.contactoemergencia? valores.contactoemergencia.nombrecontacto : ""} type="text" class="form-control form-control-sm" placeholder='Ingrese el nombre del contacto' onChange={(event)=>{ setNuevoIdentificadorEmergencias(event.target.value)}}/>        
          { 
          erroresA.identificadorEmergencias &&
        <p><small class="text-danger">* {erroresA.identificadorEmergencias}</small></p>
        }
      </div>
      <div class="col col-6">
          <label for="exampleInputEmail1" class="form-label">Número de contacto:</label>
          <input defaultValue={valores.contactoemergencia? valores.contactoemergencia.telefono : ""} type="text" class="form-control form-control-sm" placeholder='Ingrese el número' onChange={(event)=>{ setNuevoNumeroEmergencias(event.target.value)}}/>        
          { 
          erroresA.numeroEmergencias &&
        <p><small class="text-danger">* {erroresA.numeroEmergencias}</small></p>
        }
      </div>
    </div>
  </div>
</div>
                
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary"  onClick={cerrarModalA}>Cancelar</button>
              {pasoA==1 &&
              <button type="button" class="btn btn-success" onClick={()=>setPasoA(2)}>Siguiente</button>}
              {pasoA==2 &&
              <button type="button" class="btn btn-success" onClick={()=>setPasoA(3)}>Siguiente</button>}
              {pasoA==3 &&
              <button type="button" class="btn btn-success" onClick={()=>actualizaDetalles(valores.idpaciente)}>Guardar cambios</button>}
            </div>
            </form>
          </div>
        </div>
      </div>
    {/*Finaliza*/}
    <Pagination 
      registrosPorPagina={registrosXpagina}
      registrosTotales={dataOriginal.length}
      paginate={paginate}
      />
    </>
  );
}