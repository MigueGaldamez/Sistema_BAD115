import React, { useState, useEffect } from 'react';
import Pagination from '../../componentes/Paginacion/paginacion';
export default function DatatableRoles(
  { data,
    eliminarRegistro,
    actualizarRegistro,
    setNuevoNombre,
    parametroLista,
    consultarParametros,
    areaLista,
    setNuevosParametros,
    nuevosParametros,
    validarLista
     }) {
  
  const dataOriginal = data;
  const [paginaActual, setPaginaActual] = useState(1);
  const [areaActual, setAreaActual] = useState("");
  const [parametrosActual, setParametrosActual] = useState([]);
  const [registrosXpagina] = useState(15);

  //Obtener los actuales 
  const indexUltimoRegistro = paginaActual * registrosXpagina;
  const indicePrimerRegistro = indexUltimoRegistro - registrosXpagina;
  data = data.slice(indicePrimerRegistro, indexUltimoRegistro);

  //Cambiar de pagina 
  const paginate = numeroPagina => setPaginaActual(numeroPagina);

  const  consultarPara=(id)=>{
    var idarea = dataOriginal.find(x => x.idexamen == id).idarea;
    var area = areaLista.find(x => x.idarea == idarea).nombrearea;
    var parametros = dataOriginal.find(x => x.idexamen == id).parametros;
    setParametrosActual(parametros);
    setAreaActual(area);
    consultarParametros(idarea);
    setNuevosParametros(parametros);
  }

  const columns = data[0] && Object.keys(data[0]);
  return (
    <>
    <table class="table table-striped mt-4 table-hover table-responsive-lg" cellPadding={0} cellSpacing={0}>
      <thead class="table-dark">
        <tr>
          {data[0] && columns.map((heading) => {
             if(heading!='idexamen'&&heading!='idarea'&&heading!='parametros'  && heading!='fechaactualizacion' && heading!='fechacreacion')
            return(<th>{heading}</th>)
            })}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) =>{  const id = row['idexamen'];  return(
          <tr>
           
            {columns.map((column) => {
              
            if(column=='nombreexamen')
            return(
                
              <td> <input type="text" class="form-control form-control-sm" onChange={(event)=>{
                setNuevoNombre(event.target.value)
                }} key={id} defaultValue={row[column]} /></td>
             
            )
           
            if(column=='area')
            return(
                
              <td> <input type="text" class="form-control form-control-sm" key={id} defaultValue={row[column]} disabled /></td>
           
            )})}
              <td  >
              {validarLista.includes(55) &&
              <a class="btn btn-success btn-sm mx-1" onClick={()=>{actualizarRegistro(id)}}>Actualizar</a>}
              {validarLista.includes(56) &&
              <a class="btn btn-danger btn-sm mx-1" data-bs-toggle="modal" data-bs-target={'#eliminarModal'+id} >Eliminar</a>
              }{validarLista.includes(55) &&<a class="btn btn-dark btn-sm mx-1" data-bs-toggle="modal" data-bs-target={'#modificarmodal'}  onClick={()=>{consultarPara(id)}}>Modificar Parametros</a>}
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
                        <li>{row['nombreexamen']}</li>  
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
    <div class="modal fade" id={'modificarmodal'} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Modificar examen</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body px-5">
                    <h5>Parametros de <span class="text-primary text-decoration-underline">{areaActual} </span></h5>
                   
                    {parametrosActual.map((parametro,index) => {
                        if(index==0){
                          return(<div class="row" key={parametro}>
                          {parametroLista.map((parametro,index) => {
                              var permitido = true;
                              if(parametrosActual.includes(parametro.idparametro)){
                                permitido = true;
                              }else
                              {permitido=false;}
                            return( 
                            <div class="form-check col col-6"  key={parametro}>
                              <input class="form-check-input" defaultChecked={permitido} value={parametro.idparametro} type="checkbox"  id="flexCheckDefault"/>
                              <label class="form-check-label" for="flexCheckDefault">
                              {parametro.parametro}
                              </label>
                            </div>
                            )})}
                      
                          </div>)
                        }})}
                     {parametrosActual.length==0 && 
                      <div class="">
                      {parametroLista.map((parametro,index) => 
                       {
                         var permitido = false;
                         return(
                           <div class="form-check"  key={parametro}>
                              <input class="form-check-input" defaultChecked={permitido} value={parametro.idparametro} type="checkbox"  id="flexCheckDefault"/>
                              <label class="form-check-label" for="flexCheckDefault">
                              {parametro.parametro} , {parametro.idparametro}
                              </label>
                            </div>
                         )
                        })}
                    </div>}
                   
                    
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                      <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={()=>{eliminarRegistro(1)}}>Guardar cambios</button>
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