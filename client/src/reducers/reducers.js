import { GET_ALL_GAMES, 
         SEARCH_BY_NAME,
         GET_VIDEOGAME_DETAIL,
         GET_GENRES,
         ORDER_BY,
         FILTER_BY } from "../actions/constantes";

const initialState = {
    allGames: [],
    gamesBackUp: [],
    gameDetails: {},
    genres: [],
    filtered: []
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
           case GET_ALL_GAMES:
             // Actualiza la lista completa de juegos, el respaldo y los juegos filtrados.
                return {
                ...state,
                allGames: action.payload, 
                gamesBackUp: action.payload,
                filtered: action.payload
            };
            case GET_VIDEOGAME_DETAIL:
                 // Actualiza los detalles del juego seleccionado.
                return {
                ...state,
                gameDetails: action.payload
            };

            case SEARCH_BY_NAME:
                 // Actualiza la lista de respaldo y los juegos filtrados según la búsqueda por nombre.
                return {
                ...state,
                gamesBackUp: action.payload,
                filtered: action.payload
            };

            case GET_GENRES:
                // Actualiza la lista de géneros disponibles.
                return {
                    ...state,
                    genres: action.payload
                };
                
                case FILTER_BY:
                // Filtra la lista de juegos según diferentes criterios (default, DB, API o género).
                    if (action.payload === 'default') {
                        return { ...state, filtered: state.gamesBackUp };
                    } else if (action.payload === 'DB') {
                // Filtra juegos con IDs de tipo string.
                        return { ...state, filtered: state.gamesBackUp.filter((game) => typeof game.id === 'string') };
                    } else if (action.payload === 'API') {
                // Filtra juegos con IDs de tipo número.
                        return { ...state, filtered: state.gamesBackUp.filter((game) => typeof game.id === 'number') };
                    } else {
                // Filtra juegos por género.
                        return {
                            ...state,
                            filtered: state.gamesBackUp.filter((game) => {
                                return game.genres.find((genre) => genre === action.payload);
                            })
                        };
                    }
                case ORDER_BY:
                    // Ordena la lista de juegos según diferentes criterios (A-Z, Z-A, desc, asc).
                    if (action.payload === 'A-Z') {
                        return {
                            ...state,
                            filtered: [...state.filtered].sort((prev, next) => {
                                if (prev.name > next.name) return 1;
                                if (prev.name < next.name) return -1;
                                return 0;
                            })
                        };
                    } else if (action.payload === 'Z-A') {
                        return {
                            ...state,
                            filtered: [...state.filtered].sort((prev, next) => {
                                if (prev.name > next.name) return -1;
                                if (prev.name < next.name) return 1;
                                return 0;
                            })
                        };
                    } else if (action.payload === 'desc') {
                        // Ordena por rating de forma descendente.
                        return {
                            ...state,
                            filtered: [...state.filtered].sort((prev, next) => prev.rating - next.rating)
                        };
                    } else if (action.payload === 'asc') {
                        // Ordena por rating de forma ascendente.
                        return {
                            ...state,
                            filtered: [...state.filtered].sort((prev, next) => next.rating - prev.rating)
                        };
                    } else {
                        // Restaura la lista original de juegos.
                        return { ...state, filtered: state.gamesBackUp };
                    }
                default:
                    // Si no se reconoce el tipo de acción, devuelve el estado sin cambios.
                    return state;
            }
        }