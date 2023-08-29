import React from 'react';
import { Link } from 'react-router-dom';
import './videogame.css';
import photo from '../../img/created.jpg';

export default function Videogame(props) {
    return (
        <div className="container-game">
            {/* Título del juego */}
            <div className="title-game">{props.name}</div>
            {/* Imagen del juego */}
            <div className="game-div">
                {props.image ? (
                    <img src={`${props.image}`} alt="Videogame" className="Img" />
                ) : (
                    <img src={photo} alt="Videogame" className="Img" />
                )}
            </div>
            {/* Rating del juego */}
            <div className="infoRating">
                {
                    <p>
                        <strong>Rating</strong>: ★ {`${props.rating}`}
                    </p>
                }
            </div>
            {/* Géneros del juego */}
            <div className="infoContGenres">
                {
                    <p className="">
                        <strong>Genres :</strong>{" "}
                        {`${
                            typeof props.genres === "string"
                                ? props.genres
                                : props.genres.join(", ")
                            }`}
                    </p>
                }
            </div>
            {/* Botón para ver los detalles del juego */}
            <div className="div-button">
                {props.id && (
                    <Link to={`/videogame/${props.id}`}>
                        <button className="Link">Details</button>
                    </Link>
                )}
            </div>
        </div>
    );
}
