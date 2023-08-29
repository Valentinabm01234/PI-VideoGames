import {React, useState} from 'react'
import NavBar from '../NavBar/NavBar'
import axios from 'axios'
import './CrearJuego.css'

function CrearJuego(props) {

    const [errors, setErrors] = useState({ form: 'Must complete the form' });

    const [form, setForm] = useState({
        name: '',
        description: '',
        releaseDate: '',
        rating: 0,
        genres: [],
        platforms: []
    });

    const handleChange = e => {
        // Maneja los cambios en los campos del formulario y actualiza el estado correspondiente.
        // También realiza validaciones en tiempo real llamando a la función "validate".
        if (e.target.parentNode.parentNode.id === 'genres') {
            if (e.target.checked) {
                setForm(prevState => ({
                    ...prevState,
                    genres: form.genres.concat(e.target.value)
                }))
            } else {
                setForm(prevState => ({
                    ...prevState,
                    genres: form.genres.filter(x => e.target.value !== x)
                }))
            }
        }
        if (e.target.parentNode.parentNode.id === 'platforms') {
            if (e.target.checked) {
                setForm(prevState => ({
                    ...prevState,
                    platforms: form.platforms.concat(e.target.name)
                }))
            } else {
                setForm(prevState => ({
                    ...prevState,
                    platforms: form.platforms.filter(x => e.target.name !== x)
                }))
            }
        }
        if (e.target.type !== 'checkbox') {
            setForm(prevState => ({
                ...prevState,
                [e.target.name]: e.target.value
            }))
        }
        setErrors(validate({
            ...form,
            [e.target.name]: e.target.value
        }))
    }
    const validate = form => {
         // Realiza validaciones en los campos del formulario y devuelve un objeto con los errores.
        let errors = {};
        if (!form.name) {
            errors.name = 'Game Name is required';
        } else if (form.name.length < 4) {
            errors.name = 'Game Name must have at least 4 characters';
        }
        if (!form.description) {
            errors.description = 'Description is required';
        } else if (form.description.length < 8) {
            errors.description = 'Description must have at least 8 characters'
        }
        if (!form.rating) {
            errors.rating = 'Rating is required';
        } else if (!/^[1-5]$/.test(form.rating)) {
            errors.rating = 'Rating must be between 1 and 5';
        }
        return errors;
    }

    const handleSubmit = e => {
        e.preventDefault(); // Evita que el formulario se envíe de manera convencional y recargue la página.
        const formErrors = validate(form); // Realiza validaciones en los campos del formulario.
        let checkboxsErrors = [];
        
        // Verifica si hay al menos un género seleccionado.
        if (form.genres.length < 1) checkboxsErrors.push('Genres is required');
        // Verifica si hay al menos una plataforma seleccionada.
        if (form.platforms.length < 1) checkboxsErrors.push('Platforms is required');
    
         // Comprueba si hay errores de validación en los campos o en las checkboxes.
        if (Object.keys(formErrors).length || checkboxsErrors.length) {
            const allErrors = { ...formErrors };
             // Agrega los errores de checkboxes al objeto de errores.
            checkboxsErrors.forEach((error, index) => {
                allErrors[`checkboxError${index}`] = error;
            });
            setErrors(allErrors);// Actualiza el estado de "errors" con los errores encontrados.
            return;
        }
    
        // Si no hay errores en la validación, procede con la solicitud POST
        axios.post('https://video-games-pi-henry-api.vercel.app/videogame', form)
            .then(res => {
                console.log(res.data);
                alert(`${form.name} Creado Correctamente`);
                props.history.push('/videogames');
            })
            .catch(error => {
                console.error('Error en la solicitud POST:', error);
            // Muestra el error en la consola.
            // Puedes mostrar un mensaje de error al usuario si la solicitud falla.
            // Por ejemplo: alert("Hubo un error al crear el juego. Por favor, intenta nuevamente.");
            });
    };

    return (
        <>
          {/* Renderiza la barra de navegación */}
        <NavBar />
        <div className="main-add">
            <div className="container-add">
                  {/* Formulario para crear un nuevo juego */}
                <h2>CREATE GAME - DETAILS -</h2>
                <div className="div-cont">
                    <form onSubmit={handleSubmit} onChange={handleChange}>
                        <label htmlFor='name' className="title-name"><strong>Name: </strong></label>
                        <br />
                        <input className="name" placeholder='Name' type="text" id='name' name='name' autoComplete="off"/>
                        <br />
                        <label htmlFor="description" className="title-name"><strong>Description: </strong></label>
                        <br />
                        <textarea className="name" name='description' placeholder='Description...' id="description" cols="30" rows="3" />
                        <br />
                        <label htmlFor="date" className="title-name"><strong>Release Date: </strong></label>
                        <br />
                        <input name='releaseDate' className="dt" type="date" id="date" required />
                        <br />
                        <label htmlFor="rating" className="title-name"><strong>Rating: </strong></label>
                        <br />
                        <input name='rating' className="dt" placeholder='Rate from 1 to 5' type="tel" id="rating" maxLength='1' autoComplete="off"/>
                        <br />
                        <label className="title-name"><strong>Genres:</strong></label>
                        <div id='genres' className="genres-div">
                            <div className="Action">
                                <input name='Action' value='2' type="checkbox" id="Action" />
                                <label htmlFor="Action">Action.</label>
                            </div>
                            <div className="indie">
                                <input name='Indie' value='1' type="checkbox" id="Indie" />
                                <label htmlFor="Indie">Indie.</label>
                            </div>
                            <div className="Adventure">
                                <input name='Adventure' value='3' type="checkbox" id="Adventure" />
                                <label htmlFor="Adventure">Adventure.</label>
                            </div>
                            <div>
                                <input name='RPG' value='4' type="checkbox" id="RPG" />
                                <label htmlFor="RPG">RPG.</label>
                            </div>
                            <div>
                                <input name='Strategy' value='5' type="checkbox" id="Strategy" />
                                <label htmlFor="Strategy">Strategy.</label>
                            </div>
                            <div>
                                <input name='Shooter' value='6' type="checkbox" id="Shooter" />
                                <label htmlFor="Shooter">Shooter.</label>
                            </div>
                            <div>
                                <input name='Casual' value='7' type="checkbox" id="Casual" />
                                <label htmlFor="Casual">Casual.</label>
                            </div>
                            <div>
                                <input name='Simulation' value='8' type="checkbox" id="Simulation" />
                                <label htmlFor="Simulation">Simulation.</label>
                            </div>
                            <div>
                                <input name='Puzzle' value='9' type="checkbox" id="Puzzle" />
                                <label htmlFor="Puzzle">Puzzle.</label>
                            </div>
                            <div>
                                <input name='Arcade' value='10' type="checkbox" id="Arcade" />
                                <label htmlFor="Arcade">Arcade.</label>
                            </div>
                            <div>
                                <input name='Platformer' value='11' type="checkbox" id="Platformer" />
                                <label htmlFor="Platformer">Platformer.</label>
                            </div>
                            <div>
                                <input name='Racing' value='12' type="checkbox" id="Racing" />
                                <label htmlFor="Racing">Racing.</label>
                            </div>
                            <div>
                                <input name='Massively-Multiplayer' value='13' type="checkbox" id="Massively-Multiplayer" />
                                <label htmlFor="Massively-Multiplayer">Massively-Multiplayer.</label>
                            </div>
                            <div>
                                <input name='Sports' value='14' type="checkbox" id="Sports" />
                                <label htmlFor="Sports">Sports.</label>
                            </div>
                            <div>
                                <input name='Fighting' value='15' type="checkbox" id="Fighting" />
                                <label htmlFor="Fighting">Fighting.</label>
                            </div>
                        </div>
                        <label className="title-name"><strong>Platforms: </strong> </label>
                        <div id='platforms' className="plat-div">
                            <div>
                                <input name='PC' type="checkbox" id="PC" />
                                <label htmlFor="PC">PC.</label>
                            </div>
                            <div>
                                <input name='iOS' type="checkbox" id="iOS" />
                                <label htmlFor="iOS">iOS.</label>
                            </div>
                            <div>
                                <input name='Android' type="checkbox" id="Android" />
                                <label htmlFor="Android">Android.</label>
                            </div>
                            <div>
                                <input name='macOS' type="checkbox" id="macOS" />
                                <label htmlFor="macOS">macOS.</label>
                            </div>
                            <div>
                                <input name='PlayStation 4' type="checkbox" id="PlayStation 4" />
                                <label htmlFor="PlayStation 4">PlayStation 4.</label>
                            </div>
                            <div>
                                <input name='PlayStation 5' type="checkbox" id="PlayStation 5" />
                                <label htmlFor="PlayStation 5">PlayStation 5.</label>
                            </div>
                            <div>
                                <input name='XBOX' type="checkbox" id="XBOX" />
                                <label htmlFor="XBOX">XBOX.</label>
                            </div>
                            <div>
                                <input name='PS Vita' type="checkbox" id="PS Vita" />
                                <label htmlFor="PS Vita">PS Vita.</label>
                            </div>
                        </div>
                        <br />
                        <div className="div-but-form">
                        <button type='submit'>Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}


export default CrearJuego;
