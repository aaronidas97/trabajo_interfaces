import { fetchDataFromUrl } from "./fetch.js";

const form = document.getElementById("searchForm");
        
form.addEventListener("submit",  (event) => {

    event.preventDefault(); // Evitar la recarga de la página por defecto

    const nombreBuscado = document.getElementById("pokemonName").value.toLowerCase();
    const url = "https://pokeapi.co/api/v2/pokemon/";

    fetchDataFromUrl(url + nombreBuscado)
        .then((pokemon) => {
          window.location.href = `pokemon.html?name=${pokemon.nombre}&image=${pokemon.imagen}&weight=${pokemon.weight}`;


        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
});
