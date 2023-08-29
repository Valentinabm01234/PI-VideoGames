import { React, useState } from 'react';
import { connect } from 'react-redux';
import { searchByName, getAllGames } from '../../actions/actions';
import './SearchBar.css';

function SearchBar({ searchByName, getAllGames }) {
    // Estado local para almacenar el valor del input
    const [input, setInput] = useState({
        buscar: ''
    });

    // Manejador de cambio de input
    const handleInputChange = function (e) {
        setInput({
            [e.target.name]: e.target.value
        });
    }

    // Manejador de clic para búsqueda por nombre
    const handleOnClick = () => {
        searchByName(input.buscar); // Llama a la acción searchByName con el valor del input
        setInput({
            buscar: ''
        });
    }

    // Manejador de clic para cargar todos los juegos
    const handleOnClickAll = () => {
        getAllGames(); // Llama a la acción getAllGames
        setInput({
            buscar: ''
        });
    }

    return (
        <div className="searchbar-div">
            {/* Input para búsqueda */}
            <input
                className="bar-btn"
                name="buscar"
                placeholder="buscá tu juego..."
                onChange={handleInputChange}
                value={input.buscar}
                autoComplete="off"
            ></input>
            {/* Botón para búsqueda */}
            <button className="btn" onClick={handleOnClick}>
                Buscar
            </button>
            {/* Botón para cargar todos los juegos */}
            <button className="btn" onClick={handleOnClickAll}>
                Cargar Todos
            </button>
        </div>
    );
}

// Conecta el componente al store de Redux y mapea las acciones
export default connect(null, { searchByName, getAllGames })(SearchBar);

