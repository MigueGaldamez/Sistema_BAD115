import React, { useState, useEffect } from 'react';
import Pagination from '../../componentes/Paginacion/paginacion';
export default function DatatableRoles(
  { data,
    eliminarRegistro,
    actualizarRegistro,
    setNuevoNombre,
    setNuevoCorreo,
    setNuevoLaboratorio,
    setNuevaContrasenia,
    setNuevoEstado,
   laboratorios,
  setNuevosRoles,
  roles,
  actualizaRoles,
  nuevosRoles,
 }) {
  
  const dataOriginal = data;
  const [paginaActual, setPaginaActual] = useState(1);
  const [registrosXpagina] = useState(15);

  const [usuarioM, setUsuarioM] = useState([]);
  const [usuarioIdM, setUsuarioIdM] = useState([]);
  const [rolesM, setRolesM] = useState([]);

  //Obtener los actuales 
  const indexUltimoRegistro = paginaActual * registrosXpagina;
  const indicePrimerRegistro = indexUltimoRegistro - registrosXpagina;
  data = data.slice(indicePrimerRegistro, indexUltimoRegistro);

  //Cambiar de pagina 
  const paginate = numeroPagina => setPaginaActual(numeroPagina);

  const establevervalores= (usuario,roles,id) => {
    setRolesM(roles);
    setUsuarioM(usuario);
    setUsuarioIdM(id);
    setNuevosRoles(roles);
  };

  const manejarChecks= (event) => {
    var updatedList = [...nuevosRoles];
    
    if (event.target.checked) {
      updatedList = [...nuevosRoles, parseInt(event.target.value)];
    } else {
      updatedList.splice(nuevosRoles.indexOf(parseInt(event.target.value)), 1);
    }
    setNuevosRoles(updatedList);
  };
  const columns = data[0] && Object.keys(data[0]);
  return (
    <>
    <table class="table table-striped mt-4 table-hover table-responsive-lg" cellPadding={0} cellSpacing={0}>
      <thead class="table-dark">
        <tr>
          {data[0] && columns.map((heading) => {
             if(heading!='contrasenia' && heading!='idlaboratorio'  && heading!='roles'  &&   heading!='infolaboratorio' && heading!='idusuario' )
            return(<th>{heading}</th>)
            })}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) =>{  const id = row['idusuario'];  return(
          <tr>
           
            {columns.map((column) => {
              
            if(column=='nombreusuario')
            return(
                
              <td> <input type="text" class="form-control form-control-sm" onChange={(event)=>{
                setNuevoNombre(event.target.value)
                }} key={id} defaultValue={row[column]} /></td>
             
            )
            if(column=='correousuario')
            return(
                
              <td> <input type="text" class="form-control form-control-sm" onChange={(event)=>{
                setNuevoCorreo(event.target.value)
                }} key={id} defaultValue={row[column]} /></td>
             
            )
            if(column=='estado')
            return(
                
              <td> <div class="form-check form-switch"><input type="checkbox"  role="switch" class="form-check-input" onChange={(event)=>{
                event.target.checked && setNuevoEstado(true);
                !event.target.checked && setNuevoEstado(false);
              }
                } key={id} defaultChecked={row[column]} />
                 <label class="form-check-label" for="flexCheckDefault">
                  Activo
                </label>
              </div>
              </td>
             
            )
            if(column=='laboratorio')
            return(
                <td>{}
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
            })}
            <td  >
              <a class="btn btn-success btn-sm mx-1" onClick={()=>{actualizarRegistro(id)}}>Actualizar</a>
              <a class="btn btn-danger btn-sm mx-1" data-bs-toggle="modal" data-bs-target={'#eliminarModal'+id} >Eliminar</a>
              <a class="btn btn-warning btn-sm mx-1" data-bs-toggle="modal" data-bs-target='#rolesM' onClick={()=>{establevervalores(row['nombreusuario'],row['roles'],row['idusuario'])}} >Editar Roles</a>
              
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
                        <li>{row['nombreusuario']}</li>  
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
     <div class="modal fade" id='rolesM' tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Modificar Permisos</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                   
                      <h6><span>¿El Usuario <span class="text-primary text-decoration-underline">{usuarioM}</span> tiene los siguientes roles:</span></h6>
                    
                  
                  
                      {rolesM.map((permiso,index) => 
                      {
                        if(index==0)
                        {
                          return(
                            <div class="row px-4 pt-3" key={permiso}>
                               {roles.map((rol,index) => 
                                {
                                  var permitido = true;
                              
                                  if(rolesM.includes(rol.idrol)){
                                    permitido = true;
                                  }else
                                  {permitido=false;}
                                  return(
                                    <div class="form-check col col-6" key={rol}>
                                    <input class="form-check-input" type="checkbox" value={rol.idrol} id="flexCheckChecked" defaultChecked={permitido} onChange={manejarChecks} />
                                    <label class="form-check-label" for="flexCheckChecked">
                                    {rol.nombrerol}
                                   
                                    </label>
                                  </div>
                                    )
                                })}
                            </div>
                          )
                        }
                        
                      })}
                      {rolesM.length==0 && 
                      <div class="row px-4 pt-3">
                      {roles.map((rol,index) => 
                       {
                         var permitido = false;
                     
                      
                         return(
                           <div class="form-check col col-6" key={rol}>
                           <input class="form-check-input" type="checkbox" value={rol.idrol} id="flexCheckChecked" defaultChecked={permitido} onChange={manejarChecks} />
                           <label class="form-check-label" for="flexCheckChecked">
                           {rol.nombrerol}
                          
                           </label>
                         </div>
                           )
                       })}
                   </div>}
                     
              
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                      <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={()=>{actualizaRoles(usuarioIdM)}}  >Guardar Cambios</button>
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