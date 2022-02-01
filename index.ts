import {
  getPokemonByName,
  getTrainersPokemon,
  interaction,
} from "./utils/getPokemon.js";
import { pluck } from "./utils/pluck.js";
import { sortNumbersBy } from "./utils/sort.js";

const controller = new AbortController();

// sayHello({ id: "123", name: "Pedro" });

const pkmNamesArr: string[] = [
  "bulbasaur",
  "charmander",
  "pikachu",
  "squirtle",
];

const pkm = await getPokemonByName("pikachu", controller);

const allPkm = await Promise.all(
  pkmNamesArr.map((pkmName) => getPokemonByName(pkmName, controller))
);

const trainersPokemon = await getTrainersPokemon(pkmNamesArr);

console.log(sortNumbersBy(allPkm, "base_experience"));

// interaction("tamedPokemon", {
//   ...trainersPokemon[1],
//   trainer: { name: "Ash", age: 25, pokemons: pluck(trainersPokemon, "id") },
// });
