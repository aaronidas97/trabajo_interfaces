import { fetchListFromUrl, fetchDataFromUrl } from "./fetch.js";
import { Pokemon } from "./pokemonClass.js";


const url = "https://pokeapi.co/api/v2/pokemon/";

let listaPokemon = [];

document.addEventListener("DOMContentLoaded", () => {
    let lista = document.getElementById("pokemon");

    fetchListFromUrl(url)
        .then((listaJson) => {
            let pokemonPromises = Object.values(listaJson.results).map((values) => {

                
                let pokemon = new Pokemon();
                pokemon.nombre = values.name;

                return fetchListFromUrl(values.url)
                    .then((datosPokemon) => {
                        pokemon.imagen = datosPokemon.sprites.front_default;
                        pokemon.weight = datosPokemon.weight;
                        return pokemon;
                    });
            });

            return Promise.all(pokemonPromises);
        })
        .then((pokemones) => {
            listaPokemon = pokemones;
            console.log(listaPokemon);

            listaPokemon.forEach((pokemon) => {
                console.log(pokemon.nombre);
                

                let contenedor = document.createElement('div');
                contenedor.className ="card card-body col";
                contenedor.id = "contenedor";

                let imgPokemon = document.createElement("img");
                imgPokemon.className = " imagenPokemon";
                imgPokemon.id = "imagen";
                imgPokemon.alt = "Imagen de " + pokemon.nombre;
                imgPokemon.src = pokemon.imagen;
            
                contenedor.appendChild(imgPokemon);
                imgPokemon.onclick = () => {
                    const url = "https://pokeapi.co/api/v2/pokemon/";

                    fetchDataFromUrl(url + pokemon.nombre)
                     .then((pokemon) => {
                             
                        window.location.href = `pokemon.html?name=${pokemon.nombre}&image=${pokemon.imagen}&weight=${pokemon.weight}`;
    
    
                        })
                        .catch((error) => {
                         console.error("Error fetching data:", error);
                         });
    
                }
                lista.appendChild(contenedor);



              


            });
        }).then
});

