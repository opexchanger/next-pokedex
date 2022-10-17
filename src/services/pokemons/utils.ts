import { QueryKey } from '@tanstack/react-query';

import api from '../../lib/fetch';
import { PokemonDTO, Pokemons } from './types';
import { resultsPerPage, baseApiUrl } from '../../config';
import { formatPokemonName } from '@/utils/index';

export const createSinglePokemonKey = (pokemonName: string): QueryKey => {
  return ['Pokemon', pokemonName];
};

export const createManyPokemonKey = (page: number): QueryKey => {
  return ['AllPokemon', `page-${page}`];
};

export const createSinglePokemonQueryFunction = (pokemonName: string) => {
  const fetchUrl = baseApiUrl + pokemonName;
  const queryFunction = api.get<PokemonDTO>(fetchUrl, {}, mapAPIResponseToDTO);
  return () => queryFunction;
};

export const createManyPokemonsQueryFunction = (page: number) => {
  const params = getParamsBasedOnPageNumber(page);
  const queryFunction = api.get<Pokemons>(baseApiUrl, {
    params,
  });
  return () => queryFunction;
};

type APIPaginationParams = {
  limit: number;
  offset: number;
};

const getParamsBasedOnPageNumber = (page: number): APIPaginationParams => {
  if (page === 0) {
    return {
      limit: 10000,
      offset: 0,
    };
  }
  const limit = resultsPerPage;
  const offset = page * 15 - 15;
  return {
    limit,
    offset,
  };
};

export const mapAPIResponseToDTO = (rawPokemon: any): PokemonDTO => {
  return {
    id: rawPokemon.id,
    name: rawPokemon.name,
    height: rawPokemon.height,
    weight: rawPokemon.weight,
    sprites: {
      front: rawPokemon.sprites?.front_default || '/img/pokemon_no_image.png',
      back: rawPokemon.sprites?.back_default || '/img/pokemon_no_image.png',
    },
    types: rawPokemon.types.map((obj: any) => obj.type.name),
    stats: rawPokemon.stats,
    abilities: rawPokemon.abilities
      .filter((obj: any) => !obj.is_hidden)
      .map((obj: any) => formatPokemonName(obj.ability.name))
      .join(', '),
  };
};
