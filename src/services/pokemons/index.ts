import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { Pokemon, Pokemons } from './types';
import {
  createSinglePokemonQueryFunction,
  createManyPokemonsQueryFunction,
  createSinglePokemonKey,
  createManyPokemonKey,
} from './utils';

export const useOnePokemon = (
  pokemonName: string,
  options?: UseQueryOptions<Pokemon>
) => {
  return useQuery(
    createSinglePokemonKey(pokemonName),
    createSinglePokemonQueryFunction(pokemonName),
    options
  );
};

export const useAllPokemon = (
  page: number,
  options?: UseQueryOptions<Pokemons>
) => {
  return useQuery(
    createManyPokemonKey(page),
    createManyPokemonsQueryFunction(page),
    options
  );
};
