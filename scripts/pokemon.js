
import { fetchDataFromUrl } from "./fetch.js";

const params = new URLSearchParams(window.location.search);
const nombrePokemon = params.get("name");
const imagenPokemon = params.get("image");
const pesoPokemon = params.get("weight");

const nombreParrafo = document.getElementById("nombre");
const imagenSrc = document.getElementById("imagen");
const pesoParrafo = document.getElementById("weight");

if(nombrePokemon != null && imagenPokemon != null && pesoPokemon != null ){
       // Mostrar la información en la página
nombreParrafo.innerText = `Nombre: ${capitalizeFirstLetter(nombrePokemon)}`;
imagenSrc.src = imagenPokemon;
pesoParrafo.innerText = `Peso: ${capitalizeFirstLetter(pesoPokemon)}`;

}

document.addEventListener("DOMContentLoaded", () => {


const form = document.getElementById("searchForm");


form.addEventListener("submit",  (event) => {

    event.preventDefault(); // Evitar la recarga de la página por defecto

    const nombreBuscado = document.getElementById("pokemonName").value.toLowerCase();
    const url = "https://pokeapi.co/api/v2/pokemon/";

    fetchDataFromUrl(url + nombreBuscado)
        .then((pokemon) => {
            // Mostrar la información en la página
            nombreParrafo.innerText = pokemon.nombre;
            imagenSrc.src = pokemon.imagen;
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
});





});

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
  }