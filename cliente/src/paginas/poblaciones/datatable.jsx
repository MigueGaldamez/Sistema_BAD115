import React, { useState, useEffect } from 'react';
import Pagination from '../../componentes/Paginacion/paginacion';
export default function DatatableRoles({ data,eliminarRegistro,actualizarRegistro,setNuevoNombre,setNuevoEdadMinima,setNuevoEdadMaxima }) {
  
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
    <table class="table table-striped mt-3 table-hover " cellPadding={0} cellSpacing={0}>
      <thead class="table-dark">
        <tr>
          {data[0] && columns.map((heading,index) => <th key={index}>{heading}</th>)}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        
        {data.map((row,index) =>{  const id = row['idpoblacion'];  return(
          <tr key={index}>
            {columns.map((column,index) => {
              
              if(column=='poblacion')
                return(              
                  <td key={index}><input type="text" class="form-control form-control-sm" onChange={(event)=>{
                    setNuevoNombre(event.target.value)
                    }} key={id} defaultValue={row[column]} /></td>
                )
                if(column=='edadmaximo')
                return(              
                  <td key={index}><input type="text" class="form-control form-control-sm" onChange={(event)=>{
                    setNuevoEdadMaxima(event.target.value)
                    }} key={id} defaultValue={row[column]} /></td>
                )
                if(column=='edadminimo')
                return(              
                  <td key={index}><input type="text" class="form-control form-control-sm" onChange={(event)=>{
                    setNuevoEdadMinima(event.target.value)
                    }} key={id} defaultValue={row[column]} /></td>
                )
                if(column=='idpoblacion')
                return(
                    
                  <td key={index}>{row[column]}  </td>
              
                )})}
              <td  >
              <a class="btn btn-success btn-sm mx-1" onClick={()=>{actualizarRegistro(id)}}>Actualizar</a>
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