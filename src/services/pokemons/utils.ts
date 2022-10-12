import { QueryKey } from '@tanstack/react-query';

import { getFetch } from '../../lib/fetch';
import { Pokemon, Pokemons } from './types';
import { resultsPerPage, baseApiUrl } from '../../config';

export const createSinglePokemonKey = (pokemonName: string): QueryKey => {
  return ['Pokemon', pokemonName];
};

export const createManyPokemonKey = (page: number): QueryKey => {
  return ['AllPokemon', `page-${page}`];
};

export const createSinglePokemonQueryFunction = (pokemonName: string) => {
  const fetchUrl = baseApiUrl + pokemonName;
  const queryFunction = getFetch<Pokemon>(fetchUrl);
  return () => queryFunction;
};

export const createManyPokemonsQueryFunction = (page: number) => {
  const params = getParamsBasedOnPage(page);
  const queryFunction = getFetch<Pokemons>(baseApiUrl, {
    params,
  });
  return () => queryFunction;
};

type APIPaginationParams = {
  limit: number;
  offset: number;
};

const getParamsBasedOnPage = (page: number): APIPaginationParams => {
  const limit = resultsPerPage;
  const offset = page * 15 - 15;
  return {
    limit,
    offset,
  };
};

// export const simplifyPokemonModel = (rawPokemon: any): Pokemon => {
//   return {
//     id: rawPokemon.id,
//     name: rawPokemon.name,
//     height: rawPokemon.height,
//     weight: rawPokemon.weight,
//     images: {
//       front: rawPokemon.sprites.front_default,
//       back: rawPokemon.sprites.back_default,
//     },
//     types: rawPokemon.types.map((obj: any) => obj.type.name).join(', '),
//     stats: rawPokemon.stats,
//     abilities: rawPokemon.abilities.map((obj: any) => ({
//       name: obj.ability.name,
//       url: obj.ability.url,
//       isHidden: obj.is_hidden,
//     })),
//   };
// };
