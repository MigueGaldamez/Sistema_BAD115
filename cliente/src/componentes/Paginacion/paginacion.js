import React from 'react';

const Pagination = ({ registrosPorPagina, registrosTotales, paginate }) => {
  const numerosdePaginas = [];

  for (let i = 1; i <= Math.ceil(registrosTotales / registrosPorPagina); i++) {
    numerosdePaginas.push(i);
  }

  return (
    <nav class="mb-5">
       
      <ul className='pagination' >
        {numerosdePaginas.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} className='btn page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
