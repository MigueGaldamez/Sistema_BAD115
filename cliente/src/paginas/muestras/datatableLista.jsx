import React, { useState, useEffect } from 'react';
import Pagination from '../../componentes/Paginacion/paginacion';
import Moment from 'moment';
export default function DatatableRoles({ 
  data, 
  abrirModalRegistro, 
  abrirModalVerMuestra,
  guardar,
  eliminar,
  setObservaciones,
  errores,
  }) {
  const dataOriginal = data;
  const [paginaActual, setPaginaActual] = useState(1);
  const [registrosXpagina] = useState(5);
  
  // obtener los actuales
  const indexUltimoRegistro = paginaActual * registrosXpagina;
  const indicePrimerRegistro = indexUltimoRegistro - registrosXpagina;
  data = data.slice(indicePrimerRegistro, indexUltimoRegistro);
  
  const paginate = numeroPagina => setPaginaActual(numeroPagina);
  
  const [valores, setvalores] = useState([]);
  const columns = data[0] && Object.keys(data[0]);

  const abrirModalRegistrar=(id)=>{
    var result = dataOriginal.find(obj => {
      return obj.iddetalle === id;
    })

    setvalores(result);
    abrirModalRegistro();
  }

  const abrirModalMuestra=(id)=>{
    //console.log(dataOriginal);
    var result = dataOriginal.find(obj => {
      return obj.iddetalle === id;
    })

    setvalores(result);
    abrirModalVerMuestra();
  }
  
  return (
    <>
    <table class="table table-striped mt-3 table-hover table-responsive-lg" cellPadding={0} cellSpacing={0}>
      <thead class="table-dark">
        <tr>
        {data[0] && columns.map((heading) => {
             if(heading!='idarea' && heading!='iddetalle'  && heading!='idexamen' && heading!='idchequeo' && heading!='idpaciente' && heading!='idlaboratorio' 
             && heading!='idusuario'  && heading!='horachequeo' && heading!='archivo' && heading!='estadochequeo' && heading!='idmunicipio' 
             && heading!='idestado' && heading!='apellido' && heading!='direccion' && heading!='fechanacimiento' && heading!='correopaciente'
             && heading!='observaciones' && heading!='idmuestra' && heading!='nombrelaboratorio' && heading!='horaingreso' 
             && heading!='idresultado' && heading!='idparametro'  && heading!='valor' && heading!='positivo' && heading!='comentario' && heading!='presencia'
             && heading!='genero'  && heading!='fechaactualizacion' && heading!='fechacreacion' && heading!='fecharegistro' && heading!='horaregistro' && heading!='estadoexamen')
            return(<th>{heading}</th>)
            })}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
      {data.map((row, index) =>{  const id = row['iddetalle'];  return(
          <tr key={index}>
           
            {columns.map((column) => {
            
            if(column=='nombrepaciente')
            return(
                
              <td>{row['nombrepaciente']} {row['apellido']}</td>
           
            )

            if(column=='nombreexamen')
            return(
                
              <td>{row[column]}</td>
           
            )


            if(column=='nombreexamen')
            return(
                
              <td>{row[column]}</td>
           
            )

            if(column=='nombrearea')
            return(
                
              <td>{row[column]}</td>
           
            )

            if(column=='fechachequeo')
            return(
                
              <td>{(row[column]!=null)?Moment(row[column]).format('D MMMM YYYY'):' - '}</td>
           
            )

            if(column=='fechaingreso')
            return(
                
              <td>{(row[column]!=null)?Moment(row[column]).format('D MMMM YYYY'):' - '} &nbsp; {row['horaingreso']}</td>
           
            )

            })}

            <td>
            {(row['idmuestra']==null)?<p class="mx-1"><i>No se encontró muestra</i></p>: null}
            {(row['idmuestra']!=null)?<a class="btn btn-success btn-sm mx-1" onClick={()=>{abrirModalMuestra(id)}}>Ver muestra</a>: null}
            </td>

            
          </tr>
        )})}
        {data.length ==0 && 
        <tr><td class="text-center">Debe seleccionar un paciente</td></tr>
        }
      </tbody>
    </table>
    <Pagination
        registrosPorPagina={registrosXpagina}
        registrosTotales={dataOriginal.length}
        paginate={paginate}
      />
    {/* modal de mostrar resultados de examen  */}
    <div class="modal fade" id="verMuestra" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Muestra para {valores.nombreexamen}</h5>
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
              </div>
              <div class="col col-6">
                <p class="m-0 "><b>Laboratorio: </b>{valores.nombrelaboratorio}</p>
              </div>
            </div>
            <br></br>

            <form id="formulario">
              <div class="row px-2">
                <div class="bordeLateral"><h6>Información de la muestra:</h6></div>
                <div class="col col-5">
                  <p class="m-0 mt-3">Fecha ingreso: {Moment(valores.fechaingreso).format('D MMMM YYYY')}</p> 
                  <p class="m-0 mt-3">Hora ingreso: {valores.horaingreso}</p>
                </div>
                <div class="col col-12">
                  <label class="mt-3" for="textarea">Observaciones:</label>
                  <textarea defaultValue={valores.observaciones} class="form-control" placeholder="" id="textarea" onChange={(event)=>{setObservaciones(event.target.value)}} readonly="readonly"></textarea>
                </div>
              </div>
            </form>
            
          </div>
          <div class="modal-footer">
            <a type="btn" class="btn btn-secondary col-auto" data-bs-dismiss="modal" >Cerrar</a>
            {(valores.estadoexamen==false && valores.estadochequeo==false)?<a type="btn btn-danger" class="btn btn-danger col-auto" onClick={()=>{eliminar(valores.iddetalle, valores.idchequeo)}}>Eliminar</a>:null}
          </div>
        </div>
      </div>
    </div>
    {/* FINAL modal mostrar resultados de examen  */}

    </>
  );
}