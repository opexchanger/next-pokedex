import { Likes } from '@/services/likes/types';
import { PokemonDTO } from '@/services/pokemons/types';

export const fakePokemon: PokemonDTO = {
  id: 1,
  name: 'bulbasaur',
  sprites: {
    front:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    back: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
  },
  types: ['grass', 'poison'],
  height: 7,
  weight: 69,
  stats: [
    {
      base_stat: 45,
      stat: {
        name: 'hp',
      },
    },
    {
      base_stat: 49,
      stat: {
        name: 'attack',
      },
    },
    {
      base_stat: 49,
      stat: {
        name: 'defense',
      },
    },
    {
      base_stat: 65,
      stat: {
        name: 'special-attack',
      },
    },
    {
      base_stat: 65,
      stat: {
        name: 'special-defense',
      },
    },
    {
      base_stat: 45,
      stat: {
        name: 'speed',
      },
    },
  ],
  abilities: 'overgrow',
};

export const fakeLikesGet: Likes = {
  id: 1,
  pokemonName: 'bulbasaur',
  amount: 31,
};

export const fakeLikesPost: Likes = {
  id: 1,
  pokemonName: 'bulbasaur',
  amount: 35,
};
