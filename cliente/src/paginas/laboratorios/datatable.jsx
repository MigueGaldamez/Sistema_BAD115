import React, { useState, useEffect } from 'react';
import Pagination from '../../componentes/Paginacion/paginacion';
export default function DatatableRoles(
  { data,
    eliminarRegistro,
    actualizarRegistro,
    setNuevoNombre,
    setNuevoIdMunicipio,
    municipios, }) {
  
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
             if(heading!='idmunicipio')
            return(<th>{heading}</th>)
            })}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) =>{  const id = row['idlaboratorio'];  return(
          <tr>
           
            {columns.map((column) => {
              
            if(column=='nombrelaboratorio')
            return(
                
              <td> <input type="text" class="form-control form-control-sm" onChange={(event)=>{
                setNuevoNombre(event.target.value)
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
              /*<td> <input type="s" class="form-control form-control-sm" onChange={(event)=>{
                setNuevoNombre(event.target.value)
                }} key={id} defaultValue={row[column]} /></td>*/
             
            )
            if(column=='idmunicipio')
            return(
                
              <td>{row[column]}  </td>
           
            )})}
            <td>
             
            <a  class="btn btn-success btn-sm mx-1" onClick={()=>{actualizarRegistro(id)}}>Actualizar</a>
            <a class="btn btn-danger btn-sm mx-1" onClick={()=>{eliminarRegistro(id)}}>Eliminar</a>
            </td>
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