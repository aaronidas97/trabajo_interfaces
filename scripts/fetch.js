import { Pokemon } from "./pokemonClass.js";


export  function fetchDataFromUrl(url) {

  
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {


      console.log(data.name + "--" + data.sprites.front_default);
      return new Pokemon(data.name, data.sprites.front_default, data.weight);


    });
}

export function fetchListFromUrl(url) {
  return fetch(url)
      .then((response) => response.json());
}


