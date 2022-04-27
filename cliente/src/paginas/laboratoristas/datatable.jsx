import React, { useState, useEffect } from 'react';
import Pagination from '../../componentes/Paginacion/paginacion';
export default function DatatableRoles({ data,eliminarRegistro,actualizarRegistro,setNuevoNumeroJunta,usuarios,setNuevoUsuario,setNuevaProfesion,profesiones }) {
  
  const dataOriginal = data;
  const [paginaActual, setPaginaActual] = useState(1);
  const [registrosXpagina] = useState(5);

  // obtener los actuales
  const indexUltimoRegistro = paginaActual * registrosXpagina;
  const indicePrimerRegistro = indexUltimoRegistro - registrosXpagina;
  data = data.slice(indicePrimerRegistro, indexUltimoRegistro);
 
    // cambiar pagina
  const paginate = numeroPagina => setPaginaActual(numeroPagina);

  const columns = data[0] && Object.keys(data[0]);
  return (
    <>
    <table class="table table-striped mt-3 table-hover table-responsive-lg" cellPadding={0} cellSpacing={0}>
      <thead class="table-dark">
        <tr>
        {data[0] && columns.map((heading) => {
             if(heading!='idprofesion' && heading!='infoprofesion' &&   heading!='infousuario'  &&   heading!='idusuario' )
            return(<th>{heading}</th>)
            })}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        
        {data.map((row,index) =>{  const id = row['idlaboratorista'];  return(
          <tr key={index}>
            {columns.map((column,index) => {
              
              if(column=='profesion')
                return(              
                  <td>
                    <select class="form-select form-select-sm" aria-label="Default select example" onChange={(event)=>{
                  setNuevaProfesion(event.target.value)}}>
                    
                      {profesiones.map((profesion) => {
                        if(row['idprofesion']==profesion.idprofesion)
                      
                      return(  <option selected value={profesion.idprofesion}>{profesion.nombreprofesion}</option>)
                      if(row['idprofesion']!=profesion.idprofesion)
                      
                      return(  <option  value={profesion.idprofesion}>{profesion.nombreprofesion}</option>)
                      })}
                    </select>
                  </td>
                )
                if(column=='numerojuntavigilacia')
                return(              
                  <td key={index}><input type="text" class="form-control form-control-sm" onChange={(event)=>{
                    setNuevoNumeroJunta(event.target.value)
                    }} key={id} defaultValue={row[column]} /></td>
                )
                if(column=='usuario')
                return(              
                  <td>
                  <select class="form-select form-select-sm" aria-label="Default select example" onChange={(event)=>{
                setNuevoUsuario(event.target.value)}}>
                   <option selected value={row['idusuario']}>{row['usuario']}</option>
                    {usuarios.map((usuario) => {
              
                    if(row['idusuario']!=usuario.idusuario)
                    
                    return(  <option  value={usuario.idusuario}>{usuario.nombreusuario}</option>)
                    })}
                  </select>
                </td>
                )
                if(column=='idlaboratorista')
                return(
                    
                  <td key={index}>{row[column]}  </td>
              
                )})}
              <td >
              <a class="btn btn-success btn-sm mx-1" onClick={()=>{actualizarRegistro(id)}}>Actualizar</a>
              <a class="btn btn-danger btn-sm mx-1" data-bs-toggle="modal" data-bs-target={'#eliminarModal'+id} >Eliminar</a>
              </td>
        
              
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
                        <li> 
                          {row['usuario']}
                          
                        </li>  
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