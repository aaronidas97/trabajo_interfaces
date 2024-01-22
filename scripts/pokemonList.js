import { fetchListFromUrl, fetchDataFromUrl } from "./fetch.js";
import { Pokemon } from "./pokemonClass.js";

// URL base para obtener la lista de Pokémon
const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

// Array para almacenar la lista de Pokémon
let listaPokemon = [];

// Elemento de la lista en el HTML
const lista = document.getElementById("pokemon");

document.addEventListener("DOMContentLoaded", () => {

    // Obtener la lista de Pokémon usando la función fetchListFromUrl
    fetchListFromUrl(baseUrl)
        .then((listaJson) => {
            // Guardar la próxima URL para obtener más Pokémon
            const nextUrl = listaJson.next;

            // Crear promesas para obtener información detallada de cada Pokémon
            let pokemonPromises = Object.values(listaJson.results).map((values) => {
                // Crear una instancia de la clase Pokemon para cada Pokémon
                let pokemon = new Pokemon();
                pokemon.nombre = values.name;

                // Obtener información detallada del Pokémon
                return fetchListFromUrl(values.url)
                    .then((datosPokemon) => {
                        pokemon.imagen = datosPokemon.sprites.front_default;
                        pokemon.weight = datosPokemon.weight;
                        return pokemon;
                    });
            });

            // Esperar a que todas las promesas se resuelvan
            return Promise.all(pokemonPromises);
        })
        .then((pokemones) => {
            // Almacenar la lista completa de Pokémon
            listaPokemon = pokemones;

            // Llamar a la función para mostrar la información de los Pokémon
            setPokemonInfo(listaPokemon);
        });
});

// Función para mostrar la información de los Pokémon en la página
function setPokemonInfo(listaPokemon) {
    listaPokemon.forEach((pokemon) => {
        // Crear un contenedor para cada Pokémon
        let contenedor = document.createElement('div');
        contenedor.className = "card card-body col";
        contenedor.id = "contenedor";

        // Crear una imagen para el Pokémon
        let imgPokemon = document.createElement("img");
        imgPokemon.className = "imagenPokemon";
        imgPokemon.id = "imagen";
        imgPokemon.alt = "Imagen de " + pokemon.nombre;
        imgPokemon.src = pokemon.imagen;

        // Agregar la imagen al contenedor
        contenedor.appendChild(imgPokemon);

        // Agregar un evento click para redirigir a la página del Pokémon
        imgPokemon.onclick = () => {
            const pokemonDetailsUrl = "https://pokeapi.co/api/v2/pokemon/";

            // Obtener información adicional del Pokémon antes de redirigir
            fetchDataFromUrl(pokemonDetailsUrl + pokemon.nombre)
                .then((pokemon) => {
                    // Redirigir a la página del Pokémon con parámetros en la URL
                    window.location.href = `pokemon.html?name=${pokemon.nombre}&image=${pokemon.imagen}&weight=${pokemon.weight}`;
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        };

        // Agregar el contenedor a la lista en el HTML
        lista.appendChild(contenedor);
    });
}
