import { fetchDataFromUrl } from "./fetch.js";

// Obtener el formulario y agregar un evento de escucha para el envío
const form = document.getElementById("searchForm");
form.addEventListener("submit", (event) => {
    event.preventDefault(); // Evitar la recarga de la página por defecto

    // Obtener el nombre buscado del campo de entrada y convertirlo a minúsculas
    const nombreBuscado = document.getElementById("pokemonName").value.toLowerCase();
    const url = "https://pokeapi.co/api/v2/pokemon/";

    // Realizar una solicitud para obtener información del Pokémon buscado
    fetchDataFromUrl(url + nombreBuscado)
        .then((pokemon) => {
            // Redirigir a la página del Pokémon con parámetros en la URL
            window.location.href = `pokemon.html?name=${pokemon.nombre}&image=${pokemon.imagen}&weight=${pokemon.weight}`;
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
});
