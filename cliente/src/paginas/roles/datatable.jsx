import React, { useState, useEffect } from 'react';
import Pagination from '../../componentes/Paginacion/paginacion';
export default function DatatableRoles({ actualizaPermisos,nuevosPermisos,data,eliminarRegistro,actualizarRegistro,setNuevoNombre,permisos,setNuevosPermisos }) {
  
  const dataOriginal = data;
  const [paginaActual, setPaginaActual] = useState(1);
  const [rolM, setRolM] = useState([]);
  const [rolIdM, setRolIdM] = useState([]);
  const [permisosM, setPermisosM] = useState([]);
  const [registrosXpagina] = useState(5);

  // obtener los actuales
  const indexUltimoRegistro = paginaActual * registrosXpagina;
  const indicePrimerRegistro = indexUltimoRegistro - registrosXpagina;
  data = data.slice(indicePrimerRegistro, indexUltimoRegistro);

    // cambiar pagina
  const paginate = numeroPagina => setPaginaActual(numeroPagina);

  const establevervalores= (rol,permisos,id) => {
    setPermisosM(permisos);
    setRolM(rol);
    setRolIdM(id);
    setNuevosPermisos(permisos);
  };

   const manejarChecks= (event) => {
    var updatedList = [...nuevosPermisos];
    if (event.target.checked) {
      updatedList = [...nuevosPermisos, parseInt(event.target.value)];
      console.log(updatedList);
    } else {
      console.log(nuevosPermisos);
      updatedList.splice(nuevosPermisos.indexOf(parseInt(event.target.value)), 1);
    }
    setNuevosPermisos(updatedList);
  };
 
  const columns = data[0] && Object.keys(data[0]);
  return (
    <>
    
    <table class="table table-striped mt-3 table-hover table-responsive-lg" cellPadding={0} cellSpacing={0}>
      <thead class="table-dark">
        <tr>
        {data[0] && columns.map((heading) => {
             if(heading!='permisos' )
            return(<th>{heading}</th>)
            })}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        
        {data.map((row,index) =>{  const id = row['idrol'];  return(
          <tr key={index}>
            {columns.map((column,index) => {
              
                if(column=='nombrerol')
                return(              
                  <td key={index}><input type="text" class="form-control form-control-sm" onChange={(event)=>{
                    setNuevoNombre(event.target.value)
                    }} key={id} defaultValue={row[column]} /></td>
                )
                if(column=='idrol')
                return(
                    
                  <td key={index}>{row[column]}  </td>
              
                )})}
              <td  >
              <a class="btn btn-success btn-sm mx-1" onClick={()=>{actualizarRegistro(id)}}>Actualizar</a>
              <a class="btn btn-danger btn-sm mx-1" data-bs-toggle="modal" data-bs-target={'#eliminarModal'+id} >Eliminar</a>
              <a class="btn btn-warning btn-sm mx-1" data-bs-toggle="modal" data-bs-target={'#permisosM'}  onClick={()=>{establevervalores(row['nombrerol'],row['permisos'],row['idrol'])}} >Modificar Permisos</a>
              
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
                        <li>{row['nombrerol']}</li>  
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
     {/* Modal para permisos */}
     <div class="modal fade" id='permisosM' tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Modificar Permisos</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                   
                      <h6><span>¿El rol <span class="text-primary text-decoration-underline">{rolM}</span> tiene los siguientes permisos:</span></h6>
                    
                   
                  
                      {permisosM.map((permiso,index) => 
                      {
                        if(index==0)
                        {
                          return(
                            <div class="row px-4 pt-3" key={permiso}>
                               {permisos.map((permiso,index) => 
                                {
                                  var permitido = true;
                              
                                  if(permisosM.includes(permiso.idopcionpermiso)){
                                    permitido = true;
                                    console.log(permisosM);
                                  }else
                                  {permitido=false;}
                                  return(
                                    <div class="form-check col col-6" key={permiso}>
                                    <input class="form-check-input" type="checkbox" value={permiso.idopcionpermiso} id="flexCheckChecked" defaultChecked={permitido} onChange={manejarChecks} />
                                    <label class="form-check-label" for="flexCheckChecked">
                                    {permiso.accion}
                                   
                                    </label>
                                  </div>
                                    )
                                })}
                            </div>
                          )
                        }
                        
                      })}
                     {permisosM.length==0 && 
                      <div class="row px-4 pt-3">
                      {permisos.map((permiso,index) => 
                       {
                         var permitido = false;
                     
                      
                         return(
                           <div class="form-check col col-6" key={permiso}>
                           <input class="form-check-input" type="checkbox" value={permiso.idopcionpermiso} id="flexCheckChecked" defaultChecked={permitido} onChange={manejarChecks} />
                           <label class="form-check-label" for="flexCheckChecked">
                           {permiso.accion}
                          
                           </label>
                         </div>
                           )
                       })}
                   </div>}
              
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                      <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={()=>{actualizaPermisos(rolIdM)}}  >Guardar Cambios</button>
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