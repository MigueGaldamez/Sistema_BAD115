import React, { useState, useEffect } from 'react';
import Pagination from '../../componentes/Paginacion/paginacion';
export default function DatatableRoles(
  { data,
    eliminarRegistro,
    actualizarRegistro,
    setNuevoNombre,
    setNuevaArea,
    setNuevoTipo,
    setPoblacion,
    setUnidad,
    setMinval,
    setMaxval,
    unidadLista,
    poblacionLista,
    areaLista,
    areas,
    errores,
    setNuevoMensajePosi,
    setNuevoMensajeNega,
    nuevoMensajePosi,
    nuevoMensajeNega,
    nuevoTipo,
    agregarALista,
    intervalosP,
    setIntervalosP,
    eliminardeLista
  }) {
  
  const dataOriginal = data;
  const [paginaActual, setPaginaActual] = useState(1);
  const [registrosXpagina] = useState(15);
  
  //Obtener los actuales 
  const indexUltimoRegistro = paginaActual * registrosXpagina;
  const indicePrimerRegistro = indexUltimoRegistro - registrosXpagina;
  data = data.slice(indicePrimerRegistro, indexUltimoRegistro);

  //Cambiar de pagina 
  const paginate = numeroPagina => setPaginaActual(numeroPagina);

  const [registro, setRegistro] = useState([]);
  function abrirmodal(id){
    var valor = dataOriginal.find(x => x.idparametro == id ); 
    setRegistro(valor);
    setNuevoTipo(valor.tipo);
    if(valor.intervalos.length>0){
      setNuevoMensajeNega(valor.intervalos[0].comentarionegativo);
      setNuevoMensajePosi(valor.intervalos[0].comentariopositivo)
     
      for(const intervalo of valor.intervalos){
        var Intervalo={};
        Intervalo.maxval = intervalo.valormaximo;
        Intervalo.minval = intervalo.valorminimo;
        Intervalo.id = intervalo.idpoblacion;
        Intervalo.idunidad = intervalo.idunidad;
        if( intervalo.idpoblacion!=0){
        Intervalo.valor = poblacionLista.find(x => x.idpoblacion == intervalo.idpoblacion ).poblacion;
        }else{
          Intervalo.valor = "Todas las poblaciones";
        }
      
        Intervalo.unidad = unidadLista.find(x => x.idunidad == intervalo.idunidad ).simbolo;    
        intervalosP.push(Intervalo);
      }
    
      console.log(valor.intervalos);
    }
  }
  const columns = data[0] && Object.keys(data[0]);
  return (
    <>
    <table class="table table-striped mt-4 table-hover table-responsive-lg" cellPadding={0} cellSpacing={0}>
      <thead class="table-dark">
        <tr>
          {data[0] && columns.map((heading) => {
             if(heading!='idarea' && heading!='idparametro' && heading!='iddetalle'  && heading!='intervalos')
            return(<th>{heading}</th>)
            })}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row,key) =>{  const id = row['idparametro'];  return(
          <tr  key={key}>
           
            {columns.map((column) => {
              
            if(column=='parametro')
            return(
                
              <td> <input type="text" class="form-control form-control-sm" onChange={(event)=>{
                setNuevoNombre(event.target.value)
                }} key={id} defaultValue={row[column]} /></td>
             
            )
            if(column=='area')
            return(
                <td>
                  <select class="form-select form-select-sm" aria-label="Default select example" onChange={(event)=>{
                setNuevaArea(event.target.value)}}>
                   
                    {areas.map((area) => {
                      if(row['idarea']==area.idarea)
                    
                    return(  <option selected value={area.idarea}>{area.nombrearea}</option>)
                    if(row['idarea']!=area.idarea)
                    
                    return(  <option  value={area.idarea}>{area.nombrearea}</option>)
                    })}
                  </select>
                </td>
             
             
            )
            if(column=='tipo')
            return(
                
              <td> 
                   <select class="form-select form-select-sm" defaultValue={row[column]} onChange={(event)=>{
                setNuevoTipo(event.target.value)
                }}> 
                       <option value="1">Intervalo</option>
                       <option value="2">Por opción</option>
                   </select>
                </td>
             
            )})}
              <td  >
              <a class="btn btn-success btn-sm mx-1" onClick={()=>{actualizarRegistro(id)}}>Actualizar</a>
              <a class="btn btn-danger btn-sm mx-1" data-bs-toggle="modal" data-bs-target={'#eliminarModal'+id} >Eliminar</a>
              <a class="btn btn-dark btn-sm mx-1" data-bs-toggle="modal"data-bs-target={'#parametrosM'} onClick={()=>{abrirmodal(id)}}>Modificar</a>
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
                        <li>{row['parametro']}</li>  
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
     <div class="modal fade" id='parametrosM' tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Modificar parametro</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                   
                      <h6><span>El parametro <span class="text-primary text-decoration-underline"></span> tiene los siguientes datos:</span></h6>
                        {/*aquii*/}
                        <form id="formulario" onSubmit={actualizarRegistro}>
                  {/*Aqui*/}
                  <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                      <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane2" type="button" role="tab" aria-controls="home-tab-pane2" aria-selected="true"><span class="badge bg-info py-1 px-2">1</span> Datos de parametro</button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane2" type="button" role="tab" aria-controls="profile-tab-pane2" aria-selected="false"><span class="badge bg-info py-1 px-2">2</span> Detalles</button>
                    </li>
                  
                  </ul>
                  <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active mt-2" id="home-tab-pane2" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                      <div class="row">
                        <div class="col col-6">
                      
                          <label for="exampleInputEmail1" class="form-label">Nombre Parametro:</label>
                          <input type="text" defaultValue={registro.parametro} class="form-control form-control-sm" placeholder='Ingrese un nuevo parametro' onChange={(event)=>{ setNuevoNombre(event.target.value)}}/>        
                            { 
                            errores.nombre &&
                          <p><small class="text-danger">* {errores.nombre}</small></p>
                          }
                        </div>
                        <div class="col col-6">
                          <label for="" class="form-label">Area:</label>
                          
                          <select class="form-select form-select-sm" aria-label="Default select example" onChange={(event)=>{
                            setNuevaArea(event.target.value)}} >
                              <option selected>Seleccione un Area</option>
                                {areaLista.map((area) => {
                                  if(area.idarea == registro.idarea){
                                    return(  <option selected value={area.idarea}>{area.nombrearea}</option>)
                                  }
                                  if(area.idarea != registro.idarea){
                                    return(  <option  value={area.idarea}>{area.nombrearea}</option>)
                                  }
                                })}
                              </select>        
                            { 
                            errores.area &&
                          <p><small class="text-danger">* {errores.area}</small></p>
                            }
                        </div>
                   
                        <div class="col col-6 mt-3">
                          <label for="exampleInputEmail1" class="form-label">Mensaje positivo:</label>
                          <input type="text" defaultValue={nuevoMensajePosi} class="form-control form-control-sm" placeholder='Ingrese un mensaje positivo' onChange={(event)=>{ setNuevoMensajePosi(event.target.value)}}/>        
                            { 
                            errores.positivo &&
                          <p><small class="text-danger">* {errores.positivo}</small></p>
                          }
                        </div>
                        <div class="col col-6 mt-3">
                          <label for="exampleInputEmail1" class="form-label">Mensaje negativo:</label>
                          <input type="email" defaultValue={nuevoMensajeNega} class="form-control form-control-sm" placeholder='Ingrese un mensaje negativo' onChange={(event)=>{ setNuevoMensajeNega(event.target.value)}}/>        
                            { 
                            errores.positivo &&
                          <p><small class="text-danger">* {errores.positivo}</small></p>
                          }
                        </div>
                      </div>
                    </div>
                    <div class="tab-pane fade" id="profile-tab-pane2" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                    <div class="row">
                 
                    

                 

                 <div class="col col-6 mx-auto">
                     <label class="form-label mt-3">Tipo Parametro:</label>
                     {registro.tipo==1 &&
                        <select class="form-select form-select-sm" onChange={(event)=>{setNuevoTipo(event.target.value)}}> 
                       
                        <option value="1" selected>Intervalo</option>
                        <option value="2">Por opción</option>
                    </select>}
                    {registro.tipo==2 &&
                        <select class="form-select form-select-sm" onChange={(event)=>{setNuevoTipo(event.target.value)}}> 
                       
                        <option value="1">Intervalo</option>
                        <option value="2"  selected>Por opción</option>
                    </select>}
                
                 
                   { 
                     errores.tipo &&
                   <p><small class="text-danger">* {errores.tipo}</small></p>
                   }
                 </div>
               </div>
               {nuevoTipo ==1 &&
               <div >
                  
                
                  <form id="intervalos" class="row">
                  <hr class="mt-3 px-4"/>
                 <div class="col col-6">
                   <label for="exampleInputEmail1" class="form-label">Valor minimo:</label>
                   <input type="number" class="form-control form-control-sm" placeholder='Ingrese el valor minimo' onChange={(event)=>{ setMinval(event.target.value)}}/>        
                     { 
                     errores.minimo &&
                   <p><small class="text-danger">* {errores.minimo}</small></p>
                   }
                 </div>
                 <div class="col col-6">
                   <label for="exampleInputEmail1" class="form-label">Valor maximo :</label>
                   <input type="number" class="form-control form-control-sm" placeholder='Ingrese el valor maximo' onChange={(event)=>{ setMaxval(event.target.value)}}/>        
                     { 
                     errores.maximo &&
                   <p><small class="text-danger">* {errores.maximo}</small></p>
                   }
                 </div>

                 <div class="col col-6 ">
                   <label for="" class="form-label">unidad de medida:</label>
                   <select class="form-select form-select-sm" aria-label="Default select example" onChange={(event)=>{
                     setUnidad(event.target.value)}}>
                       <option selected>Seleccione la unidad de medida</option>
                         {unidadLista.map((unidad) => {
                         
                         
                         return(  <option  value={unidad.idunidad}>{unidad.nombreunidad}</option>)
                         })}
                       </select>        
                     { 
                     errores.unidad &&
                   <p><small class="text-danger">* {errores.unidad}</small></p>
                     }
                 </div>
                 <div class="col col-6 ">
                   <label for="" class="form-label">población:</label>
                   <select class="form-select form-select-sm" aria-label="Default select example" onChange={(event)=>{
                     setPoblacion(event.target.value)}}>
                       <option selected value="0" >Todas las poblaciones</option>
                         {poblacionLista.map((registro) => {
                         
                         
                         return(  <option  value={registro.idpoblacion}>{registro.poblacion}</option>)
                         })}
                       </select>        
                     { 
                     errores.poblacion &&
                   <p><small class="text-danger">* {errores.poblacion}</small></p>
                     }
                 </div>
                 </form>
                <div>
                <a class="btn btn-success mt-2 btn-sm" onClick={agregarALista}> Agregar</a>
                </div>
                <div class="row">
                  {intervalosP.length>0 && <span class="mt-3"><b>Intervalos ingresados</b></span>}
                  {intervalosP.map((registro,index) => {
                    return(
                    <div class="col-6 px-2">
                      <div class="border border-success p-2 mb-2 border-opacity-50 rounded ">
                       <small><span><b>{registro.valor}</b> desde <b>{registro.minval} ({registro.unidad})</b> hasta  <b>{registro.maxval} ({registro.unidad})</b></span></small> 
                        <button type="button" class="btn-close end-0" aria-label="Close" onClick={()=>{eliminardeLista(index)}}></button>
                      </div>
                    </div>)
                  })}
                </div>
               </div>
               
               }
               {nuevoTipo ==2 &&
               <div class="text-center mt-2">
                <h6>- Por opción indica si se encuentran presentes o no en la muestra.</h6>
               </div>
             
               }
              
                    </div>
                  </div>
                  {/*hasta aqui*/}
               
                </form> 
                        {/*hasta*/}
                  
                    
              
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                      <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={()=>{actualizarRegistro(registro.idparametro)}}  >Guardar Cambios</button>
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