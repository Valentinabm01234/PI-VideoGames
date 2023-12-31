import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/SearchBar';
import { connect } from 'react-redux';
import Videogame from '../VideoGame/Videogame';
import Pagination from '../Pagination/Pagination';
import FilteredBy from '../FilterBy/FilterBy';
import './videogames.css';
import { getAllGames, getGenres } from '../../actions/actions';
import notFound from '../../img/llorando.gif';
import loading from '../../img/conecting.gif';

function Videogames({ allGames, getAllGames, getGenres }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [cardPerPage] = useState(15);

    // Obtener los índices de las cartas a mostrar
    const indexOfLastCard = currentPage * cardPerPage;
    const indexOfFirstCard = indexOfLastCard - cardPerPage;

    let currentCards; // Cartas que se deben mostrar en la pantalla

    // En caso de que al buscar un juego en particular no encuentre ninguno
    if (typeof allGames === 'string') {
        currentCards = allGames;
    } else {
        currentCards = allGames.slice(indexOfFirstCard, indexOfLastCard); // Usar los índices para mostrar una porción de juegos
    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        getAllGames();
        getGenres();
    }, []);

    return (
        <div className="container">
            <NavBar />
            <SearchBar />
            <FilteredBy />
            <Pagination
                cardPerPage={cardPerPage}
                totalCards={allGames.length}
                paginate={paginate}
                currentPage={currentPage}
            />
            <div className="games-div">
                {currentCards.length > 1 ? (
                    currentCards.map((g) => (
                        <Videogame
                            key={g.id}
                            name={g.name}
                            rating={g.rating}
                            genres={g.genres}
                            image={g.background_image}
                            id={g.id}
                        />
                    ))
                ) : typeof currentCards === 'string' ? (
                    <div>
                        <img className="nonono" src={notFound} alt=""></img>
                    </div>
                ) : (
                    <div>
                        <img className="loading" src={loading} alt=""></img>
                    </div>
                )}
            </div>
            <Pagination
                cardPerPage={cardPerPage}
                totalCards={allGames.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        allGames: state.filtered,
    };
};

export default connect(mapStateToProps, { getAllGames, getGenres })(Videogames);

