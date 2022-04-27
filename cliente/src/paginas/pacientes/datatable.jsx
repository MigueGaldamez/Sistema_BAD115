import React, { useState, useEffect } from 'react';
import Pagination from '../../componentes/Paginacion/paginacion';
import Moment from 'moment';
export default function DatatableRoles(
  { data,
    eliminarRegistro,
    actualizarRegistro,
    setNuevoNombre,
    setNuevoIdMunicipio,
    municipios,
  setNuevoEstado,
setNuevoApellido,
setNuevaDireccion,
setNuevaFechaNacimiento,
setNuevoCorreo,
estados,
 }) {
  Moment.locale('es');
  const dataOriginal = data;
  const [paginaActual, setPaginaActual] = useState(1);
  const [registrosXpagina] = useState(15);

  //Obtener los actuales 
  const indexUltimoRegistro = paginaActual * registrosXpagina;
  const indicePrimerRegistro = indexUltimoRegistro - registrosXpagina;
  data = data.slice(indicePrimerRegistro, indexUltimoRegistro);

  //Cambiar de pagina 
  const paginate = numeroPagina => setPaginaActual(numeroPagina);

  const columns = data[0] && Object.keys(data[0]);
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
                setNuevoIdMunicipio(event.target.value)}}>
                   
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
              <a class="btn btn-dark btn-sm mx-1" data-bs-toggle="modal" data-bs-target={'#eliminarModal'+id} >Modificar</a>
              
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
                            <small><b>Nacimiento:</b> {Moment(row['fechanacimiento']).format('dddd DD MMMM')}</small>
                            
                        
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
    <Pagination 
      registrosPorPagina={registrosXpagina}
      registrosTotales={dataOriginal.length}
      paginate={paginate}
      />
    </>
  );
}