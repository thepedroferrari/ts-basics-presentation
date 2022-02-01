import { PokemonName } from "../types/pokemonName.js";
import { fetchContainer } from "./fetchContainer.js";

export interface Pokemon {
  id: number;
  name: PokemonName;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
}

export interface Trainer {
  name: string;
  age: number;
  pokemons: number[];
}

export interface TamedPokemon extends Pokemon {
  trainer: Trainer;
}

export interface Encounter {
  trainer: Trainer;
  tamedPokemon: TamedPokemon;
  untamedPokemon: Pokemon;
}

export async function getPokemonByName(
  name: string,
  controller: AbortController
): Promise<Pokemon> {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;

  try {
    const pokemon = await fetchContainer<Pokemon>({ controller, url });
    return {
      id: pokemon.id,
      name: pokemon.name,
      base_experience: pokemon.base_experience,
      height: pokemon.height,
      is_default: pokemon.is_default,
      order: pokemon.order,
      weight: pokemon.weight,
    };
  } catch (error) {
    controller.abort();
    throw new Error(`🐛🐛 Pokemon ${name} not found 🐛🐛`);
  }
}
export const getTrainersPokemon = async (
  pokemons: string[]
): Promise<Pokemon[]> => {
  const controller = new AbortController();
  const trainersPokemon: Pokemon[] = [];
  for (const pokemon of pokemons) {
    try {
      const pkm = await getPokemonByName(pokemon, controller);
      trainersPokemon.push(pkm);
    } catch (error) {
      controller.abort();
    }
  }
  return trainersPokemon;
};

export function interaction<EventKey extends keyof Encounter>(
  eventName: EventKey,
  pokemon: Encounter[EventKey]
): void {
  console.log(eventName, pokemon);
}
