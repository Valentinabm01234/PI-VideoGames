import { React, useEffect } from 'react';
import { connect } from 'react-redux';
import { getVideogameDetail } from '../../actions/actions';
import Navbar from '../NavBar/NavBar';
import photo from '../../img/created.jpg';
import { NavLink } from 'react-router-dom';
import './gamedetail.css';

function GameDetails(props) {
    // Desestructuración de propiedades
    const { getVideogameDetail, gameDetails } = props;
    const { idVideogame } = props.match.params;

    // Carga los detalles del juego usando useEffect
    useEffect(() => {
        getVideogameDetail(idVideogame);
    }, [idVideogame]);

    return (
        <div className="container-detail">
            {/* Renderiza la barra de navegación */}
            <Navbar />
            <div className="details-div">
                {/* Renderiza los detalles del juego */}
                {gameDetails ? (
                    <div>
                        {/* Nombre del juego */}
                        <h3 className="title">{gameDetails.name}</h3>
                        {/* Imagen del juego o imagen de respaldo si no hay imagen */}
                        {gameDetails.background_image ? (
                            <div className="div-img">
                                <img src={gameDetails.background_image} alt="Videogame" />
                            </div>
                        ) : (
                            <div className="div-img">
                                <img src={photo} alt="Videogame" />
                            </div>
                        )}
                        {/* Fecha de lanzamiento */}
                        <p>
                            <strong>Release Date</strong>: {`${gameDetails.releaseDate || "None"}`}
                        </p>
                        {/* Calificación del juego */}
                        <p>
                            <strong>Rating</strong>: ★ {`${gameDetails.rating}`}
                        </p>
                        {/* Descripción, géneros y plataformas */}
                        {gameDetails.description &&
                        gameDetails.genres &&
                        gameDetails.platforms ? (
                            <div className="div-descr">
                                {/* Descripción del juego */}
                                <p className="descripcion">
                                    {gameDetails.description.replace(/(<([^>]+)>)/gi, "")}
                                </p>
                                {/* Géneros del juego */}
                                <p>
                                    <strong>Genres</strong>: {`${gameDetails.genres.join(", ")}`}
                                </p>
                                {/* Plataformas del juego */}
                                <p>
                                    <strong>Platforms</strong>: {`${
                                        typeof gameDetails.platforms === "string"
                                            ? gameDetails.platforms
                                            : gameDetails.platforms.join(", ")
                                    }`}
                                </p>
                                {/* Botón para volver a la lista de juegos */}
                                <NavLink to="/videogames">
                                    <button>Volver</button>
                                </NavLink>
                            </div>
                        ) : (
                            // Si los detalles aún se están cargando
                            <h1>Cargando</h1>
                        )}
                    </div>
                ) : (
                    // Si los detalles no se pudieron cargar
                    <h1>Cargando</h1>
                )}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        // Mapea los detalles del juego desde el estado para usarlos como propiedad en el componente
        gameDetails: state.gameDetails
    };
}

// Conecta el componente a Redux, mapeando el estado y las acciones a las propiedades
export default connect(mapStateToProps, { getVideogameDetail })(GameDetails);

