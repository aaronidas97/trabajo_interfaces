import { fetchListFromUrl, fetchDataFromUrl } from "./fetch.js";
import { Pokemon } from "./pokemonClass.js";


let url = "https://pokeapi.co/api/v2/pokemon/";

let listaPokemon = [];
    let lista = document.getElementById("pokemon");

    const nextPage = document.getElementById("nextLink");

document.addEventListener("DOMContentLoaded", () => {

    fetchListFromUrl(url)
        .then((listaJson) => {
            console.log(listaJson.next)

            nextPage.onclick = () =>{

                
                nextFetch(listaJson.next)



            };
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

        setPokemonInfo(listaPokemon);
        })
});

function setPokemonInfo(listaPokemon) {
    listaPokemon.forEach((pokemon) => {
        

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
}

function nextFetch(nextPokemons){
    
    fetchListFromUrl(nextPokemons)
        .then((listaJson) => {
            

            nextPage.onclick = () =>{

                url = listaJson.next;



            };
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
}