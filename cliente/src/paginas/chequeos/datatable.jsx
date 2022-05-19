import React, { useState, useEffect } from 'react';
import Pagination from '../../componentes/Paginacion/paginacion';
import Moment from 'moment';
export default function DatatableRoles({ data,eliminarRegistro,actualizarRegistro,setNuevaHoraChequeo,setNuevaFechaChequeo,setNuevoLaboratorio, laboratorios, setNuevoUsuario,setNuevaProfesion,profesiones }) {
  
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
             if(heading!='idusuario' && heading!='idlaboratorio' && heading!='idpaciente' && heading!='archivo')
            return(<th>{heading}</th>)
            })}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
      {data.map((row) =>{  const id = row['idchequeo'];  return(
          <tr>
           
            {columns.map((column) => {
            if(column=='paciente')
            return(
                
              <td>{row[column]}  </td>
           
            )
            if(column=='idchequeo')
            return(
                
              <td>{row[column]}  </td>
           
            )
            if(column=='laboratorio')
            return(
              <td>
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
            if(column=='fechachequeo')
            return(
                
              <td> <input type="date" class="form-control form-control-sm" onChange={(event)=>{setNuevaFechaChequeo(event.target.value)}} key={id} defaultValue={Moment(row[column]).format('YYYY-MM-DD')} /></td>
            )
            if(column=='horachequeo')
            return(
                
              <td> <input type="time" class="form-control form-control-sm" onChange={(event)=>{setNuevaHoraChequeo(event.target.value)}} key={id} defaultValue={row[column]} /></td>
           
            )

            })}
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
                        <li>Chequeo para paciente {row['paciente']} para el dia {Moment(row['fechaChequeo']).format('DD MMMM YYYY')}</li>  
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