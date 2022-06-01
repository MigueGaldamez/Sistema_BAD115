import React, { useState, useEffect } from 'react';
import Pagination from '../../componentes/Paginacion/paginacion';
import Moment from 'moment';
export default function DatatableRoles({ 
  data, 
  resultadosLista,
  areas, 
  eliminarRegistro,
  actualizarRegistro,
  setNuevoNombreExamen,
  setNuevaArea, 
  abrirModalRegistro, 
  abrirModalVerResultados,
  setNuevoNombre, 
  setNuevoApellido, 
  setNuevaFechaNacimiento,
  obtenerParametros,
  obtenerResultados,
  parametroLista,
  intervalosLista,
  opcionesLista,
  guardar,
  modificar,
  eliminar,
  generarReporteResultados
  }) {
  
  const dataOriginal = data;

  const [valores, setvalores] = useState([]);
  const [valoresResultado, setvaloresResultado] = useState([]);


  const columns = data[0] && Object.keys(data[0]);

  const abrirModalRegistrar=(id)=>{
    var result = dataOriginal.find(obj => {
      return obj.iddetalle === id;
    })

    obtenerParametros(result.idexamen);
    setvalores(result);
    abrirModalRegistro();
  }

  const abrirModalResultados=(id)=>{
    //console.log(dataOriginal);
    var result = dataOriginal.find(obj => {
      return obj.iddetalle === id;
    })

    obtenerParametros(result.idexamen);
    obtenerResultados(result.iddetalle);
    setvalores(result);
    abrirModalVerResultados();
  }
  
  return (
    <>
    <table class="table table-striped mt-0 table-hover table-responsive-lg" cellPadding={0} cellSpacing={0}>
      <thead class="table-dark">
        <tr>
        {data[0] && columns.map((heading) => {
             if(heading!='idarea' && heading!='iddetalle'  && heading!='idexamen' && heading!='idchequeo' && heading!='idpaciente' && heading!='idlaboratorio' 
             && heading!='idusuario' && heading!='fechachequeo'  && heading!='horachequeo' && heading!='archivo' && heading!='estadochequeo' && heading!='idmunicipio' 
             && heading!='idestado' && heading!='nombrepaciente'  && heading!='apellido' && heading!='direccion' && heading!='fechanacimiento' && heading!='correopaciente'
             && heading!='observaciones' && heading!='fechaingreso'  && heading!='horaingreso' && heading!='idmuestra' && heading!='nombrelaboratorio'
             && heading!='idresultado' && heading!='idparametro'  && heading!='valor' && heading!='positivo' && heading!='comentario' && heading!='presencia' 
             && heading!='genero' && heading!='fecharegistro' && heading!='horaregistro' && heading!='nombreusuario')
            return(<th>{heading}</th>)
            })}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
      {data.map((row) =>{  const id = row['iddetalle']; const idarea = row['idarea'];  return(
          <tr>
           
            {columns.map((column) => {
            
            if(column=='nombreexamen')
            return(
                
              <td>{row[column]}</td>
           
            )

            if(column=='nombrearea')
            return(
                
              <td>{row[column]}</td>
           
            )
            if(column=='estadoexamen')
            return(
                
              <td>
                {row[column]==true?
                <label class="form-check-label" for="flexCheckDefault">Finalizado</label>
                :<label class="form-check-label" for="flexCheckDefault">Pendiente</label>}
              </td>
           
            )
            })}

            <td>
            {row['idmuestra']==null?<p class="mx-1"><i>No se encontró muestra</i></p>: null}
            {(row['idmuestra']!=null && row['estadoexamen']==false)?<a class="btn btn-success btn-sm mx-1" onClick={()=>{abrirModalRegistrar(id)}}>Registrar resultados</a>: null}
            {(row['estadoexamen']==true)?<a class="btn btn-success btn-sm mx-1" onClick={()=>{abrirModalResultados(id)}}>Ver resultados</a>: null}
            </td>

            
          </tr>
        )})}
        {data.length ==0 && 
        <tr><td class="text-center">Debe seleccionar un paciente</td></tr>
        }
      </tbody>
    </table>
    {/* modal de registro de examen  */}
    <div class="modal fade" id="registrarResultados" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"  data-bs-backdrop="static">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Registro de resultados de {valores.nombreexamen}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row px-2">
              <div class="bordeLateral"><h6>Información del paciente:</h6></div>
              <div class="col col-12">
                <p class="m-0 mt-1 ml-2"><b>Nombre: </b>{valores.nombrepaciente + ' ' + valores.apellido}</p>
              </div>
              <div class="col col-4">
                <p class="m-0 ml-2"><b>Edad: </b>{Moment().diff(valores.fechanacimiento, 'years')} años </p> 
                <p class="m-0 ml-2"><b>Genero: </b>{valores.genero}</p>
                
              </div>
              <div class="col col-8">
                <p class="m-0 ml-2"><b>Ingreso de muestra: </b>{Moment(valores.fechaingreso).format('DD/MM/YYYY')}&nbsp;&nbsp;&nbsp;{valores.horaingreso}</p>
                <p class="m-0 ml-2"><b>Laboratorio: </b>{valores.nombrelaboratorio}</p>
                <p class="m-0"></p>
              </div>
            </div>
            <br></br>
            <form id="formulario">
              <div class="row px-2">
                <div class="bordeLateral"><h6>Resultados:</h6></div>
                
                {parametroLista.map((row) =>{  const id = row['idparametro'];  return(
                  
                    row['tipo']==1?
                    <div class="col col-6">
                      <div class="mt-3 ml-3">
                          <label for="exampleInput" class="form-label">{row['parametro']}</label>
                          <div class="row">
                            <div class="col col-5">
                              <select id={row["parametro"]} class="form-select form-select-sm" aria-label="Default select example" onChange="">
                                <option value='0' selected>Seleccione una opcion </option>
                                  {opcionesLista.map((opcion) => {
                                  
                                  if(opcion.idparametro === row['idparametro']){
                                      return(  <option value={opcion.idopcion}>{opcion.opcion}</option>)
                                  }
                                
                                  })}
                              </select>
                            </div>
                            <div class="col col-6">
                              <input type="text" id={'comentario_'+row["parametro"]} class="form-control form-control-sm"  aria-label="dfg"/>
                            </div>
                            <div class="col col-12">
                              {opcionesLista.map((opcion) => {
                                  if((opcion.idparametro === row['idparametro'] && opcion.referencia === true)){
                                            
                                    return(  
                                      <p class="m-0 ml-3 text-black-50 fs-6 fst-italic">Valor de referencia: {opcion.opcion}</p>
                                    )
                                  }
                              })}
                            </div>
                          </div> 
                          

                      </div>
                    </div>
                    : row['tipo']==2?
                    <div class="col col-6">
                      <div class="mt-3 ml-3">
                          <label for="exampleInput" class="form-label">{row['parametro']}</label>
                          <div class="row">
                            <div class="col col-5">
                              {intervalosLista.map((intervalo) => {
                                  
                                  if(intervalo.idparametro === row['idparametro']){
                                      return(  
                                        <div class="input-group input-group-sm">
                                          <input id={row["parametro"]} type="text" class="form-control" aria-label="dfg"></input>
                                          <span class="input-group-text">{intervalo.simbolo}</span>
                                        </div>
                                      )
                                  }
                               })}
                            </div>
                            <div class="col col-6">
                              <input type="text" id={'comentario_'+row["parametro"]} class="form-control form-control-sm"  aria-label="dfg"/>
                            </div>
                            <div class="col col-12">
                              {intervalosLista.map((intervalo) => {
                                  if(intervalo.idparametro === row['idparametro']){
                                    return(  
                                    <p class="m-0 ml-3 text-black-50 fs-6 fst-italic">Valor de referencia: {intervalo.valorminimo} - {intervalo.valormaximo}</p>
                                    )
                                  }
                              })}
                            </div>
                          </div> 
                          
                          
                      </div>
                    </div>
                    : null  
                  
                )})}
              </div>
              <div>
                <p id="errores"></p>
              </div>
            </form>
            
          </div>
          <div class="modal-footer">
            <a type="btn" class="btn btn-secondary" data-bs-dismiss="modal" >Cancelar</a>
            <a type="btn btn-success" class="btn btn-primary" onClick={()=>{guardar(valores.iddetalle, valores.idchequeo)}}>Guardar</a>
          </div>
        </div>
      </div>
    </div>
    {/* FINAL modal de registro de examen  */}

    {/* modal de mostrar resultados de examen  */}
    <div class="modal fade" id="verResultados" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Resultados de {valores.nombreexamen}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row px-2">
              <div class="bordeLateral"><h6>Información del paciente:</h6></div>
              <div class="col col-12">
                <p class="m-0 mt-1"><b>Nombre: </b>{valores.nombrepaciente + ' ' + valores.apellido}</p>
              </div>
              <div class="col col-6">
                <p class="m-0"><b>Edad: </b>{Moment().diff(valores.fechanacimiento, 'years')} años </p> 
                <p class="m-0" ><b>Genero: </b>{valores.genero}</p>
                <p class="m-0" ><b>Fecha resultados: </b>{Moment(valores.fecharegistro).format('DD/MM/YYYY')}&nbsp;&nbsp;&nbsp;{valores.horaregistro}</p>
              </div>
              <div class="col col-6">
                <p class="m-0 "><b>Ingreso de muestra: </b>{Moment(valores.fechaingreso).format('DD/MM/YYYY')}&nbsp;&nbsp;&nbsp;{valores.horaingreso}</p>
                <p class="m-0 "><b>Laboratorio: </b>{valores.nombrelaboratorio}</p>
                <p class="m-0 "><b>Laboratorista: </b>{valores.nombreusuario}</p>
              </div>
            </div>
            <br></br>

            <form id="mod_formulario">
              <div class="row px-2">
                <div class="bordeLateral"><h6>Resultados:</h6></div>
                
                {parametroLista.map((row) =>{  const id = row['idparametro'];  return(
                  
                    row['tipo']==1?
                    <div class="col col-6">
                      <div class="mt-3 ml-3">
                          <label for="exampleInput" class="form-label">{row['parametro']}</label>
                          <div class="row">
                            <div class="col col-5">
                              <select id={'mod_'+row["parametro"]} class="form-select form-select-sm" aria-label="Default select example" onChange="">
                                <option value='0' selected>Seleccione una opcion </option>

                                  {opcionesLista.map((opcion) => {
                                  
                                  if((opcion.idparametro === row['idparametro'] /*&& opcion.opcion === valores.comentario*/)){
                                      
                                    return(  
                                        resultadosLista.map((result) => {
                                          if(id===result.idparametro && opcion.opcion === result.opcion){
                                            return(<option value={opcion.idopcion} selected>{opcion.opcion}</option>)
                                          }
                                          if(id===result.idparametro && opcion.opcion !== result.opcion){
                                            return(<option value={opcion.idopcion}>{opcion.opcion}</option>)
                                          }
                                        })
                                      )
                                  }
                                
                                  })}
                              </select>
                            </div>
                            <div class="col col-6">
                              {resultadosLista.map((result) => {
                                if(id===result.idparametro && valores.iddetalle===result.iddetalle){
                                  return(<input defaultValue={result.comentario} type="text" id={'mod_comentario_'+row["parametro"]} class="form-control form-control-sm"  aria-label="dfg"/>)
                                }
                              })}
                            
                            </div>
                          
                            <div class="col col-12">
                              {opcionesLista.map((opcion) => {
                                if((opcion.idparametro === row['idparametro'] && opcion.referencia === true)){
                                          
                                  return(  
                                    <p class="m-0 ml-3 text-black-50 fs-6 fst-italic">Valor de referencia: {opcion.opcion}</p>
                                  )
                                }
                              })}
                                
                            </div>
                          </div>
                      </div>
                    </div>
                    : row['tipo']==2?
                    <div class="col col-6">
                      <div class="mt-3 ml-3">
                          <label for="exampleInput" class="form-label">{row['parametro']}</label>
                          <div class="row">
                            <div class="col col-5">
                              {intervalosLista.map((intervalo) => {
                                  
                                  if(intervalo.idparametro === row['idparametro']){
                                      return(  
                                        resultadosLista.map((result) => {
                                          if(result.idparametro === id){
                                            return(
                                            <div class="input-group input-group-sm">
                                              <input defaultValue={result.valor} id={'mod_'+row["parametro"]} type="text" class="form-control" aria-label="dfg"></input>
                                              <span class="input-group-text">{intervalo.simbolo}</span>
                                            </div>)
                                          }
                                        })
                                      
                                      )
                                  }
                              
                                })}
                            </div>
                            <div class="col col-6">
                              {resultadosLista.map((result) => {
                                  if(result.idparametro === id){
                                    return(<input  defaultValue={result.comentario} type="text" id={'mod_comentario_'+row["parametro"]} class="form-control form-control-sm"  aria-label="dfg"/>)
                                  }
                                })
                              }
                              
                            </div>
                            <div class="col col-12">
                              {intervalosLista.map((intervalo) => {
                                if(intervalo.idparametro === row['idparametro']){
                                  return(  
                                  <p class="m-0 ml-3 text-black-50 fs-6 fst-italic">Valor de referencia: {intervalo.valorminimo} - {intervalo.valormaximo}</p>
                                  )
                                }
                            })}
                            </div>
                          </div> 
                          
                          
                          
                      </div>
                    </div>
                    : null  
                  
                )})}
              </div>
              <div>
                <p id="mod_errores"></p>
              </div>
            </form>
            
          </div>
          <div class="modal-footer">
            
            <a type="btn btn-success" class="btn btn-success col-auto me-auto " onClick={()=>{generarReporteResultados(valores, resultadosLista, parametroLista, intervalosLista, opcionesLista)}}>Mostrar PDF</a>
            <a type="btn" class="btn btn-secondary col-auto" data-bs-dismiss="modal" >Cancelar</a>
            <a type="btn btn-danger" class="btn btn-danger col-auto" onClick={()=>{eliminar(valores.iddetalle, valores.idchequeo)}}>Eliminar</a>
            <a type="btn btn-success" class="btn btn-primary col-auto" onClick={()=>{modificar(valores.iddetalle, valores.idchequeo)}}>Modificar</a>
          </div>
        </div>
      </div>
    </div>
    {/* FINAL modal mostrar resultados de examen  */}

    </>
  );
}