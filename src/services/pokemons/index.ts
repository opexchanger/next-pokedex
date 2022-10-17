import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { PokemonDTO, Pokemons } from './types';
import {
  createSinglePokemonQueryFunction,
  createManyPokemonsQueryFunction,
  createSinglePokemonKey,
  createManyPokemonKey,
} from './utils';

export const useOnePokemon = (
  pokemonName: string,
  options?: UseQueryOptions<PokemonDTO>
) => {
  return useQuery(
    createSinglePokemonKey(pokemonName),
    createSinglePokemonQueryFunction(pokemonName),
    options
  );
};

export const useAllPokemonPaginated = (
  page: number,
  options?: UseQueryOptions<Pokemons>
) => {
  return useQuery(
    createManyPokemonKey(page),
    createManyPokemonsQueryFunction(page),
    options
  );
};

export const useAllPokemon = (options?: UseQueryOptions<Pokemons>) => {
  return useQuery(
    createManyPokemonKey(0),
    createManyPokemonsQueryFunction(0),
    options
  );
};
