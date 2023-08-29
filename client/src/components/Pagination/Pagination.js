import React, {} from 'react'
import './pagination.css'


export default function Pagination({ cardPerPage, totalCards, paginate, currentPage }) {
  // Si la página actual es mayor que el total de páginas, redirecciona a la primera página  
  if(Math.ceil(totalCards / cardPerPage ) < currentPage ) {
    paginate(1)
  }
  // Genera un array de números de página según la cantidad de cartas por página y el total de cartas
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(totalCards / cardPerPage ); i++){
        pageNumbers.push(i);
    }

    return (
      <div className="pag-div">
        <ul>
          {/* Verifica si hay más de una página antes de renderizar */}
          {pageNumbers.length > 1 &&
            // Mapea sobre los números de página y renderiza un botón para cada uno
            pageNumbers.map((p, i) =>
              // Comprueba si el número de página es el mismo que la página actual
              p === currentPage ? (
                // Si es la página actual, renderiza el botón con clase activa
                <li key={i}>
                  <button className="pag-btn active" onClick={() => paginate(p)}>
                    {p}
                  </button>
                </li>
              ) : (
                // Si no es la página actual, renderiza el botón normal
                <li key={i}>
                  <button className="pag-btn" onClick={() => paginate(p)}>
                    {p}
                  </button>
                </li>
              )
            )}
        </ul>
      </div>
    );
}    