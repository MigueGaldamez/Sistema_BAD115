import React, { useState, useEffect } from 'react';
import Pagination from '../../componentes/Paginacion/paginacion';
export default function DatatableRoles(
  { data,
    eliminarRegistro,
    actualizarRegistro,
    setNuevoNombre,
    setNuevoIdDepartamento,
    departamentos, }) {
  
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
    <table class="table table-striped mt-4 table-hover" cellPadding={0} cellSpacing={0}>
      <thead class="table-dark">
        <tr>
          {data[0] && columns.map((heading) => {
             if(heading!='iddepartamento')
            return(<th>{heading}</th>)
            })}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) =>{  const id = row['idmunicipio'];  return(
          <tr>
           
            {columns.map((column) => {
              
            if(column!='idmunicipio' && column!='iddepartamento' &&  column!='departamento')
            return(
                
              <td> <input type="text" class="form-control form-control-sm" onChange={(event)=>{
                setNuevoNombre(event.target.value)
                }} key={id} defaultValue={row[column]} /></td>
             
            )
            if(column=='departamento')
            return(
                <td>
                  <select class="form-select form-select-sm" aria-label="Default select example" onChange={(event)=>{
                setNuevoIdDepartamento(event.target.value)}}>
                   
                    {departamentos.map((departamento) => {
                      if(row['iddepartamento']==departamento.iddepartamento)
                    
                    return(  <option selected value={departamento.iddepartamento}>{departamento.departamento}</option>)
                    if(row['iddepartamento']!=departamento.iddepartamento)
                    
                    return(  <option  value={departamento.iddepartamento}>{departamento.departamento}</option>)
                    })}
                  </select>
                </td>
              /*<td> <input type="s" class="form-control form-control-sm" onChange={(event)=>{
                setNuevoNombre(event.target.value)
                }} key={id} defaultValue={row[column]} /></td>*/
             
            )
            if(column=='idmunicipio')
            return(
                
              <td>{row[column]}  </td>
           
            )})}
            <td  >
              <a class="btn btn-success btn-sm mx-1" onClick={()=>{actualizarRegistro(id)}}>Actualizar</a>
              <a class="btn btn-danger btn-sm mx-1" data-bs-toggle="modal" data-bs-target={'#eliminarModal'+id} >Eliminar</a>
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
                        <li>{row['municipio']}</li>  
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
    <Pagination 
      registrosPorPagina={registrosXpagina}
      registrosTotales={dataOriginal.length}
      paginate={paginate}
      />
    </>
  );
}