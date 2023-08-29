import React from 'react';
import { connect } from 'react-redux';
import { orderBy, filterBy } from '../../actions/actions';
import './FilterBy.css';

function FilteredBy({ orderBy, genres, filterBy }) {
    // Maneja la selección de opciones en el primer selector (filtrar por).
    const handleSelect = (e) => {
        filterBy(e.target.value);
    }

    // Maneja la selección de opciones en el segundo selector (ordenar por).
    const handleSelect2 = (e) => {
        orderBy(e.target.value);
    }

    return (
        <div className='container-div'>
            {/* Selector para filtrar la lista de juegos */}
            <select className="selectCont" onChange={handleSelect} name="" id="">
                <option className="option" value="default">TODOS...</option>
                <optgroup className="optionGroup" label="DataBase">
                    <option className="option" value="DB">CREADOS</option>
                </optgroup>
                <optgroup className="optionGroup" label="API">
                    <option className="option" value="API">API</option>
                </optgroup>
                <optgroup className="optionGroup" label="GENRES">
                    {/* Mapea y renderiza opciones basadas en la lista de géneros */}
                    {genres && genres.map(g => <option key={g.name} value={g.name}>{g.name}</option>)}
                </optgroup>
            </select>
            {/* Selector para ordenar la lista de juegos */}
            <select className="selectCont" onChange={handleSelect2} name="" id="">
                <option className="option" value="default">ORDEN...</option>
                <optgroup className="optionGroup" label="Rating">
                    <option className="option" value="asc">Mayor a Menor</option>
                    <option className="option" value="desc">Menor a Mayor</option>
                </optgroup>
                <optgroup className="optionGroup" label="Alphabetic">
                    <option className="option" value="A-Z">A - Z</option>
                    <option className="option" value="Z-A">Z - A</option>
                </optgroup>
            </select>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        // Mapea el estado de los géneros para usarlo como propiedad en el componente
        genres: state.genres
    };
}

// Conecta el componente a Redux, mapeando el estado y las acciones a las propiedades
export default connect(mapStateToProps, { orderBy, filterBy })(FilteredBy);